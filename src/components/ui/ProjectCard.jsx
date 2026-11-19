import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project, onClick, index = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onClick(project)}
      className="group card-architectural relative flex flex-col overflow-hidden cursor-pointer bg-white rounded-xl border border-[#E8E4DA] hover:border-[#C99A32] shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Top image wrapper with aspect ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F7F5]">
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98] group-hover:brightness-100"
        />

        {/* Golden corner accents on the image */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99A32] z-10" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99A32] z-10" />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-[#071B36]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-[#C99A32] bg-[#071B36]/90 flex items-center justify-center text-[#C99A32] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-white/95 text-[#071B36] border border-[#C99A32]/50 backdrop-blur-sm shadow-sm font-heading">
            {project.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded bg-white/95 text-[#C99A32] border border-[#C99A32]/40 backdrop-blur-sm shadow-sm font-bold">
            {project.status || 'Active'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-[#5A6573] mb-2 font-mono">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C99A32]" />
              {project.location}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#C99A32]" />
              {project.year}
            </span>
          </div>

          <h3 className="font-heading text-lg font-bold text-[#071B36] group-hover:text-[#C99A32] transition-colors duration-200 line-clamp-1">
            {project.title}
          </h3>

          <p className="text-xs text-[#5A6573] mt-2 line-clamp-2 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-4 border-t border-[#E8E4DA] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#5A6573]">
            {project.area || 'Civil Scope'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#071B36] group-hover:text-[#C99A32] group-hover:translate-x-1 transition-all duration-200 font-bold">
            Explore Details
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C99A32]" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
