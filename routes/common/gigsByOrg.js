import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";

const prisma = new PrismaClient();
const router = Router();
// Gigs posted by the selected organization.
router.get("/api/org/gig/:id",isAuthenticated, async (req, res) => {
  const {
    params: { id },
  } = req;
  let intId = parseInt(id);
    const {type } = req.session?.user;
    if (type !== "musician")
      return res.status(403).json({ message: "User not allowed." });
  try {
    const orgGigs = await prisma.gig.findMany({
      where: {
        orgID: intId,
      },
    });
    res.status(200).json(orgGigs);
    if (!orgGigs)
      return res.status(400).json({ message: "No gigs created by user." });
    // if (orgGigs.length === 0)
    //   return res.status(404).json({
    //     message: "No gigs created.",
    //   });
  } catch (error) {
    // console.log("err:", error);
    res.status(500).json({ message: "Something happend." ,"error":error});
  }
});

export default router;
