import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Detailed clinical data for various skin diseases to support realistic reports
export const SKIN_DISEASES = {
  acne: {
    id: 'acne',
    name: 'Acne Vulgaris',
    confidence: '96%',
    severity: 'Moderate',
    severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    severityValue: 60, // out of 100
    symptoms: [
      'Inflammatory papules and pustules mainly concentrated on facial zones',
      'Open and closed comedones (blackheads and whiteheads)',
      'Mild erythematous background skin texture',
      'Tenderness and localized warmth around pustular breakouts'
    ],
    causes: [
      'Excess sebum production triggered by hormonal fluctuations',
      'Follicular hyperkeratinization leading to clogged sebaceous glands',
      'Colonization by Cutibacterium acnes bacteria',
      'Secondary inflammation triggered by external friction or dietary glycemic loads'
    ],
    skincare: {
      morning: 'Gentle Salicylic Acid (2%) cleanser, Hyaluronic Acid serum, Oil-free non-comedogenic SPF 50+',
      night: 'Mild hydrating cleanser, thin layer of Adapalene (0.1%) or Benzoyl Peroxide (2.5%), Ceramide-based light moisturizer'
    },
    treatments: [
      'Topical retinoid therapy (e.g., Adapalene, Tretinoin) to regulate epithelial cell turnover',
      'Topical anti-microbials (e.g., Clindamycin paired with Benzoyl Peroxide) to reduce bacterial resistance',
      'Chemical peels incorporating Beta-Hydroxy Acids (BHA) for deep follicular exfoliation'
    ],
    medicines: [
      { name: 'Adapalene Gel 0.1%', dosage: 'Apply a pea-sized amount to clean face once daily at night' },
      { name: 'Benzoyl Peroxide Wash 4%', dosage: 'Use once daily in the morning, rinse off thoroughly' },
      { name: 'Doxycycline 100mg (Oral)', dosage: '1 tablet daily for 6-8 weeks (Requires prescription for severe cases)' }
    ],
    remedies: [
      'Apply diluted tea tree oil (5%) as a localized spot treatment',
      'Apply cooled green tea extract compress to soothe active inflammation',
      'Use hydrocolloid pimple patches to prevent picking and draw out impurities'
    ],
    diet: [
      'Incorporate zinc-rich foods (e.g., pumpkin seeds, lentils) to regulate sebum production',
      'Minimize high-glycemic index carbohydrates (white bread, sugary sodas)',
      'Limit pasteurized dairy products if correlated with active flare-ups'
    ],
    precautions: [
      'Do not pick, squeeze, or scratch active lesions to prevent deep ice-pick scarring',
      'Avoid heavy oil-based cosmetic foundations and comedogenic sunscreens',
      'Introduce active acids gradually to prevent skin barrier disruption'
    ]
  },
  melanoma: {
    id: 'melanoma',
    name: 'Melanoma Risk (Atypical Nevus)',
    confidence: '88%',
    severity: 'High - Urgent Evaluation',
    severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    severityValue: 90,
    symptoms: [
      'Asymmetrical border profile with jagged or poorly defined margins',
      'Color variegation exhibiting shades of dark brown, black, and deep tan',
      'Diameter greater than 6mm with progressive evolutionary changes over 3 months',
      'Epithelial scaling, occasional bleeding, or sensory tingling at the site'
    ],
    causes: [
      'Accumulative DNA mutations in melanocytes induced by Ultraviolet (UV) radiation',
      'Genetic predisposition combined with a high lifetime count of typical/atypical nevi',
      'History of blistering sunburns, particularly during childhood/adolescence',
      'Immunosuppressive factors reducing natural cellular repair efficiency'
    ],
    skincare: {
      morning: 'Hypoallergenic mineral-based physical sunscreen (Zinc Oxide 20%), Ceramide barrier defense cream',
      night: 'Ultra-gentle lipid-replenishing cleanser, fragrance-free barrier balm'
    },
    treatments: [
      'Immediate referral to a board-certified dermatologist for a full-body dermoscopy inspection',
      'Excisional biopsy with histopathological examination to determine Breslow depth',
      'Wide local excision under local anesthesia if malignancy is pathologically confirmed'
    ],
    medicines: [
      { name: 'No Topical OTC Medication', dosage: 'Atypical nevi require surgical assessment. Avoid applying self-treatment creams.' }
    ],
    remedies: [
      'None. Do not attempt home remedies or acidic spot-peels on suspected atypical lesions.'
    ],
    diet: [
      'Consume high-antioxidant foods (blueberries, leafy greens) to support overall cellular health',
      'Maintain optimal Vitamin D3 levels through dietary supplementation'
    ],
    precautions: [
      'Avoid any direct sun exposure between 10 AM and 4 PM',
      'Wear UPF 50+ protective clothing, wide-brimmed hats, and UV-blocking sunglasses',
      'Perform monthly self-examinations using the ABCDE protocol'
    ]
  },
  eczema: {
    id: 'eczema',
    name: 'Atopic Dermatitis (Eczema)',
    confidence: '92%',
    severity: 'Moderate',
    severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    severityValue: 50,
    symptoms: [
      'Pruritic (severely itchy) erythematous patches, particularly on flexural creases',
      'Dry, xerotic, scaling skin displaying compromised epidermal barrier integrity',
      'Lichenification (thickened, leathery skin) from chronic scratching',
      'Serous exudate or crusting in acute flare-up phases'
    ],
    causes: [
      'Filaggrin (FLG) gene mutations leading to compromised stratum corneum barrier structure',
      'Immune system hyper-reactivity to environmental allergens (pollen, dust mites, pet dander)',
      'Staphylococcus aureus colonization triggering secondary inflammatory cycles',
      'Sudden humidity drops or exposure to harsh alkaline soaps/surfactants'
    ],
    skincare: {
      morning: 'Oatmeal-infused body wash, immediate application of heavy emollient cream on damp skin, sunscreen',
      night: 'Non-soap moisturizing cleanser, thick layer of ceramide ointment, occlusive healing balm'
    },
    treatments: [
      'Short-term topical corticosteroid therapy (e.g., Hydrocortisone, Triamcinolone) to suppress acute flares',
      'Topical calcineurin inhibitors (e.g., Tacrolimus ointment) for delicate areas like face and eyelids',
      'Narrowband Ultraviolet B (UVB) phototherapy for generalized refractory eczema cases'
    ],
    medicines: [
      { name: 'Triamcinolone Acetonide Cream 0.1%', dosage: 'Apply a thin layer to affected areas twice daily for up to 10 days' },
      { name: 'Tacrolimus Ointment 0.03%', dosage: 'Apply a thin layer twice daily to active eczema zones' },
      { name: 'Cetirizine 10mg (OTC Antihistamine)', dosage: '1 tablet daily at night to manage nocturnal pruritus (itching)' }
    ],
    remedies: [
      'Take 15-minute colloidal oatmeal lukewarm baths to soothe inflamed nerve endings',
      'Apply cold, damp compresses to instantly relieve intense itching episodes',
      'Apply organic cold-pressed virgin coconut oil to reduce Staphylococcus colonization'
    ],
    diet: [
      'Increase omega-3 fatty acids (salmon, chia seeds, walnuts) to downregulate inflammation',
      'Incorporate probiotic-rich foods (kefir, kimchi) to support the gut-skin axis',
      'Track potential flares related to common systemic allergens (gluten, soy, nuts)'
    ],
    precautions: [
      'Use strictly fragrance-free, hypoallergenic skincare, detergents, and fabric softeners',
      'Keep fingernails trimmed short and rounded to prevent excoriation and secondary infections',
      'Avoid excessively hot showers which strip natural epidermal lipids'
    ]
  },
  dermatitis: {
    id: 'dermatitis',
    name: 'Contact Dermatitis',
    confidence: '94%',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 30,
    symptoms: [
      'Localized pruritic red rash strictly matching the contact area of the trigger',
      'Small vesicles (blisters) that may leak clear fluid when irritated',
      'Dry, scaling, or leathery texture at the contact site',
      'Burning sensation or skin tenderness'
    ],
    causes: [
      'Type IV delayed hypersensitivity reaction to allergens (e.g., Nickel, fragrances, poison ivy)',
      'Direct chemical damage to the epidermal barrier (e.g., harsh detergents, solvents, rubbing alcohol)',
      'Cosmetic preservatives (e.g., parabens, methylisothiazolinone) in beauty formulas'
    ],
    skincare: {
      morning: 'Wash area with tepid water and gentle pH-balanced syndet bar, apply pure petrolatum jelly',
      night: 'Wash gently, apply calamine lotion or Hydrocortisone cream, seal with barrier repair cream'
    },
    treatments: [
      'Identification and immediate elimination of the offending allergen or irritant substance',
      'Short course of mild topical steroids to reduce localized edema and redness',
      'Emollient therapy to repair the damaged stratum corneum'
    ],
    medicines: [
      { name: 'Hydrocortisone Cream 1%', dosage: 'Apply thin film to affected rash 2-3 times daily for 5-7 days' },
      { name: 'Calamine Lotion', dosage: 'Apply gently with cotton pad to oozing or itchy vesicles as needed' }
    ],
    remedies: [
      'Cool compress soaked in aluminum acetate solution (Domeboro) to dry up weeping blisters',
      'Aloe vera gel (99% pure) to cool localized burning sensations'
    ],
    diet: [
      'Maintain high water intake to support systemic hydration',
      'Eat anti-inflammatory herbs like turmeric and ginger'
    ],
    precautions: [
      'Wear protective gloves when handling household cleaning solvents or industrial chemicals',
      'Always patch-test new cosmetic items on the inner forearm for 48 hours prior to facial use',
      'Look for jewelry labeled "nickel-free" and cosmetics labeled "hypoallergenic"'
    ]
  }
};

const INITIAL_SCANS = [
  {
    id: 'scan-102',
    date: '2026-05-18',
    time: '14:23',
    diseaseId: 'acne',
    diseaseName: 'Acne Vulgaris',
    confidence: '96%',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1628102428189-6c4cf008719c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', // placeholder skin representation
    status: 'Completed'
  },
  {
    id: 'scan-101',
    date: '2026-04-12',
    time: '09:15',
    diseaseId: 'dermatitis',
    diseaseName: 'Contact Dermatitis',
    confidence: '94%',
    severity: 'Mild',
    imageUrl: 'https://images.unsplash.com/photo-1606501170755-58210fe9f2a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'Completed'
  },
  {
    id: 'scan-100',
    date: '2026-02-28',
    time: '18:40',
    diseaseId: 'eczema',
    diseaseName: 'Atopic Dermatitis (Eczema)',
    confidence: '92%',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'Completed'
  }
];

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Alexander Mercer',
    email: 'alex.mercer@cyberhealth.ai',
    phone: '+1 (555) 019-2834',
    scanCount: 14,
    plan: 'Pro AI Member',
    joined: 'Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  const [scans, setScans] = useState(INITIAL_SCANS);
  const [currentScan, setCurrentScan] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Clinical Report #scan-102 compiled successfully.', time: '2 days ago', unread: false },
    { id: 2, text: 'Annual skin health diagnostic tracker updated.', time: '1 week ago', unread: false },
    { id: 3, text: 'Welcome to IMPACT AI. Secure clinical storage is active.', time: '3 months ago', unread: false }
  ]);

  const addNotification = (text) => {
    setNotifications((prev) => [
      { id: Date.now(), text, time: 'Just now', unread: true },
      ...prev
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Simulates the AI diagnostic pipeline
  const runAIScanSimulation = async (imageSrc, callbackProgress) => {
    return new Promise((resolve) => {
      const steps = [
        { label: 'Initializing Neural Engine...', progress: 15 },
        { label: 'Analyzing image resolution and color variance...', progress: 35 },
        { label: 'Segmenting skin lesions and border atypicality...', progress: 55 },
        { label: 'Calculating probability densities across 40+ dermoscopic classes...', progress: 75 },
        { label: 'Compiling diagnostic confidence thresholds...', progress: 95 },
        { label: 'Finalizing clinical recommendations...', progress: 100 }
      ];

      let currentStep = 0;
      
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          callbackProgress(steps[currentStep]);
          currentStep++;
        } else {
          clearInterval(interval);
          
          // Randomly choose one disease from the dataset for simulation
          const keys = Object.keys(SKIN_DISEASES);
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          const diseaseInfo = SKIN_DISEASES[randomKey];
          
          const newScanId = `scan-${Math.floor(100 + Math.random() * 900)}`;
          const now = new Date();
          const dateStr = now.toISOString().split('T')[0];
          const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);

          const resultPayload = {
            id: newScanId,
            date: dateStr,
            time: timeStr,
            diseaseId: diseaseInfo.id,
            diseaseName: diseaseInfo.name,
            confidence: diseaseInfo.confidence,
            severity: diseaseInfo.severity,
            imageUrl: imageSrc || 'https://images.unsplash.com/photo-1628102428189-6c4cf008719c?w=400&auto=format&fit=crop&q=60',
            status: 'Completed'
          };

          // Save scan to history log
          setScans((prev) => [resultPayload, ...prev]);
          setUser((prev) => ({ ...prev, scanCount: prev.scanCount + 1 }));
          addNotification(`AI Scan ${newScanId} finished. Detected condition: ${diseaseInfo.name} (${diseaseInfo.confidence})`);

          resolve(resultPayload);
        }
      }, 900); // Trigger a transition roughly every 900ms, total scan takes ~5 seconds
    });
  };

  const updateProfile = (updatedDetails) => {
    setUser((prev) => ({ ...prev, ...updatedDetails }));
    addNotification('User profile settings updated successfully.');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        scans,
        currentScan,
        setCurrentScan,
        notifications,
        addNotification,
        clearNotifications,
        runAIScanSimulation,
        updateProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
