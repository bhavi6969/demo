const express = require("express");
const Chat = require("../models/Chat");

const router = express.Router();

const SYSTEM_PROMPT = `You are DermaVision AI, a clinical dermatology assistant. You provide structured, evidence-based educational information about skin conditions.

When a user asks about a skin disease or symptoms, respond in this exact format:
Disease Name: [name]
Definition: [1–2 sentence definition]
Symptoms: [key symptoms]
Causes: [main causes]
Treatment/Management: [key treatment approaches]

This information is for educational purposes only. Please consult a healthcare professional for medical advice.

Rules:
- If the user greets you, respond warmly and ask how you can help with their skin health.
- If the query is unclear, ask for more detail about symptoms, location, and duration.
- Never diagnose. Always recommend professional evaluation for serious concerns.
- Keep responses concise and clinically accurate.
- Always end medical information with the disclaimer above.`;

// POST /api/chat/send
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, message, conversationHistory = [] } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ success: false, error: "Message cannot be empty" });
    }

    // Save to DB (non-blocking)
    const chat = new Chat({
      senderId: senderId ?? null,
      receiverId: receiverId ?? null,
      message,
      timestamp: new Date()
    });
    chat.save().catch((e) => console.warn("DB save failed:", e.message));

    // Build messages for Groq (OpenAI-compatible format)
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      })),
      { role: "user", content: message }
    ];

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 1024,
        temperature: 0.4
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Groq API error ${response.status}`);
    }

    const data = await response.json();
    const aiReply = data.choices[0]?.message?.content || "No response received.";

    return res.json({
      success: true,
      userMessage: {
        _id: chat._id,
        message,
        timestamp: chat.timestamp,
        sender: "user"
      },
      aiMessage: {
        message: aiReply,
        timestamp: new Date(),
        sender: "ai"
      }
    });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/chat/history/:userId/:doctorId
router.get("/history/:userId/:doctorId", async (req, res) => {
  try {
    const { userId, doctorId } = req.params;

    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: doctorId },
        { senderId: doctorId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 });

    return res.json({ success: true, messages });
  } catch (error) {
    console.error("History fetch error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
