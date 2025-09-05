import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  resumeInfo,
  userAllInformation,
  userGithubInfo,
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
//* user resume information
router.get("/profile/github", authMiddleware, userGithubInfo);
//? fetch ai extracted user info based on resume.
router.get("/profile/info", authMiddleware, userAllInformation);

export default router;
