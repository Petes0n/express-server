import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/api/org/available/location", isAuthenticated, async (req, res) => {
  const { musicianLocation, type } = req.session?.user;
  if (type !== "musician")
    return res.status(403).json({ message: "User not allowed." });
  try {
    const orgAvailable = await prisma.organization.findMany({
      where: {
        location: musicianLocation,
      },
    });
    res.status(200).json(orgAvailable);
    if (!orgAvailable)
      return res
        .status(400)
        .json({ message: "No organisation found in your area." });
  } catch (error) {
    res.status(500).json({ message: "Something happend.", error: error });
  }
});

export default router;
