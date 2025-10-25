import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

// security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json({ limit: "10mb" }));

app.post("/api/explain-code", async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    // const messages = [
    //   {
    //     role: "user",
    //     content: `Explain the following ${
    //       language || ""
    //     } code in simple terms:\n\n\`\`\`${language || ""}\n${code}\n\`\`\` `,
    //   },
    // ];

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Explain the following ${
          language || ""
        } code in simple terms:\n\n\`\`\`${language || ""}\n${code}\n\`\`\` `;
    // const response = await model.generateContent([
    //     { role: "user", parts: [{ text: prompt }] }
    //   ]);
    const response = await model.generateContent(prompt);
    const explanation = response.response.text();
    if(!explanation){
        return res.status(500).json({ error: "Failed to explain code" });
    }
  } catch (err) {
    console.error("Code Explain API Error", err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})