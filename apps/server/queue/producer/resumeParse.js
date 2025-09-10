import { userInfoExtractor } from "../queueJob.js";

async function pdfParser(localFilePath) {
  if(!localFilePath) return;
  const job = await userInfoExtractor.add(
    "pdfParser",
    { localFilePath },
    { priority: 100 }
  );
  console.log(`job added with id: ${job.id}`);
  return { jobId: job.id, message: "pdf parse job added" };
}

export default pdfParser;