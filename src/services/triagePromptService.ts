/**
 * Triage Prompt Orchestration Service
 * Defines the 100-step value ladder for medical triage in emergencies.
 * Structured into 5 elite stages of 20 prompts each.
 */

export interface TriagePromptGroup {
  stage: string;
  focus: string;
  prompts: string[];
}

export const TRIAGE_PROMPT_LADDER: TriagePromptGroup[] = [
  {
    stage: "I: Sincronización de Supervivencia (Nivel 1-20)",
    focus: "Estabilización Vital Inmediata y Detección de Paro",
    prompts: [
      "Define el estatus vital: ¿Respira? ¿Responde? (Aislamiento de Prioridad 0)",
      "Vectores de hemorragia masiva: Localiza y aplica presión (Triage Rojo)",
      "Obstrucción de vía aérea: Maniobras de despeje inmediatas",
      "Shock anafiláctico: Identificación de exposición y respuesta epinefrina",
      "Protocolo de trauma penetrante: Inmovilización y control de daños",
      "Evaluación pupilar y Glasgow rápido para trauma craneal",
      "Sincronización con desfibrilador: Análisis de ritmo automático",
      "Inmovilización cervical táctica en colisiones de alto impacto",
      "Control térmico ante hipotermia severa: Preservación de núcleo",
      "Monitorización de saturación O2 crítica: Umbral de intubación",
      "Administración de fluidos en shock hipovolémico (Rápido/Agresivo)",
      "Identificación de neumotórax a tensión: Descompresión de aguja",
      "Soporte vital básico (RCP) con cadencia de precisión",
      "Manejo de quemaduras de 3er grado: Hidratación y cobertura",
      "Detección de sepsis fulminante: Criterios qSOFA",
      "Analgesia táctica en amputación traumática",
      "Protección ocular ante exposición química corrosiva",
      "Estabilización de fracturas expuestas: Prevención de embolia",
      "Asistencia en parto inminente fuera de hospital",
      "Cierre de brecha vital: Decisión Final de Traslado Nivel 1"
    ]
  },
  {
    stage: "II: Arquitectura de Diagnóstico Crítico (Nivel 21-40)",
    focus: "Triaje Avanzado Manchester y Clasificación de Riesgo",
    prompts: [
      "Criterios de Manchester: Asignación de color según dolor y gravedad",
      "Detección de Arritmias Malignas vía ECG 12 derivaciones",
      "Marcadores de infarto agudo al miocardio (Troponinas/Tiempo)",
      "Análisis de gasometría arterial: Equilibrio ácido-base",
      "Detección de Ictus (ACV): Escala Cincinnati de precisión",
      "Identificación de abdomen agudo quirúrgico",
      "Crisis hipertensiva: Daño a órgano diana",
      "Estatus epiléptico: Control de convulsiones repetitivas",
      "Insuficiencia renal aguda: Monitoreo de diuresis",
      "Cetoacidosis diabética: Manejo de insulina y electrolitos",
      "Edema agudo de pulmón: Ventilación no invasiva",
      "Hemotransfusión masiva: Protocolo 1:1:1",
      "Manejo de intoxicación por opiáceos: Antídoto de precisión",
      "Detección de meningitis bacteriana: Signos meníngeos",
      "Urgencia pediátrica: Triángulo de evaluación",
      "Politraumatizado: Evaluación secundaria detallada",
      "Manejo de crisis asmática severa: Corticoterapia",
      "Identificación de embolismo pulmonar",
      "Urgencia geriátrica: Fragilidad y polifarmacia",
      "Síncope de alto riesgo: Criterios de ingreso"
    ]
  },
  {
    stage: "III: Estrategia de Gobernanza Inteligente (Nivel 41-60)",
    focus: "Gestión de Recursos y Orquestación Hospitalaria",
    prompts: [
      "Optimización de camas: Ratio de ocupación en tiempo real",
      "Seguimiento de tiempos de espera: Cuellos de botella en admisión",
      "Asignación de especialistas según complejidad CIE-11",
      "Gobernanza de recursos críticos: Ventiladores y Quirófanos",
      "Protocolo de desastres: Triage en incidentes de múltiples víctimas",
      "Gestión de traslados aéreos (Heli-triage)",
      "Tele-medicina de apoyo para centros rurales remotos",
      "Auditoría de protocolos clínicos activos",
      "Gestión de suministros: Inventario automático de fármacos",
      "Coordinación con bancos de sangre regionales",
      "Sincronización de datos con el Dataset Global ConectaX",
      "Gobernanza de ética médica en decisiones de triage",
      "Manejo de incidentes con materiales peligrosos (Hazmat)",
      "Comunicación con familiares en situaciones críticas",
      "Gestión de turnos y fatiga del personal médico",
      "Optimización de la cadena de frío para biológicos",
      "Seguimiento de infecciones intrahospitalarias (IA)",
      "Análisis de costos vs resultados clínicos",
      "Gobernanza de la privacidad del paciente (GDPR/HIPAA)",
      "Sincronización con el Monitor de Obra Pública (Infraestructura)"
    ]
  },
  {
    stage: "IV: Oráculo de Predicción Clínica (Nivel 61-80)",
    focus: "Inteligencia Artificial y Análisis Predictivo",
    prompts: [
      "Predicción de falla multiorgánica mediante Machine Learning",
      "Análisis de tendencias epidemiológicas en tiempo real",
      "Sugerencia de protocolos personalizados por ADN/Genómica",
      "Detección proactiva de deterioro clínico (NEWS Score)",
      "Predicción de demanda en urgencias (IA Estacional)",
      "Mapeo de riesgos territoriales en Nayarit",
      "Optimización de dosis farmacéutica predictiva",
      "Análisis de imagenología asistido por IA (Rayos X/TAC)",
      "Detección de sesgos en el triage automatizado",
      "Entrenamiento de modelos con casos raros identificados",
      "Simulación de escenarios de crisis (Gemelo Digital)",
      "Predicción de reingresos a corto plazo",
      "Sincronización con sensores IoT de agricultura (Salud Ambiental)",
      "Identificación de anomalías en signos vitales",
      "Generación de resúmenes clínicos ejecutivos automáticos",
      "Validación cruzada de diagnósticos presuntivos",
      "Análisis de voz para detección de distress respiratorio",
      "Mapeo de disponibilidad de fármacos alternativos",
      "Optimización del 'Gold Standard' terapéutico",
      "Consenso de IA: Validación multicéntrica"
    ]
  },
  {
    stage: "V: Soberanía y Despliegue Digital (Nivel 81-100)",
    focus: "Implementación en Tepic Digital y Ciudad del Futuro",
    prompts: [
      "Despliegue de TepictuSalud en cabeceras municipales",
      "Censo digital de salud en colonias marginadas",
      "Implementación de kioscos de triaje autónomos",
      "Integración del carnet digital de salud en Nayarit",
      "Sincronización con el AgroVisión 3D (Zoonosis)",
      "Transparencia total en el Monitor de Obra Pública Sanitaria",
      "Capacitación masiva de promotores de salud con IA",
      "Despliegue de nodos satelitales en zonas serranas",
      "Gobernanza de la identidad digital del ciudadano",
      "Automatización de la facturación y seguimiento de pagos",
      "Exportación de datos de impacto a la OMS",
      "Implementación del 'Hospital Sin Papeles' (Zero-Paper)",
      "Monitorización del impacto social de la estrategia",
      "Gobernanza de la IA humanista: Empatía digital",
      "Despliegue de drones para entrega de fármacos críticos",
      "Integración con sistemas de emergencia 911 Tepic",
      "Certificación internacional de procesos digitales",
      "Escalabilidad de la red médica estatal Nayarit",
      "Visión 2033: Nayarit Potencia Médica Tecnológica",
      "Cierre del Ciclo: Mejora Continua y Evolución Permanente"
    ]
  }
];
