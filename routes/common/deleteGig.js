import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";

const prisma = new PrismaClient();
const router = Router();

router.delete("/api/org/gig/:id",isAuthenticated, async (req, res) => {
  const {
    params: { id },
  } = req;
  let intId = parseInt(id);
    const {type } = req.session?.user;
    if (type !== "organization")
      return res.status(403).json({ message: "User not allowed." });
  try {
    const orgGigs = await prisma.gig.delete({
      where: {
        ID: intId,
      },
    });
    res.status(200).json({"message":"Success"});
    if (!orgGigs)
      return res.status(400).json({ message: "No gigs created by user." });
  } catch (error) {
    // console.log("err:", error);
    res.status(500).json({ message: "Something happend. ",error:error });
  }
});

export default router;
