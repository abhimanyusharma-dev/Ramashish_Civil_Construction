import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Boxes, HardHat, Check, ArrowRight } from 'lucide-react';

const iconMap = {
  Home,
  Building2,
  Boxes,
  HardHat
};

export default function ServiceCard({ service, index = 0 }) {
  const IconComponent = iconMap[service.icon] || HardHat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group card-architectural relative bg-white border border-[#E8E4DA] hover:border-[#D9A323] rounded-xl flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Top Media Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#F8F8F6]">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

        {/* Floating Number Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="font-mono text-xs text-white bg-[#071C3D]/80 px-3 py-1 rounded-md border border-[#D9A323]/50 font-bold">
            0{service.number}
          </span>
        </div>

        {/* Icon Floating Badge */}
        <div className="absolute bottom-3 right-4 z-10 w-11 h-11 bg-white border border-[#D9A323]/50 rounded-lg flex items-center justify-center text-[#D9A323] shadow-lg group-hover:border-[#D9A323] group-hover:bg-[#D9A323] group-hover:text-white transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#D9A323] mb-1 font-bold">
            {service.subtitle}
          </p>
          <h3 className="font-heading text-2xl font-bold text-[#071C3D] mb-3 group-hover:text-[#D9A323] transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-[#626B78] leading-relaxed mb-6 font-normal">
            {service.shortDescription}
          </p>

          {/* Key Scopes / Features */}
          <ul className="space-y-2 mb-6 border-t border-[#E8E4DA] pt-4">
            {service.features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#101D36] font-medium">
                <Check className="w-3.5 h-3.5 text-[#D9A323] mt-0.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#E8E4DA] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#626B78]">
            Bhopal & MP Region
          </span>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#071C3D] group-hover:text-[#D9A323] hover:underline transition-colors"
          >
            Inquire For Site
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#D9A323]" />
          </a>
        </div>
      </div>

      {/* Blueprint Corner Accents */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D9A323]/50 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D9A323]/50 rounded-bl-xl pointer-events-none" />
    </motion.div>
  );
}
