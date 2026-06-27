import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Map, 
  TrendingUp, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';

const steps = [
  { 
    mes: 'Mes 1', 
    title: 'Lanzamiento Triage Digital', 
    desc: 'Implementación en cabeceras municipales de Tepic, Xalisco y Bahía de Banderas.',
    icon: <Zap className="w-6 h-6" />,
    status: 'completed'
  },
  { 
    mes: 'Mes 2', 
    title: 'Censo Agro-Tecnológico', 
    desc: 'Despliegue de AgroVisión 3D para censo de cultivos estratégicos con drones.',
    icon: <Map className="w-6 h-6" />,
    status: 'active'
  },
  { 
    mes: 'Mes 3', 
    title: 'Portal Obra Pública Cloud', 
    desc: 'Apertura de la plataforma de transparencia radical para toda la ciudadanía.',
    icon: <TrendingUp className="w-6 h-6" />,
    status: 'pending'
  },
  { 
    mes: 'Mes 4', 
    title: 'Expansión Municipal', 
    desc: 'Llegada del ecosistema digital a los 20 municipios del estado.',
    icon: <Calendar className="w-6 h-6" />,
    status: 'pending'
  }
];

export default function DigitalRoadmap() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white tracking-tighter mb-4">Hoja de Ruta: Nayarit Inteligente</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estrategia técnica de despliegue progresivo para los primeros 100 días de gobernanza digital.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {steps.map((step, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className={`p-10 rounded-[3rem] border relative overflow-hidden transition-all ${step.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20' : step.status === 'active' ? 'bg-gold/10 border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] scale-105' : 'bg-white/5 border-white/10'}`}
             >
                {step.status === 'completed' && (
                  <div className="absolute top-6 right-6">
                     <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                )}
                
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.3em] mb-6">{step.mes}</p>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${step.status === 'active' ? 'bg-gold text-dark-navy' : 'bg-white/10 text-white'}`}>
                   {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                
                {step.status === 'active' && (
                  <motion.div 
                    animate={{ x: [-100, 300] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-gold w-32 blur-sm"
                  />
                )}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
