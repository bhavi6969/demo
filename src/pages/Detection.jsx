import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, SKIN_DISEASES } from '../context/AppContext';
import { FileText, Download, Calendar, Clock, Eye, Sparkles, Search, SlidersHorizontal, X } from 'lucide-react';

const SEVERITY_ORDER = { Mild: 1, Moderate: 2, Severe: 3, High: 4 };

export default function Detection() {
  const { scans, setCurrentScan } = useApp();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');
  const [showFilters, setShowFilters] = useState(false);

  const handleViewReport = (scan) => { setCurrentScan(scan); navigate('/result'); };
  const handleDownloadReport = (scan) => { setCurrentScan(scan); setTimeout(() => window.print(), 100); };

  const filtered = useMemo(() => {
    let list = [...scans];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(s => 
        (s.diseaseName || '').toLowerCase().includes(q) || 
        String(s.id || '').toLowerCase().includes(q)
      );
    }
    if (severityFilter !== 'All') list = list.filter(s => s.severity === severityFilter);
    list.sort((a, b) => {
      if (sortBy === 'date_desc' || sortBy === 'date_asc') {
        const dateA = a.date ? new Date(`${a.date}T${a.time || '00:00'}`) : new Date(0);
        const dateB = b.date ? new Date(`${b.date}T${b.time || '00:00'}`) : new Date(0);
        return sortBy === 'date_desc' ? dateB - dateA : dateA - dateB;
      }
      if (sortBy === 'confidence') return parseFloat(b.confidence || 0) - parseFloat(a.confidence || 0);
      if (sortBy === 'severity') return (SEVERITY_ORDER[b.severity] || 0) - (SEVERITY_ORDER[a.severity] || 0);
      return 0;
    });
    return list;
  }, [scans, query, severityFilter, sortBy]);

  const severities = ['All', ...Array.from(new Set(scans.map(s => s.severity).filter(Boolean)))];

  return (
    <div className="space-y-5 text-left w-full pb-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">Prediction History & Reports</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Access your past skin scans, confidence scores, and download clinical PDF reports.</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/50 shadow-sm text-xs font-bold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-[#5AA7A7]" />
          <span>{filtered.length} / {scans.length} scans</span>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-200/50 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search by condition or scan ID…"
            className="bg-transparent border-none outline-none text-xs text-slate-700 placeholder-slate-400 w-full" />
          {query && <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-3.5 h-3.5" /></button>}
        </div>
        <button onClick={() => setShowFilters(v => !v)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer shadow-sm ${showFilters ? 'bg-[#5AA7A7] text-white border-[#5AA7A7]' : 'bg-white text-slate-700 border-slate-200/50 hover:bg-slate-50'}`}>
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="glass-panel rounded-[24px] p-4 border border-white/50 shadow-sm flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Severity:</span>
            {severities.map(s => (
              <button key={s} onClick={() => setSeverityFilter(s)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${severityFilter === s ? 'bg-[#5AA7A7] text-white' : 'bg-white border border-slate-200/50 text-slate-600 hover:bg-slate-50'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sort:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200/50 rounded-full px-3 py-1 outline-none cursor-pointer">
              <option value="date_desc">Newest first</option>
              <option value="date_asc">Oldest first</option>
              <option value="confidence">Highest confidence</option>
              <option value="severity">Highest severity</option>
            </select>
          </div>
        </div>
      )}

      {/* History list */}
      {scans.length === 0 ? (
        <div className="glass-panel rounded-[32px] p-12 text-center border border-white/50 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm text-slate-800">No prediction history found</h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal max-w-sm mx-auto">You haven't uploaded any skin images yet. Perform a scan on the home page.</p>
          </div>
          <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] transition-all shadow-sm cursor-pointer">
            Start First Analysis
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel rounded-[32px] p-10 text-center border border-white/50 shadow-sm space-y-3">
          <Search className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-500">No scans match your search.</p>
          <button onClick={() => { setQuery(''); setSeverityFilter('All'); }} className="text-xs text-[#5AA7A7] font-bold hover:underline cursor-pointer">Clear filters</button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((scan) => {
            const diseaseMeta = SKIN_DISEASES[scan.diseaseId] || { severityColor: 'text-[#5AA7A7] bg-[#c6f0ea]/20' };
            return (
              <div key={scan.id} className="glass-panel rounded-[28px] p-4 md:p-5 border border-white/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/50 shrink-0">
                    <img src={scan.imageUrl} alt={scan.diseaseName} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-[9px] text-[#5AA7A7] font-bold bg-[#c6f0ea]/30 px-2 py-0.5 rounded-md uppercase tracking-wider">{scan.id}</span>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${diseaseMeta.severityColor}`}>{scan.severity}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900 leading-tight">{scan.diseaseName}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {scan.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {scan.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 w-full md:w-auto shrink-0">
                  <div className="flex flex-col items-center sm:items-end justify-center px-4 py-2 rounded-2xl bg-white/60 border border-slate-200/30 leading-none">
                    <span className="text-lg font-black text-[#5AA7A7] font-mono">{scan.confidence}</span>
                    <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Confidence</span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-center">
                    <button onClick={() => handleViewReport(scan)} className="px-4 py-2.5 rounded-full text-xs font-extrabold text-slate-700 bg-white border border-slate-200/50 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial shadow-sm">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button onClick={() => handleDownloadReport(scan)} className="px-4 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#52a2a2] hover:bg-[#458b8b] transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial shadow-sm">
                      <Download className="w-3.5 h-3.5" /> Report
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
