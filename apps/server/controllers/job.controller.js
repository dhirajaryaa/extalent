import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import userModal from "../model/user.model.js";
import resumeModal from "../model/resume.model.js";
import jobModal from "../model/job.model.js";

const userSavedJobs = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(400, "UnAuthorized Access!");
  }
  const jobs = await jobModal.find({ userId: req.user._id });
  if (!jobs && jobs.length === 0) {
    throw new ApiError(400, "No saved jobs found", jobs);
  }
  return res.status(200).json(new ApiResponse(200, "saved jobs.", jobs));
});


export { userSavedJobs };