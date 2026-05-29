import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getBotResponse } from '../utils/chatbotBrain';
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

// Calls Groq API directly from the browser (free, high limits)
async function callGroq(userMessage, conversationHistory) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

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
    await axios.post('/api/chat/send', {
      senderId: 'user',
      receiverId: 'ai-assistant',
      message,
      chatType: 'ai'
    }, { timeout: 3000 });
  } catch (_) {}
}

// Render bold & newlines in bubble
function FormattedMessage({ text }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-2 leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        
        // Handle unordered lists
        const isUList = line.trim().match(/^[-*]\s+(.+)/);
        // Handle ordered lists
        const isOList = line.trim().match(/^(\d+\.)\s+(.+)/);

        let content = line;
        let bullet = null;

        if (isUList) {
          content = isUList[1];
          bullet = <span className="text-[#5AA7A7] mr-2 mt-[-1px] text-lg leading-none">•</span>;
        } else if (isOList) {
          content = isOList[2];
          bullet = <span className="text-[#5AA7A7] font-extrabold mr-1.5">{isOList[1]}</span>;
        }

        // Render **bold** markdown
        const parts = content.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-extrabold text-slate-800 dark:text-white bg-[#5AA7A7]/10 px-1 py-0.5 rounded-md">{part}</strong> : part
        );

        return (
          <div key={i} className={`text-[11px] text-slate-600 dark:text-slate-300 ${isUList || isOList ? 'flex items-start ml-2 mb-1' : ''}`}>
            {bullet}
            <div className={isUList || isOList ? 'flex-1' : ''}>{rendered}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function ChatbotWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  if (location.pathname === '/chatbot') return null;

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { sender: 'user', text, time: now }]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await axios.post('/api/chat/send', {
        senderId: 'user',
        receiverId: 'ai-assistant',
        message: text,
        chatType: 'ai'
      });
      
      const { messages: updatedMessages } = response.data;
      if (updatedMessages && updatedMessages.length > 0) {
        const lastMsg = updatedMessages[updatedMessages.length - 1];
        setMessages(prev => [...prev, { sender: 'ai', text: lastMsg.text, time: now }]);
        
        // Check for follow up message (second to last message if both were added)
        if (updatedMessages.length >= 2) {
          const secondLast = updatedMessages[updatedMessages.length - 2];
          if (secondLast.isFollowUp || (lastMsg.isFollowUp)) {
            // this is an edge case, we just pull the history
            setMessages(updatedMessages);
          }
        }
      }
    } catch (err) {
      console.error('Chat API error:', err);
      setError(`API Error: ${err.message}`);
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">

      {/* Trigger button */}
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
          <div className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Ask AI Assistant
          </div>
        </button>
      )}

      {/* Chat window */}
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
                  Powered by AI
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
          <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/20 min-h-0">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-primary to-mint flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">AI</span>
                  </div>
                )}
                <div className={`p-3 rounded-2xl text-xs max-w-[88%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : msg.isFollowUp
                    ? 'bg-[#c6f0ea]/40 text-slate-700 dark:text-slate-200 rounded-tl-none border border-[#5AA7A7]/20'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700/30 shadow-sm'
                }`}>
                  {msg.sender === 'ai'
                    ? <FormattedMessage text={msg.text} />
                    : <p>{msg.text}</p>
                  }
                </div>
                <span className="text-[8px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-none border border-slate-100 dark:border-slate-700/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#5AA7A7] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#5AA7A7] rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#5AA7A7] rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {showPrompts && (
            <div className="px-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Try asking</span>
              <div className="flex flex-col gap-1">
                {SUGGESTED_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p)}
                    className="text-[10px] text-left text-primary hover:text-white bg-primary/10 hover:bg-primary px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="px-4 py-1.5 bg-amber-500/10 border-t border-amber-500/20 text-[9px] text-amber-600 dark:text-amber-400 flex items-center gap-1 shrink-0">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>For education only. Always consult a licensed dermatologist.</span>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center gap-2 shrink-0"
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
