import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, User, Plus, Maximize, Shield, Sparkles, Zap, Activity } from 'lucide-react';
import { Doctor } from '../../services/doctorService';

export default function TelemedicineRoom({ doctor, onClose }: { doctor: Doctor, onClose: () => void }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setCallStatus('active'), 2500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let interval: any;
    if (callStatus === 'active') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-dark-navy flex items-center justify-center p-6 md:p-10 overflow-hidden"
    >
      {/* Background scanline effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`, backgroundSize: '100% 2px, 3px 100%' }} />

      <div className="w-full h-full max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center text-gold border border-gold/20 shadow-2xl">
                <Shield className="w-7 h-7" />
             </div>
             <div>
                <h3 className="text-2xl font-bold tracking-tighter">Enlace Holográfico de Élite</h3>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.3em]">Sesión Segura End-to-End Google Cloud</p>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono font-bold">{formatTime(timer)}</span>
             </div>
             <button onClick={onClose} className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-xl shadow-red-500/20">
                <PhoneOff className="w-6 h-6" />
             </button>
          </div>
        </div>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Main Feed */}
           <div className="lg:col-span-3 relative rounded-[3rem] overflow-hidden bg-black/40 border border-white/10 shadow-2xl group">
              <AnimatePresence mode="wait">
                 {callStatus === 'connecting' ? (
                   <motion.div 
                     key="connecting"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-white"
                   >
                     <div className="relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="w-48 h-48 rounded-full border-4 border-gold/20 border-t-gold"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <img src={doctor.auraImage || doctor.imagen} className="w-32 h-32 rounded-full object-cover grayscale opacity-50" />
                        </div>
                     </div>
                     <p className="text-xl font-bold uppercase tracking-[0.5em] animate-pulse">Sincronizando Nodo {doctor.nombre.split(' ')[1]}</p>
                   </motion.div>
                 ) : (
                   <motion.div 
                    key="active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full relative"
                   >
                     <img 
                      src={doctor.auraImage || doctor.imagen} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                      referrerPolicy="no-referrer"
                     />
                     
                     {/* Holographic Overlays */}
                     <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 via-transparent to-transparent pointer-events-none" />
                     
                     <motion.div
                        animate={{ top: ['-20%', '120%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-gold/10 to-transparent z-20"
                     />

                     <div className="absolute top-10 left-10 p-6 glass-card bg-black/40 border-white/10 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-2">
                           <Zap className="w-4 h-4 text-gold" />
                           <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Status del Nodo</span>
                        </div>
                        <p className="text-xl font-bold text-white uppercase tracking-tighter">Validación 1.0.4.8</p>
                     </div>

                     <div className="absolute bottom-10 left-10 text-white">
                        <p className="text-xs font-bold text-gold uppercase tracking-[0.4em] mb-2">{doctor.especialidad}</p>
                        <h2 className="text-5xl font-bold tracking-tighter">{doctor.nombre}</h2>
                     </div>
                   </motion.div>
                 )}
              </AnimatePresence>

              {/* Self view */}
              <div className="absolute top-10 right-10 w-64 h-40 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
                 <div className="w-full h-full flex flex-col items-center justify-center text-white/40 bg-slate-900">
                    <User className="w-12 h-12" />
                    <span className="text-[8px] font-bold uppercase tracking-widest mt-2">Paciente (Tú)</span>
                 </div>
              </div>
           </div>

           {/* Dashboard Sidebar */}
           <div className="hidden lg:flex flex-col gap-6">
              <div className="glass-card p-8 bg-white/5 border-white/10 rounded-[2.5rem] flex-grow text-white overflow-y-auto">
                 <h4 className="text-[10px] font-bold text-gold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Telemetría Clínica</h4>
                 <div className="space-y-8">
                    {[
                      { label: 'Ritmo Cardíaco', value: '72 BPM', icon: <Activity className="w-4 h-4" /> },
                      { label: 'Oxigenación', value: '98%', icon: <Zap className="w-4 h-4" /> },
                      { label: 'Sinc. Neural', value: '89.4%', icon: <Sparkles className="w-4 h-4" /> }
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col gap-2">
                         <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                               {m.icon}
                               <span>{m.label}</span>
                            </div>
                            <span>Normal</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: m.value }}
                              className="h-full bg-gold"
                            />
                         </div>
                         <p className="text-xl font-bold tracking-tight">{m.value}</p>
                      </div>
                    ))}
                 </div>

                 <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h5 className="text-[10px] font-bold text-sage uppercase tracking-widest mb-2">Protocolo Activo</h5>
                    <p className="text-sm font-medium text-slate-300 italic">"Sincronización Neuro-Inmune v2.4"</p>
                 </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between gap-4">
                 <button 
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`flex-1 py-4 px-6 rounded-2xl flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/20'}`}
                 >
                    {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                 </button>
                 <button 
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`flex-1 py-4 px-6 rounded-2xl flex items-center justify-center transition-all ${isVideoOn ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/20'}`}
                 >
                    {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                 </button>
                 <button className="flex-1 py-4 px-6 rounded-2xl bg-white/10 text-white flex items-center justify-center">
                    <Maximize className="w-6 h-6" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
