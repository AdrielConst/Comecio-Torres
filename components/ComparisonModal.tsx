
import React from 'react';
import { Product } from '../types';

interface ComparisonModalProps {
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onClearAll: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ products, onClose, onRemove, onAddToCart, onClearAll }) => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
        <div className="bg-[#3483fa] p-5 md:p-8 flex justify-between items-center text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
            <h2 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">Comparativo Torres</h2>
            <button 
              onClick={onClearAll} 
              className="text-[9px] md:text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors font-bold uppercase tracking-widest"
            >
              Limpar tudo
            </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto p-4 md:p-10 scrollbar-hide">
          <table className="w-full text-left border-separate border-spacing-x-2 md:border-spacing-x-4">
            <thead>
              <tr className="border-b">
                <th className="p-2 md:p-4 text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest min-w-[100px] md:min-w-[150px]">Atributo</th>
                {products.map((p: Product) => (
                  <th key={p.id} className="p-2 md:p-4 text-center min-w-[160px] md:min-w-[220px]">
                    <div className="relative group mb-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gray-50 rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
                        <img src={p.imageUrl} className="max-w-full max-h-full object-contain p-2" />
                      </div>
                      <button 
                        onClick={() => onRemove(p.id)} 
                        className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-lg border border-red-50 hover:bg-red-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[10px] md:text-sm font-bold text-gray-800 line-clamp-2 leading-tight h-8 md:h-10">{p.title}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm">
              <tr>
                <td className="p-4 md:p-6 font-black text-gray-500 uppercase text-[9px] md:text-xs">Preço Torres</td>
                {products.map((p: Product) => (
                  <td key={p.id} className="p-4 md:p-6 text-center text-lg md:text-2xl font-black text-[#3483fa] italic">R$ {p.price.toFixed(2)}</td>
                ))}
              </tr>
              <tr className="bg-gray-50/50 rounded-xl">
                <td className="p-4 md:p-6 font-black text-gray-500 uppercase text-[9px] md:text-xs">Avaliação</td>
                {products.map((p: Product) => (
                  <td key={p.id} className="p-4 md:p-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-black text-base md:text-lg text-gray-800">{p.rating} ⭐</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td></td>
                {products.map((p: Product) => (
                  <td key={p.id} className="p-4 md:p-6 text-center">
                    <button 
                      onClick={() => onAddToCart(p)} 
                      className="bg-[#3483fa] text-white text-[10px] font-black px-4 md:px-6 py-3 rounded-xl hover:bg-[#2968c8] w-full shadow-lg shadow-blue-100 transition-all transform active:scale-95 uppercase tracking-widest"
                    >
                      Selecionar
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
