import { Queue, QueueEvents} from "bullmq";
import redisClient from "../config/redis.js";

const userInfoExtractor = new Queue("user-info-extractor", {
  connection: redisClient,
});
const userInfoExtractorEvent = new QueueEvents("user-info-extractor");



userInfoExtractorEvent.on("failed", ({ jobId, failedReason }) => {
  console.log(`Job ${jobId} failed: ${failedReason}`);
});
userInfoExtractorEvent.on("completed", ({ jobId, returnvalue }) => {
  console.log(`Job ${jobId} completed`);
});


export { userInfoExtractor, userInfoExtractorEvent };
