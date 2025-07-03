import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useCfStorestemp } from "../store/useCfStorestemp";
import dayjs from "dayjs";

export default function CFHeatmap() {
  const yearList = [2025, 2024, 2023];
  const { fetchCFSubmissions, groupSubmissionsByDate, user } = useCfStorestemp();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const submissions = await fetchCFSubmissions(3000);
      const grouped = groupSubmissionsByDate(submissions);

      const start = dayjs(`${selectedYear}-01-01`);
      const end = dayjs(`${selectedYear}-12-31`);
      const data = [];

      for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, "day")) {
        const dateStr = d.format("YYYY-MM-DD");
        data.push({
          date: dateStr,
          count: grouped.get(dateStr) || 0,
        });
      }

      setHeatmapData(data);
    };

     load();
  }, [user?.cfHandle, selectedYear]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 mt-10 bg-white border border-gray-200 rounded-2xl shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-4xl font-semibold text-orange-800">
          📅 Submission Activity
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="mt-3 md:mt-0 px-4 py-2 text-base border rounded-md bg-white shadow-sm"
        >
          {yearList.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={new Date(`${selectedYear}-01-01`)}
          endDate={new Date(`${selectedYear}-12-31`)}
          values={heatmapData}
          classForValue={(value) => {
            if (!value || !value.count) return "color-empty";
            if (value.count < 2) return "color-scale-1";
            if (value.count < 5) return "color-scale-2";
            if (value.count < 10) return "color-scale-3";
            return "color-scale-4";
          }}
          titleForValue={(value) =>
            value?.date ? `${dayjs(value.date).format("MMM D, YYYY")}: ${value.count || 0} submission(s)` : ""
          }
          showWeekdayLabels={true}
        />
      </div>

      <div className="mt-6 flex gap-4 text-sm text-gray-600 justify-center">
        <LegendBlock color="bg-gray-200" label="0" />
        <LegendBlock color="bg-orange-100" label="1–2" />
        <LegendBlock color="bg-orange-300" label="3–5" />
        <LegendBlock color="bg-orange-500" label="6–10" />
        <LegendBlock color="bg-orange-700" label="10+" />
      </div>

      <style>
        {`
          .react-calendar-heatmap text {
            font-size: 9px;
            fill: #6b7280;
          }
          .react-calendar-heatmap rect {
            rx: 4px;
            ry: 4px;
            width: 14px;
            height: 14px;
            stroke: #fff;
            stroke-width: 1;
            transition: all 0.2s ease-in-out;
          }
          .color-empty { fill: #e5e7eb; }
          .color-scale-1 { fill: #ffedd5; } /* orange-100 */
          .color-scale-2 { fill: #fdba74; } /* orange-300 */
          .color-scale-3 { fill: #fb923c; } /* orange-500 */
          .color-scale-4 { fill: #c2410c; } /* orange-700 */
        `}
      </style>
    </div>
  );
}

function LegendBlock({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-5 h-5 rounded-md ${color}`}></span>
      <span>{label}</span>
    </div>
  );
}
