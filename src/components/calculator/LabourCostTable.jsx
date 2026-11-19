import React from 'react';
import { Users2, HardHat, ShieldCheck } from 'lucide-react';
import { translations } from '../../data/translations.js';

export default function LabourCostTable({
  estimate,
  lang = 'en',
}) {
  if (!estimate || !estimate.labourByTrade) return null;

  const t = translations[lang] || translations.en;
  const { labourByTrade, metrics } = estimate;

  const formatINR = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;

  return (
    <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-[#FAFAF7] border-b border-[#E8E4DA]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <HardHat className="w-4 h-4 text-[#C69A45]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#0B1B35] font-bold">
                {lang === 'hi' ? 'विशेषज्ञ ट्रेड श्रम ब्रेकडाउन' : 'SKILLED LABOUR TRADES & WAGES'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0B1B35]">
              {t.labourTableHeader}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5">
              {t.labourTableSub}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#0B1B35]/5 border border-[#E8E4DA] rounded-xl px-3 py-1.5 text-xs font-mono text-[#0B1B35] shrink-0">
            <span className="font-bold text-[#C69A45]">{labourByTrade.length}</span>
            <span>{lang === 'hi' ? 'ट्रेड श्रेणियां' : 'Specialized Trades'}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0B1B35] text-white text-[11px] font-mono uppercase tracking-wider">
              <th className="py-3 px-6">{t.labourTradeCol}</th>
              <th className="py-3 px-4">{t.labourScopeCol}</th>
              <th className="py-3 px-4 text-center">{t.labourPercentCol}</th>
              <th className="py-3 px-6 text-right">{t.labourAmountCol}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E4DA] text-xs font-sans">
            {labourByTrade.map((trade, idx) => {
              const tradePercent = Math.round((trade.amount / metrics.totalLabourCost) * 100);
              return (
                <tr key={idx} className="hover:bg-[#FAFAF7]/70 transition-colors">
                  <td className="py-3.5 px-6 font-heading font-bold text-[#0B1B35] text-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C69A45]"></span>
                      <span>{lang === 'hi' ? trade.tradeHi : trade.tradeEn}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {lang === 'hi' ? trade.unitHi : trade.unitEn}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#C69A45]/15 text-[#0B1B35]">
                      {tradePercent}%
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono font-black text-sm text-[#0B1B35]">
                    {formatINR(trade.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#FAFAF7] border-t-2 border-[#D8D2C2] text-xs font-bold text-[#0B1B35]">
              <td colSpan="2" className="py-4 px-6 font-heading uppercase tracking-wider">
                {lang === 'hi' ? 'कुल श्रम एवं कारीगर व्यय:' : 'Total Skilled Labour Expenditure:'}
              </td>
              <td className="py-4 px-4 text-center font-mono font-black">
                100%
              </td>
              <td className="py-4 px-6 text-right font-heading font-black text-base text-[#C69A45]">
                {formatINR(metrics.totalLabourCost)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Trust & Craftsmanship Note */}
      <div className="p-4 sm:px-6 bg-[#0B1B35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#C69A45] shrink-0" />
          <span className="text-slate-300 font-sans">
            {lang === 'hi'
              ? 'RAMASHISH बिना बिचौलिए के सीधे अनुभवी स्थायी कारीगरों व साइट सुपरवाइजरों द्वारा कार्य निष्पादन करता है।'
              : 'Direct supervision by master contractor Sandeep Sharma with zero subcontractor dilution.'}
          </span>
        </div>
        <div className="text-[11px] font-mono text-[#E8D8B8] shrink-0">
          25+ Years Experience • M20/M25 Testing
        </div>
      </div>
    </div>
  );
}
