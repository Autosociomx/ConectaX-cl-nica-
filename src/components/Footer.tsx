import React from 'react';
import { Plus, MapPin, Phone, MessageSquare, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-dark-navy rounded-xl flex items-center justify-center text-gold shadow-lg">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-dark-navy tracking-tighter">ConectaX <span className="text-sage">Médico</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              La plataforma que conecta a los mejores especialistas con pacientes que buscan excelencia, tecnología y una atención profundamente humana.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders if needed */}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-dark-navy mb-8 uppercase text-[10px] tracking-[0.3em]">Contacto</h4>
            <ul className="space-y-6 text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-soft-bg flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Red Global de Especialistas ConectaX</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-soft-bg flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+52 123 456 7890</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-soft-bg flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span>Soporte Elite 24/7</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-navy mb-8 uppercase text-[10px] tracking-[0.3em]">Legales</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li className="hover:text-sage transition-colors cursor-pointer">Aviso de Privacidad</li>
              <li className="hover:text-sage transition-colors cursor-pointer">Términos y Condiciones</li>
              <li className="hover:text-sage transition-colors cursor-pointer">Política de Cookies</li>
              <li className="hover:text-sage transition-colors cursor-pointer">Consentimiento Informado</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-navy mb-8 uppercase text-[10px] tracking-[0.3em]">Para Doctores</h4>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">¿Eres especialista de alto nivel? Únete a nuestra red y potencia tu práctica con IA de vanguardia.</p>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-deep-teal transition-all group">
              Más información <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 ConectaX Médico. Propiedad Intelectual Pro protegida.</p>
          <div className="flex gap-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-sage">Google Cloud Partner</span>
            <span>Google AI Studio Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
