import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I am your AI clinical assistant. How can I support your skin health queries today?", time: '10:00 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Hide floating widget if on the dedicated full-screen AI chat page
  if (location.pathname === '/chatbot') return null;

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text, time: 'Just now' }]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on keyword matching
    setTimeout(() => {
      let reply = "I've logged your concern. I recommend uploading a high-resolution photo in the AI Scan Lab for an exact assessment. What symptoms are you experiencing?";
      const lower = text.toLowerCase();

      if (lower.includes('acne') || lower.includes('pimple')) {
        reply = "Acne Vulgaris typically responds well to salicylic acid cleansers and topical retinoids. Ensure you maintain a consistent night-time routine and do not squeeze blemishes.";
      } else if (lower.includes('mole') || lower.includes('melanoma') || lower.includes('spot')) {
        reply = "If a mole shows asymmetry, color variations, or has grown larger than 6mm (ABCDE rules), schedule an urgent dermoscopic check with a board-certified specialist.";
      } else if (lower.includes('itch') || lower.includes('dry') || lower.includes('eczema')) {
        reply = "Atopic Dermatitis (eczema) is characterized by a damaged skin barrier. Focus on intensive fragrance-free barrier creams and avoid hot water.";
      } else if (lower.includes('rash') || lower.includes('allergic')) {
        reply = "A localized rash may be Contact Dermatitis. Wash the area immediately with clean water, avoid applying scented cosmetics, and use a light hydrocortisone cream if needed.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply, time: 'Just now' }]);
      setIsTyping(false);
    }, 1500);
  };

  const prompts = [
    "Is my mole dangerous?",
    "How to manage sudden acne flares?",
    "Skincare routine for eczema"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-blue-accent text-white shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
          <MessageSquare className="w-6.5 h-6.5" />
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-mint flex items-center justify-center text-[9px] text-white font-extrabold font-mono">1</span>
          </span>
          <div className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Ask AI Assistant
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] h-[480px] rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden border border-slate-200/50 dark:border-slate-800/80 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-blue-accent text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shadow-inner">
                <Sparkles className="w-4.5 h-4.5 text-sand" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-sm leading-none">IMPACT AI Clinical Bot</h5>
                <span className="text-[10px] text-slate-100/90">Automated triage companion</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700/30 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-none border border-slate-100 dark:border-slate-700/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-slate-100/50 dark:bg-slate-900/30 space-y-1.5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Suggested queries</span>
              <div className="flex flex-col gap-1">
                {prompts.map((p, idx) => (
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

          {/* Disclaimer Warning Banner */}
          <div className="px-4 py-1.5 bg-amber-500/10 border-y border-amber-500/20 text-[9px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>AI logs cannot replace actual clinical dermatoscopy checks.</span>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a skin question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 py-2 px-3 text-xs bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary dark:text-white"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-primary hover:brightness-105 text-white shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
