
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import OrderTracking from './components/OrderTracking';
import ChatSupport from './components/ChatSupport';
import AdminLoginModal from './components/AdminLoginModal';
import UserLoginModal from './components/UserLoginModal';
import SellerDashboard from './components/SellerDashboard';
import AboutUs from './components/AboutUs';
import { Product, CartItem, ViewState, User } from './types';
import { MOCK_PRODUCTS } from './constants';

interface Order {
  id: string;
  date: string;
  total: number;
  trackingCode: string;
  status: string;
  items: string[];
  userName: string; // Vínculo com o usuário dono do pedido
}

const OWNER_PHONE = '5515997790220'; 

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('store');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'info'} | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  
  const [user, setUser] = useState<User>({
    name: '',
    city: '',
    avatarColor: '#3483fa',
    joinedDate: '',
    isLoggedIn: false
  });

  const allProducts = useMemo(() => {
    try {
      const combined = [...customProducts, ...MOCK_PRODUCTS];
      return combined.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (e) {
      return MOCK_PRODUCTS;
    }
  }, [searchTerm, customProducts]);

  // Filtra os pedidos do usuário logado para exibição
  const userOrders = useMemo(() => {
    if (!user.isLoggedIn) return [];
    return orders.filter(o => o.userName.toLowerCase() === user.name.toLowerCase());
  }, [orders, user]);

  // Carregamento inicial robusto
  useEffect(() => {
    const loadData = () => {
      try {
        const savedCart = localStorage.getItem('torres_cart');
        const savedOrders = localStorage.getItem('torres_orders');
        const savedUser = localStorage.getItem('torres_user');
        const savedCustom = localStorage.getItem('torres_custom_products');
        const savedAdmin = localStorage.getItem('torres_is_admin');
        
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedCustom) setCustomProducts(JSON.parse(savedCustom));
        if (savedAdmin === 'true') setIsAdmin(true);
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.isLoggedIn) setUser(parsed);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do storage:", error);
      }
    };
    loadData();
  }, []);

  // Persistência automática
  useEffect(() => {
    if (cart.length >= 0) localStorage.setItem('torres_cart', JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem('torres_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (orders.length >= 0) localStorage.setItem('torres_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('torres_custom_products', JSON.stringify(customProducts));
  }, [customProducts]);

  const handleNavigate = (newView: ViewState) => {
    if (newView === 'account' && !user.isLoggedIn) {
        setIsUserModalOpen(true);
        return;
    }
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser({ name: '', city: '', avatarColor: '#3483fa', joinedDate: '', isLoggedIn: false });
    setIsAdmin(false);
    localStorage.removeItem('torres_is_admin');
    localStorage.setItem('torres_user', JSON.stringify({ isLoggedIn: false }));
    setView('store');
    setToast({ msg: 'Sessão encerrada com sucesso.', type: 'info' });
  };

  const handleCheckoutSuccess = (customerData: any) => {
    const trackingCode = `CT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    // Importante: Vinculamos o pedido ao nome do usuário atual
    const newOrder: Order = {
      id: `#${Math.floor(Math.random() * 900000) + 100000}`,
      date: new Date().toLocaleDateString(),
      total: total,
      trackingCode: trackingCode,
      status: 'Aguardando Pagamento no WhatsApp',
      items: cart.map(i => i.title),
      userName: user.isLoggedIn ? user.name : customerData.nome
    };
    
    setOrders(prev => [newOrder, ...prev]);
    localStorage.setItem('torres_last_search', trackingCode);
    
    const itemsFormatted = cart.map(item => `• ${item.quantity}x ${item.title} (R$ ${item.price.toFixed(2)})`).join('\n');
    const message = `📦 *NOVO PEDIDO - COMERCIAL TORRES*\nID: ${trackingCode}\nTotal: R$ ${total.toFixed(2)}\n\nItens:\n${itemsFormatted}\n\nCliente: ${customerData.nome}\nCPF: ${customerData.cpf}\nWhatsApp: ${customerData.whatsapp}`;
    window.open(`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`, '_blank');

    setCart([]);
    setIsCheckoutOpen(false);
    setView('tracking');
    setToast({ msg: 'Pedido enviado! Verifique o WhatsApp.', type: 'success' });
  };

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast({ msg: 'Adicionado ao carrinho!', type: 'success' });
    setIsCartOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header 
        onSearch={setSearchTerm} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={handleNavigate} 
        currentView={view} 
        isAdmin={isAdmin} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full relative">
        {view === 'store' && (
          <div className="animate-slide-up">
            <section className="mb-10 rounded-[3rem] overflow-hidden shadow-2xl h-64 md:h-80 relative bg-gradient-to-br from-[#003366] via-[#3483fa] to-[#60a5fa] flex items-center px-12 text-white">
              <div className="z-10">
                <h2 className="text-4xl md:text-7xl font-black italic mb-4 tracking-tighter leading-tight">DROPSHIPPING <span className="text-yellow-300">TORRES</span></h2>
                <p className="text-lg md:text-2xl font-light mb-8 opacity-90 max-w-xl">Produtos reais, entrega garantida e suporte especializado.</p>
                <div className="flex gap-4">
                  <button onClick={() => setView('offers')} className="bg-white text-[#3483fa] font-black px-8 py-3 rounded-full hover:bg-gray-100 transition-all shadow-xl uppercase text-xs tracking-widest">OFERTAS DO DIA</button>
                  <button onClick={() => setView('tracking')} className="bg-transparent border-2 border-white/30 text-white font-black px-8 py-3 rounded-full hover:bg-white/10 transition-all uppercase text-xs tracking-widest">RASTREAR</button>
                </div>
              </div>
            </section>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 pb-20">
              {allProducts.map((p: Product) => (
                <ProductCard key={p.id} product={p} onClick={setSelectedProduct} onCompare={() => {}} isComparing={false} />
              ))}
            </div>
          </div>
        )}

        {view === 'tracking' && <OrderTracking />}

        {view === 'about_us' && <AboutUs />}
        
        {view === 'seller_dashboard' && isAdmin && (
          <SellerDashboard 
            onAddProduct={(p) => setCustomProducts(prev => [p, ...prev])} 
            onDeleteProduct={(id) => setCustomProducts(prev => prev.filter(p => p.id !== id))}
            customProducts={customProducts}
            onLogout={handleLogout}
            onClose={() => setView('store')} 
          />
        )}

        {view === 'account' && user.isLoggedIn && (
           <div className="max-w-4xl mx-auto py-10 animate-slide-up">
             <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-blue-50">
               <div className="bg-gradient-to-r from-[#003366] to-[#3483fa] p-12 text-white flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-4xl font-black border-4 border-white shadow-2xl" style={{backgroundColor: user.avatarColor}}>
                    {user.name.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">{user.name}</h2>
                    <p className="text-white/70 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Membro Torres desde {user.joinedDate}</p>
                    <div className="flex gap-3 mt-4 justify-center md:justify-start">
                      <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">⭐ Cliente Nível 1</span>
                      <span className="bg-green-400/20 text-green-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">🟢 Online</span>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="bg-white text-red-500 px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-red-50 transition-all">Sair da Conta</button>
               </div>
               
               <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter italic border-b-2 border-blue-50 pb-2">Meus Dados</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Localização</p>
                        <p className="font-bold text-gray-700">{user.city}</p>
                      </div>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter italic border-b-2 border-blue-50 pb-2">Meus Pedidos ({userOrders.length})</h3>
                    {userOrders.length > 0 ? (
                      <div className="space-y-3">
                        {userOrders.map(order => (
                          <div key={order.id} className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center border border-gray-100">
                            <div>
                              <p className="text-[10px] font-black text-[#3483fa] uppercase mb-1">{order.id}</p>
                              <p className="text-xs font-bold text-gray-700">{order.items[0]}...</p>
                            </div>
                            <span className="text-[10px] font-black text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full uppercase">Pendente</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nenhum pedido realizado</p>
                      </div>
                    )}
                 </div>
               </div>
             </div>
           </div>
        )}
      </main>

      <Footer onAdminClick={() => setIsAdminModalOpen(true)} onNavigate={handleNavigate} />
      <ChatSupport />
      
      {isAdminModalOpen && (
        <AdminLoginModal 
          onClose={() => setIsAdminModalOpen(false)} 
          onSuccess={() => {
            setIsAdmin(true);
            setIsAdminModalOpen(false);
            setView('seller_dashboard');
            setToast({ msg: 'Acesso Administrativo Liberado!', type: 'success' });
          }} 
        />
      )}

      {isUserModalOpen && (
        <UserLoginModal 
          onClose={() => setIsUserModalOpen(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setIsUserModalOpen(false);
            setView('account');
            setToast({ msg: `Olá, ${userData.name.split(' ')[0]}!`, type: 'success' });
          }}
        />
      )}

      {toast && (
        <div className="fixed bottom-24 right-6 bg-white border-l-8 border-[#3483fa] p-6 shadow-2xl rounded-2xl z-[1000] animate-slide-up flex items-center gap-4 min-w-[300px]">
           <p className="font-black text-gray-800 text-sm uppercase tracking-tight">{toast.msg}</p>
           <button onClick={() => setToast(null)} className="text-gray-300 hover:text-gray-500">×</button>
        </div>
      )}
      
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />}
      <CartSidebar items={cart} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onRemove={(id) => setCart(prev => prev.filter(i => i.id !== id))} onUpdateQty={(id, q) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: q} : i))} onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} />
      {isCheckoutOpen && <CheckoutModal total={cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} items={cart} onClose={() => setIsCheckoutOpen(false)} onSuccess={handleCheckoutSuccess} />}
    </div>
  );
};

export default App;
