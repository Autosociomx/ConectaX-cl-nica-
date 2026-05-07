import React from 'react';
import { motion } from 'motion/react';
import { Doctor } from '../services/doctorService';
import { 
  Star, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Video, 
  Zap, 
  Shield, 
  Activity,
  Sparkles,
  Info
} from 'lucide-react';

interface SpecialistCardProps {
  doctor: Doctor;
  onClick?: () => void;
}

export const SpecialistCard: React.FC<SpecialistCardProps> = ({ doctor, onClick }) => {
  const visual = doctor.visualIdentity || {
    primaryColor: '#1e293b',
    accentColor: '#10b981',
    gradient: 'from-slate-500/20 to-slate-800/20',
    auraDescription: 'Especialista certificado ConectaX.'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Background Aura / Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
      
      <div className="relative overflow-hidden rounded-[2rem] bg-white border border-border-light shadow-2xl transition-all duration-500 group-hover:shadow-deep-teal/20 group-hover:border-deep-teal/30">
        
        {/* Top Header Section */}
        <div className="relative h-64 overflow-hidden">
          {/* Celestial Halo Effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-[140%] h-[140%] rounded-full border border-white/10 border-dashed opacity-40"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[110%] h-[110%] rounded-full border border-deep-teal/10 border-dotted opacity-30"
            />
            <div className="absolute w-full h-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_80%)]" />
          </div>

          <img 
            src={doctor.auraImage || doctor.imagen} 
            alt={doctor.nombre}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-dark-navy/20 to-transparent z-10" />
          
          {/* Celestial Labels from Image */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between z-20">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                {doctor.visualIdentity?.celestialLabels?.slice(0, 2).map(label => (
                  <span key={label} className="text-[7px] font-bold text-white/40 uppercase tracking-[0.2em] border-l border-white/20 pl-2">
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex flex-col items-end gap-1">
                {doctor.visualIdentity?.celestialLabels?.slice(2, 4).map(label => (
                  <span key={label} className="text-[7px] font-bold text-white/40 uppercase tracking-[0.2em] border-r border-white/20 pr-2">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                {doctor.telemedicina && (
                  <div className="px-2.5 py-1 rounded-full bg-accent-coral/80 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-xl">
                    <Video className="w-3 h-3" /> Telemedicina
                  </div>
                )}
              </div>
              <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[8px] font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-gold text-gold" />
                5.0 Elite
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-dark-navy group-hover:text-deep-teal transition-colors mb-1.5">{doctor.nombre}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-deep-teal uppercase tracking-widest">{doctor.especialidad}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-border-light" />
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{doctor.categoria}</span>
            </div>
          </div>

          {/* Aura Description (Nano Banana Style) */}
          <div className="mb-8 p-4 rounded-2xl bg-mint border border-deep-teal/10 relative group/aura">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-deep-teal mt-0.5 shrink-0" />
              <p className="text-xs text-text-main leading-relaxed font-medium">
                {doctor.visualIdentity?.auraDescription}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-soft-bg border border-border-light text-center">
              <p className="text-sm font-bold text-dark-navy">{doctor.experiencia}</p>
              <p className="text-[8px] uppercase tracking-widest text-text-muted font-bold">Versión</p>
            </div>
            <div className="p-3 rounded-2xl bg-soft-bg border border-border-light text-center">
              <p className="text-sm font-bold text-dark-navy">{doctor.casosResueltos?.toLocaleString()}</p>
              <p className="text-[8px] uppercase tracking-widest text-text-muted font-bold">Casos</p>
            </div>
            <div className="p-3 rounded-2xl bg-soft-bg border border-border-light text-center">
              <div className="flex justify-center mb-0.5">
                <Activity className="w-4 h-4 text-sage" />
              </div>
              <p className="text-[8px] uppercase tracking-widest text-text-muted font-bold">{doctor.nivelEvolucion?.split(' ')[0]}</p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-6 border-t border-border-light">
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{doctor.ubicacion.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1 text-deep-teal font-bold text-sm group-hover:translate-x-2 transition-transform">
              Consultar <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Interactive Overlay for "Hardware" feel */}
        <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-sage/10 rounded-[2rem] transition-colors" />
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
           <Zap className="w-4 h-4 text-sage animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialistCard;
