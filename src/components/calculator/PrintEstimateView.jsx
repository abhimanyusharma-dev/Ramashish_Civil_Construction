import React from 'react';
import { translations } from '../../data/translations.js';

export default function PrintEstimateView({
  estimate,
  lang = 'en',
}) {
  if (!estimate) return null;

  const t = translations[lang] || translations.en;
  const { inputs, metrics, workSections, floorWiseBreakdown, labourByTrade, metadata } = estimate;

  const formatINR = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;
  const currentDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="print-only hidden font-sans text-black p-8 max-w-[900px] mx-auto bg-white">
      {/* Print Document Header */}
      <div className="flex items-start justify-between border-b-2 border-[#0B1B35] pb-6 mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/images/brand/official-emblem.png"
            alt="Emblem"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider text-[#0B1B35]">
              RAMASHISH CIVIL CONSTRUCTION
            </h1>
            <p className="text-xs font-semibold text-[#8B6E28]">
              {lang === 'hi' ? 'टर्नकी आवासीय एवं वाणिज्यिक निर्माण' : 'Turnkey Residential & Commercial Construction'}
            </p>
            <p className="text-[11px] text-gray-600">
              {lang === 'hi'
                ? 'मास्टर कांट्रेक्टर: संदीप शर्मा (25+ वर्ष निर्माण अनुभव) • भोपाल, मध्य प्रदेश'
                : 'Master Contractor: Sandeep Sharma (25+ Years Experience) • Bhopal, Madhya Pradesh'}
            </p>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="inline-block px-2 py-0.5 border border-[#0B1B35] font-mono text-[10px] uppercase font-bold text-[#0B1B35] mb-1">
            {lang === 'hi' ? 'BOQ निर्माण प्राक्कलन' : 'OFFICIAL BOQ ESTIMATE'}
          </span>
          <p className="font-mono text-gray-700">Ref: RCC/EST/{new Date().getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}</p>
          <p className="text-gray-500">{t.dateOfEstimate}: {currentDate}</p>
        </div>
      </div>

      {/* Project Specifications Block */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6 text-xs">
        <div>
          <p className="font-bold text-[#0B1B35] mb-1 uppercase font-mono text-[11px]">
            {lang === 'hi' ? 'परियोजना स्थल एवं विनिर्देश' : 'Project Site & Specifications'}:
          </p>
          <p><span className="text-gray-500">{t.stateLabel}:</span> <span className="font-semibold">{inputs.stateId}</span></p>
          <p><span className="text-gray-500">{t.cityLabel}:</span> <span className="font-semibold">{inputs.cityData?.[lang === 'hi' ? 'nameHi' : 'nameEn']}</span></p>
          <p><span className="text-gray-500">{t.qualityLabel}:</span> <span className="font-semibold uppercase">{inputs.constructionType}</span></p>
        </div>
        <div>
          <p className="font-bold text-[#0B1B35] mb-1 uppercase font-mono text-[11px]">
            {lang === 'hi' ? 'क्षेत्रफल एवं ऊंचाई' : 'Area & Elevation'}:
          </p>
          <p><span className="text-gray-500">{t.areaLabel}:</span> <span className="font-semibold">{inputs.builtUpAreaPerFloor.toLocaleString('en-IN')} {t.sqftSuffix}</span></p>
          <p><span className="text-gray-500">{t.floorsLabel}:</span> <span className="font-semibold">{inputs.numberOfFloors === 1 ? 'Ground Floor (G)' : `G+${inputs.numberOfFloors - 1}`} ({inputs.numberOfFloors} Floors)</span></p>
          <p><span className="text-gray-500">{t.totalAreaCalcLabel}:</span> <span className="font-bold text-[#0B1B35]">{inputs.totalBuiltUpArea.toLocaleString('en-IN')} {t.sqftSuffix}</span></p>
        </div>
      </div>

      {/* Financial Executive Summary Box */}
      <div className="grid grid-cols-4 gap-3 border-2 border-[#0B1B35] p-3 rounded-lg mb-6 text-center bg-gray-50">
        <div>
          <span className="block text-[10px] uppercase font-mono text-gray-500">{t.materialCostTitle}</span>
          <span className="text-sm font-bold text-gray-900">{formatINR(metrics.totalMaterialCost)}</span>
          <span className="block text-[10px] text-gray-500">({metrics.materialCostPercent}%)</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-mono text-gray-500">{t.labourCostTitle}</span>
          <span className="text-sm font-bold text-gray-900">{formatINR(metrics.totalLabourCost)}</span>
          <span className="block text-[10px] text-gray-500">({metrics.labourCostPercent}%)</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-mono text-gray-500">{t.costPerSqFtTitle}</span>
          <span className="text-sm font-bold text-[#8B6E28]">₹{metrics.costPerSqFt.toLocaleString('en-IN')}/{t.sqftSuffix}</span>
          <span className="block text-[10px] text-gray-500">All-Inclusive</span>
        </div>
        <div className="bg-[#0B1B35] text-white p-2 rounded">
          <span className="block text-[10px] uppercase font-mono text-[#E8D8B8]">{t.grandTotalTitle}</span>
          <span className="text-base font-bold text-white">{formatINR(metrics.grandTotalCost)}</span>
        </div>
      </div>

      {/* 10 Work Sections Breakdown Table */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase font-mono text-[#0B1B35] mb-2 border-b border-gray-300 pb-1">
          {t.workSectionsHeader} (BOQ Quantity Schedule)
        </h2>
        <table className="w-full text-left text-[11px] border border-gray-300">
          <thead>
            <tr className="bg-[#0B1B35] text-white font-mono text-[10px]">
              <th className="p-1.5 border border-gray-300">#</th>
              <th className="p-1.5 border border-gray-300">{t.workSectionCol}</th>
              <th className="p-1.5 border border-gray-300 text-right">{t.materialCostCol}</th>
              <th className="p-1.5 border border-gray-300 text-right">{t.labourCostCol}</th>
              <th className="p-1.5 border border-gray-300 text-right">{t.totalCostCol}</th>
            </tr>
          </thead>
          <tbody>
            {workSections.map((sec, i) => (
              <tr key={sec.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-1.5 border border-gray-300 font-mono text-center">{i + 1}</td>
                <td className="p-1.5 border border-gray-300 font-semibold">{lang === 'hi' ? (sec.nameHi || sec.titleHi) : (sec.nameEn || sec.titleEn)}</td>
                <td className="p-1.5 border border-gray-300 text-right font-mono">{formatINR(sec.materialCost)}</td>
                <td className="p-1.5 border border-gray-300 text-right font-mono">{formatINR(sec.labourCost)}</td>
                <td className="p-1.5 border border-gray-300 text-right font-mono font-bold text-[#0B1B35]">{formatINR(sec.totalCost)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-400 text-xs">
              <td colSpan="2" className="p-2 border border-gray-300 uppercase">Grand Total (10 Work Sections)</td>
              <td className="p-2 border border-gray-300 text-right font-mono">{formatINR(metrics.totalMaterialCost)}</td>
              <td className="p-2 border border-gray-300 text-right font-mono">{formatINR(metrics.totalLabourCost)}</td>
              <td className="p-2 border border-gray-300 text-right font-mono text-[#0B1B35] font-black">{formatINR(metrics.grandTotalCost)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Floor-wise and Trade-wise Mini Tables */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-[10px]">
        {/* Floor-wise */}
        <div>
          <h3 className="font-bold uppercase font-mono text-[#0B1B35] mb-1.5 pb-0.5 border-b border-gray-300">
            {t.floorWiseHeader}
          </h3>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 font-semibold">
                <th className="p-1 border border-gray-300">Floor</th>
                <th className="p-1 border border-gray-300 text-right">Area</th>
                <th className="p-1 border border-gray-300 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {floorWiseBreakdown.map((fl, i) => (
                <tr key={i}>
                  <td className="p-1 border border-gray-300">{lang === 'hi' ? fl.floorNameHi : fl.floorNameEn}</td>
                  <td className="p-1 border border-gray-300 text-right font-mono">{fl.areaSqFt || fl.area} sqft</td>
                  <td className="p-1 border border-gray-300 text-right font-mono font-semibold">{formatINR(fl.totalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trade Labour */}
        <div>
          <h3 className="font-bold uppercase font-mono text-[#0B1B35] mb-1.5 pb-0.5 border-b border-gray-300">
            {t.labourTableHeader}
          </h3>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 font-semibold">
                <th className="p-1 border border-gray-300">Trade</th>
                <th className="p-1 border border-gray-300 text-right">Share</th>
                <th className="p-1 border border-gray-300 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {labourByTrade.slice(0, 6).map((lb, i) => (
                <tr key={i}>
                  <td className="p-1 border border-gray-300 truncate max-w-[120px]">{lang === 'hi' ? lb.tradeHi : lb.tradeEn}</td>
                  <td className="p-1 border border-gray-300 text-right font-mono">{Math.round((lb.amount / metrics.totalLabourCost) * 100)}%</td>
                  <td className="p-1 border border-gray-300 text-right font-mono font-semibold">{formatINR(lb.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance, Disclaimer & Signatures */}
      <div className="border-t border-gray-300 pt-4 text-[10px] text-gray-600 space-y-2">
        <p>
          <span className="font-bold text-[#0B1B35]">{t.is456Compliance}:</span> {t.disclaimerNote}
        </p>
        <p className="font-mono text-gray-500">
          * {metadata.statusLabelEn} ({metadata.rateSourceEn}). {t.validityPeriod}: {t.validityDays}.
        </p>

        <div className="pt-8 flex justify-between items-end text-xs">
          <div className="text-center w-48 border-t border-gray-400 pt-1">
            <p className="font-bold text-[#0B1B35]">{t.clientAcceptance}</p>
            <p className="text-[10px] text-gray-500">(Sign & Date)</p>
          </div>
          <div className="text-center w-56 border-t border-gray-400 pt-1">
            <p className="font-bold text-[#0B1B35]">{t.authorizedSignature}</p>
            <p className="text-[10px] text-gray-500">RAMASHISH Civil Construction (Sandeep Sharma)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
