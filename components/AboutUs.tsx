
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 animate-slide-up space-y-12 px-4">
      <section className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-blue-50">
        <div className="bg-gradient-to-r from-[#003366] to-[#3483fa] p-16 text-white text-center">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Quem Somos</h2>
          <p className="text-white/80 font-bold uppercase text-[10px] tracking-[0.3em]">A Revolução do Dropshipping Brasileiro</p>
        </div>
        
        <div className="p-12 md:p-20 space-y-10">
          <div className="prose prose-blue max-w-none text-gray-600 leading-loose text-lg font-medium">
            <p>
              A <span className="text-[#3483fa] font-black italic">Comercial Torres</span> nasceu de um sonho: transformar a experiência de compra online no Brasil através do modelo de dropshipping, unindo a agilidade da tecnologia à confiança tradicional do comércio brasileiro.
            </p>
            <p>
              Diferente de plataformas comuns, nós selecionamos criteriosamente cada fornecedor e produto que entra em nosso catálogo. Nossa curadoria é focada em inovação, durabilidade e, acima de tudo, na satisfação real de quem recebe o pacote em casa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-100 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-black text-gray-800 uppercase text-xs tracking-widest mb-3">Missão</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Entregar produtos inovadores com velocidade e segurança, eliminando as barreiras entre o desejo e a posse.</p>
            </div>
            <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-100 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-black text-gray-800 uppercase text-xs tracking-widest mb-3">Visão</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Ser a plataforma de dropshipping mais respeitada do Brasil, sendo sinônimo de transparência e excelência operacional.</p>
            </div>
            <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-100 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">💎</div>
              <h4 className="font-black text-gray-800 uppercase text-xs tracking-widest mb-3">Valores</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Compromisso com o cliente, ética inegociável, inovação constante e paixão pelo que fazemos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#3483fa] rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-10">
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-4">Por que escolher a Torres?</h3>
          <ul className="space-y-4 text-sm font-bold opacity-90">
            <li className="flex items-center gap-3">✅ Suporte humanizado 24/7 via WhatsApp</li>
            <li className="flex items-center gap-3">✅ Produtos com garantia de procedência</li>
            <li className="flex items-center gap-3">✅ Rastreio em tempo real com tecnologia própria</li>
            <li className="flex items-center gap-3">✅ Parcelamento facilitado para todos os brasileiros</li>
          </ul>
        </div>
        <div className="w-48 h-48 bg-white/20 rounded-[3rem] flex items-center justify-center text-8xl shadow-2xl border-4 border-white/30 animate-bounce-slow">
          🛡️
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
