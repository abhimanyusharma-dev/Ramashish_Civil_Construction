import React, { useEffect, useState } from 'react';

/**
 * Architectural Vertical Scroll Progress Indicator (Section 12.A)
 * Features a thin vertical progress indicator on the side whose golden progress line
 * grows as the visitor scrolls through the website, along with current percentage.
 */
export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Subtle Horizontal Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#C69A43] via-[#D9C49B] to-[#C69A43] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(198,154,67,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Side Vertical Architectural Progress Tracker (Section 12.A requirement) */}
      <aside
        aria-label="Page scroll progress"
        className="hidden md:flex fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-2 z-40 pointer-events-none select-none"
      >
        <span className="text-[9px] font-mono font-bold text-[#C69A43] tracking-widest rotate-90 mb-3">
          {Math.round(scrollProgress)}%
        </span>

        {/* Vertical Track */}
        <div className="w-[2px] h-36 bg-[#E5DFD5]/60 rounded-full relative overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-[#C69A43] to-[#D9C49B] rounded-full transition-all duration-75 ease-out shadow-[0_0_6px_rgba(198,154,67,0.6)]"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        <span className="text-[8px] font-mono text-[#5A6573] tracking-widest uppercase mt-2">
          ELEV
        </span>
      </aside>
    </>
  );
}
