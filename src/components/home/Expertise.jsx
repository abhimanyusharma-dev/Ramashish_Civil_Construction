import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Layers,
  HardHat,
  Compass,
  Activity,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from 'lucide-react';

const EXPERTISE_AREAS = [
  {
    id: 'planning',
    step: '01',
    title: 'Construction Planning',
    shortTitle: 'Planning',
    icon: Compass,
    technicalCode: 'SPEC // 01-PLN',
    description: (
      <>
        Comprehensive <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">structural load calculations</span>,{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">blueprint zoning</span>, elevation feasibility, and{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">municipal compliance</span> in Bhopal.
      </>
    ),
    specs: [
      'Soil Bearing Capacity Analysis',
      'Load Transfer Vector Calculations',
      'Milestone Gantt Scheduling',
    ],
  },
  {
    id: 'supervision',
    step: '02',
    title: 'Site Supervision',
    shortTitle: 'Supervision',
    icon: HardHat,
    technicalCode: 'SPEC // 02-SUP',
    description: (
      <>
        Direct <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">on-site engineering oversight</span> on every casting,{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">column plumblines</span>, rebar spacing, and{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">formwork stability</span>.
      </>
    ),
    specs: [
      'Daily Slump & Mix Audits',
      'Plumbline Alignment Checks',
      'Safety Rigging Protocols',
    ],
  },
  {
    id: 'rcc',
    step: '03',
    title: 'RCC & Structural Work',
    shortTitle: 'RCC Structure',
    icon: Layers,
    technicalCode: 'SPEC // 03-RCC',
    description: (
      <>
        Heavy reinforced cement concrete execution:{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">Raft footings</span>, cantilever beams, column grids, and{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">monolithic slab pours</span>.
      </>
    ),
    specs: [
      'High-Grade M25/M30 Concrete',
      'Fe-550 TMT Rebar Framework',
      'Precision Shuttering Alignment',
    ],
  },
  {
    id: 'material',
    step: '04',
    title: 'Material Management',
    shortTitle: 'Materials',
    icon: ShieldCheck,
    technicalCode: 'SPEC // 04-MAT',
    description: (
      <>
        Uncompromising <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">raw material verification</span>: branded cement, graded washed river sand, clean coarse aggregate, and{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">anti-corrosive steel</span>.
      </>
    ),
    specs: [
      'Lab Certified Cement Batches',
      'Specific Gravity Aggregate Testing',
      'Zero-Contamination Storage',
    ],
  },
  {
    id: 'execution',
    step: '05',
    title: 'Construction Execution',
    shortTitle: 'Execution',
    icon: Activity,
    technicalCode: 'SPEC // 05-EXE',
    description: (
      <>
        Flawless <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">phase-by-phase execution</span> from deep earthwork excavation to{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">brick masonry</span>, internal plastering, and{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">waterproofing</span>.
      </>
    ),
    specs: [
      'Sequential Shuttering Striking',
      'Precision Expansion Jointing',
      'Integrated Conduit Embedding',
    ],
  },
  {
    id: 'quality',
    step: '06',
    title: 'Quality Inspection',
    shortTitle: 'Quality Audit',
    icon: CheckCircle2,
    technicalCode: 'SPEC // 06-QLT',
    description: (
      <>
        Rigorous <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">21-day water curing regimes</span>,{' '}
        <span className="bg-[#C99A32]/15 text-[#071B36] font-bold px-1 py-0.5 rounded">compressive strength cube testing</span>, and non-destructive structural checks.
      </>
    ),
    specs: [
      '28-Day Cube Compression Audit',
      'Impermeability Slurry Checks',
      'Zero Tolerance Deflection',
    ],
  },
];

const TYPEWRITER_TEXT =
  'Every millimeter is calculated. Explore our structural engineering framework, certified concrete execution, and rigorous quality standards.';

function useTypewriter(text, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [inView, text, speed]);

  return { displayed, ref };
}

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const { displayed: typedText, ref: typeRef } = useTypewriter(TYPEWRITER_TEXT);

  const total = EXPERTISE_AREAS.length;
  const currentArea = EXPERTISE_AREAS[activeIndex];
  const CurrentIcon = currentArea.icon;

  // Auto-rotation timer: moves one-by-one every 3.8s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Rotation angle in degrees: advances by -60deg for each step so active node smoothly takes the top/focal spot
  const rotationAngle = -activeIndex * (360 / total);

  // Orbit radius in pixels
  const orbitRadius = 240;

  return (
    <section
      ref={containerRef}
      id="expertise"
      className="pt-6 sm:pt-8 pb-16 lg:pb-20 bg-[#F7F7F5]/40 relative overflow-hidden border-b border-[#E8E4DA]"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 blueprint-grid-dense opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-6 border-b border-[#E8E4DA] pb-3">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#C99A32] font-bold uppercase mb-2">
              <span className="w-8 h-[2px] bg-[#C99A32]" />
              [ 04 // ENGINEERING BLUEPRINT ]
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gold-gradient leading-[1.08]">
              Driven By Precision.
            </h2>
          </div>
          {/* Shifted text slightly down to avoid any overlap */}
          <p ref={typeRef} className="text-[#5A6573] text-[15.4px] sm:text-[17.6px] max-w-md font-sans leading-relaxed pt-2 md:pt-4">
            {typedText}
            <span className="inline-block w-0.5 h-[1.1em] bg-[#C99A32] ml-0.5 align-middle animate-pulse" />
          </p>
        </div>

        {/* ── Circular Rotational Arena (Centered) ── */}
        <div
          className="relative mx-auto flex items-center justify-center -mt-2 sm:-mt-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Responsive Scaling Wrapper — calibrated dimensions ensuring clear space between 6 surrounding points and the central box */}
          <div className="relative w-[440px] h-[440px] sm:w-[660px] sm:h-[660px] lg:w-[800px] lg:h-[800px] flex items-center justify-center">

            {/* Ambient Background Glow Behind the Circle */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#C99A32]/10 via-[#071B36]/5 to-transparent blur-2xl pointer-events-none" />

            {/* Concentric Blueprint Compass Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C99A32]/30 pointer-events-none" />
            <div className="absolute inset-8 sm:inset-12 rounded-full border border-[#071B36]/10 pointer-events-none" />
            <div className="absolute inset-16 sm:inset-24 rounded-full border border-dashed border-[#C99A32]/20 pointer-events-none" />

            {/* Crosshair Cardinal Lines */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-[#C99A32]/20 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-dashed border-[#C99A32]/20 pointer-events-none" />

            {/* ── Rotating Orbit Track with 6 Nodes (z-20 layer ensuring points are never covered under center box) ── */}
            <motion.div
              animate={{ rotate: rotationAngle }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full pointer-events-none z-20"
            >
              {EXPERTISE_AREAS.map((area, idx) => {
                const angleDeg = idx * (360 / total) - 90; // Start at top (-90deg)
                const angleRad = (angleDeg * Math.PI) / 180;
                const isSelected = activeIndex === idx;
                const Icon = area.icon;

                return (
                  <div
                    key={area.id}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `calc(50% + ${Math.cos(angleRad) * 46}%)`,
                      top: `calc(50% + ${Math.sin(angleRad) * 39}%)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Counter-rotate each node so content stays 100% upright and readable */}
                    <motion.div
                      animate={{ rotate: -rotationAngle }}
                      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        onClick={() => setActiveIndex(idx)}
                        className={`group relative flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg bg-[#09412B] text-white border-2 ${
                          isSelected
                            ? 'border-[#C99A32] shadow-xl shadow-[#09412B]/40 scale-105 sm:scale-110 ring-2 ring-[#C99A32]/40'
                            : 'border-[#C99A32]/50 hover:border-[#C99A32] hover:scale-105'
                        }`}
                        title={area.title}
                      >
                        {/* Step Number Dot */}
                        <span
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#C99A32] text-[#071B36]'
                              : 'bg-[#C99A32]/20 text-[#C99A32]'
                          }`}
                        >
                          {area.step}
                        </span>

                        {/* Icon */}
                        <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#E8C46B]" />

                        {/* Label */}
                        <span className="hidden sm:inline-block font-heading text-xs sm:text-sm font-bold whitespace-nowrap text-white">
                          {area.shortTitle}
                        </span>

                        {/* Active Pulse Ring */}
                        {isSelected && (
                          <span className="absolute -inset-1.5 rounded-2xl border-2 border-[#C99A32] animate-ping opacity-40 pointer-events-none" />
                        )}
                      </button>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* ── Central Focal Card (Stationary in Center) — Exact Box Dimensions Preserved ── */}
            <div className="relative z-10 w-[240px] sm:w-[320px] lg:w-[350px] p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#C99A32]/60 shadow-2xl shadow-[#071B36]/20 text-center flex flex-col items-center justify-between min-h-[220px] sm:min-h-[290px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentArea.id}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Top Badges (+15% font) */}
                  <div className="flex items-center justify-between w-full mb-2 pb-1.5 border-b border-[#E8E4DA]">
                    <span className="px-2 py-0.5 rounded bg-[#071B36] text-[#E8C46B] font-mono text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase">
                      PHASE {currentArea.step} // 06
                    </span>
                    <span className="font-mono text-[10.5px] sm:text-[11.5px] text-[#C99A32] font-bold tracking-wider">
                      {currentArea.technicalCode}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#071B36] border-2 border-[#C99A32] flex items-center justify-center text-[#E8C46B] mb-2 shadow-md shadow-[#071B36]/25">
                    <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Title (+15% font size: 16px->18.4px, 20px->23px) */}
                  <h3 className="font-heading text-[18.4px] sm:text-[23px] font-black text-[#071B36] leading-tight mb-2">
                    {currentArea.title}
                  </h3>

                  {/* Description (+15% font size: 12px->13.8px, 14px->16px) with Highlighted Important Points */}
                  <p className="text-[13.8px] sm:text-[16px] text-[#5A6573] font-sans leading-snug mb-2.5">
                    {currentArea.description}
                  </p>

                  {/* Spec Checkmarks (+15% font size: 8px->9.5px, 9px->11px) with Highlighted Styling */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2 border-t border-[#E8E4DA] w-full">
                    {currentArea.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-md bg-[#09412B]/10 text-[#09412B] font-mono text-[9.5px] sm:text-[11px] font-bold border border-[#09412B]/25 shadow-xs flex items-center gap-1"
                      >
                        <span className="text-[#C99A32] font-black">✓</span> {spec}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Bottom Controls: Step Navigation & Direct Indicators ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-4 border-t border-[#E8E4DA]">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#071B36] text-[#071B36] hover:text-white border border-[#E8E4DA] hover:border-[#C99A32] flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
              aria-label="Previous engineering phase"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Direct Step Indicator Dots */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E4DA] shadow-sm">
              {EXPERTISE_AREAS.map((area, idx) => (
                <button
                  key={area.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 h-2.5 bg-[#C99A32]'
                      : 'w-2.5 h-2.5 bg-[#E8E4DA] hover:bg-[#071B36]/40'
                  }`}
                  aria-label={`Go to ${area.title}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#071B36] text-[#071B36] hover:text-white border border-[#E8E4DA] hover:border-[#C99A32] flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
              aria-label="Next engineering phase"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Auto-rotation status badge */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#5A6573]">
            <RotateCw
              className={`w-3.5 h-3.5 text-[#C99A32] ${
                !isPaused ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '8s' }}
            />
            <span>
              {isPaused ? 'Rotation Paused (Hovered)' : 'Rotating One-by-One'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
