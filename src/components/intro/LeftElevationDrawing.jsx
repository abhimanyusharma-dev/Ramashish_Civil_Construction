import React, { forwardRef } from 'react';

/**
 * LeftElevationDrawing Component (Scene 1 & Scene 2)
 * Renders realistic architectural building elevation drawings and dimension measurements
 * on the LEFT side of the intro screen:
 * - Subtle grey and gold drafting lines
 * - Building elevation structural wireframes
 * - Height and width dimension markers (+36.50m, +24.00m, +12.00m, DATUM ±0.00)
 * - Grid axis markers (AXIS A - D)
 * - Architectural technical notes
 * - Completely fades out in Scene 4
 */
const LeftElevationDrawing = forwardRef(function LeftElevationDrawing({ className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`left-elevation-wrapper absolute left-2 sm:left-6 md:left-10 lg:left-14 top-1/2 -translate-y-1/2 w-48 sm:w-64 md:w-80 lg:w-96 h-[440px] pointer-events-none select-none z-10 opacity-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 380 520"
        className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(7,29,59,0.06)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="leftDrawGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D9A126" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#071D3B" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer Architectural Drawing Frame */}
        <rect
          x="30"
          y="30"
          width="320"
          height="460"
          stroke="#94A3B8"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          strokeOpacity="0.4"
          className="elev-stroke"
        />

        {/* Title Block Header */}
        <g className="elev-annotation">
          <text x="45" y="52" fill="#071D3B" fontSize="9" fontWeight="700" fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.1em">
            SPEC // ELEVATION 01 · NORTH
          </text>
          <text x="45" y="65" fill="#D9A126" fontSize="7.5" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">
            SCALE 1:50 @ A1 · BHOPAL MP
          </text>
          <line x1="45" y1="72" x2="330" y2="72" stroke="#D9A126" strokeWidth="0.8" strokeOpacity="0.6" className="elev-stroke" />
        </g>

        {/* Structural Building Elevation Wireframe */}
        <g stroke="#64748B" strokeWidth="1" strokeOpacity="0.65" className="elev-building-lines">
          {/* Main Tower 1 Outline */}
          <rect x="70" y="110" width="75" height="340" className="elev-stroke" />
          {/* Floor Slab Levels */}
          <line x1="70" y1="160" x2="145" y2="160" strokeDasharray="3 2" className="elev-stroke" />
          <line x1="70" y1="220" x2="145" y2="220" strokeDasharray="3 2" className="elev-stroke" />
          <line x1="70" y1="280" x2="145" y2="280" strokeDasharray="3 2" className="elev-stroke" />
          <line x1="70" y1="340" x2="145" y2="340" strokeDasharray="3 2" className="elev-stroke" />
          <line x1="70" y1="400" x2="145" y2="400" strokeDasharray="3 2" className="elev-stroke" />

          {/* Center High-Rise Core */}
          <polygon points="160,85 240,85 240,450 160,450" className="elev-stroke" stroke="#D9A126" strokeWidth="1.2" />
          <line x1="160" y1="135" x2="240" y2="135" className="elev-stroke" />
          <line x1="160" y1="185" x2="240" y2="185" className="elev-stroke" />
          <line x1="160" y1="235" x2="240" y2="235" className="elev-stroke" />
          <line x1="160" y1="285" x2="240" y2="285" className="elev-stroke" />
          <line x1="160" y1="335" x2="240" y2="335" className="elev-stroke" />
          <line x1="160" y1="385" x2="240" y2="385" className="elev-stroke" />

          {/* Roof Truss Angles */}
          <line x1="160" y1="85" x2="200" y2="55" stroke="#D9A126" strokeWidth="1.4" className="elev-stroke" />
          <line x1="200" y1="55" x2="240" y2="85" stroke="#D9A126" strokeWidth="1.4" className="elev-stroke" />
          <line x1="200" y1="55" x2="200" y2="85" stroke="#D9A126" strokeWidth="1" className="elev-stroke" />

          {/* Right Wing Low-Rise */}
          <rect x="255" y="240" width="65" height="210" className="elev-stroke" />
          <line x1="255" y1="310" x2="320" y2="310" strokeDasharray="3 2" className="elev-stroke" />
          <line x1="255" y1="380" x2="320" y2="380" strokeDasharray="3 2" className="elev-stroke" />

          {/* Foundation Ground Line */}
          <line x1="45" y1="450" x2="335" y2="450" stroke="#071D3B" strokeWidth="2.2" className="elev-stroke" />
          {/* Ground Hatch Ticks */}
          <line x1="55" y1="450" x2="45" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="75" y1="450" x2="65" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="95" y1="450" x2="85" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="115" y1="450" x2="105" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="135" y1="450" x2="125" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="155" y1="450" x2="145" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="175" y1="450" x2="165" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="195" y1="450" x2="185" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="215" y1="450" x2="205" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="235" y1="450" x2="225" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="255" y1="450" x2="245" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="275" y1="450" x2="265" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="295" y1="450" x2="285" y2="462" stroke="#64748B" strokeWidth="0.8" />
          <line x1="315" y1="450" x2="305" y2="462" stroke="#64748B" strokeWidth="0.8" />
        </g>

        {/* Vertical Dimension Caliper & Height Annotations (Left Side) */}
        <g className="elev-dimensions" stroke="#D9A126" strokeWidth="0.8">
          {/* Main Caliper Line */}
          <line x1="50" y1="55" x2="50" y2="450" strokeDasharray="3 3" className="elev-stroke" />

          {/* Caliper Ticks & Text */}
          <line x1="44" y1="55" x2="56" y2="55" strokeWidth="1.2" />
          <text x="35" y="58" fill="#D9A126" fontSize="7" fontFamily="'IBM Plex Mono', monospace" textAnchor="end" fontWeight="700">
            +36.50m
          </text>

          <line x1="46" y1="85" x2="54" y2="85" />
          <text x="40" y="88" fill="#64748B" fontSize="6.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="end">
            +32.00m
          </text>

          <line x1="46" y1="160" x2="54" y2="160" />
          <text x="40" y="163" fill="#64748B" fontSize="6.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="end">
            +24.00m
          </text>

          <line x1="46" y1="280" x2="54" y2="280" />
          <text x="40" y="283" fill="#64748B" fontSize="6.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="end">
            +14.50m
          </text>

          <line x1="44" y1="450" x2="56" y2="450" strokeWidth="1.2" />
          <text x="35" y="453" fill="#071D3B" fontSize="7.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="end" fontWeight="700">
            ±0.00
          </text>
        </g>

        {/* Bottom Horizontal Span Dimension & Grid Axis */}
        <g className="elev-grid-axis">
          <line x1="70" y1="475" x2="320" y2="475" stroke="#D9A126" strokeWidth="0.8" strokeDasharray="4 2" />
          <line x1="70" y1="470" x2="70" y2="480" stroke="#D9A126" strokeWidth="1" />
          <line x1="320" y1="470" x2="320" y2="480" stroke="#D9A126" strokeWidth="1" />
          <text x="195" y="473" fill="#D9A126" fontSize="7" fontFamily="'IBM Plex Mono', monospace" textAnchor="middle" fontWeight="600">
            SPAN 48.00m
          </text>

          {/* Axis Bubbles */}
          <circle cx="70" cy="495" r="7" fill="#FFFFFF" stroke="#071D3B" strokeWidth="1" />
          <text x="70" y="498" fill="#071D3B" fontSize="7.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="middle" fontWeight="700">A</text>

          <circle cx="160" cy="495" r="7" fill="#FFFFFF" stroke="#071D3B" strokeWidth="1" />
          <text x="160" y="498" fill="#071D3B" fontSize="7.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="middle" fontWeight="700">B</text>

          <circle cx="240" cy="495" r="7" fill="#FFFFFF" stroke="#071D3B" strokeWidth="1" />
          <text x="240" y="498" fill="#071D3B" fontSize="7.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="middle" fontWeight="700">C</text>

          <circle cx="320" cy="495" r="7" fill="#FFFFFF" stroke="#071D3B" strokeWidth="1" />
          <text x="320" y="498" fill="#071D3B" fontSize="7.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="middle" fontWeight="700">D</text>
        </g>
      </svg>
    </div>
  );
});

export default LeftElevationDrawing;
