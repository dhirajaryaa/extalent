import { userInfoExtractor } from "../queueJob.js";

async function genAIParser(rowText) {
  if (!rowText) return;
  const job = await userInfoExtractor.add("genAIParser", { rowText });
  console.log(`job added with id: ${job.id}`);
  return { jobId: job.id, message: "gen ai parse job added" };
}

export default genAIParser;
