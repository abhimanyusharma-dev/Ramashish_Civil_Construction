import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete, minimumDuration = 1200 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, minimumDuration);

    return () => clearTimeout(timer);
  }, [minimumDuration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 select-none blueprint-grid"
        >
          {/* Central Logo & Architectural Motif */}
          <div className="relative flex flex-col items-center">
            {/* Architectural Compass / Foundation Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-20 h-20 relative mb-8 flex items-center justify-center"
            >
              <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                {/* Rotating subtle outer ring */}
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#B8860B"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeOpacity="0.4"
                  className="animate-spin"
                  style={{ animationDuration: '18s' }}
                />
                {/* Foundation triangle */}
                <path
                  d="M40 16L64 58H16L40 16Z"
                  stroke="#B8860B"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Inner support */}
                <path
                  d="M40 28L54 54H26L40 28Z"
                  stroke="#B8860B"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                <line x1="40" y1="28" x2="40" y2="58" stroke="#B8860B" strokeWidth="1.5" />
                <line x1="32" y1="44" x2="48" y2="44" stroke="#B8860B" strokeWidth="1.5" />
                <circle cx="40" cy="16" r="3" fill="#B8860B" />
              </svg>
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-xl sm:text-2xl font-bold tracking-[0.3em] text-[#1A1A1A] text-center"
            >
              SHREE RAM ASHISH
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[11px] font-mono tracking-[0.25em] text-[#8B6508] uppercase mt-2 font-semibold"
            >
              CIVIL CONTRACTOR · BHOPAL
            </motion.p>

            {/* Loading progress bar */}
            <div className="w-48 h-[2px] bg-gray-200 mt-8 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent w-full"
              />
            </div>

            <span className="text-[10px] font-mono text-[#6B7280] mt-4 tracking-widest uppercase">
              35 Years of Engineering Trust
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

