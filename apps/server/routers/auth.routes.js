import { Router } from "express";
import passport from "passport";
import { googleAuth } from "../controllers/auth.controller.js";

const router = Router();

// auth routes

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

export default router;