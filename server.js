const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.join(__dirname, "data", ".env") });

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" and "views" folders
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use("/Img", express.static(path.join(__dirname, "Img")));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Gemini AI setup
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in .env file");
}

// AI Route
app.post("/api/ai", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "AI service not configured" });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (prompt.length > 4000) {
      return res.status(400).json({
        error: "Prompt too large",
      });
    }

    // const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 5000,
      },
    });

    // const result = await model.generateContent(prompt);

    const finalPrompt = `
Keep responses concise and clean.
Use short explanations.
If code is needed, provide minimal code.

User:
${prompt}
`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    // res.status(500).json({ error: 'Failed to get AI response' });

    console.error("FULL ERROR:", error);

    res.status(500).json({
      error: error.message || "Failed to get AI response",
    });
  }
});

// Route handling
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("404: Page Not Found");
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
