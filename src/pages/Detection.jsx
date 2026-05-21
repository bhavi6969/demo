import { useNavigate } from 'react-router-dom';
import { useApp, SKIN_DISEASES } from '../context/AppContext';
import { FileText, Download, Calendar, Clock, AlertTriangle, Eye, Sparkles } from 'lucide-react';

export default function Detection() {
  const { scans, setCurrentScan } = useApp();
  const navigate = useNavigate();

  const handleViewReport = (scan) => {
    setCurrentScan(scan);
    navigate('/result');
  };

  const handleDownloadReport = (scan) => {
    setCurrentScan(scan);
    // Triggers standard print screen for PDF generation
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="space-y-6 text-left w-full pb-10">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
            Prediction History & Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Access your past skin scans, confidence scores, and download clinical PDF reports.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/50 shadow-sm text-xs font-bold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-[#5AA7A7]" />
          <span>Total Scans: {scans.length}</span>
        </div>
      </div>

      {/* History Grid */}
      {scans.length === 0 ? (
        <div className="glass-panel rounded-[32px] p-12 text-center border border-white/50 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm text-slate-800">No prediction history found</h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal max-w-sm mx-auto">
              You haven't uploaded or captured any skin images for analysis yet. Perform a scan on the home page.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] transition-all shadow-sm cursor-pointer"
          >
            Start First Analysis
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => {
            const diseaseMeta = SKIN_DISEASES[scan.diseaseId] || {
              severityColor: 'text-[#5AA7A7] bg-[#c6f0ea]/20'
            };
            return (
              <div
                key={scan.id}
                className="glass-panel rounded-[28px] p-5 border border-white/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 hover:shadow-md transition-shadow"
              >
                
                {/* Left Side: Thumbnail & Disease Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/50 shrink-0">
                    <img src={scan.imageUrl} alt={scan.diseaseName} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="text-center sm:text-left space-y-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-[9px] text-[#5AA7A7] font-bold bg-[#c6f0ea]/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {scan.id}
                      </span>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${diseaseMeta.severityColor}`}>
                        {scan.severity}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-base text-slate-900 leading-tight">
                      {scan.diseaseName}
                    </h3>

                    {/* Scan Timestamp */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-350" /> {scan.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-350" /> {scan.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Prediction Metrics & Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 w-full md:w-auto shrink-0">
                  
                  {/* Confidence Score Pill */}
                  <div className="flex flex-col items-center sm:items-end justify-center px-4 py-2 rounded-2xl bg-white/60 border border-slate-200/30 leading-none">
                    <span className="text-lg font-black text-[#5AA7A7] font-mono">{scan.confidence}</span>
                    <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Confidence</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full sm:w-auto justify-center">
                    <button
                      onClick={() => handleViewReport(scan)}
                      className="px-4 py-2.5 rounded-full text-xs font-extrabold text-slate-700 bg-white border border-slate-200/50 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                      onClick={() => handleDownloadReport(scan)}
                      className="px-4 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#52a2a2] hover:bg-[#458b8b] transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial shadow-sm"
                    >
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
