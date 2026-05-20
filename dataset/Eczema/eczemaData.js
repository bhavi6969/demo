const eczemaData = {
  disease: "Eczema",
  confidence: 91,
  severity: "Mild to Moderate",

  overview: {
    description:
      "Eczema, also known as atopic dermatitis, is a chronic inflammatory skin condition that causes itchy, red, and dry patches. It often occurs in response to environmental triggers, allergens, or genetic factors.",
    common_age_group: "Infants, children, and adults; often begins in childhood",
    contagious: false,
    chronic: true
  },

  symptoms: [
    "Itchy, red, and inflamed skin",
    "Dry, scaly patches",
    "Crusting or oozing in severe cases",
    "Thickened skin from chronic scratching",
    "Discoloration of affected areas"
  ],

  causes: [
    "Genetic predisposition (family history of eczema, asthma, or allergies)",
    "Environmental triggers (pollens, dust, harsh soaps)",
    "Skin barrier dysfunction",
    "Stress",
    "Irritants such as detergents or fragrances"
  ],

  recommendedTreatment: [
    "Topical corticosteroids for flare-ups",
    "Emollient moisturizers daily",
    "Antihistamines for severe itching",
    "Avoid triggers and allergens",
    "Immunomodulators (Tacrolimus or Pimecrolimus) for chronic eczema"
  ],

  precautions: [
    "Avoid scratching to prevent infection",
    "Use mild soap and fragrance-free products",
    "Keep skin hydrated with moisturizers",
    "Wear breathable, soft clothing",
    "Monitor flare-ups and triggers"
  ],

  skincareRoutine: [
    {
      step: "Cleansing",
      title: "Gentle, fragrance-free cleanser",
      description: "Prevents irritation and maintains skin barrier"
    },
    {
      step: "Moisturizer",
      title: "Emollient-rich cream or ointment",
      description: "Applies immediately after bathing to lock in moisture"
    },
    {
      step: "Protection",
      title: "Soft cotton clothing",
      description: "Reduces friction and irritation on sensitive skin"
    }
  ],

  homeRemedies: [
    "Oatmeal baths to soothe itching",
    "Cool compresses on inflamed areas",
    "Apply coconut oil or aloe vera for hydration",
    "Avoid hot showers and harsh soaps",
    "Keep nails short to prevent scratching damage"
  ],

  medicineSuggestions: [
    {
      name: "Hydrocortisone cream",
      type: "Topical corticosteroid",
      usage: "Apply to affected areas 1-2 times daily"
    },
    {
      name: "Tacrolimus ointment",
      type: "Topical immunomodulator",
      usage: "Use for chronic eczema under dermatologist guidance"
    },
    {
      name: "Oral antihistamines",
      type: "OTC or prescription",
      usage: "Reduces severe itching"
    }
  ],

  dietRecommendations: [
    "Maintain hydration",
    "Avoid foods that trigger flare-ups (dairy, nuts, or gluten if sensitive)",
    "Increase anti-inflammatory foods (fruits, vegetables, omega-3)",
    "Balanced diet to support immune health"
  ],

  severityLevels: {
    mild: {
      description: "Small patches with mild itching",
      treatmentTime: "1-2 weeks with moisturizers and mild topical therapy"
    },
    moderate: {
      description: "Widespread rash with moderate itching and inflammation",
      treatmentTime: "2-4 weeks with topical corticosteroids"
    },
    severe: {
      description: "Extensive rash, oozing, or thickened skin from chronic scratching",
      treatmentTime: "Long-term therapy, may require immunomodulators"
    }
  },

  doctorConsultation: {
    recommended: true,
    whenToVisit: [
      "Severe itching affecting sleep or daily life",
      "Secondary infection (pus, oozing, crusting)",
      "Rapid worsening of rash",
      "Persistent flare-ups despite treatment"
    ]
  },

  emergencyWarning: [
    "Signs of infection (fever, pus, spreading redness)",
    "Severe swelling",
    "Severe allergic reaction",
    "Rapidly worsening skin lesions"
  ]
};

export default eczemaData;
