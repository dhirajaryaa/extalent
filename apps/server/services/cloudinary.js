import { v2 as cloudinary } from "cloudinary";
import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from "../config/env.js";

// configure 
cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
  secure: true
});
