import React from 'react';

export default function PrecisionZone() {
  return (
    <div className="p-6 border-l border-slate-200 bg-white h-full overflow-y-auto">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Precisión (Insights)</h2>
      <div className="space-y-6">
        <div className="p-4 border-l-4 border-sage bg-sage/5 rounded-r-xl">
          <p className="text-xs font-bold text-sage mb-1">Sugerencia (Alta Confianza)</p>
          <p className="text-sm font-bold text-deep-teal">Ajustar dosis de antibiótico según peso.</p>
        </div>
        <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-xl">
          <p className="text-xs font-bold text-yellow-600 mb-1">Alerta (Revisión)</p>
          <p className="text-sm font-bold text-deep-teal">Interacción moderada con Fármaco X.</p>
        </div>
      </div>
    </div>
  );
}
