import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import userModal from "../model/user.model.js";
import resumeModal from "../model/resume.model.js";
import {
  removeFromCloudinary,
  uploadOnCloudinary,
} from "../services/cloudinary.service.js";
import parseResume from "../services/resume.service.js";

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
  // text extract form pdf
  const resumeRowText = await parseResume(userLocalResume);
  // upload on cloudinary
  const uploadedResume = await uploadOnCloudinary(userLocalResume);
  if (!uploadedResume) {
    throw new ApiError(500, "failed to upload! try again");
  }
  const thumbnailUrl = `https://res.cloudinary.com/dhirajarya80/image/upload/f_auto,q_auto,pg_1/${uploadedResume.public_id}`;

  // get resume info
  let resume = await resumeModal.findOne({ userId: req.user._id });
  if (!resume) {
    resume = await resumeModal.create({ userId: req.user._id });
  }
  // remove previous resume
  if (resume.publicId) {
    await removeFromCloudinary(resume.publicId);
  }
  // update on db
  await resumeModal.findByIdAndUpdate(resume._id, {
    publicId: uploadedResume.public_id,
    url: uploadedResume.secure_url,
    thumbnailUrl,
    rowText: resumeRowText,
  });

  return res.status(200).json(
    new ApiResponse(200, "Resume uploaded successfully", {
      user: req.user._id,
      resume: { pdf: uploadedResume.secure_url, preview: thumbnailUrl },
    })
  );
});

const resumeInfo = AsyncHandler(async (req,res) => {
  if (!req.user) {
    throw new ApiError(400, "UnAuthorized Access! ");
  }
  const resume = await resumeModal.findOne({ userId: req.user._id }).select("rowText skills aiData");
  return res.status(200).json(new ApiResponse(200, "Resume info.", resume));
})

export { userProfile, userResumeUpload,resumeInfo };
