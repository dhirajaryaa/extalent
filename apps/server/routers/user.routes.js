import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { userProfile } from "../controllers/user.controller.js";

const router = Router();

// user profile
router.get("/profile", authMiddleware, userProfile);


export default router;
