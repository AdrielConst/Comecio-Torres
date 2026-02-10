
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { generateProductPitch, answerProductQuestion } from '../services/geminiService';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [stockLevel, setStockLevel] = useState(85);

  useEffect(() => {
    // Simular nível de estoque baixo para gatilho de escassez
    setStockLevel(Math.floor(Math.random() * 15) + 5);

    const fetchDescription = async () => {
      setIsLoadingAi(true);
      const pitch = await generateProductPitch(product.title);
      setAiDescription(pitch);
      setIsLoadingAi(false);
    };
    fetchDescription();
  }, [product]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    
    setIsAsking(true);
    const answer = await answerProductQuestion(product.title, userQuestion);
    setAiAnswer(answer);
    setIsAsking(false);
    setUserQuestion('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-hidden">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[95vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50 bg-white/80 p-1 rounded-full shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:w-3/5 p-6 md:p-10 bg-white border-r border-gray-100 overflow-y-auto">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center mb-8 relative">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="max-w-full max-h-full object-contain p-4 transition-transform hover:scale-105 duration-500"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg animate-pulse">
              🔥 EM ALTA: {Math.floor(Math.random() * 40) + 10} pessoas vendo agora
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="md:hidden">
               <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Novo | {product.reviewsCount} vendidos</span>
               <h1 className="text-2xl font-black text-gray-800 mt-2 mb-4 leading-tight">{product.title}</h1>
               
               <div className="mb-4">
                 <div className="flex justify-between text-[10px] font-bold text-red-500 mb-1">
                   <span>RESTAM APENAS {stockLevel} UNIDADES</span>
                   <span>{stockLevel}%</span>
                 </div>
                 <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-red-500 h-full" style={{ width: `${stockLevel}%` }}></div>
                 </div>
               </div>

               <div className="flex items-end gap-2">
                 <span className="text-3xl font-black text-gray-900">R$ {product.price.toFixed(2)}</span>
                 {product.originalPrice && <span className="text-sm text-gray-400 line-through mb-1">R$ {product.originalPrice.toFixed(2)}</span>}
               </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-gray-800 mb-4 border-b-2 border-blue-50 pb-2 inline-block">Descrição Técnica</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{product.description}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white border-l-4 border-[#3483fa] p-5 rounded-r-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#3483fa] p-1.5 rounded-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-black text-[#3483fa] text-xs uppercase tracking-widest">Resumo Inteligente Torres</h4>
              </div>
              {isLoadingAi ? (
                <div className="flex items-center gap-3 text-gray-400 py-2">
                   <div className="animate-spin h-3 w-3 border-2 border-[#3483fa] border-t-transparent rounded-full"></div>
                   <span className="text-xs font-bold uppercase">Analisando...</span>
                </div>
              ) : (
                <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">{aiDescription}</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
               <div className="flex flex-col items-center text-center gap-2">
                  <div className="text-2xl">🚚</div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">Entrega Garantida</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2">
                  <div className="text-2xl">🔒</div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">Pagamento Seguro</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2">
                  <div className="text-2xl">🔄</div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">30 dias devolução</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2">
                  <div className="text-2xl">🏆</div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">Qualidade Torres</span>
               </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-gray-800 mb-4">Perguntas ao Torres Assistant</h3>
              <form onSubmit={handleAsk} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Dúvidas sobre o produto?"
                  className="flex-grow border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3483fa] transition-all bg-gray-50"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={isAsking}
                  className="bg-[#3483fa] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#2968c8] disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
                >
                  {isAsking ? '...' : 'Enviar'}
                </button>
              </form>
              
              {aiAnswer && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 animate-slide-up">
                  <div className="flex items-center gap-2 mb-2 text-[#3483fa]">
                    <span className="text-xs font-black uppercase tracking-widest">Resposta Torres IA</span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">{aiAnswer}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:w-2/5 p-8 flex-col justify-center bg-gray-50/30">
          <div className="bg-white border-2 border-blue-50 rounded-3xl p-8 shadow-sm">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Novo | {product.reviewsCount} vendidos</span>
            <h1 className="text-3xl font-black text-gray-800 mt-3 mb-4 leading-tight">{product.title}</h1>
            
            <div className="mb-6">
               <div className="flex justify-between text-[10px] font-black text-red-500 mb-1 tracking-widest">
                 <span>OFERTA LIMITADA: RESTAM {stockLevel} PEÇAS</span>
               </div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-red-500 h-full transition-all duration-1000" style={{ width: `${stockLevel}%` }}></div>
               </div>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-black text-gray-900">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && <span className="text-lg text-gray-400 line-through mb-1">R$ {product.originalPrice.toFixed(2)}</span>}
              </div>
              <p className="text-gray-600">
                em <span className="text-green-600 font-black italic">{product.installments}x R$ {(product.price / product.installments).toFixed(2)} sem juros</span>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                className="w-full bg-[#3483fa] text-white font-black py-5 rounded-2xl hover:bg-[#2968c8] transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-100 uppercase tracking-widest text-sm"
                onClick={() => onAddToCart(product)}
              >
                Comprar agora
              </button>
              <button 
                className="w-full bg-blue-50 text-[#3483fa] font-black py-4 rounded-2xl hover:bg-blue-100 transition-all uppercase tracking-widest text-xs"
                onClick={() => onAddToCart(product)}
              >
                Adicionar ao carrinho
              </button>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs text-green-600 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Garantia Comercial Torres</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Compra segura na Torres</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-around grayscale opacity-40">
               <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6" alt="Visa" />
               <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6" alt="Master" />
               <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-6" alt="Pix" />
            </div>
          </div>
        </div>
        
        {/* Mobile Sticky Actions */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex flex-col gap-2 z-50">
           <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden mb-1">
             <div className="bg-red-500 h-full" style={{ width: `${stockLevel}%` }}></div>
           </div>
           <p className="text-[9px] text-center font-black text-red-500 uppercase mb-1">Últimas {stockLevel} unidades disponíveis</p>
           <div className="flex gap-2">
             <button 
               onClick={() => onAddToCart(product)}
               className="flex-grow bg-[#3483fa] text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest"
             >
               Comprar
             </button>
             <button 
               onClick={() => onAddToCart(product)}
               className="w-16 bg-blue-50 text-[#3483fa] flex items-center justify-center rounded-xl"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
