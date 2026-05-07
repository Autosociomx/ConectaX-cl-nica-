import React, { useState, useEffect } from 'react';
import { generateClinicalSummary } from '../services/geminiService';
import CheckoutModal from './CheckoutModal';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { 
  Stethoscope, 
  ChevronRight, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Heart,
  Baby,
  Activity,
  Plus,
  Send,
  Sparkles,
  Shield,
  Zap,
  ShieldCheck,
  Apple
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


import { DOCTORS, Doctor } from '../services/doctorService';

export default function TriageForm({ doctor = DOCTORS[0] }: { doctor?: Doctor }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    symptom: '',
    duration: '',
    severity: 'mild',
    history: ''
  });
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [triageId, setTriageId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // We no longer use signInAnonymously as it may be restricted
      // If the user is not signed in, the form will still work but won't save to Firestore
    });
    return () => unsubscribe();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Baby': return <Baby className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Apple': return <Apple className="w-5 h-5" />;
      default: return <Plus className="w-5 h-5" />;
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'El nombre es requerido.';
    }
    if (!formData.email.trim()) {
      return 'El correo electrónico es requerido.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'El formato del correo electrónico no es válido.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);
    setLoading(true);
    try {
      let currentUser = auth.currentUser;
      
      if (!currentUser) {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          currentUser = result.user;
        } catch (authError) {
          console.error("Error signing in:", authError);
          // Continue without saving to Firestore if they cancel sign-in
        }
      }

      const result = await generateClinicalSummary(formData);
      setSummary(result || null);
      setStep(3);

      if (currentUser) {
        const docRef = await addDoc(collection(db, 'triages'), {
          patientName: formData.name,
          patientEmail: formData.email,
          symptom: formData.symptom,
          duration: formData.duration || '',
          severity: formData.severity,
          aiSummary: result || '',
          doctorId: doctor.id,
          status: 'pending',
          createdAt: serverTimestamp(),
          uid: currentUser.uid
        });
        setTriageId(docRef.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSymptom = (label: string) => {
    setFormData({ ...formData, symptom: label });
    setStep(2);
  };

  return (
    <section id="triage" className="py-24 px-6 bg-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-surface text-accent text-[10px] font-sans font-bold uppercase tracking-widest mb-6"
          >
            <Stethoscope className="w-3.5 h-3.5" /> Asistente de Triaje Inteligente
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6 tracking-wide">¿Cómo te sientes hoy?</h2>
          
          <div className="flex justify-center items-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-none font-sans font-bold text-sm transition-all ${
                  step >= s ? 'bg-accent text-bg' : 'bg-surface text-text-secondary'
                }`}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-accent' : 'bg-border'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {doctor.symptomOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleQuickSymptom(opt.label)}
                      className="flex items-center justify-between p-8 bg-surface border border-border hover:border-accent transition-all group text-left relative overflow-hidden"
                    >
                      <div className="flex items-center gap-5 relative z-10">
                        <div className="w-14 h-14 rounded-none bg-bg text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all">
                          {getIcon(opt.icon)}
                        </div>
                        <span className="font-sans font-bold text-text-primary text-lg">{opt.label}</span>
                      </div>
                      <ChevronRight className="w-6 h-6 text-text-secondary group-hover:text-accent transition-all relative z-10" />
                    </button>
                  ))}
                </div>
                
                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-sans font-bold text-text-secondary tracking-[0.3em]">
                    <span className="bg-surface px-6">O describe detalladamente</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <textarea 
                    placeholder="Describe tus síntomas..."
                    className="w-full p-6 bg-surface border border-border text-text-primary focus:ring-1 focus:ring-accent outline-none transition-all text-lg rounded-none"
                    value={formData.symptom}
                    onChange={(e) => setFormData({...formData, symptom: e.target.value})}
                  />
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!formData.symptom}
                    className="w-full btn-primary py-5 text-lg rounded-none"
                  >
                    Validar mis síntomas <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  {validationError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {validationError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-sans font-bold text-text-secondary uppercase tracking-widest ml-1">Nombre Completo</label>
                      <input 
                        required 
                        type="text" 
                        className={`w-full p-5 bg-surface border ${validationError && !formData.name.trim() ? 'border-red-300' : 'border-border'} text-text-primary rounded-none`} 
                        placeholder="Juan Pérez" 
                        value={formData.name} 
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          if (validationError) setValidationError(null);
                        }} 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-sans font-bold text-text-secondary uppercase tracking-widest ml-1">Correo Electrónico</label>
                      <input 
                        required 
                        type="email" 
                        className={`w-full p-5 bg-surface border ${validationError && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? 'border-red-300' : 'border-border'} text-text-primary rounded-none`} 
                        placeholder="juan@ejemplo.com" 
                        value={formData.email} 
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if (validationError) setValidationError(null);
                        }} 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-sans font-bold text-text-secondary uppercase tracking-widest ml-1">¿Desde cuándo?</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Hace 2 días..."
                      className="w-full p-5 bg-surface border border-border text-text-primary rounded-none"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-sans font-bold text-text-secondary uppercase tracking-widest ml-1 block">Intensidad</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['mild', 'moderate', 'severe'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({...formData, severity: level})}
                          className={`p-5 rounded-none border font-sans font-bold text-sm transition-all ${
                            formData.severity === level 
                              ? 'bg-accent text-bg border-accent' 
                              : 'bg-surface text-text-secondary border-border hover:border-accent'
                          }`}
                        >
                          {level === 'mild' ? 'Leve' : level === 'moderate' ? 'Moderado' : 'Severo'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 p-5 rounded-none font-sans font-bold text-text-secondary hover:bg-surface transition-all border border-border"
                    >
                      Atrás
                    </button>
                    <button 
                      type="submit"
                      disabled={loading || !formData.name.trim() || !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                      className="flex-[2] btn-primary py-5 rounded-none text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Analizando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-5 h-5" />
                          <span>Analizar con IA</span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && summary && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                <div className="p-10 bg-surface border border-accent/20 relative">
                  <div className="flex items-center gap-4 mb-8 text-accent relative z-10">
                    <div className="w-14 h-14 rounded-none bg-bg flex items-center justify-center border border-accent">
                      <CheckCircle2 className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-text-primary">Evaluación Completada</h3>
                      <p className="text-xs font-sans font-bold text-accent uppercase tracking-widest">Validado por Google AI Studio</p>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none relative z-10">
                    <div className="p-8 bg-bg rounded-none border border-border text-text-secondary leading-relaxed whitespace-pre-wrap text-lg italic">
                      {summary}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="flex-1 btn-primary py-5 rounded-none text-lg"
                  >
                    Asegurar mi lugar
                  </button>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setSummary(null);
                      setFormData({ name: '', email: '', symptom: '', duration: '', severity: 'mild', history: '' });
                    }}
                    className="flex-1 p-5 rounded-none font-sans font-bold text-text-secondary hover:bg-surface transition-all border border-border"
                  >
                    Nueva evaluación
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        doctor={doctor} 
        triageId={triageId}
      />
    </section>
  );
}
