const actinicKeratosisData = {
  disease: "Actinic Keratosis",
  confidence: 95,
  severity: "Mild to Moderate",

  overview: {
    description:
      "Actinic Keratosis (AK) is a rough, scaly patch on the skin caused by years of sun exposure. It is considered a precancerous condition and can potentially develop into squamous cell carcinoma if untreated.",
    common_age_group: "40+ years",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Rough, dry, scaly patches on sun-exposed skin",
    "Pink, red, or brownish spots",
    "Itching or burning sensation",
    "Tenderness when touched",
    "Occasional bleeding or crusting"
  ],

  causes: [
    "Chronic sun exposure (UV radiation)",
    "Fair skin type",
    "Age above 40",
    "Weakened immune system",
    "History of sunburns"
  ],

  recommendedTreatment: [
    "Topical 5-fluorouracil cream",
    "Imiquimod cream for immune response",
    "Cryotherapy (liquid nitrogen treatment)",
    "Photodynamic therapy",
    "Laser therapy for persistent lesions"
  ],

  precautions: [
    "Avoid excessive sun exposure",
    "Apply broad-spectrum sunscreen daily",
    "Wear protective clothing and hats",
    "Regular skin checks by a dermatologist",
    "Avoid tanning beds"
  ],

  skincareRoutine: [
    {
      step: "Cleanser",
      title: "Gentle non-irritating cleanser",
      description: "Maintains skin barrier without irritation"
    },
    {
      step: "Moisturizer",
      title: "Repairing moisturizer",
      description: "Hydrates and protects sun-damaged skin"
    },
    {
      step: "Sunscreen",
      title: "Broad-spectrum SPF 50+",
      description: "Prevents new actinic keratosis formation"
    }
  ],

  homeRemedies: [
    "Aloe vera gel for soothing skin",
    "Green tea extracts for antioxidant effects",
    "Avoid direct sun exposure during peak hours",
    "Wear hats and protective clothing outdoors"
  ],

  medicineSuggestions: [
    {
      name: "5-Fluorouracil Cream",
      type: "Topical Prescription",
      usage: "Removes precancerous skin cells"
    },
    {
      name: "Imiquimod Cream",
      type: "Topical Immune Modulator",
      usage: "Stimulates immune system to attack abnormal cells"
    },
    {
      name: "Diclofenac Gel",
      type: "Topical NSAID",
      usage: "Reduces inflammation and lesion growth"
    }
  ],

  dietRecommendations: [
    "Eat antioxidant-rich foods (berries, leafy greens)",
    "Increase vitamin D intake through diet or supplements",
    "Stay hydrated",
    "Reduce processed foods"
  ],

  severityLevels: {
    mild: {
      description: "Small rough patches, minimal discomfort",
      treatmentTime: "2-4 weeks"
    },
    moderate: {
      description: "Multiple rough patches, slight tenderness",
      treatmentTime: "4-8 weeks"
    },
    severe: {
      description: "Large, thick lesions, may bleed",
      treatmentTime: "8-12 weeks with professional treatment"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Rapidly growing lesion",
      "Persistent scaly patch",
      "Bleeding or crusting",
      "Multiple lesions over time"
    ]
  },

  emergencyWarning: [
    "Sudden color changes in lesion",
    "Excessive bleeding",
    "Painful swelling",
    "Signs of infection"
  ]
};

export default actinicKeratosisData;