import React from "react";

interface CellData {
  sky: string;
  ground: string;
  temples: string[];
  majorStars: string[];
  minorStars: string[];
  miniStars: string[];
  miscStars: string[];
  ageStart?: number;
  ageEnd?: number;
  lifeStage?: string;
}

interface DestinyChartProps {
  chartData: { [key: string]: CellData }; // Object map tên cung với dữ liệu
  analysis: string | null;
}

const translationMap = {
  天福: "Thiên Phúc",
  將星: "Tướng Tinh",
  戊: "Mậu",
  申: "Thân",
  己: "Kỷ",
  酉: "Dậu",
  庚: "Canh",
  戌: "Tuất",
  亥: "Hợi",
  丁: "Đinh",
  未: "Mùi",
  丙: "Bính",
  乙: "Ất",
  巳: "Tỵ",
  甲: "Giáp",
  辰: "Thìn",
  壬: "Nhâm",
  午: "Ngọ",
  癸: "Quý",
  丑: "Sửu",
  辛: "Tân",
  卯: "Mão",
  丑時: "Sửu Thời",
  天盤: "Thiên Bàn",
  男: "Nam",
  木三局: "Mộc Tam Cục",
  破軍: "Phá Quân",
  火星: "Hỏa Tinh",
  寅: "Dần",
  子: "Tý",
  命宮: "Mệnh Cung",
  天梁: "Thiên Lương",
  地劫: "Địa Kiếp",
  擎羊: "Kình Dương",
  天哭: "Thiên Khốc",
  天虛: "Thiên Hư",
  天姚: "Thiên Diêu",
  力士: "Lực Sĩ",
  歲破: "Tuế Phá",
  災煞: "Tai Sát",
  沐浴: "Mộc Dục",
  父母: "Phụ Mẫu",
  廉貞: "Liêm Trinh",
  七殺: "Thất Sát",
  大耗: "Đại Hao",
  青龍: "Thanh Long",
  龍德: "Long Đức",
  天煞: "Thiên Sát",
  冠帶: "Quan Đới",
  身宮: "Thân Cung",
  福德: "Phúc Đức",
  截空: "Triệt Không",
  天月: "Thiên Nguyệt",
  蜚廉: "Phi Liêm",
  小耗: "Tiểu Hao",
  白虎: "Bạch Hổ",
  指背: "Chỉ Bối",
  臨官: "Lâm Quan",
  田宅: "Điền Trạch",
  天魁: "Thiên Khôi",
  左輔: "Tả Phụ",
  天喜: "Thiên Hỷ",
  咸池: "Hàm Trì",
  封誥: "Phong Cáo",
  將軍: "Tướng Quân",
  天德: "Thiên Đức",
  帝旺: "Đế Vượng",
  事業: "Sự Nghiệp",
  天同: "Thiên Đồng",
  鈴星: "Linh Tinh",
  鳳閣: "Phượng Các",
  寡宿: "Quả Tú",
  解神: "Giải Thần",
  陰煞: "Âm Sát",
  奏書: "Tấu Thư",
  弔客: "Điếu Khách",
  月煞: "Nguyệt Sát",
  衰: "Suy",
  交友: "Giao Hữu",
  武曲: "Vũ Khúc",
  天鉞: "Thiên Việt",
  文曲: "Văn Khúc",
  破碎: "Phá Toái",
  天傷: "Thiên Thương",
  病符: "Bệnh Phù",
  亡神: "Vong Thần",
  病: "Bệnh",
  遷移: "Thiên Di",
  太陽: "Thái Dương",
  天才: "Thiên Tài",
  三台: "Tam Thai",
  喜神: "Hỷ Thần",
  太歲: "Thái Tuế",
  死: "Tử",
  疾厄: "Tật Ách",
  天府: "Thiên Phủ",
  天空: "Thiên Không",
  台輔: "Thai Phụ",
  天貴: "Thiên Quý",
  天使: "Thiên Sứ",
  晦氣: "Hối Khí",
  攀鞍: "Phan Án",
  墓: "Mộ",
  財帛: "Tài Bạch",
  天機: "Thiên Cơ",
  太陰: "Thái Âm",
  天馬: "Thiên Mã",
  孤辰: "Cô Thần",
  天壽: "Thiên Thọ",
  旬空: "Tuần Không",
  天刑: "Thiên Hình",
  八座: "Bát Tọa",
  喪門: "Tang Môn",
  歲驛: "Tuế Dịch",
  絕: "Tuyệt",
  子女: "Tử Nữ",
  紫微: "Tử Vi",
  貪狼: "Tham Lang",
  文昌: "Văn Xương",
  天廚: "Thiên Trù",
  紅鸞: "Hồng Loan",
  伏兵: "Phục Binh",
  貫索: "Quán Sách",
  息神: "Tức Thần",
  胎: "Thai",
  夫妻: "Phu Thê",
  巨門: "Cự Môn",
  地空: "Địa Không",
  陀羅: "Đà La",
  天官: "Thiên Quan",
  龍池: "Long Trì",
  官府: "Quan Phủ",
  官符: "Quan Phù",
  華蓋: "Hoa Cái",
  養: "Dưỡng",
  兄弟: "Huynh Đệ",
  天相: "Thiên Tướng",
  祿存: "Lộc Tồn",
  右弼: "Hữu Bật",
  劫煞: "Kiếp Sát",
  月德: "Nguyệt Đức",
  天巫: "Thiên Vu",
  恩光: "Ân Quang",
  博士: "Bác Sĩ",
  長生: "Trường Sinh",
  祿: "Lộc",
  權: "Quyền",
  科: "Khoa",
  忌: "Kỵ",
};

const DestinyChart: React.FC<DestinyChartProps> = ({ chartData, analysis }) => {
  const cungOrder = [
    "命宮",
    "兄弟",
    "夫妻",
    "子女",
    "財帛",
    "疾厄",
    "遷移",
    "交友",
    "事業",
    "田宅",
    "福德",
    "父母",
  ];

  const cungToGroundMap: { [key: string]: string } = {
    "Mệnh Cung": "子",
    "Huynh Đệ": "亥",
    "Phu Thê": "戌",
    "Tử Nữ": "酉",
    "Tài Bạch": "申",
    "Tật Ách": "未",
    "Thiên Di": "午",
    "Giao Hữu": "巳",
    "Sự Nghiệp": "辰",
    "Điền Trạch": "卯",
    "Phúc Đức": "寅",
    "Phụ Mẫu": "丑",
  };

  const translate = (term: string): string => {
    return translationMap[term as keyof typeof translationMap] || term;
  };
  const translatedChartData: { [key: string]: CellData } = {};
  for (const ground in chartData) {
    if (chartData.hasOwnProperty(ground)) {
      const cellData = chartData[ground];
      const cungName = translate(cellData.temples[0]); // Lấy tên cung từ temples
      translatedChartData[cungName] = {
        ...cellData,
        sky: translate(cellData.sky),
        ground: translate(cellData.ground),
        temples: cellData.temples.map(translate),
        majorStars: cellData.majorStars.map(translate),
        minorStars: cellData.minorStars.map(translate),
        miniStars: cellData.miniStars.map(translate),
        miscStars: cellData.miscStars.map(translate),
        lifeStage: cellData.lifeStage ? translate(cellData.lifeStage) : undefined,
      };
    }
  }

  const translatedCungOrder = cungOrder.map(translate);

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="grid grid-cols-4 grid-rows-3 gap-1 border border-gray-300">
        {translatedCungOrder.map((translatedCungName) => {
          const groundKey = cungToGroundMap[translatedCungName];
          const cellData = groundKey
            ? translatedChartData[translatedCungName] || chartData[groundKey]
            : null;
          if (!cellData) {
            return (
              <div
                key={translatedCungName}
                className="p-2 border text-sm min-h-[150px] whitespace-pre-wrap"
              >
                <div className="font-bold text-center text-xs mb-1">{translatedCungName}</div>
              </div>
            );
          }

          return (
            <div
              key={translatedCungName}
              className="p-2 border text-sm min-h-[150px] whitespace-pre-wrap"
            >
              <div className="font-bold text-center text-xs mb-1">{translatedCungName}</div>
              <div className="text-xs">
                <div>
                  <strong>Thiên Can:</strong> {cellData.sky}
                </div>
                <div>
                  <strong>Địa Chi:</strong> {cellData.ground}
                </div>
                {cellData.temples && cellData.temples.length > 0 && (
                  <div>
                    <strong>Cung:</strong> {cellData.temples.join(", ")}
                  </div>
                )}
                {cellData.majorStars && cellData.majorStars.length > 0 && (
                  <div>
                    <strong>Chính Tinh:</strong> {cellData.majorStars.join(", ")}
                  </div>
                )}
                {cellData.minorStars && cellData.minorStars.length > 0 && (
                  <div>
                    <strong>Phụ Tinh:</strong> {cellData.minorStars.join(", ")}
                  </div>
                )}
                {cellData.miniStars && cellData.miniStars.length > 0 && (
                  <div>
                    <strong>Tiểu Tinh:</strong> {cellData.miniStars.join(", ")}
                  </div>
                )}
                {cellData.miscStars && cellData.miscStars.length > 0 && (
                  <div>
                    <strong>Tạp Tinh:</strong> {cellData.miscStars.join(", ")}
                  </div>
                )}
                {cellData.lifeStage && (
                  <div>
                    <strong>Giai đoạn:</strong> {cellData.lifeStage}
                  </div>
                )}
                {cellData.ageStart && cellData.ageEnd && (
                  <div>
                    <strong>Tuổi:</strong> {cellData.ageStart}-{cellData.ageEnd}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {analysis && (
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow text-sm whitespace-pre-line">
          <h2 className="font-semibold text-lg mb-2">Phân tích lá số:</h2>
          <div>{analysis}</div>
        </div>
      )}
    </div>
  );
};

export default DestinyChart;
