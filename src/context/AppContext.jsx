import { createContext, useContext, useState } from 'react';
import { SKIN_DISEASES } from './skinConditionEncyclopedia';

const AppContext = createContext();

export { SKIN_DISEASES };

const INITIAL_SCANS = [
  {
    id: 'scan-102',
    date: '2026-05-18',
    time: '14:23',
    diseaseId: 'acne',
    diseaseName: 'Acne Vulgaris',
    confidence: '96%',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1628102428189-6c4cf008719c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', // placeholder skin representation
    status: 'Completed'
  },
  {
    id: 'scan-101',
    date: '2026-04-12',
    time: '09:15',
    diseaseId: 'dermatitis',
    diseaseName: 'Contact Dermatitis',
    confidence: '94%',
    severity: 'Mild',
    imageUrl: 'https://images.unsplash.com/photo-1606501170755-58210fe9f2a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'Completed'
  },
  {
    id: 'scan-100',
    date: '2026-02-28',
    time: '18:40',
    diseaseId: 'eczema',
    diseaseName: 'Atopic Dermatitis (Eczema)',
    confidence: '92%',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'Completed'
  }
];

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Alexander Mercer',
    email: 'alex.mercer@cyberhealth.ai',
    phone: '+1 (555) 019-2834',
    scanCount: 14,
    plan: 'Pro AI Member',
    joined: 'Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  const [scans, setScans] = useState(INITIAL_SCANS);
  const [currentScan, setCurrentScan] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Clinical Report #scan-102 compiled successfully.', time: '2 days ago', unread: false },
    { id: 2, text: 'Annual skin health diagnostic tracker updated.', time: '1 week ago', unread: false },
    { id: 3, text: 'Welcome to IMPACT AI. Secure clinical storage is active.', time: '3 months ago', unread: false }
  ]);

  const addNotification = (text) => {
    setNotifications((prev) => [
      { id: Date.now(), text, time: 'Just now', unread: true },
      ...prev
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Simulates the AI diagnostic pipeline and hits the backend endpoint in parallel
  const runAIScanSimulation = async (imageSrc, callbackProgress) => {
    // Start backend request in parallel
    const apiPromise = (async () => {
      try {
        const formData = new FormData();
        if (imageSrc.startsWith('data:') || imageSrc.startsWith('blob:')) {
          const res = await fetch(imageSrc);
          const blob = await res.blob();
          formData.append('image', blob, 'scan.jpg');
        } else {
          return null;
        }

        let response;
        try {
          response = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            body: formData
          });
        } catch (e) {
          response = await fetch('/api/predict', {
            method: 'POST',
            body: formData
          });
        }

        if (response && response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.error("Backend model prediction failed:", err);
      }
      return null;
    })();

    return new Promise((resolve) => {
      const steps = [
        { label: 'Initializing Neural Engine...', progress: 15 },
        { label: 'Analyzing image resolution and color variance...', progress: 35 },
        { label: 'Segmenting skin lesions and border atypicality...', progress: 55 },
        { label: 'Calculating probability densities across 22 classes...', progress: 75 },
        { label: 'Compiling diagnostic confidence thresholds...', progress: 95 },
        { label: 'Finalizing clinical recommendations...', progress: 100 }
      ];

      let currentStep = 0;
      
      const interval = setInterval(async () => {
        if (currentStep < steps.length) {
          callbackProgress(steps[currentStep]);
          currentStep++;
        } else {
          clearInterval(interval);
          
          // Await API result (it might have already resolved)
          const apiResult = await apiPromise;
          
          let diseaseInfo = null;
          let confidenceStr = '94%';

          if (apiResult && apiResult.success) {
            // Find corresponding class key in our encyclopedia
            const normalizedClassName = apiResult.class_name.toLowerCase().replace(/_/g, "").replace(/ /g, "").replace(/-/g, "");
            const matchedKey = Object.keys(SKIN_DISEASES).find(key => {
              const normalizedKey = key.toLowerCase().replace(/_/g, "").replace(/ /g, "").replace(/-/g, "");
              return normalizedKey === normalizedClassName;
            });
            
            if (matchedKey && SKIN_DISEASES[matchedKey]) {
              diseaseInfo = SKIN_DISEASES[matchedKey];
            }
            confidenceStr = Math.round(apiResult.confidence * 100) + '%';
          }

          // Fallback if not resolved
          if (!diseaseInfo) {
            const keys = Object.keys(SKIN_DISEASES);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            diseaseInfo = SKIN_DISEASES[randomKey];
            confidenceStr = '88%';
          }
          
          const newScanId = `scan-${Math.floor(100 + Math.random() * 900)}`;
          const now = new Date();
          const dateStr = now.toISOString().split('T')[0];
          const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);

          const resultPayload = {
            id: newScanId,
            date: dateStr,
            time: timeStr,
            diseaseId: diseaseInfo.id,
            diseaseName: diseaseInfo.name,
            confidence: confidenceStr,
            severity: diseaseInfo.severity,
            imageUrl: imageSrc || 'https://images.unsplash.com/photo-1628102428189-6c4cf008719c?w=400&auto=format&fit=crop&q=60',
            status: 'Completed',
            source: apiResult ? apiResult.source : 'simulation_fallback'
          };

          // Save scan to history log
          setScans((prev) => [resultPayload, ...prev]);
          setUser((prev) => ({ ...prev, scanCount: prev.scanCount + 1 }));
          addNotification(`AI Scan ${newScanId} finished. Detected condition: ${diseaseInfo.name} (${confidenceStr})`);

          resolve(resultPayload);
        }
      }, 900); // Trigger a transition roughly every 900ms, total scan takes ~5 seconds
    });
  };

  const updateProfile = (updatedDetails) => {
    setUser((prev) => ({ ...prev, ...updatedDetails }));
    addNotification('User profile settings updated successfully.');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        scans,
        currentScan,
        setCurrentScan,
        notifications,
        addNotification,
        clearNotifications,
        runAIScanSimulation,
        updateProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
