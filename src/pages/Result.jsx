import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, SKIN_DISEASES } from '../context/AppContext';
import { ArrowLeft, Share2, Download, AlertCircle, Shield, Sparkles, Home, Pill, Stethoscope, CheckCircle, Droplet, Sun, Flame, ImageDown, Check } from 'lucide-react';

export default function Result() {
  const { currentScan, scans, user } = useApp();
  const navigate = useNavigate();
  const reportRef = useRef(null);
  const [sharing, setSharing] = useState(false);
  const [shareDone, setShareDone] = useState(false);

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

  const handlePrint = () => { window.print(); };

  const handleShare = async () => {
    setSharing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      canvas.toBlob(async (blob) => {
        const file = new File([blob], `dermavision-${activeScan.id}.png`, { type: 'image/png' });
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: `DermaVision Report — ${activeScan.diseaseName}`, files: [file] });
        } else {
          // Fallback: download the image
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = `dermavision-${activeScan.id}.png`; a.click();
          URL.revokeObjectURL(url);
        }
        setShareDone(true);
        setTimeout(() => setShareDone(false), 2500);
      }, 'image/png');
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setSharing(false);
    }
  };

  // Map severity values to progress percentages for rendering
  const severityVal = diseaseInfo.severityValue || 50;
  const mildPct = Math.max(0, Math.min(100, 100 - severityVal));
  const modPct = Math.max(0, Math.min(100, severityVal > 30 && severityVal <= 75 ? severityVal : 40));
  const sevPct = Math.max(0, Math.min(100, severityVal > 75 ? severityVal : 15));

  const predictions = activeScan.predictions || [];

  return (
    <div className="flex-grow p-4 md:p-6 lg:p-8 space-y-6 bg-transparent text-left print:bg-white print:p-0">
      
      {/* Dynamic print style rules */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body, #root {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 15mm;
            size: A4;
          }
        }
      `}} />

      {/* Screen Layout: Hides completely when printing */}
      <div ref={reportRef} className="space-y-6 print:hidden">
        
        {/* Top Header Bar */}
        <div className="w-full bg-white/70 px-4 py-3 rounded-[24px] md:rounded-full border border-slate-200/50 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <button
            onClick={() => navigate('/detect')}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to history
          </button>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleShare}
              disabled={sharing}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200/60 text-[11px] font-extrabold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer flex-1 sm:flex-initial justify-center disabled:opacity-60"
            >
              {shareDone ? <><Check className="w-3.5 h-3.5 text-emerald-500" /> Saved!</> : sharing ? <><ImageDown className="w-3.5 h-3.5 animate-pulse" /> Generating…</> : <><Share2 className="w-3.5 h-3.5" /> Share</>}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#52a2a2] hover:bg-[#458b8b] text-[11px] font-extrabold text-white shadow-sm transition-all cursor-pointer flex-1 sm:flex-initial justify-center"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>

        {/* Top Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
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
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Engine</span>
                <span className="text-[10px] font-extrabold text-slate-800 mt-0.5 block truncate">
                  {activeScan.source === 'model_daemon' && 'Daemon'}
                  {activeScan.source === 'model' && 'On-Demand'}
                  {(!activeScan.source || activeScan.source.includes('simulation') || activeScan.source.includes('filename')) && 'Simulated'}
                </span>
              </div>
              <div className="py-2 px-1 rounded-2xl bg-white/60 border border-slate-200/40 text-center leading-tight">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Analysis Time</span>
                <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">
                  {activeScan.source === 'model_daemon' ? '0.03s' : activeScan.source === 'model' ? '1.2s' : '0.1s'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnosis & Metrics */}
          <div className="lg:col-span-7 glass-panel rounded-[32px] p-6 border border-white/60 shadow-sm flex flex-col justify-between space-y-6">
            
            {/* Header */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/50 text-[9px] font-bold text-[#5AA7A7]">
                  <AlertCircle className="w-3.5 h-3.5" /> Primary AI detection
                </span>
                
                {/* Diagnostic Origin Badge */}
                {activeScan.source === 'model_daemon' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9.5px] font-black text-emerald-600 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Verified: Local ML Engine (Real-time)
                  </span>
                )}
                {activeScan.source === 'model' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[9.5px] font-black text-blue-600 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    Verified: Local ML Engine (On-Demand)
                  </span>
                )}
                {(activeScan.source === 'simulation_fallback' || activeScan.source === 'filename_matched' || !activeScan.source) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9.5px] font-black text-amber-600 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Simulated Diagnostic Mode (Offline)
                  </span>
                )}
              </div>

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

            {/* Differential Diagnoses Chart */}
            {predictions && predictions.length > 0 && (
              <div className="p-4 rounded-3xl bg-white/60 border border-white/80 space-y-3 shadow-inner">
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Differential Diagnoses (Top Alternative Predictions)</span>
                  <span className="font-mono text-slate-500 font-normal">Probability</span>
                </div>
                <div className="space-y-2">
                  {predictions.map((pred, idx) => {
                    const confPct = Math.round(pred.confidence * 100);
                    const barColor = idx === 0 ? 'bg-[#52a2a2]' : idx === 1 ? 'bg-slate-400' : 'bg-slate-350';
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-extrabold text-slate-850">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-[#52a2a2]' : 'bg-slate-400'}`}></span>
                            {pred.displayName || pred.class_name}
                          </span>
                          <span className="font-mono text-slate-550 font-bold">{confPct}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100/80 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${barColor} rounded-full transition-all duration-500`}
                            style={{ width: `${confPct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
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
                Get a secure video consult within 30 minutes. DermaVision-verified specialists, transparent pricing.
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

      {/* Print Only Medical Report Document: Visible only when printing */}
      <div className="hidden print:block w-full max-w-[800px] mx-auto p-4 text-slate-900 bg-white leading-relaxed font-sans text-xs">
        
        {/* Letterhead */}
        <div className="flex justify-between items-center border-b-2 border-slate-800 pb-4 mb-6">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase">IMPACT Clinical AI Laboratories</h1>
            <p className="text-[10px] text-slate-550 font-bold mt-0.5">Dermatological Analytics & Computer Vision Division</p>
            <p className="text-[9px] text-slate-400 mt-1">750 Health Sciences Dr, Palo Alto, CA 94304 | Tel: +1 (650) 555-0190</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-slate-100 rounded text-[9px] font-black text-slate-800 uppercase tracking-widest border border-slate-200">
              OFFICIAL REPORT
            </span>
            <p className="text-[9px] text-slate-450 mt-1.5 font-bold font-mono">ID: {activeScan.id}</p>
          </div>
        </div>

        {/* Patient and Scan Metadata Grid */}
        <div className="grid grid-cols-2 gap-6 border border-slate-200 rounded-lg p-4 bg-slate-50/50 mb-6">
          <div>
            <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2">Patient Information</h3>
            <div className="space-y-1 text-slate-800 font-semibold">
              <p>Name: <span className="text-slate-950 font-bold">{user?.name || 'Alexander Mercer'}</span></p>
              <p>Email: <span className="text-slate-900 font-bold">{user?.email || 'alex.mercer@cyberhealth.ai'}</span></p>
              <p>Record ID: <span className="font-mono text-slate-900">{user?.id ? `PAT-${user.id.substring(user.id.length - 6).toUpperCase()}` : 'PAT-92834-AM'}</span></p>
              {user?.allergies && <p>Allergies: <span className="text-slate-900 font-bold">{user.allergies}</span></p>}
              {user?.skinCondition && <p>Skin Conditions: <span className="text-slate-900 font-bold">{user.skinCondition}</span></p>}
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2">Analysis Metadata</h3>
            <div className="space-y-1 text-slate-800 font-semibold">
              <p>Diagnostic Date: <span className="text-slate-950 font-bold">{activeScan.date} {activeScan.time}</span></p>
              <p>Processing Engine: <span className="text-[#52a2a2] font-bold">
                {activeScan.source === 'model_daemon' && 'Local ML Engine (Real-time)'}
                {activeScan.source === 'model' && 'Local ML Engine (On-Demand)'}
                {(!activeScan.source || activeScan.source.includes('simulation') || activeScan.source.includes('filename')) && 'Simulated Diagnostic Mode (Offline)'}
              </span></p>
              <p>AI Engine Version: <span className="text-slate-900 font-bold">v3.2-stable</span></p>
            </div>
          </div>
        </div>

        {/* Primary Diagnosis & Image Grid */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Image */}
          <div className="col-span-4">
            <div className="border border-slate-200 rounded-lg p-1.5 bg-white shadow-sm">
              <img
                src={activeScan.imageUrl}
                alt="Scan lesion"
                className="w-full aspect-square object-cover rounded-md"
              />
              <span className="block text-[8px] text-center text-slate-400 font-bold mt-1.5 uppercase">Captured Lesion Area</span>
            </div>
          </div>

          {/* Primary Diagnosis */}
          <div className="col-span-8 space-y-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-white relative shadow-sm">
              <span className="absolute top-4 right-4 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-extrabold rounded-full border border-emerald-150">
                Primary Diagnosis
              </span>
              <h2 className="text-lg font-black text-slate-950 leading-tight">{activeScan.diseaseName}</h2>
              <p className="text-[10px] text-slate-550 leading-relaxed mt-2 font-medium">{diseaseInfo.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Model Confidence</span>
                  <span className="text-sm font-black text-slate-950">{activeScan.confidence}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Clinical Severity</span>
                  <span className="text-sm font-black text-rose-600">{activeScan.severity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Differential Diagnoses */}
        <div className="border border-slate-200 rounded-lg p-4 mb-6 bg-white shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-3">Differential Diagnoses (Alternative AI Classifications)</h3>
          <div className="space-y-3">
            {predictions.map((pred, idx) => {
              const confPct = Math.round(pred.confidence * 100);
              return (
                <div key={idx} className="flex justify-between items-center text-slate-800 text-[10px] font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900">{pred.displayName || pred.class_name}</span>
                  </div>
                  <div className="flex items-center gap-4 w-1/2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#52a2a2] h-full rounded-full" style={{ width: `${confPct}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-950 font-mono w-8 text-right">{confPct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Treatment & Precautions Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2">Recommended Treatment</h3>
            <ul className="list-disc pl-4 space-y-1.5 font-semibold text-slate-800">
              {diseaseInfo.treatments.map((treat, idx) => (
                <li key={idx} className="leading-tight">{treat}</li>
              ))}
            </ul>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2">Clinical Precautions</h3>
            <ul className="list-disc pl-4 space-y-1.5 font-semibold text-slate-800">
              {diseaseInfo.precautions.map((prec, idx) => (
                <li key={idx} className="leading-tight">{prec}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skincare Routine & Medicines */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Skincare */}
          <div className="col-span-6 border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-3">Suggested Care Routine</h3>
            <div className="space-y-3">
              <div>
                <span className="text-[8.5px] font-bold text-amber-600 uppercase">Morning Care</span>
                <p className="mt-0.5 leading-normal text-slate-750 font-semibold">{diseaseInfo.skincare.morning}</p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[8.5px] font-bold text-indigo-600 uppercase">Night Care</span>
                <p className="mt-0.5 leading-normal text-slate-750 font-semibold">{diseaseInfo.skincare.night}</p>
              </div>
            </div>
          </div>

          {/* Medicines */}
          <div className="col-span-6 border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2">Supportive Therapeutics</h3>
            <div className="divide-y divide-slate-100">
              {diseaseInfo.medicines.map((med, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0 font-medium">
                  <h4 className="font-bold text-slate-900">{med.name}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{med.dosage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Physician Review & Signature Block */}
        <div className="grid grid-cols-2 gap-6 pt-6 mt-12 border-t border-dashed border-slate-350">
          <div>
            <h4 className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Clinical Guidelines</h4>
            <p className="text-[9px] text-slate-500 leading-relaxed font-semibold">
              This automated report is a computerized computer-vision inference results based on input photo of skin lesion. Under California Business & Professions Code Sec. 2242, this analysis must be combined with patient history and reviewed by a licensed clinician prior to prescribing any clinical therapies.
            </p>
          </div>
          <div className="flex flex-col justify-end items-end space-y-6">
            <div className="border-b border-slate-900 w-48 text-center pb-1">
              <span className="font-mono text-xs text-slate-400 italic">Dr. AI Clinician Signature</span>
            </div>
            <div className="text-right leading-none">
              <span className="text-[9px] text-slate-400 font-bold uppercase block">Reviewed By / Attending Physician</span>
              <span className="text-[9.5px] font-black text-slate-900 block mt-1.5">Date: ________________________</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
