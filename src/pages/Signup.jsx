import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Shield, HeartPulse, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { addNotification, updateProfile } = useApp();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please provide all necessary registration data.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Security passwords do not match.');
      return;
    }
    if (!agree) {
      setError('You must accept the HIPAA clinical storage agreement terms.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      updateProfile({
        name,
        email,
        phone: phone || '+1 (555) 000-0000',
        plan: 'Free Sandbox Account'
      });
      addNotification(`Welcome, ${name}! Your diagnostic account is initialized.`);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center bg-white dark:bg-[#16171d] px-6 py-12 overflow-hidden transition-colors duration-300">
      
      {/* Background Ornaments */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-mint/10 rounded-full blur-3xl animate-pulse-slow [animation-delay:4s]"></div>

      <div className="absolute top-24 right-24 text-primary/10 dark:text-primary/5 animate-float hidden md:block">
        <HeartPulse className="w-16 h-16" />
      </div>
      <div className="absolute bottom-24 left-24 text-mint/10 dark:text-mint/5 animate-float [animation-delay:3s] hidden md:block">
        <Shield className="w-20 h-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-panel p-8 rounded-3xl shadow-xl relative border border-slate-200/50 dark:border-white/5"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-mint flex items-center justify-center shadow-md mx-auto mb-3">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Register Account</h2>
          <p className="text-xs text-slate-400">Initialize sandboxed clinical screening profile</p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Mobile (Optional)</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+1 (555) 012-3456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Create Password</label>
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

            {/* Confirm Password */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex text-left pt-2">
            <label className="flex gap-2 cursor-pointer text-[11px] text-slate-500 dark:text-slate-400 leading-normal select-none">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="accent-primary w-4 h-4 mt-0.5 rounded border-slate-300 bg-transparent shrink-0"
              />
              <span>
                I agree to the privacy statement and consent to have my uploaded diagnostic images stored in secure SOC-2/HIPAA environments.
              </span>
            </label>
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
                Register Account Portal <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <hr className="border-slate-100 dark:border-slate-800 my-6" />

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 text-center">
          Already registered?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login Access ID
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
