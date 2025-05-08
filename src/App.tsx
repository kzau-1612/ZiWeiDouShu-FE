// App.tsx
import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import DestinyChart from "./components/DestinyChart";
import "./App.css";
import ChatBot from "./components/Chatbot";

interface FormData {
  year: string;
  month: string;
  day: string;
  isLeapMonth: boolean;
  bornTimeName: string;

  gender: "male" | "female";
  calendarType: "lunar" | "solar"; // Thêm trường để chọn loại lịch
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    year: "",
    month: "",
    day: "",
    isLeapMonth: false,
    bornTimeName: "",
    gender: "male",
    calendarType: "solar", // Mặc định là lịch dương
  });
  const [parsedResult, setParsedResult] = useState<any | null>(null);
  const [translatedResult, setTranslatedResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [selectedChartType, setSelectedChartType] = useState<string>("天盤");

  const handleChartTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChartType(event.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;
    const { name, value, type } = target;

    if (target instanceof HTMLInputElement && type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: target.checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setParsedResult(null);
    setTranslatedResult(null);
    setError(null);
    setAnalysis(null);

    try {
      // Chọn API dựa trên calendarType
      // const apiUrl =
      //   formData.calendarType === "lunar"
      //     ? "https://ziweidoushu-api.vercel.app/api/ziweidoushu/lunar"
      //     : "https://ziweidoushu-api.vercel.app/api/ziweidoushu/solar";
      const apiUrl =
        formData.calendarType === "lunar"
          ? "http://localhost:3000/api/ziweidoushu/lunar"
          : "http://localhost:3000/api/ziweidoushu/solar";

      // Chuẩn bị dữ liệu gửi đi dựa trên loại lịch
      const requestBody =
        formData.calendarType === "lunar"
          ? {
              year: formData.year,
              month: formData.month,
              day: formData.day,
              isLeapMonth: formData.isLeapMonth,
              bornTimeName: formData.bornTimeName,
              gender: formData.gender,
              configType: selectedChartType, // Thêm loại bàn vào request body
            }
          : {
              year: formData.year,
              month: formData.month,
              day: formData.day,
              bornTimeName: formData.bornTimeName,
              gender: formData.gender,
              configType: selectedChartType, // Thêm loại bàn vào request body
            };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Có lỗi xảy ra khi gửi yêu cầu.");
      }

      const data = await response.json();
      console.log("Raw Data:", data);
      setParsedResult(data.result);
      setTranslatedResult(data.result); // Trực tiếp sử dụng kết quả nếu không cần dịch
      setAnalysis("Đang phân tích lá số...");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (translatedResult) {
      // Placeholder for actual analysis logic after translation
      const analyzeResult = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setAnalysis("Đây là kết quả phân tích lá số của bạn.");
      };
      analyzeResult();
    } else {
      setAnalysis(null);
    }
  }, [translatedResult]);

  const timeOptions = [
    { value: "早子時", label: "Tý (23:00 - 01:00)" },
    { value: "丑時", label: "Sửu (01:00 - 03:00)" },
    { value: "寅時", label: "Dần (03:00 - 05:00)" },
    { value: "卯時", label: "Mão (05:00 - 07:00)" },
    { value: "辰時", label: "Thìn (07:00 - 09:00)" },
    { value: "巳時", label: "Tỵ (09:00 - 11:00)" },
    { value: "午時", label: "Ngọ (11:00 - 13:00)" },
    { value: "未時", label: "Mùi (13:00 - 15:00)" },
    { value: "申時", label: "Thân (15:00 - 17:00)" },
    { value: "酉時", label: "Dậu (17:00 - 19:00)" },
    { value: "戌時", label: "Tuất (19:00 - 21:00)" },
    { value: "亥時", label: "Hợi (21:00 - 23:00)" },
  ];

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Nhập Thông Tin Lá Số Tử Vi</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <select name="calendarType" value={formData.calendarType} onChange={handleChange} required>
          <option value="solar">Lịch Dương</option>
          <option value="lunar">Lịch Âm</option>
        </select>
        <input
          type="number"
          name="year"
          placeholder="Năm sinh"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="month"
          placeholder="Tháng sinh"
          value={formData.month}
          onChange={handleChange}
          min="1"
          max={formData.calendarType === "lunar" ? "13" : "12"}
          required
        />
        <input
          type="number"
          name="day"
          placeholder="Ngày sinh"
          value={formData.day}
          onChange={handleChange}
          min="1"
          max="31"
          required
        />
        {formData.calendarType === "lunar" && (
          <label>
            <input
              type="checkbox"
              name="isLeapMonth"
              checked={formData.isLeapMonth}
              onChange={handleChange}
            />{" "}
            Tháng nhuận
          </label>
        )}
        <select name="bornTimeName" value={formData.bornTimeName} onChange={handleChange} required>
          <option value="">Chọn giờ sinh</option>
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>
        <select
          name="chartType"
          value={selectedChartType}
          onChange={handleChartTypeChange}
          required
        >
          <option value="GROUND">Thiên Bàn</option>
          <option value="SKY">Địa Bàn</option>
          <option value="HUMAN">Nhân Bàn</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo Lá Số"}
        </button>
      </form>

      {loading && <p>Đang xử lý...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {translatedResult && <DestinyChart chartData={translatedResult.cells} analysis={analysis} />}
      {parsedResult && <ChatBot generatedResult={parsedResult} />}
    </div>
  );
};

export default App;
