
import React, { useState, useEffect } from 'react';

const OrderTracking: React.FC = () => {
  const [code, setCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Busca automática se houver um código recente de compra
    const lastCode = localStorage.getItem('torres_last_search');
    if (lastCode) {
      setCode(lastCode);
      handleTrack(null, lastCode);
      localStorage.removeItem('torres_last_search'); // Limpa após usar para não repetir
    }
  }, []);

  const handleTrack = (e: React.FormEvent | null, manualCode?: string) => {
    if (e) e.preventDefault();
    const targetCode = manualCode || code;
    if (!targetCode) return;

    setIsSearching(true);
    setResult(null);

    // Simulação de busca no banco de dados Torres
    setTimeout(() => {
      setResult({
        status: 'PEDIDO EM PROCESSAMENTO',
        lastLocation: 'Torres Logistics Center - São Paulo/SP',
        date: new Date().toLocaleDateString(),
        steps: [
          {title: 'PEDIDO REALIZADO NO WHATSAPP', done: true, time: 'Agora'},
          {title: 'AGUARDANDO CONFIRMAÇÃO DO PIX', done: true, time: 'Processando'},
          {title: 'SEPARAÇÃO NO ESTOQUE DROPSHIPPING', done: false, time: 'Pendente'},
          {title: 'EMISSÃO DA ETIQUETA DE ENVIO', done: false, time: 'Aguarde'},
          {title: 'PRODUTO EM TRÂNSITO PARA VOCÊ', done: false, time: 'Estimado 3-5 dias'}
        ]
      });
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 animate-slide-up">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-blue-50 overflow-hidden">
        <div className="bg-gradient-to-r from-[#003366] to-[#3483fa] p-10 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h2 className="text-4xl font-black tracking-tighter italic uppercase">Rastreio em Tempo Real</h2>
          <p className="opacity-70 text-xs mt-3 font-black tracking-widest uppercase">Tecnologia Torres de Logística Reversa</p>
        </div>
        
        <div className="p-10">
          <form onSubmit={(e) => handleTrack(e)} className="flex flex-col md:flex-row gap-4 mb-10">
            <input 
              required
              className="flex-grow border-4 border-gray-50 rounded-[1.5rem] px-8 py-5 outline-none focus:border-blue-100 transition-all text-sm font-black bg-gray-50/50 text-gray-700 uppercase"
              placeholder="INSIRA SEU CÓDIGO (EX: CT-XXXXXXX)"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
            />
            <button 
              disabled={isSearching}
              className="bg-[#3483fa] text-white font-black px-12 py-5 rounded-[1.5rem] shadow-xl shadow-blue-100 hover:bg-[#2968c8] disabled:opacity-50 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3"
            >
              {isSearching ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : 'LOCALIZAR'}
            </button>
          </form>

          {result && (
            <div className="space-y-10 animate-slide-up">
              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-blue-50/50 rounded-[2rem] border-2 border-dashed border-[#3483fa]/20 gap-6">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Status Atual do Pedido</p>
                  <p className="text-2xl font-black text-[#3483fa] italic leading-tight">{result.status}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Localização Atual</p>
                  <p className="font-black text-gray-700 text-sm uppercase">{result.lastLocation}</p>
                </div>
              </div>

              <div className="space-y-8 relative">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-100 rounded-full"></div>
                {result.steps.map((s: any, i: number) => (
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${
                      s.done ? 'bg-green-500 border-green-100 shadow-lg' : 'bg-white border-gray-200'
                    }`}>
                      {s.done && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div>
                      <p className={`text-sm font-black uppercase tracking-tight ${s.done ? 'text-gray-800' : 'text-gray-300'}`}>{s.title}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${s.done ? 'text-green-500' : 'text-gray-300'}`}>
                        {s.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-white border border-gray-100 rounded-2xl text-[9px] text-gray-400 font-black text-center uppercase tracking-widest leading-relaxed">
                🛡️ COMPRA PROTEGIDA: Caso seu pedido não seja entregue em até 30 dias úteis, o Comercial Torres garante o reembolso integral via WhatsApp.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
