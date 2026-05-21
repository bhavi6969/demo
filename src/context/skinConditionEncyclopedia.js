// Import all 22 custom dataset files directly
import acneData from '../../dataset/Acne/acneData.js';
import actinicKeratosisData from '../../dataset/Actinic_Keratosis/actinicKeratosisData.js';
import benignTumorsData from '../../dataset/Benign_tumors/benignTumorsData.js';
import bullousData from '../../dataset/Bullous/bullousData.js';
import candidiasisData from '../../dataset/Candidiasis/candidiasisData.js';
import drugEruptionData from '../../dataset/DrugEruption/drugEruptionData.js';
import eczemaData from '../../dataset/Eczema/eczemaData.js';
import infestationBitesData from '../../dataset/Infestation_Bites/infestationBitesData.js';
import lichenData from '../../dataset/Lichen/lichenData.js';
import lupusData from '../../dataset/Lupus/lupusData.js';
import molesData from '../../dataset/Moles/molesData.js';
import psoriasisData from '../../dataset/Psoriasis/psoriasisData.js';
import rosaceaData from '../../dataset/Rosacea/rosaceaData.js';
import seborrheicKeratosesData from '../../dataset/Seborrh_Keratoses/seborrheicKeratosesData.js';
import skinCancerData from '../../dataset/SkinCancer/skinCancerData.js';
import sunDamageData from '../../dataset/Sun_Sunlight_Damage/sunDamageData.js';
import tineaData from '../../dataset/Tinea/tineaData.js';
import unknownNormalData from '../../dataset/Unkown_Normal/unknownNormalData.js';
import vascularTumorsData from '../../dataset/Vascular_Tumors/vascularTumorsData.js';
import vasculitisData from '../../dataset/Vasculitis/vasculitisData.js';
import vitiligoData from '../../dataset/Vitiligo/vitiligoData.js';
import wartsData from '../../dataset/Warts/wartsData.js';

/**
 * Normalizes and maps the raw dataset structure into the exact schema expected by the UI.
 */
const mapRawData = (data, id) => {
  if (!data) return {};

  const severityStr = data.severity || 'Mild';
  let severityVal = 30;
  let severityColor = 'text-teal-500 bg-teal-500/10 border-teal-500/30';
  
  if (
    severityStr.toLowerCase() === 'high' || 
    severityStr.toLowerCase() === 'severe' || 
    severityStr.toLowerCase().includes('urgent')
  ) {
    severityVal = 85;
    severityColor = 'text-rose-500 bg-rose-500/10 border-rose-500/30';
  } else if (
    severityStr.toLowerCase() === 'moderate' || 
    severityStr.toLowerCase() === 'medium'
  ) {
    severityVal = 60;
    severityColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
  }

  // Format Skincare Routine: Divide the array of steps into morning and night categories
  let morningSkincare = '';
  let nightSkincare = '';
  if (data.skincareRoutine && Array.isArray(data.skincareRoutine)) {
    const half = Math.ceil(data.skincareRoutine.length / 2);
    morningSkincare = data.skincareRoutine.slice(0, half).map(item => `${item.title}: ${item.description}`).join(' • ');
    nightSkincare = data.skincareRoutine.slice(half).map(item => `${item.title}: ${item.description}`).join(' • ');
  } else if (data.skincare) {
    morningSkincare = data.skincare.morning || '';
    nightSkincare = data.skincare.night || '';
  }

  // Format Medicines
  const rawMeds = data.medicineSuggestions || data.medicines || [];
  const medicines = rawMeds.map(med => ({
    name: med.name || '',
    dosage: med.usage || med.dosage || med.type || 'Apply as directed by physician'
  }));

  return {
    id,
    name: data.disease || id,
    confidence: data.confidence ? `${data.confidence}%` : '92%',
    severity: severityStr,
    severityColor,
    severityValue: severityVal,
    symptoms: data.symptoms || [],
    treatments: data.recommendedTreatment || data.treatments || [],
    precautions: data.precautions || [],
    skincare: {
      morning: morningSkincare || 'Wash face with a gentle hydrating cleanser and apply SPF 50+.',
      night: nightSkincare || 'Cleanse skin thoroughly and apply target treatment followed by moisturizer.'
    },
    remedies: data.homeRemedies || data.remedies || [],
    medicines
  };
};

export const SKIN_DISEASES = {
  acne: mapRawData(acneData, 'acne'),
  actinic_keratosis: mapRawData(actinicKeratosisData, 'actinic_keratosis'),
  benign_tumors: mapRawData(benignTumorsData, 'benign_tumors'),
  bullous: mapRawData(bullousData, 'bullous'),
  candidiasis: mapRawData(candidiasisData, 'candidiasis'),
  drugeruption: mapRawData(drugEruptionData, 'drugeruption'),
  eczema: mapRawData(eczemaData, 'eczema'),
  infestations_bites: mapRawData(infestationBitesData, 'infestations_bites'),
  lichen: mapRawData(lichenData, 'lichen'),
  lupus: mapRawData(lupusData, 'lupus'),
  moles: mapRawData(molesData, 'moles'),
  psoriasis: mapRawData(psoriasisData, 'psoriasis'),
  rosacea: mapRawData(rosaceaData, 'rosacea'),
  seborrh_keratoses: mapRawData(seborrheicKeratosesData, 'seborrh_keratoses'),
  skincancer: mapRawData(skinCancerData, 'skincancer'),
  sun_sunlight_damage: mapRawData(sunDamageData, 'sun_sunlight_damage'),
  tinea: mapRawData(tineaData, 'tinea'),
  unknown_normal: mapRawData(unknownNormalData, 'unknown_normal'),
  vascular_tumors: mapRawData(vascularTumorsData, 'vascular_tumors'),
  vasculitis: mapRawData(vasculitisData, 'vasculitis'),
  vitiligo: mapRawData(vitiligoData, 'vitiligo'),
  warts: mapRawData(wartsData, 'warts')
};
