import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Users, Hammer, Layers, HardHat } from 'lucide-react';
import { company } from '../../data/company';
import Button from '../ui/Button';
import ClientReviewsMarquee from './ClientReviewsMarquee';

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const statements = [
    {
      id: '01',
      number: '01 // HERITAGE',
      prefix: '25+ YEARS OF',
      highlight: 'PRACTICAL EXPERTISE.',
      suffix: '',
      isNavy: false,
      icon: Award,
      detail:
        'Continuous civil engineering and on-site contracting leadership across Bhopal. We know local soil mechanics, black-cotton soil challenges, seismic needs, and municipal guidelines inside out.',
      stat: 'ESTABLISHED',
      statLabel: 'Decades in Field',
    },
    {
      id: '02',
      number: '02 // STANDARDS',
      prefix: '',
      highlight: 'QUALITY-FOCUSED',
      suffix: 'WORKMANSHIP.',
      isNavy: true,
      icon: ShieldCheck,
      detail:
        'Uncompromising concrete grade ratios (M20/M25), certified Fe-550 TMT steel reinforcement, precision formwork alignment, and uninterrupted 21-day water curing regimes for zero structural micro-cracks.',
      stat: '100% RCC',
      statLabel: 'Zero Material Compromise',
    },
    {
      id: '03',
      number: '03 // LEADERSHIP',
      prefix: '',
      highlight: 'EXPERIENCED',
      suffix: 'LEADERSHIP.',
      isNavy: false,
      icon: Users,
      detail:
        'Direct personal oversight by master civil contractor Sandeep Sharma on every casting and milestone. No distant contractors or detached middlemen—every technical decision is governed by experienced engineering authority.',
      stat: '150+ SITES',
      statLabel: 'Personally Supervised',
    },
    {
      id: '04',
      number: '04 // EXPERTISE',
      prefix: 'SKILLED',
      highlight: 'CONSTRUCTION',
      suffix: 'PRACTICES.',
      isNavy: true,
      icon: Hammer,
      detail:
        'Seasoned bar-benders, formwork carpenters, and master masons working in sync. Mechanical needle vibrators, laser leveling, and precision plumb line vertical checks on every single floor.',
      stat: 'ZERO SHORTCUTS',
      statLabel: 'Engineered Precision',
    },
    {
      id: '05',
      number: '05 // INTEGRITY',
      prefix: 'MATERIAL &',
      highlight: 'WORKMANSHIP',
      suffix: 'ATTENTION.',
      isNavy: false,
      icon: Layers,
      detail:
        'Every batch of sand is silt-tested; every truckload of cement comes directly with test certificates. Continuous attention to water-cement ratios and shuttering integrity ensures leak-free slabs.',
      stat: 'IS 456 CODE',
      statLabel: 'Indian Standards Compliant',
    },
    {
      id: '06',
      number: '06 // RELIABILITY',
      prefix: 'RESPONSIBLE',
      highlight: 'PROJECT',
      suffix: 'EXECUTION.',
      isNavy: true,
      icon: HardHat,
      detail:
        'Transparent Bill of Quantities (BOQ), realistic schedule delivery, and zero surprise cost escalations. We build lasting relationships that endure long after handing over the keys to your property.',
      stat: 'ON-TIME',
      statLabel: 'Dependable Handover',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="why-us"
      className="py-24 lg:py-32 bg-white relative overflow-hidden border-b border-[#E8E4DA]"
    >
      {/* Blueprint grid ambient layer */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-3 sm:mb-4 border-b border-[#E8E4DA] pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#C99A32] font-bold uppercase mb-2">
            <span className="w-8 h-[2px] bg-[#C99A32]" />
            [ 07 // CORE PILLARS & CONVICTION ]
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-black italic tracking-tight text-[#071B36] leading-[1.12]">
            Why Clients Choose
            <br />
            <span className="text-gold-gradient">Ramashish Civil Construction</span>
          </h2>
        </div>

        {/* ── Client Testimonials / Reviews Box ── */}
        <ClientReviewsMarquee />

        {/* Large Typography-Driven Statements Stack (Alternating Navy & Ivory Cards) */}
        <div className="space-y-6">
          {statements.map((stmt, idx) => {
            const Icon = stmt.icon;

            return (
              <motion.div
                key={stmt.id}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl p-8 sm:p-10 transition-all duration-300 border shadow-lg ${
                  stmt.isNavy
                    ? 'bg-[#071B36] text-white border-[#C99A32]/50 shadow-[#071B36]/10'
                    : 'bg-[#F7F7F5] text-[#071B36] border-[#E8E4DA]'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left Column: Number and Icon */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center justify-between lg:block">
                      <span
                        className={`font-mono text-xs tracking-widest font-bold block mb-2 ${
                          stmt.isNavy ? 'text-[#E8C46B]' : 'text-[#C99A32]'
                        }`}
                      >
                        {stmt.number}
                      </span>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${
                          stmt.isNavy
                            ? 'bg-[#123B63] border-[#C99A32]/40 text-[#E8C46B]'
                            : 'bg-white border-[#C99A32]/40 text-[#C99A32]'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Oversized Typography Statement */}
                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
                      {stmt.prefix && <span>{stmt.prefix} </span>}
                      <span className="text-gold-gradient">{stmt.highlight}</span>
                      {stmt.suffix && <span> {stmt.suffix}</span>}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm font-sans leading-relaxed ${
                        stmt.isNavy ? 'text-white/80' : 'text-[#5A6573]'
                      }`}
                    >
                      {stmt.detail}
                    </p>
                  </div>

                  {/* Right Column: Key Metric Spec */}
                  <div className="lg:col-span-3 lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-current/10 lg:pl-6">
                    <div
                      className={`font-heading font-black text-2xl sm:text-3xl tracking-tight ${
                        stmt.isNavy ? 'text-[#E8C46B]' : 'text-[#071B36]'
                      }`}
                    >
                      {stmt.stat}
                    </div>
                    <span
                      className={`text-[11px] font-mono tracking-wider block mt-1 ${
                        stmt.isNavy ? 'text-white/60' : 'text-[#5A6573]'
                      }`}
                    >
                      {stmt.statLabel}
                    </span>
                  </div>
                </div>

                <div
                  className={`absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-2 border-r-2 rounded-tr-2xl ${
                    stmt.isNavy ? 'border-[#C99A32]' : 'border-[#C99A32]/60'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-[#071B36] text-white border border-[#C99A32]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C99A32]/20 border border-[#C99A32] flex items-center justify-center text-[#E8C46B] shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg sm:text-xl text-white">
                Ready to experience engineering dependability on your project?
              </h4>
              <p className="text-white/70 text-xs sm:text-sm mt-0.5 font-sans">
                Book a direct site consultation with master contractor Sandeep Sharma today.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            href="/#contact"
            icon={ArrowRight}
            className="shrink-0 w-full md:w-auto bg-[#C99A32] hover:bg-[#9E7422] text-white"
          >
            Consult Sandeep Sharma
          </Button>
        </div>
      </div>
    </section>
  );
}
