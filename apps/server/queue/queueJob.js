import { Queue, QueueEvents } from "bullmq";
import redisClient from "../config/redis.js";

const userInfoExtractor = new Queue("user-info-extractor", {
  connection: redisClient,
});
const userInfoExtractorEvent = new QueueEvents("user-info-extractor");

// setup listener for queue events
userInfoExtractorEvent.on("completed", ({ jobId, returnedValue }) => {
  console.log(
    `job completed with id: ${jobId} and returned value: ${returnedValue}`
  );
});

export { userInfoExtractor, userInfoExtractorEvent };
