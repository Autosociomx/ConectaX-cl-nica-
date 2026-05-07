import React, { useEffect, useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PatientLanding from './components/PatientLanding';
import AgencyMission from './components/AgencyMission';
import PatientPortal from './components/PatientPortal';
import SpecialistDashboard from './components/SpecialistDashboard';
import { TriageDashboard } from './components/TriageDashboard';
import CockpitLayout from './components/Cockpit/CockpitLayout';
import Chatbot from './components/Chatbot';
import { DOCTORS, Doctor } from './services/doctorService';
import { 
  Heart, Shield, Sparkles, Activity, Zap, Baby, ShieldCheck, Apple, Plus 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(DOCTORS[0]);
  const [showDirectory, setShowDirectory] = useState(true);
  const [userRole, setUserRole] = useState<'patient' | 'specialist'>('patient');
  const [activeSpecialistSection, setActiveSpecialistSection] = useState<'Centro de Comando Clínico' | 'Gobernanza de Agenda' | 'Arquitectura de Inteligencia Clínica' | 'Inteligencia de Pacientes' | 'Expediente Clínico Electrónico' | 'Hub de Inteligencia Clínica' | 'Cockpit de Precisión' | 'Dashboard de Triage' | 'Identidad Visual Nano Banana'>('Cockpit de Precisión');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleRole = () => {
    setUserRole(prev => prev === 'patient' ? 'specialist' : 'patient');
    setSelectedDoctor(DOCTORS[0]);
    setShowDirectory(true);
    setActiveSpecialistSection('Cockpit de Precisión');
  };

  useEffect(() => {
    if (showDirectory) {
      document.title = "Directorio de Especialistas | ConectaX Médico";
    } else {
      document.title = `${selectedDoctor.nombre} | ${selectedDoctor.especialidad} | ConectaX`;
    }
  }, [selectedDoctor, showDirectory]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Baby': return <Baby className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Apple': return <Apple className="w-6 h-6" />;
      default: return <Plus className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-bg selection:bg-deep-teal/20 selection:text-deep-teal">
      {/* Dynamic Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 contrast-150 brightness-150 mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

      {/* Premium Role Switcher */}
      <div className="fixed bottom-10 left-10 z-[100]">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRole}
          className="px-6 py-3 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${userRole === 'patient' ? 'bg-deep-teal' : 'bg-accent-coral'} animate-pulse shadow-[0_0_15px_rgba(0,0,0,0.2)]`} />
          <span className="text-dark-navy">Operación: {userRole === 'patient' ? 'Paciente' : 'Especialista'}</span>
        </motion.button>
      </div>

      <Header 
        scrolled={scrolled}
        DOCTORS={DOCTORS}
        selectedDoctor={selectedDoctor}
        showDirectory={showDirectory}
        setSelectedDoctor={setSelectedDoctor}
        setShowDirectory={setShowDirectory}
        setIsChatOpen={setIsChatOpen}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="flex-grow">
        {userRole === 'specialist' ? (
          <div className="flex min-h-screen pt-20">
            {/* Sidebar Specialist */}
            <motion.aside 
              className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100 p-8 flex flex-col gap-10 sticky top-20 h-[calc(100vh-80px)]"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Panel de Control</span>
                <h2 className="text-2xl font-bold text-dark-navy tracking-tighter">Cockpit Especialista</h2>
              </div>
              <nav className="flex flex-col gap-3">
                {[
                  'Cockpit de Precisión', 
                  'Nodo: Centro de Comando', 
                  'Nodo: Oráculo Clínico',
                  'Nodo: Radar de Evolución',
                  'Cluster: Inteligencia de Pacientes', 
                  'Expediente Clínico Electrónico', 
                  'Dataset: Inteligencia Global',
                  'Gobernanza de Agenda', 
                  'Arquitectura de IA', 
                  'Seguimiento de Pagos',
                  'Identidad Visual Nano Banana'
                ].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSpecialistSection(section as any)}
                    className={`px-5 py-4 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between group ${activeSpecialistSection === section ? 'bg-dark-navy text-white shadow-xl translate-x-2' : 'text-slate-500 hover:bg-slate-50 hover:text-dark-navy'}`}
                  >
                    <span>{section}</span>
                    {activeSpecialistSection === section && <motion.div layoutId="active-indicator" className="w-1.5 h-6 bg-gold rounded-full" />}
                  </button>
                ))}
              </nav>
              
              <div className="mt-auto p-6 rounded-[2rem] bg-gold/5 border border-gold/10 text-center">
                 <p className="text-[10px] uppercase font-bold text-gold tracking-widest mb-1">Status Sistema</p>
                 <p className="text-xs font-bold text-dark-navy">Sincronización Total</p>
              </div>
            </motion.aside>

            {/* Content Area Specialist */}
            <div className="flex-grow bg-slate-50/50 p-10">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[400px] text-xs font-bold uppercase tracking-widest text-slate-400">Arquitectando Dashboard...</div>}>
                {activeSpecialistSection === 'Cockpit de Precisión' ? (
                  <CockpitLayout />
                ) : activeSpecialistSection === 'Dashboard de Triage' ? (
                  <TriageDashboard />
                ) : (
                  <SpecialistDashboard 
                    activeSection={activeSectionAdapter(activeSpecialistSection)} 
                    doctor={selectedDoctor} 
                    onUpdateDoctor={setSelectedDoctor}
                  />
                )}
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <PatientLanding 
              selectedDoctor={selectedDoctor}
              showDirectory={showDirectory}
              setShowDirectory={setShowDirectory}
              setSelectedDoctor={setSelectedDoctor}
              setIsChatOpen={setIsChatOpen}
              getIcon={getIcon}
            />
            
            <PatientPortal />
            
            <AgencyMission setIsChatOpen={setIsChatOpen} />
          </div>
        )}
      </main>

      <Footer />

      <Chatbot 
        doctor={selectedDoctor} 
        userRole={userRole} 
        isControlled={isChatOpen} 
        controlledIsOpen={isChatOpen} 
        onControlledClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
}

// Helper to adapt section names to SpecialistDashboard component
function activeSectionAdapter(section: string): any {
  if (section === 'Identidad Visual Nano Banana') return 'Identidad Visual Nano Banana';
  if (section === 'Centro de Comando Clínico') return 'Centro de Comando Clínico';
  if (section === 'Gobernanza de Agenda') return 'Gobernanza de Agenda';
  if (section === 'Arquitectura de Inteligencia Clínica') return 'Arquitectura de Inteligencia Clínica';
  if (section === 'Inteligencia de Pacientes') return 'Inteligencia de Pacientes';
  if (section === 'Expediente Clínico Electrónico') return 'Expediente Clínico Electrónico';
  if (section === 'Hub de Inteligencia Clínica') return 'Hub de Inteligencia Clínica';
  return 'Centro de Comando Clínico';
}
