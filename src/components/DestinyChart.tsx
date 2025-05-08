import React from "react";

// Define the structure for cell data as it appears in the raw info.cells array
interface RawCellData {
  sky: string;
  ground: string;
  temples: string[]; // Original Chinese temple names
  majorStars: string[]; // Original Chinese star names
  minorStars: string[]; // Original Chinese star names
  miniStars: string[]; // Original Chinese star names
  miscStars: string[]; // Original Chinese star names
  ageStart?: number;
  ageEnd?: number;
  lifeStage?: string; // Original Chinese life stage name
}
// Define the structure for the raw info data
interface RawInfoData {
  config?: {
    // Making config and its properties optional as they might vary
    year?: number;
    month?: number;
    day?: number;
    isLeapMonth?: boolean;
    yearSky?: string;
    yearGround?: string;
    monthSky?: string;
    monthGround?: string;
    daySky?: string;
    dayGround?: string;
    bornTimeGround?: string; // e.g., "丑時" or "早子時"
    configType?: string; // e.g., "天盤"
    gender?: string; // e.g., "男"
  };
  element?: string; // e.g., "金四局"
  destinyMaster?: string; // e.g., "破軍"
  bodyMaster?: string; // e.g., "火星"
  startControl?: string; // e.g., "卯"
  cells?: RawCellData[]; // Explicitly define cells as an array of RawCellData
  bornStarDerivativeMap?: { [key: string]: string }; // e.g., { "祿": "天梁", ...}
  // Add an index signature to allow indexing with a string
  [key: string]: any; // <-- Added this line
}

interface CellData {
  sky: string;
  ground: string;
  temples: string[]; // Translated temple names
  majorStars: string[]; // Translated star names
  minorStars: string[]; // Translated star names
  miniStars: string[]; // Translated star names
  miscStars: string[]; // Translated star names
  ageStart?: number;
  ageEnd?: number;
  lifeStage?: string; // Translated life stage name
}

// Update the main component's props interface
interface DestinyChartProps {
  chartData: { [key: string]: CellData }; // Object map translated cung name with translated data
  analysis: string | null;
  info: RawInfoData; // Use the more specific type for info
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
  男: "Nam",
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
  //Gio sinh
  // Giờ Sinh (Updated and added)
  早子時: "Giờ Tý",
  丑時: "Giờ Sửu",
  寅時: "Giờ Dần",
  卯時: "Giờ Mão",
  辰時: "Giờ Thìn",
  巳時: "Giờ Tỵ",
  午時: "Giờ Ngọ",
  未時: "Giờ Mùi",
  申時: "Giờ Thân",
  酉時: "Giờ Dậu",
  戌時: "Giờ Tuất",
  亥時: "Giờ Hợi",

  // Ngũ Hành Cục (Added and updated)
  金四局: "Kim Tứ Cục",
  木三局: "Mộc Tam Cục",
  水二局: "Thủy Nhị Cục",
  火六局: "Hỏa Lục Cục",
  土五局: "Thổ Ngũ Cục",
  // Bàn (Added)
  天盤: "Thiên Bàn",
  地盤: "Địa Bàn",
  人盤: "Nhân Bàn", // Assuming Nhân bàn is also a possibility
  女: "Nữ",
};

const DestinyChart: React.FC<DestinyChartProps> = ({ chartData, analysis, info }) => {
  const translate = (term: string | number): string => {
    if (typeof term === "number") {
      return term.toString(); // Return numbers as strings directly
    }
    return translationMap[term as keyof typeof translationMap] || term;
  };

  // Prepare translated chart data, mapping ground data to translated cung names
  const translatedChartData: { [key: string]: CellData } = {};
  // Check if chartData is present and is an object
  if (chartData && typeof chartData === "object") {
    for (const ground in chartData) {
      if (Object.prototype.hasOwnProperty.call(chartData, ground)) {
        const cellData = chartData[ground];
        // Map data to all temples in the cell
        cellData.temples.forEach((temple) => {
          const cungName = translate(temple);
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
            // Age is already number, no translation needed
            ageStart: cellData.ageStart,
            ageEnd: cellData.ageEnd,
          };
        });
      }
    }
  }

  // Standard Cung order (counter-clockwise from Mệnh)
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
  const translatedCungOrder = cungOrder.map(translate);

  // Map translated Cung Name to Grid Position (4x4 grid, 0-based index)
  const gridPositionMap: { [key: string]: { row: number; col: number } } = {
    "Phụ Mẫu": { row: 0, col: 0 },
    "Phúc Đức": { row: 0, col: 1 },
    "Điền Trạch": { row: 0, col: 2 },
    "Sự Nghiệp": { row: 0, col: 3 },
    "Mệnh Cung": { row: 1, col: 0 },
    "Giao Hữu": { row: 1, col: 3 },
    "Huynh Đệ": { row: 2, col: 0 },
    "Thiên Di": { row: 2, col: 3 },
    "Phu Thê": { row: 3, col: 0 },
    "Tử Nữ": { row: 3, col: 1 },
    "Tài Bạch": { row: 3, col: 2 },
    "Tật Ách": { row: 3, col: 3 },
    // Add Thân Cung if needed, decide where it should visually appear if separate
    // For now, Thân Cung shares the cell with its co-located cung.
  };

  // Create a 4x4 grid structure and fill with cung names or 'INFO'
  const grid: (string | "INFO" | null)[][] = Array(4)
    .fill(null)
    .map(() => Array(4).fill(null));

  // Place cung names in the grid based on the standard layout
  translatedCungOrder.forEach((cungName) => {
    const position = gridPositionMap[cungName];
    if (position) {
      grid[position.row][position.col] = cungName;
    }
  });

  // If Thân Cung is in the data but not listed in cungOrder as a separate cell,
  // find its translated name and ensure it's associated with a cell if needed visually.
  const thanCungTranslated = translate("身宮");
  if (
    !translatedCungOrder.includes(thanCungTranslated) &&
    translatedChartData[thanCungTranslated]
  ) {
    // Find which ground Thân Cung is on from the original info.cells
    const thanCungGround = (Array.isArray(info.cells) ? info.cells : [])?.find(
      (cell: RawCellData) => cell.temples.includes("身宮")
    )?.ground;
    if (thanCungGround) {
      const thanCungGroundTranslated = translate(thanCungGround);
      // Find the translated cung name that is on this ground
      const coLocatedCung = Object.keys(translatedChartData).find(
        (key) =>
          translatedChartData[key].ground === thanCungGroundTranslated && key !== thanCungTranslated
      );
      if (coLocatedCung) {
        // Thân Cung data is already merged in translatedChartData with the co-located cung
        // We can add a visual indicator to the co-located cung cell if desired.
        // For now, rely on it being listed within the cell data.
      }
    }
  }
  // Mark the center area for info
  grid[1][1] = "INFO";
  grid[1][2] = "INFO";
  grid[2][1] = "INFO";
  grid[2][2] = "INFO";

  // Function to render the information block in the center
  const renderInfoBlock = (info: RawInfoData) => {
    // Use RawInfoData type here
    const filteredInfo: { [key: string]: any } = {};
    for (const key in info) {
      if (
        Object.prototype.hasOwnProperty.call(info, key) &&
        key !== "cells" &&
        key !== "chartData" &&
        key !== "analysis"
      ) {
        filteredInfo[key] = info[key];
      }
    }

    return (
      <div className="text-xs text-center p-2 overflow-auto h-full">
        <h3 className="font-bold mb-2">Thông Tin Lá Số</h3>
        {/* Render config data */}
        {filteredInfo.config && (
          <div className="text-left mb-2">
            <p>
              <strong>Loại Lá Số:</strong> {translate(filteredInfo.config.configType)}
            </p>
            <p>
              <strong>Giới tính:</strong> {translate(filteredInfo.config.gender)}
            </p>
            {filteredInfo.config.year && filteredInfo.config.month && filteredInfo.config.day && (
              <p>
                <strong>Ngày sinh DL:</strong>{" "}
                {`${filteredInfo.config.day}/${filteredInfo.config.month}/${
                  filteredInfo.config.year
                }${filteredInfo.config.isLeapMonth ? " (Nhuận)" : ""}`}
              </p>
            )}
            {filteredInfo.config.yearSky && filteredInfo.config.yearGround && (
              <p>
                <strong>Năm ÂL:</strong>{" "}
                {`${translate(filteredInfo.config.yearSky)} ${translate(
                  filteredInfo.config.yearGround
                )}`}
              </p>
            )}
            {filteredInfo.config.monthSky && filteredInfo.config.monthGround && (
              <p>
                <strong>Tháng ÂL:</strong>{" "}
                {`${translate(filteredInfo.config.monthSky)} ${translate(
                  filteredInfo.config.monthGround
                )}`}
              </p>
            )}
            {filteredInfo.config.daySky && filteredInfo.config.dayGround && (
              <p>
                <strong>Ngày ÂL:</strong>{" "}
                {`${translate(filteredInfo.config.daySky)} ${translate(
                  filteredInfo.config.dayGround
                )}`}
              </p>
            )}
            {filteredInfo.config.bornTimeGround && (
              <p>
                <strong>Giờ sinh:</strong> {translate(filteredInfo.config.bornTimeGround)}
              </p>
            )}
          </div>
        )}

        {/* Render other top-level info */}
        {filteredInfo.element && (
          <p className="text-left mb-2">
            <strong>Ngũ Hành Cục:</strong> {translate(filteredInfo.element)}
          </p>
        )}
        {filteredInfo.destinyMaster && (
          <p className="text-left mb-2">
            <strong>Mệnh Chủ:</strong> {translate(filteredInfo.destinyMaster)}
          </p>
        )}
        {filteredInfo.bodyMaster && (
          <p className="text-left mb-2">
            <strong>Thân Chủ:</strong> {translate(filteredInfo.bodyMaster)}
          </p>
        )}
        {filteredInfo.startControl && (
          <p className="text-left mb-2">
            <strong>Khởi Vận tại:</strong> {translate(filteredInfo.startControl)}
          </p>
        )}

        {/* Render bornStarDerivativeMap */}
        {filteredInfo.bornStarDerivativeMap &&
          Object.keys(filteredInfo.bornStarDerivativeMap).length > 0 && (
            <div className="text-left mb-2">
              <strong>Hóa Khí:</strong>
              <div className="flex flex-wrap gap-x-2">
                {Object.entries(filteredInfo.bornStarDerivativeMap).map(([key, value]) => (
                  <span key={key}>
                    {translate(key)}: {translate(value as string)}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  // Function to render the content inside a cung cell
  const renderCellContent = (translatedCungName: string, cellData: CellData | undefined) => {
    if (!cellData) {
      // This case should ideally not be reached if translatedChartData is correctly populated
      // based on info.cells and cungOrder.
      return (
        <div className="p-2 text-sm min-h-[150px] whitespace-pre-wrap flex flex-col justify-between">
          <div className="font-bold text-center text-xs mb-1">{translatedCungName}</div>
          {/* Optional: Indicate missing data */}
          {/* <div className="text-center text-red-500">Thiếu dữ liệu</div> */}
        </div>
      );
    }

    return (
      <div className="p-2 text-sm min-h-[150px] whitespace-pre-wrap flex flex-col justify-between overflow-auto">
        <div className="font-bold text-center text-xs mb-1">{translatedCungName}</div>
        <div className="text-xs flex-grow overflow-auto">
          {" "}
          {/* Added flex-grow and overflow-auto */}
          {/* Render Cung name if multiple temples in one cell */}
          {cellData.temples?.length > 1 && (
            <div>
              <strong>Cung:</strong> {cellData.temples.join(", ")}
            </div>
          )}
          <div>
            <strong>Thiên Can:</strong> {cellData.sky}
          </div>
          <div>
            <strong>Địa Chi:</strong> {cellData.ground}
          </div>
          {cellData.majorStars?.length > 0 && (
            <div>
              <strong>Chính Tinh:</strong> {cellData.majorStars.join(", ")}
            </div>
          )}
          {cellData.minorStars?.length > 0 && (
            <div>
              <strong>Phụ Tinh:</strong> {cellData.minorStars.join(", ")}
            </div>
          )}
          {cellData.miniStars?.length > 0 && (
            <div>
              <strong>Tiểu Tinh:</strong> {cellData.miniStars.join(", ")}
            </div>
          )}
          {cellData.miscStars?.length > 0 && (
            <div>
              <strong>Tạp Tinh:</strong> {cellData.miscStars.join(", ")}
            </div>
          )}
        </div>
        {/* Age and Life Stage at the bottom */}
        {(cellData.ageStart !== undefined && cellData.ageEnd !== undefined) ||
        cellData.lifeStage ? (
          <div className="font-semibold mt-1 text-center">
            {" "}
            {/* Added mt-1 */}
            {cellData.ageStart !== undefined && cellData.ageEnd !== undefined && (
              <span>
                {cellData.ageStart}-{cellData.ageEnd}
                {cellData.lifeStage ? " - " : ""}
              </span>
            )}
            {cellData.lifeStage && <span>{cellData.lifeStage}</span>}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      {/* Main Chart Grid */}
      <div className="grid grid-cols-4 grid-rows-4 gap-1 border border-gray-300">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`; // Unique key for grid cell

            if (cell === "INFO") {
              // Render the info block only at the top-left of the center area
              if (rowIndex === 1 && colIndex === 1) {
                return (
                  <div
                    key="info-block"
                    className="border border-gray-200 p-2 text-sm col-span-2 row-span-2 flex items-center justify-center bg-gray-50 overflow-hidden" // overflow-hidden to contain content
                  >
                    {renderInfoBlock(info)} {/* Pass info prop */}
                  </div>
                );
              }
              return null; // Don't render separate cells for other "INFO" markers
            } else if (cell) {
              // 'cell' is the translated cung name
              const cellData = translatedChartData[cell]; // Get data using the translated cung name
              return (
                <div key={key} className="border border-gray-200">
                  {renderCellContent(cell, cellData)} {/* Render the content for this cell */}
                </div>
              );
            } else {
              // This case should not be reached in a correctly mapped 12-cung chart in a 4x4 grid with a 2x2 center.
              // It would represent a corner cell not used by a cung. Standard charts use all 12 outer cells.
              return (
                <div
                  key={key}
                  className="border border-gray-200 min-h-[150px] flex items-center justify-center bg-gray-100"
                >
                  {/* Optional: Render something in unused corners if needed */}
                </div>
              );
            }
          })
        )}
      </div>

      {/* Analysis block remains below the chart */}
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
