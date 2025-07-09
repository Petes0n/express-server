import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";

const router = Router();

router.post("/api/logout", isAuthenticated, async (req, res) => {
  try {
    req.session.destroy((error) => {
      res.status(200).json({ message: "Success" });
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Something happened." });
  }
});
export default router;