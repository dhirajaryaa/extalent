import { Queue, QueueEvents} from "bullmq";
import redisClient from "../config/redis.js";
import genAIParser from "./producer/aiParser.js";

const userInfoExtractor = new Queue("user-info-extractor", {
  connection: redisClient,
});
const userInfoExtractorEvent = new QueueEvents("user-info-extractor");

// setup listener for queue events
userInfoExtractorEvent.on("completed",async ({jobId,returnvalue}) => {
const  jobName =  await userInfoExtractor.getJob(jobId);
if(jobName.name === 'pdfParser'){
  await genAIParser(returnvalue)
};
if(jobName.name === 'genAIParser'){

  console.log("ai data returned");
  
  // console.log(returnvalue);
};

});

export { userInfoExtractor, userInfoExtractorEvent };
