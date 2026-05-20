// src/data/sunDamageData.js
const sunDamageData = {
  disease: "Sun Damage (Photoaging / UV Damage)",
  confidence: 96,
  severity: "Moderate",

  overview: {
    description:
      "Sun damage (photoaging) is skin damage caused by prolonged exposure to ultraviolet (UV) radiation from the sun. It leads to premature aging, pigmentation, and increased risk of skin cancer.",
    common_age_group: "20+ years (cumulative exposure)",
    contagious: false,
    chronic: true
  },

  types: [
    "Photoaging (premature aging)",
    "Sunburn",
    "Hyperpigmentation",
    "Actinic keratosis (precancerous lesions)",
    "UV-induced DNA damage"
  ],

  symptoms: [
    "Wrinkles and fine lines",
    "Dark spots (sunspots / age spots)",
    "Uneven skin tone",
    "Rough or leathery skin texture",
    "Redness or sunburn",
    "Visible blood vessels",
    "Dry and thin skin"
  ],

  causes: [
    "Prolonged UV exposure (UVA & UVB)",
    "Tanning without protection",
    "Lack of sunscreen use",
    "Indoor tanning beds",
    "Cumulative lifetime sun exposure"
  ],

  recommendedTreatment: [
    "Topical retinoids (retinol, tretinoin)",
    "Vitamin C serums for pigmentation",
    "Chemical peels for resurfacing",
    "Laser therapy for sunspots",
    "Hydrating skincare treatments",
    "Dermatologist-guided skin repair therapy"
  ],

  precautions: [
    "Use SPF 50+ sunscreen daily",
    "Avoid peak sun hours (10 AM - 4 PM)",
    "Wear protective clothing and hats",
    "Reapply sunscreen every 2-3 hours",
    "Avoid tanning beds completely"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle hydrating cleanser",
      description: "Removes dirt without stripping skin barrier"
    },
    {
      step: "Treatment",
      title: "Vitamin C + Retinol",
      description: "Reduces pigmentation and boosts collagen"
    },
    {
      step: "Moisturizer",
      title: "Barrier-repair moisturizer",
      description: "Restores skin hydration and elasticity"
    },
    {
      step: "Sun Protection",
      title: "SPF 50+ broad-spectrum sunscreen",
      description: "Prevents further UV damage"
    }
  ],

  homeRemedies: [
    "Aloe vera gel for sunburn relief",
    "Cold compress for redness",
    "Hydration (drink plenty of water)",
    "Cucumber or green tea compress",
    "Avoid further sun exposure during healing"
  ],

  medicineSuggestions: [
    {
      name: "Tretinoin (Retinoid)",
      type: "Prescription topical",
      usage: "Repairs sun-damaged skin and boosts collagen"
    },
    {
      name: "Hydroquinone",
      type: "Depigmenting agent",
      usage: "Reduces dark spots and hyperpigmentation"
    },
    {
      name: "Vitamin C serum",
      type: "OTC topical",
      usage: "Brightens skin and reduces oxidative damage"
    },
    {
      name: "Sunscreen SPF 50+",
      type: "Preventive",
      usage: "Prevents further UV damage"
    }
  ],

  dietRecommendations: [
    "Antioxidant-rich foods (berries, spinach, carrots)",
    "Omega-3 fatty acids (fish, walnuts)",
    "Stay hydrated",
    "Avoid smoking and excess alcohol"
  ],

  severityLevels: {
    mild: {
      description: "Mild tanning or slight pigmentation",
      treatmentTime: "Weeks with sunscreen and skincare"
    },
    moderate: {
      description: "Visible sunspots, wrinkles, uneven tone",
      treatmentTime: "Months with active skincare treatment"
    },
    severe: {
      description: "Deep wrinkles, actinic keratosis, precancerous changes",
      treatmentTime: "Long-term dermatological care required"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Sudden dark or changing skin spots",
      "Rough scaly patches (possible precancer)",
      "Non-healing sun-damaged areas",
      "Severe pigmentation changes",
      "Signs of skin cancer risk"
    ]
  },

  emergencyWarning: [
    "Rapidly changing skin lesion",
    "Bleeding or crusting patch",
    "Persistent rough scaly lesion",
    "Suspicious dark irregular spot"
  ]
};

export default sunDamageData;