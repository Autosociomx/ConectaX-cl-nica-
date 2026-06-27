import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Pill, Sun, ChevronRight, Activity, Bell, Sparkles, Globe, Shield } from 'lucide-react';
import { TepictuView } from './TepictuLayout';
import { LATAM_RIGOR_METRICS } from '../../utils/medicalCoding';

interface HomeProps {
  userName: string;
  setUserName: (name: string) => void;
  medCount: number;
  checkInCount: number;
  setCurrentView: (view: TepictuView) => void;
}

export default function TepictuHome({ userName, setUserName, medCount, checkInCount, setCurrentView }: HomeProps) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Dynamic Greeting Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
           <Sparkles className="w-32 h-32" />
        </div>
        <div className="absolute bottom-6 right-10 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
           <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-100/60">Precisión Móvil</p>
              <p className="text-xs font-black">CIE-11 Sincronizado</p>
           </div>
           <Globe className="w-6 h-6 text-emerald-100" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-2 tracking-tighter">{greeting}{userName ? `, ${userName}` : ''}! 👋</h2>
          <p className="text-emerald-50/80 text-lg font-medium">Salud de Primer Mundo en tu mano.</p>
          
          {!userName && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-8 flex gap-3"
            >
              <input
                type="text"
                placeholder="Tu nombre"
                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
                onBlur={(e) => setUserName(e.target.value)}
              />
              <button className="px-6 py-4 bg-white text-emerald-600 rounded-2xl font-bold uppercase tracking-widest text-xs">Guardar</button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setCurrentView('medications')}
          className="bg-white rounded-[2rem] p-8 shadow-xl border-l-8 border-blue-500 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
            <Pill className="w-6 h-6" />
          </div>
          <p className="text-4xl font-black text-slate-800 tracking-tighter">{medCount}</p>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Medicamentos</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setCurrentView('checkin')}
          className="bg-white rounded-[2rem] p-8 shadow-xl border-l-8 border-amber-500 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all">
            <Sun className="w-6 h-6" />
          </div>
          <p className="text-4xl font-black text-slate-800 tracking-tighter">{checkInCount > 0 ? '✓' : '—'}</p>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Check-in Hoy</p>
        </motion.div>
      </div>

      {/* Triage Promo Card */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setCurrentView('triage')}
        className="w-full bg-red-50 hover:bg-red-100 rounded-[2.5rem] p-8 flex items-center gap-6 border-2 border-red-100 transition-all group"
      >
        <div className="w-16 h-16 rounded-3xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-200 group-hover:scale-110 transition-transform">
          <Stethoscope className="w-8 h-8" />
        </div>
        <div className="text-left flex-grow">
          <h4 className="text-xl font-bold text-red-900 tracking-tight">Evaluación de Síntomas</h4>
          <p className="text-red-700/70 text-sm font-medium">Asistente de Triaje Manchester con IA</p>
        </div>
        <ChevronRight className="w-6 h-6 text-red-300 group-hover:translate-x-2 transition-transform" />
      </motion.button>

      {/* ConectaX Advocacy: Overcoming System Gaps */}
      <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 -translate-y-20 translate-x-20 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <Shield className="w-6 h-6 text-blue-500" />
             <h4 className="text-xl font-bold text-slate-800 tracking-tight">Navegación del Sistema de Salud</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IMSS / ISSSTE Gap</p>
                <div className="bg-slate-50 p-4 rounded-2xl">
                   <p className="text-xs font-bold text-slate-600">Resolución de esperas prolongadas mediante telemedicina inmediata.</p>
                </div>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suministro 2027</p>
                <div className="bg-slate-50 p-4 rounded-2xl">
                   <p className="text-xs font-bold text-slate-600">Localización inteligente de claves faltantes en red estatal.</p>
                </div>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estándar LATAM</p>
                <div className="bg-slate-50 p-4 rounded-2xl">
                   <p className="text-xs font-bold text-slate-600">Métricas de respuesta nivel JCI en cada interacción.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
