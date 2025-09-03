import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import userModal from "../model/user.model.js";
import {
  removeFromCloudinary,
  uploadOnCloudinary,
} from "../services/cloudinary.js";

const userProfile = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(400, "UnAuthorized Access! Please Login First.");
  }
  const user = await userModal
    .findById(req.user?._id)
    .select("-googleId -refreshToken");
  return res.status(200).json(new ApiResponse(200, "user Profile.", user));
});

const userResumeUpload = AsyncHandler(async (req, res) => {
  const userLocalResume = req.file?.path;
  if (!userLocalResume) {
    throw new ApiError(400, "Resume not found or failed to upload");
  }
  // upload on cloudinary
  const uploadedResume = await uploadOnCloudinary(userLocalResume);
  if (!uploadedResume) {
    throw new ApiError(500, "failed to upload! try again");
  }
  const thumbnailUrl = `https://res.cloudinary.com/dhirajarya80/image/upload/f_auto,q_auto,pg_1/${uploadedResume.public_id}`;
  // get user info
  const user = await userModal
    .findById(req.user._id)
    .select("_id name email resume");
  // remove previous resume
  if (user.resume.publicId) {
    await removeFromCloudinary(user.resume.publicId);
  }
  // update on db
  await userModal.findByIdAndUpdate(req.user._id, {
    resume: {
      publicId: uploadedResume.public_id,
      url: uploadedResume.secure_url,
      thumbnailUrl,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, "Resume uploaded successfully", {
      user: { _id: user._id, name: user.name, email: user.email },
      resume: { pdf: uploadedResume.secure_url, preview: thumbnailUrl },
    })
  );
});

export { userProfile, userResumeUpload };
