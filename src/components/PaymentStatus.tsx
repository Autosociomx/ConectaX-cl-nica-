import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function PaymentStatus() {
  const payments = [
    { id: 1, patient: 'Ana García', amount: '$500', status: 'Pagado', date: '2026-03-22' },
    { id: 2, patient: 'Roberto Solís', amount: '$500', status: 'Pendiente', date: '2026-03-23' },
    { id: 3, patient: 'María López', amount: '$500', status: 'Rechazado', date: '2026-03-24' },
  ];

  return (
    <div className="p-10 glass-card bg-white">
      <h3 className="text-2xl font-bold text-dark-navy mb-8">Seguimiento de Pagos</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
              <th className="pb-4">Paciente</th>
              <th className="pb-4">Monto</th>
              <th className="pb-4">Estado</th>
              <th className="pb-4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-slate-50 last:border-0">
                <td className="py-4 font-bold text-dark-navy">{payment.patient}</td>
                <td className="py-4 text-slate-600">{payment.amount}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit ${
                    payment.status === 'Pagado' ? 'bg-sage/10 text-sage' :
                    payment.status === 'Pendiente' ? 'bg-accent-coral/10 text-accent-coral' : 'bg-red-100 text-red-600'
                  }`}>
                    {payment.status === 'Pagado' && <CheckCircle2 className="w-3 h-3" />}
                    {payment.status === 'Pendiente' && <Clock className="w-3 h-3" />}
                    {payment.status === 'Rechazado' && <AlertCircle className="w-3 h-3" />}
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 text-slate-400 text-sm">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
