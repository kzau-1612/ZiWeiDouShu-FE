import React from "react";
import "./LaSoTuViDisplay.css"; // Đảm bảo bạn đã tạo file CSS này

interface CellData {
  temples: string[];
  majorStars: string[];
  minorStars: string[];
  miniStars: string[];
  miscStars: string[];
  ageRange: number[];
  lifeStage: string;
}

interface LaSoData {
  config: {
    year: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
    yearSky: string;
    yearGround: string;
    monthSky: string;
    monthGround: string;
    daySky: string;
    dayGround: string;
    bornTimeGround: string;
    configType: string;
    gender: string;
  };
  element: string;
  destinyMaster: string;
  bodyMaster: string;
  startControl: string;
  cells: { [key: string]: CellData }; // Sử dụng object để map tên cung với dữ liệu
  bornStarDerivativeMap?: { [key: string]: string };
}

interface LaSoTuViDisplayProps {
  laSoData: LaSoData;
}

const LaSoTuViDisplay: React.FC<LaSoTuViDisplayProps> = ({ laSoData }) => {
  const { config, element, destinyMaster, bodyMaster, startControl, cells, bornStarDerivativeMap } =
    laSoData;

  // Map tên cung theo thứ tự hiển thị (từ hình ảnh bạn cung cấp)
  const cungOrder = [
    "父母",
    "福德",
    "田宅",
    "事業",
    "交友",
    "遷移",
    "疾厄",
    "財帛",
    "子女",
    "夫妻",
    "兄弟",
    "命宮",
  ];

  console.log(laSoData.config);
  return (
    <>ok</>
    // <div className="la-so-container">
    //   <div className="thong-tin-chung">
    //     <h2>LÁ SỐ TỬ VI</h2>
    //     <div className="thong-tin-ca-nhan">
    //       <p>
    //         <span>Năm sinh:</span> {config.year} ({config.yearSky}
    //         {config.yearGround})
    //       </p>
    //       <p>
    //         <span>Tháng sinh:</span> {config.month} ({config.monthSky}
    //         {config.monthGround})
    //       </p>
    //       <p>
    //         <span>Ngày sinh:</span> {config.day} ({config.daySky}
    //         {config.dayGround})
    //       </p>
    //       <p>
    //         <span>Giờ sinh:</span> {config.bornTimeGround}
    //       </p>
    //       <p>
    //         <span>Giới tính:</span> {config.gender === "男" ? "Nam" : "Nữ"}
    //       </p>
    //       <p>
    //         <span>Mệnh Chủ:</span> {destinyMaster}
    //       </p>
    //       <p>
    //         <span>Thân Chủ:</span> {bodyMaster}
    //       </p>
    //       <p>
    //         <span>Cục:</span> {element}
    //       </p>
    //       <p>
    //         <span>Khởi Thuận:</span> {startControl}
    //       </p>
    //       {bornStarDerivativeMap && (
    //         <p>
    //           <span>Tứ Hóa:</span>{" "}
    //           {Object.entries(bornStarDerivativeMap)
    //             .map(([key, value]) => `${key}:${value}`)
    //             .join(", ")}
    //         </p>
    //       )}
    //     </div>
    //   </div>

    //   <div className="ban-do-la-so">
    //     {cungOrder.map((cungName, index) => {
    //       const cellData = cells[cungName];
    //       if (!cellData) {
    //         return (
    //           <div key={index} className="cung empty-cung">
    //             <h3>{cungName}</h3>
    //           </div>
    //         );
    //       }

    //       return (
    //         <div key={index} className={`cung ${cungName === "命宮" ? "cung-menh" : ""}`}>
    //           <h3>{cungName}</h3>
    //           {cellData.temples && cellData.temples.length > 0 && (
    //             <p className="temples">({cellData.temples.join(", ")})</p>
    //           )}
    //           <div className="stars">
    //             {cellData.majorStars && cellData.majorStars.length > 0 && (
    //               <p className="major-stars">{cellData.majorStars.join(", ")}</p>
    //             )}
    //             {cellData.minorStars && cellData.minorStars.length > 0 && (
    //               <p className="minor-stars">({cellData.minorStars.join(", ")})</p>
    //             )}
    //             {cellData.miniStars && cellData.miniStars.length > 0 && (
    //               <p className="mini-stars">{cellData.miniStars.join(", ")}</p>
    //             )}
    //             {cellData.miscStars && cellData.miscStars.length > 0 && (
    //               <p className="misc-stars">{cellData.miscStars.join(", ")}</p>
    //             )}
    //           </div>
    //           {cellData.ageRange && cellData.ageRange.length === 2 && (
    //             <p className="age-range">
    //               {cellData.ageRange[0]}-{cellData.ageRange[1]}
    //             </p>
    //           )}
    //           {cellData.lifeStage && <p className="life-stage">{cellData.lifeStage}</p>}
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default LaSoTuViDisplay;
