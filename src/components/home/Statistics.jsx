import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CounterNumber({ target, inView, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    if (!inView || typeof target !== 'number') return;
    startTime.current = null;

    let rafId;
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration]);

  return <span>{count}</span>;
}

export default function Statistics() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px' });

  return (
    <section className="bg-[#F7F7F5]/40 py-4 sm:py-5 lg:py-6 relative overflow-hidden border-y border-border">
      {/* Engineering Drafting Grid Lines */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

      {/* Decorative Technical Ruler Marks on Top */}
      <div className="absolute top-0 left-0 right-0 h-3 border-b border-border flex justify-between px-6 opacity-40 font-mono text-[8px] sm:text-[9px] text-text-secondary select-none pointer-events-none">
        <span>00.00.00 M</span>
        <span>SEC // 02 METRICS</span>
        <span>LAT 23.2599° N</span>
        <span>LONG 77.4126° E</span>
        <span>VERIFIED RECORD</span>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Supertitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 mb-3 sm:mb-4 pt-1"
        >
          <span className="w-6 h-0.5 bg-[#C99A32]" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#C99A32] font-bold">
            EXCELLENCE IN NUMBERS · VERIFIED CIVIL PRACTICE
          </span>
        </motion.div>

        {/* Oversized Editorial Stats Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Stat 01: 25+ YEARS OF EXPERTISE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between group"
          >
            {/* Engineering Coordinate Label */}
            <div className="flex items-center justify-between pb-1.5 border-b border-border mb-2">
              <span className="font-mono text-[10px] sm:text-[11px] text-text-secondary tracking-wider font-semibold">
                [ 01 // LONGEVITY ]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99A32]" />
            </div>

            {/* Giant Number */}
            <div className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#071B36] tracking-tight leading-none">
              <CounterNumber target={25} inView={isInView} />
              <span className="text-[#C99A32] ml-1 font-bold">+</span>
            </div>

            {/* Editorial Title & Supporting Text */}
            <div className="mt-2.5 pt-2 border-t border-[#C99A32]/30">
              <h3 className="font-heading text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#071B36]">
                YEARS OF EXPERTISE
              </h3>
              <p className="text-xs text-text-secondary font-sans mt-1 leading-snug">
                Practicing civil engineering and structural execution continuously under master contractor Sandeep Sharma.
              </p>
            </div>
          </motion.div>

          {/* Stat 02: 150+ COMPLETED PROJECTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between group md:border-l md:border-border md:pl-6 lg:pl-8"
          >
            {/* Engineering Coordinate Label */}
            <div className="flex items-center justify-between pb-1.5 border-b border-border mb-2">
              <span className="font-mono text-[10px] sm:text-[11px] text-text-secondary tracking-wider font-semibold">
                [ 02 // PORTFOLIO ]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99A32]" />
            </div>

            {/* Giant Number */}
            <div className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#071B36] tracking-tight leading-none">
              <CounterNumber target={150} inView={isInView} />
              <span className="text-[#C99A32] ml-1 font-bold">+</span>
            </div>

            {/* Editorial Title & Supporting Text */}
            <div className="mt-2.5 pt-2 border-t border-[#C99A32]/30">
              <h3 className="font-heading text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#071B36]">
                COMPLETED PROJECTS
              </h3>
              <p className="text-xs text-text-secondary font-sans mt-1 leading-snug">
                Independent turnkey villas, commercial plazas, institutional facilities, and heavy RCC foundation contracts.
              </p>
            </div>
          </motion.div>

          {/* Stat 03: BHOPAL, MADHYA PRADESH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between group md:border-l md:border-border md:pl-6 lg:pl-8"
          >
            {/* Engineering Coordinate Label */}
            <div className="flex items-center justify-between pb-1.5 border-b border-border mb-2">
              <span className="font-mono text-[10px] sm:text-[11px] text-text-secondary tracking-wider font-semibold">
                [ 03 // GEOGRAPHY ]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99A32]" />
            </div>

            {/* Giant Typography Label */}
            <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#071B36] tracking-tight leading-[1.05] wrap-break-word">
              INDIA
              <span className="text-[#C99A32] text-lg sm:text-xl lg:text-2xl font-extrabold block mt-1">
                MADHYA PRADESH
              </span>
            </div>

            {/* Editorial Title & Supporting Text */}
            <div className="mt-2.5 pt-2 border-t border-[#C99A32]/30">
              <h3 className="font-heading text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#071B36]">
                WORK AREA
              </h3>
              <p className="text-xs text-text-secondary font-sans mt-1 leading-snug">
                Proven civil contracting, soil mechanics, deep foundations, and structural execution across Madhya Pradesh and project sites in India.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
