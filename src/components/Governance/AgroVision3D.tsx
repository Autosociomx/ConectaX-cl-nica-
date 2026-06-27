import React from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, 
  Droplets, 
  Target, 
  Wind, 
  Zap, 
  BarChart3, 
  ShieldAlert,
  Plane
} from 'lucide-react';
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

const cropYieldData = [
  { name: 'Caña', actual: 85, proyectado: 92 },
  { name: 'Mango', actual: 78, proyectado: 88 },
  { name: 'Aguacate', actual: 65, proyectado: 80 },
  { name: 'Tabaco', actual: 90, proyectado: 95 },
];

const COLORS = ['#D4AF37', '#10b981', '#3b82f6', '#f59e0b'];

export default function AgroVision3D() {
  return (
    <div className="space-y-10 text-white">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-500/20">
            <Target className="w-3 h-3" /> Eje Campo: AgroVisión 3D
          </div>
          <h2 className="text-4xl font-bold tracking-tighter">Monitoreo Predictivo Agrícola</h2>
          <p className="text-slate-400 mt-2">Detección temprana de plagas con drones y optimización de ciclos de cosecha en Nayarit.</p>
        </div>
        <button className="px-8 py-4 bg-emerald-500 text-dark-navy font-bold rounded-2xl flex items-center gap-3 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
           <Plane className="w-5 h-5" /> Desplegar Drones de Escaneo
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Rendimiento Agrícola', value: '+25%', icon: <BarChart3 />, color: 'text-emerald-400' },
           { label: 'Humedad Crítica', value: '12%', icon: <Droplets />, color: 'text-blue-400' },
           { label: 'Plagas Detectadas', value: '2 Focus', icon: <ShieldAlert />, color: 'text-red-400' },
           { label: 'Optimización IA', value: '94.2%', icon: <Zap />, color: 'text-gold' }
         ].map((stat, i) => (
           <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${stat.color}`}>
                 {stat.icon}
              </div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Yield Projections */}
        <div className="glass-card bg-white/5 border-white/10 p-10 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
             <Sprout className="w-5 h-5 text-emerald-400" /> Proyección de Rendimiento por Cultivo (Ton/Ha)
          </h3>
          <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cropYieldData}>
                   <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProy" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                         <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                   <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight={700} />
                   <YAxis stroke="#475569" fontSize={10} fontWeight={700} />
                   <Tooltip />
                   <Area type="monotone" dataKey="proyectado" stroke="#D4AF37" fillOpacity={1} fill="url(#colorProy)" strokeWidth={3} />
                   <Area type="monotone" dataKey="actual" stroke="#10b981" fillOpacity={1} fill="url(#colorActual)" strokeWidth={3} />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Harvest Cycle Optimization */}
        <div className="glass-card bg-white/5 border-white/10 p-10 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
             <Wind className="w-5 h-5 text-gold" /> Distribución de Salud del Suelo (Sectorizado)
          </h3>
          <div className="h-[350px] relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                      data={[
                        { name: 'Saludable', value: 70 },
                        { name: 'Necesita Riego', value: 20 },
                        { name: 'Riesgo Plaga', value: 10 }
                      ]}
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                   >
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#ef4444" />
                   </Pie>
                   <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-emerald-400">70%</span>
                <span className="text-[10px] uppercase font-bold text-slate-500">Estado Óptimo</span>
             </div>
          </div>
          <div className="mt-6 flex justify-around">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Saludable</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs text-slate-400">Riego</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs text-slate-400">Riesgo</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
