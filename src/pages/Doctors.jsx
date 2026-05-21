import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, MapPin, Calendar, Clock, X, Search, Sparkles, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins, MD',
    specialty: 'Acne & Inflammatory Conditions',
    rating: 4.9,
    reviews: 182,
    location: 'CyberHealth Dermatology Clinic • Online',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    experience: '12 years exp',
    slots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: 'doc-2',
    name: 'Dr. Evelyn Carter, PhD',
    specialty: 'Atypical Nevi & Oncology Triage',
    rating: 5.0,
    reviews: 243,
    location: 'Metropolitan Skin Cancer Center • Online',
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?w=150&auto=format&fit=crop&q=80',
    experience: '16 years exp',
    slots: ['11:00 AM', '01:30 PM', '03:00 PM']
  },
  {
    id: 'doc-3',
    name: 'Dr. Aris Vance, MD',
    specialty: 'Eczema & Atopic Skin Barriers',
    rating: 4.8,
    reviews: 156,
    location: 'Flexural Dermatitis Center • Online',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    experience: '9 years exp',
    slots: ['08:30 AM', '10:00 AM', '01:00 PM', '03:30 PM', '05:00 PM']
  }
];

export default function Doctors() {
  const { addNotification } = useApp();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-05-21');
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [bookedState, setBookedState] = useState(false);

  const specialties = ['All', 'Acne', 'Oncology', 'Eczema'];

  const filteredDoctors = DOCTORS.filter((doc) => {
    if (activeSpecialty === 'All') return true;
    if (activeSpecialty === 'Acne') return doc.specialty.toLowerCase().includes('acne');
    if (activeSpecialty === 'Oncology') return doc.specialty.toLowerCase().includes('oncology') || doc.specialty.toLowerCase().includes('nevi');
    if (activeSpecialty === 'Eczema') return doc.specialty.toLowerCase().includes('eczema') || doc.specialty.toLowerCase().includes('barrier');
    return true;
  });

  const handleBookAppointment = () => {
    if (!selectedSlot) return;
    setBookedState(true);
    
    // Add success notification
    addNotification(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedSlot}. Video link sent.`);
    
    setTimeout(() => {
      setSelectedDoctor(null);
      setSelectedSlot('');
      setBookedState(false);
    }, 2000);
  };

  return (
    <div className="flex-grow p-6 lg:p-8 space-y-8 bg-slate-50/30 dark:bg-slate-900/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-primary" /> Specialist Consultation
          </h1>
          <p className="text-xs text-slate-400 mt-1">Book live clinical sessions with certified board dermatologists based on your AI diagnostic labels.</p>
        </div>
      </div>

      {/* Specialty Filter Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setActiveSpecialty(spec)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeSpecialty === spec
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            {spec === 'All' ? 'All Dermatologists' : `${spec} Triage`}
          </button>
        ))}
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div className="space-y-4">
              {/* Profile card */}
              <div className="flex gap-4">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/25 shrink-0"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    {doc.name} <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{doc.specialty}</p>
                </div>
              </div>

              <div className="flex gap-4 text-xs font-medium border-y border-slate-100 dark:border-slate-800 py-3 text-slate-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-sand fill-sand" /> {doc.rating} ({doc.reviews})</span>
                <span className="border-l border-slate-200 dark:border-slate-800 pl-4">{doc.experience}</span>
              </div>

              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 leading-normal">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0" /> {doc.location}
              </p>
            </div>

            <button
              onClick={() => setSelectedDoctor(doc)}
              className="w-full mt-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-blue-accent hover:brightness-105 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Book Consultation
            </button>
          </div>
        ))}
      </div>

      {/* Appointment Booking Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="absolute inset-0 bg-slate-950"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md glass-panel p-6 rounded-3xl shadow-2xl relative border border-slate-200/50 dark:border-white/5 z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>

              {bookedState ? (
                /* Success Screen */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Booking Confirmed!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Your appointment slot with {selectedDoctor.name} has been secured. Check your email for video credentials.
                  </p>
                </div>
              ) : (
                /* Form Screen */
                <div className="space-y-6 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Schedule Slot</span>
                    <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Appointment Setup</h3>
                    <p className="text-xs text-slate-400">Consult with {selectedDoctor.name}</p>
                  </div>

                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Consult Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs font-semibold text-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Available Time Slots */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Available Hours
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedDoctor.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={!selectedSlot}
                    onClick={handleBookAppointment}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-blue-accent hover:brightness-105 shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    Confirm Session Schedule
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
