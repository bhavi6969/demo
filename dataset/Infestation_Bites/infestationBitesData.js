const infestationBitesData = {
  disease: "Infestation / Bites",
  confidence: 89,
  severity: "Mild to Moderate",

  overview: {
    description:
      "Infestation or bites occur when insects, mites, or other arthropods bite the skin, causing irritation, redness, and itching. Common examples include mosquito bites, bedbug bites, scabies, and flea bites.",
    common_age_group: "All ages",
    contagious: false, // except scabies which can spread through close contact
    chronic: false
  },

  symptoms: [
    "Red, raised, itchy bumps",
    "Blisters in severe cases",
    "Clustered or linear bite marks",
    "Inflammation or swelling",
    "Secondary infection from scratching"
  ],

  causes: [
    "Mosquitoes, fleas, ticks, bedbugs",
    "Mites (scabies)",
    "Allergic reaction to insect saliva or venom",
    "Poor hygiene or infested environment"
  ],

  recommendedTreatment: [
    "Topical antihistamine creams for itch relief",
    "Oral antihistamines if severe itching",
    "Hydrocortisone cream for inflammation",
    "Treat scabies with permethrin or benzyl benzoate cream",
    "Clean bedding, clothes, and environment to remove insects"
  ],

  precautions: [
    "Avoid scratching to prevent secondary infection",
    "Wear protective clothing in insect-prone areas",
    "Keep living areas clean",
    "Use insect repellents",
    "Avoid sharing bedding if contagious (scabies)"
  ],

  skincareRoutine: [
    {
      step: "Cleansing",
      title: "Mild, gentle soap",
      description: "Reduces irritation and prevents infection"
    },
    {
      step: "Moisturizer",
      title: "Fragrance-free moisturizer",
      description: "Prevents dryness from scratching or treatment"
    },
    {
      step: "Protection",
      title: "Apply insect repellent",
      description: "Prevents further bites"
    }
  ],

  homeRemedies: [
    "Cold compress to reduce swelling",
    "Oatmeal paste for soothing itching",
    "Aloe vera gel for inflammation",
    "Keep affected areas clean and dry",
    "Avoid scratching to prevent scarring"
  ],

  medicineSuggestions: [
    {
      name: "Topical antihistamine cream",
      type: "OTC",
      usage: "Apply 1-2 times daily for itch relief"
    },
    {
      name: "Hydrocortisone cream",
      type: "OTC",
      usage: "Apply to inflamed areas to reduce redness"
    },
    {
      name: "Oral antihistamines (Cetirizine, Loratadine)",
      type: "OTC",
      usage: "Take once daily for severe itching"
    },
    {
      name: "Permethrin cream",
      type: "Prescription",
      usage: "For scabies infestation, apply as directed"
    }
  ],

  dietRecommendations: [
    "Stay hydrated",
    "Vitamin C and Zinc-rich foods to support skin healing",
    "Balanced diet to support immunity",
    "Avoid foods that may trigger allergic reactions if sensitive"
  ],

  severityLevels: {
    mild: {
      description: "Few bites with mild itching",
      treatmentTime: "A few days with topical care"
    },
    moderate: {
      description: "Multiple bites or moderate rash with discomfort",
      treatmentTime: "1-2 weeks with topical/oral treatment"
    },
    severe: {
      description: "Large infestation, severe itching, or secondary infection",
      treatmentTime: "2-4 weeks with systemic treatment and environmental control"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Severe or persistent itching",
      "Signs of infection (pus, redness, swelling)",
      "Large area affected",
      "Infestation not resolving despite home care"
    ]
  },

  emergencyWarning: [
    "Allergic reaction (swelling of face, lips, throat)",
    "High fever with secondary infection",
    "Rapid spread or multiple infestations",
    "Severe blistering or open wounds"
  ]
};

export default infestationBitesData;