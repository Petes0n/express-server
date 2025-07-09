import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();
const prisma = new PrismaClient();

router.post("/api/auth/musician", async (req, res) => {
  const { email, password } = req.body;
  
  try {
   
    const user = await prisma.musician.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    req.session.user = {
      userId: user.ID,
      email: user.email,
      type: user.userType,
      musicianLocation:user.location,
      expertise:user.areaOfExpertise,
      musicianLat:user.latitude,
      musicianLong:user.longitude,
    };
    res
      .status(200)
      .json({
        email: user.email,
        avatarUrl: user.avatarUrl,
        areaOfExpertise: user.areaOfExpertise,
        location:user.location,
        type: user.userType,
        fullName:user.fullName,
        
       });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during authentication.",error });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
