import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    req.session.user = {
      userId: "8",
      email: "bass@gmail.com",
      type: "musician",
      musicianLocation: "Accra",
      expertise: "Bassist",
    };
    req.session.destroy((error)=>{
        
    })
    res.status(200).json({
      email: "bass@gmail.com",
      avatarUrl:
        "http://res.cloudinary.com/djf51wp7b/image/upload/v1731586665/nijh3o3neeh5futs7qfz.png",
      areaOfExpertise: "Bassist",
      location: "Accra",
      type: "musician",
      fullName: "James Mensah",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during authentication." });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
