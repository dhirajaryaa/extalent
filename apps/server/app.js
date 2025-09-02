import express from "express";
import cors from "cors";
import passport from './config/passport.js';
import cookieParser from "cookie-parser";

const app = express();

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser())
app.use(passport.initialize());

//** Routes setup */
app.get("/", (req, res) => {
  return res.status(200).json({ message: "welcome to extalent api services. please use /api/v1/auth routes for authentication" });
})
// auth routes 
import authRoutes from "./routers/auth.routes.js";
app.use("/api/v1/auth", authRoutes);
// user routes
import userRoutes from "./routers/user.routes.js";
app.use("/api/v1/", userRoutes);




//* Error Handler */
app.use((err, req, res, next) => {
  console.error("💥 Oops! Something went wrong:", err.stack); // Log the error for debugging
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ ...err, message });
});

export default app;
