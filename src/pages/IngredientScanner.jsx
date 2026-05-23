import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertTriangle, Info, Trash2, Camera, Upload, X, Check, RefreshCw, Sparkles, BookOpen, AlertCircle, History, CheckCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INGREDIENT_DICTIONARY = {
  eczema: {
    beneficial: {
      'ceramides': 'Helps repair and strengthen the skin barrier to lock in moisture.',
      'ceramide': 'Helps repair and strengthen the skin barrier to lock in moisture.',
      'colloidal oatmeal': 'Clinically proven to soothe itching, reduce redness, and calm irritation.',
      'oat': 'Soothes inflammation, redness, and itching.',
      'oatmeal': 'Soothes inflammation, redness, and itching.',
      'hyaluronic acid': 'Draws moisture deep into the skin without clogging pores or irritating.',
      'glycerin': 'A powerful humectant that pulls moisture into the skin barrier.',
      'shea butter': 'Provides rich emollient lipids that nourish dry, eczema-prone skin.',
      'centella asiatica': 'Calms irritation and speeds up skin barrier healing.',
      'cica': 'Calms irritation and speeds up skin barrier healing.',
      'panthenol': 'Pro-vitamin B5 that acts as a humectant and skin protectant to reduce itching.',
      'niacinamide': 'Helps improve barrier function and increases natural ceramide levels.',
      'squalane': 'Mimics skin’s natural oils to moisturize without clogging or irritation.',
      'aloe vera': 'Soothes irritation and cools inflamed, dry skin.',
      'allantoin': 'Calms inflammation and stimulates healthy tissue growth.'
    },
    contraindicated: {
      'fragrance': 'Highly sensitizing; common trigger for contact dermatitis and eczema flare-ups.',
      'parfum': 'Highly sensitizing; common trigger for contact dermatitis and eczema flare-ups.',
      'alcohol denat': 'Drying alcohol that strips the skin barrier and causes severe irritation.',
      'denatured alcohol': 'Drying alcohol that strips the skin barrier and causes severe irritation.',
      'ethanol': 'Strips moisture and degrades the outer skin barrier.',
      'isopropyl alcohol': 'Extremely drying and irritating for compromised eczema barriers.',
      'salicylic acid': 'An exfoliating BHA that can dry out and severely irritate eczema lesions.',
      'glycolic acid': 'An AHA that can cause burning, peeling, and redness on compromised skin.',
      'retinol': 'Accelerates skin cell turnover, causing scaling and peeling that worsens eczema.',
      'retinoid': 'Highly irritating and drying for active eczema-prone skin.',
      'benzoyl peroxide': 'Extremely drying and peeling agent that destroys eczema barrier.',
      'sodium lauryl sulfate': 'Harsh foaming surfactant (SLS) that strips natural lipids and causes eczema flare-ups.',
      'sls': 'Harsh surfactant that destroys skin lipid barriers.',
      'linalool': 'Fragrance allergen linked to contact dermatitis in eczema patients.',
      'limonene': 'Common fragrance allergen that triggers eczema inflammation.',
      'witch hazel': 'Often distilled with alcohol, acts as an astringent which dries out eczema.'
    }
  },
  acne: {
    beneficial: {
      'salicylic acid': 'An oil-soluble BHA that penetrates deep into pores to dissolve sebum and unclog debris.',
      'benzoyl peroxide': 'Kills acne-causing bacteria (C. acnes) and helps clear active breakouts.',
      'niacinamide': 'Regulates sebum production, minimizes pore appearance, and calms acne redness.',
      'zinc pca': 'Controls sebum secretion and acts as an anti-inflammatory agent.',
      'tea tree oil': 'Natural antibacterial and anti-inflammatory properties that target blemishes.',
      'centella asiatica': 'Calms inflamed acne cysts and prevents post-inflammatory hyperpigmentation.',
      'cica': 'Calms inflamed acne cysts and prevents post-inflammatory hyperpigmentation.',
      'retinol': 'Promotes cellular turnover to prevent pores from becoming clogged.',
      'sulfur': 'Absorbs excess oil and dries out active whiteheads and blemishes.',
      'clay': 'Absorbs sebum and draws out pore impurities.',
      'kaolin': 'Absorbs sebum and draws out pore impurities.',
      'bentonite': 'Absorbs sebum and draws out pore impurities.',
      'lactic acid': 'Gentle AHA that exfoliates surface skin to clear acne scars and prevent plug formation.',
      'azelaic acid': 'Reduces acne-causing bacteria and fades post-acne dark marks (PIH).'
    },
    contraindicated: {
      'isopropyl myristate': 'Highly comedogenic ester that directly clogs pores and triggers acne breakouts.',
      'coconut oil': 'Highly comedogenic natural lipid that forms an occlusive barrier, trapping sebum.',
      'cocos nucifera': 'Highly comedogenic natural lipid that forms an occlusive barrier, trapping sebum.',
      'shea butter': 'Heavy emollient that can clog pores on oily or acne-prone skin types.',
      'sodium lauryl sulfate': 'Irritating surfactant that can disrupt sebum balance, leading to rebound breakouts.',
      'sls': 'Can disrupt skin barrier and lead to rebound sebum overproduction.',
      'wheat germ oil': 'Extremely comedogenic oil that is highly likely to cause breakouts.',
      'palm oil': 'High content of comedogenic fatty acids that clog pores.',
      'acetylated lanolin': 'Highly comedogenic ingredient that triggers blackheads and whiteheads.',
      'myristyl myristate': 'Highly comedogenic ester that causes pore clogging.'
    }
  },
  rosacea: {
    beneficial: {
      'niacinamide': 'Strengthens skin barrier and calms redness/flushing associated with rosacea.',
      'centella asiatica': 'Vascular protectant and anti-inflammatory that calms burning and redness.',
      'cica': 'Vascular protectant and anti-inflammatory that calms burning and redness.',
      'green tea': 'Rich in polyphenols (EGCG) which soothe redness and protect blood vessels.',
      'camellia sinensis': 'Rich in polyphenols (EGCG) which soothe redness and protect blood vessels.',
      'panthenol': 'Humectant that calms hot, irritated, and flushing skin.',
      'allantoin': 'Gently hydrates and reduces flushing or burning sensations.',
      'azelaic acid': 'First-line prescription ingredient that reduces inflammatory bumps and rosacea redness.',
      'ceramides': 'Restores skin barrier to protect against external flushing triggers.',
      'ceramide': 'Restores skin barrier to protect against external flushing triggers.',
      'licorice root': 'Contains licochalcone, a powerful anti-inflammatory that calms redness.',
      'glycyrrhiza glabra': 'Contains licochalcone, a powerful anti-inflammatory that calms redness.'
    },
    contraindicated: {
      'alcohol denat': 'Drying alcohol that dilates blood vessels, causing severe flushing and irritation.',
      'denatured alcohol': 'Drying alcohol that dilates blood vessels, causing severe flushing and irritation.',
      'fragrance': 'Common trigger for flushing, stinging, and burning in rosacea patients.',
      'parfum': 'Common trigger for flushing, stinging, and burning in rosacea patients.',
      'witch hazel': 'Astringent that strips skin lipids and causes immediate stinging/flushing.',
      'hamamelis virginiana': 'Astringent that strips skin lipids and causes immediate stinging/flushing.',
      'menthol': 'Triggers sensory nerves, causing severe burning, stinging, and vasodilation.',
      'peppermint oil': 'Contains menthol, a strong trigger for rosacea flushing.',
      'eucalyptus oil': 'Aromatic oil that triggers redness and sensory irritation.',
      'glycolic acid': 'Strong AHA that breaks down the skin barrier, triggering rosacea flares.',
      'salicylic acid': 'Exfoliating acid that is often too harsh and causes burning/redness on rosacea skin.',
      'benzoyl peroxide': 'Highly oxidative agent that triggers severe inflammation and burning.',
      'retinol': 'Can cause significant peeling, dryness, and worsening of redness.',
      'linalool': 'Fragrance molecule known to trigger hypersensitive rosacea skin.',
      'limonene': 'Sensitizing fragrance terpene that triggers rosacea flares.'
    }
  },
  psoriasis: {
    beneficial: {
      'salicylic acid': 'Low percentages help soften and lift thick psoriasis scales so topicals penetrate.',
      'coal tar': 'Slows the rapid growth of skin cells and reduces inflammation, scaling, and itching.',
      'shea butter': 'Provides intense moisture to lock in hydration on dry, scaly psoriasis plaques.',
      'ceramides': 'Helps repair and protect the compromised lipid barrier of psoriatic skin.',
      'ceramide': 'Helps repair and protect the compromised lipid barrier of psoriatic skin.',
      'aloe vera': 'Soothes inflammation, itching, and redness on active plaques.',
      'glycerin': 'Humectant that draws water into parched, scaly plaques to prevent cracking.',
      'urea': 'Keratolytic agent that softens thick plaques and promotes gentle descaling.',
      'centella asiatica': 'Calms plaque irritation and promotes tissue recovery.'
    },
    contraindicated: {
      'alcohol denat': 'Extremely drying agent that causes plaques to crack, bleed, and itch.',
      'denatured alcohol': 'Extremely drying agent that causes plaques to crack, bleed, and itch.',
      'fragrance': 'Triggers contact allergies and inflammation on already inflamed plaques.',
      'parfum': 'Triggers contact allergies and inflammation on already inflamed plaques.',
      'sodium lauryl sulfate': 'Strips skin barrier lipids, increasing plaque irritation and itching.',
      'sls': 'Strips skin barrier lipids, increasing plaque irritation and itching.',
      'retinol': 'Can cause severe skin irritation, leading to Koebnerization (new psoriasis patches at sites of irritation).',
      'benzoyl peroxide': 'Drying and oxidizing agent that is too harsh for dry psoriatic lesions.',
      'glycolic acid': 'High concentration AHAs can burn and cause new plaques to form via Koebner phenomenon.'
    }
  }
};

const SAMPLE_PRODUCTS = [
  {
    name: 'CeraVe Moisturizing Cream',
    ingredients: 'Water, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Cetyl Alcohol, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Dimethicone, Ceteareth-20, Behentrimonium Methosulfate, Cholesterol, Phenoxyethanol, Disodium EDTA, Xanthan Gum, Phytosphingosine, Ethylhexylglycerin',
    selectedCondition: 'eczema'
  },
  {
    name: 'The Ordinary Glycolic Acid 7% Toning Solution',
    ingredients: 'Water, Aloe Barbadensis Leaf Water, Glycolic Acid, Panax Ginseng Root Extract, Tasmannia Lanceolata Fruit Extract, Rosa Damascena Flower Water, Glycerin, Salicylic Acid, Urea, Hexylene Glycol, Glucose, Fructose, Sucrose, Alanine, Glutamic Acid, Aspartic Acid, Hexyl Nicotinate, Potassium Sorbate, Sodium Benzoate',
    selectedCondition: 'rosacea'
  },
  {
    name: 'Neutrogena Acne Eliminating Cleanser',
    ingredients: 'Water, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Salicylic Acid, PEG-120 Methyl Glucose Dioleate, Disodium EDTA, Sodium Chloride, Fragrance, Red 40, Yellow 5, Benzoyl Peroxide, Coco-Glucoside, Glyceryl Oleate',
    selectedCondition: 'acne'
  },
  {
    name: 'Soothing Oats & Centella Balm',
    ingredients: 'Water, Colloidal Oatmeal, Centella Asiatica Extract, Cica, Panthenol, Glycerin, Shea Butter, Squalane, Aloe Vera Bark Juice, Allantoin, Hyaluronic Acid, Cetearyl Olivate, Sorbitan Olivate, 1,2-Hexanediol, Caprylyl Glycol',
    selectedCondition: 'eczema'
  }
];

export default function IngredientScanner() {
  const { addNotification } = useApp();
  const [ingredientsText, setIngredientsText] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('acne');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState('');
  const [ocrImage, setOcrImage] = useState(null);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('derma_scanner_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveToHistory = (productName, condition, score, results) => {
    const newEntry = {
      id: Date.now().toString(),
      name: productName || `Unnamed Scan #${history.length + 1}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      condition,
      score,
      resultsSummary: {
        beneficialCount: results.beneficial.length,
        contraindicatedCount: results.contraindicated.length,
        neutralCount: results.neutral.length
      }
    };
    const updated = [newEntry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('derma_scanner_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('derma_scanner_history');
    addNotification('Safety scanner history cleared.');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageOCR(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageOCR(e.target.files[0]);
    }
  };

  const handleImageOCR = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image of a product ingredient label.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setOcrImage(event.target.result);
      simulateOCR();
    };
    reader.readAsDataURL(file);
  };

  const simulateOCR = () => {
    setOcrScanning(true);
    // Determine a random set of ingredients based on typical cosmetic products
    const sampleIngredientTexts = [
      'Water, Disodium Laureth Sulfosuccinate, Glycerin, Sodium Lauroyl Methyl Isethionate, Salicylic Acid, Fragrance, Linalool, Retinol, Sodium Benzoate, Citric Acid, Xanthan Gum, Centella Asiatica Extract',
      'Water, Glycerin, Cocos Nucifera Oil, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Cholesterol, Phytosphingosine, Shea Butter, Phenoxyethanol, Xanthan Gum',
      'Alcohol Denat, Witch Hazel Extract, Glycolic Acid, Aqua, Fragrance, Menthol, Salicylic Acid, Isopropyl Alcohol, Lactic Acid, Limonene, Parfum',
      'Aqua, Colloidal Oatmeal, Centella Asiatica Leaf Extract, Cica, Glycerin, Shea Butter, Panthenol, Hyaluronic Acid, Niacinamide, Squalane, Allantoin'
    ];
    
    let currentStep = 0;
    const steps = [
      'Analyzing image clarity...',
      'Isolating text blocks...',
      'Performing optical character recognition...',
      'Extracting chemical names...',
      'Normalizing ingredient list...'
    ];

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setScanStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setOcrScanning(false);
        const randomIngredients = sampleIngredientTexts[Math.floor(Math.random() * sampleIngredientTexts.length)];
        setIngredientsText(randomIngredients);
        addNotification('Simulated OCR extraction complete.');
      }
    }, 600);
  };

  const handleLoadSample = (sample) => {
    setIngredientsText(sample.ingredients);
    setSelectedCondition(sample.selectedCondition);
    setScanResult(null);
  };

  const handleScan = () => {
    if (!ingredientsText.trim()) {
      alert('Please enter or scan a list of ingredients.');
      return;
    }

    setScanning(true);
    setScanProgress(0);

    const steps = [
      'Tokenizing ingredient list...',
      'Cross-referencing database...',
      'Detecting triggers and contraindications...',
      'Identifying soothing/beneficial compounds...',
      'Calculating final skin compatibility score...'
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      setScanStep(steps[progress / 20 - 1]);

      if (progress >= 100) {
        clearInterval(interval);
        executeAnalysis();
      }
    }, 300);
  };

  const executeAnalysis = () => {
    // Basic comma separation, trim, lowercase
    const items = ingredientsText
      .split(/,/)
      .map(item => item.replace(/[.*+?^${}()|[\]\\]/g, '').trim().toLowerCase())
      .filter(item => item.length > 1);

    const dictionary = INGREDIENT_DICTIONARY[selectedCondition];
    
    const beneficial = [];
    const contraindicated = [];
    const neutral = [];

    items.forEach(item => {
      // Find matches in beneficial
      let matchedBeneficial = null;
      let matchedContra = null;

      // Exact or partial check
      Object.keys(dictionary.beneficial).forEach(key => {
        if (item.includes(key) || key.includes(item)) {
          matchedBeneficial = {
            name: item,
            matchedKey: key,
            reason: dictionary.beneficial[key]
          };
        }
      });

      Object.keys(dictionary.contraindicated).forEach(key => {
        if (item.includes(key) || key.includes(item)) {
          matchedContra = {
            name: item,
            matchedKey: key,
            reason: dictionary.contraindicated[key]
          };
        }
      });

      if (matchedContra) {
        // Prevent duplicates
        if (!contraindicated.some(c => c.matchedKey === matchedContra.matchedKey)) {
          contraindicated.push(matchedContra);
        }
      } else if (matchedBeneficial) {
        if (!beneficial.some(b => b.matchedKey === matchedBeneficial.matchedKey)) {
          beneficial.push(matchedBeneficial);
        }
      } else {
        // Only push to neutral if it doesn't match some common chemical names
        if (item.length > 2 && !neutral.includes(item)) {
          // Capitalize first letter
          const capitalized = item.charAt(0).toUpperCase() + item.slice(1);
          neutral.push(capitalized);
        }
      }
    });

    // Score calculations
    // Base 75 points. Subtract 15 per contraindicated. Add 10 per beneficial. Cap 0 - 100.
    let score = 75;
    if (contraindicated.length > 0) {
      score -= contraindicated.length * 20;
    }
    score += beneficial.length * 10;
    score = Math.max(0, Math.min(score, 100));

    let status = 'safe';
    let statusLabel = 'Highly Compatible';
    let colorClass = 'text-[#5AA7A7] border-[#5AA7A7]/30 bg-[#5AA7A7]/5';
    
    if (score < 50) {
      status = 'danger';
      statusLabel = 'Not Recommended';
      colorClass = 'text-red-500 border-red-500/30 bg-red-500/5';
    } else if (score < 75 || contraindicated.length > 0) {
      status = 'warning';
      statusLabel = 'Use with Caution';
      colorClass = 'text-amber-500 border-amber-500/30 bg-amber-500/5';
    }

    const results = {
      beneficial,
      contraindicated,
      neutral,
      score,
      status,
      statusLabel,
      colorClass
    };

    setScanResult(results);
    setScanning(false);
    
    // Attempt to parse a potential product name
    let derivedName = '';
    const lines = ingredientsText.split('\n');
    if (lines.length > 1 && lines[0].length < 50 && !lines[0].includes(',')) {
      derivedName = lines[0].trim();
    }
    
    saveToHistory(derivedName, selectedCondition, score, results);
    addNotification(`Safety scan completed for ${selectedCondition}. Rating: ${statusLabel}`);
  };

  const handleReset = () => {
    setIngredientsText('');
    setScanResult(null);
    setOcrImage(null);
  };

  return (
    <div className="flex-grow p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 bg-slate-50/30 dark:bg-slate-900/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#5AA7A7]" /> Skincare Ingredient Safety Scanner
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Analyze cosmetics labels and formulations to verify safety, discover beneficial compounds, and flag ingredients contraindicated for specific skin conditions.
          </p>
        </div>
        
        {ingredientsText && (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Start New Scan
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Input Form & OCR */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm bg-white dark:bg-slate-800 space-y-5">
            <h2 className="font-heading font-extrabold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Analyze Formulation</h2>
            
            {/* Condition select */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Target Skin Condition</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['acne', 'eczema', 'rosacea', 'psoriasis'].map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => {
                      setSelectedCondition(cond);
                      setScanResult(null);
                    }}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer capitalize ${
                      selectedCondition === cond
                        ? 'bg-gradient-to-r from-[#96D7C6] to-[#5AA7A7] border-transparent text-white shadow-md shadow-[#5AA7A7]/10'
                        : 'bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800/80 text-slate-650 dark:text-slate-350 hover:bg-slate-50'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated OCR Upload Area */}
            {!ingredientsText && (
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Quick Import: Scan Label Image</label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`w-full border-2 border-dashed rounded-2xl py-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                    dragActive
                      ? 'border-[#5AA7A7] bg-[#5AA7A7]/5'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-50 dark:hover:bg-slate-900/20'
                  }`}
                >
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Drag product ingredients photo here</span>
                  <span className="text-[10px] text-slate-450 mt-1">or click to browse local files</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* OCR Progress Overlay */}
            {ocrScanning && (
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-[#5AA7A7]/40 space-y-4">
                <div className="relative aspect-video w-full max-w-xs mx-auto rounded-xl overflow-hidden bg-slate-900 border border-slate-200/10">
                  <img src={ocrImage} alt="OCR Upload" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-x-0 h-1 bg-[#5AA7A7] animate-scan shadow-[0_0_12px_#5AA7A7]"></div>
                </div>
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4.5 h-4.5 text-[#5AA7A7] animate-spin" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Simulating Smart Label Reader...</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{scanStep}</p>
                </div>
              </div>
            )}

            {/* Ingredients Paste Text Area */}
            {!ocrScanning && (
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pl-0.5">Ingredients List (Paste or edit)</label>
                  {ingredientsText && (
                    <button onClick={() => setIngredientsText('')} className="text-[9px] font-bold text-red-400 hover:text-red-500 flex items-center gap-0.5 cursor-pointer">
                      <Trash2 className="w-3 h-3" /> Clear Text
                    </button>
                  )}
                </div>
                <textarea
                  rows="6"
                  placeholder="Paste the cosmetic/product ingredients here, separated by commas (e.g. Water, Glycerin, Salicylic Acid, Fragrance...)"
                  value={ingredientsText}
                  onChange={(e) => {
                    setIngredientsText(e.target.value);
                    setScanResult(null);
                  }}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#5AA7A7] leading-relaxed resize-y shadow-inner"
                />
              </div>
            )}

            {/* Action buttons */}
            {!ocrScanning && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                {/* Samples */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Try Samples:</span>
                  <div className="flex flex-wrap gap-1">
                    {SAMPLE_PRODUCTS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleLoadSample(p)}
                        className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#5AA7A7] bg-white dark:bg-slate-900 hover:bg-[#5AA7A7]/5 text-[9px] font-bold text-slate-500 hover:text-[#5AA7A7] transition-all cursor-pointer"
                        title={p.name}
                      >
                        {p.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleScan}
                  disabled={scanning || !ingredientsText.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-extrabold text-white bg-[#5AA7A7] hover:bg-[#4d9393] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  {scanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white text-transparent" /> Run Safety Scan
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Scanning Overlay */}
            {scanning && (
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#5AA7A7] h-full transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>{scanStep}</span>
                  <span>{scanProgress}%</span>
                </div>
              </div>
            )}

          </div>

          {/* Educational / Dictionary quick lookup info */}
          <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm bg-white dark:bg-slate-800 space-y-4 text-left">
            <h3 className="font-heading font-extrabold text-xs text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#5AA7A7]" /> Dictionary Reference Info
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Our safety scanner cross-references cosmetic ingredients against clinical dermatology tables for Acne, Eczema, Rosacea, and Psoriasis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-1">
                <h4 className="text-[10px] font-extrabold text-red-500 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Trigger Warning (🔴)
                </h4>
                <p className="text-[9px] text-slate-450 leading-normal">
                  Flagged if ingredients act as contact allergens, barrier-stripping denatured alcohols, irritating BHAs/AHAs (on Eczema), or highly comedogenic oils (on Acne).
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#5AA7A7]/5 border border-[#5AA7A7]/10 space-y-1">
                <h4 className="text-[10px] font-extrabold text-[#5AA7A7] uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Barrier Soothing (🟢)
                </h4>
                <p className="text-[9px] text-slate-450 leading-normal">
                  Highlights skin-identical lipids (Ceramides), calming agents (Centella, Colloidal Oats), or sebum-regulating cell protectants (Niacinamide).
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Scan results & History */}
        <div className="lg:col-span-5 space-y-6">

          {/* Results Display */}
          <AnimatePresence mode="wait">
            {scanResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm bg-white dark:bg-slate-800 space-y-5 text-left"
              >
                {/* Score Header */}
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/80 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Analysis Result ({selectedCondition})</span>
                    <h3 className="font-heading font-extrabold text-base text-slate-800 dark:text-white">Compatibility Score</h3>
                  </div>
                  
                  {/* Gauge score circle */}
                  <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 shadow-inner">
                    <span className={`font-heading font-extrabold text-base ${
                      scanResult.status === 'safe' ? 'text-[#5AA7A7]' : scanResult.status === 'warning' ? 'text-amber-500' : 'text-red-500'
                    }`}>
                      {scanResult.score}
                    </span>
                    <span className="text-[7px] text-slate-400 absolute bottom-2">/100</span>
                  </div>
                </div>

                {/* Compatibility Banner */}
                <div className={`p-3 rounded-2xl border text-center text-xs font-extrabold ${scanResult.colorClass}`}>
                  {scanResult.statusLabel}
                </div>

                {/* Matched Details */}
                <div className="space-y-4">
                  
                  {/* Contraindicated Ingredients */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      Trigger/Contraindicated Ingredients ({scanResult.contraindicated.length})
                    </h4>
                    {scanResult.contraindicated.length === 0 ? (
                      <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:text-emerald-450 text-[10px] font-bold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 shrink-0" /> No known triggers found for this condition.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {scanResult.contraindicated.map((c, i) => (
                          <div key={i} className="p-2.5 rounded-xl border border-red-500/15 bg-red-500/5 text-left text-[10px] space-y-0.5">
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-red-600 dark:text-red-400 capitalize">{c.name}</span>
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">Trigger</span>
                            </div>
                            <p className="text-[9px] text-slate-450 leading-relaxed">{c.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Beneficial Ingredients */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      Beneficial/Soothing Ingredients ({scanResult.beneficial.length})
                    </h4>
                    {scanResult.beneficial.length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic">No specific beneficial ingredients found for this condition.</p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {scanResult.beneficial.map((b, i) => (
                          <div key={i} className="p-2.5 rounded-xl border border-[#5AA7A7]/15 bg-[#5AA7A7]/5 text-left text-[10px] space-y-0.5">
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-[#3b7878] dark:text-[#96D7C6] capitalize">{b.name}</span>
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#5AA7A7]/10 text-[#3b7878] dark:text-[#96D7C6]">Soothing</span>
                            </div>
                            <p className="text-[9px] text-slate-450 leading-relaxed">{b.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Neutral Ingredients */}
                  {scanResult.neutral.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Other ingredients ({scanResult.neutral.length})
                      </h4>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                        {scanResult.neutral.map((n, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[9px] text-slate-500 font-medium">
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            ) : (
              <div className="glass-panel rounded-[32px] p-8 text-center border border-white/50 shadow-sm bg-white dark:bg-slate-800 space-y-4">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <ShieldCheck className="w-7 h-7 text-slate-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Awaiting Scan</h3>
                  <p className="text-[10px] text-slate-400 max-w-[220px] mx-auto leading-relaxed">
                    Paste an ingredient list, import a label photo, or choose one of our sample products to run the diagnostic scan.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Scan History */}
          <div className="glass-panel rounded-[32px] p-6 border border-white/50 shadow-sm bg-white dark:bg-slate-800 space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/80 pb-3">
              <h3 className="font-heading font-extrabold text-xs text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-4 h-4 text-slate-400" /> Recent Scans
              </h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-[9px] font-bold text-red-400 hover:text-red-500 cursor-pointer"
                >
                  Clear History
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-[10px] text-slate-400 italic text-center py-4">No recent scans logged.</p>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {history.map((entry) => (
                  <div key={entry.id} className="p-3 rounded-2xl border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-all flex justify-between items-center gap-3">
                    <div className="min-w-0 flex-grow space-y-0.5">
                      <h4 className="text-[10px] font-extrabold text-slate-800 dark:text-white truncate">{entry.name}</h4>
                      <div className="flex items-center gap-1 text-[8px] text-slate-450 font-bold uppercase tracking-wider">
                        <span className="capitalize text-[#5AA7A7]">{entry.condition}</span>
                        <span>•</span>
                        <span>{entry.date}</span>
                      </div>
                    </div>
                    
                    {/* Score pill */}
                    <div className={`px-2 py-1 rounded-lg text-[9px] font-extrabold ${
                      entry.score >= 75
                        ? 'bg-[#5AA7A7]/10 text-[#3b7878] dark:text-[#96D7C6]'
                        : entry.score >= 50
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-450'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      Score: {entry.score}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
