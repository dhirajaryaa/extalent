import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { saveNewJobs, userSavedJobs } from "../controllers/job.controller.js";

const router = Router();

// get saved jobs 
router.get("/saved", authMiddleware, userSavedJobs);
// save new jobs
router.post("/save", authMiddleware, saveNewJobs);

export default router;
