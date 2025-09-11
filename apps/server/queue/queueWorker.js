import { Worker } from "bullmq";
import redisClient from "../config/redis.js";

const userInfoExtractorWorker = new Worker(
  "userInfoPipeline",
  async (job) => {},
  {
    connection: redisClient,
    removeOnComplete: true,
  }
);


export default userInfoExtractorWorker;