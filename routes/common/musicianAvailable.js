import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";

const prisma = new PrismaClient();
const router = Router();

router.get(
  "/api/musician/available/location",
  isAuthenticated,
  async (req, res) => {
    const { orgLocation, type } = req.session?.user;
    if (type !== "organization")
      return res.status(403).json({ message: "User not allowed." });
    try {
      const musicianAvailable = await prisma.musician.findMany({
        where: {
          location: orgLocation,
        },
      });
      res.status(200).json(musicianAvailable);
      if (!musicianAvailable)
        return res
          .status(400)
          .json({ message: "No musician found in your area." });
    } catch (error) {
      res.status(500).json({ message: "Something happend.", error: error });
    }
  }
);

export default router;
