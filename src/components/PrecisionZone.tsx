import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, ShieldAlert, Cpu } from 'lucide-react';
import PatientAnalyticsOracle from './Elite/PatientAnalyticsOracle';

export default function PrecisionZone() {
  return (
    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 h-full overflow-y-auto backdrop-blur-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Oráculo de Precisión</h2>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
           <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Live Insight</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {[
          { 
            title: 'Sugerencia de Protocolo', 
            msg: 'Ajustar dosis de antibiótico: +15% según biometría hemática reciente.', 
            confidence: '98%',
            color: 'emerald',
            icon: <Zap className="w-4 h-4 text-emerald-400" />
          },
          { 
            title: 'Detección de Riesgo', 
            msg: 'Posible interacción con historial alérgico detectada en clúster global.', 
            confidence: '94%',
            color: 'gold',
            icon: <ShieldAlert className="w-4 h-4 text-gold" />
          },
          { 
            title: 'Predicción de Egreso', 
            msg: 'Estabilidad hemodinámica proyectada en 18.4 horas.', 
            confidence: '82%',
            color: 'blue',
            icon: <Target className="w-4 h-4 text-blue-400" />
          }
        ].map((insight, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                    {insight.icon}
                  </div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors`}>{insight.title}</p>
               </div>
               <span className={`text-[10px] font-mono font-bold text-${insight.color}-400`}>{insight.confidence} Confianza</span>
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">{insight.msg}</p>
          </motion.div>
        ))}

        <div className="py-6">
           <PatientAnalyticsOracle />
        </div>

        <div className="mt-10 p-8 rounded-[2.5rem] bg-gradient-to-br from-gold/10 to-transparent border border-gold/20">
           <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-gold" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Cómputo Neural</p>
           </div>
           <p className="text-xs text-white font-bold leading-relaxed mb-4">Integrando Dataset Nayarit Inteligente 2027-2033.</p>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: [-200, 400] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="h-full w-24 bg-gold"
              />
           </div>
        </div>
      </div>
    </div>
  );
}
