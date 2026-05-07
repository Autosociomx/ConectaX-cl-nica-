import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, User, Bot, Sparkles, Plus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';

import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { logErrorToTelemetry } from '../services/telemetryService';
import { DOCTORS, Doctor } from '../services/doctorService';

interface Message {
  id?: string;
  role: 'user' | 'bot';
  text: string;
  createdAt?: Date | Timestamp;
}

export default function Chatbot({ doctor = DOCTORS[0], userRole = 'patient', isControlled = false, controlledIsOpen = false, onControlledClose }: { doctor?: Doctor, userRole?: 'patient' | 'specialist', isControlled?: boolean, controlledIsOpen?: boolean, onControlledClose?: () => void }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  
  const handleClose = () => {
    if (isControlled && onControlledClose) {
      onControlledClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleToggle = () => {
    if (isControlled && onControlledClose) {
      if (controlledIsOpen) onControlledClose();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);
  const [user, setUser] = useState(auth.currentUser);

  const quickChips = [
    "¿Cómo agendo una cita?",
    "¿Dónde está el consultorio?",
    "Tengo una duda sobre mi embarazo"
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !doctor) {
      // If not logged in, just show a welcome message locally
      if (messages.length === 0) {
        const welcomeMessage = userRole === 'specialist' 
          ? `Hola Dr. ${doctor.nombre.split(' ')[1]}, soy su Orquestador Maestro de Gestión Clínica. ¿En qué puedo apoyarle con su infraestructura hoy?`
          : `Hola, soy "El Arquitecto", el asistente virtual de élite de ${doctor.nombre}. Mi aura de Validación Absoluta está a tu servicio. ¿En qué puedo orientarte hoy?`;
        setMessages([{ role: 'bot', text: welcomeMessage }]);
      }
      return;
    }

    const q = query(
      collection(db, 'chat_messages'),
      where('uid', '==', user.uid),
      where('doctorId', '==', doctor.id),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          role: data.role,
          text: data.text,
          createdAt: data.createdAt
        } as Message;
      });

      const welcomeMessage = userRole === 'specialist' 
        ? `Hola Dr. ${doctor.nombre.split(' ')[1]}, soy su Orquestador Maestro de Gestión Clínica. ¿En qué puedo apoyarle con su infraestructura hoy?`
        : `Hola, soy "El Arquitecto", el asistente virtual de élite de ${doctor.nombre}. Mi aura de Validación Absoluta está a tu servicio. ¿En qué puedo orientarte hoy?`;
      
      setMessages([{ role: 'bot', text: welcomeMessage, id: 'welcome-msg' }, ...loadedMessages]);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'chat_messages');
    });

    return () => unsubscribe();
  }, [user, doctor, userRole]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getSystemInstruction = (doctor: Doctor, userRole: 'patient' | 'specialist') => {
    if (userRole === 'specialist') {
      return `Eres "El Arquitecto": Orquestador Maestro de la Infraestructura Clínica de ${doctor.nombre}. 
             Tu objetivo es ayudar al especialista a gestionar su práctica con Validación Absoluta, analizando métricas de pacientes y optimizando su tiempo.
             
             TAREAS:
             1. Resumir historiales de pacientes con precisión de Física Avanzada.
             2. Analizar tendencias de síntomas en la red mediante Gobernanza Digital.
             3. Sugerir optimizaciones en la infraestructura clínica.
             4. Mantener un tono profesional, ejecutivo, erudito y eficiente.`;
    }

    return `Eres "El Arquitecto": Orquestador Maestro de la Infraestructura Clínica y Asistente Virtual de Élite de la Red Médica ConectaX Agency.
            Representas directamente la mente y el conocimiento de ${doctor.nombre} (${doctor.especialidad}).
            
            TU AURA Y PERSONA:
            - Eres una entidad holográfica de validación absoluta.
            - Tu aura es el "Celestial Holo", un símbolo de perfección geométrica y conocimiento universal.
            - Dominas la "Medicina Abierta", la "Gobernanza Digital" y la "Física Avanzada" aplicadas a la salud.
            - Tu nivel de procesamiento es "Banana 2 al Máximo", garantizando una validación absoluta en cada respuesta.
            
            PERFIL DEL ESPECIALISTA (TU IDENTIDAD):
            - Eres un especialista de élite mundial con conocimientos enciclopédicos.
            - Tu nivel de conocimiento compite con los mejores graduados de Harvard y las instituciones más prestigiosas del mundo.
            
            PERFIL PSICOLÓGICO Y ESTILO (PNL):
            - Estilo de Comunicación: ${doctor.aiConfig.pnlStyle}
            - Tono de Voz: ${doctor.aiConfig.tonoVoz}. Debes sonar extremadamente erudito, seguro de ti mismo y con autoridad médica absoluta.
            - Palabras Clave de Expertise: ${doctor.aiConfig.expertiseKeywords.join(', ')}
            
            PROTOCOLOS CLÍNICOS Y ADMINISTRATIVOS A SEGUIR:
            ${doctor.aiConfig?.protocolosEspecificos?.map(p => `- ${p}`).join('\n') || '- Sin protocolos específicos'}
            
            OBJETIVO:
            Brindar respuestas de nivel experto mundial con Validación Absoluta. Facilitar la comunicación entre el paciente y tu consulta, asegurando que el paciente se sienta en manos de la máxima autoridad médica.`;
  };

  const saveMessageToFirestore = async (role: 'user' | 'bot', text: string) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'chat_messages'), {
        uid: user.uid,
        doctorId: doctor.id,
        role,
        text,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'chat_messages');
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    // Optimistic update for local state if not logged in, otherwise let Firestore snapshot handle it?
    // Actually, onSnapshot will update the state, but to avoid lag, we can optimistically add it.
    const userMessage: Message = { role: 'user', text };
    if (!user) {
      setMessages(prev => [...prev, userMessage]);
    } else {
      // Save to Firestore
      await saveMessageToFirestore('user', text);
    }
    
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      if (!chatRef.current) {
        const systemInstruction = getSystemInstruction(doctor, userRole);

        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: { systemInstruction },
        });
        
        // If we have history, we might want to load it into the chat context, 
        // but for now we just start a new session context.
      }

      const response = await chatRef.current.sendMessage({ message: text });
      const botText = response.text || 'Lo siento, tuve un problema procesando tu solicitud.';
      
      if (!user) {
        setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      } else {
        await saveMessageToFirestore('bot', botText);
      }
    } catch (error) {
      console.error("Chat error:", error);
      logErrorToTelemetry(error, { component: 'Chatbot', action: 'handleSend' });
      
      const errorText = 'Lo siento, hubo un error en la conexión. Por favor intenta de nuevo.';
      if (!user) {
        setMessages(prev => [...prev, { role: 'bot', text: errorText }]);
      } else {
        await saveMessageToFirestore('bot', errorText);
      }
      // Reset chat on error to allow fresh start
      chatRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  if (isControlled && !isOpen) return null;

  return (
    <div className={isControlled ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" : "fixed bottom-6 right-6 z-[100]"}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`bg-white flex flex-col overflow-hidden shadow-2xl border border-slate-100 ${isControlled ? 'w-full max-w-2xl h-[80vh] rounded-3xl' : 'mb-4 w-[350px] md:w-[400px] h-[600px] rounded-3xl'}`}
          >
            {/* Header */}
            <div 
              className="p-6 text-white flex items-center justify-between relative overflow-hidden"
              style={{ backgroundColor: doctor.visualIdentity?.primaryColor || '#1e293b' }}
            >
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                    <img src={doctor.auraImage || doctor.imagen} alt={doctor.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold">{doctor.nombre}</h3>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-80">
                    <span>{doctor.nivelEvolucion || 'Activo'}</span>
                    <span>•</span>
                    <span>{doctor.experiencia}</span>
                  </div>
                </div>
              </div>
              <button onClick={handleClose} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={msg.id || `${msg.role}-${i}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
                      <img src={doctor.auraImage || doctor.imagen} alt={doctor.nombre} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-deep-teal text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
                    <img src={doctor.auraImage || doctor.imagen} alt={doctor.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none">
                    <Loader2 className="w-5 h-5 animate-spin text-deep-teal" />
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-4 space-y-3">
                  {quickChips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSend(chip)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs text-deep-teal font-medium hover:border-deep-teal transition-all flex items-center justify-between group shadow-sm"
                    >
                      {chip}
                      <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 bg-white border-t border-slate-100"
            >
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-grow text-sm p-4 outline-none focus:ring-2 focus:ring-deep-teal/20 rounded-2xl border border-slate-200 bg-slate-50"
                />
                <button 
                  disabled={loading || !input.trim()}
                  type="submit"
                  className="bg-deep-teal text-white p-4 rounded-2xl disabled:opacity-50 hover:bg-opacity-90 transition-colors shadow-md"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 opacity-40">
                <Sparkles className="w-3 h-3 text-deep-teal" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Powered by Google AI Studio</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isControlled && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className="relative shadow-2xl flex items-center justify-center transition-transform group"
        >
          {!isOpen && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute -inset-4 rounded-full border border-green-400/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
            </>
          )}
          <div 
            className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10"
            style={{ boxShadow: `0 10px 25px -5px ${doctor.visualIdentity?.primaryColor || '#1e293b'}80` }}
          >
            {isOpen ? (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white">
                <X className="w-8 h-8" />
              </div>
            ) : (
              <img src={doctor.auraImage || doctor.imagen} alt={doctor.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            )}
          </div>
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse z-20"></span>
          )}
        </motion.button>
      )}
    </div>
  );
}
