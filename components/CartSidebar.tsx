
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ items, isOpen, onClose, onRemove, onUpdateQty, onCheckout }) => {
  const total = items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#f5f5f5] shadow-2xl flex flex-col animate-slide-in-right">
        <div className="bg-[#3483fa] p-6 flex justify-between items-center text-white">
          <h2 className="text-xl font-black italic uppercase tracking-tighter">MEU CARRINHO ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 space-y-4">
              <div className="text-8xl opacity-10">🛒</div>
              <p className="text-xl font-black uppercase tracking-widest">Vazio</p>
              <button onClick={onClose} className="text-[#3483fa] font-bold hover:underline">VER OFERTAS</button>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                    <p className="text-lg font-black text-[#3483fa] italic">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-gray-50 rounded-lg p-1">
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3483fa] font-black"
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3483fa] font-black"
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-300 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="bg-white p-8 border-t border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-end mb-8">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Subtotal</span>
              <div className="text-right">
                <span className="text-4xl font-black text-[#3483fa] italic tracking-tighter">R$ {total.toFixed(2)}</span>
                <p className="text-[10px] text-green-500 font-bold uppercase mt-1">Parcelamento em 12x liberado</p>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-[#3483fa] text-white font-black py-5 rounded-2xl hover:bg-[#2968c8] transition-all transform active:scale-95 shadow-xl shadow-blue-100 tracking-widest uppercase text-sm"
            >
              FINALIZAR COMPRA
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default CartSidebar;
