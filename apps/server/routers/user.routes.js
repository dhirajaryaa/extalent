import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  resumeInfo,
  userProfile,
  userResumeUpload,
} from "../controllers/user.controller.js";

const router = Router();

// user profile
router.get("/profile", authMiddleware, userProfile);
// user resume upload
router.post(
  "/profile/upload",
  authMiddleware,
  upload.single("resume"),
  userResumeUpload
);
// user resume information
router.get("/profile/resume/info", authMiddleware, resumeInfo);

export default router;
