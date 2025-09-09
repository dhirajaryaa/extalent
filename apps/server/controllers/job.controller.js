import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import userModal from "../model/user.model.js";
import resumeModal from "../model/resume.model.js";
import jobModal from "../model/job.model.js";
import scoreModal from "../model/score.model.js";
import { jobSorePrompt } from "../prompt/user.prompt.js";
import genAI from "../services/genai.service.js";

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
  const { linkedinJobId, jobAbout, jobTitle } = req.body;
  if (!linkedinJobId || !jobAbout || !jobTitle) {
    throw new ApiError(400, "All fields are required");
  }
  const resume = await resumeModal.findOne({ userId: req.user._id });
  if (!resume) {
    throw new ApiError(400, "failed! upload resume first.");
  }
  // generate match score
  const prompt = jobSorePrompt
    .replace("<<<JOB_TEXT>>>", JSON.stringify(req.body))
    .replace("<<<RESUME_TEXT>>>", JSON.stringify(resume.rowText));
  const response = await genAI(prompt);
  const jobScoreGen = JSON.parse(response);

  // save on db or update
  await scoreModal.create({
    userId: req.user._id,
    jobSaved: false,
    linkedinJobId,
    score: jobScoreGen.score,
    matchSkills: jobScoreGen.matchSkills,
    messingSkills: jobScoreGen.messingSkills,
    suggestedJobs: jobScoreGen.suggestedJobs,
    improvementSkills: jobScoreGen.improvementSkills,
    suggestions: jobScoreGen.suggestions,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "job match score calculated successfully",
        jobScoreGen
      )
    );
});

const jobScoreHistory = AsyncHandler(async (req, res) => {
  const scores = await scoreModal
    .find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  return res
    .status(200)
    .json(new ApiResponse(200, "job score history", scores));
});

export { userSavedJobs, saveNewJobs, jobMatchScore, jobScoreHistory };
