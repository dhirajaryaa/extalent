import { userInfoExtractor } from "../queueJob.js";

async function userGithubStats(username) {
  if (!username) return;
  const job = await userInfoExtractor.add("userGithubStats", { username });
  console.log(`job added with id: ${job.id}`);
  return { jobId: job.id, message: "github stats fetching job added" };
}

export default userGithubStats;
