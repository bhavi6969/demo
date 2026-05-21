import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

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

// Layout for clinical authenticated dashboard sections
function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen p-5 gap-5 overflow-hidden transition-colors duration-300">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content viewport on the right */}
      <div className="flex-1 flex flex-col gap-5 h-full overflow-hidden">
        {/* Top-bar Navbar */}
        <Navbar />
        
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto pr-1">
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
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/detect" element={<PageWrapper><Detection /></PageWrapper>} />
          <Route path="/result" element={<PageWrapper><Result /></PageWrapper>} />
          <Route path="/doctors" element={<PageWrapper><Doctors /></PageWrapper>} />
          <Route path="/chatbot" element={<PageWrapper><Chatbot /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
}
