import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Database, 
  Activity, 
  Globe, 
  Zap, 
  TrendingUp, 
  ShieldCheck,
  Search,
  Cpu,
  Network,
  BookOpen
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  Legend
} from 'recharts';
import { CIE11_CORE } from '../utils/medicalCoding';

const datasetStats = [
  { label: 'Casos Analizados', value: '12,450', icon: <Database className="w-5 h-5" /> },
  { label: 'Mapeos Neuronales', value: '892', icon: <Brain className="w-5 h-5" /> },
  { label: 'Precisión Diagnóstica', value: '99.8%', icon: <ShieldCheck className="w-5 h-5" /> },
  { label: 'Aporte a la OMS', value: 'Global', icon: <Globe className="w-5 h-5" /> },
];

const neuralMapData = [
  { subject: 'Sintomatología', A: 120, B: 110, fullMark: 150 },
  { subject: 'Genética', A: 98, B: 130, fullMark: 150 },
  { subject: 'Entorno', A: 86, B: 130, fullMark: 150 },
  { subject: 'Respuesta Inmune', A: 99, B: 100, fullMark: 150 },
  { subject: 'Patrones Virales', A: 85, B: 90, fullMark: 150 },
  { subject: 'Eficacia Tto.', A: 65, B: 85, fullMark: 150 },
];

const trendData = [
  { name: 'Sem 1', casos: 400, precision: 95 },
  { name: 'Sem 2', casos: 300, precision: 96 },
  { name: 'Sem 3', casos: 200, precision: 98 },
  { name: 'Sem 4', casos: 278, precision: 99 },
  { name: 'Sem 5', casos: 189, precision: 99.4 },
  { name: 'Sem 6', casos: 239, precision: 99.8 },
];

const triageDistributionData = [
  { specialty: 'Neurocirugía', count: 450, color: '#005A8C' },
  { specialty: 'Cardiología', count: 320, color: '#D4AF37' },
  { specialty: 'Oncología', count: 280, color: '#FF7A59' },
  { specialty: 'Psicología', count: 590, color: '#2DD4BF' },
  { specialty: 'Pediatría', count: 410, color: '#F472B6' },
];

const outcomeData = [
  { duration: 10, outcome: 85, patients: 120 },
  { duration: 20, outcome: 92, patients: 95 },
  { duration: 30, outcome: 78, patients: 200 },
  { duration: 40, outcome: 95, patients: 80 },
  { duration: 50, outcome: 88, patients: 150 },
  { duration: 60, outcome: 99, patients: 60 },
  { duration: 15, outcome: 70, patients: 300 },
  { duration: 25, outcome: 80, patients: 250 },
];

export default function ClinicalIntelligenceHub() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cieSearchTerm, setCieSearchTerm] = useState('');

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const filteredCie11 = Object.values(CIE11_CORE).filter(entity => 
    entity.name.toLowerCase().includes(cieSearchTerm.toLowerCase()) || 
    entity.code.toLowerCase().includes(cieSearchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-10 bg-[#0c111d] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Cpu className="w-3 h-3" /> Inteligencia Global ConectaX
          </div>
          <h3 className="text-5xl font-bold text-white tracking-tighter">Dataset: Inteligencia Global</h3>
          <p className="text-slate-400 text-lg max-w-2xl mt-4">Visualización de la arquitectura de datos para el impacto epidemiológico masivo en Nayarit y el Orbe.</p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="px-8 py-5 bg-gold text-dark-navy font-bold rounded-2xl flex items-center gap-3 shadow-2xl shadow-gold/10 relative overflow-hidden group hover:scale-[1.02] transition-all"
        >
          {isAnalyzing ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Cpu className="w-5 h-5" />
            </motion.div>
          ) : <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />}
          <span className="uppercase tracking-widest text-xs">{isAnalyzing ? 'Procesando Inteligencia...' : 'Ejecutar Sincronización Global'}</span>
        </button>
      </div>

      {/* Stats Grid - Elite Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {datasetStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] group hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 text-slate-400 group-hover:text-gold transition-all flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white tracking-tighter">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Neural Mapping Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 bg-white/5 border border-white/5 rounded-[3rem] relative overflow-hidden backdrop-blur-3xl"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Network className="w-32 h-32 text-gold" />
          </div>
          <h4 className="text-xl font-bold text-white flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            Arquitectura Neural Tepic 2027
          </h4>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={neuralMapData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                   name="Dataset Actual"
                   dataKey="A"
                   stroke="#D4AF37"
                   fill="#D4AF37"
                   fillOpacity={0.6}
                />
                <Radar
                   name="Predicción IA"
                   dataKey="B"
                   stroke="#10b981"
                   fill="#10b981"
                   fillOpacity={0.3}
                />
                <Tooltip contentStyle={{ backgroundColor: '#0c111d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-8 bg-white/5 rounded-[2rem] border border-white/5">
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "Análisis holístico: 84% de correlación regional detectada en el Nodo Nayarit."
            </p>
          </div>
        </motion.div>

        {/* Global Impact & Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 bg-white/5 border border-white/5 rounded-[3rem] backdrop-blur-3xl"
        >
          <h4 className="text-xl font-bold text-white flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            Dinámica de Inteligencia Clínica
          </h4>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorCasos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0c111d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem'}}
                />
                <Area type="monotone" dataKey="casos" stroke="#10b981" fillOpacity={1} fill="url(#colorCasos)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex items-center gap-5 p-8 bg-gold/5 rounded-[2rem] border border-gold/10">
            <Zap className="w-8 h-8 text-gold" />
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-1">Status de Exportación</p>
              <p className="text-sm text-white font-medium">Dataset listo para sincronización con Protocolos de Salud Global.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Triage Distribution Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 bg-white shadow-2xl border-slate-100 rounded-[2.5rem]"
        >
          <h4 className="text-xl font-bold text-dark-navy flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-deep-teal/10 text-deep-teal flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            Distribución de Triaje por Especialidad
          </h4>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={triageDistributionData} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis dataKey="specialty" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
                <Tooltip 
                   cursor={{ fill: '#f8fafc' }}
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={30}>
                  {triageDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Outcomes vs Duration Scatter Plot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 bg-white shadow-2xl border-slate-100 rounded-[2.5rem]"
        >
          <h4 className="text-xl font-bold text-dark-navy flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            Correlación: Resultado vs. Duración
          </h4>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="duration" name="Duración (días)" unit="d" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} label={{ value: 'Duración (Días)', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <YAxis type="number" dataKey="outcome" name="Resultado (%)" unit="%" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} label={{ value: 'Éxito (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <ZAxis type="number" dataKey="patients" range={[60, 400]} name="Pacientes" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36}/>
                <Scatter name="Clúster de Resultados" data={outcomeData} fill="#D4AF37" fillOpacity={0.6} stroke="#D4AF37" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* CIE-11 Reference Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 bg-white/5 border border-white/5 rounded-[3rem] backdrop-blur-3xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white tracking-tight">Referencia CIE-11</h4>
              <p className="text-slate-400 text-sm font-medium">Codificación Diagnóstica Estándar Global</p>
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por código (ej. 1B70) o diagnóstico..." 
              value={cieSearchTerm}
              onChange={(e) => setCieSearchTerm(e.target.value)}
              className="w-full bg-[#0c111d] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCie11.map(entity => (
            <div key={entity.code} className="bg-[#0c111d]/50 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-500/10 text-emerald-400 font-mono px-3 py-1 rounded-lg text-sm font-bold">
                  {entity.code}
                </span>
                <a href={entity.foundationId} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors" title="Ver en la OMS">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
              <h5 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{entity.name}</h5>
              <p className="text-sm text-slate-400 leading-relaxed">{entity.description}</p>
            </div>
          ))}
          {filteredCie11.length === 0 && (
            <div className="col-span-full py-10 text-center">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No se encontraron entidades CIE-11 para "{cieSearchTerm}"</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* WHO Contribution Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 bg-dark-navy rounded-[2.5rem] text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-deep-teal/20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Globe className="w-10 h-10 text-sage" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">Contribución Global a la Salud</h4>
              <p className="text-slate-300 max-w-xl">Tus interacciones clínicas están alimentando un dataset único que ayuda a mapear soluciones para enfermedades globales.</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-sage text-dark-navy font-bold rounded-2xl hover:bg-white transition-all shadow-xl shadow-sage/20">
            Ver Reporte de Impacto OMS
          </button>
        </div>
      </motion.div>
    </div>
  );
}
