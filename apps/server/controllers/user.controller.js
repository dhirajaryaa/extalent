import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import userModal from "../model/user.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";

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
  const thumbnailUrl = `https://res.cloudinary.com/dhirajarya80/image/upload/f_auto,q_auto,pg_1/${uploadedResume.public_id}`
  // save on db
  const user = await userModal.findByIdAndUpdate(
    req.user._id,
    {
      resume: {
        publicId: uploadedResume.public_id,
        url: uploadedResume.secure_url,
        thumbnailUrl
      },
    },
    {
      new: true,
      select: "_id name email avatar",
    }
  );

  return res.status(200).json(
    new ApiResponse(200, "Resume uploaded successfully", {
      user,
      resume: {pdf:uploadedResume.secure_url,preview:thumbnailUrl },
    })
  );
});

export { userProfile, userResumeUpload };
