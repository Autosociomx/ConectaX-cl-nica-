import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, CheckCircle2, ChevronRight, Activity, Heart, Zap, Coffee, CloudMoon } from 'lucide-react';

interface CheckInProps {
  checkIns: any[];
  setCheckIns: (checks: any[]) => void;
}

export default function TepictuCheckIn({ checkIns, setCheckIns }: CheckInProps) {
  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const moods = [
    { emoji: '😢', label: 'Crítico', value: 1, color: 'bg-red-500', text: 'text-red-500' },
    { emoji: '😔', label: 'Bajo', value: 2, color: 'bg-orange-500', text: 'text-orange-500' },
    { emoji: '😐', label: 'Estable', value: 3, color: 'bg-yellow-500', text: 'text-yellow-600' },
    { emoji: '🙂', label: 'Bien', value: 4, color: 'bg-blue-500', text: 'text-blue-500' },
    { emoji: '😊', label: 'Óptimo', value: 5, color: 'bg-emerald-500', text: 'text-emerald-500' }
  ];

  const submitCheckIn = () => {
    if (mood !== null) {
      setCheckIns([{ mood, energy, timestamp: new Date().toISOString() }, ...checkIns]);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[3rem] p-16 text-white text-center shadow-2xl relative overflow-hidden"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle2 className="w-24 h-24 mx-auto mb-8 text-emerald-100" />
          <h2 className="text-4xl font-black mb-4 tracking-tighter">¡Check-in Sincronizado!</h2>
          <p className="text-emerald-100 text-lg font-medium max-w-xs mx-auto mb-10">Tu estado ha sido enviado a la red TepictuSalud con éxito.</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setMood(null);
              setEnergy(5);
            }}
            className="bg-white text-emerald-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl"
          >
            Nuevo Registro
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <Sun className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tighter">Check-in Diario</h2>
          <p className="text-amber-50 font-medium">Sincronización de Bienestar 24h.</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-8">¿Cómo se siente tu energía hoy?</h3>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all relative group ${
                mood === m.value ? `${m.color} text-white shadow-xl` : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">{m.emoji}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${mood === m.value ? 'text-white' : 'text-slate-400'}`}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 shadow-xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight">Nivel de Potencia Biológica</h3>
            <div className="flex items-center gap-2">
               <Zap className="w-4 h-4 text-amber-400" />
               <span className="text-2xl font-black text-amber-400 tracking-tighter">{energy}/10</span>
            </div>
          </div>
          
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-amber-500 mb-6"
          />
          
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
               <Coffee className="w-4 h-4" /> Agotamiento
            </div>
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-[10px]">
               Máximo <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={submitCheckIn}
        disabled={mood === null}
        className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.3em] shadow-2xl disabled:opacity-30 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Guardar Sincronización
      </button>

      <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 flex items-center gap-6">
         <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
            <Heart className="w-6 h-6" />
         </div>
         <p className="text-emerald-700 text-sm font-medium leading-relaxed">
           Tus datos son anonimizados y utilizados para el **Dataset Nayarit 2027**, ayudando a mejorar la salud de toda la comunidad.
         </p>
      </div>
    </motion.div>
  );
}
