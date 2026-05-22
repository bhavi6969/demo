import { useState, useRef, useEffect } from 'react';
import { Send, X, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export default function DoctorChat({ doctor, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'doctor',
      text: `Hello! I'm ${doctor?.name || 'Dr. Smith'}. I've reviewed your case. Please describe your current symptoms and concerns in detail so I can provide appropriate clinical guidance.`,
      time: '10:00 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: 'user', text, time: 'Just now' }]);
    setInput('');
    setTyping(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/chat/send', {
        senderId: 'patient',
        receiverId: doctor?.id || 'doctor',
        message: text,
        chatType: 'support'
      });

      if (response.data.success) {
        setMessages((prev) => [
          ...prev,
          { sender: 'doctor', text: response.data.aiMessage.message, time: 'Just now' }
        ]);
      } else {
        throw new Error(response.data.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50"
      ></div>

      {/* Chat Window */}
      <div className="w-full max-w-2xl h-[600px] glass-panel rounded-3xl shadow-2xl flex flex-col border border-slate-200/50 dark:border-slate-800/80 relative z-10">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary to-blue-accent text-white flex justify-between items-center border-b border-slate-200/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm">{doctor?.name || 'Dr. Specialist'}</h3>
              <span className="text-[10px] text-slate-100 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Professional Dermatology Consultation
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[75%] ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700/30 shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1.5">{msg.time}</span>
            </div>
          ))}

          {typing && (
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 rounded-tl-none border border-slate-100 dark:border-slate-700/30 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="px-6 py-2 bg-amber-500/10 border-y border-amber-500/20 text-[9px] text-amber-600 dark:text-amber-400 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>For emergency skin conditions, please contact emergency services or visit an urgent care facility.</span>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Describe your symptoms or ask a clinical question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 py-3 px-4 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-primary hover:brightness-105 text-white shadow-md transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
