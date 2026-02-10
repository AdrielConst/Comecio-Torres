
import React, { useState } from 'react';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'torresadmin') {
      onSuccess();
    } else {
      setError('Acesso negado. Verifique o código Torres.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-blue-100">
        <div className="bg-[#3483fa] p-6 md:p-8 text-white text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-lg md:text-xl font-black italic tracking-tighter uppercase">Painel Gestor Torres</h2>
          <p className="text-[10px] opacity-70 mt-1 font-bold tracking-widest uppercase">Segurança Torres Ativada</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Código Gestor</label>
            <input 
              autoFocus
              type="password"
              placeholder="Digite sua senha Torres..."
              className={`w-full p-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all text-sm md:text-base ${error ? 'border-red-100' : 'border-transparent focus:border-blue-100'}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
            />
            {error && <p className="text-red-500 text-[10px] font-black mt-3 text-center uppercase tracking-widest animate-pulse">{error}</p>}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button 
              type="submit"
              className="w-full bg-[#3483fa] text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-[#2968c8] transition-all transform active:scale-95 uppercase text-xs tracking-widest"
            >
              Autenticar Torres
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full bg-gray-50 text-gray-400 font-bold py-3 rounded-2xl hover:text-gray-600 transition-colors text-[10px] uppercase tracking-widest"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
