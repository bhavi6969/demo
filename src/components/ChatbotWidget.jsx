import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
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
  text: "Hello! I'm your AI dermatology assistant. Ask me about any skin condition — I can explain symptoms, causes, and treatment options.",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const SUGGESTED_PROMPTS = [
  "Is my mole dangerous?",
  "How to manage sudden acne flares?",
  "Skincare routine for eczema"
];

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

// Calls Groq API directly from the browser (free, high limits)
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

// Fire-and-forget backend save — AI still works if backend is down
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

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  if (location.pathname === '/chatbot') return null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const now = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const history = messages.slice(1);
    setMessages((prev) => [...prev, { sender: 'user', text, time: now() }]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);
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
          text: "I'm having trouble responding right now. Please check your API key or try again shortly.",
          time: now()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setInputValue('');
  };

  const showPrompts = messages.length === 1 && !isTyping;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-blue-accent text-white shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Open AI assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-mint items-center justify-center text-[9px] text-white font-extrabold">1</span>
          </span>
          <div className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Ask AI Assistant
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] h-[520px] rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden border border-slate-200/50 dark:border-slate-800/80 animate-in slide-in-from-bottom-5 duration-300">

          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-blue-accent text-white flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-sand" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-sm leading-none">DermaVision AI</h5>
                <span className="text-[10px] text-slate-100/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                  Powered by Groq · LLaMA 3.3
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                title="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="px-3 py-1.5 bg-red-500/10 border-b border-red-500/20 text-[9px] text-red-500 flex items-center gap-1 flex-shrink-0">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/20">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl text-xs max-w-[88%] ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700/30 shadow-sm'
                }`}>
                  {msg.sender === 'ai'
                    ? <FormattedMessage text={msg.text} />
                    : <p className="leading-relaxed">{msg.text}</p>
                  }
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="p-3 rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/30 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {showPrompts && (
            <div className="px-4 py-2 bg-slate-100/50 dark:bg-slate-900/30 space-y-1.5 flex-shrink-0">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Suggested queries
              </span>
              <div className="flex flex-col gap-1">
                {SUGGESTED_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p)}
                    className="text-[10px] text-left text-primary hover:text-white bg-primary/10 hover:bg-primary px-2.5 py-1.5 rounded-lg font-medium transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="px-4 py-1.5 bg-amber-500/10 border-y border-amber-500/20 text-[9px] text-amber-600 dark:text-amber-400 flex items-center gap-1 flex-shrink-0">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>For education only. Always consult a licensed dermatologist.</span>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about a skin condition…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              className="flex-1 py-2 px-3 text-xs bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary dark:text-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="p-2.5 rounded-xl bg-primary hover:brightness-105 text-white shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
