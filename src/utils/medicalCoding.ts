
export interface ICDEntity {
  code: string;
  name: string;
  description: string;
  foundationId: string;
}

export const CIE11_CORE: Record<string, ICDEntity> = {
  '1B70': {
    code: '1B70',
    name: 'Insuficiencia cardíaca',
    description: 'Falla del corazón para bombear suficiente sangre a los tejidos.',
    foundationId: 'http://id.who.int/icd/entity/1B70'
  },
  '5A11': {
    code: '5A11',
    name: 'Diabetes mellitus tipo 2',
    description: 'Trastorno metabólico caracterizado por hiperglucemia crónica.',
    foundationId: 'http://id.who.int/icd/entity/5A11'
  },
  '8A10': {
    code: '8A10',
    name: 'Enfermedad de Parkinson',
    description: 'Trastorno neurodegenerativo crónico del sistema nervioso central.',
    foundationId: 'http://id.who.int/icd/entity/8A10'
  },
  'CA40': {
    code: 'CA40',
    name: 'Asma severa',
    description: 'Afección en la que las vías respiratorias se inflaman y dificultan la respiración.',
    foundationId: 'http://id.who.int/icd/entity/CA40'
  },
  'MG30': {
    code: 'MG30',
    name: 'Dolor crónico',
    description: 'Dolor que persiste o recurre durante más de 3 meses.',
    foundationId: 'http://id.who.int/icd/entity/MG30'
  }
};

export const JCI_STANDARDS = [
  'Correcta identificación del paciente',
  'Comunicación efectiva entre el equipo médico',
  'Mejora de la seguridad de los medicamentos de alto riesgo',
  'Cirugía en el lugar correcto, con el procedimiento y paciente correcto',
  'Reducción del riesgo de infecciones asociadas a la atención sanitaria',
  'Reducción del riesgo de daño al paciente por caídas'
];

export const LATAM_RIGOR_METRICS = {
  'Tiempo de Respuesta': 'Metas de primer mundo (< 15 min en Triage Crítico)',
  'Certificación': 'CSG (México) / JCI (Global)',
  'Precisión Diagnóstica': 'Seguimiento algorítmico CIE-11',
  'Satisfacción Nayarit 2027': 'Meta > 98%'
};
