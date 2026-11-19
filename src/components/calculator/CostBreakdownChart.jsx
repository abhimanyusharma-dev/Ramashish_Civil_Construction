import React, { useState } from 'react';
import { PieChart, Layers, Sliders, Info } from 'lucide-react';
import { translations } from '../../data/translations.js';

export default function CostBreakdownChart({
  estimate,
  lang = 'en',
}) {
  if (!estimate) return null;

  const t = translations[lang] || translations.en;
  const { chartData, metrics } = estimate;
  const [activeTab, setActiveTab] = useState('phases'); // 'phases' | 'ratio'
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const formatINR = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;

  // Data for Material vs Labour ratio mode
  const ratioData = [
    {
      id: 'material',
      nameEn: 'Building Materials (Cement, Steel, Aggregates, Tiles)',
      nameHi: 'निर्माण सामग्री (सीमेंट, स्टील, गिट्टी, टाइल्स)',
      amount: metrics.totalMaterialCost,
      percent: metrics.materialCostPercent,
      color: '#0B1B35', // Deep Navy
    },
    {
      id: 'labour',
      nameEn: 'Skilled Labour & Trades (Masons, Carpenters, Trades)',
      nameHi: 'श्रम एवं कारीगर (मिस्त्री, बारबेंडर, शटरिंग, ट्रेड्स)',
      amount: metrics.totalLabourCost,
      percent: metrics.labourCostPercent,
      color: '#C69A45', // Metallic Gold
    },
  ];

  // Pick dataset based on activeTab
  const currentDataset =
    activeTab === 'phases'
      ? chartData.map((d) => ({
          ...d,
          percent: Math.round((d.amount / metrics.grandTotalCost) * 100),
        }))
      : ratioData;

  const totalAmount = currentDataset.reduce((sum, d) => sum + d.amount, 0);

  // Calculate SVG arc paths for a doughnut chart
  const size = 300;
  const center = size / 2;
  const radius = 110;
  const innerRadius = 70;

  let cumulativeAngle = -Math.PI / 2; // Start from top 12 o'clock

  const slices = currentDataset.map((item) => {
    const sliceAngle = (item.amount / totalAmount) * (2 * Math.PI);
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + sliceAngle;
    cumulativeAngle = endAngle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const x3 = center + innerRadius * Math.cos(endAngle);
    const y3 = center + innerRadius * Math.sin(endAngle);
    const x4 = center + innerRadius * Math.cos(startAngle);
    const y4 = center + innerRadius * Math.sin(startAngle);

    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');

    return {
      ...item,
      pathData,
      startAngle,
      endAngle,
    };
  });

  const displayCenter = hoveredSlice
    ? hoveredSlice
    : {
        nameEn: 'Grand Total',
        nameHi: 'कुल निर्माण लागत',
        amount: metrics.grandTotalCost,
        percent: 100,
      };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm p-6 sm:p-8">
      {/* Chart Header & Mode Toggle Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PieChart className="w-4 h-4 text-[#C69A45]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#0B1B35] font-bold">
              {t.chartCategoryView}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-black text-[#0B1B35]">
            {t.chartHeader}
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            {t.chartSub}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[#FAFAF7] border border-[#E8E4DA] shrink-0">
          <button
            onClick={() => {
              setActiveTab('phases');
              setHoveredSlice(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all ${
              activeTab === 'phases'
                ? 'bg-[#0B1B35] text-white shadow-xs'
                : 'text-[#172033]/70 hover:text-[#0B1B35]'
            }`}
          >
            {t.chartCategoryView}
          </button>
          <button
            onClick={() => {
              setActiveTab('ratio');
              setHoveredSlice(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all ${
              activeTab === 'ratio'
                ? 'bg-[#0B1B35] text-white shadow-xs'
                : 'text-[#172033]/70 hover:text-[#0B1B35]'
            }`}
          >
            {t.chartRatioView}
          </button>
        </div>
      </div>

      {/* Main Chart Content: SVG Doughnut + Interactive Legend */}
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Doughnut Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px]">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full transform transition-all drop-shadow-sm"
            >
              {slices.map((slice) => {
                const isHovered = hoveredSlice?.id === slice.id;
                return (
                  <path
                    key={slice.id}
                    d={slice.pathData}
                    fill={slice.color}
                    className="cursor-pointer transition-all duration-300 hover:opacity-90"
                    style={{
                      transformOrigin: `${center}px ${center}px`,
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      filter: isHovered ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.25))' : 'none',
                    }}
                    onMouseEnter={() => setHoveredSlice(slice)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
              <span className="text-[11px] font-mono uppercase text-slate-500 font-bold max-w-[120px] truncate">
                {lang === 'hi' ? displayCenter.nameHi : displayCenter.nameEn}
              </span>
              <span className="text-base sm:text-lg font-heading font-black text-[#0B1B35] mt-0.5">
                {formatINR(displayCenter.amount)}
              </span>
              <span className="text-xs font-mono font-bold text-[#C69A45] mt-0.5">
                {displayCenter.percent}%
              </span>
            </div>
          </div>

          <p className="text-[11px] font-sans text-slate-400 mt-2 text-center">
            {t.legendNote}
          </p>
        </div>

        {/* Legend / Breakdown List Column */}
        <div className="lg:col-span-7 space-y-3">
          {currentDataset.map((item) => {
            const isHovered = hoveredSlice?.id === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredSlice(item)}
                onMouseLeave={() => setHoveredSlice(null)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? 'border-[#C69A45] bg-[#C69A45]/5 shadow-sm'
                    : 'border-[#E8E4DA] bg-[#FAFAF7] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-md shrink-0 shadow-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs sm:text-sm font-heading font-bold text-[#0B1B35] truncate">
                      {lang === 'hi' ? item.nameHi : item.nameEn}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-heading font-black text-[#0B1B35]">
                      {formatINR(item.amount)}
                    </span>
                  </div>
                </div>

                {/* Progress Mini Bar */}
                <div className="w-full bg-[#E8E4DA]/60 h-2 rounded-full overflow-hidden flex items-center">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 mt-1">
                  <span>{item.percent}% of Grand Total</span>
                  <span>₹{Math.round(item.amount / estimate.inputs.totalBuiltUpArea).toLocaleString('en-IN')}/{t.sqftSuffix}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
