import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import SectionHeading from '../common/SectionHeading';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#F8F6F0]/40 relative overflow-hidden border-b border-[#E8E4DA]">
      {/* Blueprint Grid Ambient Layer */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="CLIENT REPUTATION"
          title="TRUST EARNED ACROSS BHOPAL."
          subtitle="Real client satisfaction built over 35 years of dependable delivery, RCC mastery, and structural integrity."
        />

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white border border-[#E8E4DA] rounded-2xl p-8 sm:p-12 shadow-xl relative min-h-[320px] flex flex-col justify-between">
            {/* Golden Corner Accents */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#C99A32] rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#C99A32] rounded-bl-2xl" />

            {/* Background Watermark Quote */}
            <Quote className="w-20 h-20 text-[#C99A32]/10 absolute top-6 right-8 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C99A32] text-[#C99A32]"
                    />
                  ))}
                  <span className="text-xs font-mono text-[#667085] ml-2 font-bold">
                    5.0 Structural Rating
                  </span>
                </div>

                {/* Quote Text */}
                <p className="font-heading text-lg sm:text-2xl text-[#0B2347] font-medium leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Information */}
                <div className="pt-4 border-t border-[#E8E4DA] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#0B2347]">
                      {current.clientName}
                    </h4>
                    <p className="text-xs text-[#C99A32] font-mono font-bold">
                      {current.projectType} · {current.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F6F0] border border-[#E8E4DA] rounded-md text-xs font-mono text-[#0B2347] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A32]" />
                    <span>{current.tag} ({current.year})</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation & Pagination */}
            <div className="pt-8 flex items-center justify-between border-t border-[#E8E4DA] mt-8">
              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      idx === currentIndex
                        ? 'w-8 bg-[#C99A32]'
                        : 'w-2 bg-[#E8E4DA] hover:bg-[#C99A32]/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 bg-[#F8F6F0] hover:bg-[#C99A32] text-[#0B2347] hover:text-white border border-[#E8E4DA] rounded-lg flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-[#F8F6F0] hover:bg-[#C99A32] text-[#0B2347] hover:text-white border border-[#E8E4DA] rounded-lg flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
