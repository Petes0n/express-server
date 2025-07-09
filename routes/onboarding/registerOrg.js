import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const router = Router();
const prisma = new PrismaClient();

router.post("/api/register/org", async (req, res) => {
  const { orgName, email, password, longitude,latitude ,locationName} = req.body;
    const hashedPassword = await bcrypt.hash(password,19);
  try {
const existingOrg = await prisma.organization.findUnique({
      where: { email },
    });

    if (existingOrg) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const post = await prisma.organization.create({
      data: {
        orgName,
        password:hashedPassword,
        email,
        longitude,
        latitude,
        avatarUrl: "https://picsum.photos/200/300",
        locationName,
      },
    });
    res.status(201).json({ message: "Success", post });
  } catch (error) {
    console.log("error:",error)
    res.status(500).json({ message: "Error creating post" ,"error":error});
  }
});
export default router;
