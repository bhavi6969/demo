import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { Bell, Search, Sparkles, Menu, X, FileText, Settings, Scan, CheckCheck } from 'lucide-react';

const NOTIF_ICONS = {
  report: FileText,
  scan: Scan,
  system: Settings,
};
const NOTIF_COLORS = {
  report: 'text-[#5AA7A7] bg-[#c6f0ea]/40',
  scan: 'text-[#BAC94A] bg-[#f7f8dc]/60',
  system: 'text-[#6C8CBF] bg-[#ebf3f9]/60',
};

export default function Navbar() {
  const { isDark } = useTheme();
  const { notifications, clearNotifications, markNotificationRead, user } = useApp();
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
    <nav className="relative glass-panel rounded-full p-2.5 px-3 md:px-6 w-full flex items-center justify-between gap-2 md:gap-4 shrink-0 transition-all duration-300">
      
      {/* Search Input Area */}
      <div className="flex-1 max-w-xl flex items-center gap-2 md:gap-3.5 px-3 md:px-4 py-2 rounded-full bg-slate-50/50 border border-slate-200/20 shadow-inner min-w-0">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search scans, treatments..."
          className="bg-transparent border-none outline-none text-xs text-slate-700 placeholder-slate-400 w-full min-w-0"
          disabled
        />
        <span className="text-[9px] text-slate-400 font-bold bg-white border border-slate-200/50 px-2 py-0.5 rounded-md font-mono shrink-0 hidden sm:inline">
          ⌘K
        </span>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Encyclopedia Link — hidden on mobile */}
        <button
          onClick={() => navigate('/encyclopedia')}
          className="hidden md:block px-3 py-2 rounded-full bg-[#5AA7A7] text-white text-xs font-bold shadow hover:bg-[#489b9b] transition-colors"
        >
          Encyclopedia
        </button>

        {/* Full Skin Analysis Link — hidden on small screens */}
        <button
          onClick={() => navigate('/full-analysis')}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] text-white text-xs font-bold shadow hover:brightness-105 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 fill-white text-transparent" />
          Full Skin Analysis
        </button>
        
        {/* Notifications Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 md:p-2.5 rounded-full bg-slate-50/50 border border-slate-200/20 text-slate-500 hover:bg-slate-100/80 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4 md:w-4.5 md:h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#BAC94A] rounded-full border border-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-72 md:w-80 glass-panel rounded-[24px] shadow-xl border border-white/50 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex justify-between items-center px-4 pb-2 border-b border-slate-100">
                <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Notifications</span>
                <div className="flex items-center gap-2">
                  {notifications.some(n => n.unread) && (
                    <button onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
                      className="text-[9px] font-extrabold text-slate-400 hover:text-[#5AA7A7] cursor-pointer flex items-center gap-0.5">
                      <CheckCheck className="w-3 h-3" /> All read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button onClick={clearNotifications}
                      className="text-[9px] font-extrabold text-[#5AA7A7] hover:underline cursor-pointer">
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto scrollbar-thin text-left mt-2">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400 font-semibold">No new notifications</div>
                ) : (
                  notifications.map((n) => {
                    const Icon = NOTIF_ICONS[n.type] || FileText;
                    const colorClass = NOTIF_COLORS[n.type] || NOTIF_COLORS.system;
                    return (
                      <div key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`px-4 py-2.5 hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-b-0 leading-normal cursor-pointer flex items-start gap-3 ${n.unread ? 'bg-[#c6f0ea]/10' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${colorClass}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] font-bold leading-snug ${n.unread ? 'text-slate-800' : 'text-slate-500'}`}>{n.text}</p>
                          <span className="text-[8px] text-slate-400 font-bold block mt-0.5 uppercase tracking-wide">{n.time}</span>
                        </div>
                        {n.unread && <span className="w-2 h-2 rounded-full bg-[#BAC94A] shrink-0 mt-1.5"></span>}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 border-l border-slate-200 hover:opacity-95 transition-opacity cursor-pointer animate-fade-in"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover shadow-md shrink-0 border-2 border-white" />
          ) : (
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#6C8CBF] text-white flex items-center justify-center font-extrabold text-xs font-heading shadow-md select-none shrink-0">
              {initials}
            </div>
          )}
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
        <div className="lg:hidden absolute top-[calc(100%+8px)] left-0 right-0 glass-panel border border-white/40 shadow-xl rounded-[24px] px-6 py-4 space-y-1 z-40 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col">
            <div onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">Home / Analysis</div>
            <div onClick={() => { navigate('/full-analysis'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-[#5AA7A7] cursor-pointer flex items-center gap-1.5 border-b border-slate-100/60">
              <Sparkles className="w-3.5 h-3.5 fill-[#5AA7A7] text-transparent" /> Full Skin Analysis
            </div>
            <div onClick={() => { navigate('/tracker'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">Lesion Tracker</div>
            <div onClick={() => { navigate('/scanner'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">Safety Scanner</div>
            <div onClick={() => { navigate('/detect'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">History & Reports</div>
            <div onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">My Vitals</div>
            <div onClick={() => { navigate('/chatbot'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">Skin Support</div>
            <div onClick={() => { navigate('/doctors'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">Consult Doctor</div>
            <div onClick={() => { navigate('/encyclopedia'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer border-b border-slate-100/60">Encyclopedia</div>
            <div onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }} className="py-2.5 text-xs font-bold text-slate-700 cursor-pointer">Settings</div>
          </div>
        </div>
      )}

    </nav>
  );
}
