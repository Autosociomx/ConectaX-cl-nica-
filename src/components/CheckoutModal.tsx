import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { Doctor } from '../services/doctorService';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  triageId?: string | null;
}

export default function CheckoutModal({ isOpen, onClose, doctor, triageId }: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update triage status in Firestore
      if (triageId) {
        await updateDoc(doc(db, 'triages', triageId), {
          status: 'scheduled'
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error processing payment or updating triage:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-navy/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-soft-bg text-slate-400 hover:text-dark-navy rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {success ? (
            <div className="p-12 text-center flex flex-col items-center justify-center h-[500px]">
              <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-sage" />
              </div>
              <h2 className="text-3xl font-bold text-dark-navy mb-4">¡Pago Exitoso!</h2>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                Tu cita con {doctor.nombre} ha sido confirmada. Hemos enviado los detalles a tu correo y WhatsApp.
              </p>
              <div className="text-xs font-bold text-sage uppercase tracking-widest bg-sage/10 px-4 py-2 rounded-full">
                Transacción Segura
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-deep-teal/5 text-deep-teal text-[10px] font-bold uppercase tracking-widest mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" /> Pago Seguro Stripe
                </div>
                <h2 className="text-3xl font-bold text-dark-navy mb-2">Asegura tu lugar con el especialista</h2>
                <p className="text-slate-500 text-sm">Estamos listos para tu atención. Finaliza tu reserva para confirmar tu espacio.</p>
              </div>

              <div className="bg-soft-bg p-6 rounded-2xl mb-8 border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-slate-500">Consulta con {doctor.nombre}</span>
                  <span className="font-bold text-dark-navy">$100.00 USD</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-slate-500">Tarifa de plataforma (ConectaX)</span>
                  <span className="font-bold text-dark-navy">$15.00 USD</span>
                </div>
                <div className="h-px w-full bg-slate-200 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-dark-navy">Total a Pagar</span>
                  <span className="text-2xl font-bold text-deep-teal">$115.00 USD</span>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Datos de la Tarjeta</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:border-deep-teal focus:ring-1 focus:ring-deep-teal outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Vencimiento</label>
                    <input required type="text" placeholder="MM/YY" className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:border-deep-teal focus:ring-1 focus:ring-deep-teal outline-none transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">CVC</label>
                    <input required type="text" placeholder="123" className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:border-deep-teal focus:ring-1 focus:ring-deep-teal outline-none transition-all" />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-5 rounded-xl text-lg shadow-xl shadow-deep-teal/20 mt-4 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Procesando Pago...
                    </>
                  ) : (
                    <>
                      Confirmar reserva y pagar $115.00 USD
                    </>
                  )}
                </button>
              </form>
              <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-6 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Pagos procesados de forma segura
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
