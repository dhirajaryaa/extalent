import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  jobMatchScore,
  saveNewJobs,
  userSavedJobs,
} from "../controllers/job.controller.js";

const router = Router();

// get saved jobs
router.get("/saved", authMiddleware, userSavedJobs);
// save new jobs
router.post("/save", authMiddleware, saveNewJobs);
// generate match score
router.post("/score", authMiddleware, jobMatchScore);

export default router;
