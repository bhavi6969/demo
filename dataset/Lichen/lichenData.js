// src/data/lichenData.js
const lichenData = {
  disease: "Lichen Planus",
  confidence: 92,
  severity: "Moderate",

  overview: {
    description:
      "Lichen Planus is an inflammatory skin condition that causes purplish, itchy, flat-topped bumps on the skin, sometimes affecting mucous membranes.",
    common_age_group: "30-60 years",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Purplish, flat-topped bumps",
    "Intense itching",
    "White lacy patches in mouth",
    "Hair loss in affected areas",
    "Nail ridging or thinning"
  ],

  causes: [
    "Immune system dysfunction",
    "Genetic predisposition",
    "Medications (certain blood pressure or anti-malarial drugs)",
    "Hepatitis C infection",
    "Stress triggers"
  ],

  recommendedTreatment: [
    "Topical corticosteroid creams",
    "Oral corticosteroids for severe cases",
    "Antihistamines to control itching",
    "Phototherapy in persistent cases",
    "Immune-suppressing medications for chronic forms"
  ],

  precautions: [
    "Avoid scratching to prevent infection",
    "Use gentle skincare products",
    "Maintain oral hygiene for oral lesions",
    "Monitor for nail or scalp involvement",
    "Regular follow-up with dermatologist"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Mild, fragrance-free soap",
      description: "Reduces irritation and prevents flares"
    },
    {
      step: "Treatment",
      title: "Topical corticosteroid ointment",
      description: "Apply as directed by doctor"
    },
    {
      step: "Moisturizer",
      title: "Hypoallergenic moisturizer",
      description: "Keeps skin hydrated and reduces itching"
    },
    {
      step: "Sun Protection",
      title: "SPF 50 Sunscreen",
      description: "Prevents UV-triggered flares"
    }
  ],

  homeRemedies: [
    "Cool compresses to reduce itching",
    "Oatmeal baths",
    "Aloe vera gel for soothing",
    "Stress reduction techniques"
  ],

  medicineSuggestions: [
    {
      name: "Hydrocortisone 1% cream",
      type: "Topical OTC",
      usage: "Reduces inflammation and itching"
    },
    {
      name: "Prednisolone",
      type: "Oral corticosteroid",
      usage: "For severe widespread lesions"
    },
    {
      name: "Antihistamines (Cetirizine, Loratadine)",
      type: "Oral OTC",
      usage: "Control itching"
    }
  ],

  dietRecommendations: [
    "Avoid foods that irritate oral lesions (spicy, acidic)",
    "Eat anti-inflammatory foods (fruits, vegetables, omega-3 rich foods)",
    "Stay hydrated"
  ],

  severityLevels: {
    mild: {
      description: "Small patches with mild itching",
      treatmentTime: "2-6 weeks"
    },
    moderate: {
      description: "Widespread lesions with noticeable discomfort",
      treatmentTime: "1-3 months"
    },
    severe: {
      description: "Extensive lesions, mucosal involvement, nail changes",
      treatmentTime: "3-6 months or longer"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid spreading of lesions",
      "Severe itching affecting sleep",
      "Oral or genital mucosa involvement",
      "Nail or scalp changes",
      "No improvement after home treatments"
    ]
  },

  emergencyWarning: [
    "Severe allergic reaction to medications",
    "Secondary infection of lesions",
    "Severe pain or bleeding in oral lesions"
  ]
};

export default lichenData;