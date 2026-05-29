const urticariaData = {
  disease: "Urticaria (Hives)",
  confidence: 90,
  severity: "Moderate",
  overview: {
    description: "Red, itchy welts that result from a skin reaction to certain allergens or triggers.",
    chronic: false,
    common_age_group: "All ages"
  },
  symptoms: [
    "Raised, itchy welts (wheals)",
    "Blanching (center turns white when pressed)",
    "Swelling of the lips, eyelids, or throat (Angioedema)",
    "Welts that appear and fade repeatedly"
  ],
  recommendedTreatment: [
    "Avoid known triggers",
    "Take over-the-counter antihistamines",
    "Apply cool compresses",
    "Wear loose, smooth-textured clothing"
  ],
  precautions: [
    "Avoid hot water and harsh soaps",
    "Do not scratch the welts",
    "Monitor for difficulty breathing (seek emergency care if it occurs)"
  ],
  skincareRoutine: [
    {
      title: "Cool Showers",
      description: "Use cool or lukewarm water to soothe itching"
    },
    {
      title: "Gentle Moisturizer",
      description: "Apply a fragrance-free lotion to keep skin barrier intact"
    }
  ],
  homeRemedies: [
    "Oatmeal baths",
    "Aloe vera gel application",
    "Cold compress"
  ],
  medicineSuggestions: [
    {
      name: "Cetirizine (Zyrtec)",
      type: "Antihistamine",
      usage: "Take orally once daily"
    },
    {
      name: "Hydrocortisone 1%",
      type: "Topical Cream",
      usage: "Apply to itchy areas for temporary relief"
    }
  ]
};

export default urticariaData;
