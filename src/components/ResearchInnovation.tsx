import React from 'react';
import { Shield, Zap, Heart, Database, Search, CheckCircle2, AlertCircle, Activity, Globe, Cpu, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResearchInnovation() {
  const weaknesses = [
    { 
      title: "Triaje Estático (Fricción)", 
      problem: "Formularios rígidos que no entienden el contexto del paciente.", 
      solution: "Triaje Conversacional con Google AI Studio que analiza lenguaje natural.",
      icon: <Search className="w-6 h-6" />
    },
    { 
      title: "El 'Efecto Agujero Negro'", 
      problem: "Falta de seguimiento y soporte inmediato post-consulta.", 
      solution: "Motor de Continuidad WhatsApp 24/7 y Alertas Proactivas.",
      icon: <AlertCircle className="w-6 h-6" />
    },
    { 
      title: "Silos de Datos", 
      problem: "Resultados perdidos en correos o papeles físicos.", 
      solution: "Bóveda Digital Unificada con descarga en un clic.",
      icon: <Database className="w-6 h-6" />
    },
    { 
      title: "Carga Administrativa", 
      problem: "El especialista pierde 30% de su tiempo en gestión manual.", 
      solution: "Dashboard de Gobernanza Médica con automatización total.",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <section id="innovacion" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-soft-bg to-transparent" />
      <div className="absolute -left-20 top-1/2 w-64 h-64 bg-sage/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-deep-teal/5 text-deep-teal text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Globe className="w-3.5 h-3.5" />
            Infraestructura Médica de Vanguardia
          </motion.div>
          <h2 className="text-5xl font-bold text-dark-navy mb-6 tracking-tight">Investigación y Perfeccionamiento</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Hemos analizado los puntos de quiebre de las plataformas de salud actuales para construir la infraestructura médica definitiva bajo tecnología de Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {weaknesses.map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 border-slate-100 hover:border-sage/30 hover:shadow-2xl transition-all group bg-soft-bg/50"
            >
              <div className="w-14 h-14 rounded-2xl bg-white text-sage flex items-center justify-center mb-8 shadow-sm group-hover:bg-sage group-hover:text-white transition-all transform group-hover:-translate-y-1">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-dark-navy mb-4">{item.title}</h3>
              <div className="space-y-5">
                <div className="relative pl-4 border-l-2 border-red-200">
                  <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest mb-1">Punto de Quiebre</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.problem}</p>
                </div>
                <div className="relative pl-4 border-l-2 border-sage">
                  <p className="text-[9px] font-bold text-sage uppercase tracking-widest mb-1">Solución ConectaX</p>
                  <p className="text-xs text-dark-navy font-semibold leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 bg-dark-navy text-white relative overflow-hidden shadow-2xl rounded-[2.5rem]"
        >
          {/* Abstract background pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100" stroke="white" fill="transparent" strokeWidth="0.1" />
              <path d="M0 80 C 30 20 60 20 100 80" stroke="white" fill="transparent" strokeWidth="0.1" />
            </svg>
          </div>
          
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-sage/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Compromiso de Calidad ConectaX</h3>
              </div>
              
              <ul className="space-y-5">
                {[
                  { text: "Validación Clínica mediante Google AI Studio", icon: <Cpu className="w-5 h-5" /> },
                  { text: "Privacidad de Datos con Encriptación Bancaria", icon: <Lock className="w-5 h-5" /> },
                  { text: "Interoperabilidad Total con Sistemas HL7/FHIR", icon: <Activity className="w-5 h-5" /> },
                  { text: "Automatización de Tareas en un 85%", icon: <Zap className="w-5 h-5" /> }
                ].map((item, i) => (
                  <motion.li 
                    key={item.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-center gap-4 text-mint/80 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-sage" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[2rem] border border-white/10 text-center lg:text-right">
              <div className="mb-8">
                <p className="text-7xl font-bold text-sage mb-2 tracking-tighter">99.4%</p>
                <p className="text-xs text-mint uppercase tracking-[0.3em] font-bold opacity-60">Precisión en Triaje IA</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4">
                <button className="bg-sage text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-dark-navy transition-all shadow-lg shadow-sage/20">
                  Documentación Técnica
                </button>
                <button className="bg-white/10 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20">
                  Auditoría de Seguridad
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
