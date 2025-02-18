const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/responseHandler");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.analyzeResume = asyncHandler(async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) {
    res.status(400);
    throw new Error("Resume text is required");
  }

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo",
    prompt: `Analyze the following resume and provide insights for job matching: ${resumeText}`,
    max_tokens: 200,
  });

  sendResponse(res, 200, true, "Resume analyzed successfully", response.choices[0].text);
});
