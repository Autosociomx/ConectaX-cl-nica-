import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Activity, ShieldCheck, Zap, Loader2, ArrowRight, Dna } from 'lucide-react';
import { runClinicalOracleAnalysis, OracleAnalysisResult } from '../../services/geminiService';
import { Doctor } from '../../services/doctorService';

export default function ClinicOracle({ doctor }: { doctor: Doctor }) {
  const [patientCase, setPatientCase] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OracleAnalysisResult | null>(null);

  const handleConsultOracle = async () => {
    if (!patientCase.trim()) return;
    setLoading(true);
    const analysis = await runClinicalOracleAnalysis(patientCase, doctor.especialidad);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-[2rem] bg-dark-navy text-gold flex items-center justify-center shadow-2xl border border-gold/20">
          <Brain className="w-9 h-9" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-dark-navy tracking-tight">Oráculo Clínico</h2>
          <p className="text-slate-500 text-lg">Predicción estratégica y generación de protocolos de élite impulsada por Google Gemini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Input Section */}
        <div className="glass-card p-10 bg-white rounded-[3rem] shadow-2xl border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-32 h-32 text-gold" />
          </div>
          <h3 className="text-xl font-bold text-dark-navy mb-8 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
             </div>
             Ingreso de Contexto Clínico
          </h3>
          <textarea
            value={patientCase}
            onChange={(e) => setPatientCase(e.target.value)}
            placeholder="Introduce los síntomas, historial y contexto del paciente para la validación absoluta del Arquitecto..."
            className="w-full p-8 rounded-[2rem] bg-slate-50 border-none text-dark-navy placeholder:text-slate-300 focus:ring-2 focus:ring-gold outline-none transition-all min-h-[300px] resize-none text-lg font-medium"
          />
          <button
            onClick={handleConsultOracle}
            disabled={loading || !patientCase.trim()}
            className="w-full mt-8 btn-primary bg-dark-navy py-6 text-xl font-bold shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>Consultando el Oráculo...</span>
              </>
            ) : (
              <>
                <Zap className="w-6 h-6 text-gold group-hover:scale-125 transition-transform" />
                <span>Ejecutar Análisis Predictivo</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Prediction Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full glass-card p-10 border-dashed border-slate-200 flex flex-col items-center justify-center text-center bg-slate-50/30 rounded-[3rem]"
              >
                <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 border border-slate-100">
                   <Activity className="w-10 h-10 text-slate-300 animate-pulse" />
                </div>
                <h4 className="text-2xl font-bold text-slate-400 mb-4">Esperando Instrucciones</h4>
                <p className="text-slate-400 max-w-xs mx-auto text-lg font-light leading-relaxed">El Arquitecto requiere datos para iniciar el mapeo neuronal del caso.</p>
              </motion.div>
            ) : loading ? (
              <motion.div 
                 key="loading"
                 className="h-full flex flex-col items-center justify-center"
              >
                 <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-64 h-64 rounded-full border-4 border-gold/10 border-t-gold relative z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Dna className="w-20 h-20 text-gold animate-bounce" />
                    </div>
                 </div>
                 <p className="mt-12 text-xl font-bold text-dark-navy tracking-widest uppercase animate-pulse">Analizando Patrones Globales...</p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 bg-dark-navy text-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(15,23,42,0.5)] border border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-2">Protocolo Automático Generado</p>
                    <h3 className="text-4xl font-bold tracking-tighter">{result?.protocolo_sugerido}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold font-mono text-gold">{result?.nivel_confianza}%</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Confianza</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md">
                    <h4 className="text-[10px] font-bold text-sage uppercase tracking-widest mb-4">Diagnóstico Presuntivo IA</h4>
                    <p className="text-2xl font-medium leading-tight">{result?.diagnostico_presuntivo}</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Plan de Acción de Élite</h4>
                    <div className="space-y-4">
                      {result?.pasos_accion.map((step, i) => (
                        <div key={i} className="flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-gold text-dark-navy flex items-center justify-center font-bold text-sm">
                            {i + 1}
                          </div>
                          <p className="text-lg font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/10">
                    <h4 className="text-[10px] font-bold text-gold uppercase tracking-widest mb-4">Ley de El Arquitecto</h4>
                    <p className="text-slate-300 text-lg font-light leading-relaxed italic">
                      "{result?.razonamiento_arquitecto}"
                    </p>
                  </div>
                </div>

                <button className="w-full mt-12 py-5 bg-gold text-dark-navy font-bold rounded-2xl hover:bg-white transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-3">
                  <ShieldCheck className="w-6 h-6" />
                  <span>Validar e Implementar en Expediente</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
