export interface Doctor {
  id: string;
  slug: string;
  nombre: string;
  especialidad: string;
  categoria: 'Medicina' | 'Psicología' | 'Nutrición' | 'Bienestar';
  hub: 'Neuro-Cognitivo' | 'Precisión Genómica' | 'Medicina Regenerativa' | 'Salud Mental de Élite' | 'Optimización Metabólica';
  bio: string;
  whatsapp: string;
  ubicacion: string;
  experiencia: string;
  pacientes: string;
  imagen: string;
  telemedicina: boolean;
  // Elite AI & PNL Metadata
  aiConfig: {
    pnlStyle: 'Empático' | 'Directo' | 'Analítico' | 'Cálido';
    expertiseKeywords: string[];
    protocolosEspecificos: string[];
    tonoVoz: string;
  };
  servicios: { title: string; desc: string; icon: string }[];
  testimonios: { name: string; text: string; rating: number }[];
  symptomOptions: { id: string; label: string; icon: string }[];
  visualIdentity?: {
    primaryColor: string;
    accentColor: string;
    gradient: string;
    auraDescription: string;
    suggestedPrompt?: string;
    celestialLabels: string[];
  };
  auraImage?: string;
  casosResueltos?: number;
  nivelEvolucion?: string;
}

const eliteNames = [
  'Dr. Alexander Vance', 'Dra. Elena Rostova', 'Dr. Marcus Chen', 'Dra. Sarah Jenkins',
  'Dr. Victor Sterling', 'Dra. Isabella Rossi', 'Dr. James Harwood', 'Dra. Mei Lin',
  'Dr. Arthur Pendelton', 'Dra. Sofia Al-Fayed', 'Dr. Julian Bautista', 'Dra. Claire Dupont',
  'Dr. Henrik Thorne', 'Dra. Amara Singh', 'Dr. Leonardo Silva', 'Dra. Rachel Weiss',
  'Dr. Thomas Wright', 'Dra. Yuki Tanaka', 'Dr. Omar Farooq', 'Dra. Nadia Volkov',
  'Dr. William Bradley', 'Dra. Carmen Delgado', 'Dr. Richard Kim', 'Dra. Olivia Benson',
  'Dr. Daniel Cohen', 'Dra. Maria Santos', 'Dr. Robert Chang', 'Dra. Elizabeth Mercer',
  'Dr. Michael O\'Connor', 'Dra. Anna Kowalski', 'Dr. David Okafor', 'Dra. Laura Palmer',
  'Dr. Christopher Lee', 'Dra. Diana Navarro', 'Dr. Jonathan Carter', 'Dra. Pamela Vargas',
  'Dr. Stephen Cross', 'Dra. Helena Quinzel', 'Dr. Bruce Sterling', 'Dra. Celine Varga'
];

const eliteSpecialties = [
  'Neurocirugía Robótica', 'Cardiología Genómica', 'Oncología de Precisión', 'Inmunología Molecular',
  'Endocrinología Avanzada', 'Psiquiatría Neurocognitiva', 'Medicina Regenerativa', 'Terapia Génica',
  'Cirugía Cardiovascular', 'Neurología Funcional', 'Gastroenterología Molecular', 'Nefrología Traslacional',
  'Neumología Intervencionista', 'Reumatología Biológica', 'Dermatología Oncológica', 'Hematología Avanzada',
  'Infectología Global', 'Pediatría Genómica', 'Geriatría de Precisión', 'Medicina Aeroespacial',
  'Nutrición Epigenética', 'Psicología Clínica Avanzada', 'Neuropsicología', 'Medicina Deportiva de Élite',
  'Cirugía Plástica Reconstructiva', 'Oftalmología Biónica', 'Otorrinolaringología Robótica', 'Urología Oncológica',
  'Ginecología Reproductiva Avanzada', 'Obstetricia Fetal', 'Anestesiología de Precisión', 'Radiología Intervencionista',
  'Patología Molecular', 'Medicina de Emergencia Avanzada', 'Toxicología Clínica', 'Farmacología Genómica',
  'Epidemiología Computacional', 'Salud Pública Global', 'Bioética Médica', 'Informática Biomédica'
];

const categories: ('Medicina' | 'Psicología' | 'Nutrición' | 'Bienestar')[] = ['Medicina', 'Psicología', 'Nutrición', 'Bienestar'];
const pnlStyles: ('Empático' | 'Directo' | 'Analítico' | 'Cálido')[] = ['Empático', 'Directo', 'Analítico', 'Cálido'];
const hubs: ('Neuro-Cognitivo' | 'Precisión Genómica' | 'Medicina Regenerativa' | 'Salud Mental de Élite' | 'Optimización Metabólica')[] = [
  'Neuro-Cognitivo', 'Precisión Genómica', 'Medicina Regenerativa', 'Salud Mental de Élite', 'Optimización Metabólica'
];

const generateDoctors = (): Doctor[] => {
  const doctors: Doctor[] = [];
  
  const baseCases = 25000;

  for (let i = 0; i < 40; i++) {
    const name = eliteNames[i];
    const spec = eliteSpecialties[i];
    const category = categories[i % categories.length];
    const pnlStyle = pnlStyles[i % pnlStyles.length];
    const hub = hubs[i % hubs.length];
    const visualGradients = [
      'from-blue-500/20 to-purple-500/20',
      'from-emerald-500/20 to-cyan-500/20',
      'from-orange-500/20 to-red-500/20',
      'from-pink-500/20 to-rose-500/20'
    ];
    
    // Rivalry stats
    const casosResueltos = baseCases + Math.floor(Math.random() * 10000);
    const version = (Math.floor(casosResueltos / 1000)).toString() + '.' + (casosResueltos % 100).toString();

    doctors.push({
      id: (i + 1).toString(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      nombre: name,
      especialidad: spec,
      categoria: category,
      hub: hub,
      bio: `Especialista de élite mundial con formación en instituciones de prestigio como Harvard y Oxford. Su enfoque integra protocolos de vanguardia y neurociencia aplicada para garantizar una transformación real en la salud del paciente. A través de su enlace 1 a 1, asegura una eficiencia clínica total, compitiendo con los estándares académicos más altos del mundo.`,
      whatsapp: `521${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      ubicacion: 'Centro de Excelencia Médica, Nodo ' + (i + 1),
      experiencia: `v${version}`,
      pacientes: `${(casosResueltos / 1000).toFixed(1)}k`,
      casosResueltos: casosResueltos,
      nivelEvolucion: `Elite Nivel ${Math.floor(casosResueltos / 200)}`,
      imagen: `https://picsum.photos/seed/${name.replace(/[^a-zA-Z0-9]/g, '')}/800/600`,
      telemedicina: true,
      aiConfig: {
        pnlStyle: pnlStyle,
        expertiseKeywords: [spec.toLowerCase(), 'neurociencia aplicada', 'protocolos elite', 'eficiencia clínica', 'transformación cognitiva'],
        protocolosEspecificos: [`Protocolo Global ${spec} v${version}`, 'Sincronización de Salud de Alto Valor'],
        tonoVoz: `Tono ${pnlStyle.toLowerCase()}, con autoridad académica indiscutible y calidez humana de élite.`
      },
      visualIdentity: {
        primaryColor: '#0F172A',
        accentColor: '#D4AF37',
        gradient: visualGradients[i % visualGradients.length],
        auraDescription: `El Arquitecto: Orquestador Maestro de la Infraestructura Clínica. Validación Absoluta en ${spec}.`,
        celestialLabels: ['Medicina Abierta', 'Gobernanza Digital', 'Física Avanzada', 'Celestial Holo'],
        suggestedPrompt: `A futuristic holographic doctor, "The Architect", standing in a high-tech medical command center. Surrounded by a "Celestial Holo" – a glowing geometric aura with rainbow prismatic effects. Wearing silver and gold futuristic armor-robes. Floating digital labels: "Medicina Abierta", "Gobernanza Digital". Cinematic lighting, 8k resolution, hyper-realistic.`
      },
      servicios: [
        { title: `Enlace Holográfico 1 a 1`, desc: `Sesión inmersiva para la transformación total de tu conocimiento médico.`, icon: "Activity" },
        { title: "Arquitectura Clínica", desc: "Validación absoluta usando protocolos de nivel mundial.", icon: "Zap" }
      ],
      testimonios: [
        { name: "Junta Médica Global", text: `Ha resuelto ${casosResueltos} casos complejos con precisión absoluta.`, rating: 5 }
      ],
      symptomOptions: [
        { id: 'analisis', label: 'Análisis Profundo', icon: 'Brain' },
        { id: 'optimización', label: 'Tratamiento Avanzado', icon: 'Zap' }
      ]
    });
  }
  
  // Sort by casosResueltos descending to show rivalry/leaderboard
  return doctors.sort((a, b) => (b.casosResueltos || 0) - (a.casosResueltos || 0));
};

export const DOCTORS: Doctor[] = generateDoctors();

export function findDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find(d => d.slug === slug);
}

export function findDoctorBySpecialty(specialty: string): Doctor | undefined {
  const normalized = specialty.toLowerCase();
  return DOCTORS.find(d => 
    d.especialidad.toLowerCase().includes(normalized) || 
    normalized.includes(d.especialidad.toLowerCase().split(' ')[0])
  );
}
