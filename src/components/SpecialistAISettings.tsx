import React, { useState } from 'react';
import { Doctor } from '../services/doctorService';
import { Sparkles, Brain, MessageSquare, Zap } from 'lucide-react';

interface SpecialistAISettingsProps {
  doctor: Doctor;
  onUpdate: (updatedDoctor: Doctor) => void;
}

export default function SpecialistAISettings({ doctor, onUpdate }: SpecialistAISettingsProps) {
  const [aiConfig, setAiConfig] = useState(doctor.aiConfig);

  const handleUpdate = () => {
    onUpdate({ ...doctor, aiConfig });
  };

  return (
    <div className="p-10 glass-card bg-white rounded-[2.5rem] shadow-xl border-slate-100">
      <h2 className="text-3xl font-bold text-dark-navy mb-8 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-accent-coral" />
        Configuración de IA
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estilo PNL</label>
            <select 
              value={aiConfig.pnlStyle}
              onChange={(e) => setAiConfig({ ...aiConfig, pnlStyle: e.target.value as any })}
              className="w-full p-4 rounded-xl border border-slate-200 bg-soft-bg font-bold text-deep-teal"
            >
              <option value="Empático">Empático</option>
              <option value="Directo">Directo</option>
              <option value="Analítico">Analítico</option>
              <option value="Cálido">Cálido</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tono de Voz</label>
            <textarea 
              value={aiConfig.tonoVoz}
              onChange={(e) => setAiConfig({ ...aiConfig, tonoVoz: e.target.value })}
              className="w-full p-4 rounded-xl border border-slate-200 bg-soft-bg font-bold text-deep-teal h-32"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Palabras Clave de Experiencia (separadas por coma)</label>
            <input 
              type="text"
              value={aiConfig.expertiseKeywords.join(', ')}
              onChange={(e) => setAiConfig({ ...aiConfig, expertiseKeywords: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full p-4 rounded-xl border border-slate-200 bg-soft-bg font-bold text-deep-teal"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Protocolos Específicos (separados por coma)</label>
            <input 
              type="text"
              value={aiConfig.protocolosEspecificos.join(', ')}
              onChange={(e) => setAiConfig({ ...aiConfig, protocolosEspecificos: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full p-4 rounded-xl border border-slate-200 bg-soft-bg font-bold text-deep-teal"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button 
          onClick={handleUpdate}
          className="btn-primary px-8 py-4 rounded-xl shadow-lg shadow-deep-teal/20"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
