import groqClient from "../lib/groqai.js";
import systemPrompt from "../prompt/system.prompt.js";

async function genAI(userPrompt, userSystemPrompt, model, config) {
  const res = await main(userPrompt, userSystemPrompt, model, config);
  return res.choices[0].message.content;
}
async function main(userPrompt, userSystemPrompt, model, config) {
  return await groqClient.chat.completions
    .create({
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
      response_format: { type: "json_object" },
      temperature: 0.3,
      // others config go here
      ...config,
    })
    .catch((error) => {
      throw new Error({ statusCode: error.code, message: error.message });
    });
}

export default genAI;
