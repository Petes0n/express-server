import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

// router.get("/api/musician/gigs", isAuthenticated, async (req, res) => {
//   const {expertise,musicianLat,musicianLong,type} = req.session?.user;
// if(type !== "musician")return res.status(403).json({"message":"User not allowed."});
// const gigs = await prisma.$queryRaw`
//     SELECT *, (
//       6371 * acos(
//         cos(radians(${musicianLat})) * cos(radians(latitude)) * 
//         cos(radians(longitude) - radians(${musicianLong})) +
//         sin(radians(${musicianLat})) * sin(radians(latitude))
//       )
//     ) AS distance
//     FROM "Gig"
//     HAVING distance <= ${radius}
//     ORDER BY distance ASC;
//   `;
//   // const musician = await prisma.gig.findMany({
//   //   where:{
//   //     musicianTypeNeeded:expertise,
//   //     gigLocation:musicianLocation
//   //   },
//   //   include:{
//   //     organization:true,
//   //   }
//   // });
//   // res.status(200).json(musician);
//   try{
//  if(!musician)return res.status(404).json({"message":"No gigs found"})
//   }catch(error){
//     res.status(500).json({"message":"Something happened.","error":error})
//   }
// });

router.get("/api/musician/gigs", isAuthenticated, async (req, res) => {
  const { expertise, musicianLat, musicianLong, type } = req.session?.user;

  if (type !== "musician") {
    return res.status(403).json({ message: "User not allowed." });
  }

  const radius = 10; // Radius in kilometers

  try {
    const gigs = await prisma.$queryRaw`
      SELECT *
      FROM (
        SELECT g.*, o."orgName", (
          6371 * acos(
            cos(radians(${musicianLat})) * cos(radians(g.latitude)) * 
            cos(radians(g.longitude) - radians(${musicianLong})) +
            sin(radians(${musicianLat})) * sin(radians(g.latitude))
          )
        ) AS distance
        FROM "Gig" g
        JOIN "Organization" o ON g."orgID" = o."ID"
        WHERE g."musicianTypeNeeded" = ${expertise}
      ) subquery
      WHERE subquery.distance <= ${radius}
      ORDER BY subquery.distance ASC;
    `;

    if (!gigs || gigs.length === 0) {
      return res.status(200).json({ message: "No gigs found" });
    }

    res.status(200).json(gigs);
  } catch (error) {
    console.error("Error fetching gigs:", error);
    res.status(500).json({ message: "Something happened.", error });
  }
});
export default router;
