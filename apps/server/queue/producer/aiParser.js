import { userInfoExtractor } from "../queueJob.js";

async function genAIParser(prompt) {
  if (!prompt) return;
  const job = await userInfoExtractor.add("genAIParser", { prompt });
  console.log(`job added with id: ${job.id}`);
  return { jobId: job.id, message: "gen ai parse job added" };
}

export default genAIParser;
