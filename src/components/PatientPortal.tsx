import React from 'react';
import { Download, FileText, Lock, MessageCircle, Clock, ShieldCheck, User, ChevronRight, Bell, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function PatientPortal() {
  const studies = [
    { name: 'Evaluación Psicométrica Inicial', date: '15 Mar 2026', size: '1.2 MB', type: 'PDF', status: 'Listo' },
    { name: 'Plan de Tratamiento Personalizado', date: '18 Mar 2026', size: '0.8 MB', type: 'PDF', status: 'Listo' },
    { name: 'Resultados Triage IA', date: '20 Mar 2026', size: '0.5 MB', type: 'PDF', status: 'Listo' },
  ];

  const contactDoctor = () => {
    const message = "Hola Dr., tengo una duda post-consulta sobre mi tratamiento en ConectaX Médico.";
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="portal" className="py-32 px-6 bg-soft-bg/30 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-teal/5 text-deep-teal text-[10px] font-bold uppercase tracking-widest mb-4">
              <Lock className="w-3 h-3" />
              Acceso Seguro de Paciente
            </div>
            <h2 className="text-5xl font-bold text-dark-navy tracking-tight">Portal del Paciente</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-dark-navy">Usuario Demo</p>
              <p className="text-xs text-slate-500">ID: CX-2026-8842</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-sage">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 bg-deep-teal text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 shadow-inner border border-white/10">
                <ShieldCheck className="w-8 h-8 text-mint" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bóveda de Salud</h3>
              <p className="text-mint/70 text-sm leading-relaxed mb-8">
                Sus datos están protegidos bajo estándares internacionales de seguridad médica y encriptación de extremo a extremo.
              </p>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-mint/80">Conexión Segura Activa</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 bg-white border-slate-100 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-dark-navy">Soporte Directo</h3>
              </div>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                ¿Tiene dudas sobre su tratamiento? Nuestro equipo de especialistas está disponible para asistirle de forma inmediata.
              </p>
              <button 
                onClick={contactDoctor}
                className="w-full btn-primary py-4 flex items-center justify-center gap-3 shadow-lg shadow-deep-teal/20"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar Especialista
              </button>
              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>&lt; 15 min</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <span>24/7 Activo</span>
              </div>
            </motion.div>

            {/* Referrals Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 bg-white border-slate-100 shadow-xl"
            >
              <h3 className="text-xl font-bold text-dark-navy mb-6 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold" /> Mis Pases Activos
              </h3>
              <div className="space-y-4">
                {[
                  { specialist: 'Dra. Elena Vargas', specialty: 'Psicología Clínica', issued: '10 Abr 2026', expires: '10 May 2026' },
                  { specialist: 'Dr. Carlos Ruiz', specialty: 'Neurociencia Aplicada', issued: '05 Abr 2026', expires: '05 May 2026' },
                ].map((ref, i) => (
                  <div key={i} className="p-4 rounded-xl bg-soft-bg border border-slate-100">
                    <p className="font-bold text-deep-teal text-sm">{ref.specialist}</p>
                    <p className="text-xs text-slate-500">{ref.specialty}</p>
                    <div className="mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Expira: {ref.expires}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content - Files */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 md:p-14 bg-white shadow-2xl border-slate-100 rounded-[2.5rem]"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-dark-navy mb-1">Mis Estudios y Resultados</h3>
                  <p className="text-sm text-slate-400">Documentación validada por el equipo médico</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-soft-bg border border-slate-100">
                  <Bell className="w-4 h-4 text-sage" />
                  <span className="text-xs font-bold text-dark-navy">3 Archivos</span>
                </div>
              </div>

              <div className="space-y-4">
                {studies.map((study, i) => (
                  <motion.div 
                    key={study.name}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 8, backgroundColor: 'rgba(225, 245, 254, 0.3)' }}
                    className="flex items-center justify-between p-6 rounded-[1.5rem] border border-slate-50 hover:border-sage/20 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-soft-bg flex items-center justify-center text-deep-teal group-hover:bg-sage group-hover:text-white transition-all shadow-sm">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-bold text-dark-navy group-hover:text-deep-teal transition-colors">{study.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{study.date}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{study.size}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-600 text-[8px] font-bold uppercase">{study.status}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-12 h-12 rounded-2xl bg-soft-bg text-deep-teal hover:bg-sage hover:text-white transition-all flex items-center justify-center shadow-sm">
                      <Download className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-14 p-8 bg-soft-bg/50 rounded-[2rem] border border-dashed border-slate-200 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-sage/20" />
                <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
                  Los resultados de laboratorio externos se sincronizarán automáticamente una vez validados por el especialista. Recibirá una notificación vía WhatsApp.
                </p>
                <button className="mt-6 text-xs font-bold text-sage uppercase tracking-widest flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                  Ver historial completo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
