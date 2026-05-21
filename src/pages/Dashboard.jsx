import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Upload, Camera, Play, CheckCircle2, ShieldCheck, Sparkles, X, Zap, HeartPulse, Brain, Activity, Droplets, ArrowRight, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const { runAIScanSimulation, setCurrentScan, scans, user } = useApp();

  // Dermatology AI scan state
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState({ label: '', progress: 0 });

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const startCamera = async () => {
    setCameraError('');
    setIsCameraActive(true);
    setImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please check permissions.');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImage(dataUrl);
      stopCamera();
    } else {
      // Simulate photo snapshot
      setImage('https://images.unsplash.com/photo-1606501170755-58210fe9f2a2?w=500&auto=format&fit=crop&q=80');
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleClear = () => {
    setImage(null);
    stopCamera();
  };

  const startAnalysis = async () => {
    if (!image) return;
    setScanning(true);
    try {
      const result = await runAIScanSimulation(image, (step) => {
        setScanStep(step);
      });
      setCurrentScan(result);
      navigate('/result');
    } catch (error) {
      console.error(error);
      setScanning(false);
    }
  };

  const features = [
    { label: 'Instant AI detection', icon: Zap },
    { label: 'Camera scan support', icon: Camera },
    { label: 'Severity analysis', icon: ArrowRight },
    { label: 'Treatment suggestions', icon: HeartPulse },
    { label: 'Secure & private', icon: ShieldCheck },
    { label: 'Dermatology AI assist', icon: Brain }
  ];

  const stats = [
    {
      label: 'AVG. HEART RATE',
      value: '72 bpm',
      trend: '↗ 2.1%',
      icon: HeartPulse,
      color: 'text-[#5AA7A7]',
      bgColor: 'bg-[#e2f3f0]'
    },
    {
      label: 'COMPLETED SCANS',
      value: (scans?.length || 0).toString(),
      trend: '↗ 1 new today',
      icon: FileText,
      color: 'text-[#BAC94A]',
      bgColor: 'bg-[#f7f8dc]'
    },
    {
      label: 'HYDRATION INDEX',
      value: '86%',
      trend: '↗ 1.4%',
      icon: Droplets,
      color: 'text-[#E2D36B]',
      bgColor: 'bg-[#f9f7dc]'
    },
    {
      label: 'AI RISK INDEX',
      value: 'Low',
      trend: 'Stable',
      icon: Brain,
      color: 'text-[#6C8CBF]',
      bgColor: 'bg-[#ebf3f9]'
    }
  ];

  const pipelineSteps = [
    { key: 'preprocess', label: 'Preprocessing image', threshold: 25 },
    { key: 'segment', label: 'Lesion segmentation', threshold: 50 },
    { key: 'classify', label: 'Pattern classification', threshold: 75 },
    { key: 'score', label: 'Severity scoring', threshold: 100 }
  ];

  return (
    <div className="space-y-6 text-left w-full pb-10">

      {/* Fullscreen AI Scan Loading Page Overlay */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#c4ece5] via-[#fcfad7] to-[#d8e5f2] p-6"
          >
            <div className="w-full max-w-md bg-[#faf9f6]/95 backdrop-blur-md rounded-[40px] p-8 md:p-10 border border-white/60 shadow-2xl text-center space-y-6">
              
              {/* Circular Brain Icon matching the screenshot */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* Pulsing ring */}
                  <div className="absolute inset-0 rounded-full border border-[#5AA7A7]/10 animate-ping"></div>
                  {/* Double outer ring */}
                  <div className="absolute inset-1.5 rounded-full border border-[#5AA7A7]/15"></div>
                  <div className="absolute inset-3 rounded-full border border-slate-100/80 shadow-inner"></div>
                  {/* Teal circle */}
                  <div className="absolute inset-4.5 rounded-full bg-[#86CDC1] flex items-center justify-center shadow-lg">
                    <Brain className="w-11 h-11 text-white fill-white/10" />
                  </div>
                </div>
              </div>

              {/* Header Text */}
              <div className="space-y-1.5">
                <h2 className="font-heading font-extrabold text-xl text-slate-800 tracking-tight">
                  Lumen AI is analyzing...
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Running multi-stage dermatology vision pipeline.
                </p>
              </div>

              {/* Progress Steps Checklist */}
              <div className="space-y-2.5 pt-2">
                {pipelineSteps.map((step, idx) => {
                  const isCompleted = scanStep.progress >= step.threshold;
                  const isCurrent = scanStep.progress >= (step.threshold - 25) && scanStep.progress < step.threshold;
                  return (
                    <div
                      key={step.key}
                      className={`flex items-center gap-3.5 px-5 py-3.5 rounded-[22px] border transition-all duration-300 text-left ${
                        isCompleted
                          ? 'bg-white border-slate-100 shadow-sm text-slate-800'
                          : isCurrent
                          ? 'bg-white border-[#5AA7A7]/40 shadow-sm text-slate-700 animate-pulse'
                          : 'bg-white/40 border-slate-100/50 text-slate-350'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isCompleted
                          ? 'bg-[#c6f0ea] border-[#5AA7A7]/30 text-[#5AA7A7]'
                          : 'bg-slate-100 border-slate-200 text-slate-300'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        )}
                      </div>
                      <span className="text-[11px] font-extrabold tracking-wide">
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* TOP CARD: Dermatology AI Scanner */}
      <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-white/50 shadow-sm relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-800/60 border border-white/60 dark:border-white/5 shadow-sm text-[11px] font-bold text-[#5AA7A7] dark:text-[#96D7C6]">
            <Sparkles className="w-3.5 h-3.5 fill-[#5AA7A7] dark:fill-[#96D7C6] text-transparent" />
            <span>Dermatology AI · Beta</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-[#111625] dark:text-white leading-[1.15] tracking-tight">
            AI-Powered <span className="text-[#357878] dark:text-[#96D7C6]">Skin Analysis</span> <br /> in Seconds.
          </h2>

          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Upload or capture a skin image and let advanced AI detect possible conditions, severity levels, and personalized treatment recommendations — instantly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-full bg-white/50 dark:bg-slate-800/40 border border-white/40 dark:border-slate-800/50 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-[#5AA7A7]/10 dark:bg-[#96D7C6]/10 text-[#5AA7A7] dark:text-[#96D7C6] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{feat.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <button
              onClick={triggerUpload}
              className="px-6 py-3 rounded-full text-xs font-extrabold text-white bg-[#52a2a2] hover:bg-[#458b8b] shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Upload image
            </button>
            <button
              onClick={startCamera}
              className="px-6 py-3 rounded-full text-xs font-extrabold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-slate-400" /> Open camera
            </button>
          </div>

          <div className="flex flex-wrap gap-5 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider pt-2">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#5AA7A7]" /> HIPAA aligned</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#5AA7A7]" /> Images never stored</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#5AA7A7]" /> Reviewed by clinicians</span>
          </div>
        </div>

        {/* Right Side: Scanner frame */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">
          <div className="w-full flex justify-start mb-2 pl-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-800/60 border border-white/60 dark:border-white/5 shadow-sm text-[10px] font-bold text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5AA7A7] animate-pulse"></span>
              <span>Model: Derma-Vision v3.2</span>
            </div>
          </div>

          <div className="w-full aspect-[4/3] rounded-[36px] p-2 bg-gradient-to-tr from-[#96D7C6] via-[#f7f5db] to-[#BAC94A] dark:from-[#203c38] dark:to-[#4a5818] shadow-lg relative">
            <div className="w-full h-full rounded-[28px] bg-white/95 dark:bg-[#16171d] relative flex flex-col justify-between p-4">
              <div className="flex-1 w-full relative flex items-center justify-center border border-dashed border-[#5AA7A7]/25 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
                
                <AnimatePresence mode="wait">
                  {scanning ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/95 dark:bg-[#16171d] p-6 flex flex-col justify-center items-center text-center space-y-4"
                    >
                      <div className="relative w-16 h-16 rounded-full bg-[#96D7C6]/20 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-[#5AA7A7]/20 animate-ping"></div>
                        <Brain className="w-8 h-8 text-[#5AA7A7] fill-[#5AA7A7]/20" />
                      </div>
                      <div>
                        <h4 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white">Analyzing skin condition</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5">{scanStep.label}...</p>
                      </div>
                      <div className="w-full max-w-[200px] h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] transition-all duration-300" style={{ width: `${scanStep.progress}%` }}></div>
                      </div>
                    </motion.div>
                  ) : isCameraActive ? (
                    <motion.div
                      key="camera"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full bg-black flex items-center justify-center"
                    >
                      {cameraError ? (
                        <div className="p-4 text-center space-y-3">
                          <p className="text-[10px] text-slate-300">{cameraError}</p>
                          <button
                            onClick={capturePhoto}
                            className="px-4 py-1.5 rounded-full bg-[#5AA7A7] text-white text-[10px] font-bold"
                          >
                            Trigger Demo Image
                          </button>
                        </div>
                      ) : (
                        <>
                          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                          <div className="absolute bottom-3 flex gap-2">
                            <button
                              onClick={capturePhoto}
                              className="px-4 py-1.5 rounded-full bg-[#5AA7A7] text-white text-[10px] font-extrabold flex items-center gap-1 hover:brightness-105 shadow-md cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5" /> Capture
                            </button>
                            <button
                              onClick={stopCamera}
                              className="px-3 py-1.5 rounded-full bg-slate-800 text-white text-[10px] font-bold cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ) : image ? (
                    <motion.div
                      key="image-preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full bg-slate-950 flex items-center justify-center"
                    >
                      <img src={image} alt="Dermoscopy upload preview" className="w-full h-full object-contain" />
                      <button
                        onClick={handleClear}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dropzone"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={triggerUpload}
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-center p-6"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#5AA7A7]/10 text-[#5AA7A7] flex items-center justify-center mb-2 shadow-inner">
                        <Upload className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-extrabold text-xs text-slate-800 dark:text-slate-100">
                        Drop your image here
                      </h4>
                      <p className="text-[9px] text-slate-400 mt-1 max-w-[200px] leading-normal">
                        PNG, JPG up to 10MB - or click to browse
                      </p>
                      <span className="mt-3 px-3 py-0.5 rounded-full bg-[#5AA7A7]/5 border border-[#5AA7A7]/20 text-[9px] font-bold text-[#5AA7A7] flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-[#5AA7A7] text-transparent animate-pulse" /> AI ready
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full flex items-center justify-between mt-3 border-t border-slate-100 dark:border-slate-800/80 pt-2.5 relative">
                <div className="flex gap-1.5">
                  <button
                    onClick={triggerUpload}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 text-[10px] font-bold transition-all cursor-pointer hover:bg-slate-200/50"
                  >
                    Upload
                  </button>
                  <button
                    onClick={startCamera}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 text-[10px] font-bold transition-all cursor-pointer hover:bg-slate-200/50"
                  >
                    Camera
                  </button>
                </div>

                <div className="relative">
                  <span className="absolute -top-3.5 -right-1 px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200/40 text-[7.5px] font-bold text-slate-500 shadow-sm z-20 whitespace-nowrap">
                    Avg. accuracy <span className="text-[#5AA7A7] font-black">94.2%</span>
                  </span>

                  <button
                    disabled={!image || scanning}
                    onClick={startAnalysis}
                    className="px-4 py-1.5 rounded-full text-[10px] font-extrabold text-white bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] hover:brightness-105 shadow-md flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white text-transparent" /> Analyze skin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BENTO ROW: Four stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-[32px] p-6 flex flex-col justify-between h-40 border border-white/50 shadow-sm text-left relative overflow-hidden"
            >
              {/* Card top row */}
              <div className="flex justify-between items-center w-full">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                
                {/* Trend pill */}
                <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 border border-slate-200/30 dark:border-slate-700 px-2.5 py-0.5 rounded-full shadow-sm font-sans flex items-center justify-center">
                  {stat.trend}
                </div>
              </div>

              {/* Card text content */}
              <div className="mt-4">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                  {stat.label}
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white mt-1.5 block leading-none">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
