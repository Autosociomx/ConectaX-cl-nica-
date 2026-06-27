import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, Activity, Brain, Shield, Zap, Sparkles } from 'lucide-react';
import { eliteSpecialties, SPECIALTY_AREAS, DOCTORS, Doctor } from '../../services/doctorService';

interface SpecialtyDirectoryProps {
  onSelectSpecialty: (doc: Doctor) => void;
}

export default function SpecialtyDirectory({ onSelectSpecialty }: SpecialtyDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecialties = eliteSpecialties.filter(spec => 
    spec.toLowerCase().includes(searchTerm.toLowerCase()) ||
    SPECIALTY_AREAS[spec]?.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Search and Navigation Elite */}
      <div className="relative mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-left">
          <h2 className="text-4xl font-bold text-dark-navy tracking-tighter mb-2">Arquitectura de Especialidades</h2>
          <p className="text-slate-500 font-medium tracking-tight">Explora los nodos de inteligencia médica de nivel global.</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-0 bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all rounded-full" />
          <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-xl shadow-slate-200/50">
            <Search className="w-5 h-5 text-slate-400 mr-4" />
            <input 
              type="text" 
              placeholder="Buscar especialidad o área..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none w-full text-slate-800 font-medium placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Grid of Specialties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredSpecialties.map((spec, i) => {
            const areas = SPECIALTY_AREAS[spec] || [];
            // Map specialty back to a doctor for the demo flow
            const doctor = DOCTORS.find(d => d.especialidad === spec) || DOCTORS[0]; 
            
            return (
              <motion.div
                key={spec}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (i % 9) * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onSelectSpecialty(doctor)}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-gold/5 rounded-[2.5rem] -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all flex flex-col h-full overflow-hidden relative">
                  {/* Modern Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 -translate-y-16 translate-x-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                      {i % 4 === 0 ? <Brain className="w-8 h-8" /> : 
                       i % 4 === 1 ? <Activity className="w-8 h-8" /> : 
                       i % 4 === 2 ? <Shield className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
                    </div>
                    <div className="flex items-center gap-2">
                       <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                       <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Nivel Elite</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-dark-navy mb-6 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                    {spec}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {areas.map((area, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest rounded-lg border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all">
                        {area}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Protocolos de Vanguardia</span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredSpecialties.length === 0 && (
        <div className="py-40 text-center">
           <Activity className="w-16 h-16 text-slate-200 mx-auto mb-6 animate-pulse" />
           <h3 className="text-2xl font-bold text-slate-400 tracking-tighter">Nodo de Consulta No Detectado</h3>
           <p className="text-slate-300 font-medium">Prueba con términos como "Neuro", "Genómica" o "Robótica".</p>
        </div>
      )}
    </div>
  );
}
