// src/data/psoriasisData.js
const psoriasisData = {
  disease: "Psoriasis",
  confidence: 93,
  severity: "Moderate",

  overview: {
    description:
      "Psoriasis is a chronic autoimmune skin disorder that causes rapid skin cell buildup, leading to red, scaly, itchy patches. It can affect joints in some cases (psoriatic arthritis).",
    common_age_group: "15-35 years and 50-60 years",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Red, raised patches of skin",
    "Thick silvery scales",
    "Itching or burning sensation",
    "Dry or cracked skin that may bleed",
    "Nail changes (pitting or discoloration)",
    "Joint pain if psoriatic arthritis develops"
  ],

  causes: [
    "Immune system dysfunction",
    "Genetic predisposition",
    "Environmental triggers (stress, infections, weather)",
    "Medications (beta-blockers, lithium)",
    "Lifestyle factors (alcohol, smoking)"
  ],

  recommendedTreatment: [
    "Topical corticosteroid creams",
    "Vitamin D analogues (calcipotriol)",
    "Moisturizers to reduce dryness",
    "Phototherapy (UVB light treatment)",
    "Systemic or biologic medications for severe cases"
  ],

  precautions: [
    "Avoid skin injury (Koebner phenomenon)",
    "Keep skin moisturized",
    "Avoid harsh soaps and detergents",
    "Manage stress levels",
    "Monitor for joint pain"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle, fragrance-free cleanser",
      description: "Reduces irritation and dryness"
    },
    {
      step: "Treatment",
      title: "Topical corticosteroid or vitamin D analog",
      description: "Apply on affected patches as prescribed"
    },
    {
      step: "Moisturizer",
      title: "Thick emollient cream",
      description: "Keeps skin hydrated and reduces flaking"
    },
    {
      step: "Sun Protection",
      title: "SPF 50+ sunscreen",
      description: "Prevents flare-ups due to sun exposure"
    }
  ],

  homeRemedies: [
    "Warm baths with oatmeal or Epsom salt",
    "Aloe vera gel for soothing",
    "Moisturize daily",
    "Manage stress with meditation or yoga",
    "Avoid alcohol and smoking"
  ],

  medicineSuggestions: [
    {
      name: "Hydrocortisone 1% cream",
      type: "Topical OTC",
      usage: "Reduces redness and inflammation"
    },
    {
      name: "Calcipotriol",
      type: "Topical Vitamin D analog",
      usage: "Slows down skin cell growth"
    },
    {
      name: "Methotrexate",
      type: "Systemic immunosuppressant",
      usage: "For severe widespread psoriasis"
    },
    {
      name: "Biologics (Adalimumab, Etanercept)",
      type: "Prescription injection",
      usage: "For moderate to severe cases"
    }
  ],

  dietRecommendations: [
    "Anti-inflammatory diet (fruits, vegetables, omega-3 rich foods)",
    "Avoid processed foods and sugar",
    "Stay hydrated",
    "Reduce alcohol intake"
  ],

  severityLevels: {
    mild: {
      description: "Small localized patches with minimal discomfort",
      treatmentTime: "Weeks to months with topical therapy"
    },
    moderate: {
      description: "Widespread patches affecting quality of life",
      treatmentTime: "Months, may require systemic therapy"
    },
    severe: {
      description: "Extensive skin involvement or psoriatic arthritis",
      treatmentTime: "Long-term management with systemic/biologic therapy"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapidly spreading patches",
      "Severe itching or pain",
      "Nail changes or joint pain",
      "No improvement with home treatments",
      "Signs of infection"
    ]
  },

  emergencyWarning: [
    "Severe skin infection",
    "High fever with widespread rash",
    "Severe joint swelling or pain",
    "Rapid worsening of lesions"
  ]
};

export default psoriasisData;