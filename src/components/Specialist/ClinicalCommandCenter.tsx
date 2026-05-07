import React from 'react';
import { motion } from 'motion/react';
import { Zap, Plus, FileText, Calendar as CalendarIcon, Bell, TrendingUp, Activity, Users } from 'lucide-react';
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import SpecialistCard from '../SpecialistCard';
import { Doctor } from '../../services/doctorService';

const data = [
  { name: 'Ene', pacientes: 40 },
  { name: 'Feb', pacientes: 55 },
  { name: 'Mar', pacientes: 75 },
  { name: 'Abr', pacientes: 90 },
  { name: 'May', pacientes: 110 },
  { name: 'Jun', pacientes: 124 },
];

const triageData = [
  { name: 'Traumatología', value: 35 },
  { name: 'Pediatría', value: 25 },
  { name: 'Ginecología', value: 20 },
  { name: 'Medicina Gral.', value: 20 },
];

const COLORS = ['#0F172A', '#D4AF37', '#1E293B', '#71717A'];

export default function ClinicalCommandCenter({ doctor }: { doctor: Doctor }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Quick Actions */}
      <div>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Operaciones de Respuesta Rápida</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Añadir Paciente', icon: <Plus className="w-5 h-5" /> },
            { label: 'Reportes Análisis', icon: <FileText className="w-5 h-5" /> },
            { label: 'Agenda Elite', icon: <CalendarIcon className="w-5 h-5" /> },
            { label: 'Centro Alertas', icon: <Bell className="w-5 h-5" /> },
          ].map((action) => (
            <button key={action.label} className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-3xl hover:border-gold hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                {action.icon}
              </div>
              <span className="text-sm font-bold text-dark-navy">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="p-10 bg-dark-navy text-white rounded-[3rem] flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-deep-teal/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-3 tracking-tight">Oráculo de Demanda Clínica</h3>
          <p className="text-slate-400 text-lg font-light">Se proyecta un incremento del <span className="text-gold font-bold">18%</span> en protocolos de {doctor.especialidad} este trimestre.</p>
        </div>
        <div className="flex items-center gap-8 relative z-10 mt-8 md:mt-0">
          <div className="text-right">
            <p className="text-5xl font-bold font-mono text-gold tracking-tighter">1.8x</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Crecimiento IA</p>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-inner">
            <Zap className="w-10 h-10 text-gold" />
          </div>
        </div>
      </div>

      {/* Specialist Identity Card */}
      <div>
         <SpecialistCard doctor={doctor} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Gestión Activa', value: '124', icon: <Users className="w-6 h-6" />, color: 'bg-blue-600' },
          { label: 'Protocolos Ejecutados', value: '48', icon: <FileText className="w-6 h-6" />, color: 'bg-indigo-600' },
          { label: 'Calidad Clínica', value: '98%', icon: <Activity className="w-6 h-6" />, color: 'bg-emerald-600' },
          { label: 'Rendimiento AI Studio', value: '99.9%', icon: <Zap className="w-6 h-6" />, color: 'bg-gold' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 bg-white border-slate-50 flex flex-col gap-6"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-4xl font-bold text-dark-navy tracking-tighter">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card p-12 bg-white rounded-[3rem]">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-bold text-dark-navy tracking-tight">Soberanía de Crecimiento</h3>
            <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400">Escala Global</div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}} />
                <Line type="monotone" dataKey="pacientes" stroke="#D4AF37" strokeWidth={4} dot={{r: 6, fill: '#D4AF37', strokeWidth: 0}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 glass-card p-12 bg-white rounded-[3rem] flex flex-col items-center">
          <h3 className="text-2xl font-bold text-dark-navy tracking-tight mb-12 w-full">Distribución AI</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={triageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {triageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 m-auto w-24 h-24 flex flex-col items-center justify-center pointer-events-none">
               <p className="text-4xl font-bold text-dark-navy">100%</p>
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Validado</p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 w-full">
            {triageData.map((d, i) => (
              <div key={d.name} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase truncate">{d.name}</span>
                </div>
                <p className="text-lg font-bold text-dark-navy ml-4">{d.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
