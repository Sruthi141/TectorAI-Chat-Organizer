import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// quick health check
app.get("/health", (_req, res) => res.json({ ok: true }));

console.log("Key loaded?", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: String(message) }],
    });

    return res.json({ reply: response.choices[0]?.message?.content ?? "" });
  } catch (err) {
    const code = err?.error?.code || err?.code;
    console.error("OpenAI error:", code, err?.message);

    if (code === "invalid_api_key") {
      return res.status(401).json({ error: "Invalid API key. Check server/.env" });
    }
    if (code === "insufficient_quota") {
      return res.status(402).json({ error: "Quota exceeded / billing not enabled." });
    }

    return res.status(500).json({ error: "Server error calling OpenAI." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});