
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { CATEGORIES } from '../constants';

const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'Olá! Sou o assistente da Comercial Torres. Como posso ajudar com suas compras hoje?'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  // Inicializa o chat apenas quando necessário
  const getChatSession = () => {
    if (chatRef.current) return chatRef.current;
    
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) return null;

      const ai = new GoogleGenAI({ apiKey });
      const session = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Você é o atendente oficial da Comercial Torres. 
          Categorias: ${CATEGORIES.map(c => c.name).join(', ')}. 
          Benefícios: Frete Grátis acima de R$199, Dropshipping Seguro, Parcelamento 12x sem juros.
          Estilo: Amigável, profissional, "olá amigo", "com certeza". 
          Sempre incentive a compra e mencione a segurança da loja.`,
          temperature: 0.7,
        },
      });
      chatRef.current = session;
      return session;
    } catch (e) {
      console.error("Erro ao criar sessão de chat:", e);
      return null;
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsTyping(true);

    try {
      const chat = getChatSession();
      if (!chat) throw new Error("API Key não configurada");

      const response = await chat.sendMessage({ message: userMsg });
      const reply = response.text || "Puxa, tivemos um pequeno problema técnico, mas na Torres sempre resolvemos! Como posso ajudar?";
      setMessages(prev => [...prev, {role: 'bot', text: reply}]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, {
        role: 'bot', 
        text: 'Desculpe, nosso assistente está um pouco sobrecarregado agora. Pode tentar novamente em alguns segundos ou nos chamar no WhatsApp!'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-10 right-4 md:right-10 z-[600]">
      {isOpen ? (
        <div className="bg-white w-[320px] h-[480px] rounded-3xl shadow-2xl border border-blue-50 flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-[#3483fa] p-4 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#3483fa] font-black shadow-inner">T</div>
              <div>
                <p className="text-xs font-black uppercase tracking-tight">Torres Assistant</p>
                <p className="text-[9px] opacity-80 font-bold uppercase">Online ✓</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#f8fafc] scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[11px] font-semibold leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-[#3483fa] text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-blue-50'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-[#3483fa] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#3483fa] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#3483fa] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Digite sua dúvida..." 
              className="flex-grow bg-gray-50 border-2 border-transparent rounded-xl px-4 py-3 text-xs outline-none focus:border-blue-200 transition-all font-medium"
            />
            <button type="submit" disabled={isTyping} className="bg-[#3483fa] text-white p-3 rounded-xl shadow-lg disabled:opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9-7-9-7v14z" /></svg>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#3483fa] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-bounce-slow border-4 border-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

export default ChatSupport;
