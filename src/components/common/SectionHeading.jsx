import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'left',
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? 'text-center flex flex-col items-center' : 'text-left'
      } ${className}`}
    >
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="w-6 h-[2px] bg-[#C99A32]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C99A32] font-bold">
            {tag}
          </span>
          {isCenter && <span className="w-6 h-[2px] bg-[#C99A32]" />}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B2347] leading-tight"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`section-divider ${isCenter ? 'mx-auto' : ''}`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[#626B78] text-base md:text-lg max-w-2xl leading-relaxed mt-2"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

