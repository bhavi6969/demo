import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, Sparkles, HeartPulse, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('alex.mercer@cyberhealth.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all diagnostic log credentials.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center bg-white dark:bg-[#16171d] px-4 sm:px-6 py-10 sm:py-12 overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Glowing Blobs */}
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-mint/10 rounded-full blur-3xl animate-pulse-slow [animation-delay:4s]"></div>

      {/* Floating Decorative Medical Symbols */}
      <div className="absolute top-24 left-24 text-primary/10 dark:text-primary/5 animate-float hidden md:block">
        <HeartPulse className="w-16 h-16" />
      </div>
      <div className="absolute bottom-24 right-24 text-mint/10 dark:text-mint/5 animate-float [animation-delay:3s] hidden md:block">
        <Shield className="w-20 h-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl shadow-xl relative border border-slate-200/50 dark:border-white/5"
      >
        {/* Brand */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-mint flex items-center justify-center shadow-md mx-auto mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Access Portal</h2>
          <p className="text-xs text-slate-400">Unlock secure AI skin health tracking sessions</p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Clinical ID / Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Security Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Remember and Forgot */}
          <div className="flex justify-between items-center text-[11px] pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-500 dark:text-slate-400 font-medium select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-primary w-3.5 h-3.5 rounded border-slate-300 bg-transparent"
              />
              Remember session
            </label>
            <span className="text-primary hover:underline cursor-pointer font-bold">Forgot password?</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary via-blue-accent to-mint hover:brightness-105 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 mt-6 cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Initialize Diagnostic Engine <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <hr className="border-slate-100 dark:border-slate-800 my-6" />

        {/* Social Authentication */}
        <div className="space-y-3">
          <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-semibold">Or authentication via</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleLogin}
              className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Google Cloud
            </button>
            <button
              onClick={handleLogin}
              className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Apple ID
            </button>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 text-center">
          New to IMPACT AI?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Register Sandbox Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
