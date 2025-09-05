import Groq from "groq-sdk";
import { groqApiKey } from "../config/env.js";

const groqClient = new Groq({
  apiKey: groqApiKey,
});

async function genAI(userPrompt, systemPrompt, model, config) {
  return await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    model: model || "llama-3.3-70b-versatile",
    // others config go here
    ...config,
  });
}

export default genAI;
