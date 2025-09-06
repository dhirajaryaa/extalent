import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  jobMatchScore,
  jobScoreHistory,
  saveNewJobs,
  userSavedJobs,
} from "../controllers/job.controller.js";

const router = Router();

// get saved jobs
router.get("/saved", authMiddleware, userSavedJobs);
// save new jobs
router.post("/save", authMiddleware, saveNewJobs);
// generate match score
router.post("/match", authMiddleware, jobMatchScore);
// history job match score
router.get("/history", authMiddleware, jobScoreHistory);

export default router;
