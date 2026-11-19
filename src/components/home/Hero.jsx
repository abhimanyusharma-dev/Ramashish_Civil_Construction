import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, ChevronDown, ShieldCheck, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

// Segments with inline styling — highlights key phrases
const DESC_SEGMENTS = [
  { text: 'With ',           cls: 'text-[#5A6573]' },
  { text: '25+ years of expertise',  cls: 'font-bold text-[#C99A32]' },        // gold highlight
  { text: ', ',              cls: 'text-[#5A6573]' },
  { text: 'RAMASHISH CIVIL CONSTRUCTION', cls: 'font-extrabold text-[#071B36]' }, // bold navy
  { text: ' delivers ',     cls: 'text-[#5A6573]' },
  { text: 'dependable, high-quality construction', cls: 'font-semibold text-[#C99A32]' }, // gold
  { text: ' through ',      cls: 'text-[#5A6573]' },
  { text: 'realistic planning', cls: 'font-semibold text-[#C99A32]' },          // gold
  { text: ', ',              cls: 'text-[#5A6573]' },
  { text: 'skilled craftsmanship', cls: 'font-semibold text-[#C99A32]' },       // gold
  { text: ', and ',          cls: 'text-[#5A6573]' },
  { text: 'reliable site execution', cls: 'font-semibold text-[#C99A32]' },     // gold
  { text: ' on every project in India.', cls: 'text-[#5A6573]' },
];

// Flatten to total char count
const TOTAL_CHARS = DESC_SEGMENTS.reduce((sum, s) => sum + s.text.length, 0);

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [charsTyped, setCharsTyped] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCharsTyped(c => {
          if (c >= TOTAL_CHARS) { clearInterval(interval); return c; }
          return c + 1;
        });
      }, 45); // 45ms per letter — readable but not too fast
      return () => clearInterval(interval);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToProjects = () => {
    navigate('/house-construction-calculator');
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex items-center justify-center pt-28 sm:pt-32 lg:pt-36 pb-4 sm:pb-6 overflow-hidden"
    >
      {/* Blueprint Grid Background with subtle radial fade */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {/* Main Hero Architectural Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-1 sm:py-2 md:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Brand, Headline & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            {/* Main Brand Presentation with Official Emblem & Wide Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
            >
              {/* Official Emblem */}
              <div className="h-12 sm:h-14 md:h-16 w-auto shrink-0 flex items-center justify-start">
                <img
                  src="/images/brand/official-emblem.png"
                  alt="RAMASHISH CIVIL CONSTRUCTION"
                  className="h-full w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(7,27,54,0.18)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Official Wide Wordmark */}
              <div className="h-8 sm:h-9 md:h-10 flex items-center">
                <img
                  src="/images/brand/official-wordmark.png"
                  alt="RAMASHISH CIVIL CONSTRUCTION"
                  className="h-full w-auto max-w-[200px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[380px] object-contain filter drop-shadow-[0_2px_8px_rgba(7,27,54,0.1)]"
                />
              </div>
            </motion.div>

            {/* Main Heading (Building Dreams, Stronger Than It Seems) */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight leading-[1.1]"
            >
              <span className="text-[#071B36] block">
                Building Dreams,
              </span>
              <span className="shimmer-gold block mt-0.5">
                Stronger Than It Seems
              </span>
            </motion.h1>

            {/* Letter-by-letter Typewriter Description with highlighted segments */}
            <p className="text-[#5A6573] text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed min-h-[3.5rem]">
              {(() => {
                let remaining = charsTyped;
                return DESC_SEGMENTS.map((seg, i) => {
                  if (remaining <= 0) return null;
                  const visible = seg.text.slice(0, remaining);
                  remaining -= seg.text.length;
                  return <span key={i} className={seg.cls}>{visible}</span>;
                });
              })()}
              {charsTyped < TOTAL_CHARS && (
                <span className="inline-block w-[2px] h-[1.1em] bg-[#C99A32] align-middle animate-pulse ml-px" />
              )}
            </p>

            {/* Key Civil Strength Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-3 gap-3 pt-1 pb-1 max-w-xl border-y border-[#E8E4DA] py-2"
            >
              <div>
                <span className="font-heading font-black text-xl sm:text-2xl text-[#071B36]">
                  25<span className="text-[#C99A32]">+</span>
                </span>
                <p className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-[#5A6573] mt-0.5">
                  Years Expertise
                </p>
              </div>
              <div className="border-l border-[#E8E4DA] pl-3 sm:pl-4">
                <span className="font-heading font-black text-xl sm:text-2xl text-[#071B36]">
                  150<span className="text-[#C99A32]">+</span>
                </span>
                <p className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-[#5A6573] mt-0.5">
                  Completed Projects
                </p>
              </div>
              <div className="border-l border-[#E8E4DA] pl-3 sm:pl-4">
                <span className="font-heading font-black text-xl sm:text-2xl text-[#C99A32]">
                  98%
                </span>
                <p className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-[#5A6573] mt-0.5">
                  Customer Satisfaction
                </p>
              </div>
            </motion.div>

            {/* Buttons: GET YOUR FREE QUOTATION & Build Cost Calculator (Equal Length & Dark Green Boxes) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 pt-1"
            >
              <button
                onClick={handleScrollToContact}
                className="w-full sm:w-[270px] md:w-[280px] h-[46px] px-4 rounded-lg text-xs sm:text-sm font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#032317] via-[#09412B] to-[#032317] text-white border-2 border-[#C99A32] hover:border-[#E8C46B] shadow-lg shadow-[#032317]/50 hover:shadow-xl hover:shadow-[#09412B]/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-[#E8C46B] group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-white group-hover:text-[#E8C46B] transition-colors">
                  GET YOUR FREE QUOTATION
                </span>
                <ArrowRight className="w-4 h-4 text-[#E8C46B] group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                onClick={handleScrollToProjects}
                className="w-full sm:w-[270px] md:w-[280px] h-[46px] px-4 rounded-lg text-xs sm:text-sm font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#032317] via-[#09412B] to-[#032317] text-white border-2 border-[#C99A32] hover:border-[#E8C46B] shadow-lg shadow-[#032317]/50 hover:shadow-xl hover:shadow-[#09412B]/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-[#E8C46B] group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-white group-hover:text-[#E8C46B] transition-colors">
                  Build Cost Calculator
                </span>
                <ArrowRight className="w-4 h-4 text-[#E8C46B] group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Architectural Hero Video — same border style as About profile card */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-14">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">

              {/* Outer architectural precision frame (matches About card: -inset-3, gold/30) */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#C69A45]/30 rounded-3xl pointer-events-none" />
              {/* Inner precision frame (matches About card: -inset-1, navy/20) */}
              <div className="absolute -inset-1 border border-[#0B1B35]/20 rounded-2xl pointer-events-none" />

              {/* Corner crosshair ticks (matches About card exactly) */}
              <div className="absolute -top-3 -left-3 w-4 h-4 border-t-2 border-l-2 border-[#0B1B35] pointer-events-none z-20" />
              <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b-2 border-r-2 border-[#0B1B35] pointer-events-none z-20" />

              {/* Video card — matches About card: border-2 border-[#0B1B35], rounded-2xl, navy bg, gold inner edge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/3] sm:aspect-[6/5] lg:h-[360px] xl:h-[370px] w-full rounded-2xl overflow-hidden border-2 border-[#0B1B35] shadow-[0_20px_50px_rgba(11,27,53,0.18)] hover:shadow-[0_25px_65px_rgba(11,27,53,0.22),0_0_40px_rgba(198,154,69,0.28)] transition-shadow duration-500 bg-[#0B1B35]"
              >
                {/* Thin metallic gold inner edge (matches About card: inset-0, gold/50) */}
                <div className="absolute inset-0 rounded-2xl border border-[#C69A45]/50 pointer-events-none z-10" />

                {/* Hero Video */}
                <video
                  src="/home_page_front_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
