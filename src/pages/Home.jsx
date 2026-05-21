import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowRight, Upload, Camera, Play, CheckCircle2, ShieldCheck, Sparkles, X, Zap, HeartPulse, Brain, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const { runAIScanSimulation, setCurrentScan } = useApp();

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

  // Drag and Drop
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      loadImage(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      loadImage(files[0]);
    }
  };

  const loadImage = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  // Camera handling
  const startCamera = async () => {
    setImage(null);
    setCameraError('');
    setIsCameraActive(true);
    try {
      const constraints = { video: { width: 640, height: 480, facingMode: 'user' } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Unable to access camera device. Running simulated lens capture.');
    }
  };

  const capturePhoto = () => {
    if (streamRef.current && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
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

      {/* CARD 1: Calmer way to understand skin health */}
      <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-white/50 shadow-sm relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
        {/* Decorative subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c6f0ea]/20 rounded-full blur-3xl -z-10 animate-float-slow"></div>

        {/* Left Side Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sparkles Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white/60 shadow-sm text-[11px] font-bold text-[#5AA7A7]">
            <Sparkles className="w-3.5 h-3.5 fill-[#5AA7A7] text-transparent" />
            <span>New · Skin Pathology AI 2.0</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-[#111625] leading-[1.15] tracking-tight">
            Understand your <br />
            <span className="text-[#357878]">skin health</span>, clearly.
          </h1>

          {/* Subtext */}
          <p className="text-xs md:text-sm text-slate-500 max-w-xl leading-relaxed">
            Lumen unifies skin image uploads, AI disease predictions, severity analysis, and vital tracking into one secure patient dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-1">
            <button
              onClick={() => navigate('/detect')}
              className="px-6 py-3 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              View past reports <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={triggerUpload}
              className="px-6 py-3 rounded-full text-xs font-extrabold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/50 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-slate-400" /> Start skin scan
            </button>
          </div>

          {/* Compliance Tags */}
          <div className="flex items-center gap-5 pt-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#5AA7A7]" /> HIPAA Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#5AA7A7]" /> End-to-end encrypted
            </span>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative w-80 h-80 sm:w-[380px] sm:h-[320px] flex items-center justify-center select-none">
            
            {/* HRV Trend Badge */}
            <div className="absolute top-8 left-4 bg-white/95 dark:bg-slate-800 border border-slate-200/40 shadow-sm rounded-full px-3 py-1 flex flex-col items-start gap-0.5 z-30 text-left">
              <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider leading-none">HRV trend</span>
              <span className="text-[11px] font-black text-[#5AA7A7] mt-0.5 leading-none">+8.4%</span>
            </div>

            {/* Predictions Badge */}
            <div className="absolute bottom-6 right-2 bg-[#5AA7A7]/95 text-white backdrop-blur-md shadow-sm rounded-[20px] p-3 py-2 flex flex-col items-start gap-0.5 z-30 text-left w-28 border border-[#c6f0ea]/20">
              <span className="text-[7.5px] font-bold text-white/70 uppercase tracking-wider leading-none">Predictions today</span>
              <span className="text-lg font-black mt-0.5 leading-none">128</span>
            </div>

            {/* Clay Shape 1: Teal dish plate background */}
            <div className="absolute w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#8edbc8] to-[#3a908e] opacity-90"
                 style={{
                   boxShadow: 'inset -15px -15px 35px rgba(0, 0, 0, 0.2), inset 15px 15px 35px rgba(255, 255, 255, 0.6), 0 25px 50px rgba(58, 144, 142, 0.25)',
                   transform: 'rotate(-5deg)'
                 }}></div>

            {/* Clay Shape 2: Yellow Bean Capsule */}
            <motion.div
              animate={{ y: [0, 6, 0], rotate: [-12, -15, -12] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[180px] h-[85px] rounded-[45px] bg-gradient-to-br from-[#faf8cb] via-[#E2D36B] to-[#b8c642] left-8 bottom-6 z-20 origin-center"
              style={{
                boxShadow: 'inset -8px -8px 20px rgba(0, 0, 0, 0.15), inset 8px 8px 20px rgba(255, 255, 255, 0.7), 0 15px 30px rgba(226, 211, 107, 0.25)',
              }}
            ></motion.div>

            {/* Clay Shape 3: Soft Green Sphere */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#bdfae9] to-[#5AA7A7] right-14 top-14 z-20 shadow-lg"
              style={{
                boxShadow: 'inset -10px -10px 25px rgba(0, 0, 0, 0.15), inset 10px 10px 25px rgba(255, 255, 255, 0.8), 0 20px 40px rgba(90, 167, 167, 0.25)'
              }}
            ></motion.div>

            {/* Clay Shape 4: Lime Green Orb (Top Right) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[#fbfcde] to-[#e4e768] right-8 top-6 z-10 shadow-md"
              style={{
                boxShadow: 'inset -6px -6px 15px rgba(0, 0, 0, 0.12), inset 6px 6px 15px rgba(255, 255, 255, 0.8), 0 10px 20px rgba(186, 201, 74, 0.18)'
              }}
            ></motion.div>

            {/* Small Floating Details */}
            <div className="absolute w-5 h-5 rounded-full bg-[#BAC94A] left-10 top-16 z-20 shadow-md"
                 style={{ boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.15), inset 2px 2px 6px rgba(255,255,255,0.7)' }}></div>
            
            <div className="absolute w-4 h-4 rounded-full bg-[#96D7C6] left-32 bottom-2 z-20 shadow-md animate-ping"
                 style={{ boxShadow: 'inset -1px -1px 4px rgba(0,0,0,0.1), inset 1px 1px 4px rgba(255,255,255,0.7)' }}></div>

          </div>
        </div>
      </div>

      {/* CARD 2: AI-Powered Skin Analysis in Seconds (Interactive Scanner) */}
      <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-white/50 shadow-sm relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-800/60 border border-white/60 dark:border-white/5 shadow-sm text-[11px] font-bold text-[#5AA7A7] dark:text-[#96D7C6]">
            <Sparkles className="w-3.5 h-3.5 fill-[#5AA7A7] dark:fill-[#96D7C6] text-transparent" />
            <span>Dermatology AI · Beta</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-[#111625] dark:text-white leading-[1.15] tracking-tight">
            AI-Powered <span className="text-[#357878] dark:text-[#96D7C6]">Skin Analysis</span> <br /> in Seconds.
          </h2>

          {/* Subtext */}
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Upload or capture a skin image and let advanced AI detect possible conditions, severity levels, and personalized treatment recommendations — instantly.
          </p>

          {/* Features Grid */}
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

          {/* Action Row */}
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

          {/* Compliance Labels */}
          <div className="flex flex-wrap gap-5 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider pt-2">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#5AA7A7]" /> HIPAA aligned</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#5AA7A7]" /> Images never stored</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#5AA7A7]" /> Reviewed by clinicians</span>
          </div>

        </div>

        {/* Right Side: Dashed Scan/Camera Frame */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">
          
          {/* Model indicator */}
          <div className="w-full flex justify-start mb-2 pl-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-800/60 border border-white/60 dark:border-white/5 shadow-sm text-[10px] font-bold text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5AA7A7] animate-pulse"></span>
              <span>Model: Derma-Vision v3.2</span>
            </div>
          </div>

          {/* Scanner frame */}
          <div className="w-full aspect-[4/3] rounded-[36px] p-2 bg-gradient-to-tr from-[#96D7C6] via-[#f7f5db] to-[#BAC94A] dark:from-[#203c38] dark:to-[#4a5818] shadow-lg relative">
            <div className="w-full h-full rounded-[28px] bg-white/95 dark:bg-[#16171d] relative flex flex-col justify-between p-4">
              
              {/* Scan box viewport */}
              <div className="flex-1 w-full relative flex items-center justify-center border border-dashed border-[#5AA7A7]/25 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
                
                <AnimatePresence mode="wait">
                  {scanning ? (
                    /* Scanning overlay step tracker */
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
                    /* Default Dropzone */
                    <motion.div
                      key="dropzone"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={triggerUpload}
                      className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-center p-6 transition-all duration-300 ${
                        isDragging ? 'bg-[#5AA7A7]/5' : ''
                      }`}
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

              {/* Bottom Actions Row inside layout */}
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

    </div>
  );
}
