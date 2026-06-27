import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Stethoscope, Pill, Sun, ChevronRight, User, Activity, MapPin, Search } from 'lucide-react';
import TepictuHome from './TepictuHome';
import TepictuTriage from './TepictuTriage';
import TepictuMedications from './TepictuMedications';
import TepictuCheckIn from './TepictuCheckIn';

export type TepictuView = 'home' | 'triage' | 'medications' | 'checkin';

export default function TepictuLayout() {
  const [currentView, setCurrentView] = useState<TepictuView>('home');
  const [userName, setUserName] = useState('Juan Pérez');
  const [medications, setMedications] = useState([
    { id: 1, name: 'Paracetamol', dose: '500mg', time: '08:00', takenToday: true },
    { id: 2, name: 'Ibuprofeno', dose: '400mg', time: '20:00', takenToday: false },
  ]);
  const [checkIns, setCheckIns] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* Premium Header - Tepic Digital Branding */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-2xl sticky top-0 z-[60] py-6 px-8 rounded-b-[2rem]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">TepictuSalud</h1>
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mt-1">Tu salud siempre acompañada • Nayarit 2027</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
             <User className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <TepictuHome 
              key="home"
              userName={userName} 
              setUserName={setUserName}
              medCount={medications.length}
              checkInCount={checkIns.length}
              setCurrentView={setCurrentView}
            />
          )}
          {currentView === 'triage' && (
            <TepictuTriage key="triage" onBack={() => setCurrentView('home')} />
          )}
          {currentView === 'medications' && (
            <TepictuMedications 
              key="meds"
              medications={medications}
              setMedications={setMedications}
            />
          )}
          {currentView === 'checkin' && (
            <TepictuCheckIn 
              key="checkin"
              checkIns={checkIns}
              setCheckIns={setCheckIns}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Futuristic Bottom Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 rounded-[2.5rem] p-3 z-50">
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Inicio', color: 'emerald' },
            { id: 'triage', icon: <Stethoscope className="w-6 h-6" />, label: 'Triaje', color: 'red' },
            { id: 'medications', icon: <Pill className="w-6 h-6" />, label: 'Medicinas', color: 'blue' },
            { id: 'checkin', icon: <Sun className="w-6 h-6" />, label: 'Check-in', color: 'amber' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as TepictuView)}
              className={`flex flex-col items-center justify-center py-4 rounded-3xl transition-all relative ${
                currentView === item.id 
                  ? `text-white` 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {currentView === item.id && (
                <motion.div 
                  layoutId="active-nav-bg"
                  className={`absolute inset-0 rounded-3xl z-0 ${
                    item.id === 'home' ? 'bg-emerald-500' :
                    item.id === 'triage' ? 'bg-red-500' :
                    item.id === 'medications' ? 'bg-blue-500' : 'bg-amber-500'
                  } shadow-lg`}
                />
              )}
              <div className="relative z-10 mb-1">{item.icon}</div>
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
