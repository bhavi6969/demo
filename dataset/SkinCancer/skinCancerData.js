// src/data/skinCancerData.js
const skinCancerData = {
  disease: "Skin Cancer",
  confidence: 89,
  severity: "Severe",

  overview: {
    description:
      "Skin cancer is the abnormal growth of skin cells, most often caused by UV exposure from the sun or tanning beds. It includes types like melanoma, basal cell carcinoma, and squamous cell carcinoma.",
    common_age_group: "50+ years (but can occur earlier)",
    contagious: false,
    chronic: true
  },

  types: [
    "Melanoma (most dangerous)",
    "Basal Cell Carcinoma (BCC)",
    "Squamous Cell Carcinoma (SCC)"
  ],

  symptoms: [
    "New or changing mole",
    "Asymmetry in skin lesion",
    "Irregular borders",
    "Multiple colors in a lesion",
    "Bleeding or non-healing sore",
    "Itching or pain in mole",
    "Rapid growth of skin spot"
  ],

  causes: [
    "Excess UV radiation exposure",
    "Tanning beds usage",
    "Fair skin (less melanin protection)",
    "Genetic mutations",
    "History of sunburns",
    "Weakened immune system"
  ],

  recommendedTreatment: [
    "Surgical removal of cancerous tissue",
    "Mohs surgery (precision removal)",
    "Radiation therapy (advanced cases)",
    "Chemotherapy for metastasized cancer",
    "Immunotherapy for melanoma",
    "Targeted drug therapy"
  ],

  precautions: [
    "Avoid direct sun exposure during peak hours",
    "Use SPF 50+ sunscreen daily",
    "Wear protective clothing",
    "Avoid tanning beds",
    "Regular skin self-checks",
    "Annual dermatologist visits"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle skin cleanser",
      description: "Maintains skin barrier health"
    },
    {
      step: "Protection",
      title: "Broad-spectrum SPF 50+ sunscreen",
      description: "Prevents UV-induced DNA damage"
    },
    {
      step: "Moisturizer",
      title: "Fragrance-free moisturizer",
      description: "Protects and repairs skin barrier"
    }
  ],

  homeRemedies: [
    "Strict sun avoidance",
    "Wearing hats and protective clothing",
    "Using aloe vera for irritation relief (supportive only)",
    "Regular skin monitoring (ABCDE rule)"
  ],

  abcdeRule: {
    A: "Asymmetry",
    B: "Border irregularity",
    C: "Color variation",
    D: "Diameter > 6mm",
    E: "Evolving (changing over time)"
  },

  medicineSuggestions: [
    {
      name: "Surgical excision",
      type: "Procedure",
      usage: "Primary treatment for most skin cancers"
    },
    {
      name: "Immunotherapy (e.g., checkpoint inhibitors)",
      type: "Systemic treatment",
      usage: "Used in advanced melanoma"
    },
    {
      name: "Targeted therapy drugs",
      type: "Prescription",
      usage: "For specific genetic mutations in cancer cells"
    }
  ],

  dietRecommendations: [
    "Antioxidant-rich foods (berries, leafy greens)",
    "Avoid smoking and alcohol",
    "Hydration to support skin healing",
    "Healthy balanced diet for immune support"
  ],

  severityLevels: {
    mild: {
      description: "Early localized skin lesion",
      treatmentTime: "Curable with surgical removal"
    },
    moderate: {
      description: "Deeper or spreading lesion",
      treatmentTime: "Requires surgery + follow-up therapy"
    },
    severe: {
      description: "Metastatic or advanced melanoma",
      treatmentTime: "Long-term systemic treatment required"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "New or changing mole",
      "Bleeding skin lesion",
      "Rapid growth of spot",
      "Non-healing wound",
      "Dark irregular pigmentation"
    ]
  },

  emergencyWarning: [
    "Rapidly spreading lesion",
    "Bleeding or ulcerated mole",
    "Sudden color change in skin spot",
    "Severe pain in lesion"
  ]
};

export default skinCancerData;