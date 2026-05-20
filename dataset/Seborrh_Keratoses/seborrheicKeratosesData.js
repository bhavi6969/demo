// src/data/seborrheicKeratosesData.js
const seborrheicKeratosesData = {
  disease: "Seborrheic Keratoses",
  confidence: 94,
  severity: "Mild",

  overview: {
    description:
      "Seborrheic keratoses are common, benign (non-cancerous) skin growths that appear as waxy, wart-like, or stuck-on lesions. They are very common in older adults.",
    common_age_group: "40+ years",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Brown, black, or tan growths on skin",
    "Waxy or scaly surface",
    "Slightly raised, 'stuck-on' appearance",
    "Itching (sometimes)",
    "Multiple lesions over time"
  ],

  causes: [
    "Aging process",
    "Genetic factors",
    "Sun exposure (possible link)",
    "Skin cell overgrowth (keratinocytes)"
  ],

  recommendedTreatment: [
    "Usually no treatment required",
    "Cryotherapy (freezing removal)",
    "Curettage (scraping off lesion)",
    "Laser removal for cosmetic reasons",
    "Electrocautery in clinical settings"
  ],

  precautions: [
    "Avoid scratching or picking lesions",
    "Monitor for sudden changes in shape or color",
    "Use sunscreen to protect surrounding skin",
    "Regular skin check-ups for older adults"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle daily cleanser",
      description: "Maintains healthy skin without irritation"
    },
    {
      step: "Moisturizer",
      title: "Hydrating, non-irritating moisturizer",
      description: "Keeps surrounding skin healthy"
    },
    {
      step: "Sun Protection",
      title: "SPF 50+ sunscreen",
      description: "Prevents UV damage to surrounding skin"
    }
  ],

  homeRemedies: [
    "Keep skin moisturized",
    "Avoid friction or scratching",
    "Apply sunscreen daily",
    "Regular self-examination of skin"
  ],

  medicineSuggestions: [
    {
      name: "No medication required",
      type: "N/A",
      usage: "Condition is benign and usually does not need drugs"
    },
    {
      name: "Cryotherapy (clinical procedure)",
      type: "Dermatological treatment",
      usage: "Freezing and removal of lesions if needed"
    }
  ],

  dietRecommendations: [
    "Healthy antioxidant-rich diet",
    "Stay hydrated",
    "Support overall skin health with fruits and vegetables"
  ],

  severityLevels: {
    mild: {
      description: "Small, harmless growths with no symptoms",
      treatmentTime: "No treatment required"
    },
    moderate: {
      description: "Multiple visible lesions causing cosmetic concern",
      treatmentTime: "Optional cosmetic removal"
    },
    severe: {
      description: "Very large or irritated lesions (rare)",
      treatmentTime: "Dermatologist removal procedures"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid change in size or color",
      "Bleeding or irritation",
      "Uncertainty about diagnosis",
      "Cosmetic concerns"
    ]
  },

  emergencyWarning: [
    "Sudden dark irregular growth",
    "Bleeding lesion without injury",
    "Fast-changing skin lesion (rule out melanoma)"
  ]
};

export default seborrheicKeratosesData;