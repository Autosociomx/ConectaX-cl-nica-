import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Plus, Search } from 'lucide-react';
import { Doctor } from '../services/doctorService';

interface HeaderProps {
  scrolled: boolean;
  DOCTORS: Doctor[];
  selectedDoctor: Doctor;
  showDirectory: boolean;
  setSelectedDoctor: (doc: Doctor) => void;
  setShowDirectory: (show: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({
  scrolled,
  DOCTORS,
  selectedDoctor,
  showDirectory,
  setSelectedDoctor,
  setShowDirectory,
  setIsChatOpen,
  isMenuOpen,
  setIsMenuOpen
}: HeaderProps) {
  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowDirectory(true)}>
            <div className="w-12 h-12 bg-dark-navy rounded-2xl flex items-center justify-center text-gold shadow-2xl border border-white/5">
              <Plus className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tighter text-dark-navy leading-none">Conecta<span className="text-sage">X</span> <span className="text-gold">Elite</span></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">Red Global de Especialistas</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-slate-100 shadow-sm">
              {DOCTORS.slice(0, 3).map(doc => (
                <button 
                  key={doc.id}
                  onClick={() => { setSelectedDoctor(doc); setShowDirectory(false); }}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedDoctor.id === doc.id && !showDirectory ? 'bg-dark-navy text-white shadow-xl scale-105' : 'text-slate-500 hover:text-dark-navy hover:bg-slate-50'}`}
                >
                  {doc.nombre.split(' ')[1]}
                </button>
              ))}
              <button 
                onClick={() => setShowDirectory(true)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${showDirectory ? 'bg-accent-coral text-white shadow-xl scale-105' : 'text-slate-500 hover:text-accent-coral'}`}
              >
                <Search className="w-3.5 h-3.5" /> Directorio
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <nav className="flex items-center gap-8">
              <a href="#perfil" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-deep-teal transition-colors">Perfil</a>
              <a href="#servicios" className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-deep-teal transition-colors">Servicios</a>
              <button onClick={() => setIsChatOpen(true)} className="btn-primary py-3 px-10 text-xs shadow-lg shadow-deep-teal/20">Enlace 1 a 1</button>
            </nav>
          </div>

          <button className="md:hidden p-3 bg-white rounded-xl shadow-lg text-deep-teal" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-10 text-center">
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {DOCTORS.slice(0, 8).map(doc => (
                  <button 
                    key={doc.id}
                    onClick={() => { setSelectedDoctor(doc); setShowDirectory(false); setIsMenuOpen(false); }}
                    className={`px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedDoctor.id === doc.id && !showDirectory ? 'bg-deep-teal text-white border-deep-teal shadow-xl' : 'border-slate-100 text-slate-500 bg-white'}`}
                  >
                    {doc.nombre}
                  </button>
                ))}
              </div>
              <a href="#perfil" onClick={() => setIsMenuOpen(false)} className="text-4xl font-bold text-dark-navy tracking-tighter">Perfil</a>
              <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="text-4xl font-bold text-dark-navy tracking-tighter">Servicios</a>
              <a href="#testimonios" onClick={() => setIsMenuOpen(false)} className="text-4xl font-bold text-dark-navy tracking-tighter">Opiniones</a>
              <button onClick={() => { setIsChatOpen(true); setIsMenuOpen(false); }} className="btn-primary py-6 text-xl tracking-tight mt-10">Enlace 1 a 1</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
