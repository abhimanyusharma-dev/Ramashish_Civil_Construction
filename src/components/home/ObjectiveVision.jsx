import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Eye, CheckCircle2, Layers } from 'lucide-react';

/* ═══════════════════════════════════════════════════
   TEXT SEGMENTS FOR OBJECTIVE & VISION
═══════════════════════════════════════════════════ */
const OBJECTIVE_QUOTE = [
  { text: 'To deliver ' },
  { text: 'dependable', cls: 'text-[#E8C46B] font-black' },
  { text: ' civil construction solutions through ' },
  { text: 'practical planning', cls: 'text-[#E8C46B] font-black' },
  { text: ', ' },
  { text: 'quality workmanship', cls: 'text-[#E8C46B] font-black' },
  { text: ', and ' },
  { text: 'responsible project execution', cls: 'text-[#E8C46B] font-black' },
  { text: '.' },
];

const OBJECTIVE_DESC = [
  { text: 'We believe that every structure begins with honest soil assessments, transparent Bills of Quantities, and rigorous daily supervision of M20/M25 concrete grades.' }
];

const VISION_QUOTE = [
  { text: 'To build ' },
  { text: 'lasting structures', cls: 'text-[#E8C46B] font-black' },
  { text: ' and ' },
  { text: 'long-term relationships', cls: 'text-[#E8C46B] font-black' },
  { text: ' through experience, ' },
  { text: 'integrity', cls: 'text-[#E8C46B] font-black' },
  { text: ', and attention to ' },
  { text: 'construction quality', cls: 'text-[#E8C46B] font-black' },
  { text: '.' },
];

const VISION_DESC = [
  { text: 'Building not just physical structures, but an unshakable reputation for structural integrity, client transparency, and architectural longevity.' }
];

/* ═══════════════════════════════════════════════════
   TYPEWRITER COMPONENT (Typing letters style)
═══════════════════════════════════════════════════ */
function TypewriterText({ segments, inView, speed = 20, delay = 200, minHeightClass = '' }) {
  const totalChars = segments.reduce((sum, s) => sum + s.text.length, 0);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedCount((prev) => {
          if (prev >= totalChars) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, totalChars, speed, delay]);

  let remaining = typedCount;

  return (
    <div className={`relative ${minHeightClass}`}>
      {segments.map((seg, i) => {
        if (remaining <= 0) return null;
        const take = Math.min(remaining, seg.text.length);
        remaining -= take;
        return (
          <span key={i} className={seg.cls || ''}>
            {seg.text.slice(0, take)}
          </span>
        );
      })}
      {typedCount < totalChars && inView && (
        <span className="inline-block w-[2px] h-[0.95em] bg-[#E8C46B] align-baseline ml-0.5 animate-pulse" />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   COMPACT PILL
═══════════════════════════════════════════════════ */
function Pill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#C99A32]/40 bg-[#C99A32]/10 text-[#E8C46B] text-[9px] font-mono tracking-wider uppercase font-bold">
      <Icon className="w-2.5 h-2.5 shrink-0" />
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT — REDUCED 50% IN SIZE & TYPING EFFECT
═══════════════════════════════════════════════════ */
export default function ObjectiveVision() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px 0px' });

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="py-10 sm:py-12 lg:py-14 bg-[#071B36] text-white relative overflow-hidden border-b border-[#0B254A]"
    >
      {/* Background blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {/* Subtle ambient glows (scaled down) */}
      <div className="absolute top-[-50px] right-[-50px] w-72 h-72 bg-[#C99A32]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-72 h-72 bg-[#1B4F8A]/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ══ COMPACT SECTION HEADER (Reduced 50%) ══ */}
        <div className="mb-6 sm:mb-8">
          {/* Mono tag row */}
          <div className="flex items-center gap-2 mb-2">
            <span className="block w-6 h-[1.5px] bg-[#C99A32] shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#E8C46B] font-bold uppercase">
              Guiding Civil Principles
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            {/* Heading */}
            <div>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-[1.8rem] font-black tracking-tight leading-tight text-white">
                OBJECTIVE & <span className="text-[#E8C46B]">STRATEGIC VISION.</span>
              </h2>
              <div className="w-48 h-[2px] bg-gradient-to-r from-[#C99A32] to-transparent mt-1.5 rounded-full" />
            </div>

            {/* Right descriptor */}
            <p className="text-white/60 text-xs sm:text-[13px] max-w-sm font-sans leading-relaxed border-l-2 border-[#C99A32]/40 pl-3">
              Founded on engineering discipline and personal accountability. Practical on-site leadership guides every project we undertake.
            </p>
          </div>
        </div>

        {/* ══ COMPACT 2-CARD GRID (Reduced 50% with Typing Effect) ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">

          {/* ─── CARD 1: CORE OBJECTIVE ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-gradient-to-br from-[#0D2244] via-[#0A1A36] to-[#051326]
              border border-[#C99A32]/30 rounded-xl overflow-hidden shadow-xl h-full
              hover:border-[#C99A32]/60 hover:shadow-[0_0_40px_rgba(201,154,50,0.12)]
              transition-colors duration-400"
          >
            {/* Gold top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C99A32] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C99A32]/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#C99A32]/40 pointer-events-none" />

            <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C99A32]/15 border border-[#C99A32]/35 flex items-center justify-center text-[#C99A32] shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-heading font-black text-[10px] tracking-[0.2em] text-[#E8C46B] uppercase block">
                        Our Core Objective
                      </span>
                      <span className="font-mono text-[8px] text-white/40 tracking-wider uppercase">
                        Civil · Mission Statement
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-white/40 tracking-wider">
                    REF // OBJ-01
                  </span>
                </div>

                {/* Quote (Typewriter letter-by-letter style) */}
                <div className="font-heading font-bold text-sm sm:text-base text-white leading-snug">
                  <span className="text-[#E8C46B] text-base mr-1">&ldquo;</span>
                  <TypewriterText
                    segments={OBJECTIVE_QUOTE}
                    inView={inView}
                    speed={20}
                    delay={250}
                    minHeightClass="min-h-[3.6rem] sm:min-h-[3.8rem]"
                  />
                  <span className="text-[#E8C46B] text-base ml-0.5">&rdquo;</span>
                </div>

                {/* Subtext description (Typewriter letter-by-letter style) */}
                <div className="text-[11px] sm:text-xs text-white/60 font-sans leading-relaxed mt-2.5">
                  <TypewriterText
                    segments={OBJECTIVE_DESC}
                    inView={inView}
                    speed={13}
                    delay={1300}
                    minHeightClass="min-h-[2.4rem] sm:min-h-[2.6rem]"
                  />
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <Pill icon={CheckCircle2} label="Practical Site Execution" />
                <span className="text-[#E8C46B] font-bold font-mono text-[10px]">
                  100% On-Site Oversight
                </span>
              </div>
            </div>
          </motion.div>

          {/* ─── CARD 2: STRATEGIC VISION ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-gradient-to-br from-[#0D2244] via-[#0A1A36] to-[#051326]
              border border-[#C99A32]/30 rounded-xl overflow-hidden shadow-xl h-full
              hover:border-[#C99A32]/60 hover:shadow-[0_0_40px_rgba(201,154,50,0.12)]
              transition-colors duration-400"
          >
            {/* Gold top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C99A32] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C99A32]/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#C99A32]/40 pointer-events-none" />

            <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C99A32]/15 border border-[#C99A32]/35 flex items-center justify-center text-[#C99A32] shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-heading font-black text-[10px] tracking-[0.2em] text-[#E8C46B] uppercase block">
                        Our Enduring Vision
                      </span>
                      <span className="font-mono text-[8px] text-white/40 tracking-wider uppercase">
                        Civil · Long-Term Commitment
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-white/40 tracking-wider">
                    REF // VIS-02
                  </span>
                </div>

                {/* Quote (Typewriter letter-by-letter style) */}
                <div className="font-heading font-bold text-sm sm:text-base text-white leading-snug">
                  <span className="text-[#E8C46B] text-base mr-1">&ldquo;</span>
                  <TypewriterText
                    segments={VISION_QUOTE}
                    inView={inView}
                    speed={20}
                    delay={350}
                    minHeightClass="min-h-[3.6rem] sm:min-h-[3.8rem]"
                  />
                  <span className="text-[#E8C46B] text-base ml-0.5">&rdquo;</span>
                </div>

                {/* Subtext description (Typewriter letter-by-letter style) */}
                <div className="text-[11px] sm:text-xs text-white/60 font-sans leading-relaxed mt-2.5">
                  <TypewriterText
                    segments={VISION_DESC}
                    inView={inView}
                    speed={13}
                    delay={1400}
                    minHeightClass="min-h-[2.4rem] sm:min-h-[2.6rem]"
                  />
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <Pill icon={Layers} label="Structural Integrity" />
                <span className="text-[#E8C46B] font-bold font-mono text-[10px]">
                  Generations of Trust
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══ COMPACT STAT STRIP (Reduced 50%) ══ */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {[
            { val: '25+',  label: 'Years On Ground'    },
            { val: '150+', label: 'Projects Delivered'  },
            { val: 'M25',  label: 'Concrete Grade'      },
            { val: '100%', label: 'Site-Supervised'     },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="bg-[#051326] px-3 py-2.5 sm:py-3 text-center group hover:bg-[#0D2244] transition-colors duration-300 cursor-default"
            >
              <div className="font-heading font-black text-lg sm:text-xl text-[#C99A32] group-hover:text-[#E8C46B] transition-colors duration-300">
                {val}
              </div>
              <div className="font-mono text-[8px] tracking-[0.18em] text-white/40 uppercase mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
