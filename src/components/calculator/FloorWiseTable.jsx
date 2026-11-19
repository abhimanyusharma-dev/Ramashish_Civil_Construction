import React from 'react';
import { Layers, Info, CheckCircle2 } from 'lucide-react';
import { translations } from '../../data/translations.js';

export default function FloorWiseTable({
  estimate,
  lang = 'en',
}) {
  if (!estimate || !estimate.floorWiseBreakdown) return null;

  const t = translations[lang] || translations.en;
  const { floorWiseBreakdown, metrics, inputs } = estimate;

  const formatINR = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;

  return (
    <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-[#FAFAF7] border-b border-[#E8E4DA]">
        <div className="flex items-center gap-2 mb-1.5">
          <Layers className="w-4 h-4 text-[#C69A45]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#0B1B35] font-bold">
            {lang === 'hi' ? 'मंजिल-वार लागत वितरण' : 'STOREY-WISE COST DISTRIBUTION'}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0B1B35]">
          {t.floorWiseHeader}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5">
          {t.floorWiseSub}
        </p>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0B1B35] text-white text-[11px] font-mono uppercase tracking-wider">
              <th className="py-3 px-6">{t.floorNameCol}</th>
              <th className="py-3 px-4 text-right">{t.floorAreaCol}</th>
              <th className="py-3 px-4 text-right">{t.materialCostCol}</th>
              <th className="py-3 px-4 text-right">{t.labourCostCol}</th>
              <th className="py-3 px-4 text-right">{t.totalCostCol}</th>
              <th className="py-3 px-4 text-right">₹/{t.sqftSuffix}</th>
              <th className="py-3 px-6 hidden md:table-cell">{t.floorNotesCol}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E4DA] text-xs font-sans">
            {floorWiseBreakdown.map((floor, idx) => {
              const area = floor.areaSqFt || floor.area || inputs.builtUpAreaPerFloor || 1;
              const floorCostPerSqFt = Math.round(floor.totalCost / area);
              return (
                <tr key={idx} className="hover:bg-[#FAFAF7]/70 transition-colors">
                  <td className="py-4 px-6 font-heading font-bold text-[#0B1B35] text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C69A45]"></span>
                      <span>{lang === 'hi' ? floor.floorNameHi : floor.floorNameEn}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-semibold text-slate-700">
                    {Number(area).toLocaleString('en-IN')} {t.sqftSuffix}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-medium text-slate-700">
                    {formatINR(floor.materialCost)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-medium text-slate-700">
                    {formatINR(floor.labourCost)}
                  </td>
                  <td className="py-4 px-4 text-right font-heading font-black text-sm text-[#0B1B35]">
                    {formatINR(floor.totalCost)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-[#C69A45]">
                    ₹{floorCostPerSqFt.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell text-slate-500 text-[11px] leading-relaxed">
                    {idx === 0 ? t.groundFloorNote : t.upperFloorNote}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#FAFAF7] border-t-2 border-[#D8D2C2] text-xs font-bold text-[#0B1B35]">
              <td className="py-4 px-6 font-heading uppercase tracking-wider">
                {lang === 'hi' ? 'कुल संचयी योग:' : 'Total Consolidated:'}
              </td>
              <td className="py-4 px-4 text-right font-mono font-black text-sm">
                {inputs.totalBuiltUpArea.toLocaleString('en-IN')} {t.sqftSuffix}
              </td>
              <td className="py-4 px-4 text-right font-mono font-black">
                {formatINR(metrics.totalMaterialCost)}
              </td>
              <td className="py-4 px-4 text-right font-mono font-black">
                {formatINR(metrics.totalLabourCost)}
              </td>
              <td className="py-4 px-4 text-right font-heading font-black text-base text-[#C69A45]">
                {formatINR(metrics.grandTotalCost)}
              </td>
              <td className="py-4 px-4 text-right font-mono font-black text-[#C69A45]">
                ₹{metrics.costPerSqFt.toLocaleString('en-IN')}
              </td>
              <td className="py-4 px-6 hidden md:table-cell text-[11px] font-sans text-slate-400">
                {inputs.numberOfFloors} {lang === 'hi' ? 'मंजिलों का पूर्ण योग' : 'Storeys Complete'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Explanatory Note Footer */}
      <div className="p-4 bg-[#FAFAF7]/60 border-t border-[#E8E4DA] flex items-start gap-2.5 text-xs text-slate-600 font-sans">
        <Info className="w-4 h-4 text-[#C69A45] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#0B1B35]">
            {lang === 'hi' ? 'नींव एवं लिफ्टिंग अंतर नियम:' : 'Structural Foundation Sizing Rule:'}
          </span>{' '}
          {lang === 'hi'
            ? 'भू-तल की लागत में भवन की संपूर्ण नींव, मिट्टी खुदाई एवं प्लिंथ बीम का एकमुश्त भार शामिल है। ऊपरी मंजिलों की दर में कंक्रीट व ईंटों की लिफ्टिंग/पंपिंग एवं सुरक्षा मचान का अतिरिक्त व्यय शामिल है।'
            : 'Ground Floor absorbs the building\'s complete deep foundation, earthwork excavation, and plinth beam grid. Upper floors incorporate vertical concrete pumping, mechanized material winching, and multi-tier external scaffolding.'}
        </div>
      </div>
    </div>
  );
}
