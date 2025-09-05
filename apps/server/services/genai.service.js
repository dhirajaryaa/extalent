import groqClient from "../lib/groqai.js";
import systemPrompt from "../prompt/system.prompt.js";

async function genAI(userPrompt, userSystemPrompt, model, config) {
  return await groqClient.chat.completions.create({
    messages: [
      {
        role: "system",
        content: userSystemPrompt || systemPrompt,
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
