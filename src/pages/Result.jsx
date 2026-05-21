import { useNavigate } from 'react-router-dom';
import { useApp, SKIN_DISEASES } from '../context/AppContext';
import { ArrowLeft, Share2, Download, AlertCircle, Shield, Sparkles, Home, Pill, Stethoscope, CheckCircle, Droplet, Sun, Thermometer, Flame } from 'lucide-react';

export default function Result() {
  const { currentScan, scans } = useApp();
  const navigate = useNavigate();

  // Retrieve current scan or latest history item
  const activeScan = currentScan || scans[0] || {
    id: 'scan-102',
    date: '2026-05-18',
    time: '14:23',
    diseaseId: 'eczema',
    diseaseName: 'Atopic Dermatitis (Eczema)',
    confidence: '92%',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1606501170755-58210fe9f2a2?w=500&auto=format&fit=crop&q=80',
    status: 'Completed'
  };

  // Find clinical metadata for the disease, fallback to eczema
  const diseaseInfo = SKIN_DISEASES[activeScan.diseaseId] || SKIN_DISEASES.eczema;

  const handlePrint = () => {
    window.print();
  };

  // Map severity values to progress percentages for rendering
  const severityVal = diseaseInfo.severityValue || 50;
  const mildPct = Math.max(0, Math.min(100, 100 - severityVal));
  const modPct = Math.max(0, Math.min(100, severityVal > 30 && severityVal <= 75 ? severityVal : 40));
  const sevPct = Math.max(0, Math.min(100, severityVal > 75 ? severityVal : 15));

  return (
    <div className="flex-grow p-6 lg:p-8 space-y-6 bg-transparent text-left print:bg-white print:p-0">
      
      {/* Top Header Bar */}
      <div className="w-full bg-white/70 px-6 py-3 rounded-full border border-slate-200/50 shadow-sm flex justify-between items-center print:hidden">
        <button
          onClick={() => navigate('/detect')}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to history
        </button>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200/60 text-[11px] font-extrabold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer">
            <Share2 className="w-3.5 h-3.5" /> Share report
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#52a2a2] hover:bg-[#458b8b] text-[11px] font-extrabold text-white shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
        </div>
      </div>

      {/* Top Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image & Metadata */}
        <div className="lg:col-span-5 glass-panel rounded-[32px] p-5 border border-white/60 shadow-sm flex flex-col justify-between space-y-4">
          
          {/* Image Container with "AI Scanned" badge */}
          <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/50 flex items-center justify-center">
            
            {/* Scanned Badge */}
            <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-[#5AA7A7] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-[#5AA7A7] text-transparent" /> AI scanned
            </span>

            <img
              src={activeScan.imageUrl}
              alt={activeScan.diseaseName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Resolution, Model, Time metadata pills */}
          <div className="grid grid-cols-3 gap-2">
            <div className="py-2 px-1 rounded-2xl bg-white/60 border border-slate-200/40 text-center leading-tight">
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Resolution</span>
              <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">1024²</span>
            </div>
            <div className="py-2 px-1 rounded-2xl bg-white/60 border border-slate-200/40 text-center leading-tight">
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Model</span>
              <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">v3.2</span>
            </div>
            <div className="py-2 px-1 rounded-2xl bg-white/60 border border-slate-200/40 text-center leading-tight">
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Analysis Time</span>
              <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">1.2s</span>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnosis & Metrics */}
        <div className="lg:col-span-7 glass-panel rounded-[32px] p-6 border border-white/60 shadow-sm flex flex-col justify-between space-y-6">
          
          {/* Header */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/50 text-[9px] font-bold text-[#5AA7A7]">
              <AlertCircle className="w-3.5 h-3.5" /> Primary AI detection
            </span>

            <h2 className="font-heading font-extrabold text-3xl text-slate-950 leading-tight">
              {activeScan.diseaseName}
            </h2>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
              Scan Reference: {activeScan.id} • Diagnostic Date: {activeScan.date} {activeScan.time}
            </p>
          </div>

          {/* Metrics block: Confidence ring & Severity lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Confidence Card */}
            <div className="p-5 rounded-3xl bg-white/60 border border-white/80 flex items-center justify-center gap-5">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="rgba(134, 205, 193, 0.15)" strokeWidth="6.5" fill="transparent" />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="url(#confidenceGradient)"
                    strokeWidth="6.5"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - parseFloat(activeScan.confidence) / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="confidenceGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#52a2a2" />
                      <stop offset="100%" stopColor="#ded066" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center leading-none flex flex-col items-center">
                  <span className="text-sm font-extrabold text-slate-900 font-mono">{activeScan.confidence}</span>
                  <span className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Confidence</span>
                </div>
              </div>
            </div>

            {/* Severity Card */}
            <div className="p-5 rounded-3xl bg-white/60 border border-white/80 space-y-3.5">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400 uppercase">Calculated Severity</span>
                <span className="text-slate-950">{activeScan.severity}</span>
              </div>

              {/* Progressive rows */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500">
                    <span>Mild Zone</span>
                    <span>{mildPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-mint rounded-full" style={{ width: `${mildPct}%` }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500">
                    <span>Moderate Zone</span>
                    <span>{modPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sand rounded-full" style={{ width: `${modPct}%` }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500">
                    <span>Severe Zone</span>
                    <span>{sevPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${sevPct}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Descriptors / Symptoms pills */}
          <div className="flex flex-wrap gap-2.5">
            {diseaseInfo.symptoms.map((symptom, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/70 border border-slate-200/50 text-[10px] font-bold text-slate-700"
              >
                <Flame className="w-3.5 h-3.5 text-[#5AA7A7]" /> {symptom}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bento Section Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento 1: Recommended Treatment */}
        <div className="md:col-span-8 glass-panel rounded-[32px] p-6 border border-white/60 shadow-sm space-y-4">
          <h4 className="font-heading font-extrabold text-sm text-slate-950 flex items-center gap-2">
            <Stethoscope className="w-4.5 h-4.5 text-primary" /> Recommended treatment plan
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
            {diseaseInfo.treatments.map((treat, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-full bg-white/60 border border-slate-100">
                <span className="w-5.5 h-5.5 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span className="text-slate-700">{treat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bento 2: Precautions */}
        <div className="md:col-span-4 glass-panel rounded-[32px] p-6 border border-white/60 shadow-sm space-y-4">
          <h4 className="font-heading font-extrabold text-sm text-slate-950 flex items-center gap-2">
            <Shield className="w-4.5 h-4.5 text-primary" /> Precautions
          </h4>
          <ul className="space-y-2.5 text-[11px] font-bold text-slate-650">
            {diseaseInfo.precautions.map((prec, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <CheckCircle className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>{prec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bento 3: Skincare Routine */}
        <div className="md:col-span-8 glass-panel rounded-[32px] p-6 border border-white/60 shadow-sm space-y-4">
          <h4 className="font-heading font-extrabold text-sm text-slate-950 flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-primary" /> Recommended skincare routine
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-3xl bg-white/60 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <span>Morning Routine</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                {diseaseInfo.skincare.morning}
              </p>
            </div>

            <div className="p-4 rounded-3xl bg-white/60 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                <div className="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <Droplet className="w-4 h-4" />
                </div>
                <span>Night Routine</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                {diseaseInfo.skincare.night}
              </p>
            </div>

          </div>
        </div>

        {/* Bento 4: Home Remedies */}
        <div className="md:col-span-4 glass-panel rounded-[32px] p-6 border border-white/60 shadow-sm space-y-4">
          <h4 className="font-heading font-extrabold text-sm text-slate-950 flex items-center gap-2">
            <Home className="w-4.5 h-4.5 text-primary" /> Home remedies
          </h4>
          <ul className="space-y-3 text-[11px] font-bold text-slate-650">
            {diseaseInfo.remedies.map((rem, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <Droplet className="w-4 h-4 text-primary shrink-0" />
                <span>{rem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bento 5: Medicine Suggestions */}
        <div className="md:col-span-8 glass-panel rounded-[32px] p-6 border border-white/60 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <h4 className="font-heading font-extrabold text-sm text-slate-950 flex items-center gap-2">
              <Pill className="w-4.5 h-4.5 text-primary" /> Medicine suggestions
            </h4>
            <span className="text-[8px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50 uppercase tracking-widest">
              OTC • Informational
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {diseaseInfo.medicines.map((med, idx) => (
              <div key={idx} className="p-4 rounded-3xl bg-white/60 border border-slate-100 space-y-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[11px] text-slate-900 leading-tight">{med.name}</h5>
                  <span className="text-[8.5px] text-slate-400 block font-bold mt-0.5 uppercase tracking-wide">OTC suggested</span>
                  <p className="text-[9px] text-slate-500 leading-snug mt-1">{med.dosage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento 6: Book Consultation */}
        <div className="md:col-span-4 p-6 rounded-[32px] bg-gradient-to-br from-primary/15 via-mint/5 to-transparent border border-primary/20 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h4 className="font-heading font-extrabold text-sm text-slate-950 flex items-center gap-2">
              <Stethoscope className="w-4.5 h-4.5 text-primary" /> Talk to a dermatologist
            </h4>
            <p className="text-[10px] text-slate-500 leading-normal font-medium">
              Get a secure video consult within 30 minutes. Lumen-verified specialists, transparent pricing.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/doctors')}
            className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-[#52a2a2] hover:bg-[#458b8b] shadow-sm transition-all cursor-pointer"
          >
            Book consultation
          </button>
        </div>

      </div>

      {/* Medical Disclaimer Footer */}
      <p className="w-full text-center text-[9px] font-semibold text-slate-450 uppercase tracking-wide pt-4 border-t border-slate-200/50">
        This AI report is informational and not a medical diagnosis. Consult a licensed dermatologist for treatment decisions.
      </p>

    </div>
  );
}
