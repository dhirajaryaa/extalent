import express from "express";
import cors from "cors";

const app = express();

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

//* Error Handler */
app.use((err, req, res, next) => {
  console.error("💥 Oops! Something went wrong:", err.stack); // Log the error for debugging
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ ...err, message });
});

export default app;
