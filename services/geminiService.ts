
import { GoogleGenAI } from "@google/genai";

export const generateProductPitch = async (productTitle: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva um pitch de vendas curto e convincente em português para o produto: ${productTitle}. Foco em benefícios e qualidade. Mencione que é vendido pela Comercial Torres.`,
    });
    return response.text || "Qualidade garantida e entrega rápida.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Um excelente produto para o seu dia a dia, com o selo de confiança Comercial Torres.";
  }
};

export const answerProductQuestion = async (productTitle: string, question: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um assistente de vendas da Comercial Torres. Responda em português sobre o produto ${productTitle} para a pergunta do cliente: ${question}. Seja educado e direto.`,
    });
    return response.text || "Estamos verificando os detalhes técnicos para você.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nosso time de suporte especializado entrará em contato em breve para tirar todas as suas dúvidas.";
  }
};
