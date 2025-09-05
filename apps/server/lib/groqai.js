import Groq from "groq-sdk";
import { groqApiKey } from "../config/env.js";

const groqClient = new Groq({
  apiKey: groqApiKey,
});

export default groqClient;
