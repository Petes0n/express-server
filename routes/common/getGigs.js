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
  const { page = 1, limit = 10, radius = 10 } = req.query;

  if (type !== "musician") {
    return res.status(403).json({ message: "User not allowed." });
  }

  // Convert to numbers and validate
  const radiusNum = Math.min(Math.max(parseFloat(radius), 1), 100); // 1-100km range
  const pageNum = Math.max(parseInt(page), 1);
  const limitNum = Math.min(Math.max(parseInt(limit), 1), 50); // Max 50 results
  const offset = (pageNum - 1) * limitNum;

  // Calculate bounding box (approximately 1 degree ≈ 111 km)
  const latDelta = radiusNum / 111;
  const longDelta = radiusNum / (111 * Math.cos(musicianLat * Math.PI / 180));

  try {
    // First, get total count for pagination
    const countResult = await prisma.$queryRaw`
      SELECT COUNT(*) as total
      FROM (
        SELECT g.id
        FROM "Gig" g
        WHERE g."musicianTypeNeeded" = ${expertise}
          AND g.latitude BETWEEN ${musicianLat - latDelta} AND ${musicianLat + latDelta}
          AND g.longitude BETWEEN ${musicianLong - longDelta} AND ${musicianLong + longDelta}
      ) filtered_gigs
    `;

    const total = parseInt(countResult[0].total);

    // Get gigs with bounding box filter, then exact distance calculation
    const gigs = await prisma.$queryRaw`
      SELECT *
      FROM (
        SELECT g.*, o."orgName", (
          6371 * acos(
            GREATEST(-1, LEAST(1,
              cos(radians(${musicianLat})) * cos(radians(g.latitude)) * 
              cos(radians(g.longitude) - radians(${musicianLong})) +
              sin(radians(${musicianLat})) * sin(radians(g.latitude))
            ))
          )
        ) AS distance
        FROM "Gig" g
        JOIN "Organization" o ON g."orgID" = o."ID"
        WHERE g."musicianTypeNeeded" = ${expertise}
          AND g.latitude BETWEEN ${musicianLat - latDelta} AND ${musicianLat + latDelta}
          AND g.longitude BETWEEN ${musicianLong - longDelta} AND ${musicianLong + longDelta}
      ) subquery
      WHERE subquery.distance <= ${radiusNum}
      ORDER BY subquery.distance ASC
      LIMIT ${limitNum} OFFSET ${offset};
    `;

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      gigs: gigs || [],
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: total,
        resultsPerPage: limitNum,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error("Error fetching gigs:", error);
    res.status(500).json({ 
      message: "Something happened.", 
      error: error.message 
    });
  }
});
export default router;
