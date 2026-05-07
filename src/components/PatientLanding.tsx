import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  MapPin, 
  Star, 
  Heart, 
  Brain, 
  Plus, 
  Sparkles,
  Video
} from 'lucide-react';
import { Doctor } from '../services/doctorService';
import ConectaXMatch from './ConectaXMatch';
import TelemedicineRoom from './Telemedicine/TelemedicineRoom';

interface PatientLandingProps {
  selectedDoctor: Doctor;
  showDirectory: boolean;
  setShowDirectory: (show: boolean) => void;
  setSelectedDoctor: (doc: Doctor) => void;
  setIsChatOpen: (open: boolean) => void;
  getIcon: (iconName: string) => React.ReactNode;
}

export default function PatientLanding({
  selectedDoctor,
  showDirectory,
  setShowDirectory,
  setSelectedDoctor,
  setIsChatOpen,
  getIcon
}: PatientLandingProps) {
  const [isTelemedicineOpen, setIsTelemedicineOpen] = React.useState(false);

  return (
    <AnimatePresence mode="wait">
      {isTelemedicineOpen && (
        <TelemedicineRoom key="telemedicine" doctor={selectedDoctor} onClose={() => setIsTelemedicineOpen(false)} />
      )}
      {showDirectory ? (
        <motion.div
          key="directory"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="pt-32 pb-12 px-6 text-center">
            <h1 className="text-5xl font-bold text-dark-navy mb-4 font-sans tracking-tight">Directorio de Especialistas</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Encuentra al profesional adecuado para tu salud entre nuestra red de expertos certificados.</p>
          </div>
          <React.Suspense fallback={<div className="p-24 text-center">Cargando directorio...</div>}>
            <ConectaXMatch onSelectDoctor={(doc) => { setSelectedDoctor(doc); setShowDirectory(false); }} />
          </React.Suspense>
        </motion.div>
      ) : (
        <motion.div
          key={selectedDoctor.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Hero / Profile Section */}
          <section id="perfil" className="relative pt-32 pb-24 px-6 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-mint/50 -skew-x-12 transform translate-x-1/4 -z-10" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 text-center lg:text-left">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-xl border border-border-light text-deep-teal text-xs font-bold mb-8 uppercase tracking-widest"
                  >
                    <ShieldCheck className="w-4 h-4" /> Especialista Elite: {selectedDoctor.especialidad}
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl mb-8 leading-[0.9] font-bold text-dark-navy tracking-tighter"
                  >
                    {selectedDoctor.nombre.split(' ')[0]} <span className="text-deep-teal">{selectedDoctor.nombre.split(' ').slice(1).join(' ')}</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-text-main mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
                  >
                    {selectedDoctor.bio}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                  >
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className="btn-primary text-lg px-10 py-5 group relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.5)] transition-all" 
                    >
                      <Activity className="w-6 h-6" /> 
                      <span>Iniciar Enlace 1 a 1</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>

                    <button 
                      onClick={() => setIsTelemedicineOpen(true)}
                      className="bg-dark-navy text-white text-lg px-10 py-5 group relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.5)] border border-white/10 rounded-2xl transition-all" 
                    >
                      <Video className="w-6 h-6 text-gold" /> 
                      <span>Telemedicina de Élite</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </motion.div>

                  <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                    <div className="flex flex-col items-center lg:items-start text-dark-navy">
                      <span className="text-2xl font-bold">{selectedDoctor.experiencia}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Versión</span>
                    </div>
                    <div className="flex flex-col items-center lg:items-start text-dark-navy">
                      <span className="text-2xl font-bold">{selectedDoctor.casosResueltos?.toLocaleString() || selectedDoctor.pacientes}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Casos Resueltos</span>
                    </div>
                    <div className="flex flex-col items-center lg:items-start text-dark-navy">
                      <span className="text-2xl font-bold">{selectedDoctor.nivelEvolucion || 'Activo'}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Nivel</span>
                    </div>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex-1 relative perspective-1000"
                >
                  {/* Celestial Halo Effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="w-[180%] h-[180%] rounded-full border-2 border-dark-navy/5 border-dashed opacity-40"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute w-[150%] h-[150%] rounded-full border-2 border-deep-teal/5 border-dotted opacity-30"
                    />
                  </div>

                  {/* Animated Glowing Backdrop */}
                  <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[3rem] blur-3xl -z-10"
                    style={{ backgroundColor: selectedDoctor.visualIdentity?.primaryColor || '#10b981' }}
                  />

                  <motion.div 
                    animate={{ y: [0, -15, 0], rotateX: [0, 2, 0], rotateY: [0, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative overflow-hidden rounded-[3rem] border border-white/20 shadow-2xl"
                    style={{ transformStyle: 'preserve-3d', boxShadow: `0 -20px 60px -20px ${selectedDoctor.visualIdentity?.primaryColor || '#10b981'}80` }}
                  >
                    <motion.div
                      animate={{ top: ['-20%', '120%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/40 to-transparent z-20 pointer-events-none"
                      style={{ borderBottom: `2px solid ${selectedDoctor.visualIdentity?.accentColor || '#10b981'}` }}
                    />
                    
                    <img 
                      src={selectedDoctor.auraImage || selectedDoctor.imagen} 
                      alt={selectedDoctor.nombre} 
                      className="w-full h-[650px] object-cover relative z-0"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-transparent to-transparent z-10" />
                    
                    <div className="absolute bottom-10 left-10 right-10 z-20">
                      <p className="text-[10px] font-bold text-gold uppercase tracking-[0.5em] mb-2">Orquestador Maestro</p>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedDoctor.nombre}</h2>
                      <div className="w-20 h-1 bg-gold rounded-full" />
                    </div>
                  </motion.div>

                  <div className="absolute -bottom-6 -left-6 glass-card p-6 shadow-xl max-w-[260px] z-40 bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nodo de Red</p>
                        <p className="font-bold text-deep-teal text-sm">{selectedDoctor.ubicacion}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="servicios" className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-bold text-dark-navy mb-8 tracking-tight">Tu Salud, Nuestra Prioridad Absoluta</h2>
                <p className="text-slate-500 max-w-3xl mx-auto text-xl leading-relaxed font-light">
                  Sabemos que estás pasando por un momento difícil. En ConectaX Elite, combinamos la empatía humana con la precisión de la inteligencia artificial de nivel Harvard para brindarte respuestas claras y protocolos seguros.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {selectedDoctor.servicios.map((s, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -12 }}
                    className="glass-card p-12 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all border-slate-100 group bg-white rounded-[3rem]"
                  >
                    <div className="w-20 h-20 rounded-[2rem] bg-mint text-deep-teal flex items-center justify-center mb-10 group-hover:bg-deep-teal group-hover:text-white transition-all shadow-inner">
                      {getIcon(s.icon)}
                    </div>
                    <h3 className="text-3xl font-bold text-dark-navy mb-6 tracking-tight">{s.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-lg font-light">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonios" className="py-32 px-6 bg-soft-bg/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl font-bold text-dark-navy mb-8 tracking-tight">Excelencia Reconocida</h2>
                <div className="flex justify-center gap-1.5 text-gold mb-8">
                  {[...Array(5)].map((_, i) => <Star key={`header-star-${i}`} className="w-6 h-6 fill-current" />)}
                </div>
                <p className="text-slate-500 text-xl font-light">La confianza de miles de pacientes respalda nuestra red de élite.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {selectedDoctor.testimonios.map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-12 bg-white rounded-[3rem] shadow-xl border-slate-50"
                  >
                    <div className="flex gap-1.5 text-gold mb-8">
                      {[...Array(t.rating)].map((_, starIndex) => <Star key={`star-${i}-${starIndex}`} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-dark-navy text-xl italic mb-10 leading-relaxed font-light">"{t.text}"</p>
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-deep-teal/10 flex items-center justify-center text-deep-teal font-bold text-xl">
                        {t.name[0]}
                      </div>
                      <span className="font-bold text-dark-navy text-xl tracking-tight">{t.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
