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

const DISEASE_UNSPLASH_IDS = {
  acne: 'photo-1608248597279-f99d160bfcbc',
  actinic_keratosis: 'photo-1620121692029-d088224ddc74',
  benign_tumors: 'photo-1516549655169-df83a0774514',
  bullous: 'photo-1579684389782-64d84b5e901a',
  candidiasis: 'photo-1584515979956-d9f6e5d09982',
  drugeruption: 'photo-1584308666744-24d5c474f2ae',
  eczema: 'photo-1607613009820-a29f7bb81c04',
  infestations_bites: 'photo-1573883430697-4c3479aae6b9',
  lichen: 'photo-1618005182384-a83a8bd57fbe',
  lupus: 'photo-1576091160399-112ba8d25d1d',
  moles: 'photo-1505944270255-72b8c68c6a70',
  psoriasis: 'photo-1522337360788-8b13dee7a37e',
  rosacea: 'photo-1556228720-195a672e8a03',
  seborrh_keratoses: 'photo-1614859324967-bdf461fcf7ec',
  skincancer: 'photo-1551836022-d5d88e9218df',
  sun_sunlight_damage: 'photo-1527631746610-bca00a040d60',
  tinea: 'photo-1601049676099-e7ed07d825b0',
  unknown_normal: 'photo-1616683693504-3ea7e9ad6fec',
  vascular_tumors: 'photo-1532187640681-7335541ac76a',
  vasculitis: 'photo-1576086213369-97a306d36557',
  vitiligo: 'photo-1620802086300-3453b3b4f53f',
  warts: 'photo-1506126613408-eca07ce68773'
};

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

  const unsplashId = DISEASE_UNSPLASH_IDS[id] || 'photo-1616683693504-3ea7e9ad6fec';
  const imageUrl = `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=600&q=80`;

  const chronicValue = data.overview?.chronic !== undefined 
    ? data.overview.chronic 
    : (data.chronic !== undefined ? data.chronic : false);

  const commonAgeGroup = data.overview?.common_age_group || data.common_age_group || 'All ages';

  return {
    id,
    name: data.disease || id,
    confidence: data.confidence ? `${data.confidence}%` : '92%',
    severity: severityStr,
    severityColor,
    severityValue: severityVal,
    description: data.overview?.description || data.description || '',
    causes: data.causes || [],
    symptoms: data.symptoms || [],
    treatments: data.recommendedTreatment || data.treatments || data.treatment || [],
    precautions: data.precautions || [],
    skincare: {
      morning: morningSkincare || 'Wash face with a gentle hydrating cleanser and apply SPF 50+.',
      night: nightSkincare || 'Cleanse skin thoroughly and apply target treatment followed by moisturizer.'
    },
    remedies: data.homeRemedies || data.remedies || [],
    medicines,
    chronic: chronicValue,
    common_age_group: commonAgeGroup,
    imageUrl
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
