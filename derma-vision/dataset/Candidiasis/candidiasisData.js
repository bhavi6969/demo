const candidiasisData = {
  disease: "Candidiasis",
  confidence: 92,
  severity: "Mild to Moderate",

  overview: {
    description:
      "Candidiasis is a fungal infection caused by Candida species, most commonly Candida albicans. It can affect the mouth, skin, nails, and genital areas. Risk increases in immunocompromised individuals or after antibiotic use.",
    common_age_group: "All ages, higher risk in infants, elderly, and immunocompromised adults",
    contagious: false,
    chronic: false
  },

  symptoms: [
    "White patches on tongue or oral mucosa (oral thrush)",
    "Red, itchy rash in skin folds",
    "Pain or burning sensation in genital area",
    "Cracked skin at corners of mouth",
    "Thickened nails with discoloration"
  ],

  causes: [
    "Overgrowth of Candida fungus",
    "Prolonged antibiotic use",
    "Weakened immune system (HIV, chemotherapy)",
    "Diabetes",
    "Hormonal changes (pregnancy, oral contraceptives)"
  ],

  recommendedTreatment: [
    "Topical antifungal creams (Clotrimazole, Miconazole)",
    "Oral antifungals for systemic infection (Fluconazole)",
    "Antifungal mouthwash for oral thrush",
    "Maintain dry, clean skin folds",
    "Treat underlying causes such as diabetes or immunosuppression"
  ],

  precautions: [
    "Keep skin dry and clean",
    "Avoid tight, non-breathable clothing",
    "Maintain good oral hygiene",
    "Avoid unnecessary antibiotics",
    "Regular monitoring for chronic infections"
  ],

  skincareRoutine: [
    {
      step: "Cleansing",
      title: "Gentle antifungal or mild soap",
      description: "Prevents fungal overgrowth and irritation"
    },
    {
      step: "Moisturizer",
      title: "Non-greasy, breathable moisturizer",
      description: "Keeps skin healthy without trapping moisture"
    },
    {
      step: "Protection",
      title: "Loose breathable clothing",
      description: "Reduces moisture accumulation in skin folds"
    }
  ],

  homeRemedies: [
    "Use unsweetened yogurt or probiotics to restore flora",
    "Apply coconut oil topically in mild skin infections",
    "Keep affected areas dry",
    "Wear cotton clothing and breathable fabrics",
    "Avoid sugar-rich diets that feed Candida"
  ],

  medicineSuggestions: [
    {
      name: "Clotrimazole cream",
      type: "Topical antifungal",
      usage: "Apply to affected skin 1-2 times daily"
    },
    {
      name: "Miconazole gel",
      type: "Topical antifungal",
      usage: "Apply to oral or skin lesions as directed"
    },
    {
      name: "Fluconazole",
      type: "Oral antifungal",
      usage: "Used for systemic or severe infections"
    }
  ],

  dietRecommendations: [
    "Limit sugar and refined carbohydrates",
    "Increase probiotics (yogurt, kefir)",
    "Stay hydrated",
    "Eat a balanced diet rich in vegetables and fiber"
  ],

  severityLevels: {
    mild: {
      description: "Localized patches or rash, mild discomfort",
      treatmentTime: "1-2 weeks with topical therapy"
    },
    moderate: {
      description: "Widespread rash or oral lesions, moderate discomfort",
      treatmentTime: "2-4 weeks, may require systemic therapy"
    },
    severe: {
      description: "Systemic infection or resistant Candida",
      treatmentTime: "4+ weeks with oral antifungal treatment"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Persistent or recurrent infections",
      "Systemic symptoms (fever, malaise)",
      "Severe oral thrush affecting eating or swallowing",
      "Signs of secondary bacterial infection"
    ]
  },

  emergencyWarning: [
    "Fever with widespread rash",
    "Difficulty swallowing or breathing",
    "Rapid spread of infection",
    "Severe pain or bleeding lesions"
  ]
};

export default candidiasisData;