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

const saveNewJobs = AsyncHandler(async (req, res) => {
  const { title, description, company, location, salary, experience, jobType } =
    req.body;
  // check all required fields
  if (
    !(
      title &&
      description &&
      company &&
      location &&
      salary &&
      experience &&
      jobType
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const jobs = await jobModal.create({
    userId: req.user._id,
    title,
    description,
    company,
    location,
    salary,
    experience,
    type: jobType,
  });
  if (!jobs) {
    throw new ApiError(500, "failed to save job");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "job saved successfully", jobs));
});

const jobMatchScore = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, "job match score calculated successfully", null)
    );
});

export { userSavedJobs, saveNewJobs, jobMatchScore };
