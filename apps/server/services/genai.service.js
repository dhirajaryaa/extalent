import groqClient from "../lib/groqai.js";

async function genAI(userPrompt, systemPrompt, model, config) {
  return await groqClient.chat.completions.create({
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
