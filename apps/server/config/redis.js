import { redisDbUri } from "./env";
import { Redis } from "ioredis";

const redisClient = new Redis({ url: redisDbUri, maxRetriesPerRequest: 2 });

export default redisClient;