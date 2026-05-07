import React from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Download, 
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { Doctor } from '../services/doctorService';

interface SpecialistBillingProps {
  doctor: Doctor;
}

export default function SpecialistBilling({ doctor }: SpecialistBillingProps) {
  // Simulated data
  const currentMonthEarnings = 4250.00;
  const nextPayout = 1850.00;
  const nextPayoutDate = '15 Nov 2023';

  const transactions = [
    { id: 'TX-1092', patient: 'Ana Martínez', date: '12 Nov 2023', amount: 85.00, status: 'completed' },
    { id: 'TX-1091', patient: 'Carlos Ruiz', date: '11 Nov 2023', amount: 85.00, status: 'completed' },
    { id: 'TX-1090', patient: 'María Gómez', date: '10 Nov 2023', amount: 85.00, status: 'completed' },
    { id: 'TX-1089', patient: 'Luis Fernando', date: '09 Nov 2023', amount: 85.00, status: 'completed' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-dark-navy mb-2">Facturación y Pagos</h2>
          <p className="text-slate-500">Gestiona tus ingresos y suscripción a ConectaX.</p>
        </div>
        <button className="btn-primary py-2.5 px-6 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-deep-teal/20">
          <Download className="w-4 h-4" /> Descargar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl bg-white border border-slate-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-deep-teal/5 rounded-full" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-deep-teal/10 flex items-center justify-center text-deep-teal">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-500">Ingresos del Mes</h3>
          </div>
          <div className="relative z-10">
            <span className="text-4xl font-bold text-dark-navy">${currentMonthEarnings.toFixed(2)}</span>
            <span className="text-sm font-bold text-slate-400 ml-2">USD</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sage text-sm font-bold">
            <TrendingUp className="w-4 h-4" /> +12% vs mes anterior
          </div>
        </motion.div>

        {/* Next Payout Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-3xl bg-white border border-slate-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-sage/5 rounded-full" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center text-sage">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-500">Próximo Depósito</h3>
          </div>
          <div className="relative z-10">
            <span className="text-4xl font-bold text-dark-navy">${nextPayout.toFixed(2)}</span>
            <span className="text-sm font-bold text-slate-400 ml-2">USD</span>
          </div>
          <div className="mt-4 text-slate-500 text-sm font-medium">
            Programado para el <strong className="text-dark-navy">{nextPayoutDate}</strong>
          </div>
        </motion.div>

        {/* Subscription Plan Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-3xl bg-gradient-to-br from-deep-teal to-dark-navy text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white/80">Plan Actual</h3>
            </div>
            <span className="px-3 py-1 bg-sage text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Activo
            </span>
          </div>
          <div className="relative z-10 mb-4">
            <span className="text-3xl font-bold">Plan Pro</span>
            <span className="text-sm font-medium text-white/60 ml-2">$149/mes</span>
          </div>
          <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-bold backdrop-blur-sm relative z-10">
            Gestionar Suscripción
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-dark-navy mb-6">Transacciones Recientes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="pb-4 font-medium">ID Transacción</th>
                    <th className="pb-4 font-medium">Paciente</th>
                    <th className="pb-4 font-medium">Fecha</th>
                    <th className="pb-4 font-medium text-right">Monto (Neto)</th>
                    <th className="pb-4 font-medium text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {transactions.map((tx, idx) => (
                    <tr key={idx} className="border-b border-slate-50 last:border-0">
                      <td className="py-4 font-mono text-slate-500">{tx.id}</td>
                      <td className="py-4 font-bold text-dark-navy">{tx.patient}</td>
                      <td className="py-4 text-slate-500">{tx.date}</td>
                      <td className="py-4 font-bold text-deep-teal text-right">${tx.amount.toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage/10 text-sage text-xs font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Pagado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full mt-6 py-3 text-sm font-bold text-deep-teal hover:bg-soft-bg rounded-xl transition-colors">
              Ver Todas las Transacciones
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-dark-navy mb-6">Método de Pago</h3>
            <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl mb-4">
              <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="font-bold text-dark-navy text-sm">•••• •••• •••• 4242</p>
                <p className="text-xs text-slate-500">Expira 12/25</p>
              </div>
            </div>
            <button className="w-full py-3 text-sm font-bold text-slate-500 border border-slate-200 hover:border-deep-teal hover:text-deep-teal rounded-xl transition-colors">
              Actualizar Tarjeta
            </button>
          </div>

          <div className="glass-card p-6 rounded-3xl bg-amber-50 border border-amber-100/50">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-800 text-sm mb-1">Modelo de Comisiones</h4>
                <p className="text-xs text-amber-700/80 leading-relaxed">
                  ConectaX retiene una comisión del 15% por cada cita nueva generada a través del asistente de IA. Los pagos se depositan automáticamente cada 15 días.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
