import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Map, 
  Wallet, 
  CheckCircle2, 
  HardHat, 
  FileCheck,
  TrendingUp,
  Search
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';

const workProgressData = [
  { name: 'Hospital Tepic', progreso: 85, presupuesto: 75, status: 'A tiempo' },
  { name: 'Carretera Puga', progreso: 45, presupuesto: 50, status: 'En curso' },
  { name: 'Parque Lineal', progreso: 95, presupuesto: 90, status: 'Finalizando' },
  { name: 'Mercado Nayar', progreso: 30, presupuesto: 35, status: 'En curso' },
  { name: 'Centro Bienestar', progreso: 60, presupuesto: 55, status: 'A tiempo' },
];

export default function PublicWorksMonitor() {
  return (
    <div className="space-y-10 text-white">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-500/20">
            <Building2 className="w-3 h-3" /> Eje Gobierno: Transparencia Radical
          </div>
          <h2 className="text-4xl font-bold tracking-tighter">Monitor de Obra Pública Cloud</h2>
          <p className="text-slate-400 mt-2">Transparencia radical en tiempo real sobre el avance y presupuesto de cada carretera y hospital.</p>
        </div>
        <div className="relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
           <input 
            type="text" 
            placeholder="Buscar obra o municipio..." 
            className="w-80 bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
           />
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Obras en Curso', value: '42', icon: <HardHat />, color: 'text-gold' },
           { label: 'Inversión Total', value: '$1.4B', icon: <Wallet />, color: 'text-emerald-400' },
           { label: 'Digitización Trámites', value: '100%', icon: <FileCheck />, color: 'text-blue-400' },
           { label: 'Transparencia Auditada', value: 'Lv 1', icon: <CheckCircle2 />, color: 'text-gold' }
         ].map((stat, i) => (
           <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${stat.color}`}>
                 {stat.icon}
              </div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Chart Progress */}
         <div className="lg:col-span-2 glass-card bg-white/5 border-white/10 p-10 rounded-[3rem]">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
               <TrendingUp className="w-5 h-5 text-blue-400" /> Avance Físico vs Financiero (%)
            </h3>
            <div className="h-[400px]">
               <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={workProgressData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight={700} />
                     <YAxis stroke="#475569" fontSize={10} fontWeight={700} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }}
                        itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}
                     />
                     <Legend />
                     <Bar dataKey="presupuesto" name="Presupuesto Ejercido" fill="#3b82f6" fillOpacity={0.3} radius={[10, 10, 0, 0]} />
                     <Line dataKey="progreso" name="Avance de Obra" stroke="#D4AF37" strokeWidth={4} dot={{ r: 6, fill: '#D4AF37' }} />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Zero-Paper Progress */}
         <div className="glass-card bg-white/5 border-white/10 p-10 rounded-[3rem]">
            <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
               <FileCheck className="w-5 h-5 text-emerald-400" /> Dependencias Zero-Paper
            </h3>
            <div className="space-y-8">
               {[
                 { dep: 'Secretaría de Salud', progress: 100 },
                 { dep: 'Obras Públicas', progress: 92 },
                 { dep: 'Recaudación', progress: 100 },
                 { dep: 'Desarrollo Social', progress: 85 },
               ].map((item, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                       <span className="text-slate-400">{item.dep}</span>
                       <span className="text-emerald-400">{item.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        className="h-full bg-emerald-500/50"
                       />
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-12 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
               <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Impacto Ambiental</p>
               <p className="text-sm text-slate-300">Ahorro de 14.2 Ton de papel este trimestre.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
