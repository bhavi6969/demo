import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, Moon, Sun, Trash2, Save, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, updateProfile, scans, logout } = useApp();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [allergies, setAllergies] = useState(user?.allergies || '');
  const [skinCondition, setSkinCondition] = useState(user?.skinCondition || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AM';

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ name, email, phone, allergies, skinCondition, avatar: avatarPreview });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex-grow p-4 md:p-6 lg:p-8 space-y-8 bg-slate-50/30 dark:bg-slate-900/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure your clinical screening profile, security parameters, and communication options.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        
        {/* Profile Card Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 shadow-xl">
            <h3 className="font-heading font-bold text-sm text-slate-950 dark:text-white flex items-center gap-2 mb-6">
              <User className="w-4.5 h-4.5 text-primary" /> Profile Credentials
            </h3>

            {saveSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-bold">
                Clinical profile parameters saved successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4 pb-2">
                <div className="relative shrink-0">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#6C8CBF] text-white flex items-center justify-center font-extrabold text-lg font-heading shadow-md">
                      {initials}
                    </div>
                  )}
                  <button type="button" onClick={() => avatarInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#5AA7A7] text-white flex items-center justify-center shadow-md hover:bg-[#4d9393] transition-colors cursor-pointer">
                    <Camera className="w-3 h-3" />
                  </button>
                  <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{user.plan}</p>
                  <button type="button" onClick={() => avatarInputRef.current?.click()}
                    className="text-[10px] text-[#5AA7A7] font-bold hover:underline cursor-pointer mt-0.5">
                    Change photo
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Mobile Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Known Allergies (Optional)</label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. Penicillin, Peanuts"
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Skin Condition (Optional)</label>
                  <input
                    type="text"
                    value={skinCondition}
                    onChange={(e) => setSkinCondition(e.target.value)}
                    placeholder="e.g. Eczema, Psoriasis"
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-blue-accent hover:brightness-105 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Profile Details
                </button>
              </div>
            </form>
          </div>

          {/* Secure Parameters */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 shadow-xl space-y-6">
            <h3 className="font-heading font-bold text-sm text-slate-950 dark:text-white flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-primary" /> Security & Privacy Encryption
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-white">Enable Biometric Scan Simulation</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Enforces scanning verification before accessing history reports</p>
                </div>
                <input
                  type="checkbox"
                  checked={biometrics}
                  onChange={(e) => setBiometrics(e.target.checked)}
                  className="accent-primary w-4.5 h-4.5 rounded cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-white text-rose-500">Purge Clinical Diagnostic logs</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Permanently deletes all historical image logs from the system</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold transition-all border border-rose-500/20 cursor-pointer flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Clear Logs ({scans.length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Configurations Sidebar */}
        <div className="space-y-6">
          {/* General Configs */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 shadow-xl space-y-6">
            <h3 className="font-heading font-bold text-sm text-slate-950 dark:text-white">Visual Preferences</h3>
            
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-300">Application Theme</span>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-sand" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Communication Configs */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 shadow-xl space-y-5">
            <h3 className="font-heading font-bold text-sm text-slate-950 dark:text-white flex items-center gap-2">
              <Bell className="w-4.5 h-4.5 text-primary" /> Communications
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-200">Email Scan Reports</h5>
                  <p className="text-[9px] text-slate-400 mt-0.5">Recieve diagnostic outcomes directly via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifEmail}
                  onChange={(e) => setNotifEmail(e.target.checked)}
                  className="accent-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-200">Push Notifications</h5>
                  <p className="text-[9px] text-slate-400 mt-0.5">Alerts when new report compiling is finalized</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifPush}
                  onChange={(e) => setNotifPush(e.target.checked)}
                  className="accent-primary w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Logout Action Widget */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 shadow-xl text-center space-y-4">
            <p className="text-xs text-slate-400 leading-normal">Ready to close your clinical sandbox diagnostic session?</p>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5" /> Logout Session
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
