import React from 'react';
import { motion } from 'motion/react';
import { Lock, LogIn, Search, Filter, ArrowRight, User, MoreVertical } from 'lucide-react';

interface PatientIntelligenceProps {
  triages: any[];
  permissionError: boolean;
  handleLogin: () => void;
}

export default function PatientIntelligence({ triages, permissionError, handleLogin }: PatientIntelligenceProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-12 bg-white rounded-[3rem] shadow-2xl border-slate-50"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h3 className="text-3xl font-bold text-dark-navy tracking-tight mb-2">Inteligencia de Pacientes</h3>
          <p className="text-slate-500 font-medium">Análisis en tiempo real de flujos de triage y severidad biológica.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
              type="text" 
              placeholder="Buscar por ID o Nombre..." 
              className="pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-gold outline-none w-full md:w-64"
             />
          </div>
          <button className="p-4 bg-slate-50 rounded-2xl text-slate-500 hover:bg-slate-100 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {permissionError ? (
        <div className="p-16 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
            <Lock className="w-10 h-10 text-gold" />
          </div>
          <h4 className="text-2xl font-bold text-dark-navy mb-4">Validación Requerida</h4>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">Se requiere una sesión autorizada de Google AI Studio para acceder a la base de datos de inteligencia clínica soberana.</p>
          <button 
            onClick={handleLogin} 
            className="btn-accent px-12 py-5 flex items-center justify-center gap-3 mx-auto shadow-2xl"
          >
            <LogIn className="w-6 h-6" />
            <span>Verificar Identidad Elite</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold">
                <th className="px-6 pb-2">Identidad del Paciente</th>
                <th className="px-6 pb-2">Análisis de Síntoma</th>
                <th className="px-6 pb-2">Nivel de Severidad</th>
                <th className="px-6 pb-2">Status Operativo</th>
                <th className="px-6 pb-2 text-right">Ejecución</th>
              </tr>
            </thead>
            <tbody>
              {triages.length > 0 ? triages.map((triage) => (
                <tr key={triage.id} className="group hover:scale-[1.01] transition-all">
                  <td className="bg-slate-50 first:rounded-l-3xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-gold transition-colors">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-dark-navy tracking-tight">{triage.patientName || 'Anonimizado'}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest letter-spacing-2">ID: {triage.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="bg-slate-50 p-6">
                    <p className="text-sm text-slate-600 font-medium truncate max-w-[200px]">{triage.symptom}</p>
                  </td>
                  <td className="bg-slate-50 p-6">
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest ${
                      triage.severity === 'severo' ? 'bg-red-500/10 text-red-500' :
                      triage.severity === 'moderado' ? 'bg-gold/10 text-gold' : 'bg-green-500/10 text-green-500'
                    }`}>
                      {triage.severity || 'Analizando...'}
                    </span>
                  </td>
                  <td className="bg-slate-50 p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                      <span className="text-xs font-bold text-slate-600 capitalize">{triage.status}</span>
                    </div>
                  </td>
                  <td className="bg-slate-50 last:rounded-r-3xl p-6 text-right">
                    <button className="p-3 bg-white rounded-xl text-slate-400 hover:text-dark-navy hover:shadow-lg transition-all">
                       <ArrowRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center bg-slate-50 rounded-[3rem]">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-300 animate-pulse shadow-sm">
                        <Search className="w-8 h-8" />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Esperando Tráfico Biológico...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
