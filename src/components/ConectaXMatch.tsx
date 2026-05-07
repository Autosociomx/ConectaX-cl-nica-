import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { runConectaXTriage, ConectaXTriageResult } from '../services/geminiService';
import { findDoctorBySpecialty, Doctor, DOCTORS } from '../services/doctorService';
import { Search, Stethoscope, AlertTriangle, MessageCircle, Loader2, ArrowRight, UserCheck, Calendar, Plus, Activity, Star, MapPin, ChevronRight, Video, Filter, Sparkles, Info } from 'lucide-react';
import { SpecialistCard } from './SpecialistCard';

export default function ConectaXMatch({ onSelectDoctor }: { onSelectDoctor?: (doctor: Doctor) => void }) {
  const [symptom, setSymptom] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ triage: ConectaXTriageResult; doctor: Doctor } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Medicina', 'Psicología', 'Nutrición'];
  const hubs = ['Todos', 'Neuro-Cognitivo', 'Precisión Genómica', 'Medicina Regenerativa', 'Salud Mental de Élite', 'Optimización Metabólica'];
  const [selectedHub, setSelectedHub] = useState<string>('Todos');

  const filteredDoctors = useMemo(() => {
    let list = DOCTORS;
    if (selectedCategory !== 'Todas') {
      list = list.filter(doc => doc.categoria === selectedCategory);
    }
    if (selectedHub !== 'Todos') {
      list = list.filter(doc => doc.hub === selectedHub);
    }
    return list;
  }, [selectedCategory, selectedHub]);

  const handleMatch = async (e: React.FormEvent) => {
    // ... rest of handleMatch
    e.preventDefault();
    if (!symptom.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const triage = await runConectaXTriage(symptom);
      if (triage) {
        const doctor = findDoctorBySpecialty(triage.especialidad_sugerida);
        if (doctor) {
          setResult({ triage, doctor });
        } else {
          setError(`Lo sentimos, no tenemos un especialista disponible en ${triage.especialidad_sugerida} en este momento.`);
        }
      } else {
        setError("No pudimos analizar tus síntomas. Por favor, intenta ser más descriptivo.");
      }
    } catch (err) {
      setError("Ocurrió un error al conectar con el motor de ConectaX.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = (doctor: Doctor, triage: ConectaXTriageResult) => {
    const message = `Hola ${doctor.nombre}, recibí tu reporte de ConectaX (Analizado por nuestra IA de Google). Veo que tienes un caso de ${triage.especialidad_sugerida} con nivel de urgencia ${triage.urgencia_nivel}. Resumen: ${triage.resumen_para_doctor}. ¿Podemos agendar una revisión?`;
    return `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="conectax" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-mint/30 -skew-x-12 transform translate-x-1/4 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Search */}
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 bg-dark-navy text-white sticky top-24 shadow-2xl overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-deep-teal/20 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-deep-teal flex items-center justify-center shadow-xl border border-white/10">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Buscador Elite</h3>
              </div>

              <form onSubmit={handleMatch} className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">¿Qué síntomas presentas?</label>
                  <textarea
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    placeholder="Describe tus síntomas para que nuestra IA de nivel mundial te asigne al mejor especialista..."
                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-deep-teal focus:bg-white/10 outline-none transition-all min-h-[160px] resize-none text-base font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !symptom.trim()}
                  className="w-full btn-primary bg-deep-teal hover:bg-white hover:text-dark-navy py-5 text-base font-bold shadow-2xl transform active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Analizando...</span>
                    </>
                  ) : (
                    <>
                      <span>Encontrar Especialista</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-3 mb-6 text-slate-400">
                  <Filter className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Filtrar por Categoría</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-deep-teal text-white shadow-lg' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results Area */}
            <div className="lg:flex-1">
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint text-deep-teal text-[10px] font-bold uppercase tracking-widest mb-6 border border-deep-teal/10 shadow-sm">
                    <Activity className="w-3.5 h-3.5" />
                    Red ConectaX Elite
                  </div>
                  <h2 className="text-5xl font-bold text-dark-navy mb-4 tracking-tight">Nuestros Especialistas</h2>
                  <p className="text-text-muted max-w-xl text-lg leading-relaxed font-medium">
                    Contamos con una red de más de 40 profesionales de élite mundial, seleccionados por su excelencia clínica y formación académica superior.
                  </p>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-border-light shadow-xl">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-dark-navy">40</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Nodos</span>
                  </div>
                  <div className="w-px h-12 bg-border-light" />
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-gold">100%</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Elite</span>
                  </div>
                </div>
              </div>

                <div className="flex flex-col gap-8 mb-12">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Hub Médico:</span>
                    <div className="flex flex-wrap gap-2">
                      {hubs.map(hub => (
                        <button
                          key={hub}
                          onClick={() => setSelectedHub(hub)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedHub === hub ? 'bg-dark-navy text-white border-dark-navy shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:border-gold hover:text-gold'}`}
                        >
                          {hub}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Categoría:</span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-deep-teal text-white border-deep-teal shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:border-gold hover:text-gold'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!result && !loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
                      {filteredDoctors.length > 0 ? filteredDoctors.map((doc) => (
                        <SpecialistCard 
                          key={doc.id} 
                          doctor={doc} 
                          onClick={() => onSelectDoctor?.(doc)} 
                        />
                      )) : (
                        <div className="col-span-full py-32 text-center glass-card border-dashed border-slate-200">
                           <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No hay especialistas en esta combinación de filtros.</p>
                        </div>
                      )}
                    </div>
                  )}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-20 text-center bg-white border-border-light"
                >
                  <div className="relative w-24 h-24 mx-auto mb-10">
                    <div className="absolute inset-0 rounded-full border-4 border-deep-teal/10 border-t-deep-teal animate-spin" />
                    <div className="absolute inset-4 rounded-full border-4 border-gold/10 border-b-gold animate-spin-slow" />
                    <Stethoscope className="absolute inset-0 m-auto w-10 h-10 text-deep-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-navy mb-3">Consultando Red Elite</h3>
                  <p className="text-text-muted text-lg">Buscando al especialista ideal en nuestra red global de alta eficiencia...</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card p-10 bg-accent-coral/5 border-accent-coral/20 text-accent-coral flex items-center gap-8"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent-coral/10 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Atención</h4>
                    <p className="text-lg font-medium opacity-90">{error}</p>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result-view"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-10"
                >
                  {/* Doctor Card */}
                  <div className="glass-card p-12 flex flex-col md:flex-row gap-12 items-center md:items-start bg-white shadow-2xl relative overflow-hidden border-border-light">
                    <div className="absolute top-8 right-8 flex items-center gap-2.5 px-4 py-2 rounded-full bg-mint text-deep-teal text-[10px] font-bold uppercase tracking-widest border border-deep-teal/10 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                      Enlace 1 a 1 Activo
                    </div>

                    <div className="relative">
                      <img 
                        src={result.doctor.auraImage || result.doctor.imagen} 
                        alt={result.doctor.nombre}
                        className="w-48 h-48 rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-soft-bg"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-2xl bg-deep-teal text-white flex items-center justify-center shadow-2xl border-4 border-white">
                        <UserCheck className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left pt-4">
                      <h3 className="text-4xl font-bold text-dark-navy mb-3">{result.doctor.nombre}</h3>
                      <p className="text-deep-teal font-bold text-xl mb-8 flex items-center justify-center md:justify-start gap-3">
                        <Stethoscope className="w-6 h-6" />
                        {result.doctor.especialidad}
                      </p>
                      
                      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                        <button 
                          onClick={() => onSelectDoctor?.(result.doctor)}
                          className="btn-primary px-10 py-4 text-base flex items-center gap-3"
                        >
                          <UserCheck className="w-5 h-5" /> Ver Perfil Elite
                        </button>
                        <button
                          onClick={() => window.open(getWhatsAppUrl(result.doctor, result.triage), '_blank')}
                          className="btn-accent px-10 py-4 text-base flex items-center gap-3"
                        >
                          <MessageCircle className="w-5 h-5" /> WhatsApp Directo
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Triage Details */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="glass-card p-10 bg-white border-border-light"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Análisis de Triaje Elite</h4>
                        <div className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                          result.triage.urgencia_nivel >= 4 
                            ? 'bg-accent-coral text-white' 
                            : result.triage.urgencia_nivel >= 3 
                              ? 'bg-gold text-white' 
                              : 'bg-sage text-white'
                        }`}>
                          Urgencia: {result.triage.urgencia_nivel}
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        <div className="p-8 bg-soft-bg rounded-3xl text-lg text-text-main leading-relaxed italic border-l-8 border-deep-teal shadow-inner relative">
                          <span className="text-5xl text-deep-teal/10 font-serif absolute top-4 left-4">"</span>
                          <p className="relative z-10">{result.triage.resumen_para_doctor}</p>
                          <span className="text-5xl text-deep-teal/10 font-serif absolute bottom-4 right-4 rotate-180">"</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Services */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="glass-card p-10 bg-white border-border-light"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-8">Protocolos de la Red Elite</h4>
                      <div className="grid grid-cols-1 gap-5">
                        {[
                          { label: "Enlace Holográfico 1 a 1", icon: <Video className="w-5 h-5" /> },
                          { label: "Seguimiento de Alto Valor", icon: <Activity className="w-5 h-5" /> },
                          { label: "Protocolos Harvard v3.1", icon: <Plus className="w-5 h-5" /> },
                          { label: "Transformación Cognitiva", icon: <ArrowRight className="w-5 h-5" /> }
                        ].map((s) => (
                          <div key={s.label} className="flex items-center gap-5 p-5 bg-soft-bg rounded-2xl hover:bg-mint transition-all group cursor-default border border-transparent hover:border-deep-teal/10">
                            <div className="w-12 h-12 rounded-2xl bg-white text-deep-teal flex items-center justify-center shadow-md group-hover:bg-deep-teal group-hover:text-white transition-all">
                              {s.icon}
                            </div>
                            <span className="text-base font-bold text-text-main">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
