const benignTumorsData = {
  disease: "Benign Tumors",
  confidence: 94,
  severity: "Mild",

  overview: {
    description:
      "Benign tumors are non-cancerous growths of tissue that do not spread to other parts of the body. While generally harmless, some can cause discomfort or cosmetic concerns depending on size and location.",
    common_age_group: "Any age, more common in adults",
    contagious: false,
    chronic: false
  },

  symptoms: [
    "Painless lumps or bumps under the skin",
    "Slow-growing mass",
    "Smooth, movable or firm to touch",
    "Occasional tenderness if pressing nearby nerves",
    "Changes in skin appearance over the tumor"
  ],

  causes: [
    "Genetic predisposition",
    "Abnormal cell growth",
    "Hormonal influences",
    "Chronic irritation in some cases",
    "Unknown in many cases"
  ],

  recommendedTreatment: [
    "Observation for small, harmless tumors",
    "Surgical removal if tumor is large, painful, or cosmetically concerning",
    "Laser therapy for surface tumors",
    "Cryotherapy for certain skin tumors",
    "Medication if hormone-related or symptomatic"
  ],

  precautions: [
    "Monitor for sudden growth or changes",
    "Avoid self-popping or pressing the tumor",
    "Consult a doctor if pain, bleeding, or rapid growth occurs",
    "Regular skin or health check-ups"
  ],

  skincareRoutine: [
    {
      step: "Cleansing",
      title: "Gentle daily cleanser",
      description: "Maintain healthy skin and avoid irritation around tumor"
    },
    {
      step: "Moisturizer",
      title: "Non-comedogenic moisturizer",
      description: "Keep surrounding skin hydrated"
    },
    {
      step: "Sun Protection",
      title: "SPF 30+ sunscreen",
      description: "Prevent sun-induced growth changes on skin tumors"
    }
  ],

  homeRemedies: [
    "Avoid applying harsh chemicals",
    "Use warm compress if swelling occurs",
    "Gentle massage if recommended by a doctor",
    "Maintain healthy diet to support tissue health"
  ],

  medicineSuggestions: [
    {
      name: "Pain relievers (if needed)",
      type: "Over-the-counter",
      usage: "For discomfort or tenderness"
    },
    {
      name: "Topical creams (if recommended)",
      type: "Prescription or OTC",
      usage: "For skin surface tumors or cosmetic concerns"
    }
  ],

  dietRecommendations: [
    "High antioxidant foods (fruits, vegetables)",
    "Avoid excessive processed foods",
    "Maintain balanced protein intake",
    "Stay hydrated"
  ],

  severityLevels: {
    mild: {
      description: "Small, harmless, non-growing tumors",
      treatmentTime: "Observation"
    },
    moderate: {
      description: "Larger tumors causing minor discomfort",
      treatmentTime: "Surgical or non-invasive treatment as needed"
    },
    severe: {
      description: "Rarely, large tumors causing functional or cosmetic problems",
      treatmentTime: "Surgical removal or specialist intervention"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid growth",
      "Pain or bleeding",
      "Changes in color or texture",
      "Cosmetic or functional concerns"
    ]
  },

  emergencyWarning: [
    "Sudden increase in size",
    "Severe pain",
    "Infection around the tumor",
    "Unexpected bleeding or ulceration"
  ]
};

export default benignTumorsData;