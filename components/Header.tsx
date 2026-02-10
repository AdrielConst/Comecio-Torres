
import React, { useState } from 'react';
import { ViewState, User } from '../types';

interface HeaderProps {
  onSearch: (term: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  isAdmin?: boolean;
  user?: User;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, cartCount, onOpenCart, onNavigate, currentView, isAdmin = false, user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    onNavigate('store');
  };

  const navItemClass = (view: ViewState) => 
    `cursor-pointer transition-colors px-3 py-1.5 rounded-md whitespace-nowrap font-black uppercase text-[10px] tracking-widest ${
      currentView === view ? 'bg-white/20 text-yellow-300' : 'hover:text-blue-100'
    }`;

  const hasActiveSession = (user?.isLoggedIn) || isAdmin;

  return (
    <>
      <div className="bg-[#003366] text-white text-[10px] py-2.5 text-center font-black tracking-[0.2em] uppercase px-4 border-b border-white/10">
        📦 ENVIAMOS PARA TODO BRASIL • DROPSHIPPING SEGURO TORRES
      </div>
      <header className="bg-[#3483fa] shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
              onClick={() => onNavigate('store')}
            >
              <div className="bg-white p-1 rounded-xl transition-transform group-hover:rotate-3 shadow-lg">
                <span className="text-[#3483fa] font-black text-xl italic tracking-tighter">Comercial</span>
              </div>
              <span className="text-white font-black text-xl tracking-tighter uppercase italic">Torres</span>
            </div>

            <form 
              onSubmit={handleSearch}
              className="flex-grow flex items-center bg-white rounded-2xl shadow-inner overflow-hidden h-11 border-2 border-transparent focus-within:border-blue-200"
            >
              <input
                type="text"
                placeholder="Busque por produtos ou categorias..."
                className="w-full px-6 py-1 outline-none text-gray-700 text-sm font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="px-5 h-full border-l border-gray-100 text-gray-400 hover:text-[#3483fa] transition-colors bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <div className="hidden lg:flex items-center gap-4">
               {isAdmin && (
                 <button 
                  onClick={() => onNavigate('seller_dashboard')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-[#003366] px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-lg transition-all"
                 >
                   <span className="animate-pulse">⚙️</span> GESTÃO TORRES
                 </button>
               )}
               
               <div className="flex items-center gap-3">
                 {user?.isLoggedIn ? (
                   <div onClick={() => onNavigate('account')} className="flex items-center gap-2 cursor-pointer group">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-md border-2 border-white" style={{backgroundColor: user.avatarColor}}>
                       {user.name.substring(0, 1).toUpperCase()}
                     </div>
                     <span className="text-white font-black text-[10px] uppercase tracking-widest group-hover:underline">Olá, {user.name.split(' ')[0]}</span>
                   </div>
                 ) : (
                   <button 
                    onClick={() => onNavigate('account')} 
                    className="bg-[#003366] px-5 py-2.5 rounded-full text-white text-[10px] font-black tracking-widest shadow-xl hover:bg-blue-900 transition-all"
                   >
                    ACESSE SUA CONTA
                   </button>
                 )}

                 {hasActiveSession && (
                   <button 
                     onClick={onLogout} 
                     className="text-white/60 hover:text-white transition-colors bg-white/10 p-2 rounded-xl flex items-center gap-2 group"
                     title="Sair de todas as contas"
                   >
                     <span className="text-[9px] font-black uppercase hidden group-hover:block">Sair</span>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                   </button>
                 )}
               </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
              <span onClick={() => onNavigate('store')} className={navItemClass('store')}>Início</span>
              <span onClick={() => onNavigate('offers')} className={navItemClass('offers')}>Ofertas</span>
              <span onClick={() => onNavigate('tracking')} className={navItemClass('tracking')}>Rastreio</span>
              <span onClick={() => onNavigate('account')} className={navItemClass('account')}>Minha Conta</span>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <div 
                className="relative cursor-pointer hover:scale-110 transition-transform p-2 bg-white/10 rounded-xl flex-shrink-0"
                onClick={onOpenCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-300 text-[#003366] text-[9px] rounded-full w-5 h-5 flex items-center justify-center font-black shadow-lg">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
