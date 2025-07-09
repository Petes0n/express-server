import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import isAuthenticated from "../../middleware/index.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/api/register/musician", async (req, res) => {
  const { fullName, email, password, areaOfExpertise, longitude,latitude,locationName } =
    req.body;
    const hashedPassword = await bcrypt.hash(password,19);
  try {
    const existingMusician = await prisma.musician.findUnique({
      where: { email },
    });

    if (existingMusician) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const post = await prisma.musician.create({
      data: {
        fullName,
        areaOfExpertise,
        avatarUrl: "https://picsum.photos/200/300",
        password:hashedPassword,
        email,
        latitude,
        longitude,
        locationName,
      },
    });
    res.status(201).json({ message: "Success", post });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: "Error creating post","error":error });
  }
});


router.get("/api/protected-route",  isAuthenticated,(req, res) => {
  res.status(200).json({ message: "You have accessed a protected route."});
});
export default router;
