import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X, ChevronLeft, ChevronRight, MapPin, Layers, ArrowRight,
  Eye, ShieldAlert, CheckCircle2, Clock,
} from 'lucide-react';
import { projects, projectCategories, projectStatuses } from '../../data/projects';
import Button from '../ui/Button';

// ─── Ripple effect layer ──────────────────────────────────────────────────────
function RippleLayer({ ripples }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {ripples.map((r) => (
        <React.Fragment key={r.id}>
          {/* Soft white wave */}
          <motion.span
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute pointer-events-none rounded-full bg-white/30 border border-white/80"
            style={{
              left: r.x - 30,
              top: r.y - 30,
              width: 60,
              height: 60,
            }}
          />
          {/* Luminous ripple ring */}
          <motion.span
            initial={{ scale: 0, opacity: 0.95 }}
            animate={{ scale: 6.5, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute pointer-events-none rounded-full border-2 border-[#E8C46B] shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{
              left: r.x - 30,
              top: r.y - 30,
              width: 60,
              height: 60,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Central card (prominent, interactive, floating with ripple & depth shadow) ──
function CentralCard({ project, delay, isInView, onOpen }) {
  const [ripples, setRipples] = useState([]);

  const handleCardClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      onOpen(project);
    }, 180);
  };

  return (
    <div className="relative group/float pt-2 pb-4">
      {/* ── Ambient Background Depth Shadow ── */}
      <div className="absolute inset-x-6 bottom-2 h-14 bg-[#071B36]/30 rounded-3xl blur-xl transition-all duration-500 group-hover/float:bg-[#071B36]/45 group-hover/float:blur-2xl -z-10 transform translate-y-3" />

      {/* ── Continuous Floating Motion Wrapper ── */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4.5 + (delay % 2) * 0.8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="w-full"
      >
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.025, y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
          onClick={handleCardClick}
          className="group relative rounded-2xl overflow-hidden bg-[#071B36] shadow-[0_20px_45px_-10px_rgba(7,27,54,0.35)] hover:shadow-[0_28px_60px_-8px_rgba(7,27,54,0.5)] cursor-pointer min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] flex flex-col justify-end transition-shadow duration-300"
        >
          <img
            src={project.images[0]}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/35 to-transparent" />

          {/* Ripple animation on click */}
          <RippleLayer ripples={ripples} />

          {/* Top row: category title (bold italic font) + arrow button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 gap-2">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#071B36]/88 text-white font-heading font-bold italic text-[14px] sm:text-[16px] tracking-wide backdrop-blur-sm border border-white/10 shadow-sm">
              {project.category}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(project); }}
              className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-[#071B36] group-hover:bg-[#C99A32] group-hover:text-white transition-all duration-300 cursor-pointer shrink-0"
              aria-label="View project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom content: Action buttons (left) + Status tag (bottom right corner) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/house-construction-calculator"
                onClick={(e) => e.stopPropagation()}
                className="px-3.5 py-2 rounded-lg bg-[#09412B] hover:bg-[#0d5438] text-white text-xs font-heading font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-[#0e5c3e] cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
              >
                Build Cost Calculator
              </Link>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.stopPropagation();
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-2 rounded-lg bg-[#09412B] hover:bg-[#0d5438] text-white text-xs font-heading font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-[#0e5c3e] cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
              >
                Get Free Quote
              </a>
            </div>

            {/* Status tag in bottom right corner (Current Year in violet, Completed in dark green) */}
            <div className="shrink-0 ml-auto">
              <span
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md ${
                  project.status === 'Ongoing'
                    ? 'bg-[#4C2A6B] text-white border border-[#7C3AED]/50 shadow-[#4C2A6B]/25'
                    : 'bg-[#09412B] text-white border border-[#0A5438]/60 shadow-[#09412B]/25'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === 'Ongoing' ? 'bg-[#C084FC] animate-pulse' : 'bg-emerald-300'
                  }`}
                />
                {project.status === 'Ongoing' ? 'Current Year' : project.status}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Mobile card (floating with ripple & depth shadow) ────────────────────────
function MobileCard({ project, delay, isInView, onOpen }) {
  const [ripples, setRipples] = useState([]);

  const handleCardClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      onOpen(project);
    }, 180);
  };

  return (
    <div className="snap-center shrink-0 w-[82vw] relative group/float pt-2 pb-4">
      {/* Background shadow */}
      <div className="absolute inset-x-4 bottom-2 h-10 bg-[#071B36]/25 rounded-2xl blur-lg -z-10 transform translate-y-2" />

      {/* Floating animation */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4.2 + (delay % 2) * 0.7,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: delay * 0.05 }}
          onClick={handleCardClick}
          className="relative min-h-[380px] rounded-2xl overflow-hidden bg-[#071B36] shadow-[0_16px_36px_-8px_rgba(7,27,54,0.35)] cursor-pointer group flex flex-col justify-end"
        >
          <img
            src={project.images[0]}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/40 to-transparent" />

          {/* Ripple animation on click */}
          <RippleLayer ripples={ripples} />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <span className="px-3 py-1 rounded-lg bg-[#071B36]/90 text-white font-heading font-bold italic text-[13px] tracking-wide">
              {project.category}
            </span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#071B36] shadow-lg shrink-0">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <Link
                to="/house-construction-calculator"
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-1.5 rounded-lg bg-[#09412B] text-white text-[10px] font-heading font-bold uppercase tracking-wider shadow-md border border-[#0e5c3e] whitespace-nowrap"
              >
                Build Cost Calculator
              </Link>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.stopPropagation();
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#09412B] text-white text-[10px] font-heading font-bold uppercase tracking-wider shadow-md border border-[#0e5c3e] whitespace-nowrap"
              >
                Get Free Quote
              </a>
            </div>
            <div className="shrink-0 ml-auto">
              <span
                className={`px-2.5 py-1 rounded-lg font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm ${
                  project.status === 'Ongoing'
                    ? 'bg-[#4C2A6B] text-white border border-[#7C3AED]/50'
                    : 'bg-[#09412B] text-white border border-[#0A5438]/60'
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full ${
                    project.status === 'Ongoing' ? 'bg-[#C084FC] animate-pulse' : 'bg-emerald-300'
                  }`}
                />
                {project.status === 'Ongoing' ? 'Current Year' : project.status}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Desired category presentation order ──────────────────────────────────────
const CATEGORY_ORDER = [
  'Residential Projects',
  'Commercial Projects',
  'RCC & Structural Projects',
  'Renovation Projects',
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus]     = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const filteredProjects = projects.filter((p) => {
    const matchCat    = activeCategory === 'All' || p.category === activeCategory;
    const matchStatus = activeStatus   === 'All' || p.status   === activeStatus;
    return matchCat && matchStatus;
  });

  // Sort: Group by Category, with Ongoing on the Left (1st) and Completed on the Right (2nd)
  const displayProjects = [...filteredProjects].sort((a, b) => {
    const catA = CATEGORY_ORDER.indexOf(a.category);
    const catB = CATEGORY_ORDER.indexOf(b.category);
    const catOrderA = catA === -1 ? 99 : catA;
    const catOrderB = catB === -1 ? 99 : catB;
    if (catOrderA !== catOrderB) {
      return catOrderA - catOrderB;
    }
    // Ongoing on left (0), Completed on right (1)
    const statusA = a.status === 'Ongoing' ? 0 : 1;
    const statusB = b.status === 'Ongoing' ? 0 : 1;
    return statusA - statusB;
  });

  const handleOpenProject = (project) => { setSelectedProject(project); setActiveImageIndex(0); };

  const handleNextImage = useCallback(() => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => prev === selectedProject.images.length - 1 ? 0 : prev + 1);
  }, [selectedProject]);

  const handlePrevImage = useCallback(() => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => prev === 0 ? selectedProject.images.length - 1 : prev - 1);
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape')      setSelectedProject(null);
      if (e.key === 'ArrowRight')  handleNextImage();
      if (e.key === 'ArrowLeft')   handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleNextImage, handlePrevImage]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-16 lg:py-24 bg-white/40 relative overflow-hidden border-b border-[#E8E4DA]"
    >
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* ── Header + Filters (contained) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-6 border-b border-[#E8E4DA] pb-4">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#C99A32] font-bold uppercase mb-3">
              <span className="w-8 h-[2px] bg-[#C99A32]" />
              [ 05 // PROJECT ARCHIVE &amp; REPERTOIRE ]
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071B36] leading-[1.08]">
              Our Projects That Speak
              <br />
              <span className="text-gold-gradient">Themselves</span>
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#E8E4DA]">
          {/* Category Tabs: Single horizontal line */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full" style={{ scrollbarWidth: 'none' }}>
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-heading font-bold italic uppercase tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#071B36] text-[#E8C46B] border-[#C99A32] shadow-md shadow-[#071B36]/20'
                      : 'bg-[#F7F7F5] text-[#5A6573] hover:text-[#071B36] hover:border-[#C99A32]/50 border-[#E8E4DA]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 bg-[#F7F7F5] p-1 rounded-lg border border-[#E8E4DA] shrink-0 self-start lg:self-auto">
            {['All', 'Completed', 'Ongoing'].map((status) => {
              const isActive = activeStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#C99A32] text-white font-bold shadow-sm'
                      : 'text-[#5A6573] hover:text-[#071B36]'
                  }`}
                >
                  {status === 'All' ? 'All Status' : status}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Project Cards Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* DESKTOP & TABLET: 2-Column Responsive Grid */}
        <motion.div layout className="hidden md:grid grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project, idx) => (
              <CentralCard
                key={project.id}
                project={project}
                delay={0.04 + (idx % 4) * 0.06}
                isInView={isInView}
                onOpen={handleOpenProject}
              />
            ))}
          </AnimatePresence>
          {displayProjects.length === 0 && (
            <div className="col-span-2 py-16 text-center text-[#5A6573] font-sans text-sm">
              No projects found matching the selected filters.
            </div>
          )}
        </motion.div>

        {/* MOBILE: Snap Carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          {displayProjects.map((project, i) => (
            <MobileCard
              key={project.id}
              project={project}
              delay={i}
              isInView={isInView}
              onOpen={handleOpenProject}
            />
          ))}
          {displayProjects.length === 0 && (
            <div className="w-full py-12 text-center text-[#5A6573] font-sans text-sm">
              No projects found matching the selected filters.
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox Modal (unchanged) ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#071B36]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#C99A32]/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F7F7F5]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C99A32] font-bold block mb-1">
                    {selectedProject.category} · {selectedProject.status}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-[#071B36]">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#071B36] hover:text-white border border-[#E8E4DA] flex items-center justify-center text-[#071B36] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#071B36]">
                  <img
                    src={selectedProject.images[activeImageIndex]}
                    alt={`${selectedProject.title} - View ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#071B36]/70 hover:bg-[#071B36] text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#071B36]/70 hover:bg-[#071B36] text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#071B36]/80 backdrop-blur-sm text-white font-mono text-xs">
                    {activeImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>

                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? 'border-[#C99A32] scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E4DA]">
                  <div>
                    <span className="text-[10px] font-mono text-[#5A6573] uppercase block">Location</span>
                    <span className="text-xs sm:text-sm font-bold text-[#071B36]">{selectedProject.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5A6573] uppercase block">Covered Area</span>
                    <span className="text-xs sm:text-sm font-bold text-[#071B36]">{selectedProject.area}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5A6573] uppercase block">Year</span>
                    <span className="text-xs sm:text-sm font-bold text-[#071B36]">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5A6573] uppercase block">Status</span>
                    <span className="text-xs sm:text-sm font-bold text-[#C99A32]">{selectedProject.status}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading text-sm font-bold text-[#071B36] uppercase tracking-wider mb-2">
                    Scope of Engineering Work
                  </h4>
                  <p className="text-sm text-[#5A6573] leading-relaxed">{selectedProject.description}</p>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-[#E8E4DA] bg-[#F7F7F5] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#5A6573]">
                  Contractor: Sandeep Sharma · Bhopal
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  href="/#contact"
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto bg-[#071B36] text-white hover:bg-[#123B63]"
                >
                  Request Consultation on Similar Work
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
