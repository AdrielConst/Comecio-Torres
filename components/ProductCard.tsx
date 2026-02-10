
import React from 'react';
import { Product } from '../types';

export interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onCompare: (product: Product) => void;
  isComparing: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onCompare, isComparing }) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group border border-transparent hover:border-blue-100"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {product.shipping === 'full' && (
          <div className="absolute bottom-2 left-2 bg-[#3483fa] text-white text-[10px] font-bold px-2 py-0.5 rounded italic shadow-sm">
            FULL
          </div>
        )}
        
        <button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onCompare(product);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all duration-300 transform ${
            isComparing 
              ? 'bg-[#3483fa] text-white scale-110' 
              : 'bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-[#3483fa] hover:scale-110'
          }`}
          title={isComparing ? "Remover da comparação" : "Comparar produto"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isComparing ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
        <h3 className="text-sm text-gray-700 line-clamp-2 h-10 mb-2 leading-tight group-hover:text-[#3483fa] transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-900 font-bold">R$ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-green-500 font-bold">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
            )}
          </div>
          <p className="text-xs text-[#3483fa] font-medium mt-1">
            em {product.installments}x <span className="font-bold">R$ {(product.price / product.installments).toFixed(2)}</span> sem juros
          </p>
          
          {product.shipping === 'free' && (
            <span className="text-[10px] text-green-600 font-extrabold uppercase mt-2 block">Frete grátis</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
