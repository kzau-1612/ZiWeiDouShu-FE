import React, { useState, FormEvent } from "react";

interface FormData {
  year: string;
  month: string;
  day: string;
  isLeapMonth: boolean;
  bornTimeName: string;
  gender: "male" | "female";
}

interface ZiWeiDouShuFormProps {
  onResult: (raw: string, parsed: any) => void;
}

const ZiWeiDouShuForm: React.FC<ZiWeiDouShuFormProps> = ({ onResult }) => {
  const [formData, setFormData] = useState<FormData>({
    year: "",
    month: "",
    day: "",
    isLeapMonth: false,
    bornTimeName: "",
    gender: "male",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/ziweidoushu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Có lỗi xảy ra khi gửi yêu cầu.");
      }

      const data = await response.json();
      const rawResult = JSON.stringify(data.result);
      const parsedResult = data.result;

      onResult(rawResult, parsedResult); // Gửi kết quả lên component cha
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const timeOptions = [
    { value: "子時", label: "Tý (23:00 - 01:00)" },
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <div>
        <label htmlFor="year">Năm sinh:</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} required />
      </div>
      <div>
        <label>Tháng sinh:</label>
        <input type="number" name="month" value={formData.month} onChange={handleChange} required />
      </div>
      <div>
        <label>Ngày sinh:</label>
        <input type="number" name="day" value={formData.day} onChange={handleChange} required />
      </div>
      <div>
        <label>Tháng nhuận:</label>
        <input
          type="checkbox"
          name="isLeapMonth"
          checked={formData.isLeapMonth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Giờ sinh:</label>
        <select name="bornTimeName" value={formData.bornTimeName} onChange={handleChange} required>
          <option value="">Chọn giờ sinh</option>
          {timeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Giới tính:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Đang tạo..." : "Tạo Lá Số"}
      </button>

      {error && <p className="text-red-500">Lỗi: {error}</p>}
    </form>
  );
};

export default ZiWeiDouShuForm;
