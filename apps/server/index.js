import app from "./app.js";
import connectDB from "./db/connect.js";
import { port } from "./config/env.js";

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
