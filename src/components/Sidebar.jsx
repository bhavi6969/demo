import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, Sparkles, Users, FileText, MessageSquare, UserRound, Settings } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', label: 'Home / Analysis', icon: Sparkles },
    { path: '/detect', label: 'History & Reports', icon: FileText },
    { path: '/dashboard', label: 'My Vitals', icon: Activity },
    { path: '/chatbot', label: 'Skin Support', icon: MessageSquare },
    { path: '/doctors', label: 'Consult Doctor', icon: UserRound },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-full gap-5 shrink-0">
      
      {/* Block 1: Brand Logo Card */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center gap-3 w-full shrink-0">
        <div className="w-9 h-9 rounded-full bg-[#c6f0ea] flex items-center justify-center text-[#5AA7A7] shrink-0 shadow-inner">
          <Sparkles className="w-4.5 h-4.5 fill-[#5AA7A7] text-transparent" />
        </div>
        <div className="text-left leading-tight">
          <span className="font-heading font-extrabold text-sm text-[#111625] tracking-tight">DermaVision</span>
          <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium">AI Healthcare OS</span>
        </div>
      </div>

      {/* Block 2: Navigation & Pro Upgrade */}
      <div className="glass-panel rounded-[24px] p-4 flex flex-col justify-between flex-grow overflow-y-auto scrollbar-thin">
        
        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-[12px] font-bold transition-all duration-250 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] text-white shadow-[0_4px_12px_rgba(90,167,167,0.2)]'
                      : 'text-slate-600 hover:bg-slate-100/50'
                  }`
                }
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Pro Plan Widget */}
        <div className="p-4 rounded-[20px] bg-gradient-to-br from-[#E2D36B] to-[#BAC94A] border border-white/20 shadow-md text-left text-slate-900 space-y-3 relative overflow-hidden mt-6 shrink-0">
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white/10 rounded-full blur-md"></div>
          <div>
            <h5 className="font-heading font-extrabold text-[11px] uppercase tracking-wide text-slate-950">Premium</h5>
            <p className="text-[10px] text-slate-950/85 mt-0.5 leading-snug font-semibold">
              Unlock live board-certified doctor reviews and diagnostic histories.
            </p>
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="w-full py-2.5 rounded-full bg-white hover:bg-slate-50 text-[11px] font-extrabold text-slate-900 transition-all shadow-sm cursor-pointer"
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Block 3: Settings Pill Card */}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `glass-panel rounded-full p-3 px-5 flex items-center gap-3 w-full cursor-pointer transition-all duration-200 shrink-0 ${
            isActive
              ? 'bg-[#96D7C6]/20 border-[#96D7C6]/40 text-[#5AA7A7]'
              : 'text-slate-600 hover:bg-white/90'
          }`
        }
      >
        <Settings className="w-4.5 h-4.5 shrink-0" />
        <span className="text-[12px] font-bold">Settings</span>
      </NavLink>

    </aside>
  );
}
