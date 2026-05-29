import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Send, HelpCircle, MessageSquare, AlertTriangle, Sparkles, RefreshCw, ThumbsUp, ThumbsDown, Scan, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SKIN_DISEASES } from '../context/skinConditionEncyclopedia';
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
- Always end medical information with the disclaimer above.

KNOWLEDGE BASE:
Below is the strict proprietary medical knowledge base you MUST use to answer user queries. Do not hallucinate outside of this data:
`;

const INITIAL_MESSAGE = {
  sender: 'ai',
  text: "Welcome to the DermaVision Skin Assistant. I can help explain skin symptoms, review skincare routines, or clarify predicted conditions. What skin queries can I address for you?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

// Calls Groq API directly from the browser (bhavi6969's flow)
async function callGroq(userMessage, conversationHistory) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  // Build the dynamic RAG system prompt
  const ragSystemPrompt = SYSTEM_PROMPT + JSON.stringify(SKIN_DISEASES, null, 2);

  const messages = [
    { role: 'system', content: ragSystemPrompt },
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

// ── Markdown-lite & Label renderer ────────────────────────────────────────────
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
          <div key={i} className={`text-xs text-slate-600 dark:text-slate-300 ${isUList || isOList ? 'flex items-start ml-2 mb-1' : ''}`}>
            {bullet}
            <div className={isUList || isOList ? 'flex-1' : ''}>{rendered}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const PRESETS = [
  "What causes acne?", "Best routine for oily skin", "How does retinol work?",
  "Is eczema contagious?", "Foods that help skin", "How does the AI scan work?",
  "ABCDE mole assessment", "What is niacinamide?",
];

const SCAN_TRIGGERS = [
  'rash', 'spot', 'mole', 'lesion', 'bump', 'patch', 'mark',
  'growth', 'sore', 'blister', 'lump', 'discoloration', 'discolouration',
];

const makeWelcome = () => ({
  id: 0,
  sender: 'ai',
  text: INITIAL_MESSAGE.text,
  time: INITIAL_MESSAGE.time,
});

const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// ── Component ─────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const navigate = useNavigate();
  const { chatHistory, sendChatMessage, clearChat } = useApp();

  const [isListening, setIsListening] = useState(false);

  const [messages, setMessages] = useState(() =>
    chatHistory && chatHistory.length > 0 ? chatHistory : [makeWelcome()]
  );
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [reactions, setReactions] = useState({});
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + (prev ? ' ' : '') + transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error('Error starting speech recognition:', err);
      }
    }
  };

  // Sync when backend chat history loads
  useEffect(() => {
    if (chatHistory && chatHistory.length > 0) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    const q = input.toLowerCase().trim();
    if (q.length < 2) return [];
    return PRESETS.filter(p => p.toLowerCase().includes(q) && p.toLowerCase() !== q).slice(0, 3);
  }, [input]);

  const handleSend = useCallback(async (presetText) => {
    const text = (presetText || input).trim();
    if (!text || typing) return;

    if (!presetText) setInput('');

    // Optimistically add user message
    const userMsg = { id: Date.now(), sender: 'user', text, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    // Route to backend Express API
    setTyping(true);
    setError(null);
    try {
      const updated = await sendChatMessage(text);
      if (updated && updated.length > 0) {
        setMessages(updated);
        setTyping(false);
        setTimeout(() => inputRef.current?.focus(), 50);
        return;
      }
      throw new Error('empty');
    } catch {
      // 3. Fallback to client-side rule chatbot brain
      const delay = 700 + Math.random() * 600;
      setTimeout(() => {
        const { reply, followUp } = getBotResponse(text);
        const showScanCta = SCAN_TRIGGERS.some(kw => text.toLowerCase().includes(kw));

        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, sender: 'ai', text: reply, time: getTime(), showScanCta },
        ]);
        setTyping(false);

        if (followUp) {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { id: Date.now() + 2, sender: 'ai', text: followUp, time: getTime(), isFollowUp: true },
            ]);
          }, 600);
        }

        setTimeout(() => inputRef.current?.focus(), 50);
      }, delay);
    }
  }, [input, typing, messages, sendChatMessage]);

  const handleReaction = useCallback((msgId, reaction) => {
    setReactions(prev => ({ ...prev, [msgId]: prev[msgId] === reaction ? null : reaction }));
  }, []);

  const handleReset = useCallback(async () => {
    try { await clearChat(); } catch {}
    setMessages([makeWelcome()]);
    setInput('');
    setReactions({});
    setError(null);
    setTyping(false);
  }, [clearChat]);

  const showPresets = messages.length <= 1 && !typing;

  return (
    <div className="flex-grow flex flex-col h-full min-h-0 bg-slate-50/30 dark:bg-slate-900/10">

      {/* Top Banner */}
      <div className="px-4 py-3 md:px-6 md:py-4 bg-white dark:bg-[#16171d] border-b border-slate-200/50 dark:border-slate-800 flex justify-between items-center shrink-0 gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-mint flex items-center justify-center shadow-md shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading font-extrabold text-sm text-slate-950 dark:text-white leading-none">
              Skin AI Assistant
            </h2>
            <span className="text-[10px] text-slate-400 hidden sm:flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Online · Powered by AI · History saved
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full font-bold border border-amber-500/20 hidden sm:flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Reference only
          </span>
          <button
            onClick={handleReset}
            title="New conversation"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-[10px] text-red-500 flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20 min-h-0">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => {
              const msgId = msg._id || msg.id || idx;
              return (
                <motion.div
                  key={String(msgId)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-mint flex items-center justify-center shrink-0">
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        DermaVision AI
                      </span>
                    </div>
                  )}

                  <div className={`px-4 py-3 rounded-2xl text-xs max-w-[85%] shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : msg.isFollowUp
                      ? 'bg-[#c6f0ea]/40 text-slate-700 dark:text-slate-200 rounded-tl-none border border-[#5AA7A7]/20'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700/30'
                  }`}>
                    {msg.sender === 'ai'
                      ? <FormattedMessage text={msg.text} />
                      : msg.text
                    }
                  </div>

                  {msg.sender === 'ai' && msg.showScanCta && (
                    <motion.button
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      onClick={() => navigate('/')}
                      className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] text-white text-[10px] font-extrabold shadow-md hover:brightness-105 transition-all cursor-pointer"
                    >
                      <Scan className="w-3.5 h-3.5" /> Scan your skin now
                    </motion.button>
                  )}

                  {msg.sender === 'ai' && !msg.isFollowUp && (
                    <div className="flex items-center gap-1.5 mt-1.5 px-1">
                      <span className="text-[9px] text-slate-400">{msg.time}</span>
                      <div className="flex gap-1 ml-1">
                        <button
                          onClick={() => handleReaction(msgId, 'up')}
                          title="Helpful"
                          className={`p-1 rounded-full transition-all cursor-pointer ${
                            reactions[msgId] === 'up'
                              ? 'bg-emerald-100 text-emerald-600'
                              : 'text-slate-300 hover:text-emerald-500 hover:bg-emerald-50'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleReaction(msgId, 'down')}
                          title="Not helpful"
                          className={`p-1 rounded-full transition-all cursor-pointer ${
                            reactions[msgId] === 'down'
                              ? 'bg-rose-100 text-rose-500'
                              : 'text-slate-300 hover:text-rose-400 hover:bg-rose-50'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {msg.sender === 'user' && (
                    <span className="text-[9px] text-slate-400 mt-1 px-1.5">{msg.time}</span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-mint flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  DermaVision AI
                </span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-none border border-slate-100 dark:border-slate-700/30 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#5AA7A7] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[#5AA7A7] rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-[#5AA7A7] rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Preset chips */}
      <AnimatePresence>
        {showPresets && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 md:px-6 py-3 bg-white/80 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 shrink-0"
          >
            <div className="max-w-3xl mx-auto">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-2">
                <HelpCircle className="w-3.5 h-3.5" /> Common Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((pr, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(pr)}
                    className="text-[10px] text-primary hover:text-white bg-primary/10 hover:bg-primary border border-primary/20 hover:border-primary px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer"
                  >
                    {pr}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div className="p-3 md:p-4 bg-white dark:bg-[#16171d] border-t border-slate-200/50 dark:border-slate-800 shrink-0">
        <div className="max-w-3xl mx-auto space-y-2">
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-1.5"
              >
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-[10px] text-[#5AA7A7] bg-[#c6f0ea]/30 border border-[#5AA7A7]/20 hover:bg-[#5AA7A7] hover:text-white px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5" /> {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={e => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2.5"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about any skin condition, ingredient, or routine…"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 py-3 px-4 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all shadow-sm shrink-0 cursor-pointer ${
                isListening 
                  ? 'bg-red-50 text-red-500 border border-red-200 animate-pulse' 
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-400 border border-slate-200/60 dark:border-slate-800 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="p-3.5 rounded-xl bg-primary hover:brightness-105 text-white shadow-md shadow-primary/20 transition-all flex items-center justify-center disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[9px] text-slate-400 text-center font-medium">
            AI responses are for informational purposes only — not a substitute for professional medical advice.
          </p>
        </div>
      </div>

    </div>
  );
}
