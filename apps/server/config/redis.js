import { redisDbUri } from "./env.js";
import { Redis } from "ioredis";

const redisClient = new Redis({ url: redisDbUri, maxRetriesPerRequest: null });

export default redisClient;