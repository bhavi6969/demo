const herpesData = {
  disease: "Herpes Simplex",
  confidence: 93,
  severity: "Moderate",
  overview: {
    description: "A viral infection that causes contagious sores, most often around the mouth or on the genitals.",
    chronic: true,
    common_age_group: "All ages"
  },
  symptoms: [
    "Blistering sores (cold sores)",
    "Pain or itching before sores appear",
    "Swollen lymph nodes",
    "Fever or muscle aches (during initial outbreak)"
  ],
  recommendedTreatment: [
    "Antiviral medications",
    "Over-the-counter cold sore creams",
    "Pain relievers",
    "Warm or cold compresses"
  ],
  precautions: [
    "Avoid kissing and skin contact when sores are present",
    "Do not share utensils, towels, or lip balm",
    "Wash hands carefully after touching sores"
  ],
  skincareRoutine: [
    {
      title: "Keep Clean",
      description: "Wash the affected area gently with water and mild soap"
    },
    {
      title: "Keep Dry",
      description: "Dab dry, don't rub, to prevent spreading the virus"
    }
  ],
  homeRemedies: [
    "Ice or cold compress on the sore",
    "Lemon balm extract",
    "Aloe vera cooling gel"
  ],
  medicineSuggestions: [
    {
      name: "Valacyclovir (Valtrex)",
      type: "Oral Antiviral",
      usage: "Take as prescribed to speed up healing"
    },
    {
      name: "Docosanol (Abreva)",
      type: "Topical Cream OTC",
      usage: "Apply at the first sign of a cold sore"
    }
  ]
};

export default herpesData;
