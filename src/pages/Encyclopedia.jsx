import { useEffect, useState } from 'react';

import actinicKeratosisData from '../../dataset/Actinic_Keratosis/actinicKeratosisData.js';
import acneData from '../../dataset/Acne/acneData.js';
import psoriasisData from '../../dataset/Psoriasis/psoriasisData.js';
import skinCancerData from '../../dataset/SkinCancer/skinCancerData.js';
import vitiligoData from '../../dataset/Vitiligo/vitiligoData.js';
import benignTumorsData from '../../dataset/Benign_tumors/benignTumorsData.js';
import bullousData from '../../dataset/Bullous/bullousData.js';
import candidiasisData from '../../dataset/Candidiasis/candidiasisData.js';
import drugEruptionData from '../../dataset/DrugEruption/drugEruptionData.js';
import eczemaData from '../../dataset/Eczema/eczemaData.js';
import infestationBitesData from '../../dataset/Infestation_Bites/infestationBitesData.js';
import lichenData from '../../dataset/Lichen/lichenData.js';
import lupusData from '../../dataset/Lupus/lupusData.js';
import molesData from '../../dataset/Moles/molesData.js';
import rosaceaData from '../../dataset/Rosacea/rosaceaData.js';

const allDiseases = [
  actinicKeratosisData,
  acneData,
  psoriasisData,
  skinCancerData,
  vitiligoData,
  benignTumorsData,
  bullousData,
  candidiasisData,
  drugEruptionData,
  eczemaData,
  infestationBitesData,
  lichenData,
  lupusData,
  molesData,
  rosaceaData,
];

export default function Encyclopedia() {
  const [diseases, setDiseases] = useState([]);
  const [query, setQuery] = useState('');
  const [chronicOnly, setChronicOnly] = useState('all'); // all | yes | no

  // Initialize diseases once (avoid setState in effect for performance/lint friendliness)
  useEffect(() => {
    setDiseases(allDiseases);
  }, []);


  const getChronicValue = (item) => {
    // Some datasets use item.chronic, others use item.overview.chronic
    if (item?.overview?.chronic !== undefined) return item.overview.chronic;
    if (item?.chronic !== undefined) return item.chronic;
    return undefined;
  };

  const normalize = (s) => (s || '').toString().toLowerCase();

  const filteredDiseases = diseases.filter((item) => {
    const chronicValue = getChronicValue(item);

    if (chronicOnly === 'yes') {
      if (chronicValue !== true) return false;
    } else if (chronicOnly === 'no') {
      if (chronicValue !== false) return false;
    }

    const q = normalize(query).trim();
    if (!q) return true;

    const name = normalize(item.disease);
    const overviewDesc = normalize(item.overview?.description || item.description);
    const symptoms = (item.symptoms || []).map(normalize).join(' ');

    return (
      name.includes(q) ||
      overviewDesc.includes(q) ||
      symptoms.includes(q)
    );
  });

  const getDiseaseImageUrl = (diseaseName) => {
    // Unsplash Source sometimes blocks/returns 403 or nothing depending on browser/network.
    // Use an additional parameter and a deterministic fallback.
    const q = encodeURIComponent(diseaseName);
    return `https://source.unsplash.com/featured/600x420?skin,${q}&sig=${q}`;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#5AA7A7] drop-shadow">
        Skin Condition Encyclopedia
      </h1>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-700 mb-1">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search disease or symptoms..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#5AA7A7]/40 text-sm"
            />
          </div>

          <div className="w-full md:w-56">
            <label className="block text-xs font-bold text-slate-700 mb-1">Chronic</label>
            <select
              value={chronicOnly}
              onChange={(e) => setChronicOnly(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#5AA7A7]/40 text-sm bg-white"
            >
              <option value="all">All</option>
              <option value="yes">Chronic only</option>
              <option value="no">Not chronic</option>
            </select>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Showing <span className="font-bold text-slate-700">{filteredDiseases.length}</span> conditions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDiseases.map((item) => {
          const chronicValue = getChronicValue(item);
          const imageUrl = getDiseaseImageUrl(item.disease);


          return (
            <div
              key={item.disease}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-200 flex flex-col"
            >

              <div className="h-40 bg-slate-50">
                <img
                  src={imageUrl}
                  alt={item.disease}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold mb-2 text-[#489b9b]">{item.disease}</h2>
                <p className="mb-2 text-slate-700 text-sm">
                  {item.overview?.description || item.description}
                </p>

                <div className="mb-2">
                  <span className="font-bold text-slate-800">Symptoms:</span>
                  <ul className="list-disc ml-6 text-slate-600 text-xs">
                    {(item.symptoms || []).map((sym, i) => (
                      <li key={i}>{sym}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-2">
                  <span className="font-bold text-slate-800">Causes:</span>
                  <ul className="list-disc ml-6 text-slate-600 text-xs">
                    {(item.causes || []).map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-2">
                  <span className="font-bold text-slate-800">Recommended Treatment:</span>
                  <ul className="list-disc ml-6 text-slate-600 text-xs">
                    {(item.recommendedTreatment || item.treatment || []).map((treat, i) => (
                      <li key={i}>{treat}</li>
                    ))}
                  </ul>
                </div>

                {item.precautions && (
                  <div className="mb-2">
                    <span className="font-bold text-slate-800">Precautions:</span>
                    <ul className="list-disc ml-6 text-slate-600 text-xs">
                      {item.precautions.map((prec, i) => (
                        <li key={i}>{prec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-2 text-xs text-slate-400">
                  <span>Common Age Group: {item.overview?.common_age_group || 'All ages'}</span>
                  {chronicValue !== undefined && (
                    <span> | Chronic: {chronicValue ? 'Yes' : 'No'}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

