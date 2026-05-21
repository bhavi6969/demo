// src/data/vasculitisData.js
const vasculitisData = {
  disease: "Vasculitis",
  confidence: 88,
  severity: "Moderate to Severe",

  riskScore: 74,
  icdTag: "L95 (Vasculitis limited to skin)",
  spreadLevel: "Low (autoimmune, not contagious)",

  aiNotes:
    "Detected inflammatory vascular pattern suggesting possible small or medium vessel vasculitis with skin involvement.",

  overview: {
    description:
      "Vasculitis is an inflammation of blood vessels that can cause skin changes such as purple spots, ulcers, and rashes. It may be limited to the skin or involve internal organs.",
    common_age_group: "Adults (varies by type)",
    contagious: false,
    chronic: true
  },

  types: [
    "Cutaneous small vessel vasculitis",
    "Leukocytoclastic vasculitis",
    "IgA vasculitis (Henoch-Schönlein)",
    "Urticarial vasculitis",
    "Systemic vasculitis (multi-organ involvement)"
  ],

  symptoms: [
    "Purple or red spots (purpura)",
    "Raised skin lesions",
    "Burning or pain in affected area",
    "Ulcers on skin in severe cases",
    "Blisters or nodules",
    "Fatigue (if systemic)"
  ],

  causes: [
    "Autoimmune response",
    "Infections triggering immune reaction",
    "Certain medications",
    "Underlying systemic diseases",
    "Unknown idiopathic causes"
  ],

  recommendedTreatment: [
    "Corticosteroids to reduce inflammation",
    "Immunosuppressive drugs (severe cases)",
    "Treat underlying infection if present",
    "Rest and limb elevation",
    "Pain management therapy"
  ],

  precautions: [
    "Avoid skin trauma",
    "Monitor for spreading lesions",
    "Follow immunosuppressive therapy strictly",
    "Avoid self-medication",
    "Regular medical follow-up required"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Mild, non-irritating cleanser",
      description: "Prevents secondary infection"
    },
    {
      step: "Treatment",
      title: "Topical anti-inflammatory cream (as prescribed)",
      description: "Reduces local inflammation"
    },
    {
      step: "Protection",
      title: "Protect affected skin from injury",
      description: "Prevents worsening of lesions"
    },
    {
      step: "Moisturizer",
      title: "Barrier repair moisturizer",
      description: "Supports healing skin"
    }
  ],

  homeRemedies: [
    "Rest and reduce physical strain",
    "Elevate affected limbs",
    "Cold compress for pain relief",
    "Hydration support",
    "Avoid scratching or pressure"
  ],

  medicineSuggestions: [
    {
      name: "Prednisone",
      type: "Corticosteroid",
      usage: "Reduces inflammation"
    },
    {
      name: "Azathioprine",
      type: "Immunosuppressant",
      usage: "Controls immune response"
    },
    {
      name: "Methotrexate",
      type: "Immunosuppressant",
      usage: "Used in chronic cases"
    },
    {
      name: "NSAIDs",
      type: "Pain relief",
      usage: "Reduces pain and swelling"
    }
  ],

  dietRecommendations: [
    "Anti-inflammatory diet",
    "Omega-3 rich foods",
    "Avoid processed foods",
    "Stay hydrated",
    "Limit salt if swelling present"
  ],

  severityLevels: {
    mild: {
      description: "Localized skin purpura without systemic involvement",
      treatmentTime: "Weeks with treatment"
    },
    moderate: {
      description: "Widespread skin lesions with discomfort",
      treatmentTime: "1–3 months"
    },
    severe: {
      description: "Systemic vasculitis affecting organs",
      treatmentTime: "Long-term management required"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid spreading purple spots",
      "Painful skin lesions",
      "Fever with rash",
      "Organ-related symptoms (kidney, joint pain)",
      "Ulcer formation"
    ]
  },

  emergencyWarning: [
    "Sudden widespread purpura",
    "Severe abdominal or kidney symptoms",
    "High fever with rash",
    "Skin necrosis or ulcers"
  ]
};

export default vasculitisData;