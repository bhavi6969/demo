// src/data/wartsData.js
const wartsData = {
  disease: "Warts (Verruca)",
  confidence: 93,
  severity: "Mild",

  riskScore: 35,
  icdTag: "B07 (Viral warts)",
  spreadLevel: "Moderate (contagious via HPV virus)",

  aiNotes:
    "Detected rough, hyperkeratotic skin growth consistent with HPV-induced verruca (wart) formation.",

  overview: {
    description:
      "Warts are small, rough skin growths caused by the human papillomavirus (HPV). They are benign but contagious and can spread through direct contact.",
    common_age_group: "Children and young adults",
    contagious: true,
    chronic: false
  },

  types: [
    "Common warts (Verruca vulgaris)",
    "Plantar warts (on feet)",
    "Flat warts",
    "Filiform warts",
    "Periungual warts (around nails)"
  ],

  symptoms: [
    "Rough, grainy skin growth",
    "Small raised bumps",
    "Black dots (clotted blood vessels)",
    "Pain (especially plantar warts)",
    "Clustered wart growths"
  ],

  causes: [
    "Human papillomavirus (HPV) infection",
    "Direct skin-to-skin contact",
    "Sharing contaminated objects",
    "Walking barefoot in public areas",
    "Minor skin cuts or breaks"
  ],

  recommendedTreatment: [
    "Salicylic acid topical treatment",
    "Cryotherapy (freezing with liquid nitrogen)",
    "Laser removal",
    "Minor surgical excision",
    "Immune therapy in stubborn cases"
  ],

  precautions: [
    "Do not scratch or pick warts",
    "Avoid sharing personal items",
    "Wear footwear in public showers",
    "Keep affected area covered",
    "Maintain good hygiene"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Mild antibacterial wash",
      description: "Keeps area clean and reduces spread risk"
    },
    {
      step: "Treatment",
      title: "Salicylic acid application",
      description: "Gradually removes wart tissue"
    },
    {
      step: "Protection",
      title: "Cover wart with bandage",
      description: "Prevents spread to others"
    }
  ],

  homeRemedies: [
    "Apple cider vinegar (diluted)",
    "Duct tape occlusion method",
    "Warm water soaking",
    "Keep area dry and clean",
    "Boost immunity naturally"
  ],

  medicineSuggestions: [
    {
      name: "Salicylic acid",
      type: "Topical keratolytic",
      usage: "Breaks down wart tissue"
    },
    {
      name: "Cryotherapy",
      type: "Medical procedure",
      usage: "Freezes and destroys wart cells"
    },
    {
      name: "Imiquimod cream",
      type: "Immune response modifier",
      usage: "Helps body fight HPV infection"
    }
  ],

  dietRecommendations: [
    "Vitamin C-rich foods (immune support)",
    "Zinc-rich diet",
    "Hydration",
    "Balanced nutrition for immune strength"
  ],

  severityLevels: {
    mild: {
      description: "Small isolated warts",
      treatmentTime: "2–6 weeks"
    },
    moderate: {
      description: "Multiple or spreading warts",
      treatmentTime: "1–3 months"
    },
    severe: {
      description: "Persistent or clustered warts",
      treatmentTime: "3+ months with medical treatment"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapid spreading of warts",
      "Painful plantar warts affecting walking",
      "No improvement with OTC treatment",
      "Bleeding or infected warts",
      "Multiple recurring warts"
    ]
  },

  emergencyWarning: [
    "Severe pain in foot warts",
    "Bleeding or infected lesion",
    "Rapid multiplication of warts",
    "Immunocompromised patient with spreading warts"
  ]
};

export default wartsData;