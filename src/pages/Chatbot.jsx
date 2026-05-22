import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, HelpCircle, MessageSquare } from 'lucide-react';
import axios from 'axios';

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

const INITIAL_MESSAGE = {
  sender: 'ai',
  text: "Welcome to the DermaVision Skin Assistant. I can help explain skin symptoms, review skincare routines, or clarify predicted conditions. What skin queries can I address for you?",
  time: '10:00 AM'
};

// Calls Groq API directly from the browser
async function callGroq(userMessage, conversationHistory) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error('VITE_GROQ_API_KEY is not set in your .env file');

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: userMessage }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
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
  return data.choices[0]?.message?.content || 'No response received.';
}

// Fire-and-forget backend save
async function saveToBackend(message) {
  try {
    await axios.post('http://localhost:5000/api/chat/send', {
      senderId: 'user',
      receiverId: 'ai-assistant',
      message,
      chatType: 'ai'
    }, { timeout: 3000 });
  } catch (_) {}
}

// Renders "Label: value" lines with bold labels
function FormattedMessage({ text }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        const match = line.match(/^([^:]+):\s(.+)$/);
        if (match) {
          return (
            <p key={i} className="leading-relaxed">
              <span className="font-semibold">{match[1]}: </span>
              <span>{match[2]}</span>
            </p>
          );
        }
        return line.trim() === ''
          ? <div key={i} className="h-1" />
          : <p key={i} className="leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const now = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSend = async (presetText) => {
    const text = (presetText || input).trim();
    if (!text || typing) return;

    const history = messages.slice(1); // exclude initial greeting from API history
    setMessages((prev) => [...prev, { sender: 'user', text, time: now() }]);
    if (!presetText) setInput('');
    setTyping(true);
    setError(null);

    try {
      saveToBackend(text);
      const reply = await callGroq(text, history);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply, time: now() }]);
    } catch (err) {
      console.error('Groq error:', err);
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Sorry, I encountered an error. Please check your API key or try again.',
          time: now()
        }
      ]);
    } finally {
      setTyping(false);
    }
  };

  const presets = [
    "Is eczema contagious?",
    "Explain ABCDE mole assessment criteria",
    "Post-chemical peel skin care routine",
    "How does Adapalene manage acne?"
  ];

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-65px)] bg-slate-50/30 dark:bg-slate-900/10">

      {/* Top Banner */}
      <div className="px-6 py-4 bg-white dark:bg-[#16171d] border-b border-slate-200/50 dark:border-slate-800 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-mint flex items-center justify-center shadow-md">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-sm text-slate-950 dark:text-white leading-none">
              Clinical Chat Assistant
            </h2>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Powered by Groq · LLaMA 3.3
            </span>
          </div>
        </div>
        <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full font-bold border border-amber-500/20 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" /> For reference only
        </span>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-6 py-2 bg-red-500/10 border-b border-red-500/20 text-[10px] text-red-500 flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="max-w-3xl mx-auto space-y-4">

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[80%] shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700/30'
              }`}>
                {msg.sender === 'ai'
                  ? <FormattedMessage text={msg.text} />
                  : <p>{msg.text}</p>
                }
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1.5">{msg.time}</span>
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div className="flex flex-col items-start">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-none border border-slate-100 dark:border-slate-700/30 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 bg-white dark:bg-[#16171d] border-t border-slate-200/50 dark:border-slate-800 shrink-0">
        <div className="max-w-3xl mx-auto space-y-4">

          {/* Preset Chips — only shown before any user message */}
          {messages.length === 1 && !typing && (
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> Common Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                {presets.map((pr, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(pr)}
                    className="text-[10px] text-left text-primary hover:text-white bg-primary/10 hover:bg-primary px-3 py-2 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    {pr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Query skin conditions, skincare routines, or symptom logs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={typing}
              className="flex-1 py-3 px-4 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              className="p-3.5 rounded-xl bg-primary hover:brightness-105 text-white shadow-md shadow-primary/20 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
