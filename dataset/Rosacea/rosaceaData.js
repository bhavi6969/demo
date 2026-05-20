// src/data/rosaceaData.js
const rosaceaData = {
  disease: "Rosacea",
  confidence: 91,
  severity: "Moderate",

  overview: {
    description:
      "Rosacea is a chronic skin condition that causes facial redness, visible blood vessels, and sometimes acne-like bumps, primarily on the cheeks, nose, chin, and forehead.",
    common_age_group: "30-50 years",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Persistent facial redness",
    "Visible small blood vessels (telangiectasia)",
    "Acne-like bumps or pimples",
    "Burning or stinging sensation",
    "Dry or rough skin",
    "Swollen or thickened skin (in severe cases, especially nose)"
  ],

  causes: [
    "Genetic predisposition",
    "Immune system dysfunction",
    "Triggers such as sun exposure, hot drinks, alcohol",
    "Stress or spicy foods",
    "Demodex mite overgrowth"
  ],

  recommendedTreatment: [
    "Topical metronidazole or azelaic acid",
    "Oral antibiotics for inflammatory lesions",
    "Laser or IPL therapy for visible blood vessels",
    "Skincare avoiding irritants",
    "Sun protection with broad-spectrum sunscreen"
  ],

  precautions: [
    "Avoid known triggers (alcohol, spicy food, extreme temperatures)",
    "Use gentle skincare products",
    "Sun protection daily",
    "Avoid excessive scrubbing of face",
    "Monitor for flare-ups and consult dermatologist"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle, non-foaming cleanser",
      description: "Reduces irritation and maintains skin barrier"
    },
    {
      step: "Treatment",
      title: "Topical metronidazole or azelaic acid",
      description: "Apply as prescribed on affected areas"
    },
    {
      step: "Moisturizer",
      title: "Hypoallergenic, fragrance-free moisturizer",
      description: "Keeps skin hydrated and calms irritation"
    },
    {
      step: "Sun Protection",
      title: "SPF 50+ broad-spectrum sunscreen",
      description: "Prevents flare-ups triggered by sun exposure"
    }
  ],

  homeRemedies: [
    "Cool compresses to reduce redness",
    "Avoid hot showers",
    "Use green-tinted makeup to neutralize redness",
    "Apply aloe vera or chamomile to calm skin",
    "Reduce stress and avoid triggers"
  ],

  medicineSuggestions: [
    {
      name: "Topical Metronidazole",
      type: "Prescription",
      usage: "Reduces inflammation and redness"
    },
    {
      name: "Topical Azelaic Acid",
      type: "Prescription",
      usage: "Helps control bumps and redness"
    },
    {
      name: "Oral Doxycycline",
      type: "Prescription",
      usage: "Used for moderate to severe inflammatory rosacea"
    }
  ],

  dietRecommendations: [
    "Avoid alcohol and spicy foods",
    "Limit hot beverages",
    "Eat anti-inflammatory foods (fruits, vegetables, omega-3 rich foods)",
    "Stay hydrated"
  ],

  severityLevels: {
    mild: {
      description: "Mild redness with occasional bumps",
      treatmentTime: "Weeks to months with topical therapy"
    },
    moderate: {
      description: "Persistent redness with inflammatory lesions",
      treatmentTime: "Months, may require oral therapy"
    },
    severe: {
      description: "Thickened skin, rhinophyma, extensive inflammation",
      treatmentTime: "Long-term management with medications and procedures"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Persistent redness or discomfort",
      "Rapid flare-ups",
      "Thickening of skin (especially nose)",
      "Acne-like bumps not improving with home care",
      "Frequent irritation or burning sensations"
    ]
  },

  emergencyWarning: [
    "Severe swelling or pain",
    "Signs of infection (pus, severe redness)",
    "Rapid worsening of skin lesions",
    "Sudden visual changes if ocular rosacea develops"
  ]
};

export default rosaceaData;