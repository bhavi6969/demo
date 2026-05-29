import React from 'react';
import { AlertOctagon, X, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function TriageBanner() {
  const { triageAlert, setTriageAlert } = useApp();

  return (
    <AnimatePresence>
      {triageAlert && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 w-full z-[100] p-4 pointer-events-none flex justify-center"
        >
          <div className="bg-red-600/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-red-400 pointer-events-auto flex items-center gap-4 max-w-2xl w-full">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <AlertOctagon className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-extrabold text-sm leading-tight">
                CRITICAL ALERT: {triageAlert.disease} Detected
              </h3>
              <p className="text-[11px] font-medium text-red-100 mt-0.5 leading-tight">
                DermaVision AI has detected a high-risk condition with {triageAlert.confidence} confidence. Please seek immediate medical attention from a certified dermatologist.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => window.open('tel:911')}
                className="bg-white text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-full text-[10px] font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Contact Doctor
              </button>
              <button
                onClick={() => setTriageAlert(null)}
                className="p-1.5 rounded-full hover:bg-red-500 transition-colors text-red-200 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
