import React, { forwardRef } from 'react';

/**
 * AnimatedLogo Component
 * Features the official RAMASHISH Architectural 'R' Brand Emblem:
 * - A large stylized capital letter R integrated with a building skyline
 * - Vertical skyscraper structures in deep navy blue (#071D3B) and metallic gold (#D9A126)
 * - Golden architectural roofline sweeping across the bottom
 * - Large curved golden outline forming the distinctive R shape
 * - Small four-pane window below the roof
 * - Assembled sequentially by the construction process
 * - In Scene 4, locks into the pristine high-resolution 3D master emblem with specular light sweep
 * - All temporary drafting guides and strokes dissolve cleanly
 */
const AnimatedLogo = forwardRef(function AnimatedLogo({ className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] aspect-[562/308] select-none mx-auto ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Background Breathing Radial Ambient Glow */}
      <div className="logo-back-glow absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-[#D9A126]/15 blur-3xl pointer-events-none opacity-0" />

      {/* SVG Viewport & Construction Assembly Layers (562 x 308) */}
      <svg
        viewBox="0 0 562 308"
        className="w-full h-full filter drop-shadow-[0_12px_32px_rgba(7,29,59,0.12)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradient for Blueprint Strokes */}
          <linearGradient id="logoGoldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3CF76" />
            <stop offset="35%" stopColor="#D9A126" />
            <stop offset="70%" stopColor="#F3CF76" />
            <stop offset="100%" stopColor="#7A5306" />
          </linearGradient>

          {/* Deep Navy Gradient for Towers */}
          <linearGradient id="logoNavyFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#123D68" />
            <stop offset="100%" stopColor="#071D3B" />
          </linearGradient>

          {/* Golden Specular Sheen Beam */}
          <linearGradient id="logoSheenBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFF9E6" stopOpacity="1" />
            <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Ambient Keystone Glow Filter */}
          <filter id="logoGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Mask for the Specular Light Sweep */}
          <mask id="logoSheenMask">
            <image
              href="/ramashish-logo-transparent.png"
              x="0"
              y="0"
              width="562"
              height="308"
              preserveAspectRatio="xMidYMid meet"
            />
          </mask>
        </defs>

        {/* ========================================================
            LAYER 0: Architectural Blueprint Drafting Guides
            (Active ONLY during construction, completely removed in Scene 4)
            ======================================================== */}
        <g className="logo-drafting-guide opacity-0" stroke="#D9A126" strokeWidth="0.8">
          {/* Center Vertical Datum Axis */}
          <line
            x1="254"
            y1="20"
            x2="254"
            y2="295"
            strokeDasharray="4 4"
            strokeOpacity="0.45"
          />

          {/* R Symbol Tangent Plumb Line */}
          <line
            x1="380"
            y1="35"
            x2="380"
            y2="280"
            strokeDasharray="3 4"
            strokeOpacity="0.3"
          />

          {/* Horizontal Level Guides */}
          <line x1="60" y1="68" x2="510" y2="68" strokeDasharray="3 4" strokeOpacity="0.35" />
          <line x1="60" y1="94" x2="510" y2="94" strokeDasharray="3 4" strokeOpacity="0.25" />
          <line x1="60" y1="182" x2="510" y2="182" strokeDasharray="3 4" strokeOpacity="0.3" />
          <line x1="60" y1="262" x2="510" y2="262" strokeOpacity="0.5" strokeWidth="1.2" />

          {/* Technical Elevation Annotations */}
          <text x="65" y="64" fill="#9E7422" fontSize="8" fontFamily="'IBM Plex Mono', monospace" fillOpacity="0.85">
            CANOPY // +140.0m
          </text>
          <text x="65" y="90" fill="#9E7422" fontSize="8" fontFamily="'IBM Plex Mono', monospace" fillOpacity="0.75">
            PEAK // +112.5m
          </text>
          <text x="65" y="178" fill="#9E7422" fontSize="8" fontFamily="'IBM Plex Mono', monospace" fillOpacity="0.75">
            RIDGE // +64.0m
          </text>
          <text x="65" y="258" fill="#9E7422" fontSize="8" fontFamily="'IBM Plex Mono', monospace" fillOpacity="0.9">
            DATUM ±0.00
          </text>

          {/* Compass Arc Guide for the R Curve */}
          <path
            d="M 214,68 C 340,30 460,70 425,160"
            fill="none"
            strokeDasharray="3 3"
            strokeOpacity="0.35"
          />

          {/* Engineering Crosshairs */}
          <path d="M 210,68 L 218,68 M 214,64 L 214,72" stroke="#D9A126" strokeWidth="1" />
          <path d="M 250,182 L 258,182 M 254,178 L 254,186" stroke="#D9A126" strokeWidth="1" />
          <path d="M 474,222 L 482,222 M 478,218 L 478,226" stroke="#D9A126" strokeWidth="1" />
        </g>

        {/* ========================================================
            LAYER 1: Sequentially Assembled Structural Components
            (Matches the video: 1. Navy Towers/Gable -> 2. Golden R Loop -> 3. Top Roof Bar)
            ======================================================== */}
        <g
          className="logo-strokes-group"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {/* STAGE 1: Foundation Ground, Navy Skyscraper Towers & Gable with 4-Pane Window */}
          <g className="logo-stage-1 opacity-0">
            {/* Foundation Line */}
            <line
              className="blueprint-stroke blueprint-stroke-foundation"
              x1="90"
              y1="268"
              x2="480"
              y2="268"
              strokeWidth="2.5"
              stroke="#071D3B"
            />
            {/* Dark Navy Skyscraper Towers */}
            <path
              className="blueprint-stroke blueprint-stroke-building"
              d="M 140,240 L 140,185 L 175,168 L 175,240 Z"
              fill="url(#logoNavyFill)"
              stroke="#D9A126"
              strokeWidth="1.6"
            />
            <path
              className="blueprint-stroke blueprint-stroke-building"
              d="M 182,230 L 182,172 L 214,160 L 214,230 Z"
              fill="url(#logoNavyFill)"
              stroke="#D9A126"
              strokeWidth="1.6"
            />
            <path
              className="blueprint-stroke blueprint-stroke-building"
              d="M 218,215 L 218,142 L 248,128 L 248,215 Z"
              fill="url(#logoNavyFill)"
              stroke="#D9A126"
              strokeWidth="1.8"
            />
            {/* Main Center Skyscraper */}
            <path
              className="blueprint-stroke blueprint-stroke-building"
              d="M 252,200 L 252,112 L 284,94 L 284,200 Z"
              strokeWidth="2.2"
              stroke="#D9A126"
              fill="url(#logoNavyFill)"
            />
            {/* Gable Roof & 4-Pane Window */}
            <path
              className="blueprint-stroke blueprint-stroke-roof"
              d="M 112,262 L 254,182 L 320,225"
              strokeWidth="3.2"
              stroke="#D9A126"
              fill="none"
            />
            <g className="blueprint-stroke blueprint-stroke-window" fill="#F3CF76" stroke="#071D3B" strokeWidth="1">
              <rect x="240" y="226" width="12" height="12" rx="1" />
              <rect x="256" y="226" width="12" height="12" rx="1" />
              <rect x="240" y="242" width="12" height="12" rx="1" />
              <rect x="256" y="242" width="12" height="12" rx="1" />
            </g>
          </g>

          {/* STAGE 2: Golden Middle Towers & Iconic 'R' Curved Loop */}
          <g className="logo-stage-2 opacity-0">
            {/* Golden Skyline Towers */}
            <path
              d="M 284,94 L 316,118 L 316,210 Z"
              fill="url(#logoGoldStroke)"
              stroke="#9E7422"
              strokeWidth="1.6"
            />
            <path
              d="M 320,132 L 342,132 L 342,215 Z"
              fill="url(#logoGoldStroke)"
              stroke="#9E7422"
              strokeWidth="1.6"
            />
            {/* The Sweeping Golden 'R' Curved Loop & Lower Tail */}
            <path
              className="blueprint-stroke-r"
              d="M 365,68 C 425,72 452,106 430,150 C 410,185 365,195 348,198 L 436,254 C 468,260 495,245 492,220"
              strokeWidth="4"
              stroke="url(#logoGoldStroke)"
              fill="none"
            />
            <path
              className="blueprint-stroke-r"
              d="M 348,90 C 382,90 404,110 404,132 C 404,154 382,172 348,172"
              strokeWidth="2.5"
              stroke="#F3CF76"
              fill="none"
            />
          </g>

          {/* STAGE 3: Golden Roofline Canopy Bar (Apex of R) */}
          <g className="logo-stage-3 opacity-0">
            <path
              className="blueprint-stroke-canopy"
              d="M 234,92 L 206,68 L 372,68 L 358,82 L 234,92 Z"
              fill="url(#logoGoldStroke)"
              stroke="#F3CF76"
              strokeWidth="1.8"
            />
          </g>
        </g>

        {/* ========================================================
            LAYER 2: The Actual Master Logo (Pristine High-Res Original Artwork)
            (THIS REMAINS LARGE, SHARP & PRISTINE IN THE CENTRE!)
            ======================================================== */}
        <g className="logo-actual-artwork opacity-0">
          <image
            href="/ramashish-logo-transparent.png"
            x="0"
            y="0"
            width="562"
            height="308"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* ========================================================
            LAYER 3: Specular Metallic Golden Sheen Beam Sweep
            ======================================================== */}
        <g mask="url(#logoSheenMask)" className="pointer-events-none">
          <rect
            className="logo-sheen-beam opacity-0"
            x="-220"
            y="-60"
            width="180"
            height="450"
            fill="url(#logoSheenBeam)"
            transform="rotate(26 280 154)"
          />
        </g>

        {/* ========================================================
            LAYER 4: Architectural Keystone Sparkles
            ======================================================== */}
        <g className="logo-sparkles opacity-0">
          <circle cx="214" cy="68" r="3.5" fill="#FFF9E6" filter="url(#logoGlowFilter)" />
          <polygon
            points="214,56 217.5,65.5 227,68 217.5,70.5 214,80 210.5,70.5 201,68 210.5,65.5"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <circle cx="254" cy="182" r="3.5" fill="#FFF9E6" filter="url(#logoGlowFilter)" />
          <polygon
            points="254,173 257,180.5 265,182 257,183.5 254,191 251,183.5 243,182 251,180.5"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <circle cx="478" cy="222" r="3" fill="#FFF9E6" filter="url(#logoGlowFilter)" />
          <polygon
            points="478,214 480.5,220.5 487,222 480.5,223.5 478,230 475.5,223.5 469,222 475.5,220.5"
            fill="#FFFFFF"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
});

export default AnimatedLogo;
