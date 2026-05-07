import { GoogleGenAI, Type } from "@google/genai";
import { logErrorToTelemetry } from './telemetryService';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ConectaXTriageResult {
  especialidad_sugerida: string;
  urgencia_nivel: number;
  resumen_para_doctor: string;
  tag_busqueda: string;
  accion_recomendada: string;
  justificacion_clinica: string;
}

export const runConectaXTriage = async (symptom: string): Promise<ConectaXTriageResult | null> => {
  const model = "gemini-3-flash-preview";
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: symptom }] }],
      config: {
        systemInstruction: `
          Eres el Motor de Triaje Avanzado de ConectaX Médico, una infraestructura de inteligencia médica Élite desarrollada con los modelos Gemini de Google AI Studio. 
          Tu función es actuar como el primer filtro clínico inteligente para automatizar la gestión de consultorios.

          TAREAS CRÍTICAS:
          1. ANALIZAR el síntoma en lenguaje natural del paciente.
          2. CLASIFICAR en una de estas Especialidades Médicas: [Pediatría, Ginecología, Traumatología, Medicina General, Cardiología, Dermatología, Odontología, Psicología].
          3. ASIGNAR un Nivel de Urgencia del 1 (Control/Rutina) al 5 (Emergencia Vital Inmediata).
          4. GENERAR un Resumen Ejecutivo para el médico que incluya datos clave extraídos.
          5. DEFINIR una Acción Recomendada (ej: "Derivación Inmediata", "Agendar Consulta", "Seguimiento").
          6. PROPORCIONAR una Justificación Clínica breve basada en los síntomas descritos.

          REGLAS DE SEGURIDAD:
          - NO proporciones diagnósticos definitivos.
          - NO recetes medicamentos.
          - SIEMPRE prioriza la seguridad del paciente; ante la duda, eleva el nivel de urgencia.
          - Responde ESTRICTAMENTE en formato JSON.

          FORMATO DE SALIDA:
          {
            "especialidad_sugerida": "string",
            "urgencia_nivel": integer,
            "resumen_para_doctor": "string",
            "tag_busqueda": "string",
            "accion_recomendada": "string",
            "justificacion_clinica": "string"
          }
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            especialidad_sugerida: { type: Type.STRING },
            urgencia_nivel: { type: Type.INTEGER },
            resumen_para_doctor: { type: Type.STRING },
            tag_busqueda: { type: Type.STRING },
            accion_recomendada: { type: Type.STRING },
            justificacion_clinica: { type: Type.STRING },
          },
          required: ["especialidad_sugerida", "urgencia_nivel", "resumen_para_doctor", "tag_busqueda", "accion_recomendada", "justificacion_clinica"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as ConectaXTriageResult;
    }
  } catch (error) {
    console.error("Error in ConectaX Triage:", error);
    logErrorToTelemetry(error, { component: 'geminiService', action: 'runConectaXTriage' });
  }
  return null;
};

export const generateClinicalSummary = async (formData: any) => {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Actúa como un asistente clínico de psicología de élite. 
    Analiza las siguientes respuestas de un formulario de admisión y genera un "Resumen Clínico Ejecutivo" estructurado.
    Incluye:
    1. Perfil del Paciente (resumen demográfico y motivo de consulta).
    2. Análisis de Riesgo (detección de señales de alerta en ansiedad/depresión).
    3. Sugerencia de Enfoque Terapéutico (basado en evidencia).
    4. Puntos clave para la primera sesión.

    Datos del Formulario:
    ${JSON.stringify(formData, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error generating clinical summary:", error);
    logErrorToTelemetry(error, { component: 'geminiService', action: 'generateClinicalSummary' });
    return "Error al generar el resumen clínico. Por favor, revise los datos manualmente.";
  }
};

export const generateHeroImage = async (prompt: string) => {
  // Using gemini-2.5-flash-image for image generation
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
    logErrorToTelemetry(error, { component: 'geminiService', action: 'generateHeroImage' });
  }
  return "https://picsum.photos/seed/therapy/1920/1080?blur=2";
};

export interface VisualIdentityResult {
  primaryColor: string;
  accentColor: string;
  gradient: string;
  auraDescription: string;
  suggestedPrompt?: string;
  celestialLabels: string[];
}

export const generateSpecialistVisualIdentity = async (doctorName: string, specialty: string, bio: string): Promise<VisualIdentityResult | null> => {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Eres un Diseñador de Identidad Visual de Élite para ConectaX Médico. 
    Tu tarea es generar una identidad visual única para un especialista médico basada en su perfil.
    
    CONCEPTO: "EL ARQUITECTO"
    Cada especialista es un "Orquestador Maestro de la Infraestructura Clínica".
    Su aura es el "Celestial Holo", un símbolo de perfección geométrica.
    
    Especialista: ${doctorName}
    Especialidad: ${specialty}
    Bio: ${bio}
    
    Genera:
    1. primaryColor: Un color hexadecimal que represente su autoridad clínica.
    2. accentColor: Un color hexadecimal que represente su calidez o energía.
    3. gradient: Una clase de Tailwind CSS (ej: "from-teal-500/20 to-rose-500/20") que combine ambos.
    4. auraDescription: Una descripción poética y técnica de su "aura" profesional (máximo 150 caracteres), mencionando su rol como Arquitecto.
    5. suggestedPrompt: Un prompt detallado para generar su imagen de perfil profesional usando una IA de imagen (Nano Banana), describiéndolo como una entidad holográfica con un "Celestial Holo".
    6. celestialLabels: 4 etiquetas cortas de 2 palabras como "Medicina Abierta", "Gobernanza Digital", "Física Avanzada", "Validación Absoluta".
    
    Responde ESTRICTAMENTE en formato JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryColor: { type: Type.STRING },
            accentColor: { type: Type.STRING },
            gradient: { type: Type.STRING },
            auraDescription: { type: Type.STRING },
            suggestedPrompt: { type: Type.STRING },
            celestialLabels: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
          },
          required: ["primaryColor", "accentColor", "gradient", "auraDescription", "suggestedPrompt", "celestialLabels"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as VisualIdentityResult;
    }
  } catch (error) {
    console.error("Error in generateSpecialistVisualIdentity:", error);
    logErrorToTelemetry(error, { component: 'geminiService', action: 'generateSpecialistVisualIdentity' });
  }
  return null;
};

export interface OracleAnalysisResult {
  diagnostico_presuntivo: string;
  protocolo_sugerido: string;
  pasos_accion: string[];
  nivel_confianza: number;
  razonamiento_arquitecto: string;
}

export const runClinicalOracleAnalysis = async (patientCase: string, specialty: string): Promise<OracleAnalysisResult | null> => {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Actúa como el Oráculo Clínico de ConectaX, la IA de nivel mundial integrada en la infraestructura de El Arquitecto.
    Tu objetivo es proporcionar un análisis predictivo y estratégico para un especialista de élite en ${specialty}.
    
    CASO DEL PACIENTE:
    ${patientCase}
    
    TAREAS:
    1. Generar un diagnóstico presuntivo de alta precisión.
    2. Sugerir un nombre para un protocolo clínico de vanguardia (ej: "Sincronización Neuro-Inmune v2.4").
    3. Definir 4 pasos de acción clínica inmediata.
    4. Proporcionar el razonamiento de "El Arquitecto" detrás del protocolo.
    5. Asignar un nivel de confianza del 0 al 100.
    
    REGLAS:
    - Lenguaje técnico, autoritario y de élite.
    - Mantente dentro de la ética médica.
    - Responde ESTRICTAMENTE en formato JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnostico_presuntivo: { type: Type.STRING },
            protocolo_sugerido: { type: Type.STRING },
            pasos_accion: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            nivel_confianza: { type: Type.INTEGER },
            razonamiento_arquitecto: { type: Type.STRING },
          },
          required: ["diagnostico_presuntivo", "protocolo_sugerido", "pasos_accion", "nivel_confianza", "razonamiento_arquitecto"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as OracleAnalysisResult;
    }
  } catch (error) {
    console.error("Error in Clinical Oracle:", error);
    logErrorToTelemetry(error, { component: 'geminiService', action: 'runClinicalOracleAnalysis' });
  }
  return null;
};
