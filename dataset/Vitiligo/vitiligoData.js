// src/data/vitiligoData.js
const vitiligoData = {
  disease: "Vitiligo",
  confidence: 92,
  severity: "Mild to Moderate",

  riskScore: 40,
  icdTag: "L80 (Vitiligo)",
  spreadLevel: "Non-contagious (autoimmune condition)",

  aiNotes:
    "Detected depigmented patches with well-defined borders, consistent with melanocyte loss typical of vitiligo.",

  overview: {
    description:
      "Vitiligo is a chronic autoimmune condition where the immune system destroys melanocytes, leading to loss of skin pigment and white patches on the skin.",
    common_age_group: "10-30 years",
    contagious: false,
    chronic: true
  },

  types: [
    "Generalized vitiligo",
    "Segmental vitiligo",
    "Focal vitiligo",
    "Mucosal vitiligo",
    "Universal vitiligo (rare)"
  ],

  symptoms: [
    "White or depigmented patches on skin",
    "Symmetrical loss of pigment",
    "Premature whitening of hair",
    "Color loss in mucous membranes",
    "Slow spreading patches over time"
  ],

  causes: [
    "Autoimmune destruction of melanocytes",
    "Genetic predisposition",
    "Oxidative stress",
    "Neurogenic factors",
    "Environmental triggers"
  ],

  recommendedTreatment: [
    "Topical corticosteroids",
    "Calcineurin inhibitors (tacrolimus)",
    "Phototherapy (Narrowband UVB)",
    "Skin camouflage cosmetics",
    "Surgical grafting (in stable cases)"
  ],

  precautions: [
    "Avoid excessive sun exposure",
    "Use sunscreen regularly",
    "Protect depigmented skin from burns",
    "Avoid skin trauma (Koebner phenomenon)",
    "Maintain mental well-being"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Mild, fragrance-free cleanser",
      description: "Prevents skin irritation"
    },
    {
      step: "Treatment",
      title: "Topical corticosteroids or tacrolimus",
      description: "Helps slow progression"
    },
    {
      step: "Moisturizer",
      title: "Hydrating moisturizer",
      description: "Maintains skin barrier health"
    },
    {
      step: "Sun Protection",
      title: "SPF 50+ sunscreen",
      description: "Protects depigmented skin from burns"
    }
  ],

  homeRemedies: [
    "Aloe vera gel for soothing",
    "Ginkgo biloba (studied for repigmentation support)",
    "Stress reduction (meditation/yoga)",
    "Balanced diet for immune support",
    "Sun protection at all times"
  ],

  medicineSuggestions: [
    {
      name: "Tacrolimus ointment",
      type: "Topical immunomodulator",
      usage: "Reduces immune attack on melanocytes"
    },
    {
      name: "Clobetasol propionate",
      type: "Topical steroid",
      usage: "Slows progression in early stages"
    },
    {
      name: "Narrowband UVB therapy",
      type: "Phototherapy",
      usage: "Stimulates repigmentation"
    }
  ],

  dietRecommendations: [
    "Antioxidant-rich foods",
    "Vitamin B12 and folic acid sources",
    "Fresh fruits and vegetables",
    "Avoid excessive processed foods",
    "Hydration support"
  ],

  severityLevels: {
    mild: {
      description: "Small localized depigmented patches",
      treatmentTime: "Months with topical therapy"
    },
    moderate: {
      description: "Widespread but stable patches",
      treatmentTime: "Months to years with phototherapy"
    },
    severe: {
      description: "Extensive skin involvement (universal vitiligo)",
      treatmentTime: "Long-term management"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid spread of white patches",
      "New depigmented areas appearing frequently",
      "Psychological distress due to skin changes",
      "Need for phototherapy or advanced treatment"
    ]
  },

  emergencyWarning: [
    "Sudden rapid spread of depigmentation",
    "Severe sunburn in affected areas",
    "Associated autoimmune symptoms (thyroid, etc.)"
  ]
};

export default vitiligoData;