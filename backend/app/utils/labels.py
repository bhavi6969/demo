# Standardized classes for the ensemble
STANDARD_CLASSES = [
    "Acne", "Actinic Keratosis", "Alopecia", "Benign Tumors", "Bullous", "Candidiasis",
    "Drug Eruption", "Eczema", "Herpes", "Infestations Bites", "Keloids", "Lichen", "Lupus",
    "Moles", "Nail Fungus", "Psoriasis", "Rosacea", "Seborrheic Keratoses", "Skin Cancer",
    "Sun Damage", "Tinea", "Unknown Normal", "Urticaria", "Vascular Tumors", "Vasculitis",
    "Vitiligo", "Warts"
]

# The UI already handles treatment plans via the skinConditionEncyclopedia.
# We will just export an empty dict or minimal fallback.
TREATMENT_PLANS = {}

CUSTOM_CNN_MAPPING = {
    0: "Actinic Keratosis",
    1: "Skin Cancer",
    2: "Benign Tumors",
    3: "Unknown Normal",
    4: "Skin Cancer",
    5: "Moles",
    6: "Vascular Tumors"
}

def map_hf_label_to_standard(hf_label: str) -> str:
    label = hf_label.lower()
    if "acne" in label: return "Acne"
    if "actinic" in label or "akiec" in label: return "Actinic Keratosis"
    if "alopecia" in label or "hair" in label: return "Alopecia"
    if "bullous" in label: return "Bullous"
    if "candid" in label: return "Candidiasis"
    if "drug" in label: return "Drug Eruption"
    if "eczema" in label or "atopic" in label: return "Eczema"
    if "herpes" in label or "cold sore" in label or "hsv" in label: return "Herpes"
    if "bug" in label or "bite" in label or "infest" in label: return "Infestations Bites"
    if "keloid" in label: return "Keloids"
    if "lichen" in label: return "Lichen"
    if "lupus" in label: return "Lupus"
    if "melanoma" in label or "bcc" in label or "cancer" in label: return "Skin Cancer"
    if "nevus" in label or "mole" in label: return "Moles"
    if "nail" in label or "onychomycosis" in label: return "Nail Fungus"
    if "psoriasis" in label: return "Psoriasis"
    if "rosacea" in label: return "Rosacea"
    if "seborrheic" in label: return "Seborrheic Keratoses"
    if "sun" in label: return "Sun Damage"
    if "tinea" in label or "ringworm" in label or "fung" in label: return "Tinea"
    if "urticaria" in label or "hive" in label: return "Urticaria"
    if "vascular" in label or "vasc" in label: return "Vascular Tumors"
    if "vasculitis" in label: return "Vasculitis"
    if "vitiligo" in label: return "Vitiligo"
    if "wart" in label or "hpv" in label: return "Warts"
    if "benign" in label: return "Benign Tumors"
    return "Unknown Normal"
