import React from 'react';

/**
 * Architectural decorative golden corner arcs inspired by Reference Image 3.
 * Renders smooth metallic gold ribbons with navy blue accent strokes.
 */
export function ArchitecturalTopLeftCorner({ className = "w-44 h-44 sm:w-56 sm:h-56", opacity = 1 }) {
  return (
    <div 
      className={`absolute top-0 left-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 240" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="goldCornerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C99A32" />
            <stop offset="45%" stopColor="#E8C66D" />
            <stop offset="70%" stopColor="#C99A32" />
            <stop offset="100%" stopColor="#A67C22" />
          </linearGradient>
          <linearGradient id="goldCornerGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2347" />
            <stop offset="100%" stopColor="#172238" />
          </linearGradient>
          <filter id="cornerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#C99A32" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer sweeping gold ribbon */}
        <path
          d="M0 0 H180 C150 50 120 120 0 160 Z"
          fill="url(#goldCornerGrad1)"
          filter="url(#cornerGlow)"
        />

        {/* Navy contour accent */}
        <path
          d="M0 160 C120 120 150 50 180 0"
          stroke="#0B2347"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Thin inner gold echo line */}
        <path
          d="M0 185 C145 140 175 60 210 0"
          stroke="url(#goldCornerGrad1)"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Subtle diagonal construction tick marks */}
        <line x1="20" y1="0" x2="0" y2="20" stroke="#0B2347" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="40" y1="0" x2="0" y2="40" stroke="#0B2347" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="60" y1="0" x2="0" y2="60" stroke="#0B2347" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

export function ArchitecturalBottomRightCorner({ className = "w-44 h-44 sm:w-56 sm:h-56", opacity = 1 }) {
  return (
    <div 
      className={`absolute bottom-0 right-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 240" fill="none" className="w-full h-full rotate-180">
        <defs>
          <linearGradient id="goldCornerGradBR" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C99A32" />
            <stop offset="45%" stopColor="#E8C66D" />
            <stop offset="100%" stopColor="#A67C22" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 H160 C130 50 110 110 0 150 Z"
          fill="url(#goldCornerGradBR)"
        />
        <path
          d="M0 150 C110 110 130 50 160 0"
          stroke="#0B2347"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M0 175 C130 130 155 60 190 0"
          stroke="url(#goldCornerGradBR)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Architectural side background panels:
 * Left side: Crafted architectural panel for Modern Luxury Villa (Image 2)
 * Right side: Crafted architectural panel for RCC Construction & Tower Crane (Image 3)
 * Crafted with gold borders, technical crosshairs, spec tags, and rich vibrant photography.
 */
export function ArchitecturalImageryBackdrop({ showLeftVilla = true, showRightCommercial = true }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* ========================================================
          LEFT CRAFTED ARCHITECTURAL PANEL: Modern Luxury Villa (Image 2)
          ======================================================== */}
      {showLeftVilla && (
        <div className="hidden xl:block absolute left-4 2xl:left-10 bottom-16 2xl:bottom-20 z-0 pointer-events-auto">
          <div className="relative group w-60 2xl:w-72 transition-transform duration-500 hover:-translate-y-1">
            {/* Outer Decorative Gold Offset Frame */}
            <div className="absolute -inset-2 border border-[#C99A32]/45 rounded-xl pointer-events-none" />
            
            {/* Architectural Drafting Corner Registration Crosshairs */}
            <span className="absolute -top-3 -left-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>
            <span className="absolute -top-3 -right-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>
            <span className="absolute -bottom-3 -left-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>
            <span className="absolute -bottom-3 -right-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>

            {/* Crafted Architectural Image Card */}
            <div className="relative rounded-lg overflow-hidden bg-white border-2 border-[#C99A32]/75 shadow-[0_18px_40px_rgba(7,27,54,0.16)]">
              {/* Top Technical Specification Tag */}
              <div className="bg-gradient-to-r from-[#071B36] to-[#123B63] text-white px-3 py-1.5 flex items-center justify-between border-b border-[#C99A32]/50">
                <span className="text-[9.5px] font-mono tracking-widest text-[#E8C46B] font-bold uppercase">
                  SPEC 01 // RESIDENTIAL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99A32] animate-pulse" />
              </div>

              {/* Rich, Crisp Image with Depth */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F5]">
                <img
                  src="/images/brand/hero-villa-bg.jpg"
                  alt="Modern 3D Luxury Villa by RAMASHISH"
                  className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/65 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Architectural Caption */}
              <div className="p-3 bg-white border-t border-[#E8E4DA] text-left">
                <p className="font-heading text-xs font-bold text-[#071B36] leading-tight">
                  Turnkey Luxury Villa
                </p>
                <p className="text-[10px] font-mono text-[#C99A32] font-semibold mt-0.5 uppercase tracking-wider">
                  Civil Architecture · Bhopal
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          RIGHT CRAFTED ARCHITECTURAL PANEL: RCC Construction & Crane (Image 3)
          ======================================================== */}
      {showRightCommercial && (
        <div className="hidden xl:block absolute right-4 2xl:right-10 top-36 2xl:top-40 z-0 pointer-events-auto">
          <div className="relative group w-60 2xl:w-72 transition-transform duration-500 hover:-translate-y-1">
            {/* Outer Decorative Gold Offset Frame */}
            <div className="absolute -inset-2 border border-[#C99A32]/45 rounded-xl pointer-events-none" />
            
            {/* Architectural Drafting Corner Registration Crosshairs */}
            <span className="absolute -top-3 -left-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>
            <span className="absolute -top-3 -right-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>
            <span className="absolute -bottom-3 -left-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>
            <span className="absolute -bottom-3 -right-3 font-mono text-xs text-[#C99A32] font-bold select-none">+</span>

            {/* Crafted Architectural Image Card */}
            <div className="relative rounded-lg overflow-hidden bg-white border-2 border-[#C99A32]/75 shadow-[0_18px_40px_rgba(7,27,54,0.16)]">
              {/* Top Technical Specification Tag */}
              <div className="bg-gradient-to-r from-[#071B36] to-[#123B63] text-white px-3 py-1.5 flex items-center justify-between border-b border-[#C99A32]/50">
                <span className="text-[9.5px] font-mono tracking-widest text-[#E8C46B] font-bold uppercase">
                  SPEC 02 // RCC STRUCTURE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </div>

              {/* Rich, Crisp Image with Depth */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F5]">
                <img
                  src="/images/brand/hero-construction-bg.jpg"
                  alt="RCC Multi-Storey Construction with Tower Crane"
                  className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/65 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Architectural Caption */}
              <div className="p-3 bg-white border-t border-[#E8E4DA] text-left">
                <p className="font-heading text-xs font-bold text-[#071B36] leading-tight">
                  RCC Framework & Crane Ops
                </p>
                <p className="text-[10px] font-mono text-[#C99A32] font-semibold mt-0.5 uppercase tracking-wider">
                  Heavy Civil Infrastructure
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
