import { HeartPulse, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#16171d]/20 transition-all duration-300">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-mint flex items-center justify-center shadow-md">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight">IMPACT AI</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Leading the path in computer-vision diagnostics for skin health. Secure, private, and instant skin checks powered by deep learning.
          </p>
        </div>

        {/* Resources Column */}
        <div>
          <h6 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Resources</h6>
          <ul className="space-y-2.5 text-xs">
            <li><a href="https://react.dev/" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-mint transition-colors">Documentation</a></li>
            <li><a href="https://vite.dev/" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-mint transition-colors">Vite Engine</a></li>
            <li><a href="https://tailwindcss.com/" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-mint transition-colors">Tailwind CSS</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h6 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Regulatory & Privacy</h6>
          <ul className="space-y-2.5 text-xs">
            <li><span className="text-slate-500 dark:text-slate-400">HIPAA Compliant</span></li>
            <li><span className="text-slate-500 dark:text-slate-400">SOC-2 Audited</span></li>
            <li><span className="text-slate-500 dark:text-slate-400">FDA Class II Sandbox</span></li>
          </ul>
        </div>

        {/* Connection Column */}
        <div className="space-y-4">
          <h6 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Get Connected</h6>
          <div className="flex gap-3">
            <a href="https://github.com" className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-slate-500 hover:text-primary transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            <a href="https://twitter.com" className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-slate-500 hover:text-primary transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            </a>
            <a href="https://vite.dev" className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-slate-500 hover:text-primary transition-colors">
              <Layers className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            Disclaimer: All diagnostic outcomes provided by this software are simulated for demonstrative purposes and do not replace professional medical advice.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-[11px] text-slate-400">
        <p>&copy; {new Date().getFullYear()} IMPACT AI Inc. All rights reserved. Designed for next-gen clinical imaging.</p>
      </div>
    </footer>
  );
}
