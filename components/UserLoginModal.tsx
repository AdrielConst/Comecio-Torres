
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface UserLoginModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const AVATAR_COLORS = ['#3483fa', '#003366', '#f39c12', '#2ecc71', '#9b59b6', '#e74c3c', '#ff5252'];

const UserLoginModal: React.FC<UserLoginModalProps> = ({ onClose, onSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    password: ''
  });

  useEffect(() => {
    setError('');
    setFormData(prev => ({ ...prev, password: '' })); // Limpa senha ao trocar abas
  }, [isRegistering]);

  const getRegisteredUsers = (): User[] => {
    const saved = localStorage.getItem('torres_registered_users');
    return saved ? JSON.parse(saved) : [];
  };

  const saveUser = (user: User) => {
    const users = getRegisteredUsers();
    users.push(user);
    localStorage.setItem('torres_registered_users', JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getRegisteredUsers();

    if (isRegistering) {
      if (!formData.name || !formData.city || !formData.password) {
        setError('Preencha todos os campos para cadastrar.');
        return;
      }

      if (formData.password.length < 4) {
        setError('A senha deve ter pelo menos 4 caracteres.');
        return;
      }

      const userExists = users.some(u => u.name.toLowerCase() === formData.name.toLowerCase());
      if (userExists) {
        setError('Este nome já está em uso. Tente outro ou faça login.');
        return;
      }

      const newUser: User = {
        name: formData.name,
        city: formData.city,
        password: formData.password,
        avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
        joinedDate: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
        isLoggedIn: true
      };

      saveUser(newUser);
      onSuccess(newUser);
    } else {
      const foundUser = users.find(u => u.name.toLowerCase() === formData.name.toLowerCase());
      
      if (foundUser) {
        if (foundUser.password === formData.password) {
          onSuccess({ ...foundUser, isLoggedIn: true });
        } else {
          setError('Senha incorreta. Tente novamente.');
        }
      } else {
        setError('Usuário não encontrado. Que tal criar uma conta?');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up border border-blue-50">
        <div className="bg-gradient-to-br from-[#3483fa] to-blue-700 p-8 text-white text-center relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/30">
                <span className="text-3xl">{isRegistering ? '📝' : '🔐'}</span>
            </div>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">
              {isRegistering ? 'Criar Conta Torres' : 'Entrar na Torres'}
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mt-1">Sua segurança é nossa prioridade</p>
        </div>

        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setIsRegistering(false)}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${!isRegistering ? 'text-[#3483fa] border-b-4 border-[#3483fa]' : 'text-gray-400'}`}
          >
            Entrar
          </button>
          <button 
            onClick={() => setIsRegistering(true)}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${isRegistering ? 'text-[#3483fa] border-b-4 border-[#3483fa]' : 'text-gray-400'}`}
          >
            Criar Conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-[10px] font-black text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-2 tracking-widest">Usuário ou Nome</label>
                <input 
                    required
                    autoFocus
                    placeholder="Ex: Maria Oliveira"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold text-gray-700 transition-all text-sm"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            {isRegistering && (
              <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-2 tracking-widest">Sua Cidade</label>
                  <input 
                      required
                      placeholder="Ex: São Paulo - SP"
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold text-gray-700 transition-all text-sm"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                  />
              </div>
            )}

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-2 tracking-widest">Sua Senha</label>
                <input 
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold text-gray-700 transition-all text-sm"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#3483fa] text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 hover:bg-[#2968c8] transition-all transform active:scale-95 uppercase text-xs tracking-widest"
          >
            {isRegistering ? 'Finalizar Cadastro' : 'Entrar Agora'}
          </button>
          
          <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest">
            {isRegistering 
              ? 'Ao cadastrar, você concorda com os termos Torres.' 
              : 'Esqueceu sua senha? Entre em contato com o suporte.'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLoginModal;
