import React from 'react';
import { motion } from 'motion/react';
import { Headphones, PenTool, Mic, Send, Layers, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';
import { JCI_STANDARDS } from '../../utils/medicalCoding';

export default function ExecutionZone() {
  return (
    <div className="p-8 h-full overflow-y-auto flex flex-col gap-6 bg-white/5 border border-white/5 rounded-[3rem] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Centro de Comando Clínico</h2>
        <div className="flex items-center gap-2">
           <Headphones className="w-4 h-4 text-emerald-400" />
           <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse">Escucha Ambiental Activa</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* JCI Rigor Checklist */}
        <div className="md:col-span-2 p-6 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/20 flex flex-col gap-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-400" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Protocolo de Rigor JCI / Nayarit 2027</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/80">
                 <Globe className="w-3 h-3" /> CIE-11 Sync: ACTIVA
              </div>
           </div>
           <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {JCI_STANDARDS.map((standard, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                   <div className="w-4 h-4 rounded-md border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                      <CheckCircle2 className="w-3 h-3 text-transparent group-hover:text-white" />
                   </div>
                   <span className="text-[9px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-tight">{standard}</span>
                </div>
              ))}
           </div>
        </div>

        {/* SOAP Drafts */}
        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col gap-4">
           <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-gold" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Borrador SOAP v1.4</p>
           </div>
           <div className="flex-grow text-xs text-slate-300 leading-relaxed font-medium">
              <p className="mb-2"><strong>S:</strong> Paciente refiere dolor abdominal agudo en fosa ilíaca derecha.</p>
              <p className="mb-2"><strong>O:</strong> Signo de rebote positivo. Febricula 37.8°C.</p>
              <p><strong>A:</strong> Probable apendicitis aguda (CIE-11: DB10.0).</p>
           </div>
           <button className="w-full py-3 bg-white/5 hover:bg-gold hover:text-dark-navy border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Refinar con IA</button>
        </div>

        {/* Action Shortcuts */}
        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col gap-4">
           <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Acciones Sugeridas</p>
           </div>
           <div className="space-y-2">
              {[
                'Solicitar USG Abdominal',
                'Analítica de Urgencia',
                'Interconsulta con Cirugía'
              ].map((action, i) => (
                <button key={i} className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-left text-xs font-bold text-slate-300 hover:border-emerald-400/50 hover:bg-emerald-500/5 transition-all">
                   + {action}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="mt-auto flex gap-4">
        <button className="flex-grow py-5 bg-gold text-dark-navy font-bold rounded-[2rem] text-sm uppercase tracking-widest shadow-xl shadow-gold/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
           <Send className="w-5 h-5" /> Validar y Desplegar Orden
        </button>
        <button className="w-16 h-16 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 transition-all">
           <Mic className="w-6 h-6 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
