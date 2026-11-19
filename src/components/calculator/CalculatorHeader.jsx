import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Calculator, Printer, RotateCcw, PhoneCall } from 'lucide-react';
import { translations } from '../../data/translations.js';

export default function CalculatorHeader({
  lang = 'en',
  onLanguageChange,
  showPrint = false,
  onPrint,
  onRecalculate,
}) {
  const t = translations[lang] || translations.en;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E4DA] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 sm:h-24 flex items-center justify-between gap-4">
          
          {/* Left: Back to Home + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold text-[#0B1B35] hover:text-[#C69A45] hover:bg-[#FAFAF7] border border-[#E8E4DA] transition-all"
              title={t.backToHome}
            >
              <ArrowLeft className="w-4 h-4 text-[#C69A45]" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </Link>

            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 focus:outline-none">
              <div className="h-10 sm:h-12 w-auto flex items-center justify-center shrink-0">
                <img
                  src="/images/brand/official-emblem.png"
                  alt="RAMASHISH CIVIL CONSTRUCTION"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-10 sm:h-12 w-auto flex items-center">
                <img
                  src="/images/brand/official-wordmark.png"
                  alt="RAMASHISH CIVIL CONSTRUCTION"
                  className="h-full w-auto max-w-[180px] sm:max-w-[260px] md:max-w-[320px] object-contain"
                />
              </div>
            </Link>

            {/* Animated Contact Phone Button right next to RAMASHISH */}
            <a
              href="tel:+919827386803"
              className="contact-animated-btn px-3 py-1.5 rounded-lg border-2 text-xs font-heading font-extrabold flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all shadow-sm group select-none ml-1 sm:ml-2"
              title="Call RAMASHISH Civil Construction (Sandeep Sharma): 9827386803"
            >
              <PhoneCall className="w-3.5 h-3.5 contact-phone-icon shrink-0" />
              <span className="font-mono text-xs font-bold tracking-wider">9827386803</span>
            </a>
          </div>

          {/* Right: Language Selector & Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Quick action buttons if results are visible */}
            {showPrint && (
              <>
                <button
                  onClick={onRecalculate}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold text-[#0B1B35] hover:bg-[#FAFAF7] border border-[#E8E4DA] transition-all"
                  title={t.recalculate}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#C69A45]" />
                  <span>{t.recalculate}</span>
                </button>

                <button
                  onClick={onPrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold text-[#0B1B35] bg-[#E8D8B8]/30 hover:bg-[#E8D8B8]/60 border border-[#C69A45]/40 transition-all shadow-sm"
                  title={t.printEstimate}
                >
                  <Printer className="w-3.5 h-3.5 text-[#C69A45]" />
                  <span className="hidden sm:inline">{t.printEstimate}</span>
                </button>
              </>
            )}

            {/* Instant Bilingual Language Switcher Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#FAFAF7] border border-[#E8E4DA] shadow-inner">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-heading font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-[#0B1B35] text-white shadow-sm'
                    : 'text-[#172033]/70 hover:text-[#0B1B35]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-heading font-bold transition-all ${
                  lang === 'hi'
                    ? 'bg-[#C69A45] text-white shadow-sm'
                    : 'text-[#172033]/70 hover:text-[#0B1B35]'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
