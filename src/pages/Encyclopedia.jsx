import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKIN_DISEASES } from '../context/skinConditionEncyclopedia';
import { X, Search, Stethoscope, Shield, Sparkles, Droplet, Sun, Pill, Home, ChevronRight } from 'lucide-react';

function ConditionModal({ item, onClose }) {
  if (!item) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900 cursor-pointer" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }} transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[32px] shadow-2xl border border-slate-100 z-10">

          {/* Hero image */}
          <div className="relative h-48 bg-slate-100 rounded-t-[32px] overflow-hidden">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-5 right-12">
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${item.severityColor} bg-white/90 mb-1 inline-block`}>{item.severity}</span>
              <h2 className="text-white font-heading font-extrabold text-xl leading-tight">{item.name}</h2>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Age: {item.common_age_group}</span>
              {item.chronic !== undefined && (
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${item.chronic ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {item.chronic ? 'Chronic condition' : 'Non-chronic'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#5AA7A7]" /> Symptoms
                </h4>
                <ul className="space-y-1">
                  {(item.symptoms || []).map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5AA7A7] mt-1.5 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Causes */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#5AA7A7]" /> Causes
                </h4>
                <ul className="space-y-1">
                  {(item.causes || []).map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Treatments */}
            {item.treatments?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#5AA7A7]" /> Recommended Treatment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.treatments.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-[#5AA7A7]/15 text-[#5AA7A7] flex items-center justify-center text-[9px] font-bold shrink-0">{i + 1}</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skincare */}
            {(item.skincare?.morning || item.skincare?.night) && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-[#5AA7A7]" /> Skincare Routine
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.skincare.morning && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800"><Sun className="w-3.5 h-3.5 text-amber-500" /> Morning</div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{item.skincare.morning}</p>
                    </div>
                  )}
                  {item.skincare.night && (
                    <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800"><Droplet className="w-3.5 h-3.5 text-indigo-500" /> Night</div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{item.skincare.night}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Medicines */}
            {item.medicines?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-[#5AA7A7]" /> Medicine Suggestions <span className="text-[8px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded ml-1">OTC · Informational</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.medicines.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm space-y-1">
                      <p className="text-[11px] font-extrabold text-slate-900">{m.name}</p>
                      <p className="text-[9px] text-slate-500">{m.dosage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Precautions */}
            {item.precautions?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#5AA7A7]" /> Precautions
                </h4>
                <ul className="space-y-1.5">
                  {item.precautions.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function Encyclopedia() {
  const [diseases, setDiseases] = useState([]);
  const [query, setQuery] = useState('');
  const [chronicOnly, setChronicOnly] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => { setDiseases(Object.values(SKIN_DISEASES)); }, []);

  const normalize = (s) => (s || '').toString().toLowerCase();

  const filteredDiseases = diseases.filter((item) => {
    if (chronicOnly === 'yes' && item.chronic !== true) return false;
    if (chronicOnly === 'no' && item.chronic !== false) return false;
    const q = normalize(query).trim();
    if (!q) return true;
    return normalize(item.name).includes(q) || normalize(item.description).includes(q) || (item.symptoms || []).map(normalize).join(' ').includes(q);
  });

  return (
    <div className="px-4 py-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-[#5AA7A7] drop-shadow">Skin Condition Encyclopedia</h1>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-5 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <label className="block text-xs font-bold text-slate-700 mb-1">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search disease or symptoms..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#5AA7A7]/40 text-sm" />
              {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-3.5 h-3.5" /></button>}
            </div>
          </div>
          <div className="w-full md:w-56">
            <label className="block text-xs font-bold text-slate-700 mb-1">Chronic</label>
            <select value={chronicOnly} onChange={(e) => setChronicOnly(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#5AA7A7]/40 text-sm bg-white">
              <option value="all">All</option>
              <option value="yes">Chronic only</option>
              <option value="no">Not chronic</option>
            </select>
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">Showing <span className="font-bold text-slate-700">{filteredDiseases.length}</span> conditions</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {filteredDiseases.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-200 flex flex-col group">
            <div className="h-48 bg-slate-50 relative overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute top-3 right-3 bg-[#5AA7A7] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">{item.severity}</div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-bold mb-1.5 text-[#489b9b]">{item.name}</h2>
              <p className="mb-3 text-slate-600 text-xs leading-relaxed line-clamp-3">{item.description}</p>
              <div className="mb-3">
                <span className="font-bold text-slate-800 text-[10px] uppercase tracking-wider block mb-1">Key Symptoms</span>
                <div className="flex flex-wrap gap-1">
                  {(item.symptoms || []).slice(0, 3).map((sym, i) => (
                    <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{sym}</span>
                  ))}
                  {(item.symptoms || []).length > 3 && <span className="text-[9px] text-slate-400">+{item.symptoms.length - 3} more</span>}
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-medium">Age: {item.common_age_group}</span>
                <button onClick={() => setSelectedItem(item)}
                  className="flex items-center gap-1 text-[10px] font-extrabold text-[#5AA7A7] hover:text-[#4d9393] transition-colors cursor-pointer">
                  View details <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && <ConditionModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
