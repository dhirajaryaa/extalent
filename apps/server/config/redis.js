import { redisDbUri } from "./env.js";
import { Redis } from "ioredis";

const redisClient = new Redis({ url: redisDbUri, maxRetriesPerRequest: 2 });

export default redisClient;