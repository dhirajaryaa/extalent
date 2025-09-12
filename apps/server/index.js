import app from "./app.js";
import connectDB from "./db/connect.js";
import { port } from "./config/env.js";
import userInfoExtractorWorker from "./queue/queueWorker.js"; // only import so can that run worker [!important for if run worker on same  , recommended run on anther process using node cluster]

// server listen
connectDB()
.then(()=>{
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})
.catch((error)=>{
  console.log("unable to connect to database", error);
  process.exit(1);
})
