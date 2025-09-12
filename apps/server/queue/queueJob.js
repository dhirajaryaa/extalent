import { FlowProducer } from "bullmq";
import redisClient from "../config/redis.js";

// create new flow producer
const flowQueue = new FlowProducer({
  connection: redisClient,
});

const queueName = "userInfoPipeline";
async function userInfoExtractor(pdfLocalFilePath) {
  if (!pdfLocalFilePath) {
    throw new Error("fail to trigger queue job, pdf path missing!");
  }

  const flowTree = await flowQueue.add({
    // save on data base
    name: "Save_On_DB",
    queueName,
    children: [
      {
        // Get Github Info
        name: "Github_Stats",
        queueName,
        children: [
          {
            // Gen AI Parse data
            name: "GenAI_Info_Extractor",
            queueName,
            children: [
              {
                // pdf-Parser
                name: "User_pdf_Reader",
                queueName,
                data: { pdfLocalFilePath },
              },
            ],
          },
        ],
      },
    ],
  });
  return flowTree;
}

export default userInfoExtractor;
