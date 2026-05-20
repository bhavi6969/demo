const drugEruptionData = {
  disease: "Drug Eruption",
  confidence: 90,
  severity: "Mild to Severe",

  overview: {
    description:
      "Drug eruption is an adverse skin reaction caused by medications. It can range from mild rashes to severe, life-threatening reactions. Early detection and discontinuation of the offending drug is critical.",
    common_age_group: "All ages, more common in adults",
    contagious: false,
    chronic: false
  },

  symptoms: [
    "Red, itchy rashes or hives",
    "Blistering in severe cases",
    "Swelling of lips, face, or extremities",
    "Fever or malaise",
    "Peeling or exfoliation of skin in severe reactions"
  ],

  causes: [
    "Antibiotics (penicillin, sulfonamides)",
    "NSAIDs (ibuprofen, naproxen)",
    "Anticonvulsants (phenytoin, carbamazepine)",
    "Chemotherapy drugs",
    "Allergic or hypersensitivity reactions"
  ],

  recommendedTreatment: [
    "Immediate discontinuation of suspected drug",
    "Topical corticosteroids for mild rash",
    "Oral antihistamines to reduce itching",
    "Systemic corticosteroids for severe eruptions",
    "Hospitalization in case of toxic epidermal necrolysis (TEN)"
  ],

  precautions: [
    "Inform doctor about all drug allergies",
    "Avoid re-exposure to offending medication",
    "Monitor for new or worsening symptoms",
    "Seek immediate care for systemic symptoms",
    "Maintain skin hydration and avoid irritants"
  ],

  skincareRoutine: [
    {
      step: "Cleansing",
      title: "Gentle, fragrance-free cleanser",
      description: "Avoids further irritation to affected skin"
    },
    {
      step: "Moisturizer",
      title: "Hypoallergenic moisturizer",
      description: "Keeps skin hydrated and reduces dryness"
    },
    {
      step: "Protection",
      title: "Soft clothing",
      description: "Avoids friction and further irritation"
    }
  ],

  homeRemedies: [
    "Cool compresses to relieve itching",
    "Oatmeal baths for soothing skin",
    "Avoid scratching",
    "Loose cotton clothing"
  ],

  medicineSuggestions: [
    {
      name: "Oral Antihistamines",
      type: "OTC",
      usage: "Reduces itching and rash"
    },
    {
      name: "Topical Corticosteroids",
      type: "Prescription",
      usage: "Reduces inflammation and redness"
    },
    {
      name: "Systemic Corticosteroids",
      type: "Prescription",
      usage: "Used in severe drug eruptions"
    }
  ],

  dietRecommendations: [
    "Maintain hydration",
    "Eat anti-inflammatory foods (fruits, vegetables)",
    "Avoid alcohol and processed foods",
    "Support immune system with balanced diet"
  ],

  severityLevels: {
    mild: {
      description: "Localized rash, mild itching",
      treatmentTime: "1-2 weeks"
    },
    moderate: {
      description: "Widespread rash, moderate discomfort",
      treatmentTime: "2-4 weeks"
    },
    severe: {
      description: "Extensive skin involvement, systemic symptoms",
      treatmentTime: "May require hospitalization and long-term treatment"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid spread of rash",
      "Fever or malaise",
      "Blistering or peeling skin",
      "Swelling of face, lips, or tongue"
    ]
  },

  emergencyWarning: [
    "Difficulty breathing or swallowing",
    "Extensive blistering",
    "High fever",
    "Signs of toxic epidermal necrolysis (TEN)"
  ]
};

export default drugEruptionData;