import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Boxes,
  Users,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { translations } from '../../data/translations.js';

export default function WorkWiseTable({
  estimate,
  lang = 'en',
}) {
  if (!estimate || !estimate.workSections) return null;

  const t = translations[lang] || translations.en;
  const { workSections, metrics } = estimate;

  // Track expanded section IDs; start with first 2 open by default
  const [expandedSections, setExpandedSections] = useState({
    [workSections[0]?.id]: true,
    [workSections[1]?.id]: true,
  });

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all = {};
    workSections.forEach((s) => {
      all[s.id] = true;
    });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const formatINR = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;

  return (
    <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden">
      {/* Table Header Section */}
      <div className="p-6 sm:p-8 bg-[#FAFAF7] border-b border-[#E8E4DA]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C69A45]"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0B1B35] font-bold">
                CPWD / IS 1200 METHOD OF MEASUREMENT
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0B1B35]">
              {t.workSectionsHeader}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5">
              {t.workSectionsSub}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#0B1B35] bg-white border border-[#D8D2C2] hover:bg-[#F2EFE9] transition-all"
            >
              {t.expandAll}
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-600 bg-white border border-[#D8D2C2] hover:bg-[#F2EFE9] transition-all"
            >
              {t.collapseAll}
            </button>
          </div>
        </div>
      </div>

      {/* Accordion List of 10 Work Sections */}
      <div className="divide-y divide-[#E8E4DA]">
        {workSections.map((section, index) => {
          const isOpen = !!expandedSections[section.id];
          const sectionNum = String(index + 1).padStart(2, '0');
          const sectionTitle = lang === 'hi' ? (section.nameHi || section.titleHi) : (section.nameEn || section.titleEn);
          const sectionDesc = lang === 'hi' ? (section.descriptionHi || section.descHi) : (section.descriptionEn || section.descEn);
          const itemsList = section.materials || section.items || [];

          return (
            <div key={section.id} className="transition-colors hover:bg-[#FAFAF7]/50">
              {/* Section Header Row */}
              <div
                onClick={() => toggleSection(section.id)}
                className="p-5 sm:px-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
              >
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0B1B35] text-[#C69A45] font-mono text-xs font-bold shrink-0 mt-0.5">
                    {sectionNum}
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-heading font-bold text-[#0B1B35] flex items-center gap-2">
                      <span>{sectionTitle}</span>
                    </h4>
                    <p className="text-xs text-slate-500 font-sans mt-0.5 line-clamp-1">
                      {sectionDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pl-11 md:pl-0">
                  <div className="text-right">
                    <span className="block text-[11px] font-mono uppercase text-slate-400">
                      {t.materialCostCol}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#0B1B35]">
                      {formatINR(section.materialCost)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="block text-[11px] font-mono uppercase text-slate-400">
                      {t.labourCostCol}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#0B1B35]">
                      {formatINR(section.labourCost)}
                    </span>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <span className="block text-[11px] font-mono uppercase text-[#C69A45] font-bold">
                      {t.totalCostCol}
                    </span>
                    <span className="text-sm sm:text-base font-heading font-black text-[#0B1B35]">
                      {formatINR(section.totalCost)}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-[#FAFAF7] border border-[#E8E4DA] flex items-center justify-center text-slate-600 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C69A45]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible BOQ Detail Table */}
              {isOpen && (
                <div className="px-5 sm:px-8 pb-6 pt-2 bg-[#FAFAF7]/40">
                  <div className="overflow-x-auto rounded-xl border border-[#E8E4DA] bg-white shadow-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0B1B35] text-white text-[11px] font-mono uppercase tracking-wider">
                          <th className="py-2.5 px-4">{t.boqItemCol}</th>
                          <th className="py-2.5 px-4 text-right">{t.boqQtyCol}</th>
                          <th className="py-2.5 px-4 text-center">{t.boqUnitCol}</th>
                          <th className="py-2.5 px-4 text-right">{t.boqRateCol}</th>
                          <th className="py-2.5 px-4 text-right">{t.boqAmountCol}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E4DA] text-xs font-sans">
                        {itemsList.map((item, idx) => {
                          const quantity = Number(item.qty ?? item.quantity ?? 0);
                          const unit = lang === 'hi' ? (item.unitHi || item.unit) : (item.unitEn || item.unit);
                          const rate = Number(item.rate || (quantity > 0 && item.amount ? Math.round(item.amount / quantity) : 0));
                          const amount = item.amount ? Number(item.amount) : Math.round(quantity * rate);

                          return (
                            <tr key={idx} className="hover:bg-[#FAFAF7]/80">
                              <td className="py-3 px-4 font-medium text-[#0B1B35]">
                                {lang === 'hi' ? (item.nameHi || item.nameEn) : item.nameEn}
                              </td>
                              <td className="py-3 px-4 text-right font-mono font-bold text-slate-700">
                                {quantity.toLocaleString('en-IN')}
                              </td>
                              <td className="py-3 px-4 text-center font-mono text-slate-500">
                                {unit}
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-slate-600">
                                {rate > 0 ? `₹${rate.toLocaleString('en-IN')}` : '—'}
                              </td>
                              <td className="py-3 px-4 text-right font-mono font-bold text-[#0B1B35]">
                                {amount > 0 ? formatINR(amount) : 'Included'}
                              </td>
                            </tr>
                          );
                        })}

                        {/* Trade Labour Row */}
                        <tr className="bg-[#C69A45]/5 font-medium">
                          <td colSpan="4" className="py-3 px-4 text-[#0B1B35] flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-[#C69A45]" />
                            <span>
                              {lang === 'hi'
                                ? `${sectionTitle} हेतु कुशल श्रम, कारीगर एवं शटरिंग`
                                : `Dedicated skilled labour, masons & tooling for ${sectionTitle}`}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-[#0B1B35]">
                            {formatINR(section.labourCost)}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="bg-[#FAFAF7] font-bold text-xs text-[#0B1B35] border-t border-[#D8D2C2]">
                          <td colSpan="4" className="py-3 px-4 text-right font-heading uppercase tracking-wider">
                            {lang === 'hi' ? 'खंड कुल योग (सामग्री + श्रम):' : 'Section Subtotal (Material + Labour):'}
                          </td>
                          <td className="py-3 px-4 text-right font-heading font-black text-[#C69A45]">
                            {formatINR(section.totalCost)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Table Grand Total Summary Bar */}
      <div className="bg-[#0B1B35] text-white p-6 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C69A45] font-bold block">
            {lang === 'hi' ? 'समस्त 10 कार्य खंडों का कुल योग' : 'CONSOLIDATED 10 SECTIONS GRAND TOTAL'}
          </span>
          <span className="text-xs text-slate-300 font-sans mt-0.5 block">
            {lang === 'hi'
              ? 'सामग्री लागत एवं कुशल श्रम व्यय का संपूर्ण योग'
              : 'Cumulative turnkey estimate based on current verified local rates'}
          </span>
        </div>

        <div className="flex items-center gap-8 text-right">
          <div>
            <span className="block text-[11px] font-mono uppercase text-slate-400">
              {t.materialCostCol}
            </span>
            <span className="text-base font-mono font-bold text-white">
              {formatINR(metrics.totalMaterialCost)}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase text-slate-400">
              {t.labourCostCol}
            </span>
            <span className="text-base font-mono font-bold text-[#E8D8B8]">
              {formatINR(metrics.totalLabourCost)}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase text-[#C69A45] font-bold">
              {t.grandTotalTitle}
            </span>
            <span className="text-xl sm:text-2xl font-heading font-black text-[#C69A45]">
              {formatINR(metrics.grandTotalCost)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
