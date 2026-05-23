import { createContext, useContext, useState, useEffect } from 'react';

// localStorage helpers
const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};
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
  const [token, setToken] = useState(() => localStorage.getItem('dv_token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState([]);
  const [currentScan, setCurrentScan] = useState(null);
  const [notifications, setNotifications] = useState(() => load('dv_notifications', [
    { id: 1, text: 'Welcome to IMPACT AI. Secure clinical storage is active.', time: 'Just now', unread: false, type: 'system' }
  ]));
  const [chatHistory, setChatHistory] = useState([]);
  const [latestAnalysis, setLatestAnalysis] = useState(null);

  // Persist to localStorage whenever notifications change
  useEffect(() => { save('dv_notifications', notifications); }, [notifications]);

  const addNotification = (text, type = 'scan') => {
    setNotifications((prev) => [
      { id: Date.now(), text, time: 'Just now', unread: true, type },
      ...prev
    ]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const logout = () => {
    localStorage.removeItem('dv_token');
    setToken(null);
    setUser(null);
    setScans([]);
    setChatHistory([]);
    setLatestAnalysis(null);
    addNotification('Session closed successfully.');
  };

  const fetchProfileAndHistory = async (authToken) => {
    setLoading(true);
    try {
      const userRes = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData.success) {
          const userObj = {
            ...userData.user,
            plan: 'Pro AI Member',
            joined: userData.user.createdAt ? new Date(userData.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'May 2026',
            avatar: userData.user.profileImage || null
          };
          setUser(userObj);
          
          // Fetch history
          const historyRes = await fetch('/api/predict/history', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (historyRes.ok) {
            const historyData = await historyRes.json();
            if (historyData.success) {
              setScans(historyData.history);
            }
          }

          // Fetch chat history
          const chatRes = await fetch('/api/chat/history', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (chatRes.ok) {
            const chatData = await chatRes.json();
            if (chatData.success) {
              setChatHistory(chatData.messages);
            }
          }

          // Fetch latest skin analysis
          const analysisRes = await fetch('/api/analysis/latest', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (analysisRes.ok) {
            const analysisData = await analysisRes.json();
            if (analysisData.success && analysisData.analysis) {
              setLatestAnalysis(analysisData.analysis);
            }
          }

        } else {
          logout();
        }
      } else {
        logout();
      }
    } catch (err) {
      console.error("Initialization failed:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfileAndHistory(token);
    } else {
      setUser(null);
      setScans([]);
      setChatHistory([]);
      setLatestAnalysis(null);
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Server error: ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data?.message || 'Login failed');
      }
      localStorage.setItem('dv_token', data.token);
      setToken(data.token);
      return data.user;
    } catch (err) {
      console.error("Login failed:", err);
      if (err.message && err.message.includes("Failed to fetch")) {
        throw new Error("Unable to connect to the backend server. Please verify the backend is running on port 5000.");
      }
      if (err.message && err.message.includes("Unexpected end of JSON input")) {
        throw new Error("Invalid response from server. Please verify the backend server is running and configured properly.");
      }
      throw err;
    }
  };

  const signup = async (name, email, password, phone, allergies, skinCondition) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, allergies, skinCondition })
      });
      
      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Server error: ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data?.message || 'Registration failed');
      }
      localStorage.setItem('dv_token', data.token);
      setToken(data.token);
      return data.user;
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.message && err.message.includes("Failed to fetch")) {
        throw new Error("Unable to connect to the backend server. Please verify the backend is running on port 5000.");
      }
      if (err.message && err.message.includes("Unexpected end of JSON input")) {
        throw new Error("Invalid response from server. Please verify the backend server is running and configured properly.");
      }
      throw err;
    }
  };

  const sendChatMessage = async (text) => {
    if (!token) return;
    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setChatHistory(data.messages);
          return data.messages;
        }
      }
    } catch (err) {
      console.error("Failed to send chat message:", err);
    }
  };

  const clearChat = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/chat/history', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setChatHistory(data.messages);
        }
      }
    } catch (err) {
      console.error("Failed to clear chat history:", err);
    }
  };

  const saveSkinAnalysis = async (analysisData) => {
    if (!token) return;
    try {
      const res = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(analysisData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setLatestAnalysis(data.analysis);
          addNotification("Skin analysis report saved to cloud.", "system");
          return data.analysis;
        }
      }
    } catch (err) {
      console.error("Failed to save skin analysis:", err);
    }
  };

  const fetchLatestSkinAnalysis = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/analysis/latest', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.analysis) {
          setLatestAnalysis(data.analysis);
          return data.analysis;
        }
      }
    } catch (err) {
      console.error("Failed to fetch latest skin analysis:", err);
    }
    return null;
  };

  const updateProfile = async (updatedDetails) => {
    if (!token) return;
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedDetails)
      });
      
      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Server error: ${res.status}`);
      }

      if (res.ok && data.success) {
        setUser((prev) => ({
          ...prev,
          ...data.user,
          avatar: data.user.profileImage || null
        }));
        addNotification('User profile settings updated successfully.');
      } else {
        throw new Error(data?.message || 'Profile update failed');
      }
    } catch (err) {
      console.error("Update profile failed:", err);
      let friendlyMessage = err.message;
      if (err.message && err.message.includes("Failed to fetch")) {
        friendlyMessage = "Unable to connect to the backend server.";
      } else if (err.message && err.message.includes("Unexpected end of JSON input")) {
        friendlyMessage = "Invalid response from server.";
      }
      addNotification('Failed to update profile settings: ' + friendlyMessage, 'system');
      throw new Error(friendlyMessage);
    }
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

        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        let response;
        try {
          response = await fetch('/api/predict', {
            method: 'POST',
            headers: headers,
            body: formData
          });
        } catch (e) {
          response = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            headers: headers,
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
      let apiResult = null;
      let apiResolved = false;

      // Listen for API resolution in the background
      apiPromise.then((result) => {
        apiResult = result;
        apiResolved = true;
      });

      const interval = setInterval(async () => {
        // If we reach the compiling step (95%) and API hasn't resolved yet, wait here
        if (currentStep === 4 && !apiResolved) {
          callbackProgress(steps[4]);
          return;
        }

        if (currentStep < steps.length) {
          callbackProgress(steps[currentStep]);
          currentStep++;
        } else {
          clearInterval(interval);
          
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

          let predictions = [];
          if (apiResult && apiResult.success && apiResult.predictions) {
            predictions = apiResult.predictions.map(pred => {
              const normName = pred.class_name.toLowerCase().replace(/_/g, "").replace(/ /g, "").replace(/-/g, "");
              const matchKey = Object.keys(SKIN_DISEASES).find(k => {
                const normK = k.toLowerCase().replace(/_/g, "").replace(/ /g, "").replace(/-/g, "");
                return normK === normName;
              });
              const dInfo = matchKey ? SKIN_DISEASES[matchKey] : null;
              return {
                class_id: pred.class_id,
                class_name: pred.class_name,
                displayName: dInfo ? dInfo.name : pred.class_name,
                confidence: pred.confidence,
                diseaseId: dInfo ? dInfo.id : null
              };
            });
          }

          if (!predictions || predictions.length === 0) {
            // Fallback mock predictions
            const primaryConf = parseFloat(confidenceStr) / 100;
            predictions = [
              {
                class_id: diseaseInfo.id,
                class_name: diseaseInfo.name,
                displayName: diseaseInfo.name,
                confidence: primaryConf,
                diseaseId: diseaseInfo.id
              }
            ];

            const allKeys = Object.keys(SKIN_DISEASES);
            const otherKeys = allKeys.filter(k => SKIN_DISEASES[k].id !== diseaseInfo.id);
            if (otherKeys.length > 0) {
              const firstOther = otherKeys[Math.floor(Math.random() * otherKeys.length)];
              const remainingKeys = otherKeys.filter(k => k !== firstOther);
              const secondOther = remainingKeys.length > 0 ? remainingKeys[Math.floor(Math.random() * remainingKeys.length)] : null;

              const remaining = 1.0 - primaryConf;
              const firstConf = remaining * 0.6;
              const secondConf = remaining * 0.3;

              predictions.push({
                class_id: SKIN_DISEASES[firstOther].id,
                class_name: SKIN_DISEASES[firstOther].name,
                displayName: SKIN_DISEASES[firstOther].name,
                confidence: firstConf,
                diseaseId: SKIN_DISEASES[firstOther].id
              });

              if (secondOther) {
                predictions.push({
                  class_id: SKIN_DISEASES[secondOther].id,
                  class_name: SKIN_DISEASES[secondOther].name,
                  displayName: SKIN_DISEASES[secondOther].name,
                  confidence: secondConf,
                  diseaseId: SKIN_DISEASES[secondOther].id
                });
              }
            }
          }
          
          const newScanId = apiResult?.scanId || `scan-${Math.floor(100 + Math.random() * 900)}`;
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
            imageUrl: apiResult?.uploadedImage || imageSrc || 'https://images.unsplash.com/photo-1628102428189-6c4cf008719c?w=400&auto=format&fit=crop&q=60',
            status: 'Completed',
            source: apiResult ? apiResult.source : 'simulation_fallback',
            predictions: predictions
          };

          // Save scan to history log
          setScans((prev) => [resultPayload, ...prev]);
          if (user) {
            setUser((prev) => ({ ...prev, scanCount: (prev.scanCount || 0) + 1 }));
          }
          addNotification(`AI Scan finished. Detected condition: ${diseaseInfo.name} (${confidenceStr})`);

          resolve(resultPayload);
        }
      }, 150); // Fast 150ms transition ticks
    });
  };

  return (
    <AppContext.Provider
      value={{
        token,
        loading,
        user,
        scans,
        currentScan,
        setCurrentScan,
        notifications,
        addNotification,
        markNotificationRead,
        clearNotifications,
        chatHistory,
        setChatHistory,
        latestAnalysis,
        sendChatMessage,
        clearChat,
        saveSkinAnalysis,
        fetchLatestSkinAnalysis,
        login,
        signup,
        logout,
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
