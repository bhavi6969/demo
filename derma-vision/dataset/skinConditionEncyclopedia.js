// Skin Condition Encyclopedia
// This file provides educational content about various skin conditions, symptoms, and treatments.

const skinConditionEncyclopedia = [
  // Actinic Keratosis
  {
    disease: "Actinic Keratosis",
    description: "Actinic Keratosis (AK) is a rough, scaly patch on the skin caused by years of sun exposure. It is considered a precancerous condition and can potentially develop into squamous cell carcinoma if untreated.",
    common_age_group: "40+ years",
    contagious: false,
    chronic: true,
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
      "Apply broad-spectrum sunscreen daily"
    ]
  },
  // Acne Vulgaris
  {
    disease: "Acne Vulgaris",
    description: "Acne is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells, leading to pimples, blackheads, and whiteheads.",
    common_age_group: "Teens and young adults",
    contagious: false,
    chronic: false,
    symptoms: [
      "Whiteheads",
      "Blackheads",
      "Red pimples",
      "Oily skin",
      "Dark spots"
    ],
    causes: [
      "Excess oil production",
      "Clogged hair follicles",
      "Bacteria",
      "Hormonal changes"
    ],
    recommendedTreatment: [
      "Use salicylic acid cleanser twice daily",
      "Apply benzoyl peroxide gel",
      "Use oil-free moisturizer",
      "Avoid touching pimples"
    ],
    precautions: [
      "Do not pop pimples",
      "Wash pillow covers regularly",
      "Avoid oily skincare products",
      "Drink more water"
    ]
  },
  // Psoriasis
  {
    disease: "Psoriasis",
    description: "Psoriasis is a chronic autoimmune skin disorder that causes rapid skin cell buildup, leading to red, scaly, itchy patches. It can affect joints in some cases (psoriatic arthritis).",
    common_age_group: "15-35 years and 50-60 years",
    contagious: false,
    chronic: true,
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
    ]
  },
  // Skin Cancer
  {
    disease: "Skin Cancer",
    description: "Skin cancer is the abnormal growth of skin cells, most often caused by UV exposure from the sun or tanning beds. It includes types like melanoma, basal cell carcinoma, and squamous cell carcinoma.",
    common_age_group: "50+ years (but can occur earlier)",
    contagious: false,
    chronic: true,
    symptoms: [
      "New or changing mole",
      "Asymmetry in skin lesion",
      "Irregular borders",
      "Multiple colors in a lesion",
      "Bleeding or non-healing sore",
      "Itching or pain in mole",
      "Rapid growth of skin spot"
    ],
    causes: [
      "Excess UV radiation exposure",
      "Tanning beds usage",
      "Fair skin (less melanin protection)",
      "Genetic mutations",
      "History of sunburns",
      "Weakened immune system"
    ],
    recommendedTreatment: [
      "Surgical excision of tumor",
      "Mohs micrographic surgery",
      "Cryotherapy for small lesions",
      "Radiation therapy for advanced cases",
      "Immunotherapy for melanoma"
    ]
  },
  // Vitiligo
  {
    disease: "Vitiligo",
    description: "Vitiligo is a chronic autoimmune condition where the immune system destroys melanocytes, leading to loss of skin pigment and white patches on the skin.",
    common_age_group: "10-30 years",
    contagious: false,
    chronic: true,
    symptoms: [
      "White or depigmented patches on skin",
      "Symmetrical loss of pigment",
      "Premature whitening of hair",
      "Color loss in mucous membranes",
      "Slow spreading patches over time"
    ],
    causes: [
      "Autoimmune destruction of melanocytes",
      "Genetic predisposition",
      "Family history of vitiligo or autoimmune diseases"
    ],
    recommendedTreatment: [
      "Topical corticosteroids",
      "Phototherapy (narrowband UVB)",
      "Depigmentation for extensive cases",
      "Skin camouflage cosmetics"
    ]
  }
];

module.exports = skinConditionEncyclopedia;
