import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MessageSquare, Award, CheckCircle2, Quote, Shield } from 'lucide-react';
import { company } from '../../data/company';
import Button from '../ui/Button';

export default function OwnerProfile() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const leadershipPrinciples = [
    {
      title: 'Daily Ground Supervision',
      desc: 'Master inspection of every steel cage, formwork plumbline, and concrete pour on site.',
    },
    {
      title: 'Transparent Material BOQ',
      desc: 'Direct factory cement & branded Fe-550 TMT steel with no inflated margins or compromises.',
    },
    {
      title: 'Bhopal Soil Specialization',
      desc: '35 years mastering black-cotton soil deep foundations, moisture barriers, and raft design.',
    },
    {
      title: 'Generations of Client Trust',
      desc: 'Over 30 completed residential & commercial landmarks built on family and business trust.',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="founder"
      className="py-24 lg:py-32 bg-[#0B2347] relative overflow-hidden text-white"
    >
      {/* Blueprint grid on deep navy */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {/* Subtle Golden Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C99A32]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#E8C66D]/10 blur-3xl pointer-events-none" />

      {/* Top Architectural Corner Frame Accents */}
      <svg
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-40 z-0"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M200 0 H80 C120 40 140 100 0 160 V200 C160 140 180 80 200 0 Z" fill="#C99A32" />
        <circle cx="170" cy="30" r="3" fill="#E8C66D" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#E8C66D] font-bold uppercase mb-12"
        >
          <span className="w-8 h-[2px] bg-[#C99A32]" />
          [ 06 // CONTRACTOR PROFILE & LEADERSHIP ]
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Portrait with Golden Frame Drawing (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer Golden Architectural Line Frame */}
              <svg
                className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-20"
                fill="none"
              >
                <motion.rect
                  x="6"
                  y="6"
                  width="calc(100% - 12px)"
                  height="calc(100% - 12px)"
                  rx="18"
                  stroke="#C99A32"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                />
                <motion.line
                  x1="0"
                  y1="50"
                  x2="50"
                  y2="0"
                  stroke="#E8C66D"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>

              {/* Photo Viewport */}
              <motion.div
                initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 }}
                animate={isInView ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#071730] border border-[#C99A32]/60 shadow-2xl"
              >
                {/* Real Uploaded Photo */}
                <img
                  src="/images/owner/sandeep-sharma-office.jpg"
                  alt="Sandeep Sharma — Civil Contractor"
                  className="w-full h-full object-cover filter contrast-105"
                  onError={(e) => {
                    e.target.src = "/images/owner/sandeep-sharma.jpg";
                  }}
                />

                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2347] via-transparent to-transparent opacity-80" />

                {/* Overlaid Title Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#071730]/90 backdrop-blur-md border border-[#C99A32]/50 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E8C66D] font-bold">
                        CIVIL CONTRACTOR
                      </p>
                      <h4 className="font-heading text-lg font-black text-white">
                        Sandeep Sharma
                      </h4>
                      <p className="text-xs text-white/70">
                        Proprietor · Bhopal, MP
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-black text-2xl text-[#C99A32] leading-none block">
                        35+
                      </span>
                      <span className="text-[9px] font-mono text-white/70 uppercase tracking-wider font-bold">
                        Years Exp.
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Oversized Typography & Personal Editorial (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Oversized Typography Header (Exact copy requested) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-1"
            >
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none">
                SANDEEP SHARMA
              </h2>
              <p className="font-heading font-bold text-xl sm:text-2xl text-[#E8C66D] pt-1">
                Founder & Civil Contractor · 35 Years of Experience
              </p>
            </motion.div>

            {/* Personal Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="p-6 rounded-xl bg-[#071730]/80 border-l-4 border-[#C99A32] relative shadow-lg"
            >
              <Quote className="w-8 h-8 text-[#C99A32]/25 absolute top-4 right-4 pointer-events-none" />
              <p className="font-heading text-base sm:text-lg text-white/95 italic leading-relaxed mb-3">
                &ldquo;True civil engineering is not built from an office desk. It is forged on the ground—measuring the aggregate, verifying steel reinforcement ties before casting, and guaranteeing that a structure remains standing strong for generations.&rdquo;
              </p>
              <span className="text-xs font-mono text-[#E8C66D] tracking-widest uppercase font-bold">
                — Sandeep Sharma, Shree Ram Ashish
              </span>
            </motion.div>

            {/* Professional Introduction Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="space-y-3.5 text-white/80 text-sm sm:text-base leading-relaxed font-sans"
            >
              <p>
                Leading civil construction across Bhopal and Madhya Pradesh since 1989, Sandeep Sharma brings three and a half decades of hands-on expertise to every residential bungalow, commercial plaza, and heavy RCC foundation.
              </p>
              <p>
                Known throughout the region for meticulous site discipline, zero material dilution, and personally guaranteeing every square foot of casting.
              </p>
            </motion.div>

            {/* 4 Pillars Grid */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2"
            >
              {leadershipPrinciples.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#071730]/60 border border-white/10 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C99A32] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-heading text-xs font-bold text-white mb-0.5">
                      {pillar.title}
                    </h5>
                    <p className="text-[11px] text-white/70 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Direct Connect Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Button
                variant="primary"
                size="md"
                href="tel:+919827386803"
                icon={Phone}
                iconPosition="left"
                className="bg-[#C99A32] hover:bg-[#A67C22] text-[#0B2347] font-bold"
              >
                Call Directly: 9827386803
              </Button>

              <Button
                variant="whatsapp"
                size="md"
                href="https://wa.me/919827386803?text=Hello%20Sandeep%20ji%2C%20I%20am%20interested%20in%20discussing%20a%20construction%20project."
                icon={MessageSquare}
                iconPosition="left"
              >
                WhatsApp Sandeep Sharma
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
