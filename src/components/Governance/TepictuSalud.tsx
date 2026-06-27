import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  TrendingDown, 
  AlertTriangle,
  Zap,
  Phone,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  LineChart,
  Line
} from 'recharts';

const waitingData = [
  { name: 'Ene', tiempo: 45 },
  { name: 'Feb', tiempo: 42 },
  { name: 'Mar', tiempo: 38 },
  { name: 'Abr', tiempo: 30 },
  { name: 'May', tiempo: 22 },
  { name: 'Jun', tiempo: 18 },
];

const triageDistribution = [
  { region: 'Tepic Centro', rojo: 12, amarillo: 45, verde: 120 },
  { region: 'Xalisco', rojo: 5, amarillo: 22, verde: 80 },
  { region: 'Bahía de Bad.', rojo: 8, amarillo: 35, verde: 95 },
  { region: 'Santiago Ix.', rojo: 3, amarillo: 18, verde: 60 },
  { region: 'Ixtlán del Río', rojo: 4, amarillo: 15, verde: 55 },
];

import { TRIAGE_PROMPT_LADDER } from '../../services/triagePromptService';

export default function TepictuSalud() {
  const [selectedGroup, setSelectedGroup] = React.useState(0);

  return (
    <div className="space-y-10 text-white">
      {/* ... previous header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest mb-4 border border-gold/20">
            <Zap className="w-3 h-3" /> Eje Salud: ConectaX
          </div>
          <h2 className="text-4xl font-bold tracking-tighter">TepictuSalud Dashboard</h2>
          <p className="text-slate-400 mt-2">Monitoreo de Triaje Inteligente y Estándares CIE-11 en tiempo real para Nayarit.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Reducción Espera</p>
              <p className="text-2xl font-bold text-emerald-400">-50.2%</p>
           </div>
           <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Vidas Optimizadas</p>
              <p className="text-2xl font-bold text-gold">14,205</p>
           </div>
        </div>
      </header>

      {/* Value Ladder: 100 Prompts */}
      <div className="glass-card bg-white/5 border-white/10 p-10 rounded-[3rem]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Plus className="w-6 h-6 text-gold" /> Orquestación de Triage (Secuencia Elite)
            </h3>
            <p className="text-slate-500 text-sm mt-1">Escalera de valor: 100 prompts estructurados para la respuesta médica táctica.</p>
          </div>
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
            {TRIAGE_PROMPT_LADDER.map((group, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedGroup(idx)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedGroup === idx ? 'bg-gold text-dark-navy' : 'text-slate-400 hover:text-white'}`}
              >
                Etapa {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGroup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="col-span-full flex flex-col gap-4"
            >
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 mb-2">
                <p className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-1">{TRIAGE_PROMPT_LADDER[selectedGroup].stage}</p>
                <h4 className="text-lg font-bold text-white">{TRIAGE_PROMPT_LADDER[selectedGroup].focus}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {TRIAGE_PROMPT_LADDER[selectedGroup].prompts.map((prompt, pIdx) => (
                  <motion.div 
                    key={pIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: pIdx * 0.05 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/10 transition-all cursor-help group"
                  >
                    <span className="text-[10px] font-mono text-gold/40 group-hover:text-gold transition-colors mb-2 block">ID: {selectedGroup * 20 + pIdx + 1}</span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{prompt}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Real-time Triage Distribution */}
        <div className="lg:col-span-2 glass-card bg-white/5 border-white/10 p-10 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
             <Activity className="w-5 h-5 text-gold" /> Distribución de Triage por Región
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={triageDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="region" stroke="#475569" fontSize={10} fontWeight={700} />
                <YAxis stroke="#475569" fontSize={10} fontWeight={700} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}
                />
                <Bar dataKey="verde" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="amarillo" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="rojo" stackId="a" fill="#ef4444" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wait Time Reduction trend */}
        <div className="glass-card bg-white/5 border-white/10 p-10 rounded-[3rem]">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
             <Clock className="w-5 h-5 text-gold" /> Tiempos de Espera (Min)
          </h3>
          <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waitingData}>
                   <Line type="monotone" dataKey="tiempo" stroke="#D4AF37" strokeWidth={4} dot={{ r: 6, fill: '#D4AF37' }} />
                   <Tooltip />
                </LineChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
             <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Meta Superada</span>
             </div>
             <p className="text-sm text-slate-300">Eficiencia en centros rurales aumentada en un 34% este mes.</p>
          </div>
        </div>
      </div>

      {/* Alert Feed simulation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <AlertTriangle />, title: 'Alerta Roja: Tepic Centro', msg: 'Respuesta ante trauma en 4.2 min', color: 'text-red-400' },
          { icon: <ShieldCheck />, title: 'CIE-11 Compliance', msg: '98.5% registros estandarizados', color: 'text-emerald-400' },
          { icon: <MapPin />, title: 'Nodo Rural Activo', msg: 'La Yesca: Conectividad Satelital OK', color: 'text-blue-400' },
          { icon: <Phone />, title: '911 Integration', msg: 'Sincronización de ambulancias activa', color: 'text-gold' }
        ].map((alert, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[2rem] bg-white/5 border border-white/10"
          >
             <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${alert.color}`}>
                {alert.icon}
             </div>
             <h4 className="font-bold text-sm mb-1">{alert.title}</h4>
             <p className="text-xs text-slate-500 leading-relaxed">{alert.msg}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
