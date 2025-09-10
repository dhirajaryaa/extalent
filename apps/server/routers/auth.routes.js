import { Router } from "express";
import passport from "passport";
import authMiddleware from "../middlewares/auth.middleware.js";
import googleAuth from "../controllers/auth/googleAuth.controller.js";
import userLogout from "../controllers/auth/logout.controller.js";
import getCurrentUser from "../controllers/auth/currentUser.controller.js";
import tokenRefresh from "../controllers/auth/tokenRefresh.controller.js";

const router = Router();

// login with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
// login google callback url
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
    failureMessage: "failed to login with google",
  }),
  googleAuth
);
// user logout
router.post("/logout", authMiddleware, userLogout);
// user profile
router.get("/me", authMiddleware, getCurrentUser);
// user token refresh
router.get("/refresh", tokenRefresh);

export default router;
