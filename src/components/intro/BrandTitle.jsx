import React, { forwardRef } from 'react';

/**
 * BrandTitle Component
 * Renders the prominent brand title "RAMASHISH"
 * Typography Requirements:
 * - Large, bold, uppercase, premium geometric italic typography (Montserrat ExtraBold)
 * - Deep navy-blue letters (#071D3B) with royal blue gradient (#123D68)
 * - Golden triangular accents inside the two 'A' letters (#D9A126 / #F3CF76)
 * - 3D upward perspective flip reveal
 * - Specular metallic golden light sweep
 */
const LETTERS = ['R', 'A', 'M', 'A', 'S', 'H', 'I', 'S', 'H'];

const BrandTitle = forwardRef(function BrandTitle({ className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`relative mt-4 sm:mt-5 select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Specular Golden Light Sweep Beam that moves across RAMASHISH */}
      <div
        className="brand-title-sweep absolute inset-y-0 -inset-x-24 pointer-events-none opacity-0 z-20"
        style={{
          background:
            'linear-gradient(105deg, transparent 25%, rgba(243, 207, 118, 0.85) 50%, transparent 75%)',
          transform: 'translateX(-120%) skewX(-20deg)',
        }}
      />

      {/* Main Letters Row */}
      <h1
        className="relative z-10 flex items-center justify-center font-black italic tracking-[0.08em] sm:tracking-[0.14em] md:tracking-[0.18em] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none"
        style={{
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {LETTERS.map((char, index) => {
          const isA = char === 'A';
          return (
            <span
              key={index}
              className="brand-letter-wrapper relative inline-block overflow-hidden py-1 px-[1.5px] sm:px-[3px]"
            >
              <span
                className="brand-letter relative inline-block transform-gpu will-change-transform opacity-0 font-black italic"
                style={{
                  background:
                    'linear-gradient(180deg, #071D3B 0%, #123D68 60%, #071D3B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter:
                    'drop-shadow(0 3px 6px rgba(7, 29, 59, 0.22)) drop-shadow(0 0 1px #D9A126)',
                  transform: 'translateY(60px) rotateX(45deg)',
                }}
              >
                {char}
                {/* Golden Triangle Accent Inside 'A' */}
                {isA && (
                  <span
                    className="absolute pointer-events-none z-20"
                    style={{
                      left: '32%',
                      bottom: '22%',
                      width: '36%',
                      height: '34%',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      background: 'linear-gradient(180deg, #F3CF76 0%, #D9A126 70%, #9E7422 100%)',
                      boxShadow: '0 0 4px rgba(217, 161, 38, 0.6)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </span>
            </span>
          );
        })}
      </h1>

      {/* Subtle Mirror Floor Shadow */}
      <div
        aria-hidden="true"
        className="brand-reflection absolute left-0 right-0 top-full pt-1 opacity-0 pointer-events-none transform scale-y-[-0.3] blur-[1.5px]"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent 70%)',
        }}
      >
        <div
          className="flex items-center justify-center font-black italic tracking-[0.08em] sm:tracking-[0.14em] md:tracking-[0.18em] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-[#071D3B]/20"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          RAMASHISH
        </div>
      </div>
    </div>
  );
});

export default BrandTitle;
