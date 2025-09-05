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
import {
  githubRepoInfo,
  githubUserInfo,
  githubUserReadme,
} from "../services/github.service.js";
import githubModal from "../model/github.model.js";
import genAI from "../services/genai.service.js";
import { extractUserInfo } from "../prompt/user.prompt.js";

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

const resumeInfo = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(400, "UnAuthorized Access! ");
  }
  const resume = await resumeModal
    .findOne({ userId: req.user._id })
    .select("rowText skills aiData");
  return res.status(200).json(new ApiResponse(200, "Resume info.", resume));
});

const userGithubInfo = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(400, "UnAuthorized Access! ");
  }
  // github collection create or fetch
  let github = await githubModal.findOne({ userId: req.user._id });
  if (!github?.username) {
    throw new ApiError(400, "Github username not found");
  }
  // github user info get
  const githubUser = await githubUserInfo(github.username);
  // github profile readme
  const userReadme = await githubUserReadme(github.username);
  // github repo info get
  const githubRepos = await githubRepoInfo(github.username);
  // store working topics
  const topics = new Set([]);
  githubRepos.forEach((repo) => {
    repo.topics.forEach((topic) => {
      topics.add(topic);
    });
  });
  // top repos
  const topRepos = githubRepos
    ?.map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stars: repo.stargazers_count,
      size: repo.size,
      topics: repo.topics,
      languages: repo.languages,
      defaultBranch: repo.default_branch,
      recentActivity: repo.pushed_at,
      score: (
        repo.stargazers_count * 2 +
        repo.forks_count * 1.5 +
        repo.size * 0.01
      ).toFixed(2),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  // languages co
  const languageCount = {};
  githubRepos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });
  const topLanguages = Object.entries(languageCount).map(([lang, count]) => ({
    name: lang,
    repos: count,
  }));

  // save in db
  const updateGithub = await githubModal.findByIdAndUpdate(
    github._id,
    {
      name: githubUser.name,
      username: githubUser.username,
      bio: githubUser.bio,
      location: githubUser.location,
      blog: githubUser.blog,
      publicRepoCount: githubUser.public_repos,
      readme: userReadme,
      languages: topLanguages,
      userWorkTopics: Array.from(topics),
      topRepos,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "user Github info fetched.", updateGithub));
});

const userAllInformation = AsyncHandler(async (req, res) => {
  // get row text
  const resume = await resumeModal.findOne({ userId: req.user._id });
  if (!resume) {
    throw new ApiError(400, "failed! upload resume first.");
  }
  // send to llm
  const prompt = extractUserInfo.replace("{{RESUME_TEXT}}", resume.rowText);
  const llmRes = await genAI(prompt);
  const { skills,...userInfo } = JSON.parse(llmRes);
  // update in db or create new
  await resumeModal.findByIdAndUpdate(resume._id, {
    aiData: userInfo,
    skills,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "user information fetched.", userInfo));
});

export {
  userProfile,
  userResumeUpload,
  resumeInfo,
  userGithubInfo,
  userAllInformation,
};
