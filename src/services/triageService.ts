export interface TriagePatient {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'waiting' | 'in-progress' | 'completed';
}

export const triagePatients: TriagePatient[] = [
  { id: 'p1', name: 'Paciente A', severity: 'high', timestamp: new Date().toISOString(), status: 'waiting' },
  { id: 'p2', name: 'Paciente B', severity: 'low', timestamp: new Date().toISOString(), status: 'waiting' },
];
