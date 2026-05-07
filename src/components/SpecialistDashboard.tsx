import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { Users, Calendar as CalendarIcon, Activity, TrendingUp, Download, FileText, Bell, Map, Clock, Zap, Sparkles, ChevronRight, Search, LayoutDashboard, User, Brain, Plus, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Doctor } from '../services/doctorService';
import { firebaseService } from '../services/firebaseService';
import SpecialistCard from './SpecialistCard';
import SpecialistAISettings from './SpecialistAISettings';
import PaymentStatus from './PaymentStatus';
import ElectronicMedicalRecord from './ElectronicMedicalRecord';
import ClinicalIntelligenceHub from './ClinicalIntelligenceHub';
import SpecialistVisualIdentity from './SpecialistVisualIdentity';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { LogIn, LogOut } from 'lucide-react';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const data = [
  { name: 'Ene', pacientes: 40 },
  { name: 'Feb', pacientes: 55 },
  { name: 'Mar', pacientes: 75 },
  { name: 'Abr', pacientes: 90 },
  { name: 'May', pacientes: 110 },
  { name: 'Jun', pacientes: 124 },
];

const triageData = [
  { name: 'Traumatología', value: 35 },
  { name: 'Pediatría', value: 25 },
  { name: 'Ginecología', value: 20 },
  { name: 'Medicina Gral.', value: 20 },
];

const COLORS = ['#171717', '#C5A059', '#262626', '#A3A3A3'];

import ClinicalCommandCenter from './Specialist/ClinicalCommandCenter';
import PatientIntelligence from './Specialist/PatientIntelligence';
import ClinicOracle from './Oracle/ClinicOracle';
import EvolutionRadar from './Specialist/EvolutionRadar';

export default function SpecialistDashboard({ 
  activeSection, 
  doctor, 
  onUpdateDoctor 
}: { 
  activeSection: 'Nodo: Centro de Comando' | 'Gobernanza de Agenda' | 'Arquitectura de IA' | 'Cluster: Inteligencia de Pacientes' | 'Expediente Clínico Electrónico' | 'Dataset: Inteligencia Global' | 'Seguimiento de Pagos' | 'Identidad Visual Nano Banana' | 'Nodo: Oráculo Clínico' | 'Nodo: Radar de Evolución',
  doctor: Doctor,
  onUpdateDoctor: (d: Doctor) => void
}) {
  const [events, setEvents] = useState([
    {
      title: 'Cita con Ana García',
      start: new Date(2026, 2, 22, 17, 0),
      end: new Date(2026, 2, 22, 18, 0),
    },
    {
      title: 'Control Roberto Solís',
      start: new Date(2026, 2, 22, 18, 30),
      end: new Date(2026, 2, 22, 19, 30),
    },
  ]);
  const [triages, setTriages] = useState<any[]>([]);
  const [user, setUser] = useState(auth.currentUser);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setPermissionError(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    return firebaseService.subscribeToTriages((triageList) => {
      setTriages(triageList);
      setPermissionError(false);
    });
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Nodo: Centro de Comando':
        return <ClinicalCommandCenter doctor={doctor} />;
      case 'Gobernanza de Agenda':
        return (
          <div className="p-10 glass-card bg-white h-[700px] rounded-[3rem] shadow-2xl border-slate-50 overflow-hidden">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={(event) => alert(event.title)}
            />
          </div>
        );
      case 'Arquitectura de IA':
        return <SpecialistAISettings doctor={doctor} onUpdate={onUpdateDoctor} />;
      case 'Cluster: Inteligencia de Pacientes':
        return <PatientIntelligence triages={triages} permissionError={permissionError} handleLogin={handleLogin} />;
      case 'Expediente Clínico Electrónico':
        return <ElectronicMedicalRecord doctor={doctor} />;
      case 'Dataset: Inteligencia Global':
        return <ClinicalIntelligenceHub />;
      case 'Nodo: Oráculo Clínico' as any:
        return <ClinicOracle doctor={doctor} />;
      case 'Nodo: Radar de Evolución' as any:
        return <EvolutionRadar />;
      case 'Seguimiento de Pagos':
        return <PaymentStatus />;
      case 'Identidad Visual Nano Banana':
        return <SpecialistVisualIdentity doctor={doctor} onUpdate={onUpdateDoctor} />;
      default:
        return <ClinicalCommandCenter doctor={doctor} />;
    }
  };

  return (
    <section id="dashboard" className="py-10 px-6 bg-bg relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent to-accent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-surface text-text-secondary text-[10px] font-bold uppercase tracking-widest mb-4">
              <LayoutDashboard className="w-3 h-3" />
              Gobernanza Médica Élite
            </div>
            <h2 className="text-5xl font-serif text-text-primary tracking-tight mb-2">{activeSection}</h2>
            <p className="text-text-secondary text-lg">Métricas de rendimiento y gestión de activos impulsada por Google AI Studio.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {user && !user.isAnonymous ? (
              <button 
                onClick={handleLogout}
                className="btn-secondary px-6 py-3 text-sm flex items-center gap-2 border-slate-200 bg-white"
              >
                <LogOut className="w-4 h-4" /> Cerrar Sesión
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="btn-accent px-6 py-3 text-sm flex items-center gap-2 shadow-lg shadow-accent-coral/20"
              >
                <LogIn className="w-4 h-4" /> Acceso Especialista
              </button>
            )}
            <button className="btn-secondary px-6 py-3 text-sm flex items-center gap-2 border-slate-200 bg-white">
              <Download className="w-4 h-4" /> Exportar Reporte
            </button>
            <button className="btn-primary px-6 py-3 text-sm flex items-center gap-2 shadow-lg shadow-deep-teal/20">
              <CalendarIcon className="w-4 h-4" /> Nueva Cita
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </section>
  );
}
