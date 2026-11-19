import React, { forwardRef } from 'react';

/**
 * ConstructionText Component
 * Renders "CIVIL CONSTRUCTION" below RAMASHISH
 * Requirements:
 * - Smaller uppercase letters in deep navy-blue (#071D3B)
 * - Wide letter spacing (tracking-[0.32em])
 * - Thin golden horizontal lines on both sides (#D9A126 / #F3CF76)
 * - Specular light glint sweep
 */
const ConstructionText = forwardRef(function ConstructionText({ className = '' }, ref) {
  const chars = "CIVIL CONSTRUCTION".split("");

  return (
    <div
      ref={ref}
      className={`relative mt-2.5 sm:mt-3 w-full max-w-xl select-none mx-auto ${className}`}
    >
      {/* Main Text Container */}
      <div className="relative overflow-hidden py-1">
        {/* Light glint sweep across CIVIL CONSTRUCTION */}
        <div
          className="civil-text-sweep absolute inset-0 pointer-events-none opacity-0 z-20"
          style={{
            background:
              'linear-gradient(90deg, transparent 20%, rgba(255, 255, 255, 0.85) 50%, transparent 80%)',
            transform: 'translateX(-100%)',
          }}
        />

        <div
          className="civil-heading flex items-center justify-center gap-3 sm:gap-4 font-black text-xs sm:text-base md:text-lg lg:text-xl tracking-[0.24em] sm:tracking-[0.32em] md:tracking-[0.38em] uppercase text-[#071D3B]"
          style={{
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {/* Left Flanking Gold Accent Line */}
          <span className="civil-baseline-line w-6 sm:w-12 md:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D9A126] to-[#F3CF76] rounded-full shrink-0 origin-right scale-x-0" />

          <div className="flex items-center">
            {chars.map((char, index) => (
              <span
                key={index}
                className="civil-char inline-block transform-gpu will-change-transform opacity-0 font-extrabold"
                style={{
                  color: '#071D3B',
                  textShadow: '0 1px 2px rgba(7, 29, 59, 0.12)',
                }}
              >
                {char === " " ? "\u00A0\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Right Flanking Gold Accent Line */}
          <span className="civil-baseline-line w-6 sm:w-12 md:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#D9A126] to-[#F3CF76] rounded-full shrink-0 origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
});

export default ConstructionText;
