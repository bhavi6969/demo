import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, SKIN_DISEASES } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Camera, X, Play, Brain, Check, Sparkles, ArrowRight, ArrowLeft,
  ShieldCheck, Droplet, Sun, Apple, Leaf, ShoppingBag, Star, Zap,
  ChevronRight, Heart, Wind, Flame, Coffee, Fish, Salad, Wheat
} from 'lucide-react';

// ─── Skin-type question data ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'skinType',
    label: 'What is your skin type?',
    options: [
      { value: 'oily', label: 'Oily', emoji: '💧' },
      { value: 'dry', label: 'Dry', emoji: '🌵' },
      { value: 'combination', label: 'Combination', emoji: '⚖️' },
      { value: 'normal', label: 'Normal', emoji: '✨' },
      { value: 'sensitive', label: 'Sensitive', emoji: '🌸' },
    ],
  },
  {
    id: 'primaryConcern',
    label: 'What is your primary skin concern?',
    options: [
      { value: 'acne', label: 'Acne / Breakouts', emoji: '🔴' },
      { value: 'aging', label: 'Aging / Wrinkles', emoji: '⏳' },
      { value: 'pigmentation', label: 'Dark spots / Pigmentation', emoji: '🌑' },
      { value: 'dryness', label: 'Dryness / Flaking', emoji: '❄️' },
      { value: 'redness', label: 'Redness / Irritation', emoji: '🌡️' },
    ],
  },
  {
    id: 'ageGroup',
    label: 'What is your age group?',
    options: [
      { value: 'teen', label: 'Under 20', emoji: '🧒' },
      { value: 'twenties', label: '20 – 30', emoji: '🧑' },
      { value: 'thirties', label: '30 – 40', emoji: '👩' },
      { value: 'forties', label: '40 – 50', emoji: '🧓' },
      { value: 'senior', label: '50+', emoji: '👴' },
    ],
  },
  {
    id: 'lifestyle',
    label: 'How would you describe your lifestyle?',
    options: [
      { value: 'active', label: 'Very active / Outdoors', emoji: '🏃' },
      { value: 'moderate', label: 'Moderately active', emoji: '🚶' },
      { value: 'sedentary', label: 'Mostly indoors / Sedentary', emoji: '🛋️' },
      { value: 'stressed', label: 'High stress / Busy', emoji: '😓' },
    ],
  },
];

// ─── Icon Map for resolving string keys to Lucide components ────────────────
const ICON_MAP = {
  Upload, Camera, X, Play, Brain, Check, Sparkles, ArrowRight, ArrowLeft,
  ShieldCheck, Droplet, Sun, Apple, Leaf, ShoppingBag, Star, Zap,
  ChevronRight, Heart, Wind, Flame, Coffee, Fish, Salad, Wheat
};

// ─── AI recommendation engine ────────────────────────────────────────────────
const generateRecommendations = (diseaseInfo, answers) => {
  const { skinType, primaryConcern, ageGroup, lifestyle } = answers;

  // ── Product recommendations ──────────────────────────────────────────────
  const products = [];

  // Cleanser
  const cleanserMap = {
    oily: { name: 'CeraVe Foaming Facial Cleanser', why: 'Removes excess oil without stripping the skin barrier.' },
    dry: { name: 'La Roche-Posay Toleriane Hydrating Cleanser', why: 'Cream-based formula that preserves moisture.' },
    combination: { name: 'Neutrogena Hydro Boost Gel Cleanser', why: 'Balances oily zones while hydrating dry patches.' },
    normal: { name: 'Cetaphil Gentle Skin Cleanser', why: 'Mild daily cleanser suitable for all skin types.' },
    sensitive: { name: 'Avène Extremely Gentle Cleanser', why: 'Fragrance-free, hypoallergenic formula for reactive skin.' },
  };
  products.push({ category: 'Cleanser', icon: 'Droplet', ...cleanserMap[skinType] || cleanserMap.normal });

  // Moisturiser
  const moistMap = {
    oily: { name: 'Neutrogena Hydro Boost Water Gel', why: 'Lightweight, oil-free hydration that won\'t clog pores.' },
    dry: { name: 'CeraVe Moisturizing Cream', why: 'Rich ceramide formula that repairs the skin barrier.' },
    combination: { name: 'Clinique Dramatically Different Moisturizing Gel', why: 'Balances hydration across mixed skin zones.' },
    normal: { name: 'Aveeno Daily Moisturizing Lotion', why: 'Gentle oat-based formula for everyday use.' },
    sensitive: { name: 'Vanicream Moisturizing Skin Cream', why: 'Free of dyes, fragrance, and common irritants.' },
  };
  products.push({ category: 'Moisturiser', icon: 'Heart', ...moistMap[skinType] || moistMap.normal });

  // SPF
  products.push({
    category: 'Sunscreen',
    icon: 'Sun',
    name: skinType === 'oily' ? 'EltaMD UV Clear SPF 46' : 'La Roche-Posay Anthelios Melt-in Milk SPF 100',
    why: 'Daily UV protection is essential for all skin conditions and prevents further damage.',
  });

  // Concern-specific serum
  const serumMap = {
    acne: { name: 'Paula\'s Choice 2% BHA Liquid Exfoliant', why: 'Salicylic acid unclogs pores and reduces breakouts.' },
    aging: { name: 'The Ordinary Retinol 0.5% in Squalane', why: 'Retinol stimulates collagen and reduces fine lines.' },
    pigmentation: { name: 'TruSkin Vitamin C Serum', why: 'Vitamin C brightens dark spots and evens skin tone.' },
    dryness: { name: 'The Inkey List Hyaluronic Acid Serum', why: 'Draws moisture into the skin for lasting hydration.' },
    redness: { name: 'Dr. Jart+ Cicapair Tiger Grass Serum', why: 'Centella asiatica calms redness and soothes irritation.' },
  };
  products.push({ category: 'Treatment Serum', icon: 'Sparkles', ...serumMap[primaryConcern] || serumMap.dryness });

  // ── Food & diet tips ─────────────────────────────────────────────────────
  const foodTips = [];

  // Universal skin-health foods
  foodTips.push({ icon: 'Fish', label: 'Omega-3 rich foods', tip: 'Salmon, sardines, walnuts — reduce inflammation and strengthen the skin barrier.' });
  foodTips.push({ icon: 'Leaf', label: 'Antioxidant vegetables', tip: 'Spinach, kale, broccoli — fight free radicals that accelerate skin ageing.' });
  foodTips.push({ icon: 'Apple', label: 'Vitamin C fruits', tip: 'Oranges, kiwi, strawberries — boost collagen synthesis and brighten skin tone.' });

  // Concern-specific food advice
  const concernFoodMap = {
    acne: { icon: 'Wheat', label: 'Reduce high-GI foods', tip: 'Cut back on white bread, sugary drinks, and processed snacks — they spike insulin and trigger breakouts.' },
    aging: { icon: 'Coffee', label: 'Green tea & polyphenols', tip: 'Green tea, dark chocolate, and berries protect against UV-induced skin ageing.' },
    pigmentation: { icon: 'Sun', label: 'Vitamin E sources', tip: 'Almonds, sunflower seeds, and avocado protect against oxidative stress that causes dark spots.' },
    dryness: { icon: 'Droplet', label: 'Hydrating foods', tip: 'Cucumber, watermelon, and celery have high water content to support skin hydration from within.' },
    redness: { icon: 'Flame', label: 'Anti-inflammatory diet', tip: 'Turmeric, ginger, and fatty fish reduce systemic inflammation that triggers skin redness.' },
  };
  foodTips.push(concernFoodMap[primaryConcern] || concernFoodMap.dryness);

  // Lifestyle-specific tip
  const lifestyleFoodMap = {
    active: { icon: 'Salad', label: 'Post-workout nutrition', tip: 'Replenish with protein and antioxidants after exercise to repair skin cells stressed by sweat and UV.' },
    stressed: { icon: 'Leaf', label: 'Adaptogenic herbs', tip: 'Ashwagandha and holy basil help regulate cortisol, which is a key driver of stress-related breakouts.' },
    sedentary: { icon: 'Apple', label: 'Boost circulation', tip: 'Beets, pomegranate, and dark leafy greens improve blood flow and deliver nutrients to skin cells.' },
    moderate: { icon: 'Fish', label: 'Balanced plate', tip: 'Aim for half your plate as vegetables, a quarter lean protein, and a quarter whole grains for optimal skin nutrition.' },
  };
  foodTips.push(lifestyleFoodMap[lifestyle] || lifestyleFoodMap.moderate);

  // ── Skincare routine ─────────────────────────────────────────────────────
  const routine = {
    morning: diseaseInfo?.skincare?.morning || 'Cleanse gently, apply vitamin C serum, moisturise, and finish with SPF 50+.',
    night: diseaseInfo?.skincare?.night || 'Double cleanse, apply treatment serum, and seal with a nourishing moisturiser.',
  };

  return { products, foodTips, routine };
};

// ─── Main component ──────────────────────────────────────────────────────────
export default function FullSkinAnalysis() {
  const navigate = useNavigate();
  const { runAIScanSimulation, setCurrentScan, latestAnalysis, saveSkinAnalysis } = useApp();

  // Step: 'upload' | 'scanning' | 'questions' | 'results'
  const [step, setStep] = useState('upload');
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [scanStep, setScanStep] = useState({ label: '', progress: 0 });
  const [scanResult, setScanResult] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [recommendations, setRecommendations] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => { return () => stopCamera(); }, []);

  // Load latest analysis if it exists on mount
  useEffect(() => {
    if (latestAnalysis) {
      setScanResult({
        scanId: latestAnalysis.scanId || "",
        diseaseId: latestAnalysis.diseaseId || "",
        diseaseName: latestAnalysis.diseaseName || "",
        confidence: latestAnalysis.confidence || "",
        severity: latestAnalysis.severity || "",
        imageUrl: latestAnalysis.imageUrl || "",
      });
      setAnswers(latestAnalysis.answers || {});
      setRecommendations(latestAnalysis.recommendations || null);
      setStep('results');
    }
  }, [latestAnalysis]);

  // ── Image helpers ──────────────────────────────────────────────────────────
  const loadImage = (file) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => { setImage(reader.result); stopCamera(); };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files.length > 0) loadImage(e.dataTransfer.files[0]);
  };

  const startCamera = async () => {
    setImage(null); setCameraError(''); setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch { setCameraError('Camera unavailable. Use demo capture.'); }
  };

  const capturePhoto = () => {
    if (streamRef.current && videoRef.current && canvasRef.current) {
      const v = videoRef.current, c = canvasRef.current;
      c.width = v.videoWidth || 640; c.height = v.videoHeight || 480;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      setImage(c.toDataURL('image/jpeg')); stopCamera();
    } else {
      setImage('https://images.unsplash.com/photo-1606501170755-58210fe9f2a2?w=500&auto=format&fit=crop&q=80');
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    setIsCameraActive(false);
  };

  // ── Analysis trigger ───────────────────────────────────────────────────────
  const startAnalysis = async () => {
    if (!image) return;
    setStep('scanning');
    try {
      const result = await runAIScanSimulation(image, (s) => setScanStep(s));
      setScanResult(result);
      setCurrentScan(result);
      setStep('questions');
    } catch { setStep('upload'); }
  };

  // ── Question navigation ────────────────────────────────────────────────────
  const handleAnswer = (qId, value) => {
    const updated = { ...answers, [qId]: value };
    setAnswers(updated);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const diseaseInfo = SKIN_DISEASES[scanResult?.diseaseId] || SKIN_DISEASES.eczema;
      const computedRecommendations = generateRecommendations(diseaseInfo, updated);
      setRecommendations(computedRecommendations);
      setStep('results');

      // Save analysis to the database
      saveSkinAnalysis({
        scanId: scanResult?.scanId || "",
        diseaseId: scanResult?.diseaseId || "",
        diseaseName: scanResult?.diseaseName || "",
        confidence: scanResult?.confidence || "",
        severity: scanResult?.severity || "",
        imageUrl: scanResult?.imageUrl || "",
        answers: updated,
        recommendations: computedRecommendations
      }).catch(err => console.error("Failed to save skin analysis:", err));
    }
  };

  const pipelineSteps = [
    { key: 'preprocess', label: 'Preprocessing image', threshold: 25 },
    { key: 'segment', label: 'Lesion segmentation', threshold: 50 },
    { key: 'classify', label: 'Pattern classification', threshold: 75 },
    { key: 'score', label: 'Severity scoring', threshold: 100 },
  ];

  return (
    <div className="space-y-6 text-left w-full pb-10">
      <canvas ref={canvasRef} className="hidden" />
      <input type="file" ref={fileInputRef} onChange={e => e.target.files[0] && loadImage(e.target.files[0])} accept="image/*" className="hidden" />

      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white/60 shadow-sm text-[11px] font-bold text-[#5AA7A7] mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-[#5AA7A7] text-transparent" />
            <span>AI-Powered · Full Skin Analysis</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">Full Skin Analysis</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Upload a skin image, answer a few questions, and get personalised product & food recommendations.</p>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2 shrink-0">
          {['upload', 'questions', 'results'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold border transition-all ${
                step === s ? 'bg-[#5AA7A7] text-white border-[#5AA7A7] shadow-md' :
                ['questions', 'results'].indexOf(step) > ['upload', 'questions', 'results'].indexOf(s)
                  ? 'bg-[#c6f0ea] text-[#5AA7A7] border-[#5AA7A7]/30'
                  : 'bg-white text-slate-400 border-slate-200'
              }`}>{i + 1}</div>
              {i < 2 && <div className="w-6 h-px bg-slate-200"></div>}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ══ STEP 1: Upload ══ */}
        {(step === 'upload' || step === 'scanning') && (
          <motion.div key="upload" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: drop zone */}
            <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-base text-slate-900">Step 1 — Upload your skin image</h2>
              <p className="text-xs text-slate-500">Take a clear, well-lit photo of the affected area. Avoid filters or heavy editing.</p>

              <div className={`w-full aspect-[4/3] rounded-[24px] border-2 border-dashed transition-all overflow-hidden relative flex items-center justify-center ${isDragging ? 'border-[#5AA7A7] bg-[#5AA7A7]/5' : 'border-slate-200 bg-slate-50/50'}`}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}>

                <AnimatePresence mode="wait">
                  {step === 'scanning' ? (
                    <motion.div key="scan-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-4 p-6">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-[#5AA7A7]/20 animate-ping"></div>
                        <div className="w-14 h-14 rounded-full bg-[#c6f0ea]/40 flex items-center justify-center">
                          <Brain className="w-7 h-7 text-[#5AA7A7]" />
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-xs font-extrabold text-slate-800">Analysing skin condition…</p>
                        <p className="text-[10px] text-slate-400">{scanStep.label}</p>
                      </div>
                      <div className="w-full max-w-[200px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] transition-all duration-300" style={{ width: `${scanStep.progress}%` }}></div>
                      </div>
                      <div className="space-y-1.5 w-full max-w-xs">
                        {pipelineSteps.map(ps => {
                          const done = scanStep.progress >= ps.threshold;
                          return (
                            <div key={ps.key} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${done ? 'bg-[#c6f0ea]/30 text-[#5AA7A7]' : 'text-slate-400'}`}>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-[#5AA7A7] text-white' : 'bg-slate-100'}`}>
                                {done ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <div className="w-1 h-1 rounded-full bg-slate-300"></div>}
                              </div>
                              {ps.label}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : isCameraActive ? (
                    <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black flex items-center justify-center">
                      {cameraError ? (
                        <div className="text-center space-y-3 p-4">
                          <p className="text-[10px] text-slate-300">{cameraError}</p>
                          <button onClick={capturePhoto} className="px-4 py-1.5 rounded-full bg-[#5AA7A7] text-white text-[10px] font-bold">Demo Capture</button>
                        </div>
                      ) : (
                        <>
                          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                          <div className="absolute bottom-3 flex gap-2">
                            <button onClick={capturePhoto} className="px-4 py-1.5 rounded-full bg-[#5AA7A7] text-white text-[10px] font-extrabold flex items-center gap-1 cursor-pointer">
                              <Camera className="w-3.5 h-3.5" /> Capture
                            </button>
                            <button onClick={stopCamera} className="px-3 py-1.5 rounded-full bg-slate-800 text-white text-[10px] font-bold cursor-pointer">Cancel</button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ) : image ? (
                    <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950 flex items-center justify-center">
                      <img src={image} alt="Skin scan preview" className="w-full h-full object-contain" />
                      <button onClick={() => setImage(null)} className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="dropzone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => fileInputRef.current.click()}
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer gap-3 p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#5AA7A7]/10 text-[#5AA7A7] flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-slate-800">Drop your image here</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 10 MB — or click to browse</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => fileInputRef.current.click()} className="flex-1 py-2.5 rounded-full text-xs font-extrabold text-slate-700 bg-white border border-slate-200/50 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                  <Upload className="w-3.5 h-3.5 text-slate-400" /> Upload
                </button>
                <button onClick={startCamera} className="flex-1 py-2.5 rounded-full text-xs font-extrabold text-slate-700 bg-white border border-slate-200/50 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                  <Camera className="w-3.5 h-3.5 text-slate-400" /> Camera
                </button>
                <button disabled={!image || step === 'scanning'} onClick={startAnalysis}
                  className="flex-1 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all">
                  <Play className="w-3.5 h-3.5 fill-white text-transparent" /> Analyse
                </button>
              </div>
            </div>

            {/* Right: what to expect */}
            <div className="space-y-4">
              <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm space-y-4">
                <h3 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#5AA7A7]" /> What you'll get
                </h3>
                {[
                  { icon: Brain, label: 'AI skin condition detection', desc: 'Our model analyses 22 skin conditions with up to 94% accuracy.' },
                  { icon: ShoppingBag, label: 'Personalised product picks', desc: 'Cleanser, moisturiser, SPF, and treatment serum matched to your skin.' },
                  { icon: Apple, label: 'Food & diet tips', desc: 'Nutrition advice tailored to your skin condition and lifestyle.' },
                  { icon: Sparkles, label: 'Custom skincare routine', desc: 'Morning and night routine steps based on your diagnosis.' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/50 border border-white/40">
                      <div className="w-8 h-8 rounded-full bg-[#5AA7A7]/10 text-[#5AA7A7] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-extrabold text-slate-800">{item.label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-50/60 border border-amber-200/50 text-[10px] text-amber-700 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-500" />
                This analysis is informational only. Always consult a licensed dermatologist for medical decisions.
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ STEP 2: Questions ══ */}
        {step === 'questions' && (
          <motion.div key="questions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-6">

            {/* Scan result mini-card */}
            {scanResult && (
              <div className="glass-panel rounded-[24px] p-4 border border-white/50 shadow-sm flex items-center gap-4">
                <img src={scanResult.imageUrl} alt="scan" className="w-14 h-14 rounded-xl object-cover border border-slate-200/50 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Detected</p>
                  <p className="font-heading font-extrabold text-sm text-slate-900">{scanResult.diseaseName}</p>
                  <p className="text-[10px] text-[#5AA7A7] font-bold">{scanResult.confidence} confidence · {scanResult.severity}</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c6f0ea]/40 text-[#5AA7A7] text-[9px] font-extrabold border border-[#5AA7A7]/20">
                    <Check className="w-3 h-3 stroke-[3]" /> Scan complete
                  </span>
                </div>
              </div>
            )}

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                className="glass-panel rounded-[32px] p-8 border border-white/50 shadow-sm space-y-6">

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question {currentQ + 1} of {QUESTIONS.length}</span>
                  <div className="flex gap-1">
                    {QUESTIONS.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all ${i <= currentQ ? 'bg-[#5AA7A7] w-6' : 'bg-slate-200 w-3'}`}></div>
                    ))}
                  </div>
                </div>

                <h2 className="font-heading font-extrabold text-xl text-slate-900">{QUESTIONS[currentQ].label}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUESTIONS[currentQ].options.map(opt => (
                    <button key={opt.value} onClick={() => handleAnswer(QUESTIONS[currentQ].id, opt.value)}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 border border-slate-200/50 hover:border-[#5AA7A7]/50 hover:bg-[#c6f0ea]/20 transition-all text-left cursor-pointer group shadow-sm">
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="text-xs font-extrabold text-slate-800 group-hover:text-[#5AA7A7] transition-colors">{opt.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#5AA7A7] ml-auto transition-colors" />
                    </button>
                  ))}
                </div>

                {currentQ > 0 && (
                  <button onClick={() => setCurrentQ(currentQ - 1)} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ══ STEP 3: Results ══ */}
        {step === 'results' && recommendations && (
          <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="space-y-6">

            {/* Hero summary */}
            <div className="glass-panel rounded-[32px] p-5 md:p-6 border border-white/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              {scanResult && (
                <img src={scanResult.imageUrl} alt="scan" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-slate-200/50 shrink-0" />
              )}
              <div className="flex-1 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c6f0ea]/40 text-[#5AA7A7] text-[10px] font-extrabold border border-[#5AA7A7]/20 mb-2">
                  <Sparkles className="w-3 h-3 fill-[#5AA7A7] text-transparent" /> Full Analysis Complete
                </div>
                <h2 className="font-heading font-extrabold text-lg md:text-xl text-slate-900">{scanResult?.diseaseName || 'Skin Analysis'}</h2>
                <p className="text-xs text-slate-500 mt-1">Based on your scan and answers, here are your personalised recommendations.</p>
              </div>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
                <button onClick={() => { setStep('upload'); setImage(null); setAnswers({}); setCurrentQ(0); setScanResult(null); setRecommendations(null); }}
                  className="flex-1 sm:flex-initial px-3 md:px-4 py-2.5 rounded-full text-xs font-extrabold text-slate-700 bg-white border border-slate-200/50 hover:bg-slate-50 cursor-pointer shadow-sm transition-all flex items-center justify-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> New
                </button>
                <button onClick={() => navigate('/result')}
                  className="flex-1 sm:flex-initial px-3 md:px-4 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] cursor-pointer shadow-sm transition-all flex items-center justify-center gap-1.5">
                  Full Report <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Skincare Routine */}
            <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm space-y-4">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5AA7A7]" /> Your Personalised Skincare Routine
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-amber-50/60 border border-amber-200/40 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <Sun className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">Morning Routine</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">{recommendations.routine.morning}</p>
                </div>
                <div className="p-4 rounded-3xl bg-indigo-50/60 border border-indigo-200/40 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <Droplet className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">Night Routine</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">{recommendations.routine.night}</p>
                </div>
              </div>
            </div>

            {/* Product Recommendations */}
            <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm space-y-4">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#5AA7A7]" /> Recommended Products
                <span className="ml-auto text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50 uppercase tracking-widest">AI Curated</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendations.products.map((prod, i) => {
                  const Icon = typeof prod.icon === 'string' ? (ICON_MAP[prod.icon] || Sparkles) : (prod.icon || Sparkles);
                  return (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-slate-100 shadow-sm">
                      <div className="w-9 h-9 rounded-full bg-[#5AA7A7]/10 text-[#5AA7A7] flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-[#5AA7A7] uppercase tracking-wider block">{prod.category}</span>
                        <p className="text-[11px] font-extrabold text-slate-900 leading-tight mt-0.5">{prod.name}</p>
                        <p className="text-[9px] text-slate-500 mt-1 leading-snug">{prod.why}</p>
                      </div>
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Food & Diet Tips */}
            <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm space-y-4">
              <h3 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Apple className="w-4 h-4 text-[#5AA7A7]" /> Food & Diet Tips for Your Skin
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">                {recommendations.foodTips.map((tip, i) => {
                  const Icon = typeof tip.icon === 'string' ? (ICON_MAP[tip.icon] || Sparkles) : (tip.icon || Sparkles);
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-white/60 border border-slate-100 shadow-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-extrabold text-slate-900">{tip.label}</span>
                      </div>
                      <p className="text-[9px] text-slate-500 leading-relaxed">{tip.tip}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-[9px] font-semibold text-slate-400 uppercase tracking-wide pt-2 border-t border-slate-200/50">
              AI recommendations are informational only. Consult a licensed dermatologist before starting any new skincare regimen.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
