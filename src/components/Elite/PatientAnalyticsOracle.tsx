import React from 'react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Heart, Activity, Target } from 'lucide-react';

const welfareData = [
  { time: '08:00', level: 65 },
  { time: '10:00', level: 72 },
  { time: '12:00', level: 68 },
  { time: '14:00', level: 85 },
  { time: '16:00', level: 78 },
  { time: '18:00', level: 92 },
];

const adherenceData = [
  { name: 'Completado', value: 88 },
  { name: 'Pendiente', value: 12 },
];

export default function PatientAnalyticsOracle() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welfare Metrics Area Chart */}
      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-emerald-400" />
             </div>
             <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Nivel de Bienestar (Flujo)</h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">+12% vs Ayer</span>
        </div>
        
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={welfareData}>
              <defs>
                <linearGradient id="colorWelfare" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#475569', fontWeight: 700 }} 
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0c111d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}
              />
              <Area 
                type="monotone" 
                dataKey="level" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorWelfare)" 
                strokeWidth={3}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Adherence Radial Chart */}
      <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-md flex items-center gap-6">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adherenceData}
                innerRadius={35}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                <Cell fill="#D4AF37" stroke="none" />
                <Cell fill="rgba(255,255,255,0.05)" stroke="none" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-xl font-bold text-gold">88%</span>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
             <Target className="w-4 h-4 text-gold" />
             <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Adherencia</h3>
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
            El paciente ha mantenido una consistencia de élite en su tratamiento durante las últimas 72 horas.
          </p>
        </div>
      </div>
    </div>
  );
}
