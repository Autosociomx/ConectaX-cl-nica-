import React from 'react';

export default function ExecutionZone() {
  return (
    <div className="p-8 h-full overflow-y-auto flex flex-col">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Ejecución (SOAP)</h2>
      <div className="flex-grow bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <p className="text-slate-500 italic">Escucha ambiental activa...</p>
      </div>
      <button className="mt-6 w-full btn-accent py-4 font-bold text-lg">
        Validar SOAP y Cerrar
      </button>
    </div>
  );
}
