// src/data/unknownNormalData.js
const unknownNormalData = {
  disease: "Normal Skin / No Disease Detected",
  confidence: 97,
  severity: "Normal",

  riskScore: 5,
  icdTag: "Z00 (General examination - normal findings)",
  spreadLevel: "None",

  aiNotes:
    "No significant dermatological abnormalities detected. Skin appears within normal healthy range.",

  overview: {
    description:
      "The skin appears normal with no visible signs of infection, inflammation, or abnormal pigmentation.",
    common_age_group: "All ages",
    contagious: false,
    chronic: false
  },

  symptoms: [
    "No visible rash",
    "No inflammation",
    "Even skin tone",
    "Normal texture",
    "No lesions detected"
  ],

  causes: [
    "Healthy skin condition",
    "No pathological triggers detected",
    "Normal skin variation"
  ],

  recommendedTreatment: [
    "No medical treatment required",
    "Continue normal skincare routine",
    "Maintain hydration",
    "Use sunscreen daily"
  ],

  precautions: [
    "Maintain basic skin hygiene",
    "Use sunscreen (SPF 50+)",
    "Avoid harsh chemicals",
    "Stay hydrated",
    "Monitor for future changes"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle face wash",
      description: "Maintains natural skin balance"
    },
    {
      step: "Moisturizer",
      title: "Light hydrating moisturizer",
      description: "Keeps skin barrier healthy"
    },
    {
      step: "Sun Protection",
      title: "SPF 50+ sunscreen",
      description: "Prevents future UV damage"
    }
  ],

  homeRemedies: [
    "Drink plenty of water",
    "Maintain balanced diet",
    "Regular sleep cycle",
    "Basic skincare routine"
  ],

  medicineSuggestions: [
    {
      name: "No medication required",
      type: "N/A",
      usage: "Healthy skin condition"
    }
  ],

  dietRecommendations: [
    "Fruits and vegetables",
    "Omega-3 rich foods",
    "Hydration",
    "Avoid processed food excess"
  ],

  severityLevels: {
    normal: {
      description: "Healthy skin with no abnormalities",
      treatmentTime: "No treatment needed"
    }
  },

  doctorConsultation: {
    recommended: false,
    whenToVisit: [
      "If sudden changes appear in skin",
      "If new rashes or lesions develop"
    ]
  },

  emergencyWarning: [
    "No emergency detected"
  ]
};

export default unknownNormalData;