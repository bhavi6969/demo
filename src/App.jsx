import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import { useApp } from './context/AppContext';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Detection from './pages/Detection';
import Result from './pages/Result';
import Doctors from './pages/Doctors';
import Chatbot from './pages/Chatbot';
import Settings from './pages/Settings';
import Encyclopedia from './pages/Encyclopedia';
import FullSkinAnalysis from './pages/FullSkinAnalysis';
import LesionTracker from './pages/LesionTracker';
import IngredientScanner from './pages/IngredientScanner';

// Layout for general public landing, login, and registration screens
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#16171d] transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


function ProtectedRoute({ children }) {
  const { token, loading } = useApp();
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-[#16171d]">
        <div className="w-10 h-10 border-4 border-[#5AA7A7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Layout for clinical authenticated dashboard sections
function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen lg:p-5 lg:gap-5 overflow-hidden transition-colors duration-300">
      {/* Sidebar on the left — desktop only */}
      <Sidebar />
      
      {/* Main content viewport on the right */}
      <div className="flex-1 flex flex-col lg:gap-5 h-full overflow-hidden min-w-0">
        {/* Top-bar Navbar */}
        <div className="shrink-0 p-3 lg:p-0">
          <Navbar />
        </div>
        
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto px-3 pb-3 lg:px-0 lg:pb-0 lg:pr-1">
          <Outlet />
        </main>
      </div>
      <ChatbotWidget />
    </div>
  );
}

// Page Motion Wrapper to apply smooth fade and slide transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          <Route path="/encyclopedia" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/detect" element={<PageWrapper><Detection /></PageWrapper>} />
          <Route path="/result" element={<PageWrapper><Result /></PageWrapper>} />
          <Route path="/doctors" element={<PageWrapper><Doctors /></PageWrapper>} />
          <Route path="/chatbot" element={<PageWrapper><Chatbot /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
          <Route path="/full-analysis" element={<PageWrapper><FullSkinAnalysis /></PageWrapper>} />
          <Route path="/tracker" element={<PageWrapper><LesionTracker /></PageWrapper>} />
          <Route path="/scanner" element={<PageWrapper><IngredientScanner /></PageWrapper>} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
}
