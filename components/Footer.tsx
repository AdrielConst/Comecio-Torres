
import React from 'react';
import { ViewState } from '../types';

interface FooterProps {
  onAdminClick: () => void;
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, onNavigate }) => {
  return (
    <footer className="bg-white mt-12 pt-12 pb-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-500 text-sm">
        <div className="space-y-6">
          <h4 className="text-gray-900 font-black italic uppercase tracking-widest text-xs border-b-2 border-blue-50 pb-2 inline-block">Sobre a Comercial Torres</h4>
          <ul className="space-y-3 font-bold text-[11px] uppercase tracking-wider">
            <li onClick={() => onNavigate('about_us')} className="hover:text-[#3483fa] cursor-pointer transition-colors">Quem somos</li>
            <li className="text-gray-300 cursor-not-allowed">Trabalhe conosco (Em breve)</li>
            <li className="text-gray-300 cursor-not-allowed">Termos e condições</li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-gray-900 font-black italic uppercase tracking-widest text-xs border-b-2 border-blue-50 pb-2 inline-block">Ajuda e Suporte</h4>
          <ul className="space-y-3 font-bold text-[11px] uppercase tracking-wider">
            <li onClick={() => onNavigate('store')} className="hover:text-[#3483fa] cursor-pointer transition-colors">Como comprar</li>
            <li onClick={() => onNavigate('tracking')} className="hover:text-[#3483fa] cursor-pointer transition-colors">Rastrear meu pedido</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-gray-900 font-black italic uppercase tracking-widest text-xs border-b-2 border-blue-50 pb-2 inline-block">Redes Sociais</h4>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-[#3483fa] font-black uppercase text-[10px] tracking-widest bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 transition-all">Facebook</span>
            <span className="cursor-pointer hover:text-[#3483fa] font-black uppercase text-[10px] tracking-widest bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 transition-all">Instagram</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
        <p>Copyright © 1999-2025 ComercialTorres.com.br LTDA.</p>
        <div className="flex items-center gap-6 mt-6 md:mt-0">
          <button 
            onClick={onAdminClick}
            className="opacity-20 hover:opacity-100 transition-opacity flex items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Portal Gestor
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
