import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import cloudinaryModule from "cloudinary";
import multer from "multer";
import isAuthenticated from "../../middleware/index.js";
const router = Router();
const prisma = new PrismaClient();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const avatarUpload = multer({ storage });
router.patch(
  "/api/upload",
  isAuthenticated,
  avatarUpload.single("image"),
  async (req, res) => {
    try {
      const { type, userId, OrgId } = req.session?.user;

      const imageData = req.file;

      if (!imageData) {
        return res.status(400).json({ error: "No image file uploaded" });
      }
      const result = await cloudinary.uploader.upload(imageData.path);
      const { url } = result; //We'll use secure_url when we're live.
      if (type === "musician") {
        const parsedId = parseInt(userId);
        const imageUrl = await prisma.musician.update({
          where: { ID: parsedId },
          data: { avatarUrl: url },
        });
        res.status(200).json({ "message:": "Success" });
      }
      if (type === "organization") {
        const parsedId = parseInt(OrgId);
        const imageUrl = await prisma.organization.update({
          where: { ID: parsedId },
          data: { avatarUrl: url },
        });

        res.status(200).json({ "message:": "Success" });
      }
    } catch (error) {
      //   console.log(error);
      res.status(500).json({ message: "Something happened.", error: error });
    }
  }
);

export default router;
