import React from 'react';
import {
  MapPin,
  Building2,
  Sparkles,
  Layers,
  Boxes,
  Users2,
  IndianRupee,
  Calculator,
  Printer,
  FileDown,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import { translations } from '../../data/translations.js';

export default function SummaryCards({
  estimate,
  lang = 'en',
  onRecalculate,
  onPrint,
}) {
  if (!estimate) return null;

  const t = translations[lang] || translations.en;
  const { inputs, metrics, metadata } = estimate;

  // Indian Rupee currency formatter
  const formatINR = (val) =>
    `₹${Number(val || 0).toLocaleString('en-IN')}`;

  const qualityName =
    inputs.constructionType === 'premium'
      ? t.premiumTitle
      : inputs.constructionType === 'standard'
      ? t.standardTitle
      : t.basicTitle;

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#061F12] p-5 rounded-2xl border border-[#4C2A6B]/40 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA] font-bold">
              {lang === 'hi' ? 'गणना संपन्न // सटीक मात्रा अनुमान' : 'BOQ ESTIMATE GENERATED // IS 456 SPEC'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
            {t.summaryHeader}
          </h2>
          <p className="text-xs sm:text-sm text-green-300 font-sans mt-0.5">
            {t.summarySub}
          </p>
        </div>

        {/* Action Buttons: Recalculate, Print, Download PDF */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onRecalculate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold text-green-200 bg-[#09412B] hover:bg-[#0A2E1A] border border-[#4C2A6B]/40 transition-all shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-[#A78BFA]" />
            <span>{t.recalculate}</span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold text-white bg-[#09412B] hover:bg-[#0A2E1A] border border-[#4C2A6B]/50 transition-all shadow-md shadow-[#09412B]/30"
          >
            <Printer className="w-4 h-4 text-[#A78BFA]" />
            <span>{t.printEstimate}</span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold text-white bg-[#4C2A6B] hover:bg-[#5C3480] border border-[#6B3FA0]/50 transition-all shadow-sm"
          >
            <FileDown className="w-4 h-4 text-[#D8B4FE]" />
            <span>{t.downloadPdf}</span>
          </button>
        </div>
      </div>

      {/* 8 Metric Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: LOCATION */}
        <div className="bg-white p-5 rounded-2xl border border-[#0B1B35]/15 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#09412B]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500 font-bold mb-2">
            <MapPin className="w-4 h-4 text-[#09412B]" />
            <span>{t.locationCardTitle}</span>
          </div>
          <div className="text-lg font-heading font-black text-[#0B1B35] truncate">
            {inputs.cityData?.[lang === 'hi' ? 'nameHi' : 'nameEn']}
          </div>
          <div className="text-xs font-sans text-slate-600 mt-0.5">
            {inputs.stateId} • {metadata.statusLabelEn}
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{metadata.isVerified ? (lang === 'hi' ? 'सत्यापित मार्केट सर्वे' : 'Verified Local Index') : 'Regional Model'}</span>
          </div>
        </div>

        {/* CARD 2: BUILT-UP AREA */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#C69A45]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500 font-bold mb-2">
            <Building2 className="w-4 h-4 text-[#C69A45]" />
            <span>{t.areaCardTitle}</span>
          </div>
          <div className="text-lg font-heading font-black text-[#0B1B35]">
            {inputs.totalBuiltUpArea.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-mono font-normal text-slate-500">{t.sqftSuffix}</span>
          </div>
          <div className="text-xs font-sans text-slate-600 mt-0.5">
            {inputs.builtUpAreaPerFloor.toLocaleString('en-IN')} {t.sqftSuffix} {t.perFloorNote}
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] text-[11px] font-mono text-slate-500">
            {inputs.numberOfFloors} {inputs.numberOfFloors > 1 ? (lang === 'hi' ? 'फ्लोर स्लैब' : 'Floor Slabs') : (lang === 'hi' ? 'एकल फ्लोर' : 'Single Slab')}
          </div>
        </div>

        {/* CARD 3: QUALITY TIER */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500 font-bold mb-2">
            <Sparkles className="w-4 h-4 text-[#C69A45]" />
            <span>{t.qualityCardTitle}</span>
          </div>
          <div className="text-lg font-heading font-black text-[#0B1B35]">
            {qualityName}
          </div>
          <div className="text-xs font-sans text-slate-600 mt-0.5 truncate">
            {inputs.qualityConfig?.tagline}
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] text-[11px] font-mono text-[#C69A45] font-bold">
            {inputs.constructionType === 'standard' ? '★ Popular Choice' : inputs.constructionType.toUpperCase()}
          </div>
        </div>

        {/* CARD 4: FLOORS */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500 font-bold mb-2">
            <Layers className="w-4 h-4 text-[#C69A45]" />
            <span>{t.floorsCardTitle}</span>
          </div>
          <div className="text-lg font-heading font-black text-[#0B1B35]">
            {inputs.numberOfFloors === 1 ? 'Ground Floor (G)' : `G + ${inputs.numberOfFloors - 1}`}
          </div>
          <div className="text-xs font-sans text-slate-600 mt-0.5">
            {inputs.numberOfFloors} {lang === 'hi' ? 'मंजिला भवन' : 'Total Storeys'}
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] text-[11px] font-mono text-slate-500">
            {lang === 'hi' ? 'नींव भार गणना सहित' : 'Includes Foundation Load'}
          </div>
        </div>

        {/* CARD 5: MATERIAL COST */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500 font-bold mb-2">
            <span className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#C69A45]" />
              <span>{t.materialCostTitle}</span>
            </span>
            <span className="bg-[#0B1B35]/5 text-[#0B1B35] px-2 py-0.5 rounded text-[11px] font-bold">
              {metrics.materialCostPercent}%
            </span>
          </div>
          <div className="text-xl font-heading font-black text-[#0B1B35]">
            {formatINR(metrics.totalMaterialCost)}
          </div>
          <div className="text-xs font-sans text-slate-600 mt-0.5">
            ₹{Math.round(metrics.totalMaterialCost / inputs.totalBuiltUpArea).toLocaleString('en-IN')}/{t.sqftSuffix}
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] text-[11px] font-sans text-slate-500">
            {lang === 'hi' ? 'सीमेंट, स्टील, रेत, गिट्टी, टाइल्स, पेंट आदि' : 'Cement, Steel, Aggregates, Tiles & Finishes'}
          </div>
        </div>

        {/* CARD 6: LABOUR COST */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500 font-bold mb-2">
            <span className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-[#C69A45]" />
              <span>{t.labourCostTitle}</span>
            </span>
            <span className="bg-[#C69A45]/20 text-[#0B1B35] px-2 py-0.5 rounded text-[11px] font-bold">
              {metrics.labourCostPercent}%
            </span>
          </div>
          <div className="text-xl font-heading font-black text-[#0B1B35]">
            {formatINR(metrics.totalLabourCost)}
          </div>
          <div className="text-xs font-sans text-slate-600 mt-0.5">
            ₹{Math.round(metrics.totalLabourCost / inputs.totalBuiltUpArea).toLocaleString('en-IN')}/{t.sqftSuffix}
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] text-[11px] font-sans text-slate-500">
            {lang === 'hi' ? 'कारीगर, मिस्त्री, शटरिंग, इलेक्ट्रीशियन, प्लम्बर' : 'Masonry, Bar-bending, Shuttering & Trades'}
          </div>
        </div>

        {/* CARD 7: GRAND TOTAL COST (FEATURED HERO CARD) */}
        <div className="bg-gradient-to-br from-[#09412B] via-[#0A2E1A] to-[#4C2A6B] text-white p-5 rounded-2xl border-2 border-[#A78BFA]/60 shadow-xl relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#A78BFA]/15 rounded-bl-full pointer-events-none"></div>
          <div className="flex items-center justify-between text-xs font-mono uppercase text-green-200 font-bold mb-2">
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#A78BFA]" />
              <span>{t.grandTotalTitle}</span>
            </span>
            <span className="bg-[#4C2A6B] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase border border-[#A78BFA]/40">
              Turnkey
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
            {formatINR(metrics.grandTotalCost)}
          </div>
          <div className="text-xs font-sans text-green-200 mt-1">
            {lang === 'hi' ? 'अनुमानित कुल लागत (सामग्री + श्रम)' : 'Total Construction Estimate'}
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] font-mono text-green-300">
            {lang === 'hi' ? '10 कार्य खंड पूर्ण सम्मिलित' : '10 Complete Work Sections'}
          </div>
        </div>

        {/* CARD 8: COST PER SQ. FT */}
        <div className="bg-gradient-to-br from-[#FAFAF7] to-[#F2EFE9] p-5 rounded-2xl border border-[#C69A45]/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#0B1B35] font-bold mb-2">
            <span className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#C69A45]" />
              <span>{t.costPerSqFtTitle}</span>
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-black text-[#C69A45]">
            ₹{metrics.costPerSqFt.toLocaleString('en-IN')}
            <span className="text-xs font-mono font-medium text-slate-600"> /{t.sqftSuffix}</span>
          </div>
          <div className="text-xs font-sans text-slate-600 mt-1">
            {lang === 'hi' ? 'निर्मित क्षेत्रफल के प्रति वर्ग फुट लागत' : 'Normalized All-Inclusive Rate'}
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E8E4DA] text-[11px] font-mono text-[#0B1B35] font-semibold">
            {inputs.cityData?.nameEn} Market Rate
          </div>
        </div>
      </div>
    </div>
  );
}
