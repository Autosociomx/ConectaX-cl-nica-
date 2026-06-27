import React from 'react';
import { motion } from 'motion/react';
import { User, Activity, Calendar, MapPin, Fingerprint } from 'lucide-react';

export default function ContextZone() {
  return (
    <div className="p-8 rounded-[3rem] bg-white/5 border border-white/5 h-full overflow-y-auto backdrop-blur-xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Contexto del Paciente</h2>
        <Fingerprint className="w-5 h-5 text-emerald-400/50" />
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <User className="w-16 h-16 text-white" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <User className="w-6 h-6 text-gold" />
             </div>
             <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Identidad Digital</p>
             <p className="text-2xl font-bold text-white tracking-tighter">Juan Pérez S.</p>
             <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5">
                   <Activity className="w-3 h-3 text-emerald-400" />
                   <span className="text-[10px] font-bold text-slate-400">45 Años</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <MapPin className="w-3 h-3 text-blue-400" />
                   <span className="text-[10px] font-bold text-slate-400">Tepic, Nay.</span>
                </div>
             </div>
          </div>
        </div>

        {/* Risk Level */}
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="p-8 bg-red-500/10 rounded-[2.5rem] border border-red-500/20 text-center"
        >
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] mb-2">Manchester Triage</p>
          <h3 className="text-4xl font-black text-red-500 tracking-tighter mx-auto flex items-center justify-center gap-3">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
             CRÍTICO
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4">Atención: Inmediata</p>
        </motion.div>

        {/* Timeline Summary */}
        <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
             <Calendar className="w-4 h-4" /> Timeline 100 Días
          </h3>
          <div className="space-y-6">
             {[
               { time: '10:42', event: 'Ingreso al Nodo Tepic Centro', status: 'done' },
               { time: '10:45', event: 'Sincronización CIE-11', status: 'done' },
               { time: '11:13', event: 'Análisis Neural Finalizado', status: 'active' },
             ].map((log, i) => (
               <div key={i} className="flex gap-4">
                  <span className="text-[10px] font-mono font-bold text-slate-600">{log.time}</span>
                  <div className="flex flex-col gap-1">
                     <p className={`text-[11px] font-bold ${log.status === 'active' ? 'text-gold' : 'text-slate-400'}`}>{log.event}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
