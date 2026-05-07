import React, { useEffect, useState } from 'react';

interface Patient {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: string;
}

export const TriageDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetch('/api/clinical/triage', {
      headers: {
        'Authorization': 'Bearer mock-token',
        'x-consent-granted': 'true'
      }
    })
      .then(res => res.json())
      .then(data => setPatients(data.patients));
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard de Triage (Nodo Piloto)</h2>
      <div className="grid grid-cols-1 gap-4">
        {patients.map(p => (
          <div key={p.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <span>{p.name}</span>
            <span className={`px-2 py-1 rounded ${p.severity === 'high' ? 'bg-red-200' : 'bg-green-200'}`}>
              {p.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
