
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { generateProductPitch } from '../services/geminiService';

interface SellerDashboardProps {
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  customProducts: Product[];
  onLogout: () => void;
  onClose: () => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ onAddProduct, onDeleteProduct, customProducts, onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'manage'>('new');
  const [loadingAi, setLoadingAi] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: CATEGORIES[0].name,
    imageUrl: '',
    description: ''
  });

  const handleAiDescription = async () => {
    if (!formData.title) return alert("Digite o título primeiro para a IA trabalhar!");
    setLoadingAi(true);
    const aiDesc = await generateProductPitch(formData.title);
    setFormData(prev => ({ ...prev, description: aiDesc }));
    setLoadingAi(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
        alert("Por favor, insira o link de uma imagem para o produto.");
        return;
    }
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      installments: 12,
      imageUrl: formData.imageUrl,
      shipping: 'free',
      rating: 5.0,
      reviewsCount: 0,
      category: formData.category,
      description: formData.description,
      seller: 'Comercial Torres Oficial',
      isCustom: true
    };
    onAddProduct(newProduct);
    setFormData({ title: '', price: '', originalPrice: '', category: CATEGORIES[0].name, imageUrl: '', description: '' });
    setActiveTab('manage');
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl p-6 md:p-12 max-w-6xl mx-auto mt-6 md:mt-10 animate-slide-up border border-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-gray-100 pb-8">
        <div className="flex-grow">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tighter italic">PAINEL DO <span className="text-[#3483fa]">GESTOR</span></h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Gerenciamento de Inventário Torres v2.0</p>
        </div>
        
        <div className="flex bg-gray-50 p-1.5 rounded-2xl">
          <button 
            onClick={() => setActiveTab('new')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'new' ? 'bg-[#3483fa] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Novo Produto
          </button>
          <button 
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-[#3483fa] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Meus Produtos ({customProducts.length})
          </button>
        </div>

        <div className="flex gap-2">
            <button 
              onClick={onLogout} 
              className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-5 py-3 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-red-100"
            >
              Sair do Admin
            </button>
            <button onClick={onClose} className="bg-gray-50 text-gray-400 hover:text-[#3483fa] p-3 rounded-full transition-all flex items-center gap-2 group">
                <span className="text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Ver Loja</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
      </div>

      {activeTab === 'new' ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
              <div className="bg-gray-50 rounded-[2.5rem] p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden group">
                  {formData.imageUrl ? (
                      <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="max-w-full max-h-[300px] object-contain rounded-2xl shadow-2xl transition-transform group-hover:scale-105"
                          onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x600/f3f4f6/3483fa?text=Link+de+Imagem+Inv%C3%A1lido')}
                      />
                  ) : (
                      <div className="text-center space-y-4">
                          <div className="text-6xl grayscale opacity-20">🖼️</div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Preview da Imagem</p>
                      </div>
                  )}
              </div>

              <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">Link da Imagem (URL)</label>
                  <div className="relative">
                      <input 
                          required
                          className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#3483fa] outline-none transition-all text-sm bg-gray-50/50 font-bold"
                          placeholder="https://exemplo.com/foto-do-produto.jpg"
                          value={formData.imageUrl}
                          onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">🔗</div>
                  </div>
              </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 tracking-widest">Nome do Produto</label>
                  <input 
                      required
                      className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#3483fa] outline-none transition-all text-lg font-black bg-gray-50/50"
                      placeholder="Ex: Smartwatch Torres Pro Series"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                  />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 tracking-widest">Preço de Venda (R$)</label>
                  <input 
                      required
                      type="number"
                      step="0.01"
                      className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#3483fa] outline-none transition-all text-lg font-black text-[#3483fa] bg-gray-50/50"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                  </div>
                  <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 tracking-widest">Preço Anterior (Oferta)</label>
                  <input 
                      type="number"
                      step="0.01"
                      className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#3483fa] outline-none transition-all text-lg font-black text-gray-400 bg-gray-50/50"
                      placeholder="Opcional"
                      value={formData.originalPrice}
                      onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                  />
                  </div>
                  <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 tracking-widest">Categoria</label>
                  <select 
                      className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#3483fa] outline-none transition-all font-bold bg-gray-50/50 h-[64px]"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                      {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
                  </select>
                  </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Descrição do Produto</label>
                <button 
                  type="button"
                  onClick={handleAiDescription}
                  disabled={loadingAi}
                  className={`bg-[#3483fa] text-white px-5 py-2.5 rounded-full font-black hover:bg-[#2968c8] disabled:opacity-50 transition-all flex items-center gap-3 shadow-lg shadow-blue-100 ${loadingAi ? 'animate-pulse' : ''}`}
                >
                  {loadingAi ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <span className="text-lg">🤖</span>
                  )}
                  <span className="text-[10px] tracking-widest uppercase">{loadingAi ? 'TORRES IA ESCREVENDO...' : 'USAR TORRES IA'}</span>
                </button>
              </div>
              <textarea 
                required
                className="w-full border-2 border-gray-100 rounded-[2rem] px-6 py-6 focus:border-[#3483fa] outline-none transition-all resize-none text-sm font-medium bg-gray-50/50 h-[180px]"
                placeholder="Dica: Clique no botão da IA acima para gerar uma descrição vendedora automaticamente!"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#3483fa] text-white font-black py-6 rounded-2xl hover:bg-[#2968c8] shadow-2xl shadow-blue-100 transition-all transform active:scale-95 uppercase text-sm tracking-[0.2em]"
            >
              LANÇAR PRODUTO NA TORRES
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {customProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customProducts.map(product => (
                <div key={product.id} className="bg-gray-50 p-6 rounded-[2rem] flex gap-4 items-center group relative border border-transparent hover:border-blue-100 transition-all">
                  <img src={product.imageUrl} className="w-20 h-20 object-cover rounded-2xl shadow-md" />
                  <div className="flex-grow">
                    <p className="text-[10px] font-black text-[#3483fa] uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-black text-gray-800 line-clamp-1 text-sm">{product.title}</h3>
                    <div className="flex items-center gap-2">
                        <p className="font-black text-lg text-gray-900 italic">R$ {product.price.toFixed(2)}</p>
                        {product.originalPrice && (
                            <span className="text-[8px] text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteProduct(product.id)}
                    className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Excluir Produto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4 grayscale opacity-20">📦</div>
              <p className="text-gray-400 font-black uppercase tracking-widest">Nenhum produto cadastrado ainda</p>
              <button onClick={() => setActiveTab('new')} className="mt-6 text-[#3483fa] font-black text-xs uppercase hover:underline">Cadastrar primeiro item</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
