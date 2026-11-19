import React, { forwardRef } from 'react';

/**
 * TaglineReveal Component
 * Renders the official tagline ribbon:
 * "Building Dreams, Stronger Than It Seems"
 * Requirements:
 * - Slim navy-blue banner (#071D3B to #123D68) with golden borders (#D9A126 / #F3CF76) and white lettering
 * - Golden chevron end-caps
 * - Elegant golden underline with architectural center keystone
 * - Clean, legible typography
 */
const TaglineReveal = forwardRef(function TaglineReveal({ className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`relative mt-3 sm:mt-4 max-w-xl mx-auto text-center select-none ${className}`}
    >
      {/* Slim Navy-Blue Banner with Golden Borders and White Lettering */}
      <div className="tagline-mask-wrapper relative inline-block mx-auto px-1 sm:px-2 py-1">
        <div
          className="tagline-text relative flex items-center justify-center px-6 sm:px-10 py-1.5 sm:py-2 rounded-sm opacity-0 shadow-md"
          style={{
            background: 'linear-gradient(90deg, #071D3B 0%, #123D68 50%, #071D3B 100%)',
            clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 100%, 0% 100%)',
            borderTop: '1.5px solid #F3CF76',
            borderBottom: '1.5px solid #D9A126',
          }}
        >
          {/* Left Angled Gold Cap Accent */}
          <span 
            className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#D9A126] to-[#F3CF76]"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 40% 100%, 0% 100%)' }}
            aria-hidden="true"
          />

          <p
            className="font-bold italic text-xs sm:text-sm md:text-base tracking-[0.06em] sm:tracking-[0.08em] text-white"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
            }}
          >
            Building Dreams, Stronger Than It Seems
          </p>

          {/* Right Angled Gold Cap Accent */}
          <span 
            className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-[#D9A126] to-[#F3CF76]"
            style={{ clipPath: 'polygon(60% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Elegant Golden Underline with Central Diamond Keystone */}
      <div className="tagline-underline-container relative flex items-center justify-center mt-2 px-8 sm:px-16 opacity-0">
        <div className="tagline-line-left flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9A126] to-[#F3CF76] transform origin-right scale-x-0" />
        <div className="tagline-keystone mx-2 sm:mx-3 w-2 h-2 rotate-45 bg-[#D9A126] border border-[#F3CF76] shadow-[0_0_8px_rgba(217,161,38,0.6)] scale-0" />
        <div className="tagline-line-right flex-1 h-[1.5px] bg-gradient-to-r from-[#F3CF76] via-[#D9A126] to-transparent transform origin-left scale-x-0" />
      </div>

      {/* Subtle Ambient Pulse Light */}
      <div className="tagline-pulse-glow absolute -inset-2 bg-[#D9A126]/10 blur-xl rounded-full pointer-events-none opacity-0" />
    </div>
  );
});

export default TaglineReveal;
