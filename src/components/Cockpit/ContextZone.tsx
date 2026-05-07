import React from 'react';

export default function ContextZone() {
  return (
    <div className="p-6 border-r border-slate-200 bg-white h-full overflow-y-auto">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Contexto</h2>
      {/* Patient Info, Triage, Timeline */}
      <div className="space-y-6">
        <div className="p-4 bg-soft-bg rounded-xl">
          <p className="text-xs font-bold text-slate-500">Paciente</p>
          <p className="text-lg font-bold text-deep-teal">Juan Pérez</p>
        </div>
        <div className="p-4 bg-accent-coral/10 rounded-xl border border-accent-coral/20">
          <p className="text-xs font-bold text-accent-coral">Nivel de Riesgo</p>
          <p className="text-xl font-bold text-accent-coral">Crítico (Rojo)</p>
        </div>
      </div>
    </div>
  );
}
