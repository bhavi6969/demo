// src/data/molesData.js
const molesData = {
  disease: "Moles (Nevi)",
  confidence: 95,
  severity: "Mild",

  overview: {
    description:
      "Moles, or nevi, are common benign skin growths formed by clusters of pigmented cells. Most are harmless, but changes in size, color, or shape should be monitored for skin cancer risk.",
    common_age_group: "All ages, may develop in childhood or adolescence",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Small, round or oval brown, black, or skin-colored spots",
    "Flat or slightly raised surface",
    "Evenly colored or uniform",
    "May have hair growing from them"
  ],

  causes: [
    "Accumulation of melanocytes (pigment-producing cells)",
    "Genetic factors",
    "Sun exposure / UV radiation",
    "Hormonal changes (puberty, pregnancy)"
  ],

  recommendedTreatment: [
    "Regular self-monitoring for changes (ABCDE rule)",
    "Dermatologist evaluation for suspicious moles",
    "Excision if malignant or cosmetically concerning",
    "Cryotherapy or laser treatment for cosmetic removal"
  ],

  precautions: [
    "Avoid prolonged sun exposure",
    "Use broad-spectrum sunscreen",
    "Do not pick or scratch moles",
    "Check for sudden changes in color, size, or shape"
  ],

  skincareRoutine: [
    {
      step: "Sun Protection",
      title: "Broad-spectrum SPF 50+ sunscreen",
      description: "Prevents UV-induced changes in moles"
    },
    {
      step: "Daily Skin Check",
      title: "Examine moles",
      description: "Look for asymmetry, irregular borders, or color changes"
    },
    {
      step: "Moisturizer",
      title: "Non-irritating, fragrance-free moisturizer",
      description: "Maintains skin barrier"
    }
  ],

  homeRemedies: [
    "Keep skin clean and hydrated",
    "Avoid scratching or picking",
    "Apply sunscreen daily",
    "Monitor for changes regularly"
  ],

  medicineSuggestions: [
    {
      name: "None required for normal moles",
      type: "N/A",
      usage: "Observation and preventive care"
    },
    {
      name: "Topical or surgical removal if advised",
      type: "Prescription / procedural",
      usage: "Only for suspicious or cosmetic reasons"
    }
  ],

  dietRecommendations: [
    "Healthy diet rich in antioxidants",
    "Vitamin D from safe sun exposure or diet",
    "Maintain overall skin health through hydration"
  ],

  severityLevels: {
    mild: {
      description: "Small, evenly colored, harmless moles",
      treatmentTime: "Observation only"
    },
    moderate: {
      description: "Moles with slight irregularities; dermatologist monitoring recommended",
      treatmentTime: "Regular checks every 6-12 months"
    },
    severe: {
      description: "Suspicious or changing moles (possible melanoma)",
      treatmentTime: "Immediate dermatologist evaluation"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid change in size or color",
      "Asymmetry, irregular borders, or multiple colors",
      "Itching, bleeding, or pain",
      "Family history of melanoma"
    ]
  },

  emergencyWarning: [
    "Sudden darkening or irregular growth",
    "Bleeding or ulceration",
    "Rapidly enlarging mole"
  ]
};

export default molesData;