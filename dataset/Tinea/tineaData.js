// src/data/tineaData.js
const tineaData = {
  disease: "Tinea (Fungal Infection / Ringworm)",
  confidence: 94,
  severity: "Mild to Moderate",

  overview: {
    description:
      "Tinea is a fungal skin infection caused by dermatophytes. It affects different body parts and appears as red, itchy, circular rashes with clear centers (ring-like appearance).",
    common_age_group: "All ages",
    contagious: true,
    chronic: false
  },

  types: [
    "Tinea corporis (body ringworm)",
    "Tinea pedis (athlete’s foot)",
    "Tinea cruris (jock itch)",
    "Tinea capitis (scalp infection)",
    "Tinea unguium (nail infection)"
  ],

  symptoms: [
    "Red circular rash with raised edges",
    "Itching and irritation",
    "Scaly or peeling skin",
    "Clear center in ring-shaped lesion",
    "Cracked skin (especially feet)",
    "Hair loss in scalp infection"
  ],

  causes: [
    "Fungal (dermatophyte) infection",
    "Direct skin contact with infected person/animal",
    "Sharing towels, clothes, or combs",
    "Warm and humid environments",
    "Poor hygiene or sweating"
  ],

  recommendedTreatment: [
    "Topical antifungal creams (clotrimazole, terbinafine)",
    "Oral antifungal medication for severe cases",
    "Keep area clean and dry",
    "Anti-fungal powders for prevention",
    "Avoid scratching and spreading infection"
  ],

  precautions: [
    "Do not share personal items",
    "Keep skin dry and clean",
    "Wash clothes and towels regularly",
    "Avoid walking barefoot in public showers",
    "Treat pets if infected"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Antifungal or gentle antibacterial wash",
      description: "Helps reduce fungal growth"
    },
    {
      step: "Treatment",
      title: "Clotrimazole / Terbinafine cream",
      description: "Apply directly on infected area"
    },
    {
      step: "Hygiene",
      title: "Keep skin dry",
      description: "Moist environments worsen fungal growth"
    },
    {
      step: "Protection",
      title: "Loose breathable clothing",
      description: "Reduces sweat and irritation"
    }
  ],

  homeRemedies: [
    "Apply coconut oil (mild antifungal properties)",
    "Tea tree oil (diluted)",
    "Keep area dry at all times",
    "Use clean cotton clothing",
    "Warm salt water rinse"
  ],

  medicineSuggestions: [
    {
      name: "Clotrimazole cream",
      type: "Topical antifungal",
      usage: "First-line treatment for fungal infection"
    },
    {
      name: "Terbinafine cream",
      type: "Topical antifungal",
      usage: "Kills dermatophyte fungi"
    },
    {
      name: "Fluconazole",
      type: "Oral antifungal",
      usage: "For severe or widespread infections"
    }
  ],

  dietRecommendations: [
    "Probiotic-rich foods (curd, yogurt)",
    "Reduce sugar intake (fungus feeds on sugar)",
    "Stay hydrated",
    "Balanced immune-boosting diet"
  ],

  severityLevels: {
    mild: {
      description: "Small localized itchy ring-shaped rash",
      treatmentTime: "1–2 weeks with topical antifungal"
    },
    moderate: {
      description: "Multiple patches or spreading infection",
      treatmentTime: "2–4 weeks with topical + oral treatment"
    },
    severe: {
      description: "Widespread infection or scalp/nail involvement",
      treatmentTime: "1–3 months with systemic antifungals"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid spreading rash",
      "No improvement after 1 week of treatment",
      "Scalp or nail infection",
      "Severe itching or pain",
      "Recurring infections"
    ]
  },

  emergencyWarning: [
    "Severe skin cracking or bleeding",
    "Fever with spreading rash",
    "Infection not responding to antifungals",
    "Severe inflammation or pus formation"
  ]
};

export default tineaData;