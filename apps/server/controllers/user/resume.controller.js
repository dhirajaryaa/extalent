import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import resumeModal from "../../model/resume.model.js";
import {
  removeFromCloudinary,
  uploadOnCloudinary,
} from "../../services/cloudinary.service.js";
import userInfoExtractor from "../../queue/queueJob.js";

const userResumeUpload = AsyncHandler(async (req, res) => {
  const userLocalResume = req.file?.path;
  if (!userLocalResume) {
    throw new ApiError(400, "Resume not found or failed to upload");
  }
  //! pdf parser job create - job run
 await userInfoExtractor(userLocalResume,req.user._id);

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
    thumbnailUrl
  });

  return res.status(200).json(
    new ApiResponse(200, "Resume uploaded successfully", {
      user: req.user._id,
      resume: { pdf: uploadedResume.secure_url, preview: thumbnailUrl },
    })
  );
});

export default userResumeUpload;
