import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, Play, HelpCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Welcome to the Lumen Skin Assistant. I can help explain skin symptoms, review skincare routines, or clarify predicted conditions. What skin queries can I address for you?", time: '10:00 AM' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollBottom();
  }, [messages, typing]);

  const handleSend = (presetText) => {
    const text = presetText || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text, time: 'Just now' }]);
    if (!presetText) setInput('');
    setTyping(true);

    setTimeout(() => {
      let reply = "Your symptom details have been recorded. I suggest running a skin analysis on our Home / Analysis page for an automated classification report.";
      const query = text.toLowerCase();

      if (query.includes('eczema') || query.includes('dry skin')) {
        reply = "Atopic Dermatitis (eczema) is a chronic inflammatory barrier issue. Avoid alkaline body soaps and focus on rich, lipid-replenishing creams containing ceramides and colloidal oatmeal. Keep shower temperatures lukewarm.";
      } else if (query.includes('mole') || query.includes('nevus') || query.includes('melanoma')) {
        reply = "Suspicious nevi (moles) are classified using the ABCDE guidelines: Asymmetry, irregular Borders, varied Color, Diameter > 6mm, and Evolving shape. Any mole showing these traits warrants a physical dermoscopy check.";
      } else if (query.includes('acne') || query.includes('breakout')) {
        reply = "Acne Vulgaris severity index depends on the ratio of inflammatory lesions (pustules) to non-inflammatory comedones. Moderate acne often benefits from Benzoyl Peroxide (to clear bacteria) and Adapalene (to clear follicles).";
      } else if (query.includes('peel') || query.includes('chemical')) {
        reply = "Post-peel skincare requires intense barrier protection. Avoid applying any active acids (Salicylic Acid, Glycolic Acid, Retinoids) for at least 72 hours. Apply thick fragrance-free healing balms and high SPF mineral sunscreens.";
      } else if (query.includes('contagious')) {
        reply = "Atopic dermatitis (eczema), acne vulgaris, and contact dermatitis are inflammatory or genetic skin barrier disruptions and are completely non-contagious. If you suspect an infectious rash, seek clinical culture tests.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply, time: 'Just now' }]);
      setTyping(false);
    }, 1500);
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
            <h2 className="font-heading font-extrabold text-sm text-slate-950 dark:text-white leading-none">Clinical Chat Assistant</h2>
            <span className="text-[10px] text-slate-400">Deep Learning Medical Reference Triage</span>
          </div>
        </div>
        <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full font-bold border border-amber-500/20 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" /> For reference only
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[80%] shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700/30'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1.5">{msg.time}</span>
            </div>
          ))}

          {typing && (
            <div className="flex flex-col items-start">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-none border border-slate-100 dark:border-slate-700/30 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Presets and Chat Inputs Area */}
      <div className="p-4 bg-white dark:bg-[#16171d] border-t border-slate-200/50 dark:border-slate-800 shrink-0">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Preset Chips */}
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

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Query skin conditions, skincare routines, or symptom logs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 py-3 px-4 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
            />
            <button
              type="submit"
              className="p-3.5 rounded-xl bg-primary hover:brightness-105 text-white shadow-md shadow-primary/20 transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
