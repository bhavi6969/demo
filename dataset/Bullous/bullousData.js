const bullousData = {
  disease: "Bullous Disorder",
  confidence: 93,
  severity: "Moderate to Severe",

  overview: {
    description:
      "Bullous disorders are autoimmune skin diseases characterized by large, fluid-filled blisters (bullae) on the skin and mucous membranes. They can be chronic and may require long-term treatment.",
    common_age_group: "Adults over 50 (for Bullous Pemphigoid), young to middle-aged adults (for Pemphigus Vulgaris)",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Large, tense blisters on skin",
    "Painful erosions after blisters rupture",
    "Itching and irritation",
    "Mucosal involvement (mouth, eyes, genitals)",
    "Redness or inflammation around blisters"
  ],

  causes: [
    "Autoimmune attack on skin/mucous membrane proteins",
    "Genetic predisposition",
    "Certain medications (penicillin, NSAIDs)",
    "Chronic UV exposure (sometimes a trigger)",
    "Unknown triggers in many cases"
  ],

  recommendedTreatment: [
    "Topical corticosteroids for mild cases",
    "Systemic corticosteroids for moderate to severe cases",
    "Immunosuppressants (Azathioprine, Mycophenolate)",
    "Rituximab for resistant autoimmune cases",
    "Wound care for ruptured bullae"
  ],

  precautions: [
    "Avoid trauma to skin to prevent new blisters",
    "Maintain good hygiene to prevent infection",
    "Avoid known triggering medications",
    "Regular dermatology follow-up",
    "Monitor for systemic side effects of treatment"
  ],

  skincareRoutine: [
    {
      step: "Cleansing",
      title: "Gentle, fragrance-free cleanser",
      description: "Minimizes irritation and prevents infection"
    },
    {
      step: "Moisturizer",
      title: "Emollient-rich moisturizer",
      description: "Helps maintain skin barrier and hydration"
    },
    {
      step: "Sun Protection",
      title: "Broad-spectrum SPF 50+",
      description: "Protects sensitive skin from UV-induced flares"
    }
  ],

  homeRemedies: [
    "Cool compresses to reduce itching",
    "Oatmeal baths for soothing",
    "Avoid tight clothing that rubs blisters",
    "Maintain soft bedding and gentle friction-free environment"
  ],

  medicineSuggestions: [
    {
      name: "Prednisone",
      type: "Systemic corticosteroid",
      usage: "Reduces inflammation and autoimmune activity"
    },
    {
      name: "Azathioprine",
      type: "Immunosuppressant",
      usage: "Used for long-term immune control"
    },
    {
      name: "Mycophenolate Mofetil",
      type: "Immunosuppressant",
      usage: "Alternative for steroid-sparing therapy"
    },
    {
      name: "Rituximab",
      type: "Biologic therapy",
      usage: "For severe or resistant cases"
    }
  ],

  dietRecommendations: [
    "High-protein diet to support skin healing",
    "Vitamin C and zinc-rich foods for repair",
    "Hydration to maintain skin barrier",
    "Avoid foods triggering autoimmune flares (if known)"
  ],

  severityLevels: {
    mild: {
      description: "Few localized blisters with minimal discomfort",
      treatmentTime: "Weeks to months with topical therapy"
    },
    moderate: {
      description: "Widespread blisters with mucosal involvement",
      treatmentTime: "Months with systemic therapy"
    },
    severe: {
      description: "Extensive skin and mucous membrane involvement, risk of infection",
      treatmentTime: "Long-term systemic treatment and hospitalization if needed"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid spread of blisters",
      "Painful or bleeding erosions",
      "Signs of infection",
      "Difficulty eating or swallowing due to oral involvement"
    ]
  },

  emergencyWarning: [
    "Large areas of skin detachment",
    "High fever or signs of sepsis",
    "Severe pain or fluid loss",
    "Respiratory involvement in mucosal disease"
  ]
};

export default bullousData;