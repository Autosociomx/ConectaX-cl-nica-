import React, { useState, useEffect } from 'react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy, getDocs } from 'firebase/firestore';
import { Globe, Lock, LogIn, ShieldCheck, Zap } from 'lucide-react';
import { CIE11_CORE } from '../utils/medicalCoding';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  User, 
  Plus, 
  History, 
  ChevronRight, 
  Save, 
  ClipboardList, 
  Activity,
  Search,
  ArrowLeft
} from 'lucide-react';
import { Doctor } from '../services/doctorService';

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId?: string;
  doctorId: string;
  report: string;
  progress: string;
  diagnosis: string;
  treatment: string;
  cie11Code?: string;
  rigorStandards?: string[];
  createdAt: any;
}

interface Patient {
  id: string;
  patientName: string;
  patientEmail: string;
  uid: string;
}

export default function ElectronicMedicalRecord({ doctor }: { doctor: Doctor }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    report: '',
    progress: '',
    diagnosis: '',
    treatment: '',
    cie11Code: ''
  });
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    // Fetch unique patients from triages assigned to this doctor
    const q = query(collection(db, 'triages'), where('doctorId', '==', doctor.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const patientMap = new Map<string, Patient>();
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (!patientMap.has(data.uid)) {
          patientMap.set(data.uid, {
            id: doc.id,
            patientName: data.patientName,
            patientEmail: data.patientEmail,
            uid: data.uid
          });
        }
      });
      setPatients(Array.from(patientMap.values()));
      setPermissionError(false);
    }, (error) => {
      if (error.code === 'permission-denied') {
        setPermissionError(true);
      } else {
        handleFirestoreError(error, OperationType.LIST, 'triages');
      }
    });

    return () => unsubscribe();
  }, [doctor.id]);

  useEffect(() => {
    if (selectedPatient) {
      const q = query(
        collection(db, 'medical_records'), 
        where('patientId', '==', selectedPatient.uid),
        where('doctorId', '==', doctor.id),
        orderBy('createdAt', 'desc')
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const recordList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MedicalRecord[];
        setRecords(recordList);
        setPermissionError(false);
      }, (error) => {
        if (error.code === 'permission-denied') {
          setPermissionError(true);
        } else {
          handleFirestoreError(error, OperationType.LIST, 'medical_records');
        }
      });

      return () => unsubscribe();
    }
  }, [selectedPatient, doctor.id]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'medical_records'), {
        patientName: selectedPatient.patientName,
        patientId: selectedPatient.uid,
        doctorId: doctor.id,
        report: formData.report,
        progress: formData.progress,
        diagnosis: formData.diagnosis,
        treatment: formData.treatment,
        cie11Code: formData.cie11Code,
        rigorStandards: ['JCI Patient Safety Goals', 'ICD-11 Sincro'],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      setFormData({ report: '', progress: '', diagnosis: '', treatment: '', cie11Code: '' });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving medical record:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.patientEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (permissionError) {
    return (
      <div className="p-20 text-center glass-card bg-white rounded-[2.5rem] border-dashed border-2 border-slate-100 m-8">
        <Lock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h4 className="text-2xl font-bold text-dark-navy mb-2">Acceso Restringido</h4>
        <p className="text-slate-500 mb-8">No tienes permisos para gestionar expedientes clínicos. Por favor, inicia sesión como especialista autorizado.</p>
        <button onClick={handleLogin} className="btn-accent px-10 py-4 flex items-center gap-2 mx-auto">
          <LogIn className="w-5 h-5" /> Iniciar Sesión como Especialista
        </button>
      </div>
    );
  }

  if (selectedPatient) {
    return (
      <div className="p-8 space-y-8">
        <button 
          onClick={() => setSelectedPatient(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-deep-teal transition-colors font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a la lista de pacientes
        </button>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-deep-teal/10 text-deep-teal flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-dark-navy">{selectedPatient.patientName}</h3>
              <p className="text-slate-400 font-medium">{selectedPatient.patientEmail}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn-primary px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-deep-teal/20"
          >
            {showForm ? <ClipboardList className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Ver Historial' : 'Nueva Entrada'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-10 bg-white shadow-2xl border-slate-100 rounded-[2.5rem]"
            >
              <form onSubmit={handleSaveRecord} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Reporte Clínico</label>
                    <textarea 
                      required
                      className="input-field min-h-[120px] p-5 rounded-2xl" 
                      placeholder="Detalles de la consulta de hoy..."
                      value={formData.report}
                      onChange={(e) => setFormData({...formData, report: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Progreso del Paciente</label>
                    <textarea 
                      className="input-field min-h-[120px] p-5 rounded-2xl" 
                      placeholder="Evolución observada..."
                      value={formData.progress}
                      onChange={(e) => setFormData({...formData, progress: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Diagnóstico Principal</label>
                    <input 
                      className="input-field p-5 rounded-2xl" 
                      placeholder="Diagnóstico clínico..."
                      value={formData.diagnosis}
                      onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Carga CIE-11 (Código)</label>
                    <div className="relative">
                      <select 
                        className="input-field p-5 rounded-2xl w-full appearance-none"
                        value={formData.cie11Code}
                        onChange={(e) => setFormData({...formData, cie11Code: e.target.value})}
                      >
                        <option value="">Seleccionar Entidad...</option>
                        {Object.values(CIE11_CORE).map(entity => (
                          <option key={entity.code} value={entity.code}>
                            {entity.code} - {entity.name}
                          </option>
                        ))}
                      </select>
                      <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tratamiento</label>
                    <input 
                      className="input-field p-5 rounded-2xl" 
                      placeholder="Plan de tratamiento..."
                      value={formData.treatment}
                      onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <p className="text-[10px] font-bold text-sage uppercase tracking-widest flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Contribuyendo al Dataset Global de Inteligencia Clínica
                  </p>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary px-10 py-4 rounded-2xl text-lg flex items-center gap-3 shadow-xl shadow-deep-teal/20"
                  >
                    {loading ? 'Guardando...' : <><Save className="w-5 h-5" /> Guardar en Expediente</>}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-bold text-dark-navy flex items-center gap-3 mb-6">
                <History className="w-6 h-6 text-sage" /> Historial de Consultas
              </h4>
              
              {records.length === 0 ? (
                <div className="p-20 text-center glass-card bg-white rounded-[2.5rem] border-dashed border-2 border-slate-100">
                  <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">No hay registros previos para este paciente.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {records.map((record) => (
                    <div key={record.id} className="glass-card p-8 bg-white shadow-xl border-slate-50 hover:shadow-2xl transition-all rounded-3xl">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center">
                            <Activity className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-dark-navy">Consulta Médica</p>
                            <p className="text-xs text-slate-400 font-medium">
                              {record.createdAt?.toDate().toLocaleDateString('es-MX', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reporte y Diagnóstico</p>
                          <p className="text-slate-700 font-medium mb-4">{record.report}</p>
                          {record.diagnosis && (
                            <div className="p-4 bg-soft-bg rounded-xl border border-slate-100">
                              <p className="text-xs font-bold text-dark-navy mb-1">Diagnóstico:</p>
                              <p className="text-sm text-slate-600">{record.diagnosis}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Progreso y Tratamiento</p>
                          <p className="text-slate-700 font-medium mb-4">{record.progress || 'Sin notas de progreso.'}</p>
                          {record.treatment && (
                            <div className="p-4 bg-deep-teal/5 rounded-xl border border-deep-teal/10">
                              <p className="text-xs font-bold text-deep-teal mb-1">Tratamiento:</p>
                              <p className="text-sm text-slate-600">{record.treatment}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold text-dark-navy mb-2">Expediente Clínico Electrónico</h3>
          <p className="text-slate-500 font-medium">Gestiona el historial médico y progreso de tus pacientes.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar paciente por nombre o email..."
            className="input-field pl-12 py-4 rounded-2xl w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <motion.button
            key={patient.uid}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedPatient(patient)}
            className="glass-card p-8 bg-white shadow-xl border-slate-50 text-left group hover:border-deep-teal transition-all rounded-[2rem]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-soft-bg text-slate-400 flex items-center justify-center group-hover:bg-deep-teal group-hover:text-white transition-all">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-dark-navy text-lg group-hover:text-deep-teal transition-colors">{patient.patientName}</h4>
                <p className="text-xs text-slate-400 font-medium">{patient.patientEmail}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ver Expediente</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-deep-teal transform group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="p-20 text-center glass-card bg-white rounded-[2.5rem] border-dashed border-2 border-slate-100">
          <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No se encontraron pacientes que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}
