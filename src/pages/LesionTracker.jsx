import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, Camera, Upload, X, CheckCircle2, AlertTriangle, ArrowRight, Calendar, Sparkles, ChevronRight, Activity, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function LesionTracker() {
  const { token, addNotification } = useApp();
  const [lesions, setLesions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesion, setSelectedLesion] = useState(null);
  
  // Modals state
  const [showAddLesionModal, setShowAddLesionModal] = useState(false);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  
  // Side-by-side compare logs selection
  const [compareLogA, setCompareLogA] = useState(null);
  const [compareLogB, setCompareLogB] = useState(null);

  // Form states for new lesion
  const [newLabel, setNewLabel] = useState('');
  const [newDiameter, setNewDiameter] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  
  // Cropper specific states inside modals
  const [image, setImage] = useState(null); // stores final cropped base64
  const [rawImage, setRawImage] = useState(null); // original file before crop
  const [isCropping, setIsCropping] = useState(false);
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, size: 150 });
  const [displaySize, setDisplaySize] = useState(null);
  const [dragMode, setDragMode] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, box: null });

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  const symptomOptions = ['Itching', 'Redness / Inflammation', 'Bleeding', 'Burning / Pain', 'Texture change', 'Border irregularity'];

  // Fetch lesions on mount
  useEffect(() => {
    fetchLesions();
  }, [token]);

  const fetchLesions = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/lesions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setLesions(data.lesions);
        if (data.lesions.length > 0) {
          // Select first lesion by default
          setSelectedLesion(data.lesions[0]);
          if (data.lesions[0].logs.length >= 1) {
            setCompareLogA(data.lesions[0].logs[0]._id);
            setCompareLogB(data.lesions[0].logs[data.lesions[0].logs.length - 1]._id);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching lesions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  // Image load & crop logic
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRawImage(event.target.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (e) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    setDisplaySize({ width: rect.width, height: rect.height });
    const minDim = Math.min(rect.width, rect.height);
    const size = minDim * 0.6;
    setCropBox({
      x: (rect.width - size) / 2,
      y: (rect.height - size) / 2,
      size: size
    });
  };

  const startDrag = (e, mode) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragMode(mode);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      box: { ...cropBox }
    });
  };

  const handleDragMove = (e) => {
    if (!dragMode || !dragStart.box || !displaySize) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    let { x, y, size } = dragStart.box;

    if (dragMode === 'move') {
      let newX = Math.max(0, Math.min(x + dx, displaySize.width - size));
      let newY = Math.max(0, Math.min(y + dy, displaySize.height - size));
      setCropBox({ x: newX, y: newY, size });
    } else {
      let delta = 0;
      const minSize = 40;
      switch (dragMode) {
        case 'bottom-right':
          delta = Math.max(dx, dy);
          setCropBox({ x, y, size: Math.max(minSize, Math.min(size + delta, displaySize.width - x, displaySize.height - y)) });
          break;
        case 'top-left':
          delta = Math.max(-dx, -dy);
          delta = Math.min(delta, Math.min(x, y));
          setCropBox({ x: x - delta, y: y - delta, size: Math.max(minSize, size + delta) });
          break;
        case 'top-right':
          delta = Math.max(dx, -dy);
          delta = Math.min(delta, Math.min(displaySize.width - (x + size), y));
          setCropBox({ x, y: y - delta, size: Math.max(minSize, size + delta) });
          break;
        case 'bottom-left':
          delta = Math.max(-dx, dy);
          delta = Math.min(delta, Math.min(x, displaySize.height - (y + size)));
          setCropBox({ x: x - delta, y, size: Math.max(minSize, size + delta) });
          break;
        default:
          break;
      }
    }
  };

  const stopDrag = (e) => {
    if (dragMode) {
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
      setDragMode(null);
    }
  };

  const executeCrop = () => {
    if (!imageRef.current || !displaySize) return;
    const img = imageRef.current;
    const scaleX = img.naturalWidth / displaySize.width;
    const scaleY = img.naturalHeight / displaySize.height;

    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = 224;
    cropCanvas.height = 224;
    const ctx = cropCanvas.getContext('2d');

    try {
      ctx.drawImage(
        img,
        cropBox.x * scaleX,
        cropBox.y * scaleY,
        cropBox.size * scaleX,
        cropBox.size * scaleX,
        0, 0, 224, 224
      );
      const dataUrl = cropCanvas.toDataURL('image/jpeg', 0.9);
      setImage(dataUrl);
      setIsCropping(false);
      setRawImage(null);
    } catch (err) {
      console.error(err);
      alert('Failed to crop image.');
    }
  };

  const handleCreateLesion = async (e) => {
    e.preventDefault();
    if (!newLabel || !image || !newDiameter) {
      alert('Please fill out all fields and select a lesion photo.');
      return;
    }

    const parsedDiameter = parseFloat(newDiameter);
    if (isNaN(parsedDiameter) || parsedDiameter <= 0) {
      alert('Please enter a valid numeric diameter greater than 0.');
      return;
    }

    try {
      const res = await fetch('/api/lesions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          label: newLabel,
          imageUrl: image,
          diameterMm: parsedDiameter,
          symptoms: selectedSymptoms,
          notes: newNotes
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        addNotification(`Started tracking lesion: "${newLabel}"`);
        setNewLabel('');
        setNewDiameter('');
        setNewNotes('');
        setSelectedSymptoms([]);
        setImage(null);
        setShowAddLesionModal(false);
        fetchLesions();
      } else {
        alert(data.message || 'Failed to start tracking lesion. Please verify input fields.');
      }
    } catch (err) {
      console.error(err);
      alert('A network error occurred. Please check if the backend server is running and try again.');
    }
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!image || !newDiameter) {
      alert('Please upload a photo and record the diameter size.');
      return;
    }

    const parsedDiameter = parseFloat(newDiameter);
    if (isNaN(parsedDiameter) || parsedDiameter <= 0) {
      alert('Please enter a valid numeric diameter greater than 0.');
      return;
    }

    try {
      const res = await fetch(`/api/lesions/${selectedLesion._id}/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          imageUrl: image,
          diameterMm: parsedDiameter,
          symptoms: selectedSymptoms,
          notes: newNotes
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        addNotification(`New progression log added for "${selectedLesion.label}"`);
        setNewDiameter('');
        setNewNotes('');
        setSelectedSymptoms([]);
        setImage(null);
        setShowAddLogModal(false);
        // Refresh and select
        const updatedLesions = lesions.map(l => l._id === data.lesion._id ? data.lesion : l);
        setLesions(updatedLesions);
        const updatedSelected = updatedLesions.find(l => l._id === data.lesion._id);
        setSelectedLesion(updatedSelected);
        if (updatedSelected.logs.length >= 2) {
          setCompareLogA(updatedSelected.logs[0]._id);
          setCompareLogB(updatedSelected.logs[updatedSelected.logs.length - 1]._id);
        }
      } else {
        alert(data.message || 'Failed to add log entry. Please verify input fields.');
      }
    } catch (err) {
      console.error(err);
      alert('A network error occurred. Please check if the backend server is running and try again.');
    }
  };

  const handleDeleteLesion = async (id) => {
    if (!confirm('Are you sure you want to stop tracking this lesion? All historical photos will be permanently deleted.')) return;
    try {
      const res = await fetch(`/api/lesions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        addNotification('Lesion tracker deleted.');
        const remaining = lesions.filter(l => l._id !== id);
        setLesions(remaining);
        if (remaining.length > 0) {
          setSelectedLesion(remaining[0]);
          if (remaining[0].logs.length >= 1) {
            setCompareLogA(remaining[0].logs[0]._id);
            setCompareLogB(remaining[0].logs[remaining[0].logs.length - 1]._id);
          }
        } else {
          setSelectedLesion(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Select another lesion
  const handleSelectLesion = (lesion) => {
    setSelectedLesion(lesion);
    if (lesion.logs.length >= 1) {
      setCompareLogA(lesion.logs[0]._id);
      setCompareLogB(lesion.logs[lesion.logs.length - 1]._id);
    }
  };

  // Gather chart data
  const getChartData = () => {
    if (!selectedLesion) return [];
    return selectedLesion.logs.map((log, idx) => ({
      name: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      Size: log.diameterMm,
    }));
  };

  const getLogById = (id) => {
    if (!selectedLesion) return null;
    return selectedLesion.logs.find(log => log._id === id) || null;
  };

  const logA = getLogById(compareLogA);
  const logB = getLogById(compareLogB);

  return (
    <div className="flex-grow p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 bg-slate-50/30 dark:bg-slate-900/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#5AA7A7]" /> Lesion Growth Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor skin moles and lesions over time to track size changes, irregular borders, and other atypical symptoms.
          </p>
        </div>
        <button
          onClick={() => {
            setImage(null);
            setShowAddLesionModal(true);
          }}
          className="px-5 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer self-stretch md:self-auto text-center justify-center"
        >
          <Plus className="w-4 h-4" /> Start Tracking Lesion
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5AA7A7]"></div>
        </div>
      ) : lesions.length === 0 ? (
        <div className="glass-panel rounded-[32px] p-8 text-center max-w-xl mx-auto space-y-5 border border-white/50 shadow-sm">
          <div className="w-16 h-16 bg-[#5AA7A7]/10 text-[#5AA7A7] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white">No tracked lesions</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              You aren't tracking any spots yet. Start monitoring active skin anomalies, moles, or lesions to build a photographic progression timeline.
            </p>
          </div>
          <button
            onClick={() => setShowAddLesionModal(true)}
            className="px-6 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] cursor-pointer"
          >
            Create first tracker
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Lesion list */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider pl-1">Your Tracked Spots</h2>
            <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
              {lesions.map((lesion) => {
                const latestLog = lesion.logs[lesion.logs.length - 1];
                const firstLog = lesion.logs[0];
                const change = latestLog.diameterMm - firstLog.diameterMm;
                const isSelected = selectedLesion?._id === lesion._id;
                
                return (
                  <div
                    key={lesion._id}
                    onClick={() => handleSelectLesion(lesion)}
                    className={`p-4 rounded-[24px] border transition-all cursor-pointer text-left flex gap-4 ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-[#5AA7A7] shadow-md shadow-[#5AA7A7]/5'
                        : 'bg-white/60 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800/80 shadow-sm'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-200/20 shrink-0">
                      <img src={latestLog.imageUrl} alt={lesion.label} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow space-y-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h3 className="font-heading font-extrabold text-xs text-slate-800 dark:text-white truncate">
                          {lesion.label}
                        </h3>
                        <span className="text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-350">
                          {lesion.logs.length} logs
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Size: <span className="font-bold text-slate-600 dark:text-slate-300">{latestLog.diameterMm} mm</span>
                      </p>
                      
                      {/* Trend tag */}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {change > 0 ? (
                          <span className="text-[9px] font-extrabold text-amber-500">
                            ↗ +{change.toFixed(1)} mm change
                          </span>
                        ) : change < 0 ? (
                          <span className="text-[9px] font-extrabold text-[#5AA7A7]">
                            ↘ {change.toFixed(1)} mm change
                          </span>
                        ) : (
                          <span className="text-[9px] font-extrabold text-slate-400">
                            → Stable size
                          </span>
                        )}
                        <span className="text-[9px] text-slate-400">• {new Date(latestLog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Lesion details */}
          {selectedLesion && (
            <div className="lg:col-span-8 space-y-6">
              
              {/* Stats Card & Action Panel */}
              <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm bg-white dark:bg-slate-800 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/80 pb-4">
                  <div className="space-y-0.5">
                    <h2 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white">{selectedLesion.label}</h2>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">
                      Tracking since {new Date(selectedLesion.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setImage(null);
                        setShowAddLogModal(true);
                      }}
                      className="px-4 py-1.5 rounded-full text-[10px] font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Log Photo
                    </button>
                    <button
                      onClick={() => handleDeleteLesion(selectedLesion._id)}
                      className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Stop tracking this spot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Chart */}
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Size Progression Timeline (mm)</h3>
                  <div className="w-full h-48 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.15)" />
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="rgba(148, 163, 184, 0.5)" />
                        <YAxis tick={{ fontSize: 9 }} stroke="rgba(148, 163, 184, 0.5)" domain={['dataMin - 1', 'dataMax + 1']} />
                        <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '12px' }} />
                        <Line type="monotone" dataKey="Size" stroke="#5AA7A7" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#5AA7A7', fill: '#fff' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Side-by-side Photo Comparer */}
              <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm bg-white dark:bg-slate-800 space-y-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 dark:border-slate-700/80 pb-4">
                  <div className="space-y-0.5">
                    <h3 className="font-heading font-extrabold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Visual Shape Comparison</h3>
                    <p className="text-[10px] text-slate-400">Select any two logs to visually compare borders, color, and texture changes.</p>
                  </div>
                  
                  {/* Selectors */}
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={compareLogA || ''}
                      onChange={(e) => setCompareLogA(e.target.value)}
                      className="px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-350 cursor-pointer"
                    >
                      {selectedLesion.logs.map((l, i) => (
                        <option key={l._id} value={l._id}>Log #{i+1} ({new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</option>
                      ))}
                    </select>
                    <span className="text-xs text-slate-400 self-center">vs</span>
                    <select
                      value={compareLogB || ''}
                      onChange={(e) => setCompareLogB(e.target.value)}
                      className="px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-350 cursor-pointer"
                    >
                      {selectedLesion.logs.map((l, i) => (
                        <option key={l._id} value={l._id}>Log #{i+1} ({new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Images row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Log A */}
                  <div className="space-y-2 text-left bg-slate-50 dark:bg-slate-900/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <span>Baseline/Log A</span>
                      <span>{logA ? new Date(logA.date).toLocaleDateString('en-US', { dateStyle: 'medium' }) : ''}</span>
                    </div>
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200/10 relative">
                      {logA ? (
                        <img src={logA.imageUrl} alt="Log A" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">No photo</div>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 space-y-1">
                      <p>Size: <span className="font-extrabold text-slate-700 dark:text-slate-300">{logA?.diameterMm} mm</span></p>
                      <p className="truncate">Symptoms: <span className="font-bold text-slate-600 dark:text-slate-300">{logA?.symptoms.join(', ') || 'None'}</span></p>
                      {logA?.notes && <p className="italic text-[9px] leading-snug">"{logA.notes}"</p>}
                    </div>
                  </div>

                  {/* Log B */}
                  <div className="space-y-2 text-left bg-slate-50 dark:bg-slate-900/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <span>Comparison/Log B</span>
                      <span>{logB ? new Date(logB.date).toLocaleDateString('en-US', { dateStyle: 'medium' }) : ''}</span>
                    </div>
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200/10 relative">
                      {logB ? (
                        <img src={logB.imageUrl} alt="Log B" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">No photo</div>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 space-y-1">
                      <p>Size: <span className="font-extrabold text-slate-700 dark:text-slate-300">{logB?.diameterMm} mm</span></p>
                      <p className="truncate">Symptoms: <span className="font-bold text-slate-600 dark:text-slate-300">{logB?.symptoms.join(', ') || 'None'}</span></p>
                      {logB?.notes && <p className="italic text-[9px] leading-snug">"{logB.notes}"</p>}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* Add Lesion & Add Log Dialog Overlay modals */}
      <AnimatePresence>
        {(showAddLesionModal || showAddLogModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <h3 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white">
                    {showAddLesionModal ? 'Track New Lesion' : `Add Log for "${selectedLesion?.label}"`}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {showAddLesionModal 
                      ? 'Upload a focused base photo and record its physical size details.' 
                      : 'Record changes by uploading a new photo and capturing size.'
                    }
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddLesionModal(false);
                    setShowAddLogModal(false);
                    setImage(null);
                  }}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={showAddLesionModal ? handleCreateLesion : handleAddLog} className="space-y-4">
                
                {/* Photo Dropzone with Cropper inside */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Lesion Photo</label>
                  
                  {isCropping && rawImage ? (
                    // Cropper container inside form
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-[#5AA7A7]/40 flex flex-col items-center">
                      <div className="relative inline-block max-h-[30vh] max-w-full select-none">
                        <img
                          ref={imageRef}
                          src={rawImage}
                          onLoad={handleImageLoad}
                          className="max-h-[30vh] max-w-full object-contain pointer-events-none rounded-lg"
                        />
                        {displaySize && (
                          <div
                            className="absolute inset-0 w-full h-full touch-none"
                            onPointerMove={handleDragMove}
                            onPointerUp={stopDrag}
                            onPointerLeave={stopDrag}
                          >
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                              <path
                                fill="rgba(0, 0, 0, 0.65)"
                                fillRule="evenodd"
                                d={`M 0,0 L ${displaySize.width},0 L ${displaySize.width},${displaySize.height} L 0,${displaySize.height} Z
                                    M ${cropBox.x},${cropBox.y} L ${cropBox.x},${cropBox.y + cropBox.size} L ${cropBox.x + cropBox.size},${cropBox.y + cropBox.size} L ${cropBox.x + cropBox.size},${cropBox.y} Z`}
                              />
                              <rect
                                x={cropBox.x}
                                y={cropBox.y}
                                width={cropBox.size}
                                height={cropBox.size}
                                fill="none"
                                stroke="#5AA7A7"
                                strokeWidth="2"
                              />
                            </svg>
                            <div
                              style={{
                                position: 'absolute',
                                left: cropBox.x,
                                top: cropBox.y,
                                width: cropBox.size,
                                height: cropBox.size,
                              }}
                              className="absolute cursor-move select-none"
                              onPointerDown={(e) => startDrag(e, 'move')}
                            >
                              <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-[#5AA7A7] rounded-full cursor-nwse-resize" onPointerDown={(e) => startDrag(e, 'top-left')} />
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-[#5AA7A7] rounded-full cursor-nesw-resize" onPointerDown={(e) => startDrag(e, 'top-right')} />
                              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-[#5AA7A7] rounded-full cursor-nesw-resize" onPointerDown={(e) => startDrag(e, 'bottom-left')} />
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-[#5AA7A7] rounded-full cursor-nwse-resize" onPointerDown={(e) => startDrag(e, 'bottom-right')} />
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={executeCrop}
                        className="mt-3 px-4 py-1 rounded-full text-[9px] font-extrabold text-white bg-[#5AA7A7] hover:brightness-105 cursor-pointer"
                      >
                        Crop & Set Photo
                      </button>
                    </div>
                  ) : image ? (
                    // Cropped preview
                    <div className="relative aspect-square w-32 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/10 mx-auto">
                      <img src={image} alt="Lesion cropped preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    // Dropzone trigger
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="w-full border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl py-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Click to upload photo</span>
                      <span className="text-[8px] text-slate-400 mt-0.5">JPEG, PNG. Locks to square crop</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Form fields */}
                {showAddLesionModal && (
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Label / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Forehead spot, arm mole"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs font-bold text-slate-850 dark:text-white focus:outline-none focus:border-[#5AA7A7]"
                      required
                    />
                  </div>
                )}

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Measured Diameter (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 5.5"
                    value={newDiameter}
                    onChange={(e) => setNewDiameter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs font-bold text-slate-850 dark:text-white focus:outline-none focus:border-[#5AA7A7]"
                    required
                  />
                </div>

                {/* Symptoms */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Accompanying Symptoms</label>
                  <div className="flex flex-wrap gap-1.5">
                    {symptomOptions.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <button
                          type="button"
                          key={symptom}
                          onClick={() => handleSymptomToggle(symptom)}
                          className={`px-3 py-1.5 rounded-full text-[9px] font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#5AA7A7]/10 border-[#5AA7A7] text-[#357878] dark:text-[#96D7C6]'
                              : 'bg-white dark:bg-slate-800 border-slate-200/50 dark:border-slate-800/80 text-slate-500 dark:text-slate-350 hover:bg-slate-50'
                          }`}
                        >
                          {symptom}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Notes / Context</label>
                  <textarea
                    placeholder="Describe borders (e.g. blurry, sharp), colors (e.g. brown, pink), or other observations."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs font-bold text-slate-850 dark:text-white focus:outline-none focus:border-[#5AA7A7] h-20 resize-none"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3.5 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddLesionModal(false);
                      setShowAddLogModal(false);
                      setImage(null);
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] hover:brightness-105 shadow-md cursor-pointer"
                  >
                    Confirm & Save
                  </button>
                </div>

              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
