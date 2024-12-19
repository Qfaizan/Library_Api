const openaiModule = require("openai");
const { Configuration, OpenAIApi } = openaiModule;

async function generateText(question:any) {
  try {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 100,
    });

    console.log(response.data.choices[0].text.trim());
  } catch (error:any) {
    console.error("Error with OpenAI API:", error.response?.data || error.message);
  }
}

module.exports = generateText;
