import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs/promises";
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
  secure: true,
});

const uploadOnCloudinary = async (fileLocalPath) => {
  if (!fileLocalPath) return "file not found";

  // upload on cloudinary
  const res = await cloudinary.uploader.upload(fileLocalPath, {
    folder: "extalent",
    resource_type: "auto",
    pages: true,
  });
  await fs.unlink(fileLocalPath);
  return res;
};

const removeFromCloudinary = async (publicId) => {
  if (!publicId) return "file not found";
  return await cloudinary.uploader.destroy(publicId);
};

export { uploadOnCloudinary,removeFromCloudinary };
