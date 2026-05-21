import React from 'react';

const encyclopedia = [
  {
    disease: "Actinic Keratosis",
    description: "Actinic Keratosis (AK) is a rough, scaly patch on the skin caused by years of sun exposure. It is considered a precancerous condition and can potentially develop into squamous cell carcinoma if untreated.",
    symptoms: [
      "Rough, dry, scaly patches on sun-exposed skin",
      "Pink, red, or brownish spots",
      "Itching or burning sensation",
      "Tenderness when touched",
      "Occasional bleeding or crusting"
    ],
    treatment: [
      "Topical 5-fluorouracil cream",
      "Imiquimod cream for immune response",
      "Cryotherapy (liquid nitrogen treatment)",
      "Photodynamic therapy",
      "Laser therapy for persistent lesions"
    ]
  },
  {
    disease: "Acne Vulgaris",
    description: "Acne is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells, leading to pimples, blackheads, and whiteheads.",
    symptoms: [
      "Whiteheads",
      "Blackheads",
      "Red pimples",
      "Oily skin",
      "Dark spots"
    ],
    treatment: [
      "Use salicylic acid cleanser twice daily",
      "Apply benzoyl peroxide gel",
      "Use oil-free moisturizer",
      "Avoid touching pimples"
    ]
  },
  {
    disease: "Psoriasis",
    description: "Psoriasis is a chronic autoimmune skin disorder that causes rapid skin cell buildup, leading to red, scaly, itchy patches. It can affect joints in some cases (psoriatic arthritis).",
    symptoms: [
      "Red, raised patches of skin",
      "Thick silvery scales",
      "Itching or burning sensation",
      "Dry or cracked skin that may bleed",
      "Nail changes (pitting or discoloration)",
      "Joint pain if psoriatic arthritis develops"
    ],
    treatment: [
      "Topical corticosteroid creams",
      "Vitamin D analogues (calcipotriol)",
      "Moisturizers to reduce dryness",
      "Phototherapy (UVB light treatment)",
      "Systemic or biologic medications for severe cases"
    ]
  },
  {
    disease: "Skin Cancer",
    description: "Skin cancer is the abnormal growth of skin cells, most often caused by UV exposure from the sun or tanning beds. It includes types like melanoma, basal cell carcinoma, and squamous cell carcinoma.",
    symptoms: [
      "New or changing mole",
      "Asymmetry in skin lesion",
      "Irregular borders",
      "Multiple colors in a lesion",
      "Bleeding or non-healing sore",
      "Itching or pain in mole",
      "Rapid growth of skin spot"
    ],
    treatment: [
      "Surgical excision of tumor",
      "Mohs micrographic surgery",
      "Cryotherapy for small lesions",
      "Radiation therapy for advanced cases",
      "Immunotherapy for melanoma"
    ]
  },
  {
    disease: "Vitiligo",
    description: "Vitiligo is a chronic autoimmune condition where the immune system destroys melanocytes, leading to loss of skin pigment and white patches on the skin.",
    symptoms: [
      "White or depigmented patches on skin",
      "Symmetrical loss of pigment",
      "Premature whitening of hair",
      "Color loss in mucous membranes",
      "Slow spreading patches over time"
    ],
    treatment: [
      "Topical corticosteroids",
      "Phototherapy (narrowband UVB)",
      "Depigmentation for extensive cases",
      "Skin camouflage cosmetics"
    ]
  }
];

export default function Encyclopedia() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Skin Condition Encyclopedia</h1>
      <div className="space-y-8">
        {encyclopedia.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 border border-slate-100">
            <h2 className="text-xl font-semibold mb-2 text-[#5AA7A7]">{item.disease}</h2>
            <p className="mb-2 text-slate-700">{item.description}</p>
            <div className="mb-2">
              <span className="font-bold text-slate-800">Symptoms:</span>
              <ul className="list-disc ml-6 text-slate-600">
                {item.symptoms.map((sym, i) => <li key={i}>{sym}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-800">Treatment:</span>
              <ul className="list-disc ml-6 text-slate-600">
                {item.treatment.map((treat, i) => <li key={i}>{treat}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
