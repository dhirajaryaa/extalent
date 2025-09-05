import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { userSavedJobs } from "../controllers/job.controller.js";

const router = Router();

// get saved jobs 
router.get("/saved", authMiddleware, userSavedJobs);

export default router;
