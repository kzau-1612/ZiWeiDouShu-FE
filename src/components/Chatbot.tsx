import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  user: string;
  bot: string;
}

const ChatBot = ({ generatedResult }: { generatedResult: string | null }) => {
  console.log(generatedResult);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const getGeminiResponse = async (prompt: string) => {
    try {
      setIsLoading(true);
      const result = await model.generateContent(prompt);
      const responseText = result.response?.text();

      if (responseText) {
        setChatHistory([{ user: "Thông tin lá số", bot: responseText }]);
      } else {
        setChatHistory([{ user: "Thông tin lá số", bot: "Bot không thể trả lời lúc này." }]);
      }
    } catch (error: any) {
      console.error("Lỗi khi gọi Gemini:", error);
      setChatHistory([
        { user: "Thông tin lá số", bot: "Error: Không thể tạo phản hồi từ Gemini." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (generatedResult && chatHistory.length === 0 && !isLoading) {
      setChatHistory([{ user: "Thông tin lá số", bot: "Đang phân tích..." }]);
      console.log(`Phân tích lá số tử vi sau đây: ${generatedResult}`);
      getGeminiResponse(`Phân tích lá số tử vi sau đây: ${JSON.stringify(generatedResult)}`);
    }
  }, [generatedResult, chatHistory, isLoading]); // Include dependencies

  return (
    <div className="container">
      <h2>Kết quả phân tích lá số</h2>
      <div className="chatBox">
        <div className="output">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <p className="message userMessage">
                <b>Thông tin:</b> {chat.user}
              </p>
              <p className="message botMessage">
                <b>Phân tích:</b>
                <br />
                {chat.bot.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
