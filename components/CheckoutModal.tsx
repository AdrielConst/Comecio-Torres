
import React, { useState } from 'react';

interface CheckoutModalProps {
  total: number;
  items: { title: string, quantity: number }[];
  onClose: () => void;
  onSuccess: (data: any) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ total, items, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    whatsapp: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: ''
  });

  const handleNext = () => {
    if (step === 1) {
      if (!formData.nome || !formData.cpf || !formData.whatsapp) {
        alert("Preencha seus dados de identificação para continuar.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.cep || !formData.rua || !formData.numero) {
        alert("O endereço de entrega é fundamental para o envio.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleFinish = () => {
    setIsFinishing(true);
    // Simula um processamento rápido antes de abrir o WhatsApp
    setTimeout(() => {
      onSuccess(formData);
      setIsFinishing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[95vh]">
        
        {isFinishing ? (
          <div className="p-20 text-center space-y-6">
            <div className="animate-spin text-6xl mx-auto w-16 h-16 border-4 border-[#3483fa] border-t-transparent rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-800 italic uppercase">Gerando Pedido...</h2>
            <p className="text-gray-400 font-medium italic">Você será levado ao WhatsApp para concluir o pagamento.</p>
          </div>
        ) : (
          <>
            <div className="bg-[#3483fa] p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-white text-[#3483fa] w-10 h-10 rounded-xl flex items-center justify-center font-black italic shadow-lg">T</div>
                  <h2 className="text-xl font-black italic uppercase tracking-tighter">FINALIZAR PEDIDO</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-between items-center px-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                      step >= s ? 'bg-white text-[#3483fa] border-white shadow-xl' : 'bg-[#3483fa] text-white/50 border-white/30'
                    }`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${step > s ? 'bg-white' : 'bg-white/20'}`}></div>}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1 text-[9px] font-black uppercase tracking-widest text-white/60">
                <span>Identificação</span>
                <span>Entrega</span>
                <span>Confirmação</span>
              </div>
            </div>

            <div className="p-10 overflow-y-auto">
              {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                  <h3 className="text-xl font-black text-gray-800 uppercase italic tracking-tighter">1. Dados Pessoais</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Nome Completo</label>
                      <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="EX: JOÃO SILVA" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">CPF (Para nota/envio)</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="000.000.000-00" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Seu WhatsApp</label>
                        <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="(00) 00000-0000" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleNext} className="w-full bg-[#3483fa] text-white font-black py-5 rounded-2xl shadow-xl uppercase text-xs tracking-widest hover:bg-[#2968c8]">CONTINUAR PARA ENTREGA</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-slide-up">
                  <h3 className="text-xl font-black text-gray-800 uppercase italic tracking-tighter">2. Endereço de Envio</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">CEP</label>
                      <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="00000-000" value={formData.cep} onChange={e => setFormData({...formData, cep: e.target.value})} />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Bairro</label>
                      <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="CENTRO" value={formData.bairro} onChange={e => setFormData({...formData, bairro: e.target.value})} />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Rua / Avenida</label>
                      <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="RUA DAS FLORES" value={formData.rua} onChange={e => setFormData({...formData, rua: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Número</label>
                      <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="123" value={formData.numero} onChange={e => setFormData({...formData, numero: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Cidade / UF</label>
                      <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" placeholder="SÃO PAULO - SP" value={formData.cidade} onChange={e => setFormData({...formData, cidade: e.target.value})} />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-400 font-black py-5 rounded-2xl uppercase text-[10px]">VOLTAR</button>
                    <button onClick={handleNext} className="w-2/3 bg-[#3483fa] text-white font-black py-5 rounded-2xl shadow-xl uppercase text-xs tracking-widest">REVISAR PEDIDO</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-slide-up">
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-800 uppercase italic tracking-tighter">RESUMO DO PEDIDO</h3>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Confira tudo antes de finalizar no WhatsApp</p>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-6 space-y-4 border border-gray-100">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase">Itens no Carrinho</span>
                      <span className="text-sm font-black text-gray-800">{items.length} produto(s)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase">Total a Pagar</span>
                      <span className="text-2xl font-black text-[#3483fa] italic">R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase block">Entrega para:</span>
                      <p className="text-[11px] font-bold text-gray-600 leading-tight">
                        {formData.rua}, {formData.numero} - {formData.bairro}<br/>
                        {formData.cidade} - CEP: {formData.cep}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-5 rounded-2xl border-2 border-dashed border-green-200 flex items-center gap-4">
                    <div className="text-2xl">📱</div>
                    <p className="text-[10px] font-black text-green-700 uppercase leading-tight">Ao clicar abaixo, seus dados serão enviados para nosso WhatsApp para gerarmos seu código PIX.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button onClick={handleFinish} className="w-full bg-green-500 text-white font-black py-6 rounded-[1.5rem] shadow-xl hover:bg-green-600 uppercase text-xs tracking-widest transition-all transform active:scale-95 flex items-center justify-center gap-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207L6.233 18.29l3.226-1.058c.955.572 1.82.854 2.572.854 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zM15.42 14.12c-.2.355-1.02.73-1.4.755-.38.025-.73-.083-2.315-.71-1.585-.626-2.59-2.228-2.67-2.333-.08-.104-.653-.87-.653-1.66 0-.792.417-1.18.563-1.347.147-.167.313-.208.417-.208h.313c.104 0 .23-.02.354.27.125.293.438 1.063.48 1.146.04.083.062.188.01.292-.053.104-.083.167-.167.27-.083.104-.177.23-.25.313-.083.083-.177.177-.073.354.104.177.464.76.995 1.234.683.61 1.26.8 1.438.896.177.104.282.083.386-.03.104-.125.448-.521.563-.698.125-.177.25-.146.417-.083.167.062 1.063.5 1.25.594.188.083.313.125.354.208.04.083.04.479-.16 1.01z"/></svg>
                      FINALIZAR NO WHATSAPP
                    </button>
                    <button onClick={() => setStep(2)} className="w-full py-3 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-gray-600 transition-colors">Ajustar Endereço</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
