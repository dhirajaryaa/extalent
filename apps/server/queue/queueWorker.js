import { Worker } from "bullmq";
import redisClient from "../config/redis.js";
import parseResume from "../services/resume.service.js";
import { extractUserInfo } from "../prompt/user.prompt.js";
import genAI from "../services/genai.service.js";
import { githubUserReadme } from "../services/github.service.js";

const userInfoExtractorWorker = new Worker(
  "userInfoPipeline",
  async (job) => {
    switch (job.name) {
      case "User_pdf_Reader": {
        //! read resume to extract text
        const pdfPath = job.data.pdf;
        const rowText = await parseResume(pdfPath);
        return rowText;
      }

      case "GenAI_Info_Extractor": {
        //! run gen ai to structure resume data
        const data = await job.getChildrenValues();
        const rowText = Object.values(data)[0];
        const prompt = extractUserInfo.replace("{{RESUME_TEXT}}", rowText);
        const llmRes = await genAI(prompt);
        const userInfo = JSON.parse(llmRes);
        console.log(userInfo);
        return userInfo;
      }

      case "Github_Stats": {
        //! get github stats
        const data = await job.getChildrenValues();
        const username = Object.values(data)[0];
        const readme = await githubUserReadme(username);
        console.log(readme);
        return readme;
      }
    }
  },
  {
    connection: redisClient,
    // lockDuration: 60000, // wait for 1 min before next job
  }
);

userInfoExtractorWorker.on("ready", () => {
  console.log("worker is ready ✨");
});

userInfoExtractorWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with reason: ${job.failedReason}`);
});

export default userInfoExtractorWorker;
