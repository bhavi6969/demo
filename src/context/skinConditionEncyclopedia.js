export const SKIN_DISEASES = {
  acne: {
    id: 'acne',
    name: 'Acne Vulgaris',
    severity: 'Moderate',
    severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    severityValue: 55,
    symptoms: [
      'Inflammatory papules and pustules on facial and shoulder zones',
      'Open and closed comedones (blackheads and whiteheads)',
      'Localized redness and skin congestion',
      'Mild tenderness around active pustular eruptions'
    ],
    skincare: {
      morning: 'Gentle Salicylic Acid cleanser, Hyaluronic Acid serum, Oil-free non-comedogenic SPF 50+',
      night: 'Mild hydrating cleanser, thin layer of Adapalene (0.1%), Ceramide-based light moisturizer'
    },
    treatments: [
      'Topical retinoid therapy to regulate epithelial cell turnover',
      'Benzoyl Peroxide washes to eliminate Propionibacterium acnes',
      'Beta-Hydroxy Acid (BHA) chemical peels for deep pore exfoliation'
    ],
    medicines: [
      { name: 'Adapalene Gel 0.1%', dosage: 'Apply a pea-sized amount to clean face once daily at night' },
      { name: 'Benzoyl Peroxide Wash 4%', dosage: 'Use once daily in the morning, rinse off thoroughly' }
    ],
    remedies: [
      'Apply diluted tea tree oil (5%) as a localized spot treatment',
      'Apply cooled green tea extract compress to soothe inflammation',
      'Use hydrocolloid pimple patches to protect skin and draw out impurities'
    ],
    diet: [
      'Incorporate zinc-rich foods (e.g., pumpkin seeds, lentils)',
      'Minimize high-glycemic index carbohydrates (white bread, sugary sodas)',
      'Limit pasteurized dairy products if correlated with active flare-ups'
    ],
    precautions: [
      'Do not pick, squeeze, or scratch active lesions to prevent deep scarring',
      'Avoid heavy oil-based cosmetics and comedogenic sunscreens',
      'Introduce active acids gradually to prevent skin barrier disruption'
    ]
  },
  actinic_keratosis: {
    id: 'actinic_keratosis',
    name: 'Actinic Keratosis (Pre-cancerous)',
    severity: 'High - Evaluation Recommended',
    severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    severityValue: 80,
    symptoms: [
      'Rough, dry, scaly patch of skin, usually less than 1 inch (2.5 cm) in diameter',
      'Flat to slightly raised patch or bump on the top layer of skin',
      'Pink, red, or brown coloration with a sandpaper-like texture',
      'Itching or burning sensation in the affected sun-exposed zone'
    ],
    skincare: {
      morning: 'Broad-spectrum mineral SPF 50+ (Zinc Oxide 20%), Niacinamide barrier serum',
      night: 'Ultra-gentle lipid cleanser, Ceramide barrier cream'
    },
    treatments: [
      'Cryotherapy (freezing with liquid nitrogen) for single lesions',
      'Topical chemotherapy creams (e.g., Fluorouracil) for field treatment',
      'Photodynamic therapy (PDT) combining light energy with a topical sensitizer'
    ],
    medicines: [
      { name: 'Fluorouracil 5% Cream', dosage: 'Apply twice daily to affected area for 2-4 weeks as prescribed' },
      { name: 'Imiquimod 5% Cream', dosage: 'Apply 3 times a week at bedtime for 16 weeks as prescribed' }
    ],
    remedies: [
      'Keep skin hydrated with fragrance-free urea-based creams',
      'Apply cold compresses to soothe burning sensation after clinical treatments'
    ],
    diet: [
      'Consume foods rich in beta-carotene and lycopene (carrots, tomatoes) to support skin repair',
      'Maintain adequate hydration to support stratum corneum shedding'
    ],
    precautions: [
      'Perform monthly self-examinations for changing shape or bleeding',
      'Avoid direct UV exposure and tanning beds entirely',
      'Always wear wide-brimmed hats and protective clothing outdoors'
    ]
  },
  benign_tumors: {
    id: 'benign_tumors',
    name: 'Benign Skin Tumor / Growth',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 20,
    symptoms: [
      'Well-demarcated skin growth (e.g., dermatofibroma, lipoma, skin tag)',
      'Consistent color, texture, and size over long periods',
      'Absence of spontaneous bleeding, ulceration, or oozing',
      'Mobility under the skin (for sub-dermal lipomas) or stalked growth (for skin tags)'
    ],
    skincare: {
      morning: 'Standard daily moisturizing lotion, daily sunscreen protection',
      night: 'Mild body wash, hydrating ceramide cream'
    },
    treatments: [
      'Observation and monitoring (no medical removal necessary unless irritated)',
      'Minor surgical excision under local anesthesia if cosmetic removal is desired',
      'Electrosurgery or cryosurgery for superficial skin tags'
    ],
    medicines: [
      { name: 'No Prescription Needed', dosage: 'Benign growths do not require topical pharmaceutical therapy.' }
    ],
    remedies: [
      'Apply protective bandages if the growth rubs against clothing or jewelry',
      'Keep the area clean and dry to prevent friction rashes'
    ],
    diet: [
      'Follow a balanced diet rich in leafy greens and antioxidants'
    ],
    precautions: [
      'Do not attempt to cut off or tie off skin growths at home to prevent infection',
      'Consult a doctor if the growth rapidly changes size or color'
    ]
  },
  bullous: {
    id: 'bullous',
    name: 'Bullous Pemphigoid (Blistering)',
    severity: 'High - Medical Attention Required',
    severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    severityValue: 85,
    symptoms: [
      'Large, tense, fluid-filled blisters (bullae) that do not rupture easily',
      'Hives-like red skin patches appearing weeks before blisters develop',
      'Severe itching and tenderness in affected cutaneous areas',
      'Erosions or raw skin where blisters have broken open'
    ],
    skincare: {
      morning: 'Wash raw areas with sterile saline, apply non-adherent sterile dressings',
      night: 'Apply prescribed topical steroids gently, wrap in protective cotton bandages'
    },
    treatments: [
      'Systemic corticosteroid therapy to suppress auto-antibody production',
      'Immunosuppressive sparing agents (e.g., Azathioprine, Methotrexate)',
      'Wound management protocols to prevent bacterial superinfections'
    ],
    medicines: [
      { name: 'Prednisone (Oral)', dosage: 'Dosage titrated by dermatologist based on severity' },
      { name: 'Clobetasol Propionate 0.05% Ointment', dosage: 'Apply thin layer to affected skin zones daily' }
    ],
    remedies: [
      'Apply cool compresses soaked in sterile water to soothe raw erosions',
      'Keep blistered skin clean and dry to avoid friction'
    ],
    diet: [
      'Eat a soft diet if blisters appear inside the oral cavity',
      'Increase protein intake to assist skin barrier regeneration'
    ],
    precautions: [
      'Do not pop blisters intentionally; let them drain naturally to preserve the roof layer',
      'Avoid tight clothing that rubs against blister-prone regions',
      'Contact clinic immediately if fluid turns cloudy or foul-smelling'
    ]
  },
  candidiasis: {
    id: 'candidiasis',
    name: 'Candidiasis (Yeast Infection)',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 35,
    symptoms: [
      'Bright red, itchy rash in skin folds (underarms, under breasts, groin)',
      'Small pustules or "satellite lesions" surrounding the main red rash',
      'Macerated (white, wet-looking) skin texture in friction folds',
      'Burning sensation or soreness when sweating'
    ],
    skincare: {
      morning: 'Cleanse with a pH-balanced soap, dry thoroughly, apply antifungal powder',
      night: 'Cleanse, dry completely, apply Miconazole or Clotrimazole cream'
    },
    treatments: [
      'Topical azole antifungal therapy to clear Candida colonization',
      'Moisture control protocols (using cotton inserts or drying powders)',
      'Barrier creams to protect irritated folds from acidic sweat'
    ],
    medicines: [
      { name: 'Clotrimazole 1% Cream', dosage: 'Apply to clean, dry area twice daily for 2 weeks' },
      { name: 'Nystatin Antifungal Powder', dosage: 'Dust lightly in skin folds twice daily to control moisture' }
    ],
    remedies: [
      'Dilute apple cider vinegar bath (1 cup in warm bath water) to restore skin acidity',
      'Apply pure aloe vera to cool burning skin folds'
    ],
    diet: [
      'Reduce processed sugar and refined yeast intake',
      'Include yogurt, kefir, and fermented foods to support healthy microflora'
    ],
    precautions: [
      'Ensure skin folds are dried completely after showers (use a hair dryer on cool setting if necessary)',
      'Wear loose-fitting, breathable cotton clothing to prevent moisture build-up',
      'Avoid sharing towels or clothes during active fungal flares'
    ]
  },
  drugeruption: {
    id: 'drugeruption',
    name: 'Drug Eruption (Allergic Reaction)',
    severity: 'High - Emergency Check Needed',
    severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    severityValue: 90,
    symptoms: [
      'Symmetric, widespread red spots or hives appearing within days of starting a new drug',
      'Intense pruritus (itching) or burning skin sensation across the trunk and limbs',
      'In severe cases, skin peeling, mucosal blisters, or facial swelling',
      'Accompanied by systemic symptoms such as fever or fatigue'
    ],
    skincare: {
      morning: 'Gentle lukewarm water rinse, apply thick hypoallergenic petrolatum barrier',
      night: 'Cool oatmeal bath, apply prescribed topical steroid cream, hydrate skin'
    },
    treatments: [
      'Immediate identification and discontinuation of the suspected medication (under medical supervision)',
      'Oral antihistamines and topical corticosteroids to suppress the allergic response',
      'Inpatient supportive care for severe cutaneous adverse drug reactions (SCARs)'
    ],
    medicines: [
      { name: 'Methylprednisolone (Oral)', dosage: 'Prescribed by emergency physician based on severity' },
      { name: 'Fexofenadine 180mg (Allegra)', dosage: '1 tablet daily to manage severe generalized itching' }
    ],
    remedies: [
      'Apply cool compresses or ice packs wrapped in towels to calm burning skin hives',
      'Lukewarm baths with colloidal oatmeal to relieve full-body itching'
    ],
    diet: [
      'Drink plenty of water to assist the kidneys in clearing drug metabolites',
      'Eat bland, anti-inflammatory foods to reduce systemic stress'
    ],
    precautions: [
      'Seek immediate emergency care if you experience lip swelling, difficulty swallowing, or breathing issues',
      'Carry a card or wear a medical alert bracelet specifying the offending drug allergy',
      'Never take the drug again; cross-reacting medications must also be cataloged'
    ]
  },
  eczema: {
    id: 'eczema',
    name: 'Atopic Dermatitis (Eczema)',
    severity: 'Moderate',
    severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    severityValue: 50,
    symptoms: [
      'Intense pruritus (severe itching) leading to scratching and skin damage',
      'Dry, scaly, red patches commonly found on flexural creases (elbows, knees)',
      'Thickened, leathery skin (lichenification) due to chronic rubbing',
      'Tiny bumps that may leak fluid and crust over when scratched'
    ],
    skincare: {
      morning: 'Apply colloidal oatmeal lotion, immediate thick emollient, daily mineral sunscreen',
      night: 'Mild soap-free cleanser, topical Hydrocortisone, thick barrier repair cream/ointment'
    },
    treatments: [
      'Regular application of barrier-repair emollients to correct lipid deficits',
      'Topical corticosteroid course to settle active immunological flares',
      'Phototherapy (narrowband UVB) for persistent, generalized eczema cases'
    ],
    medicines: [
      { name: 'Triamcinolone Acetonide Cream 0.1%', dosage: 'Apply to affected spots twice daily for up to 10 days' },
      { name: 'Cetirizine 10mg (Zyrtec)', dosage: '1 tablet daily at night to calm itching' }
    ],
    remedies: [
      'Take 10-minute lukewarm baths with colloidal oatmeal',
      'Apply organic cold-pressed virgin coconut oil to skin to combat dryness and bacteria',
      'Wear soft, smooth cotton clothing instead of irritating wool or synthetics'
    ],
    diet: [
      'Incorporate Omega-3 fatty acids (salmon, walnuts, flaxseeds) to reduce inflammation',
      'Monitor and eliminate foods that trigger eczema flares (e.g. dairy, gluten in some patients)'
    ],
    precautions: [
      'Keep fingernails trimmed short and filed smooth to minimize scratching damage',
      'Avoid hot showers; keep water temperature lukewarm to avoid stripping skin lipids',
      'Avoid scented soaps, perfumed lotions, and harsh laundry detergents'
    ]
  },
  infestations_bites: {
    id: 'infestations_bites',
    name: 'Infestations & Insect Bites',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 40,
    symptoms: [
      'Small, itchy red bumps or papules appearing in clusters or lines',
      'Intense localized itching, often worse at night (typical of scabies)',
      'Tiny blisters, puncture marks, or thin burrow tracks in skin folds',
      'Secondary skin abrasions from intense scratching'
    ],
    skincare: {
      morning: 'Wash area with mild soap, apply Calamine lotion to calm itchiness',
      night: 'Apply Permethrin cream or Hydrocortisone cream, protect skin from friction'
    },
    treatments: [
      'Topical antiparasitic therapy (e.g., Permethrin) for scabies or lice',
      'Oral or topical antihistamines to counter bite allergic reactions',
      'Environmental decontamination (washing all bedding and clothing in hot water)'
    ],
    medicines: [
      { name: 'Permethrin 5% Cream', dosage: 'Apply neck down, leave on for 8-14 hours, rinse. Repeat in 7 days' },
      { name: 'Hydrocortisone 1% Cream', dosage: 'Apply to bite spots 2-3 times daily to relieve swelling' }
    ],
    remedies: [
      'Apply a paste of baking soda and water to bites to reduce insect venom irritation',
      'Apply witch hazel extract or ice packs to bites to numb localized itching'
    ],
    diet: [
      'Drink plenty of water to support immune response and skin healing'
    ],
    precautions: [
      'Do not scratch bite bumps to prevent secondary bacterial infections (cellulitis)',
      'Treat all household members simultaneously if diagnosed with scabies',
      'Use insect repellent containing DEET or Picaridin when outdoors in buggy areas'
    ]
  },
  lichen: {
    id: 'lichen',
    name: 'Lichen Planus / Lichenoid',
    severity: 'Moderate',
    severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    severityValue: 60,
    symptoms: [
      'Purplish, flat-topped, polygonal, itchy papules (classic "Ps of Lichen Planus")',
      'Fine white lacy lines on the surface of the bumps (Wickham striae)',
      'Commonly occurs on the inner wrists, ankles, and oral mucosa',
      'Hair loss or nail thinning/grooving if scalp or nails are involved'
    ],
    skincare: {
      morning: 'Gentle lipid cleanser, soothing aloe vera gel, broad-spectrum sunscreen',
      night: 'Mild body wash, prescribed topical steroid cream, urea moisturizing cream'
    },
    treatments: [
      'High-potency topical corticosteroids to clear the papules',
      'Oral retinoids or systemic immunosuppressants for widespread disease',
      'Intralesional steroid injections for thick, chronic plaques'
    ],
    medicines: [
      { name: 'Clobetasol Propionate Cream 0.05%', dosage: 'Apply to skin plaques twice daily for up to 3 weeks' },
      { name: 'Tacrolimus 0.1% Ointment', dosage: 'Apply to mucosal or facial spots twice daily' }
    ],
    remedies: [
      'Cool water compresses to manage sudden itchiness',
      'Lukewarm baths with baking soda or Epsom salts to soothe dry plaques'
    ],
    diet: [
      'Avoid spicy, acidic, or hard crunchy foods if oral lichen planus is present',
      'Eat anti-inflammatory, vitamin-dense foods to assist mucosal healing'
    ],
    precautions: [
      'Avoid scratching active lesions; scratching can trigger new lesions (Koebner phenomenon)',
      'Maintain diligent oral hygiene and visit the dentist regularly if oral lesions exist',
      'Avoid harsh mechanical scrubbing of the skin during showers'
    ]
  },
  lupus: {
    id: 'lupus',
    name: 'Cutaneous Lupus Erythematosus',
    severity: 'High - Medical Monitoring Required',
    severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    severityValue: 75,
    symptoms: [
      'Butterfly-shaped red rash spreading across the cheeks and bridge of nose (malar rash)',
      'Red, raised, disc-shaped patches with scaling and scarring (discoid lupus)',
      'Extreme skin sensitivity to sunlight, triggering redness or flares within hours',
      'Hair loss (alopecia), joint pain, or oral ulcers'
    ],
    skincare: {
      morning: 'Apply high-factor broad-spectrum sunscreen (SPF 50+ UV-A & UV-B), soothing moisturizer',
      night: 'Ultra-mild creamy cleanser, barrier recovery cream, prescription topicals'
    },
    treatments: [
      'Strict UV light protection (sunscreen, UV-blocking window films)',
      'Topical corticosteroids or calcineurin inhibitors for skin-specific control',
      'Antimalarial medications (e.g., Hydroxychloroquine) as first-line systemic therapy'
    ],
    medicines: [
      { name: 'Hydroxychloroquine (Oral)', dosage: 'Typically 200mg-400mg daily as prescribed by rheumatologist' },
      { name: 'Tacrolimus Ointment 0.1%', dosage: 'Apply a thin layer to facial rashes twice daily' }
    ],
    remedies: [
      'Use soothing aloe-vera or green-tea based creams to calm sun-exposed skin',
      'Apply cool water compresses to reduce facial heat and swelling'
    ],
    diet: [
      'Eat foods rich in antioxidants and omega-3s to modulate autoimmune pathways',
      'Incorporate vitamin D and calcium supplements if avoiding sunlight'
    ],
    precautions: [
      'Apply sunscreen 30 minutes before going outdoors, even on cloudy days or when indoors near windows',
      'Wear tightly-woven protective clothing, broad-brimmed hats, and UV protective sleeves',
      'Regular blood work and eye examinations (when taking Hydroxychloroquine) are mandatory'
    ]
  },
  moles: {
    id: 'moles',
    name: 'Benign Mole (Nevus)',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 10,
    symptoms: [
      'Symmetric, round or oval-shaped brown or tan spot on the skin',
      'Sharp, well-defined border separating it from the surrounding skin',
      'Consistent diameter (usually less than 6mm) and flat or slightly raised',
      'No spontaneous changes in size, shape, elevation, or color over time'
    ],
    skincare: {
      morning: 'Regular face/body moisturizer, daily application of broad-spectrum sunscreen',
      night: 'Gentle facial wash, overnight hydrating cream'
    },
    treatments: [
      'Routine monitoring (no treatment or removal needed for benign moles)',
      'Cosmetic shave excision if the mole catches on clothing or razor blades',
      'Full surgical excision with biopsy if any irregular characteristics emerge'
    ],
    medicines: [
      { name: 'No Treatment Required', dosage: 'Benign moles do not require any medical creams or medications.' }
    ],
    remedies: [
      'Protect the mole area with a band-aid if it experiences constant physical rubbing'
    ],
    diet: [
      'Maintain a nutrient-rich diet to support healthy skin cellular turnover'
    ],
    precautions: [
      'Track your moles using the ABCDE guidelines (Asymmetry, Border, Color, Diameter, Evolution)',
      'Have any mole that begins to itch, bleed, or rapidly change shape evaluated by a doctor immediately',
      'Get a professional full-body skin examination by a dermatologist once a year'
    ]
  },
  psoriasis: {
    id: 'psoriasis',
    name: 'Psoriasis Vulgaris',
    severity: 'Moderate',
    severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    severityValue: 65,
    symptoms: [
      'Thick red plaques covered with silvery scales (commonly on elbows, knees, scalp)',
      'Dry, cracked skin that may bleed or itch intensely',
      'Stiffness, swelling, or pain in the joints (psoriatic arthritis in some patients)',
      'Nail pitting, thickening, or lifting of the nail bed'
    ],
    skincare: {
      morning: 'Coal tar shampoo for scalp, salicylic acid cream to soften scales, thick cream moisturizer',
      night: 'Soothing body wash, prescription topical steroid/calcipotriene, wrap skin in plastic wrap (occlusion) if directed'
    },
    treatments: [
      'Topical corticosteroid and Vitamin D analogue (Calcipotriene) combination creams',
      'Keratolytic agents (Salicylic Acid, Coal Tar) to strip away silver scales',
      'Systemic biologics or oral immunomodulators for moderate-to-severe plaque psoriasis'
    ],
    medicines: [
      { name: 'Calcipotriene 0.005% Cream', dosage: 'Apply to plaques twice daily, rub in completely' },
      { name: 'Clobetasol Propionate 0.05% Ointment', dosage: 'Apply to active plaques twice daily for up to 2 weeks' }
    ],
    remedies: [
      'Take lukewarm baths with Epsom salts or dead sea salts to loosen scaling',
      'Apply raw organic aloe vera gel to reduce redness and itching',
      'Get short, controlled amounts of natural sunlight (10-15 minutes) to naturally slow cell growth'
    ],
    diet: [
      'Follow an anti-inflammatory diet (rich in olive oil, leafy greens, wild-caught fish)',
      'Reduce alcohol consumption and avoid smoking, which are major triggers for psoriasis flares'
    ],
    precautions: [
      'Avoid skin injuries (scratches, sunburns, vaccinations) as they can cause new plaques (Koebner effect)',
      'Moisturize skin immediately after showering to lock in moisture and prevent dryness flares',
      'Manage stress through meditation or deep breathing, as stress is a primary immune flare trigger'
    ]
  },
  rosacea: {
    id: 'rosacea',
    name: 'Rosacea',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 30,
    symptoms: [
      'Persistent redness on the cheeks, nose, chin, or forehead (flushing)',
      'Visible tiny broken blood vessels (telangiectasia) on the face',
      'Small, red, pus-filled bumps (papulopustular rosacea) resembling acne',
      'Burning, stinging, or gritty sensation in the eyes (ocular rosacea)'
    ],
    skincare: {
      morning: 'Ultra-gentle creamy cleanser, Azelaic Acid cream, lightweight mineral-only sunscreen SPF 30+',
      night: 'Soothing lipid-replenishing wash, Metronidazole gel, fragrance-free barrier moisturizer'
    },
    treatments: [
      'Topical vasoconstrictors (e.g. Brimonidine) to reduce persistent erythema',
      'Topical anti-parasitics (e.g. Ivermectin) to target Demodex mites on the skin',
      'Laser therapy (V-Beam or IPL) to collapse dilated, visible blood vessels'
    ],
    medicines: [
      { name: 'Metronidazole 0.75% Gel', dosage: 'Apply a thin layer to affected facial zones twice daily' },
      { name: 'Azelaic Acid 15% Gel', dosage: 'Apply a thin layer to clean face twice daily' }
    ],
    remedies: [
      'Apply cooled chamomile tea compresses to instantly soothe facial flushing',
      'Use a fan or mist with thermal spring water during sudden heat flashes'
    ],
    diet: [
      'Avoid hot, spicy dishes and limit caffeine and alcohol (especially red wine), which trigger flushing',
      'Avoid hot beverages; let them cool down to room temperature before drinking'
    ],
    precautions: [
      'Avoid harsh mechanical face scrubs, chemical exfoliants (glycolic acid), and alcohol-based toners',
      'Identify and avoid environmental triggers (extreme wind, hot baths, heavy exercise)',
      'Always use lukewarm or cool water when washing the face; hot water triggers blood vessel dilation'
    ]
  },
  seborrh_keratoses: {
    id: 'seborrh_keratoses',
    name: 'Seborrheic Keratosis',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 15,
    symptoms: [
      'Waxy, scaly, or crusty "stuck-on" appearance resembling a drop of brown candle wax',
      'Color ranging from light tan to dark brown, grey, or black',
      'Slightly elevated, oval or round shape with a rough, wart-like surface',
      'Usually painless and located on the chest, back, head, or neck'
    ],
    skincare: {
      morning: 'Regular moisturizing cream, standard daily broad-spectrum sunscreen',
      night: 'Mild body cleanser, exfoliating urea or lactic acid body lotion'
    },
    treatments: [
      'Observation (benign lesions that require no treatment or intervention)',
      'Cryotherapy (freezing with liquid nitrogen) to easily remove unwanted spots',
      'Curettage (scraping the lesion flat to the skin) or electrosurgery'
    ],
    medicines: [
      { name: 'No Topical Treatment Needed', dosage: 'Seborrheic keratoses are benign and do not respond to creams.' }
    ],
    remedies: [
      'Moisturize the area regularly if it becomes dry, itchy, or irritated from friction'
    ],
    diet: [
      'Eat a balanced, antioxidant-rich diet to support healthy skin aging'
    ],
    precautions: [
      'Do not pick or scratch these lesions, which can lead to bleeding, irritation, and scarring',
      'Have any lesion evaluated if it grows rapidly, bleeds spontaneously, or becomes painful',
      'Differentiate from melanoma; get new dark or black skin growths checked by a professional'
    ]
  },
  skincancer: {
    id: 'skincancer',
    name: 'Skin Cancer (Carcinoma/Melanoma)',
    severity: 'High - Urgent Consult Needed',
    severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    severityValue: 95,
    symptoms: [
      'Asymmetric skin lesion displaying irregular, notched, or blurred borders',
      'Variegated color profile (mixture of brown, black, red, white, or blue)',
      'A sore that bleeds, oozes, or crusts and refuses to heal over 3-4 weeks',
      'A pearly bump (Basal Cell Carcinoma) or firm red nodule (Squamous Cell Carcinoma)'
    ],
    skincare: {
      morning: 'Gentle soap-free wash, high-protection mineral sunscreen (zinc oxide 20%), barrier balm',
      night: 'Ultra-mild soothing wash, simple fragrance-free hydrating ointment'
    },
    treatments: [
      'Surgical excision with clear margins under local anesthesia (first-line)',
      'Mohs micrographic surgery (recommended for facial carcinomas to spare tissue)',
      'Immunotherapy, targeted therapy, or radiation for advanced metastatic cases'
    ],
    medicines: [
      { name: 'No Self-Medication', dosage: 'Skin cancers require immediate clinical intervention. Do not use OTC creams.' }
    ],
    remedies: [
      'None. Avoid home remedies, apple cider vinegar, or acidic peels on suspected malignancies.'
    ],
    diet: [
      'Eat a nutrient-dense diet rich in leafy vegetables and cruciferous foods to support immune function',
      'Keep well-hydrated to aid overall healing during treatments'
    ],
    precautions: [
      'Schedule an urgent biopsy with a dermatologist; do not delay clinical assessment',
      'Perform regular full-body mapping checkups; photograph spots to track changes',
      'Wear UPF 50+ sun-protective gear and strictly avoid peak sun hours'
    ]
  },
  sun_sunlight_damage: {
    id: 'sun_sunlight_damage',
    name: 'Sun Damage (Photoaging)',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 25,
    symptoms: [
      'Fine and deep wrinkles (rhytids) caused by breakdown of collagen and elastin',
      'Hyperpigmentation, solar lentigines (age spots), and uneven skin tone',
      'Loss of skin elasticity, resulting in saggy or leathery skin texture',
      'Easily bruised skin (solar purpura) due to thinned blood vessel walls'
    ],
    skincare: {
      morning: 'Vitamin C (L-Ascorbic Acid) antioxidant serum, Hyaluronic Acid, broad-spectrum SPF 50+',
      night: 'Gentle cleanser, Retinol (0.5%) or Tretinoin (0.025%), rich Ceramide peptide cream'
    },
    treatments: [
      'Topical retinoid therapy (Tretinoin) to rebuild collagen and speed cell turn-over',
      'Chemical peeling (AHA/BHA) or microdermabrasion to resurface hyperpigmented layers',
      'Fractional laser resurfacing to repair deep collagen damage and eliminate spots'
    ],
    medicines: [
      { name: 'Tretinoin 0.025% Cream', dosage: 'Apply a pea-sized amount to clean face at night (requires prescription)' },
      { name: 'Hydroquinone 2% Cream', dosage: 'Apply twice daily to dark spots to fade sun pigmentation' }
    ],
    remedies: [
      'Apply cold aloe vera gel to cool skin after outdoor activities',
      'Use rosehip seed oil, which is high in vitamins A and C, to nourish dry sun-damaged skin'
    ],
    diet: [
      'Eat foods rich in Vitamin C, E, and Lycopene (berries, citrus fruits, cooked tomatoes)',
      'Drink green tea daily to supply polyphenols that protect against UV oxidative damage'
    ],
    precautions: [
      'Apply sunscreen every single morning, regardless of weather or if staying indoors',
      'Reapply sunscreen every 2 hours when swimming or sweating outdoors',
      'Stay under shade structures and wear sunglasses with UV-400 protection'
    ]
  },
  tinea: {
    id: 'tinea',
    name: 'Tinea (Fungal Infection)',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 30,
    symptoms: [
      'Ring-shaped red scaly rash with clearer skin in the center (classic ringworm)',
      'Severe localized itching, burning, or cracking skin (e.g. athlete\'s foot)',
      'Fine peeling or scaling borders surrounding the red patch',
      'Brittle, thickened, yellow, or lifting nails (onychomycosis) if nails are affected'
    ],
    skincare: {
      morning: 'Wash area with antifungal soap, dry completely, apply Terbinafine cream',
      night: 'Cleanse, dry thoroughly, apply Miconazole cream, apply dry barrier dressing if weeping'
    },
    treatments: [
      'Topical allylamine or azole antifungal creams to eradicate the dermatophytes',
      'Oral antifungal tablets (e.g. Terbinafine, Itraconazole) for scalp or nail infections',
      'Moisture control protocols (wearing moisture-wicking synthetic socks or loose clothes)'
    ],
    medicines: [
      { name: 'Terbinafine 1% Cream (Lamisil)', dosage: 'Apply to affected area twice daily for 1-2 weeks' },
      { name: 'Clotrimazole 1% Cream (Lotrimin)', dosage: 'Apply twice daily to affected area for 2-4 weeks' }
    ],
    remedies: [
      'Apply diluted tea tree oil (50/50 with coconut oil) to help control minor fungal growth',
      'Soak feet in a diluted vinegar bath (1 part vinegar, 3 parts warm water) for athlete\'s foot'
    ],
    diet: [
      'Reduce excessive sugar and alcohol intake to prevent yeast and fungal overgrowth',
      'Eat garlic and raw oregano oil capsule supplements for natural antifungal compounds'
    ],
    precautions: [
      'Never walk barefoot in public locker rooms, gym showers, or pool decks; wear flip-flops',
      'Do not share towels, clothes, hairbrushes, or shoes with others during active infection',
      'Dry skin completely after showering, particularly between toes and in skin folds'
    ]
  },
  unknown_normal: {
    id: 'unknown_normal',
    name: 'Healthy / Normal Skin',
    severity: 'Mild - Normal',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 5,
    symptoms: [
      'Even skin tone and uniform texture across the scanned area',
      'No signs of atypical scaling, swelling, erythema (redness), or ulceration',
      'Properly hydrated stratum corneum with intact skin barrier function',
      'Pores are clean with normal sebum secretion levels'
    ],
    skincare: {
      morning: 'Gentle hydrating cleanser, Vitamin C serum, daily broad-spectrum SPF 30+',
      night: 'Mild cleanser, Niacinamide serum, lightweight ceramide moisturizer'
    },
    treatments: [
      'Preventative maintenance (no active medical treatments required)',
      'Regular skin barrier support to prevent dehydration or environmental damage',
      'Annual skin checkups with a board-certified dermatologist'
    ],
    medicines: [
      { name: 'No Medication Indicated', dosage: 'Maintain normal daily preventative skincare.' }
    ],
    remedies: [
      'Maintain basic skin hydration with simple, fragrance-free lotions'
    ],
    diet: [
      'Eat a colorful diet rich in vitamins A, C, and E',
      'Drink 8-10 glasses of water daily to support epidermal hydration from within'
    ],
    precautions: [
      'Continue utilizing high SPF sun protection daily to prevent photoaging',
      'Avoid introducing too many strong active acids at once to preserve barrier health',
      'Check skin monthly for any new or evolving moles'
    ]
  },
  vascular_tumors: {
    id: 'vascular_tumors',
    name: 'Vascular Tumor (Hemangioma)',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 20,
    symptoms: [
      'Bright red, blue, or purple bump or birthmark composed of blood vessels',
      'Firm to the touch (cherry hemangioma) or soft and spongy (cavernous hemangioma)',
      'May blanch (turn white) briefly when direct pressure is applied',
      'Typically painless, but can bleed if scratched or cut open'
    ],
    skincare: {
      morning: 'Gentle soap wash, application of daily face/body moisturizer, sunscreen',
      night: 'Mild body wash, hydrating cream, avoid scrubbing the lesion'
    },
    treatments: [
      'Monitoring (most cherry hemangiomas do not require removal or treatment)',
      'Laser coagulation (PDL or Nd:YAG) to selectively destroy vascular tissues',
      'Cryotherapy or electrocautery to freeze or burn away cherry hemangiomas'
    ],
    medicines: [
      { name: 'No Topical OTC Medication', dosage: 'Vascular tumors do not respond to standard topical creams.' }
    ],
    remedies: [
      'Apply direct, firm pressure with a clean tissue if the lesion bleeds due to accidental trauma'
    ],
    diet: [
      'Eat a healthy, vitamin-C rich diet to support blood vessel wall integrity'
    ],
    precautions: [
      'Do not pick, scratch, or attempt to pop vascular bumps, which leads to heavy bleeding',
      'Avoid aggressive rubbing with washcloths or abrasive scrubs over the tumor sites',
      'Consult a physician if a hemangioma begins to grow rapidly or ulcerate'
    ]
  },
  vasculitis: {
    id: 'vasculitis',
    name: 'Cutaneous Vasculitis',
    severity: 'High - Specialist Consult Advised',
    severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    severityValue: 80,
    symptoms: [
      'Raised red-purple spots that do not fade when pressed (palpable purpura)',
      'Typically clusters on the lower legs and ankles symmetrically',
      'Pain, burning, or stinging sensation in the affected skin lesions',
      'Urticarial (hives-like) lesions, small ulcers, or net-like purple skin discoloration (livedo reticularis)'
    ],
    skincare: {
      morning: 'Gentle pat-down wash, apply soothing barrier protectant, cover open ulcers with sterile dressings',
      night: 'Lukewarm rinse, apply prescribed topical corticosteroids, rest legs in elevated position'
    },
    treatments: [
      'Identification and removal of triggering factors (infections, drugs, autoimmune flares)',
      'Rest and leg elevation to reduce gravity-induced blood vessel stress',
      'Oral anti-inflammatories or immunosuppressants for systemic control'
    ],
    medicines: [
      { name: 'Colchicine (Oral)', dosage: 'Prescribed by rheumatologist/dermatologist to inhibit neutrophils' },
      { name: 'Triamcinolone Acetonide 0.1% Ointment', dosage: 'Apply to skin spots twice daily to reduce inflammation' }
    ],
    remedies: [
      'Elevate legs above the heart level as much as possible to relieve lower extremity swelling',
      'Apply cool water compresses to burning purpuric spots to reduce heat sensation'
    ],
    diet: [
      'Follow a low-sodium diet to reduce fluid retention and edema in the legs',
      'Include garlic, ginger, and turmeric to naturally assist vascular health'
    ],
    precautions: [
      'Avoid standing or walking for long periods; elevate legs during breaks',
      'Wear loose-fitting socks and trousers to prevent friction and compression sores',
      'Get blood pressure and kidney function checked, as vasculitis can affect internal organs'
    ]
  },
  vitiligo: {
    id: 'vitiligo',
    name: 'Vitiligo',
    severity: 'Moderate',
    severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    severityValue: 40,
    symptoms: [
      'Patchy loss of skin color (depigmentation), resulting in milk-white spots',
      'Premature whitening or greying of the hair on your scalp, eyelashes, eyebrows, or beard',
      'Loss of color in the tissues that line the inside of the mouth and nose (mucous membranes)',
      'Symmetrical distribution of white patches on both sides of the body'
    ],
    skincare: {
      morning: 'Apply high-SPF sunscreen (SPF 50+) to depigmented spots (which burn easily), apply cover-up cosmetics if desired',
      night: 'Gentle hydrating wash, apply prescribed topical corticosteroid or calcineurin inhibitor'
    },
    treatments: [
      'Topical corticosteroid creams to encourage repigmentation in early phases',
      'Topical calcineurin inhibitors (e.g. Tacrolimus) to modulate immune destruction of melanocytes',
      'Narrowband UVB phototherapy or excimer laser treatment to stimulate pigment cells'
    ],
    medicines: [
      { name: 'Tacrolimus 0.1% Ointment (Protopic)', dosage: 'Apply a thin layer to depigmented patches twice daily' },
      { name: 'Clobetasol Propionate 0.05% Cream', dosage: 'Apply to spots daily for 4-6 weeks as prescribed' }
    ],
    remedies: [
      'Use self-tanning lotions or cosmetic skin dyes to safely cover prominent white patches',
      'Apply Ginkgo Biloba extract (shown in some studies to arrest active vitiligo spread)'
    ],
    diet: [
      'Eat foods high in antioxidants, beta-carotene, and vitamin C to protect remaining pigment cells',
      'Incorporate vitamin B12 and folic acid, which are sometimes lower in vitiligo patients'
    ],
    precautions: [
      'Protect depigmented patches from sunburn; white skin has no natural melanin defense',
      'Avoid skin damage or tattoos; new vitiligo spots can appear at site of skin trauma (Koebner effect)',
      'Consult a dermatologist about Janus Kinase (JAK) inhibitors (e.g. Opzelura) for new repigmentation options'
    ]
  },
  warts: {
    id: 'warts',
    name: 'Viral Warts (HPV)',
    severity: 'Mild',
    severityColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
    severityValue: 30,
    symptoms: [
      'Small, fleshy, grainy bumps on the skin (often on hands, fingers, or feet)',
      'Rough, hard surface resembling a cauliflower texture',
      'Tiny black pinpoints, which are small clotted blood vessels (often called "seed warts")',
      'Pain or tenderness when walking (specifically for plantar warts on soles of feet)'
    ],
    skincare: {
      morning: 'Wash area with soap, apply protective wart pad/tape, wash hands immediately',
      night: 'Soak wart in warm water for 5 mins, file rough surface with emery board, apply Salicylic Acid paint'
    },
    treatments: [
      'Topical salicylic acid treatments to slowly dissolve infected skin layers',
      'Cryotherapy (liquid nitrogen) performed in-office to freeze the wart tissue',
      'Cantharidin application (causes a blister to form under the wart, lifting it off)'
    ],
    medicines: [
      { name: 'Salicylic Acid 17% Paint (Duofilm)', dosage: 'Apply to wart daily at night. File dead skin before next application' },
      { name: 'Imiquimod 5% Cream (Aldara)', dosage: 'Apply to wart 3 times a week at bedtime (for stubborn warts)' }
    ],
    remedies: [
      'Duct tape therapy: Cover wart with duct tape for 6 days, soak, file, leave open overnight, repeat',
      'Apply crushed garlic paste to the wart under a bandage to utilize natural antiviral compounds'
    ],
    diet: [
      'Eat foods rich in Vitamin A and C to boost the immune system\'s defense against the virus'
    ],
    precautions: [
      'Wash your hands thoroughly after touching a wart to prevent spreading it to other skin areas',
      'Never pick at or try to cut off warts yourself; this spreads the virus and causes deep infections',
      'Do not share pumice stones, emery boards, or nail clippers used on warts with others'
    ]
  }
};
