import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, MapPin, Calendar, Clock, X, Search, HeartPulse, MessageCircle, SlidersHorizontal, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorChat from '../components/DoctorChat';

const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Anjali Desai, MD',
    specialty: 'Acne & Inflammatory Conditions',
    rating: 4.9,
    reviews: 182,
    location: 'Apollo Dermatology Clinic',
    city: 'Mumbai',
    distance: 4.2, // km
    fee: 1500, // INR
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    experience: '12 years exp',
    expYears: 12,
    slots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: 'doc-2',
    name: 'Dr. Vikram Singh, PhD',
    specialty: 'Atypical Nevi & Oncology Triage',
    rating: 5.0,
    reviews: 243,
    location: 'Max Super Speciality Hospital',
    city: 'Delhi',
    distance: 12.5,
    fee: 2500,
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?w=150&auto=format&fit=crop&q=80',
    experience: '16 years exp',
    expYears: 16,
    slots: ['11:00 AM', '01:30 PM', '03:00 PM']
  },
  {
    id: 'doc-3',
    name: 'Dr. Neha Kapoor, MD',
    specialty: 'Eczema & Atopic Skin Barriers',
    rating: 4.8,
    reviews: 156,
    location: 'Fortis Skin Care Center',
    city: 'Bangalore',
    distance: 6.8,
    fee: 1200,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    experience: '9 years exp',
    expYears: 9,
    slots: ['08:30 AM', '10:00 AM', '01:00 PM', '03:30 PM', '05:00 PM']
  },
  {
    id: 'doc-4',
    name: 'Dr. Rajesh Sharma, DO',
    specialty: 'General Dermatology & Acne',
    rating: 4.7,
    reviews: 98,
    location: 'City Skin Clinic',
    city: 'Pune',
    distance: 3.1,
    fee: 950,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    experience: '5 years exp',
    expYears: 5,
    slots: ['10:00 AM', '11:00 AM', '01:00 PM', '04:00 PM']
  },
  {
    id: 'doc-5',
    name: 'Dr. Priya Mehta, MD',
    specialty: 'Oncology & Melanoma',
    rating: 4.9,
    reviews: 312,
    location: 'Advanced Dermatology Associates',
    city: 'Mumbai',
    distance: 8.4,
    fee: 2000,
    avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=150&auto=format&fit=crop&q=80',
    experience: '20 years exp',
    expYears: 20,
    slots: ['08:00 AM', '09:30 AM', '12:00 PM']
  }
];

export default function Doctors() {
  const { addNotification } = useApp();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [bookedState, setBookedState] = useState(false);
  const [chatDoctor, setChatDoctor] = useState(null);
  
  // New States for Search & Sort
  const [locationQuery, setLocationQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading
  useMemo(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeSpecialty, locationQuery, sortBy]);

  const specialties = ['All', 'Acne', 'Oncology', 'Eczema'];

  // Filter and Sort Logic
  const filteredDoctors = useMemo(() => {
    let list = [...DOCTORS];

    // Filter by Specialty
    if (activeSpecialty !== 'All') {
      list = list.filter(doc => {
        if (activeSpecialty === 'Acne') return doc.specialty.toLowerCase().includes('acne');
        if (activeSpecialty === 'Oncology') return doc.specialty.toLowerCase().includes('oncology') || doc.specialty.toLowerCase().includes('nevi');
        if (activeSpecialty === 'Eczema') return doc.specialty.toLowerCase().includes('eczema') || doc.specialty.toLowerCase().includes('barrier');
        return true;
      });
    }

    // Filter by Location Query
    if (locationQuery.trim()) {
      const q = locationQuery.toLowerCase();
      list = list.filter(doc => 
        doc.city.toLowerCase().includes(q) || 
        doc.location.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      switch (sortBy) {
        case 'rating': // Highest Rated
          return b.rating - a.rating || b.reviews - a.reviews;
        case 'distance': // Nearest
          return a.distance - b.distance;
        case 'fee': // Lowest Fee
          return a.fee - b.fee;
        case 'experience': // Most Experienced
          return b.expYears - a.expYears;
        case 'recommended':
        default:
          return b.rating - a.rating;
      }
    });

    return list;
  }, [activeSpecialty, locationQuery, sortBy]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex-grow p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 bg-slate-50/30 dark:bg-slate-900/10 min-h-full relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-[#5AA7A7]" /> Specialist Consultation
          </h1>
          <p className="text-xs text-slate-400 mt-1">Find and compare board-certified dermatologists based on your AI diagnostic labels.</p>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm">
        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by city, zip code, or clinic name..." 
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-slate-700 dark:text-white placeholder-slate-400 w-full" 
          />
          {locationQuery && (
            <button onClick={() => setLocationQuery('')} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-3.5 h-3.5" /></button>
          )}
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700 rounded-full px-4 py-2.5 outline-none cursor-pointer w-full sm:w-40"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="distance">Nearest to Me</option>
            <option value="fee">Lowest Fee</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>
      </div>

      {/* Specialty Filter Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setActiveSpecialty(spec)}
            className={`px-5 py-2.5 rounded-full text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
              activeSpecialty === spec
                ? 'bg-[#5AA7A7] text-white shadow-md shadow-[#5AA7A7]/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            {spec === 'All' ? 'All Conditions' : `${spec} Specialists`}
          </button>
        ))}
      </div>

      {/* Doctors List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="glass-panel rounded-3xl p-5 border border-slate-200/50 shadow-md h-64 flex flex-col gap-4 shimmer-wrapper">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2"></div>
                </div>
              </div>
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full mt-4"></div>
              <div className="flex gap-2 mt-auto">
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex-1"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="font-heading font-extrabold text-slate-700 dark:text-slate-300">No doctors found in this area.</h3>
          <p className="text-xs text-slate-400 mt-1">Try expanding your search radius or modifying your filters.</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredDoctors.map((doc, idx) => (
            <motion.div
              variants={itemVariants}
              key={doc.id}
              className="glass-panel rounded-3xl p-5 border border-slate-200/50 dark:border-white/5 shadow-md flex flex-col justify-between hover:shadow-lg hover:border-[#5AA7A7]/30 transition-all group"
            >
              <div className="space-y-4">
                
                {/* Badges row */}
                <div className="flex justify-between items-start">
                  {idx === 0 && sortBy === 'recommended' && (
                     <span className="text-[9px] font-extrabold bg-[#5AA7A7]/10 text-[#5AA7A7] px-2 py-0.5 rounded-md uppercase tracking-wider">Top Match</span>
                  )}
                  {idx === 0 && sortBy === 'distance' && (
                     <span className="text-[9px] font-extrabold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-md uppercase tracking-wider">Closest Match</span>
                  )}
                  <div className="flex-1"></div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {doc.rating} ({doc.reviews})
                  </span>
                </div>

                {/* Profile card */}
                <div className="flex gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#5AA7A7]/20 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      {doc.name} <ShieldCheck className="w-4 h-4 text-[#5AA7A7] shrink-0" />
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-snug mt-0.5">{doc.specialty}</p>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50/50 dark:bg-slate-800/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Distance</p>
                      <p className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">{doc.distance} km • {doc.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <DollarSign className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Fee / Consult</p>
                      <p className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">₹{doc.fee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                      <HeartPulse className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Experience</p>
                      <p className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">{doc.experience} • Board Certified</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#5AA7A7] hover:bg-[#4d9393] shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book 
                </button>
                <button
                  onClick={() => setChatDoctor(doc)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-[#5AA7A7] bg-[#5AA7A7]/10 hover:bg-[#5AA7A7]/20 border border-[#5AA7A7]/20 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chat
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

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
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-400 cursor-pointer"
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
                <div className="space-y-6 text-left mt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#5AA7A7] uppercase tracking-widest block">Schedule Slot</span>
                    <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Consult with {selectedDoctor.name}</h3>
                    <p className="text-xs text-slate-400">Consultation Fee: <span className="font-bold text-slate-600 dark:text-slate-300">₹{selectedDoctor.fee}</span></p>
                  </div>

                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Consult Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs font-semibold text-slate-800 dark:text-white cursor-pointer"
                    />
                  </div>

                  {/* Available Time Slots */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Available Hours
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selectedDoctor.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-[#5AA7A7] text-white border-[#5AA7A7] shadow-md'
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
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#5AA7A7] hover:bg-[#4d9393] shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    Confirm & Pay ₹{selectedDoctor.fee}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Doctor Chat Modal */}
      <AnimatePresence>
        {chatDoctor && <DoctorChat doctor={chatDoctor} onClose={() => setChatDoctor(null)} />}
      </AnimatePresence>
    </div>
  );
}
