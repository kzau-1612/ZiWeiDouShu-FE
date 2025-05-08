// Translator.tsx
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface TranslatorProps {
  dataToTranslate: any;
  onTranslationComplete: (translatedData: any) => void;
  onError: (errorMessage: string) => void;
}

const Translator: React.FC<TranslatorProps> = ({
  dataToTranslate,
  onTranslationComplete,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  useEffect(() => {
    if (dataToTranslate) {
      translateData(dataToTranslate);
    }
  }, [dataToTranslate]);

  const translateData = async (data: any) => {
    setIsLoading(true);
    try {
      const prompt = `Dịch dữ liệu lá số tử vi sau sang tiếng Việt với cấu trúc json giữ nguyên như cũ: ${JSON.stringify(
        data
      )}`;
      const result = await model.generateContent(prompt);
      const responseText = result.response?.text();

      if (responseText) {
        // Directly pass the text response as the translated data
        onTranslationComplete({ translatedText: responseText });
      } else {
        onError("Không nhận được phản hồi dịch thuật.");
      }
    } catch (error: any) {
      console.error("Lỗi dịch thuật:", error);
      onError(`Lỗi dịch thuật: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return <div>{isLoading && <p>Đang dịch dữ liệu...</p>}</div>;
};

export default Translator;
