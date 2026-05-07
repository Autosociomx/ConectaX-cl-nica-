import React from 'react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';
import { TrendingUp, Zap, Target, Activity } from 'lucide-react';

const data = [
  { subject: 'Biológico', A: 120, B: 110, fullMark: 150 },
  { subject: 'Cognitivo', A: 98, B: 130, fullMark: 150 },
  { subject: 'Emocional', A: 86, B: 130, fullMark: 150 },
  { subject: 'Vitalidad', A: 99, B: 100, fullMark: 150 },
  { subject: 'Soberanía', A: 85, B: 90, fullMark: 150 },
  { subject: 'Integración', A: 65, B: 85, fullMark: 150 },
];

export default function EvolutionRadar() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-dark-navy tracking-tight mb-2">Radar de Evolución</h3>
          <p className="text-slate-500 font-medium">Visualización 360° del estado biológico y cognitivo del paciente.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-blue-500/10">
              <Activity className="w-3.5 h-3.5" /> Estado Actual
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-xl text-[10px] font-bold uppercase tracking-widest border border-gold/10">
              <Target className="w-3.5 h-3.5" /> Meta IA
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card p-12 bg-white rounded-[3rem] shadow-2xl border-slate-50">
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                   name="Estado Actual"
                   dataKey="A"
                   stroke="#3b82f6"
                   fill="#3b82f6"
                   fillOpacity={0.6}
                />
                <Radar
                   name="Meta Optimizada"
                   dataKey="B"
                   stroke="#D4AF37"
                   fill="#D4AF37"
                   fillOpacity={0.4}
                />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass-card p-8 bg-dark-navy text-white rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <h4 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-4">Métrica Dominante</h4>
              <div className="flex items-end justify-between">
                 <div>
                    <p className="text-4xl font-bold tracking-tighter">Neuro-Precisión</p>
                    <p className="text-slate-400 text-sm mt-1">Incremento del 12.4% vs Mes Anterior</p>
                 </div>
                 <Zap className="w-10 h-10 text-gold" />
              </div>
           </div>

           <div className="glass-card p-10 bg-white border-slate-50 rounded-[2.5rem] shadow-lg">
              <h4 className="text-sm font-bold text-dark-navy uppercase tracking-widest mb-6">Acciones de Evolución</h4>
              <div className="space-y-4">
                 {[
                   { label: 'Optimizar Sueño Profundo', value: '82%', icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
                   { label: 'Reducir Cortisol Basal', value: '65%', icon: <Target className="w-4 h-4 text-blue-500" /> },
                   { label: 'Sincronización Cognitiva', value: '44%', icon: <Zap className="w-4 h-4 text-gold" /> }
                 ].map((item) => (
                   <div key={item.label} className="p-4 rounded-2xl bg-slate-50 flex items-center justify-between group hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            {item.icon}
                         </div>
                         <span className="text-sm font-bold text-slate-600">{item.label}</span>
                      </div>
                      <span className="text-lg font-bold text-dark-navy">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
