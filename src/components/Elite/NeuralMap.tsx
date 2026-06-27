import React from 'react';
import { motion } from 'motion/react';
import { Network, Activity, Zap, Brain } from 'lucide-react';

export default function NeuralMap() {
  return (
    <div className="relative w-full h-full bg-[#0c111d] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
      {/* Background Pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-gold/5" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Neural Hub (Animated SVG) */}
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-md opacity-40">
          <motion.circle 
            cx="200" cy="200" r="100" 
            fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1" 
            animate={{ r: [100, 110, 100] }} 
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.circle 
            cx="200" cy="200" r="140" 
            fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="1"
            animate={{ r: [140, 150, 140], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          {/* Diagnostic Points */}
          {[
            { x: 100, y: 150 }, { x: 300, y: 150 },
            { x: 200, y: 80 }, { x: 200, y: 320 },
            { x: 120, y: 280 }, { x: 280, y: 280 }
          ].map((pt, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
              <circle cx={pt.x} cy={pt.y} r="4" fill={i % 2 === 0 ? "#10b981" : "#D4AF37"} />
              <line x1="200" y1="200" x2={pt.x} y2={pt.y} stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Data Overlays */}
      <div className="absolute top-10 left-10 space-y-4">
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
           <Brain className="w-4 h-4 text-emerald-400" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sincronización Neural: 98%</span>
        </div>
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
           <Activity className="w-4 h-4 text-gold" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-white">Flujo de Datos: 1.4 TB/s</span>
        </div>
      </div>

      <div className="absolute bottom-10 right-10">
         <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-2 border-dashed border-white/5 rounded-full flex items-center justify-center"
         >
            <Zap className="w-6 h-6 text-emerald-400/50" />
         </motion.div>
      </div>

      {/* Floating Insights (Elite UI) */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl max-w-[200px]"
      >
        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Oráculo ConectaX</p>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">Predicción de mejora en 72h detectada con un 92% de confianza en el clúster regional Nayarit.</p>
      </motion.div>
    </div>
  );
}
