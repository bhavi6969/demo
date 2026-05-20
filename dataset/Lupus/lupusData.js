// src/data/lupusData.js
const lupusData = {
  disease: "Systemic Lupus Erythematosus (Lupus)",
  confidence: 90,
  severity: "Moderate",

  overview: {
    description:
      "Lupus is an autoimmune disease where the immune system attacks healthy tissues, affecting skin, joints, kidneys, and other organs.",
    common_age_group: "15-45 years",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Butterfly-shaped facial rash",
    "Joint pain and swelling",
    "Fatigue",
    "Fever",
    "Hair loss",
    "Photosensitivity",
    "Mouth or nose ulcers"
  ],

  causes: [
    "Genetic predisposition",
    "Environmental triggers (sunlight, infections, stress)",
    "Hormonal factors (more common in women)",
    "Immune system dysregulation"
  ],

  recommendedTreatment: [
    "NSAIDs for joint pain",
    "Corticosteroids for inflammation",
    "Hydroxychloroquine (antimalarial drug)",
    "Immunosuppressive drugs in severe cases",
    "Lifestyle modifications: sun protection, rest, stress management"
  ],

  precautions: [
    "Avoid direct sunlight and use high SPF sunscreen",
    "Maintain regular follow-up with rheumatologist",
    "Avoid smoking",
    "Manage stress and fatigue",
    "Take medications as prescribed"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Mild, fragrance-free cleanser",
      description: "Prevents irritation and maintains skin barrier"
    },
    {
      step: "Treatment",
      title: "Topical corticosteroid for rashes",
      description: "Apply only on affected areas under doctor guidance"
    },
    {
      step: "Moisturizer",
      title: "Hypoallergenic moisturizer",
      description: "Keeps skin hydrated and reduces flares"
    },
    {
      step: "Sun Protection",
      title: "Broad-spectrum SPF 50+ sunscreen",
      description: "Essential to prevent photosensitive reactions"
    }
  ],

  homeRemedies: [
    "Cool compresses on rashes",
    "Gentle moisturizing",
    "Adequate rest and sleep",
    "Stress reduction techniques (yoga, meditation)"
  ],

  medicineSuggestions: [
    {
      name: "Hydroxychloroquine",
      type: "Prescription",
      usage: "Reduces lupus flare-ups and skin/joint symptoms"
    },
    {
      name: "Prednisone",
      type: "Oral corticosteroid",
      usage: "Reduces severe inflammation during flares"
    },
    {
      name: "Azathioprine",
      type: "Immunosuppressant",
      usage: "Used for severe systemic involvement"
    }
  ],

  dietRecommendations: [
    "Anti-inflammatory diet (fruits, vegetables, omega-3s)",
    "Low-sodium diet if on corticosteroids",
    "Avoid alfalfa sprouts (can trigger flares)",
    "Stay hydrated"
  ],

  severityLevels: {
    mild: {
      description: "Skin rashes or mild joint pain",
      treatmentTime: "Weeks to months"
    },
    moderate: {
      description: "Multiple organ involvement, moderate fatigue",
      treatmentTime: "Months"
    },
    severe: {
      description: "Severe organ involvement (kidneys, CNS)",
      treatmentTime: "Long-term, possibly lifelong management"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Persistent rashes or lesions",
      "Severe joint pain",
      "Kidney or neurological symptoms",
      "Fever or signs of infection",
      "New or worsening symptoms"
    ]
  },

  emergencyWarning: [
    "Severe chest pain or difficulty breathing",
    "Seizures or neurological changes",
    "Kidney failure signs (swelling, reduced urine)",
    "Severe infections or high fever"
  ]
};

export default lupusData;