import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();
const prisma = new PrismaClient();

router.post("/api/auth/org", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.organization.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    req.session.user = {
      OrgId: user.ID,
      email: user.email,
      type: user.userType,
      orgLocation:user.location,
      orgPassword:user.password
    };

    res.status(200).json({
      email: user.email,
      avatarUrl: user.avatarUrl,
      location: user.location,
      type: user.userType,
      orgName: user.orgName,
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
