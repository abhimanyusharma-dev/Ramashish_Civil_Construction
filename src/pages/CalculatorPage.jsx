import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  PhoneCall,
  Calendar,
  CheckCircle2,
  HardHat,
  Award,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

import CalculatorHeader from '../components/calculator/CalculatorHeader.jsx';
import CalculatorForm from '../components/calculator/CalculatorForm.jsx';
import SummaryCards from '../components/calculator/SummaryCards.jsx';
import CostBreakdownChart from '../components/calculator/CostBreakdownChart.jsx';
import WorkWiseTable from '../components/calculator/WorkWiseTable.jsx';
import FloorWiseTable from '../components/calculator/FloorWiseTable.jsx';
import LabourCostTable from '../components/calculator/LabourCostTable.jsx';
import PrintEstimateView from '../components/calculator/PrintEstimateView.jsx';

import { calculateConstructionCost } from '../utils/calculatorEngine.js';
import { translations } from '../data/translations.js';

export default function CalculatorPage() {
  // Centralized language state: 'en' | 'hi', persisted across sessions
  const [lang, setLang] = useState(() => {
    try {
      return (typeof window !== 'undefined' && window.localStorage?.getItem('rcc_calculator_lang')) || 'en';
    } catch {
      return 'en';
    }
  });

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('rcc_calculator_lang', newLang);
      }
    } catch {}
  };

  const t = translations[lang] || translations.en;

  // Initial calculation parameters (Bhopal MP, 1000 sq ft, standard, G floor)
  const defaultInputs = {
    stateId: 'MP',
    cityId: 'bhopal',
    builtUpAreaPerFloor: 1000,
    constructionType: 'standard',
    numberOfFloors: 1,
  };

  const [inputValues, setInputValues] = useState(defaultInputs);
  const [isCalculating, setIsCalculating] = useState(false);

  // Generate initial calculation so user sees immediate live data
  const [estimate, setEstimate] = useState(() => {
    return calculateConstructionCost(defaultInputs);
  });

  const formRef = useRef(null);
  const resultsRef = useRef(null);

  const handleCalculate = (formData) => {
    setIsCalculating(true);
    setInputValues(formData);

    // Smooth calculation transition
    setTimeout(() => {
      const result = calculateConstructionCost(formData);
      setEstimate(result);
      setIsCalculating(false);

      // Smooth scroll to results
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  };

  const handleRecalculate = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReset = () => {
    setInputValues({
      stateId: 'MP',
      cityId: 'bhopal',
      builtUpAreaPerFloor: '',
      constructionType: 'standard',
      numberOfFloors: 1,
    });
    setEstimate(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#172033] flex flex-col font-sans selection:bg-[#C69A45]/20 selection:text-[#0B1B35]">
      {/* 1. STICKY HEADER */}
      <CalculatorHeader
        lang={lang}
        onLanguageChange={handleLanguageChange}
        showPrint={!!estimate}
        onPrint={handlePrint}
        onRecalculate={handleRecalculate}
      />

      {/* 2. HERO PAGE BANNER — dark green theme */}
      <section className="bg-gradient-to-b from-[#0A2E1A] via-[#09412B] to-[#061F12] text-white py-5 sm:py-6 border-b border-[#4C2A6B]/40 relative overflow-hidden">
        {/* Background grid in violet */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#6B3FA0 1px, transparent 1px), linear-gradient(90deg, #6B3FA0 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4C2A6B]/40 border border-[#6B3FA0]/60 text-[#D8B4FE] text-[10px] font-mono font-bold tracking-wider uppercase">
                <HardHat className="w-3 h-3 text-[#A78BFA]" />
                IS 456-2000 & CPWD STANDARDS
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-200 text-[10px] font-sans">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {lang === 'hi' ? 'संदीप शर्मा • 25+ वर्ष निर्माण अनुभव' : 'By Sandeep Sharma • Master Contractor'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white tracking-tight leading-tight whitespace-nowrap">
              {t.calculatorTitle}
            </h1>

            {/* Subheading */}
            <p className="mt-1.5 text-sm text-green-200 font-sans leading-relaxed">
              {t.calculatorSubtitle}
            </p>

            {/* Key Value Propositions */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-green-300 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#A78BFA]" />
                <span>{lang === 'hi' ? 'सटीक BOQ मात्रा गणना' : 'Quantity-Based BOQ Engine'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#A78BFA]" />
                <span>{lang === 'hi' ? 'स्थानीय सामग्री व श्रम दरें' : 'Local Material & Labour Rates'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#A78BFA]" />
                <span>{lang === 'hi' ? 'मंजिल-वार एवं ट्रेड-वार विश्लेषण' : 'Floor-Wise & Trade-Wise'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN INTERACTIVE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 flex-1 w-full">
        {/* INPUT FORM SECTION */}
        <div ref={formRef}>
          <CalculatorForm
            lang={lang}
            initialValues={inputValues}
            onCalculate={handleCalculate}
            onReset={handleReset}
            isCalculating={isCalculating}
          />
        </div>

        {/* EMPTY STATE WHEN RESET */}
        {!estimate && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#D8D2C2] p-8 sm:p-12 text-center text-slate-500 max-w-2xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#0B1B35]/5 border border-[#C69A45]/30 flex items-center justify-center mx-auto mb-4 text-[#C69A45]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-black text-xl text-[#0B1B35] mb-2">
              {lang === 'hi' ? 'प्रोजेक्ट विवरण दर्ज करें' : 'Ready to Calculate'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'ऊपर अपने प्लॉट का क्षेत्रफल, स्थान और निर्माण गुणवत्ता चुनें, फिर "निर्माण लागत की गणना करें" पर क्लिक करें।'
                : 'Enter your built-up area and select your location and quality specifications above, then click "Calculate Cost".'}
            </p>
          </div>
        )}

        {/* RESULTS SECTION */}
        {estimate && (
          <div ref={resultsRef} className="space-y-12 animate-fadeIn">
            {/* Section A: 8 Summary Metric Cards */}
            <SummaryCards
              estimate={estimate}
              lang={lang}
              onRecalculate={handleRecalculate}
              onPrint={handlePrint}
            />

            {/* Section B: Interactive Cost Breakdown Doughnut Chart */}
            <CostBreakdownChart
              estimate={estimate}
              lang={lang}
            />

            {/* Section C: 10 Work Sections BOQ Material Breakdown */}
            <WorkWiseTable
              estimate={estimate}
              lang={lang}
            />

            {/* Section D: Storey / Floor-Wise Cost Distribution */}
            <FloorWiseTable
              estimate={estimate}
              lang={lang}
            />

            {/* Section E: Trade-Wise Skilled Labour Costs */}
            <LabourCostTable
              estimate={estimate}
              lang={lang}
            />

            {/* Section F: Rate Transparency, Quality Benchmark & Direct Consultation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rate Transparency Box */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E4DA] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#C69A45]"></span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0B1B35] font-bold">
                    {t.rateTransparencyHeader}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-heading font-black text-[#0B1B35] mb-2">
                  {t.rateSourceTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                  {t.rateTransparencySub}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E8E4DA] text-xs font-mono">
                  <div className="bg-[#FAFAF7] p-3 rounded-xl border border-[#E8E4DA]">
                    <span className="text-slate-500 block text-[11px] uppercase">
                      {lang === 'hi' ? 'डेटा स्रोत' : 'Rate Source'}:
                    </span>
                    <span className="font-bold text-[#0B1B35] mt-0.5 block">
                      {lang === 'hi' ? estimate.metadata.rateSourceHi : estimate.metadata.rateSourceEn}
                    </span>
                  </div>
                  <div className="bg-[#FAFAF7] p-3 rounded-xl border border-[#E8E4DA]">
                    <span className="text-slate-500 block text-[11px] uppercase">
                      {t.lastUpdatedTitle}:
                    </span>
                    <span className="font-bold text-[#0B1B35] mt-0.5 block">
                      {estimate.metadata.lastUpdated} ({estimate.metadata.isVerified ? (lang === 'hi' ? 'सत्यापित' : 'Active Benchmark') : (lang === 'hi' ? 'सांकेतिक' : 'Indicative')})
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E4DA] text-[11px] font-sans text-slate-500 leading-relaxed">
                  <span className="font-semibold text-[#0B1B35]">{t.disclaimerHeader}:</span> {t.disclaimerText}
                </div>
              </div>

              {/* Consultation Callout Card */}
              <div className="bg-gradient-to-br from-[#0B1B35] to-[#12284C] text-white rounded-2xl p-6 sm:p-8 border border-[#C69A45]/40 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C69A45]/20 border border-[#C69A45]/50 flex items-center justify-center mb-4">
                    <PhoneCall className="w-6 h-6 text-[#C69A45]" />
                  </div>
                  <h4 className="text-lg font-heading font-black text-white mb-1.5">
                    {t.contactCtaTitle}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                    {t.contactCtaSub}
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+919826000000"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#C69A45] hover:bg-[#D4A956] text-[#0B1B35] font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{t.contactCtaBtn}</span>
                  </a>

                  <Link
                    to="/#contact"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all text-center"
                  >
                    <span>{lang === 'hi' ? 'साइट विजिट बुक करें' : 'Schedule Site Visit'}</span>
                  </Link>

                  <p className="text-[11px] text-center text-[#E8D8B8] font-mono">
                    {t.phoneConsultation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. PRINT VIEW CONTAINER (Visible only during window.print()) */}
      {estimate && (
        <PrintEstimateView
          estimate={estimate}
          lang={lang}
        />
      )}

      {/* 5. FOOTER */}
      <footer className="bg-white border-t border-[#E8E4DA] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-heading font-bold text-[#0B1B35] hover:text-[#C69A45] flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 text-[#C69A45]" />
              <span>{t.backToHome}</span>
            </Link>
            <span>•</span>
            <span>RAMASHISH Civil Construction © {new Date().getFullYear()}</span>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            IS 456-2000 • Turnkey Residential & Commercial Construction
          </div>
        </div>
      </footer>
    </div>
  );
}
