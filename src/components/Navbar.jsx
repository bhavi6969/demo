import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { Bell, Search, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { isDark } = useTheme();
  const { notifications, clearNotifications, user } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close notifications dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread !== false).length;

  // Derive initials from patient name
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AM';

  return (
    <nav className="glass-panel rounded-full p-2.5 px-6 w-full flex items-center justify-between gap-4 shrink-0 transition-all duration-300">
      
      {/* Search Input Area */}
      <div className="flex-1 max-w-xl flex items-center gap-3.5 px-4 py-2 rounded-full bg-slate-50/50 border border-slate-200/20 shadow-inner">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search scans, treatments, symptoms..."
          className="bg-transparent border-none outline-none text-xs text-slate-700 placeholder-slate-400 w-full"
          disabled
        />
        <span className="text-[9px] text-slate-400 font-bold bg-white border border-slate-200/50 px-2 py-0.5 rounded-md font-mono shrink-0">
          ⌘K
        </span>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Encyclopedia Link */}
        <button
          onClick={() => navigate('/encyclopedia')}
          className="px-3 py-2 rounded-full bg-[#5AA7A7] text-white text-xs font-bold shadow hover:bg-[#489b9b] transition-colors"
        >
          Encyclopedia
        </button>
        
        {/* Notifications Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2.5 rounded-full bg-slate-50/50 border border-slate-200/20 text-slate-500 hover:bg-slate-100/80 transition-colors cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#BAC94A] rounded-full border border-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 glass-panel rounded-[24px] shadow-xl border border-white/50 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex justify-between items-center px-4 pb-2 border-b border-slate-100">
                <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Notifications</span>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-[9px] font-extrabold text-[#5AA7A7] hover:underline cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto scrollbar-thin text-left mt-2">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400 font-semibold">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-2.5 hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-b-0 leading-normal"
                    >
                      <p className="text-[10px] text-slate-650 font-bold">{n.text}</p>
                      <span className="text-[8px] text-slate-400 font-bold block mt-1 uppercase tracking-wide">{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-3 pl-3 border-l border-slate-200 hover:opacity-95 transition-opacity cursor-pointer animate-fade-in"
        >
          <div className="w-9 h-9 rounded-full bg-[#6C8CBF] text-white flex items-center justify-center font-extrabold text-xs font-heading shadow-md select-none">
            {initials}
          </div>
          <div className="text-left hidden md:block leading-none">
            <p className="text-[12px] font-bold text-slate-900">{user?.name || 'Alexander Mercer'}</p>
            <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{user?.plan || 'Pro AI Member'}</span>
          </div>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-500 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[75px] left-0 w-full glass-panel border border-white/40 shadow-xl rounded-[24px] px-6 py-4 space-y-4 z-40 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-3">
            <div onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold text-slate-700 cursor-pointer">Home / Analysis</div>
            <div onClick={() => { navigate('/detect'); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold text-slate-700 cursor-pointer">History & Reports</div>
            <div onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold text-slate-700 cursor-pointer">My Vitals</div>
            <div onClick={() => { navigate('/chatbot'); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold text-slate-700 cursor-pointer">Skin Support</div>
            <div onClick={() => { navigate('/doctors'); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold text-slate-700 cursor-pointer">Consult Doctor</div>
            <div onClick={() => { navigate('/encyclopedia'); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold text-slate-700 cursor-pointer">Encyclopedia</div>
            <div onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }} className="py-2 text-xs font-bold text-slate-700 cursor-pointer">Settings</div>
          </div>
        </div>
      )}

    </nav>
  );
}
