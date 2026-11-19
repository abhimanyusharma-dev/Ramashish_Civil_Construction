import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Home,
  Building2,
  Layers,
  Hammer,
  Droplets,
  HardHat,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { services } from '../../data/services';
import Button from '../ui/Button';

// Icon map matching flyer services order: Residential, Commercial, RCC, Renovation, Other Civil
const SERVICE_ICONS = [Home, Building2, Layers, HardHat, Droplets];

/**
 * Two-line typewriter for the section main heading.
 * Line 1 types first, then line 2 starts.
 */
function TypewriterSectionHeading() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const line1 = 'Our Services Designed';
  const line2 = 'To Build Your Dreams.';
  const total = line1.length + line2.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setCount((p) => {
          if (p >= total) { clearInterval(iv); return p; }
          return p + 1;
        });
      }, 38);
      return () => clearInterval(iv);
    }, 100);
    return () => clearTimeout(t);
  }, [inView, total]);

  const typed1 = line1.slice(0, Math.min(count, line1.length));
  const typed2 = count > line1.length ? line2.slice(0, count - line1.length) : '';
  const isTyping = inView && count < total;

  return (
    <h2
      ref={ref}
      className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071B36] leading-[1.12]"
    >
      {typed1}
      {isTyping && count <= line1.length && (
        <span className="inline-block w-[3px] h-[0.85em] bg-[#071B36] ml-0.5 align-baseline animate-pulse" />
      )}
      <br />
      <span className="text-gold-gradient">
        {typed2}
        {isTyping && count > line1.length && (
          <span className="inline-block w-[3px] h-[0.85em] bg-[#C99A32] ml-0.5 align-baseline animate-pulse" />
        )}
      </span>
    </h2>
  );
}

/**
 * Subtitle where each word slides in from the right, one after another.
 */
function SlideInSubtitle({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const words = text.split(' ');

  return (
    <p ref={ref} className="text-[#5A6573] text-[1rem] sm:text-[1.2rem] max-w-md font-sans leading-relaxed flex flex-wrap gap-x-[0.3em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

/**
 * Service heading with bold Recursive font, dark green color (#09412B),
 * underline, 15% increased size, and letter-by-letter typing animation.
 */
function TypewriterServiceHeading({ text, isFeatured = false }) {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: '-50px 0px' });
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedCount((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 35);
      return () => clearInterval(interval);
    }, 150);
    return () => clearTimeout(timeout);
  }, [isInView, text]);

  const isTyping = isInView && typedCount < text.length;

  return (
    <h3
      ref={headingRef}
      className={`font-recursive font-black text-[#09412B] tracking-tight ${
        isFeatured
          ? 'text-[1.75rem] sm:text-[2.15rem] mb-3'
          : 'text-[1.45rem] sm:text-[1.75rem] mb-2'
      }`}
    >
      <span className="underline underline-offset-8 decoration-[#09412B] decoration-2">
        {text.slice(0, typedCount)}
      </span>
      {isTyping && (
        <span className="inline-block w-[2.5px] h-[0.85em] bg-[#09412B] ml-1 align-baseline animate-pulse" />
      )}
    </h3>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  // Featured service is Residential Construction (01)
  const featured = services[0];
  const supportingServices = services.slice(1);

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 lg:py-32 bg-[#F7F7F5]/40 relative overflow-hidden border-b border-[#E8E4DA]"
    >
      {/* Blueprint grid subtle pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-6 border-b border-[#E8E4DA] pb-4">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#C99A32] font-bold uppercase mb-3">
              <span className="w-8 h-[2px] bg-[#C99A32]" />
              [ 04 // CORE CAPABILITIES ]
            </div>
            <TypewriterSectionHeading />
          </div>
          <SlideInSubtitle text="Every category executed under direct contractor supervision with certified structural materials and zero shortcuts." />
        </div>

        {/* Featured Showcase: SERVICE 01 - Residential Construction */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 rounded-3xl bg-white border border-[#E8E4DA] shadow-xl overflow-hidden group hover:border-[#C99A32] transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Featured Image (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] overflow-hidden bg-[#071B36]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/90 via-[#071B36]/30 to-transparent" />

              {/* Top Corner Badge */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#09412B] text-white font-mono text-xs font-black tracking-wider uppercase shadow-md">
                  FEATURED CAPABILITY // 01
                </span>
              </div>

              {/* Bottom Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono text-[#E8C46B] font-bold">
                  TURNKEY BUNGALOWS & VILLAS
                </span>
                <h4 className="font-heading text-xl sm:text-2xl font-black text-white">
                  Modern Residential Architecture in Bhopal
                </h4>
              </div>
            </div>

            {/* Right: Featured Content Details (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-[#09412B]">
                      01
                    </span>
                    <span className="font-mono text-xs text-[#09412B] font-bold tracking-widest uppercase">
                      SERVICE CODE // RES-01
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#F7F7F5] border border-[#09412B]/30 flex items-center justify-center text-[#09412B] shadow-sm">
                    <Home className="w-5 h-5" />
                  </div>
                </div>

                <TypewriterServiceHeading text={featured.title} isFeatured={true} />

                <p className="text-[1rem] text-[#5A6573] leading-relaxed font-sans mb-6">
                  {featured.description}
                </p>

                {/* Scope Points */}
                <div className="space-y-2.5 border-t border-[#E8E4DA] pt-4">
                  <span className="text-[0.875rem] font-mono uppercase text-[#071B36] font-bold block mb-2">
                    Scope of Execution:
                  </span>
                  {(featured.features || featured.points || []).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[0.875rem] sm:text-[1rem] text-[#071B36] font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#09412B] shrink-0 mt-0.5" />
                      <span className="bg-[#09412B]/[0.07] px-1.5 py-0.5 rounded">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E4DA] flex items-center justify-between">
                <Button
                  href="/#contact"
                  size="sm"
                  className="!bg-[#4C2A6B] hover:!bg-[#5C3480] !text-white border border-[#6B3FA0]/50 shadow-md shadow-[#4C2A6B]/20 font-heading font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Request Free Quote
                </Button>
                <span className="text-xs font-mono text-[#5A6573]">
                  Bhopal & Greater MP
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting Services: Alternating Editorial Rows (02 – 05) */}
        <div className="space-y-6">
          {supportingServices.map((service, index) => {
            const Icon = SERVICE_ICONS[index + 1] || Layers;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * (index + 1) }}
                className="rounded-2xl bg-white border border-[#E8E4DA] shadow-lg overflow-hidden group hover:border-[#C99A32] transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Service Image (5 cols) */}
                  <div className={`lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] overflow-hidden bg-[#071B36] ${isEven ? 'lg:order-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded bg-[#071B36]/90 border border-[#C99A32]/40 text-[#E8C46B] font-mono text-[10px] font-bold tracking-wider uppercase">
                        {service.id.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Service Text (7 cols) */}
                  <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between ${isEven ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading font-black text-2xl sm:text-3xl text-[#09412B]">
                          0{index + 2}
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-[#F7F7F5] border border-[#09412B]/30 flex items-center justify-center text-[#09412B]">
                          <Icon className="w-4 h-4 text-[#09412B]" />
                        </div>
                      </div>

                      <TypewriterServiceHeading text={service.title} isFeatured={false} />

                      <p className="text-[0.875rem] sm:text-[1rem] text-[#5A6573] leading-relaxed mb-4">
                        {service.shortDescription || service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#E8E4DA]">
                        {(service.features || service.points || []).slice(0, 4).map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-1.5 text-[0.875rem] text-[#071B36] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#09412B] shrink-0" />
                            <span className="truncate bg-[#09412B]/[0.07] px-1.5 py-0.5 rounded">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-[0.875rem] font-mono">
                      <span className="text-[#071B36] font-bold">100% On-Site Supervision</span>
                      <Button
                        href="/#contact"
                        size="sm"
                        className="!bg-[#4C2A6B] hover:!bg-[#5C3480] !text-white border border-[#6B3FA0]/50 shadow-md shadow-[#4C2A6B]/20 font-heading font-bold uppercase tracking-wider transition-all duration-300"
                      >
                        Request Free Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
