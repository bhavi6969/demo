const ChatHistory = require("../models/ChatHistory");
const { getBotResponse } = require("../utils/localChatbotBrain");

const SCAN_TRIGGERS = [
  'rash', 'spot', 'mole', 'lesion', 'bump', 
  'patch', 'mark', 'growth', 'sore', 'blister', 
  'lump', 'discoloration', 'discolouration'
];

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = async (req, res) => {
  try {
    let chat = await ChatHistory.findOne({ userId: req.user._id });
    
    if (!chat) {
      // Create empty history
      chat = await ChatHistory.create({
        userId: req.user._id,
        messages: []
      });
    }
    
    res.json({
      success: true,
      messages: chat.messages
    });
  } catch (error) {
    console.error("Error in getChatHistory:", error);
    res.status(500).json({
      success: false,
      message: "Server Error retrieving chat history"
    });
  }
};

// @desc    Send chat message and get response
// @route   POST /api/chat/message
// @access  Private
const sendMessage = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Please provide message text"
    });
  }

  try {
    let chat = await ChatHistory.findOne({ userId: req.user._id });
    if (!chat) {
      chat = new ChatHistory({ userId: req.user._id, messages: [] });
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add user message to history
    const userMsg = {
      sender: "user",
      text,
      time
    };
    chat.messages.push(userMsg);
    await chat.save();

    // Determine if we show scan CTA
    const showScanCta = SCAN_TRIGGERS.some(kw => text.toLowerCase().includes(kw));

    let aiReplyText = "";
    let isFollowUpMessage = false;
    let followUpText = null;

    // Check if Groq API key exists (we hardcode fallback here to ensure it works)
    const groqApiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    if (groqApiKey) {
      try {
        // Map last 10 messages for conversational context
        const contextMessages = chat.messages.slice(-10).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

        const response = await fetch(
          `https://api.groq.com/openai/v1/chat/completions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${groqApiKey}`
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [
                {
                  role: "system",
                  content: "You are DermaVision's Skin AI Assistant. You are a helpful, expert clinical dermoscopy triager and skin wellness assistant. Provide friendly, evidence-based suggestions about skincare routines, skin conditions, diet tips, and general lifestyle habits. Always include a disclaimer that you are an AI assistant and not a medical doctor, especially for serious concerns. Keep answers relatively concise and easy to read."
                },
                ...contextMessages
              ],
              max_tokens: 1024,
              temperature: 0.4
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            aiReplyText = data.choices[0].message.content;
          }
        } else {
          console.warn("Groq API call failed with status code: " + response.status + ". Falling back to local brain.");
        }
      } catch (apiError) {
        console.error("Groq API Error, falling back to local brain:", apiError);
      }
    }

    // Fallback to local rule-based response if Gemini API key is missing or failed
    if (!aiReplyText) {
      const fallbackResult = getBotResponse(text);
      aiReplyText = fallbackResult.reply;
      followUpText = fallbackResult.followUp;
    }

    // 2. Add AI reply to history
    const aiMsg = {
      sender: "ai",
      text: aiReplyText,
      time,
      showScanCta
    };
    chat.messages.push(aiMsg);

    // If there is a local follow-up, add that too
    if (followUpText) {
      chat.messages.push({
        sender: "ai",
        text: followUpText,
        time,
        isFollowUp: true
      });
    }

    await chat.save();

    res.json({
      success: true,
      messages: chat.messages
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({
      success: false,
      message: "Server Error sending chat message"
    });
  }
};

// @desc    Clear chat history
// @route   DELETE /api/chat/history
// @access  Private
const clearChatHistory = async (req, res) => {
  try {
    let chat = await ChatHistory.findOne({ userId: req.user._id });
    
    if (chat) {
      chat.messages = [];
      await chat.save();
    } else {
      chat = await ChatHistory.create({
        userId: req.user._id,
        messages: []
      });
    }

    res.json({
      success: true,
      messages: chat.messages
    });
  } catch (error) {
    console.error("Error in clearChatHistory:", error);
    res.status(500).json({
      success: false,
      message: "Server Error clearing chat history"
    });
  }
};

module.exports = {
  getChatHistory,
  sendMessage,
  clearChatHistory
};
