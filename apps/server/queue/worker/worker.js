import { Worker } from "bullmq";
import redisClient from "../../config/redis.js";
import parseResume from "../../services/resume.service.js";
import genAI from "../../services/genai.service.js";
import { extractUserInfo } from "../../prompt/user.prompt.js";

const worker = new Worker(
  "user-info-extractor",
  async (job) => {
    if (job.name === "pdfParser") {
        // run resume parser services 
      const rowText = await parseResume(job.data.localFilePath);
      return rowText;
    } else if (job.name === "genAIParser") {
        // user prompt 
      const prompt = extractUserInfo.replace(
        "{{RESUME_TEXT}}",
        job.data.rowText
      );
    //   run ai Response parser services 
      const aiRes = await genAI(prompt);
      return JSON.parse(aiRes);
    }
    // Optional: handle other job types
    throw new Error(`Unknown job name: ${job.name}`);
  },
  { connection: redisClient }
);

export default worker;
