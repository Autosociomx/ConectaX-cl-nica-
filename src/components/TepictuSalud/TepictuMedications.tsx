import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, Plus, Check, Clock, Trash2, X, ChevronRight } from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  dose: string;
  time: string;
  takenToday: boolean;
}

interface MedsProps {
  medications: Medicine[];
  setMedications: (meds: Medicine[]) => void;
}

export default function TepictuMedications({ medications, setMedications }: MedsProps) {
  const [showForm, setShowForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dose: '', time: '' });

  const addMedication = () => {
    if (newMed.name && newMed.time) {
      setMedications([...medications, {
        ...newMed,
        id: Date.now(),
        takenToday: false
      }]);
      setNewMed({ name: '', dose: '', time: '' });
      setShowForm(false);
    }
  };

  const toggleTaken = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, takenToday: !med.takenToday } : med
    ));
  };

  const deleteMed = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <Pill className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tighter">Mis Medicamentos</h2>
          <p className="text-blue-100 font-medium">Controladores de Sincronización Biológica.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {medications.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-16 text-center shadow-xl border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Pill className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-slate-500 font-bold mb-8">No hay protocolos de medicación activos.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200"
            >
              Registrar Medicamento
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {medications.map(med => (
                <motion.div 
                  key={med.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`bg-white rounded-[2.5rem] p-8 shadow-xl border-l-[12px] transition-all flex items-center justify-between group ${med.takenToday ? 'border-emerald-500' : 'border-blue-500'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${med.takenToday ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
                      <Pill className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight">{med.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{med.dose}</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold">{med.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => deleteMed(med.id)}
                      className="p-4 rounded-xl text-slate-200 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => toggleTaken(med.id)}
                      className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                        med.takenToday ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-100 text-slate-400 hover:bg-blue-500 hover:text-white'
                      }`}
                    >
                      <Check className="w-7 h-7" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button 
              onClick={() => setShowForm(true)}
              className="w-full py-6 mt-4 border-2 border-dashed border-slate-300 rounded-[2rem] text-slate-400 font-bold uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-3"
            >
              <Plus className="w-5 h-5" /> Agregar Nuevo
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[100] flex items-end justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
          >
            <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-2xl relative overflow-hidden">
              <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-600">
                 <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-8">Nuevo Protocolo</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={newMed.name}
                  onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                  placeholder="Nombre de la Medicación"
                  className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none font-bold"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newMed.dose}
                    onChange={(e) => setNewMed({...newMed, dose: e.target.value})}
                    placeholder="Dosis (ej: 500mg)"
                    className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none font-bold"
                  />
                  <input
                    type="time"
                    value={newMed.time}
                    onChange={(e) => setNewMed({...newMed, time: e.target.value})}
                    className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none font-bold"
                  />
                </div>
                
                <button
                  onClick={addMedication}
                  className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] mt-6 shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Confirmar Protocolo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
