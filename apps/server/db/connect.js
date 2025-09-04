import mongoose from "mongoose";
import { mongoUrl } from "../config/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoUrl}/extalent`);
  } catch (err) {
    console.error("mongodb connection error", err);
    process.exit(1);
  }
};

export default connectDB;
