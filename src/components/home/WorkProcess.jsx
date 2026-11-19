import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  MessageSquareCheck,
  Search,
  Calculator,
  Hammer,
  ClipboardCheck,
  KeyRound,
} from 'lucide-react';

const LINE1 = 'The journey from Vision to Reality';
const LINE2 = 'Six Phases';

function useProcessTypewriter(inView) {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [phase, setPhase] = useState(0); // 0: typing line 1, 1: typing line 2, 2: completed

  useEffect(() => {
    if (!inView) return;
    setLine1('');
    setLine2('');
    setPhase(0);

    let i1 = 0;
    const speed1 = 28;

    const timer1 = setInterval(() => {
      i1 += 1;
      setLine1(LINE1.slice(0, i1));
      if (i1 >= LINE1.length) {
        clearInterval(timer1);
        setPhase(1);

        let i2 = 0;
        const speed2 = 36;
        const timer2 = setInterval(() => {
          i2 += 1;
          setLine2(LINE2.slice(0, i2));
          if (i2 >= LINE2.length) {
            clearInterval(timer2);
            setPhase(2);
          }
        }, speed2);
      }
    }, speed1);

    return () => clearInterval(timer1);
  }, [inView]);

  return { line1, line2, phase };
}

export default function WorkProcess() {
  const sectionRef = useRef(null);
  const targetRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { line1, line2, phase } = useProcessTypewriter(inView);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-74%']);

  const stages = [
    {
      number: '01',
      title: 'Consultation',
      subtitle: 'Architectural Vision & Scope',
      description: 'In-depth consultation to map your family or commercial vision, plot geometry, room counts, budget parameters, and long-term goals.',
      timeframe: 'Day 1 – 3',
      icon: MessageSquareCheck,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '02',
      title: 'Site Inspection',
      subtitle: 'Soil & Foundation Study',
      description: 'Physical evaluation of soil bearing capacity in Bhopal, black cotton soil depth, natural slope drainage, and road accessibility.',
      timeframe: 'Day 4 – 7',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '03',
      title: 'Planning & Estimation',
      subtitle: 'Transparent BOQ & Engineering',
      description: 'Transparent Bill of Quantities with certified grade cement, Fe-550 TMT tonnage, architectural drawings, and phased payment milestones.',
      timeframe: 'Week 2',
      icon: Calculator,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '04',
      title: 'Construction Execution',
      subtitle: 'Excavation, RCC & Masonry',
      description: 'Deep foundation excavation, raft casting, column shuttering, monolithic slab pours, and precision brickwork under daily contractor supervision.',
      timeframe: 'Core Construction',
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '05',
      title: 'Quality Inspection',
      subtitle: '21-Day Curing & Verification',
      description: 'Compressive cube strength testing, plumb-line vertical alignment, concrete vibration compaction checks, and water ponding curing.',
      timeframe: 'Continuous Audits',
      icon: ClipboardCheck,
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '06',
      title: 'Final Handover',
      subtitle: 'Turnkey Delivery & Celebration',
      description: 'Final walkthrough, comprehensive structural documentation, MEP commissioning, snag rectification, and proud handover of your landmark.',
      timeframe: 'Project Completion',
      icon: KeyRound,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleContactScroll = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <section ref={sectionRef} id="process" className="bg-white/40 border-b border-[#E8E4DA] relative">
      {/* Desktop Horizontal Scroll-Controlled Timeline */}
      <div ref={targetRef} className="hidden lg:block relative h-[280vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-12 px-8 bg-white/40">
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-7xl mx-auto w-full relative z-10 flex items-end justify-between border-b border-[#E8E4DA] pb-6">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#C99A32] font-bold uppercase mb-2">
                <span className="w-8 h-[2px] bg-[#C99A32]" />
                [ 06 // SYSTEMATIC METHODOLOGY ]
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071B36] leading-[1.12]">
                <span className="block min-h-[1.15em]">
                  {line1}
                  {phase === 0 && (
                    <span className="inline-block w-1 h-[0.9em] bg-[#C99A32] ml-1.5 align-middle animate-pulse" />
                  )}
                </span>
                <span className="block text-gold-gradient mt-1 min-h-[1.15em]">
                  {line2}
                  {phase >= 1 && (
                    <span className="inline-block w-1 h-[0.9em] bg-[#C99A32] ml-1.5 align-middle animate-pulse" />
                  )}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#5A6573]">
                SCROLL VERTICALLY TO NAVIGATE STAGES
              </span>
              <div className="w-8 h-[2px] bg-[#C99A32]" />
            </div>
          </div>

          {/* Golden Progress Bar at Top of Timeline */}
          <div className="max-w-7xl mx-auto w-full relative z-10 py-2">
            <div className="h-1 bg-[#E8E4DA] rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
                className="h-full bg-gradient-to-r from-[#C99A32] via-[#E8C46B] to-[#C99A32]"
              />
            </div>
          </div>

          {/* Horizontally Moving Cards Track */}
          <div className="relative z-10 flex items-center overflow-visible my-auto">
            <motion.div style={{ x }} className="flex gap-8 pl-12 pr-32 items-center">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;

                return (
                  <motion.div
                    key={stage.number}
                    initial={{ opacity: 0, y: 60 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.75, delay: 0.2 + idx * 0.13, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[450px] shrink-0 bg-[#F7F7F5] border border-[#E8E4DA] hover:border-[#C99A32] rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between transition-colors transition-shadow duration-300 group hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Top Section: Number (-10% font: 40.5px) + Phase Title in Bold Italic (-10% font: 20.25px/22.5px) on the side + Icon */}
                    <div className="flex items-center justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-heading font-black text-[40.5px] text-[#C99A32] tracking-tight shrink-0 leading-none">
                          {stage.number}
                        </span>
                        <h3 className="font-heading text-[20.25px] sm:text-[22.5px] font-bold italic text-[#071B36] leading-tight">
                          {stage.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#C99A32]/40 flex items-center justify-center text-[#071B36] shadow-sm shrink-0">
                        <Icon className="w-5 h-5 text-[#C99A32]" />
                      </div>
                    </div>

                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-[#E8E4DA] bg-white">
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/70 via-transparent to-transparent pointer-events-none" />
                      {/* Timeframe: -10% font (11.25px) */}
                      <span className="absolute bottom-2.5 left-3 font-mono text-[11.25px] text-white tracking-widest uppercase font-bold">
                        {stage.timeframe}
                      </span>
                    </div>

                    <div>
                      {/* Subtitle: -10% font (11.25px) */}
                      <p className="text-[11.25px] font-mono uppercase tracking-[0.2em] text-[#C99A32] font-bold mb-1.5">
                        {stage.subtitle}
                      </p>
                      {/* Description: -10% font (13.5px) */}
                      <p className="text-[13.5px] text-[#5A6573] leading-relaxed font-sans">
                        {stage.description}
                      </p>
                    </div>

                    {/* Footer: -10% font (13.5px) */}
                    <div className="mt-4 pt-3.5 border-t border-[#E8E4DA] flex items-center justify-between text-[13.5px] font-mono">
                      <span className="text-[#071B36] font-bold">Phase {stage.number} of 06</span>
                      <span className="text-[#C99A32] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Milestone Deliverable →
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Final CTA Button: Get Your Free Consultation in Dark Green Box */}
              <div className="shrink-0 flex items-center justify-center pl-4 pr-12">
                <a
                  href="#contact"
                  onClick={handleContactScroll}
                  className="group relative flex items-center justify-center gap-3.5 px-8 sm:px-10 py-6 sm:py-7 rounded-2xl bg-[#09412B] text-white border-2 border-[#C99A32] shadow-2xl hover:bg-[#0d5438] hover:scale-105 active:scale-95 transition-all duration-300 font-heading font-bold italic text-xl sm:text-2xl tracking-wide text-center shadow-[#09412B]/50 cursor-pointer"
                >
                  <span>Get Your Free Consultation</span>
                  <span className="w-8 h-8 rounded-full bg-[#C99A32] text-[#071B36] flex items-center justify-center font-bold text-base group-hover:translate-x-1.5 transition-transform shrink-0">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center justify-between pt-4 border-t border-[#E8E4DA] text-xs font-mono text-[#5A6573]">
            <span>VERIFIED ON-SITE WORKFLOW · ZERO SHORTCUTS</span>
            <span className="text-[#C99A32] font-bold">RAMASHISH CIVIL PROTOCOL</span>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Fallback: Responsive Vertical Timeline */}
      <div className="lg:hidden py-20 px-4 sm:px-6 relative">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 border-b border-[#E8E4DA] pb-6">
            <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#C99A32] font-bold uppercase mb-2">
              <span className="w-8 h-[2px] bg-[#C99A32]" />
              [ 06 // SYSTEMATIC METHODOLOGY ]
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-[#071B36] leading-[1.15]">
              <span className="block min-h-[1.15em]">
                {line1}
                {phase === 0 && (
                  <span className="inline-block w-0.5 h-[0.9em] bg-[#C99A32] ml-1 align-middle animate-pulse" />
                )}
              </span>
              <span className="block text-gold-gradient mt-1 min-h-[1.15em]">
                {line2}
                {phase >= 1 && (
                  <span className="inline-block w-0.5 h-[0.9em] bg-[#C99A32] ml-1 align-middle animate-pulse" />
                )}
              </span>
            </h2>
            <p className="text-xs text-[#5A6573] mt-2">
              Our 6-phase engineering workflow tested and proven on every construction milestone.
            </p>
          </div>

          <div className="relative border-l-2 border-[#C99A32]/40 ml-4 pl-6 space-y-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;

              return (
                <motion.div
                  key={stage.number}
                  initial={{ opacity: 0, x: -60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#071B36] border-2 border-[#C99A32] flex items-center justify-center text-[10px] font-mono text-[#E8C46B] font-bold">
                    {stage.number}
                  </div>

                  <div className="bg-[#F7F7F5] border border-[#E8E4DA] rounded-xl p-5 shadow-md">
                    {/* Top Section with Number and Title in bold italic font (-10% font) */}
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-heading font-black text-[27px] text-[#C99A32] leading-none">
                          {stage.number}
                        </span>
                        <h3 className="font-heading text-[18px] sm:text-[20.25px] font-bold italic text-[#071B36] leading-tight">
                          {stage.title}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#C99A32]/40 flex items-center justify-center text-[#071B36] shadow-sm shrink-0">
                        <Icon className="w-4 h-4 text-[#C99A32]" />
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3 bg-white">
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-[#071B36]/80 text-white font-mono text-[10px]">
                        {stage.timeframe}
                      </span>
                    </div>

                    <p className="text-[11.25px] font-mono uppercase tracking-wider text-[#C99A32] font-bold mb-1">
                      {stage.subtitle}
                    </p>
                    <p className="text-[13.5px] text-[#5A6573] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile CTA Button */}
          <div className="pt-8 text-center">
            <a
              href="#contact"
              onClick={handleContactScroll}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#09412B] text-white border-2 border-[#C99A32] font-heading font-bold italic text-base shadow-xl hover:bg-[#0d5438] active:scale-95 transition-all shadow-[#09412B]/40"
            >
              <span>Get Your Free Consultation</span>
              <span className="w-6 h-6 rounded-full bg-[#C99A32] text-[#071B36] flex items-center justify-center font-bold text-xs">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
