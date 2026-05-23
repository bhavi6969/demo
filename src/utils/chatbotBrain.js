// ─── Shared chatbot response engine ─────────────────────────────────────────
// Each intent has: keywords[], response string, and optional followUp string

const INTENTS = [
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'howdy', 'sup'],
    response: "Hey! 👋 I'm your DermaVision skin assistant. You can ask me about skin conditions, ingredients, routines, diet tips, or anything skin-related. What's on your mind?",
  },
  {
    keywords: ['how are you', 'how r u', 'whats up', "what's up"],
    response: "I'm running at full capacity and ready to help! 😊 Ask me anything about your skin — conditions, routines, ingredients, or diet tips.",
  },
  {
    keywords: ['thank', 'thanks', 'thank you', 'thx', 'ty'],
    response: "You're welcome! 🙌 Feel free to ask anything else about your skin health. I'm always here.",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'cya', 'later'],
    response: "Take care of your skin! 🌿 Come back anytime you have questions. Goodbye!",
  },

  // ── Acne ───────────────────────────────────────────────────────────────────
  {
    keywords: ['acne', 'pimple', 'breakout', 'zit', 'blackhead', 'whitehead', 'comedone', 'cystic'],
    response: "**Acne Vulgaris** is caused by clogged pores, excess sebum, bacteria (C. acnes), and inflammation. Here's what helps:\n\n• **Cleanse** twice daily with a salicylic acid (BHA) or benzoyl peroxide wash\n• **Treat** with topical retinoids (Adapalene 0.1%) at night — the gold standard\n• **Moisturise** with oil-free, non-comedogenic formulas\n• **SPF 30+** every morning — retinoids increase sun sensitivity\n• Avoid touching your face and change pillowcases every 2–3 days\n\nFor cystic or hormonal acne, a dermatologist may prescribe oral antibiotics or spironolactone.",
    followUp: "Would you like tips on a specific type — hormonal acne, back acne, or post-acne marks?",
  },
  {
    keywords: ['hormonal acne', 'period acne', 'chin acne', 'jawline acne'],
    response: "**Hormonal acne** typically appears on the chin, jawline, and lower cheeks, flaring around your menstrual cycle due to androgen spikes.\n\n• Spearmint tea (2 cups/day) has shown anti-androgen effects in studies\n• Topical niacinamide 5–10% reduces sebum and redness\n• Spironolactone (prescription) is highly effective for females\n• Avoid high-glycaemic foods — sugar and refined carbs spike insulin and androgens\n• Track your cycle to anticipate flares and apply a thin layer of benzoyl peroxide preventively",
  },
  {
    keywords: ['post acne', 'acne scar', 'acne mark', 'dark spot after acne', 'pih', 'hyperpigmentation acne'],
    response: "**Post-acne marks (PIH)** are not true scars — they're flat discolouration that fades with time and the right actives:\n\n• **Vitamin C serum** (morning) — brightens and prevents new marks\n• **Niacinamide 10%** — reduces melanin transfer\n• **Alpha Arbutin** — gentle brightener safe for all skin tones\n• **AHA exfoliant** (glycolic or lactic acid, 2–3x/week) — speeds cell turnover\n• **Strict SPF** — UV exposure darkens marks significantly\n\nTrue atrophic scars (ice pick, boxcar) may need professional treatments like microneedling or chemical peels.",
  },

  // ── Eczema / Dermatitis ────────────────────────────────────────────────────
  {
    keywords: ['eczema', 'atopic', 'dermatitis', 'itchy skin', 'itching', 'dry itchy', 'flaky skin', 'skin flaking'],
    response: "**Atopic Dermatitis (Eczema)** is a chronic inflammatory condition caused by a damaged skin barrier and immune dysregulation.\n\n• **Moisturise immediately** after bathing — use thick creams with ceramides (CeraVe, Vanicream)\n• **Avoid triggers**: harsh soaps, fragrances, wool, extreme temperatures, stress\n• **Lukewarm showers** only — hot water strips the barrier\n• **Topical corticosteroids** (hydrocortisone 1% OTC) for flares — use sparingly\n• **Antihistamines** at night can reduce itch-scratch cycles\n• For severe cases, a dermatologist may prescribe dupilumab (Dupixent) — a biologic that targets the root immune pathway",
    followUp: "Is the eczema on a specific area like hands, face, or behind the knees? I can give more targeted advice.",
  },
  {
    keywords: ['contact dermatitis', 'allergic rash', 'skin allergy', 'reaction to product', 'rash from'],
    response: "**Contact Dermatitis** is either allergic (immune reaction) or irritant (direct skin damage).\n\n• **Stop using** the suspected product immediately\n• Rinse the area with cool water for 10–15 minutes\n• Apply **1% hydrocortisone cream** to calm inflammation\n• Use a **fragrance-free barrier cream** to protect while healing\n• Common culprits: nickel, fragrances, preservatives (methylisothiazolinone), latex, hair dye (PPD)\n• Patch testing by a dermatologist can identify your exact allergen",
  },

  // ── Psoriasis ──────────────────────────────────────────────────────────────
  {
    keywords: ['psoriasis', 'scaly skin', 'silver scales', 'plaque', 'psoriatic'],
    response: "**Psoriasis** is an autoimmune condition causing rapid skin cell turnover, leading to thick, scaly plaques.\n\n• **Moisturise heavily** — thick ointments like petroleum jelly reduce scaling\n• **Coal tar shampoos/creams** slow cell turnover (OTC)\n• **Salicylic acid** helps lift scales before applying other treatments\n• **Topical corticosteroids** are first-line for mild-moderate cases\n• **Avoid triggers**: stress, alcohol, smoking, certain medications (beta-blockers, lithium)\n• Moderate-severe psoriasis may need phototherapy (UVB) or biologics (adalimumab, secukinumab)\n\nPsoriasis is NOT contagious — it's a genetic immune condition.",
  },
  // ── Rosacea ────────────────────────────────────────────────────────────────
  {
    keywords: ['rosacea', 'facial redness', 'red face', 'flushing', 'blushing', 'visible veins face', 'telangiectasia'],
    response: "**Rosacea** is a chronic condition causing facial redness, flushing, and sometimes pustules or visible blood vessels.\n\n• **Identify and avoid triggers**: spicy food, alcohol, hot drinks, sun, extreme temperatures, stress\n• **Gentle skincare only** — no physical scrubs, alcohol-based toners, or fragrance\n• **Azelaic acid 15–20%** is excellent for rosacea — reduces redness and bumps\n• **Niacinamide** calms inflammation and strengthens the barrier\n• **Mineral SPF 50+** daily — UV is a major trigger\n• Prescription options: metronidazole gel, ivermectin cream (Soolantra), or brimonidine for flushing\n• Laser/IPL treatments can reduce visible vessels",
  },
  // ── Vitiligo ───────────────────────────────────────────────────────────────
  {
    keywords: ['vitiligo', 'white patches', 'depigmentation', 'loss of skin color', 'white spots skin'],
    response: "**Vitiligo** is an autoimmune condition where melanocytes (pigment cells) are destroyed, causing white patches.\n\n• It is **not contagious** and not caused by diet or hygiene\n• **High SPF sunscreen** on affected areas is essential — depigmented skin burns easily\n• **Topical calcineurin inhibitors** (tacrolimus, pimecrolimus) can help repigment facial patches\n• **Narrowband UVB phototherapy** is the most effective treatment for widespread vitiligo\n• New FDA-approved: **ruxolitinib cream (Opzelura)** — a JAK inhibitor showing strong repigmentation results\n• Cosmetic camouflage (Dermablend, Vichy Dermablend) can help with confidence while treating",
  },

  // ── Moles / Skin Cancer ────────────────────────────────────────────────────
  {
    keywords: ['mole', 'nevus', 'nevi', 'melanoma', 'skin cancer', 'suspicious spot', 'changing mole', 'abcde'],
    response: "Use the **ABCDE rule** to assess moles:\n\n• **A — Asymmetry**: one half doesn't match the other\n• **B — Border**: irregular, ragged, or blurred edges\n• **C — Color**: multiple shades of brown, black, red, white, or blue\n• **D — Diameter**: larger than 6mm (pencil eraser size)\n• **E — Evolving**: any change in size, shape, color, or new symptoms like bleeding\n\n⚠️ If a mole meets ANY of these criteria, see a dermatologist promptly for dermoscopy. Early melanoma is highly treatable — delayed diagnosis is the main risk factor for poor outcomes.\n\nOur AI scan can flag suspicious patterns, but it does NOT replace a clinical dermoscopy exam.",
    followUp: "Do you have a specific mole you're concerned about? Describe its appearance and I can help you assess urgency.",
  },
  {
    keywords: ['basal cell', 'squamous cell', 'bcc', 'scc', 'skin cancer treatment', 'mohs'],
    response: "**Non-melanoma skin cancers** are the most common cancers worldwide:\n\n• **Basal Cell Carcinoma (BCC)**: pearly or waxy bump, often on sun-exposed areas. Slow-growing, rarely spreads. Treated with Mohs surgery, excision, or topical imiquimod.\n• **Squamous Cell Carcinoma (SCC)**: firm red nodule or flat lesion with a scaly crust. Can spread if untreated. Treated with excision or Mohs surgery.\n\nBoth are strongly linked to cumulative UV exposure. **Daily SPF 50+ is the single most effective prevention.**\n\nIf you notice a non-healing sore, bleeding lesion, or rapidly growing bump — see a dermatologist urgently.",
  },

  // ── Sunscreen / SPF ────────────────────────────────────────────────────────
  {
    keywords: ['sunscreen', 'spf', 'sun protection', 'uv', 'sunblock', 'mineral sunscreen', 'chemical sunscreen'],
    response: "**Sunscreen is the #1 anti-ageing and skin cancer prevention tool.** Here's what you need to know:\n\n• **SPF 30** blocks ~97% of UVB; **SPF 50** blocks ~98% — reapply every 2 hours outdoors\n• **Broad-spectrum** means it covers both UVA (ageing) and UVB (burning)\n• **Mineral (physical)**: zinc oxide or titanium dioxide — sits on skin, great for sensitive/rosacea skin\n• **Chemical**: avobenzone, octinoxate — absorbs UV, lighter texture, better for daily wear\n• Apply **1/4 teaspoon** for the face alone — most people under-apply by 50%\n• Don't forget: lips (SPF lip balm), ears, neck, and hands\n\n**Top picks**: EltaMD UV Clear SPF 46, La Roche-Posay Anthelios, Neutrogena Ultra Sheer SPF 100",
    followUp: "Do you have oily, dry, or sensitive skin? I can recommend the best sunscreen type for you.",
  },
  // ── Anti-ageing / Wrinkles ─────────────────────────────────────────────────
  {
    keywords: ['anti aging', 'anti-aging', 'wrinkle', 'fine line', 'ageing', 'aging skin', 'collagen', 'sagging'],
    response: "**Anti-ageing skincare** works best with a consistent, evidence-based routine:\n\n• **Retinoids** (retinol, tretinoin) — the most proven ingredient for wrinkles, collagen production, and cell turnover. Start 2x/week, build up slowly.\n• **Vitamin C serum** (morning) — antioxidant protection + collagen synthesis\n• **Peptides** — signal skin to produce more collagen (Matrixyl, Argireline)\n• **Hyaluronic acid** — plumps fine lines by drawing moisture into skin\n• **SPF 50+ daily** — UV causes 80% of visible skin ageing\n• **Niacinamide** — improves skin texture, pore appearance, and elasticity\n\nLifestyle factors matter too: sleep 7–9 hrs, don't smoke, stay hydrated, eat antioxidant-rich foods.",
  },

  // ── Ingredients ────────────────────────────────────────────────────────────
  {
    keywords: ['retinol', 'retinoid', 'tretinoin', 'retin-a', 'adapalene'],
    response: "**Retinoids** are vitamin A derivatives — the most studied skincare ingredient:\n\n• **Adapalene 0.1%** (Differin) — OTC, best for acne, gentlest retinoid\n• **Retinol 0.025–1%** — OTC, converts to retinoic acid in skin, good for anti-ageing\n• **Tretinoin 0.025–0.1%** — prescription, fastest results for acne + wrinkles\n\n**How to use**: Apply pea-sized amount to dry skin at night. Start 2x/week, increase gradually. Always use SPF the next morning.\n\n**Side effects**: Initial purging (2–6 weeks), dryness, peeling — this is normal. Use a gentle moisturiser to buffer. Avoid during pregnancy.",
  },
  {
    keywords: ['vitamin c', 'ascorbic acid', 'l-ascorbic', 'brightening serum'],
    response: "**Vitamin C (L-Ascorbic Acid)** is a powerhouse antioxidant for skin:\n\n• Neutralises free radicals from UV and pollution\n• Boosts collagen synthesis — reduces fine lines over time\n• Fades hyperpigmentation and brightens overall tone\n• Best used in the **morning** under SPF\n\n**Effective concentrations**: 10–20% L-ascorbic acid (pH 2.5–3.5)\n**Stable alternatives**: Ascorbyl Glucoside, Sodium Ascorbyl Phosphate (gentler, less irritating)\n\n**Top picks**: SkinCeuticals C E Ferulic, TruSkin Vitamin C Serum, The Ordinary Ascorbyl Glucoside 12%\n\nStore in a dark, cool place — Vitamin C oxidises quickly once opened.",
  },
  {
    keywords: ['niacinamide', 'vitamin b3', 'nicotinamide'],
    response: "**Niacinamide (Vitamin B3)** is one of the most versatile and well-tolerated skincare ingredients:\n\n• Reduces sebum production — great for oily/acne-prone skin\n• Minimises pore appearance\n• Fades dark spots and hyperpigmentation\n• Strengthens the skin barrier\n• Reduces redness and inflammation (excellent for rosacea)\n• Improves skin texture and elasticity\n\n**Effective concentration**: 5–10%\n**Works well with**: Hyaluronic acid, SPF, retinol, peptides\n**Avoid mixing with**: High-dose Vitamin C (can cause flushing at high concentrations — use at different times)\n\nThe Ordinary Niacinamide 10% + Zinc 1% is a popular, affordable option.",
  },
  {
    keywords: ['hyaluronic acid', 'ha serum', 'hydration serum', 'moisture serum'],
    response: "**Hyaluronic Acid (HA)** is a humectant that holds up to 1000x its weight in water:\n\n• Plumps fine lines and dehydration lines\n• Suitable for ALL skin types including oily and acne-prone\n• Works best applied to **damp skin** — seal with a moisturiser on top\n• Multiple molecular weights penetrate different skin layers\n\n⚠️ In very dry climates, HA can pull moisture FROM your skin if there's no humidity in the air — always layer a moisturiser or facial oil on top.\n\n**Top picks**: The Inkey List HA Serum, Neutrogena Hydro Boost, La Roche-Posay Hyalu B5",
  },
  {
    keywords: ['salicylic acid', 'bha', 'beta hydroxy'],
    response: "**Salicylic Acid (BHA)** is oil-soluble, meaning it penetrates INTO pores to clear them:\n\n• Unclogs blackheads and whiteheads\n• Reduces acne-causing bacteria\n• Exfoliates inside the pore lining\n• Anti-inflammatory — calms active breakouts\n\n**Effective concentration**: 0.5–2%\n**Use**: Cleanser (daily) or leave-on toner/serum (start 3x/week)\n**Best for**: Oily, acne-prone, congested skin\n\n⚠️ Avoid if pregnant. Don't combine with other strong acids on the same application. Always use SPF when using exfoliating acids.",
  },
  {
    keywords: ['glycolic acid', 'aha', 'alpha hydroxy', 'lactic acid', 'mandelic acid', 'chemical exfoliant'],
    response: "**AHAs (Alpha Hydroxy Acids)** are water-soluble exfoliants that work on the skin surface:\n\n• **Glycolic acid** — smallest molecule, deepest penetration, best for anti-ageing and texture\n• **Lactic acid** — gentler, also hydrating, great for sensitive skin and beginners\n• **Mandelic acid** — gentlest AHA, good for darker skin tones (lower PIH risk)\n\n**How to use**: 2–3x per week at night. Start low (5–7%), build up. Always use SPF the next day.\n\n**Don't mix** AHAs with retinoids or BHAs in the same routine — alternate nights instead.\n\nSigns of over-exfoliation: stinging, redness, tight shiny skin — take a break and focus on barrier repair.",
  },

  // ── Skin types & routines ──────────────────────────────────────────────────
  {
    keywords: ['oily skin', 'shiny skin', 'greasy skin', 'large pores'],
    response: "**Oily skin** produces excess sebum — here's how to manage it without stripping:\n\n**Morning**: Gentle foaming cleanser → Niacinamide 10% serum → Oil-free moisturiser → SPF 50 (gel or fluid formula)\n**Night**: Double cleanse (oil cleanser first, then foaming) → BHA toner (2–3x/week) → Retinol (2–3x/week) → Light moisturiser\n\n• Don't skip moisturiser — dehydrated skin overproduces oil to compensate\n• Clay masks 1–2x/week help absorb excess sebum\n• Blotting papers during the day are better than powder re-application\n• Avoid heavy occlusive creams and coconut oil",
  },
  {
    keywords: ['dry skin', 'tight skin', 'rough skin', 'flaky face', 'dehydrated skin', 'skin feels tight'],
    response: "**Dry skin** lacks oil (lipids); **dehydrated skin** lacks water — both need different approaches:\n\n**For dry skin**:\n• Rich creams with ceramides, shea butter, squalane\n• Avoid foaming cleansers — use cream or oil cleansers\n• Apply moisturiser to slightly damp skin to lock in hydration\n• Facial oils (rosehip, marula, squalane) as the last step at night\n\n**For dehydrated skin**:\n• Hyaluronic acid serum on damp skin, sealed with moisturiser\n• Drink 2–3L water daily\n• Reduce caffeine and alcohol\n• Use a humidifier in dry/air-conditioned environments\n\n**Avoid**: Hot showers, harsh soaps, alcohol-based toners, over-exfoliating",
  },
  {
    keywords: ['sensitive skin', 'skin sensitivity', 'skin reacts', 'skin burns', 'reactive skin'],
    response: "**Sensitive skin** needs a minimal, fragrance-free approach:\n\n**Golden rules**:\n• Patch test every new product on your inner arm for 24–48 hours\n• Introduce ONE new product at a time, 2 weeks apart\n• Avoid: fragrance, essential oils, alcohol denat., physical scrubs, high-strength actives\n\n**Safe ingredients**: Ceramides, centella asiatica (cica), allantoin, panthenol (B5), colloidal oatmeal, zinc\n\n**Recommended brands**: Vanicream, La Roche-Posay Toleriane, Avène, CeraVe (fragrance-free range)\n\nIf your skin reacts to almost everything, consider seeing a dermatologist — you may have an underlying condition like rosacea or eczema.",
  },
  {
    keywords: ['combination skin', 'oily t-zone', 't zone'],
    response: "**Combination skin** has an oily T-zone (forehead, nose, chin) and normal/dry cheeks — it needs a balanced approach:\n\n• Use a **gentle gel cleanser** — not too stripping, not too creamy\n• Apply a **lightweight moisturiser** all over, then a mattifying product only on the T-zone if needed\n• **Niacinamide** is perfect — regulates oil in oily zones without drying out dry zones\n• Use **BHA** only on the T-zone, not all over\n• Multi-masking: clay mask on T-zone, hydrating mask on cheeks simultaneously",
  },

  // ── Specific conditions ────────────────────────────────────────────────────
  {
    keywords: ['fungal', 'tinea', 'ringworm', 'athlete foot', 'jock itch', 'candida', 'yeast infection skin'],
    response: "**Fungal skin infections** are caused by dermatophytes or Candida yeast:\n\n• **Tinea corporis (ringworm)**: ring-shaped, scaly rash — NOT caused by a worm\n• **Tinea pedis (athlete's foot)**: itchy, scaly skin between toes\n• **Tinea versicolor**: light/dark patches on trunk from Malassezia yeast\n• **Candidiasis**: red, moist rash in skin folds (groin, under breasts)\n\n**Treatment**: Topical antifungals — clotrimazole, miconazole, terbinafine (OTC). Apply for 2 weeks after symptoms clear to prevent recurrence.\n\n**Prevention**: Keep skin dry, change sweaty clothes promptly, don't share towels, wear breathable fabrics.",
  },
  {
    keywords: ['wart', 'verruca', 'hpv skin', 'plantar wart'],
    response: "**Warts** are caused by Human Papillomavirus (HPV) infecting the outer skin layer:\n\n• **Common warts**: rough, raised bumps on hands/fingers\n• **Plantar warts**: flat, painful warts on the soles of feet\n• **Flat warts**: small, smooth warts on face or legs\n\n**Treatment options**:\n• **Salicylic acid** (OTC) — apply daily after soaking, file with emery board. Takes 4–12 weeks.\n• **Cryotherapy** (liquid nitrogen) — done by a doctor, often needs multiple sessions\n• **Duct tape occlusion** — some evidence for immune stimulation\n\nWarts can resolve on their own in 1–2 years. They're mildly contagious — avoid picking and sharing personal items.",
  },
  {
    keywords: ['hives', 'urticaria', 'welts', 'itchy bumps', 'allergic hives'],
    response: "**Urticaria (Hives)** are raised, itchy welts that appear suddenly due to histamine release:\n\n• **Acute hives** (< 6 weeks): usually triggered by food (nuts, shellfish, eggs), medications (NSAIDs, antibiotics), or infections\n• **Chronic hives** (> 6 weeks): often idiopathic (no clear cause)\n\n**Immediate relief**:\n• Non-drowsy antihistamines: cetirizine (Zyrtec) or loratadine (Claritin)\n• Cool compress on affected areas\n• Avoid known triggers\n\n⚠️ **Seek emergency care** if hives are accompanied by throat swelling, difficulty breathing, or dizziness — this may be anaphylaxis.",
  },
  {
    keywords: ['lupus', 'butterfly rash', 'autoimmune skin', 'sle'],
    response: "**Lupus (SLE)** can cause several skin manifestations:\n\n• **Butterfly (malar) rash**: red rash across cheeks and nose bridge — a classic sign\n• **Discoid lupus**: scarring, coin-shaped lesions on face, scalp, ears\n• **Photosensitivity**: severe sun reactions even with brief exposure\n\n**Skin management**:\n• **Strict sun avoidance** — SPF 50+ mineral sunscreen, protective clothing, UV-blocking windows\n• **Hydroxychloroquine (Plaquenil)** — prescribed by rheumatologist, reduces skin flares\n• Topical corticosteroids for active lesions\n\nLupus requires management by a rheumatologist. Skin symptoms often reflect systemic disease activity.",
  },
  {
    keywords: ['dark circle', 'under eye', 'puffy eyes', 'eye bag'],
    response: "**Dark circles and under-eye concerns** have different causes:\n\n• **Pigmentation** (brown): use vitamin C, kojic acid, or caffeine eye creams\n• **Vascular** (blue/purple): thin skin showing blood vessels — retinol thickens skin over time; caffeine constricts vessels temporarily\n• **Structural** (hollow): caused by volume loss — topical products have limited effect; fillers are the most effective solution\n• **Puffiness**: caused by fluid retention — sleep elevated, reduce salt, use cold eye masks in the morning\n\n**Universal tips**: 7–9 hours sleep, stay hydrated, reduce alcohol and salt, manage allergies (they cause under-eye swelling).",
  },

  // ── Diet & food for skin ───────────────────────────────────────────────────
  {
    keywords: ['diet', 'food for skin', 'eat for skin', 'skin diet', 'nutrition skin', 'what to eat'],
    response: "**Diet has a real impact on skin health.** Here's what the evidence supports:\n\n🥑 **Eat more**:\n• Fatty fish (salmon, sardines) — omega-3s reduce inflammation\n• Avocado, olive oil — healthy fats support the skin barrier\n• Colourful vegetables — antioxidants fight free radical damage\n• Green tea — EGCG reduces UV damage and inflammation\n• Nuts and seeds — vitamin E, zinc, selenium\n• Sweet potato, carrots — beta-carotene (pro-vitamin A)\n\n🚫 **Reduce**:\n• High-glycaemic foods (white bread, sugar, soda) — spike insulin → increase androgens → trigger acne\n• Dairy (especially skim milk) — linked to acne in some studies\n• Alcohol — dehydrates skin, dilates blood vessels, worsens rosacea\n• Processed/fried foods — promote systemic inflammation",
    followUp: "Do you have a specific skin concern you'd like diet advice for — acne, ageing, rosacea, or eczema?",
  },
  {
    keywords: ['water', 'hydration', 'drink water skin', 'how much water'],
    response: "**Hydration and skin** — the relationship is real but nuanced:\n\n• Drinking adequate water (2–3L/day) supports overall skin function and reduces the appearance of dehydration lines\n• However, drinking extra water beyond your needs won't dramatically change skin appearance — topical hydration (hyaluronic acid, moisturisers) is more directly effective\n• **Signs your skin is dehydrated**: dull appearance, fine lines that disappear when you pinch skin, tight feeling after cleansing\n\n**Boost skin hydration**:\n• Hyaluronic acid serum on damp skin\n• Humidifier in dry environments\n• Reduce caffeine and alcohol\n• Eat water-rich foods: cucumber, watermelon, celery",
  },
  // ── Lifestyle ──────────────────────────────────────────────────────────────
  {
    keywords: ['stress skin', 'stress acne', 'stress breakout', 'cortisol skin'],
    response: "**Stress directly impacts skin** through cortisol and other stress hormones:\n\n• Cortisol increases sebum production → triggers acne\n• Stress impairs the skin barrier → worsens eczema, psoriasis, rosacea\n• Stress delays wound healing by up to 40%\n• Stress-induced inflammation accelerates skin ageing\n\n**What helps**:\n• Regular exercise (reduces cortisol, improves circulation to skin)\n• 7–9 hours of quality sleep — skin repairs itself during deep sleep\n• Mindfulness, meditation, or yoga\n• Adaptogenic supplements: ashwagandha, rhodiola (consult a doctor first)\n• Consistent skincare routine — the ritual itself can be calming",
  },
  {
    keywords: ['sleep skin', 'beauty sleep', 'skin repair sleep', 'overnight skin'],
    response: "**Sleep is when your skin does its most important repair work:**\n\n• Growth hormone peaks during deep sleep — stimulates collagen production\n• Blood flow to skin increases — delivering nutrients and removing waste\n• Cortisol drops — reducing inflammation\n• Trans-epidermal water loss increases at night — your skin is more permeable\n\n**Maximise overnight skin repair**:\n• Apply your richest moisturiser or a facial oil at night\n• Use retinol or AHAs at night (they're photosensitive anyway)\n• Sleep on a **silk or satin pillowcase** — reduces friction and moisture absorption\n• Sleep on your **back** if possible — side/stomach sleeping causes sleep lines\n• Aim for 7–9 hours consistently",
  },

  // ── Treatments & procedures ────────────────────────────────────────────────
  {
    keywords: ['chemical peel', 'peel', 'glycolic peel', 'tca peel'],
    response: "**Chemical peels** use acids to exfoliate and resurface skin:\n\n• **Superficial peels** (glycolic 20–50%, lactic, salicylic): minimal downtime, treat texture, mild pigmentation, acne\n• **Medium peels** (TCA 15–35%): treat deeper wrinkles, moderate pigmentation, acne scars — 5–7 days downtime\n• **Deep peels** (phenol): dramatic results for severe wrinkles — significant downtime, done by physicians only\n\n**Post-peel care**:\n• No active acids (AHA/BHA/retinoids) for 72 hours minimum\n• Gentle cleanser and thick fragrance-free moisturiser only\n• **Strict SPF 50+** — peeled skin is extremely UV-sensitive\n• No picking or peeling skin manually — risk of scarring and PIH",
  },
  {
    keywords: ['microneedling', 'dermaroller', 'collagen induction'],
    response: "**Microneedling** creates controlled micro-injuries to stimulate collagen and elastin production:\n\n• Treats: acne scars, enlarged pores, fine lines, skin laxity, stretch marks\n• Professional treatments (0.5–2.5mm depth) give best results — 3–6 sessions recommended\n• At-home dermarollers (0.2–0.3mm) can enhance product absorption but don't stimulate collagen significantly\n\n**Post-treatment care**:\n• Avoid active ingredients (retinol, acids, vitamin C) for 48–72 hours\n• Use only gentle cleanser, hyaluronic acid, and SPF\n• Avoid sun exposure and sweating for 24–48 hours\n• Redness and mild swelling for 1–3 days is normal",
  },
  {
    keywords: ['laser', 'laser treatment', 'ipl', 'laser resurfacing', 'fraxel'],
    response: "**Laser and light treatments** target specific skin concerns:\n\n• **IPL (Intense Pulsed Light)**: treats pigmentation, redness, rosacea, sun damage\n• **Fractional lasers (Fraxel)**: resurfaces skin for wrinkles, scars, texture\n• **Nd:YAG / Pulsed Dye Laser**: targets vascular lesions, rosacea, spider veins\n• **CO2 laser**: most aggressive — deep resurfacing for severe wrinkles and scars\n\n**Important**: Darker skin tones (Fitzpatrick IV–VI) need lasers specifically calibrated for melanin-rich skin to avoid PIH. Always consult a board-certified dermatologist.\n\nDowntime varies from 1 day (IPL) to 2 weeks (ablative CO2).",
  },
  // ── App features ───────────────────────────────────────────────────────────
  {
    keywords: ['how does the scan work', 'how does ai work', 'how accurate', 'model accuracy', 'ai scan', 'how to scan'],
    response: "**How DermaVision AI works:**\n\n1. You upload or capture a skin image\n2. Our deep learning model (trained on 22 skin condition classes) analyses texture, colour, border patterns, and lesion morphology\n3. It returns a primary diagnosis with a confidence score, plus top alternative predictions\n4. The result is matched to our clinical encyclopedia for treatment, skincare, and precaution recommendations\n\n**Accuracy**: ~94.2% on our validation set. However, AI is a screening tool — it does NOT replace a clinical dermoscopy exam by a dermatologist.\n\nTo get the best results: use good lighting, keep the camera steady, and capture only the affected area.",
  },
  {
    keywords: ['book doctor', 'consult doctor', 'see dermatologist', 'appointment', 'specialist'],
    response: "You can book a live consultation with a board-certified dermatologist directly in the app!\n\nHead to the **Consult Doctor** section in the sidebar. You'll find specialists for:\n• Acne & inflammatory conditions\n• Atypical nevi & oncology triage\n• Eczema & atopic skin barriers\n\nYou can select a date, pick an available time slot, and confirm your video consultation. A link will be sent to your email.",
  },
  {
    keywords: ['full skin analysis', 'full analysis', 'skin analysis feature'],
    response: "The **Full Skin Analysis** feature is a comprehensive 3-step flow:\n\n1. **Upload your skin image** — our AI scans it and detects the condition\n2. **Answer 4 quick questions** — skin type, primary concern, age group, lifestyle\n3. **Get personalised recommendations** — including:\n   • A custom morning & night skincare routine\n   • 4 curated product picks (cleanser, moisturiser, SPF, treatment serum)\n   • Food & diet tips tailored to your condition and lifestyle\n\nYou can access it from the **Full Skin Analysis** button in the navbar or sidebar.",
  },

  // ── Misc / General ─────────────────────────────────────────────────────────
  {
    keywords: ['sunburn', 'burnt skin', 'sun damage', 'peeling after sun'],
    response: "**Sunburn treatment** — act fast to minimise damage:\n\n• **Cool the skin**: cool (not cold) shower or damp cloth — do NOT apply ice\n• **Moisturise immediately**: aloe vera gel, or a fragrance-free lotion with ceramides\n• **Hydrate**: drink extra water — sunburn draws fluid to the skin surface\n• **Pain relief**: ibuprofen reduces inflammation and pain\n• **Don't pop blisters** — they protect against infection\n• Avoid further sun exposure until fully healed\n\n**Long-term**: A single blistering sunburn in childhood doubles melanoma risk. Daily SPF 50+ is non-negotiable.",
  },
  {
    keywords: ['stretch mark', 'striae', 'stretch marks'],
    response: "**Stretch marks (striae)** form when skin stretches rapidly, tearing the dermis:\n\n• **Red/purple marks (striae rubra)**: new — most responsive to treatment\n• **White/silver marks (striae alba)**: older — harder to treat\n\n**What helps**:\n• **Tretinoin cream** (prescription) — most evidence for new red marks\n• **Microneedling** — stimulates collagen in the dermis\n• **Fractional laser** — best for older white marks\n• **Topical oils** (rosehip, bio-oil): limited evidence but safe and hydrating\n\nNo topical product fully eliminates stretch marks — managing expectations is important. They do fade significantly over time.",
  },
  {
    keywords: ['keratosis pilaris', 'kp', 'chicken skin', 'bumpy arms', 'rough arms'],
    response: "**Keratosis Pilaris (KP)** — those small rough bumps on arms, thighs, or cheeks — is caused by keratin plugging hair follicles:\n\n• It's extremely common (affects ~40% of adults) and completely harmless\n• **Exfoliate gently**: AHA lotion (AmLactin, Gold Bond Rough & Bumpy) or BHA body wash\n• **Moisturise heavily** after showering while skin is still damp\n• **Urea 10–20% cream** softens and dissolves keratin plugs effectively\n• Avoid harsh scrubbing — it worsens inflammation\n\nKP often improves in summer (humidity + sun exposure) and worsens in winter. It tends to improve with age.",
  },
  {
    keywords: ['lip', 'chapped lips', 'dry lips', 'lip care'],
    response: "**Chapped lips** are caused by dehydration, licking lips, cold/dry weather, or irritating ingredients:\n\n• **Avoid licking lips** — saliva evaporates and leaves lips drier\n• Apply a **fragrance-free lip balm** with occlusive ingredients: petrolatum, shea butter, beeswax\n• **Exfoliate gently** once a week with a soft toothbrush or sugar scrub\n• **SPF lip balm** during the day — lips have no melanin and burn easily\n• Avoid lip products with menthol, camphor, or fragrance — they cause irritation\n\nPersistent cracking at the corners of the mouth (angular cheilitis) may indicate a B vitamin deficiency or fungal infection — see a doctor.",
  },
  {
    keywords: ['hair loss', 'alopecia', 'thinning hair', 'bald', 'scalp'],
    response: "**Hair loss** has many causes — identifying the type is key:\n\n• **Androgenetic alopecia** (pattern baldness): genetic, treated with minoxidil (OTC) or finasteride (prescription)\n• **Telogen effluvium**: diffuse shedding 2–3 months after stress, illness, or nutritional deficiency — usually reverses\n• **Alopecia areata**: autoimmune, patchy loss — treated with corticosteroid injections or JAK inhibitors\n• **Traction alopecia**: from tight hairstyles — stop the tension early to prevent permanent loss\n\n**Nutritional causes**: iron deficiency, low ferritin, vitamin D deficiency, and zinc deficiency are common reversible causes. Get blood work done.\n\nA dermatologist can perform a scalp biopsy or trichoscopy for accurate diagnosis.",
  },
];

// ─── Fallback responses (rotated to avoid repetition) ────────────────────────
const FALLBACKS = [
  "That's a great question! I don't have a specific answer for that yet, but I'd suggest running a **Full Skin Analysis** in the app for personalised recommendations, or visiting the **Encyclopedia** for detailed condition info. You can also **book a dermatologist consultation** for expert advice.",
  "I'm not sure I have enough detail to answer that precisely. Could you describe your symptoms more — for example, where on the body, how long it's been there, and whether it's itchy, painful, or changing? That'll help me give you a better answer.",
  "Hmm, I don't have a specific response for that topic yet. Try asking about a specific skin condition (like acne, eczema, or rosacea), an ingredient (like retinol or niacinamide), or a skincare routine for your skin type!",
  "I want to make sure I give you accurate information. For that specific concern, I'd recommend consulting with one of our board-certified dermatologists in the **Consult Doctor** section — they can give you a personalised clinical assessment.",
];

let fallbackIndex = 0;

// ─── Main response function ───────────────────────────────────────────────────
export function getBotResponse(userMessage) {
  const q = userMessage.toLowerCase().trim();

  // Find best matching intent (count keyword hits, pick highest)
  let bestIntent = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q.includes(kw)) score += kw.split(' ').length; // multi-word keywords score higher
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && bestScore > 0) {
    const reply = bestIntent.response;
    const followUp = bestIntent.followUp || null;
    return { reply, followUp };
  }

  // Rotate fallbacks
  const reply = FALLBACKS[fallbackIndex % FALLBACKS.length];
  fallbackIndex++;
  return { reply, followUp: null };
}
