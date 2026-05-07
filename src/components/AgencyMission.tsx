import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Brain, ShieldCheck, Plus } from 'lucide-react';

export default function AgencyMission({ setIsChatOpen }: { setIsChatOpen: (open: boolean) => void }) {
  return (
    <>
      {/* Agency Mission Section */}
      <section className="py-32 px-6 bg-dark-navy text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-deep-teal rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-accent-coral rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-gold text-xs font-bold mb-8 uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4" /> Nuestra Misión Global
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-[1.1] tracking-tighter">Democratizando la <span className="text-gold">Salud de Élite</span></h2>
              <p className="text-2xl text-slate-300 mb-12 leading-relaxed font-light">
                Creemos que el acceso a especialistas de alto rendimiento no debería ser un privilegio. A través de la telemedicina y la IA de precisión, estamos rompiendo barreras para llegar a quienes más lo necesitan.
              </p>
              
              <div className="space-y-10 mb-12">
                {[
                  { title: "Accesibilidad Total", desc: "Consultas de alto valor al alcance de todos, sin barreras geográficas o económicas.", icon: <Heart className="w-7 h-7" /> },
                  { title: "Inteligencia Empática", desc: "IA diseñada con PNL avanzado para comprender y transformar tu estado de salud.", icon: <Brain className="w-7 h-7" /> },
                  { title: "Protocolos Globales", desc: "Alineados con los estándares de las mejores facultades de medicina del mundo.", icon: <ShieldCheck className="w-7 h-7" /> }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-gold shrink-0 shadow-xl border border-white/5 backdrop-blur-md">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2 text-white tracking-tight">{item.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="btn-accent text-lg px-12 py-5 shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
                Unirme a la Agencia
              </button>
            </div>
            
            <div className="relative">
              <div className="glass-card bg-white/5 border-white/10 p-10 md:p-14 relative z-10 rounded-[3rem] backdrop-blur-2xl">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-sage/20 flex items-center justify-center text-sage border border-sage/20">
                    <Plus className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl tracking-tight">Dashboard de Agencia</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Control Total Soberano</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                      <span>Evolución Clínica</span>
                      <span>85%</span>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        className="h-full bg-sage rounded-full" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                      <span>Precisión Triage</span>
                      <span>94%</span>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '94%' }}
                        className="h-full bg-accent-coral rounded-full" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-12">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                      <p className="text-4xl font-bold text-sage mb-1">40</p>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Especialistas Elite</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                      <p className="text-4xl font-bold text-accent-coral mb-1">+1.2k</p>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Casos/Mes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent-coral/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-sage/20 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto glass-card bg-dark-navy p-14 md:p-24 text-center text-white relative overflow-hidden rounded-[4rem] shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sage/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-teal/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">Tu salud no puede esperar</h2>
            <p className="text-2xl text-mint/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Inicia un enlace 1 a 1 con nuestro especialista de IA para recibir orientación inmediata de nivel mundial.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="btn-accent text-xl px-14 py-6 shadow-2xl hover:scale-105 transition-transform"
              >
                Iniciar Enlace 1 a 1
              </button>
              <button className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-3 group">
                Ver Directorio <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
