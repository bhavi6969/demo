// src/data/vascularTumorsData.js
const vascularTumorsData = {
  disease: "Vascular Tumors",
  confidence: 90,
  severity: "Moderate",

  riskScore: 68,
  icdTag: "D18 (Hemangioma and other vascular tumors)",
  spreadLevel: "Low to Moderate",

  aiNotes:
    "Detected abnormal vascular pattern suggesting benign vascular proliferation or tumor-like blood vessel growth.",

  overview: {
    description:
      "Vascular tumors are abnormal growths of blood vessels in the skin or deeper tissues. Most are benign, but some require monitoring or treatment depending on size and location.",
    common_age_group: "Infants to adults (depends on type)",
    contagious: false,
    chronic: true
  },

  types: [
    "Hemangioma (common benign tumor in infants)",
    "Cherry angioma",
    "Pyogenic granuloma",
    "Kaposi sarcoma (rare malignant form)",
    "Venous malformations"
  ],

  symptoms: [
    "Red, purple, or blue skin lesions",
    "Raised or flat vascular spots",
    "Soft or compressible lumps",
    "Bleeding easily (especially pyogenic granuloma)",
    "Slow or rapid growth depending on type"
  ],

  causes: [
    "Abnormal blood vessel formation",
    "Genetic factors",
    "Hormonal changes",
    "Unknown developmental triggers",
    "Injury or trauma (in some cases)"
  ],

  recommendedTreatment: [
    "Observation (many cases resolve naturally)",
    "Laser therapy for cosmetic removal",
    "Surgical excision for problematic lesions",
    "Beta-blockers (for infant hemangiomas)",
    "Cryotherapy in selected cases"
  ],

  precautions: [
    "Avoid trauma or injury to lesion",
    "Monitor for rapid growth",
    "Do not attempt self-removal",
    "Protect from sun exposure",
    "Regular dermatology checkups"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle non-irritating cleanser",
      description: "Prevents irritation around lesion"
    },
    {
      step: "Protection",
      title: "Soft protective covering (if needed)",
      description: "Prevents accidental injury"
    },
    {
      step: "Sun Protection",
      title: "SPF 50+ sunscreen",
      description: "Prevents pigmentation changes"
    }
  ],

  homeRemedies: [
    "Avoid scratching or pressure on lesion",
    "Cold compress for mild discomfort",
    "Keep skin clean and dry",
    "Monitor growth regularly"
  ],

  medicineSuggestions: [
    {
      name: "Propranolol",
      type: "Prescription (infant hemangioma)",
      usage: "Reduces blood vessel growth"
    },
    {
      name: "Timolol gel",
      type: "Topical beta-blocker",
      usage: "Used for superficial hemangiomas"
    },
    {
      name: "Laser therapy",
      type: "Procedure",
      usage: "Removes or reduces vascular lesions"
    }
  ],

  dietRecommendations: [
    "No specific dietary restrictions",
    "Maintain healthy immune system",
    "Hydration for skin health",
    "Balanced nutrition"
  ],

  severityLevels: {
    mild: {
      description: "Small stable vascular lesions (cherry angiomas)",
      treatmentTime: "No treatment required"
    },
    moderate: {
      description: "Growing or visible lesions affecting appearance",
      treatmentTime: "Weeks to months with treatment"
    },
    severe: {
      description: "Large, bleeding, or fast-growing vascular tumors",
      treatmentTime: "Requires medical intervention"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid growth of lesion",
      "Frequent bleeding",
      "Pain or ulceration",
      "Uncertain diagnosis",
      "Cosmetic or functional concern"
    ]
  },

  emergencyWarning: [
    "Sudden bleeding from lesion",
    "Rapid expansion in size",
    "Color change to dark purple/black",
    "Painful swelling"
  ]
};

export default vascularTumorsData