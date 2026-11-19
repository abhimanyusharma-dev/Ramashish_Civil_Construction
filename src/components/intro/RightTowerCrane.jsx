import React, { forwardRef } from 'react';

/**
 * RightTowerCrane Component (Scene 1 to Scene 4)
 * Renders a realistic golden civil construction tower crane on the RIGHT side of the intro screen:
 * - Lattice steel mast/tower in metallic gold (#D9A126) and deep navy (#071D3B)
 * - Slewing cabin & A-frame cathead apex
 * - Horizontal lattice jib boom extending over toward the center
 * - Counterweight ballast with safety hazard stripes
 * - Trolley that rolls along the boom
 * - Moving hoist cable & heavy steel crane hook
 * - Welding sparks when placing elements
 * - Completely fades out and disappears in Scene 4
 */
const RightTowerCrane = forwardRef(function RightTowerCrane({ className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`right-crane-wrapper absolute right-0 sm:right-2 md:right-6 lg:right-10 top-0 bottom-0 w-[320px] sm:w-[420px] md:w-[520px] lg:w-[620px] pointer-events-none select-none z-15 opacity-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 620 740"
        className="w-full h-full filter drop-shadow-[0_8px_24px_rgba(7,29,59,0.14)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Lattice Metallic Gradient */}
          <linearGradient id="craneGoldLattice" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3CF76" />
            <stop offset="45%" stopColor="#D9A126" />
            <stop offset="85%" stopColor="#B37E15" />
            <stop offset="100%" stopColor="#7A5306" />
          </linearGradient>

          {/* Deep Navy Structure Gradient */}
          <linearGradient id="craneNavyBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#123D68" />
            <stop offset="100%" stopColor="#071D3B" />
          </linearGradient>

          {/* Golden Welding Glow Filter */}
          <filter id="craneSparkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ========================================================
            1. FIXED VERTICAL TOWER MAST (Right Side)
            ======================================================== */}
        <g className="crane-tower-mast" stroke="url(#craneGoldLattice)" strokeWidth="1.6" fill="none">
          {/* Foundation Heavy Ballast Footing */}
          <rect x="495" y="660" width="70" height="24" rx="2" fill="url(#craneNavyBody)" stroke="#D9A126" strokeWidth="2" />
          <line x1="505" y1="684" x2="480" y2="720" stroke="#071D3B" strokeWidth="3" />
          <line x1="555" y1="684" x2="580" y2="720" stroke="#071D3B" strokeWidth="3" />
          <rect x="475" y="715" width="110" height="12" rx="2" fill="#071D3B" stroke="#D9A126" strokeWidth="1.5" />

          {/* Main Vertical Lattice Column Chords */}
          <line x1="510" y1="180" x2="510" y2="660" strokeWidth="3" stroke="#D9A126" />
          <line x1="550" y1="180" x2="550" y2="660" strokeWidth="3" stroke="#D9A126" />

          {/* Tower Lattice X-Braces */}
          {/* Section 1 */}
          <line x1="510" y1="660" x2="550" y2="615" strokeWidth="1.4" />
          <line x1="550" y1="660" x2="510" y2="615" strokeWidth="1.4" />
          <line x1="510" y1="615" x2="550" y2="615" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 2 */}
          <line x1="510" y1="615" x2="550" y2="570" strokeWidth="1.4" />
          <line x1="550" y1="615" x2="510" y2="570" strokeWidth="1.4" />
          <line x1="510" y1="570" x2="550" y2="570" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 3 */}
          <line x1="510" y1="570" x2="550" y2="525" strokeWidth="1.4" />
          <line x1="550" y1="570" x2="510" y2="525" strokeWidth="1.4" />
          <line x1="510" y1="525" x2="550" y2="525" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 4 */}
          <line x1="510" y1="525" x2="550" y2="480" strokeWidth="1.4" />
          <line x1="550" y1="525" x2="510" y2="480" strokeWidth="1.4" />
          <line x1="510" y1="480" x2="550" y2="480" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 5 */}
          <line x1="510" y1="480" x2="550" y2="435" strokeWidth="1.4" />
          <line x1="550" y1="480" x2="510" y2="435" strokeWidth="1.4" />
          <line x1="510" y1="435" x2="550" y2="435" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 6 */}
          <line x1="510" y1="435" x2="550" y2="390" strokeWidth="1.4" />
          <line x1="550" y1="435" x2="510" y2="390" strokeWidth="1.4" />
          <line x1="510" y1="390" x2="550" y2="390" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 7 */}
          <line x1="510" y1="390" x2="550" y2="345" strokeWidth="1.4" />
          <line x1="550" y1="390" x2="510" y2="345" strokeWidth="1.4" />
          <line x1="510" y1="345" x2="550" y2="345" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 8 */}
          <line x1="510" y1="345" x2="550" y2="300" strokeWidth="1.4" />
          <line x1="550" y1="345" x2="510" y2="300" strokeWidth="1.4" />
          <line x1="510" y1="300" x2="550" y2="300" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 9 */}
          <line x1="510" y1="300" x2="550" y2="255" strokeWidth="1.4" />
          <line x1="550" y1="300" x2="510" y2="255" strokeWidth="1.4" />
          <line x1="510" y1="255" x2="550" y2="255" strokeWidth="1.8" stroke="#071D3B" />

          {/* Section 10 */}
          <line x1="510" y1="255" x2="550" y2="210" strokeWidth="1.4" />
          <line x1="550" y1="255" x2="510" y2="210" strokeWidth="1.4" />
          <line x1="510" y1="210" x2="550" y2="210" strokeWidth="1.8" stroke="#071D3B" />

          {/* Internal Access Ladder */}
          <line x1="530" y1="210" x2="530" y2="660" stroke="#071D3B" strokeWidth="1" strokeDasharray="3 3" />
        </g>

        {/* ========================================================
            2. SLEWING UPPER CRANE ASSEMBLY (Rotates / Hoists)
            ======================================================== */}
        <g className="crane-slewing-head transform-gpu">
          {/* Slewing Ring Turntable */}
          <rect x="502" y="172" width="56" height="12" rx="2" fill="url(#craneNavyBody)" stroke="#D9A126" strokeWidth="1.5" />
          <circle cx="530" cy="178" r="4" fill="#D9A126" />

          {/* Operator Cabin */}
          <polygon points="506,145 528,145 532,172 506,172" fill="url(#craneNavyBody)" stroke="#D9A126" strokeWidth="1.2" />
          {/* Cabin Glass Window */}
          <polygon points="508,148 524,148 527,166 508,166" fill="#F3CF76" fillOpacity="0.4" stroke="#D9A126" strokeWidth="0.8" />
          {/* Operator Silhouette */}
          <circle cx="516" cy="154" r="3" fill="#071D3B" />
          <rect x="512" y="158" width="8" height="7" rx="1" fill="#071D3B" />

          {/* Apex Cathead / A-Frame Tower Cap */}
          <g stroke="url(#craneGoldLattice)" strokeWidth="2.4" fill="none">
            <line x1="522" y1="145" x2="530" y2="60" />
            <line x1="538" y1="145" x2="530" y2="60" />
            {/* Top Red Aviation Safety Warning Beacon */}
            <circle cx="530" cy="56" r="3.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="0.8" className="animate-pulse" />
          </g>

          {/* Counter-Jib (Extends to the Right) */}
          <g className="crane-counter-jib" stroke="url(#craneGoldLattice)" strokeWidth="1.6" fill="none">
            <rect x="530" y="142" width="85" height="14" rx="1" fill="url(#craneNavyBody)" stroke="#D9A126" strokeWidth="1.4" />
            {/* Stay Cable to Apex */}
            <line x1="530" y1="60" x2="605" y2="142" stroke="#F3CF76" strokeWidth="1.6" strokeDasharray="4 2" />

            {/* Heavy Concrete Counterweight Blocks with Safety Hazard Stripes */}
            <rect x="578" y="156" width="34" height="28" rx="2" fill="#D9A126" stroke="#071D3B" strokeWidth="1.5" />
            <line x1="580" y1="162" x2="610" y2="162" stroke="#071D3B" strokeWidth="2.5" />
            <line x1="580" y1="170" x2="610" y2="170" stroke="#071D3B" strokeWidth="2.5" />
            <line x1="580" y1="178" x2="610" y2="178" stroke="#071D3B" strokeWidth="2.5" />

            {/* Hoist Winch Drum */}
            <circle cx="550" cy="136" r="7" fill="url(#craneNavyBody)" stroke="#F3CF76" strokeWidth="1.2" />
            <line x1="550" y1="130" x2="550" y2="142" stroke="#D9A126" strokeWidth="1.5" />
          </g>

          {/* Main Working Jib Boom (Extends Leftward Over the Center Stage) */}
          <g className="crane-working-boom" stroke="url(#craneGoldLattice)" strokeWidth="1.6" fill="none">
            {/* Top & Bottom Main Chords */}
            <line x1="530" y1="144" x2="50" y2="144" strokeWidth="2.8" stroke="#D9A126" />
            <line x1="530" y1="156" x2="50" y2="156" strokeWidth="2.2" stroke="#D9A126" />

            {/* Boom Apex Stay Cable */}
            <line x1="530" y1="60" x2="160" y2="144" stroke="#F3CF76" strokeWidth="1.6" strokeDasharray="4 2" />
            <line x1="530" y1="60" x2="320" y2="144" stroke="#F3CF76" strokeWidth="1.2" strokeDasharray="3 2" />

            {/* Diagonal Truss Webbing Lacing */}
            <line x1="530" y1="144" x2="495" y2="156" strokeWidth="1.2" />
            <line x1="495" y1="156" x2="460" y2="144" strokeWidth="1.2" />
            <line x1="460" y1="144" x2="425" y2="156" strokeWidth="1.2" />
            <line x1="425" y1="156" x2="390" y2="144" strokeWidth="1.2" />
            <line x1="390" y1="144" x2="355" y2="156" strokeWidth="1.2" />
            <line x1="355" y1="156" x2="320" y2="144" strokeWidth="1.2" />
            <line x1="320" y1="144" x2="285" y2="156" strokeWidth="1.2" />
            <line x1="285" y1="156" x2="250" y2="144" strokeWidth="1.2" />
            <line x1="250" y1="144" x2="215" y2="156" strokeWidth="1.2" />
            <line x1="215" y1="156" x2="180" y2="144" strokeWidth="1.2" />
            <line x1="180" y1="144" x2="145" y2="156" strokeWidth="1.2" />
            <line x1="145" y1="156" x2="110" y2="144" strokeWidth="1.2" />
            <line x1="110" y1="144" x2="75" y2="156" strokeWidth="1.2" />
            <line x1="75" y1="156" x2="50" y2="144" strokeWidth="1.2" />

            {/* Jib Tip End Pulley & Light */}
            <circle cx="50" cy="150" r="5" fill="#071D3B" stroke="#D9A126" strokeWidth="1.5" />
            <circle cx="46" cy="144" r="2" fill="#F3CF76" className="animate-pulse" />
          </g>

          {/* ========================================================
              3. MOVING TROLLEY & HOIST CABLE & HOOK RIGGING
              ======================================================== */}
          {/* Trolley (Moves along the Boom Rail horizontally) */}
          <g className="crane-trolley transform-gpu" style={{ transform: 'translateX(260px)' }}>
            {/* Trolley Frame & Track Wheels */}
            <rect x="-14" y="156" width="28" height="9" rx="1.5" fill="url(#craneNavyBody)" stroke="#F3CF76" strokeWidth="1.2" />
            <circle cx="-9" cy="158" r="2.5" fill="#D9A126" />
            <circle cx="9" cy="158" r="2.5" fill="#D9A126" />

            {/* Hoist Steel Wire Cable */}
            <line
              className="crane-hoist-cable"
              x1="0"
              y1="165"
              x2="0"
              y2="340"
              stroke="#F3CF76"
              strokeWidth="1.4"
              strokeDasharray="4 1"
            />

            {/* Hook Block Assembly (Hoists Up and Down) */}
            <g className="crane-hook-assembly transform-gpu" style={{ transform: 'translateY(340px)' }}>
              {/* Heavy Duty Pulley Block */}
              <rect x="-9" y="-12" width="18" height="15" rx="2" fill="url(#craneNavyBody)" stroke="#D9A126" strokeWidth="1.4" />
              <circle cx="0" cy="-5" r="3.5" fill="#F3CF76" stroke="#9E7422" strokeWidth="1" />
              <circle cx="0" cy="-5" r="1.5" fill="#071D3B" />

              {/* Forged Steel Crane Hook */}
              <path
                d="M 0,3 L 0,14 C 0,22 -10,24 -10,16 C -10,12 -6,9 -3,9"
                stroke="#D9A126"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Rigging Slings */}
              <line x1="-8" y1="18" x2="-28" y2="34" stroke="#F3CF76" strokeWidth="1.2" strokeDasharray="3 1" />
              <line x1="4" y1="18" x2="28" y2="34" stroke="#F3CF76" strokeWidth="1.2" strokeDasharray="3 1" />

              {/* Payload 1: Foundation Structural Beam (Scene 1 & 2) */}
              <g className="crane-payload-1">
                <rect x="-34" y="32" width="68" height="7" rx="1.5" fill="#071D3B" stroke="#D9A126" strokeWidth="1.4" />
                <circle cx="-26" cy="35.5" r="1.5" fill="#F3CF76" />
                <circle cx="26" cy="35.5" r="1.5" fill="#F3CF76" />
              </g>

              {/* Payload 2: Golden 'R' Curved Architectural Loop (Scene 2 & 3) */}
              <g className="crane-payload-2 opacity-0">
                <path
                  d="M -15,30 C 15,28 32,45 20,65 C 10,80 -12,85 -24,80"
                  fill="none"
                  stroke="url(#craneGoldLattice)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              {/* Payload 3: Golden Roofline Canopy Bar (Scene 3 & 4) */}
              <g className="crane-payload-3 opacity-0">
                <path
                  d="M -30,34 L 28,34 L 18,28 L -24,28 Z"
                  fill="#D9A126"
                  stroke="#F3CF76"
                  strokeWidth="1.2"
                />
              </g>

              {/* Intense Golden Welding Sparks at Contact Point */}
              <g className="crane-welding-sparks opacity-0" filter="url(#craneSparkGlow)">
                <circle cx="0" cy="34" r="6" fill="#FFFFFF" />
                <circle cx="0" cy="34" r="12" fill="#F3CF76" fillOpacity="0.4" />
                <line x1="0" y1="34" x2="-22" y2="18" stroke="#FFF5D0" strokeWidth="2" />
                <line x1="0" y1="34" x2="24" y2="20" stroke="#F3CF76" strokeWidth="2" />
                <line x1="0" y1="34" x2="-16" y2="52" stroke="#D9A126" strokeWidth="2" />
                <line x1="0" y1="34" x2="18" y2="48" stroke="#FFF5D0" strokeWidth="2" />
                <line x1="0" y1="34" x2="-26" y2="34" stroke="#D9A126" strokeWidth="1.8" />
                <line x1="0" y1="34" x2="28" y2="34" stroke="#F3CF76" strokeWidth="1.8" />
                <line x1="0" y1="34" x2="0" y2="10" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="0" y1="34" x2="0" y2="58" stroke="#D9A126" strokeWidth="1.8" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
});

export default RightTowerCrane;
