import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Palette, Zap, Image as ImageIcon, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Doctor } from '../services/doctorService';
import { generateSpecialistVisualIdentity, VisualIdentityResult } from '../services/geminiService';
import { GoogleGenAI } from '@google/genai';

interface SpecialistVisualIdentityProps {
  doctor: Doctor;
  onUpdate: (updatedDoctor: Doctor) => void;
}

export default function SpecialistVisualIdentity({ doctor, onUpdate }: SpecialistVisualIdentityProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [result, setResult] = useState<VisualIdentityResult | null>(doctor.visualIdentity || null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const identity = await generateSpecialistVisualIdentity(
        doctor.nombre,
        doctor.especialidad,
        doctor.bio
      );
      
      if (identity) {
        setResult(identity);
        onUpdate({
          ...doctor,
          visualIdentity: {
            ...identity,
            suggestedPrompt: identity.suggestedPrompt || "",
            celestialLabels: identity.celestialLabels || []
          }
        });
      } else {
        setError("No se pudo generar la identidad visual. Intente de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión con el motor de IA.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!result?.suggestedPrompt) return;
    
    setIsGeneratingImage(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const prompt = `Retrato profesional de alto impacto, hiperrealista, iluminación cinematográfica. Un/una ${doctor.especialidad} médico. ${result.suggestedPrompt}. Estilo visual: colores ${result.primaryColor} y ${result.accentColor}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: prompt }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let base64EncodeString = "";
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          base64EncodeString = part.inlineData.data;
          break;
        }
      }

      if (base64EncodeString) {
        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
        onUpdate({
          ...doctor,
          auraImage: imageUrl
        });
      } else {
        setError("No se pudo generar la imagen del aura. Intente de nuevo.");
      }
    } catch (err) {
      setError("Error al generar la imagen con Nano Banana.");
      console.error(err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleManualUpdate = (field: keyof VisualIdentityResult, value: string) => {
    if (!result) return;
    
    const updatedResult = { ...result, [field]: value };
    setResult(updatedResult);
    
    onUpdate({
      ...doctor,
      visualIdentity: {
        ...updatedResult,
        suggestedPrompt: updatedResult.suggestedPrompt || "",
        celestialLabels: updatedResult.celestialLabels || []
      }
    });
  };

  return (
    <div className="p-10 glass-card bg-white shadow-2xl border-slate-100 rounded-[2.5rem]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h3 className="text-3xl font-serif text-dark-navy flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-coral/10 text-accent-coral flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            Identidad Visual Nano Banana
          </h3>
          <p className="text-slate-500 mt-2">Utiliza Gemini 3.1 para crear una marca personal interactiva y visualmente impactante.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`btn-accent px-8 py-4 flex items-center gap-3 shadow-xl shadow-accent-coral/20 transition-all ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          {isGenerating ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {isGenerating ? 'Sincronizando con Gemini...' : 'Generar Nueva Identidad'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-bold">{error}</span>
          </motion.div>
        )}

        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Visual Preview */}
            <div className="space-y-8">
              <div className="relative group">
                <div 
                  className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" 
                  style={{ background: `linear-gradient(to right, ${result.primaryColor}, ${result.accentColor})` }}
                />
                <div 
                  className="relative aspect-square rounded-[2.5rem] border border-white/50 shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden"
                  style={{ background: `linear-gradient(to bottom right, ${result.primaryColor}, ${result.accentColor})` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 mx-auto border border-white/30">
                      <Zap className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="text-4xl font-serif text-white mb-4 tracking-tight">{doctor.nombre}</h4>
                    <p className="text-white/80 font-bold uppercase tracking-[0.3em] text-xs">{doctor.especialidad}</p>
                  </div>
                  
                  {/* Aura Visualization */}
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                    <textarea 
                      value={result.auraDescription}
                      onChange={(e) => handleManualUpdate('auraDescription', e.target.value)}
                      className="w-full bg-transparent text-white/90 text-sm italic leading-relaxed border-b border-transparent hover:border-white/30 focus:border-white/50 outline-none resize-none transition-colors"
                      rows={3}
                      placeholder="Describe el aura aquí..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Color Primario</p>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={result.primaryColor} 
                      onChange={(e) => handleManualUpdate('primaryColor', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" 
                    />
                    <code className="text-sm font-mono font-bold text-slate-600">{result.primaryColor}</code>
                  </div>
                </div>
                <div className="flex-1 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Color Acento</p>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={result.accentColor} 
                      onChange={(e) => handleManualUpdate('accentColor', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent" 
                    />
                    <code className="text-sm font-mono font-bold text-slate-600">{result.accentColor}</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt & Details */}
            <div className="space-y-8">
              <div className="p-8 bg-deep-teal text-white rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-coral/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-accent-coral" />
                  Prompt Nano Banana 2
                </h4>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm leading-relaxed text-mint/90">
                  {result.suggestedPrompt}
                </div>
                <button 
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className={`mt-6 w-full py-4 bg-white text-deep-teal rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${isGeneratingImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-mint'}`}
                >
                  {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {isGeneratingImage ? 'Generando Aura...' : 'Ejecutar Generación de Imagen'}
                </button>
              </div>

              {doctor.auraImage && (
                <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-xl text-center">
                  <h4 className="text-xl font-bold mb-6 text-dark-navy flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5 text-sage" />
                    Aura Generada
                  </h4>
                  <img src={doctor.auraImage} alt={`Aura de ${doctor.nombre}`} className="w-full max-w-xs mx-auto rounded-2xl shadow-lg mb-4" />
                  <p className="text-sm text-slate-500">Esta imagen ahora representa tu identidad visual en el catálogo de especialistas.</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: 'Conexión Emocional', desc: 'Diseño optimizado para generar confianza inmediata.', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                  { title: 'Claridad Visual', desc: 'Jerarquía tipográfica y cromática de alto impacto.', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                  { title: 'Identidad Única', desc: 'Cada especialista tiene un aura generada por IA.', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-6 bg-white border border-slate-100 rounded-2xl">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h5 className="font-bold text-dark-navy">{item.title}</h5>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Palette className="w-10 h-10 text-slate-300" />
            </div>
            <h4 className="text-xl font-bold text-slate-400">Sin Identidad Visual Generada</h4>
            <p className="text-slate-400 mt-2 max-w-md mx-auto">Haz clic en el botón superior para que Gemini analice tu perfil y cree una marca personal única.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
