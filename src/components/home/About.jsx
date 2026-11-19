import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import {
  Award,
  Quote,
  HardHat,
  Ruler,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Building2,
  Layers,
  Wrench,
  Activity,
  Target,
  Eye,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/* ─── Floating luminous water particles ─── */
const PARTICLES = [
  { size: 3, left: '16%', top: '24%', dur: 5.2, delay: 0 },
  { size: 4, left: '74%', top: '32%', dur: 6.5, delay: 1.1 },
  { size: 2.5, left: '36%', top: '60%', dur: 4.6, delay: 0.4 },
  { size: 5, left: '82%', top: '72%', dur: 7.0, delay: 1.9 },
  { size: 3, left: '24%', top: '80%', dur: 5.8, delay: 1.5 },
  { size: 2, left: '58%', top: '18%', dur: 4.8, delay: 2.6 },
  { size: 3.5, left: '88%', top: '45%', dur: 6.2, delay: 3.1 },
];

/* ─── 6 Dedicated Professional Team Roles ─── */
const TEAM_MEMBERS = [
  {
    id: '01',
    role: 'Senior Site Supervisors',
    designation: 'Field Operations & Site Coordination Lead',
    description: 'Directs day-to-day site execution, material logistics, safety protocols, and strict synchronization between structural drawings and contractor execution.',
    icon: HardHat,
    badge: 'On-Site Oversight',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    skills: ['Site Logistics', 'Daily Supervision', 'IS Code Compliance'],
  },
  {
    id: '02',
    role: 'Skilled Masons',
    designation: 'Master Brickwork & Plastering Craftsmen',
    description: 'Master craftsmen executing uniform bond brickwork, horizontal mortar leveling, plumb-line vertical alignment, and multi-coat crack-resistant external plastering.',
    icon: Ruler,
    badge: 'Precision Masonry',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    skills: ['Brick Bonding', 'Plumb Line Alignment', 'Mortar Leveling'],
  },
  {
    id: '03',
    role: 'Master Bar Benders',
    designation: 'Fe-550 TMT Steel Reinforcement Specialists',
    description: 'Handles cutting, mandrel bending, and tie-wire anchoring of certified Fe-550 TMT steel cages for heavy column footings, plinth beams, and earthquake-resilient foundations.',
    icon: Wrench,
    badge: 'TMT Reinforcement',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    skills: ['Fe-550 Rebar Cages', 'Stirrup Spacing', 'Seismic Detailing'],
  },
  {
    id: '04',
    role: 'RCC Specialists',
    designation: 'Reinforced Concrete & Shuttering Authorities',
    description: 'Leads leak-proof formwork shuttering, monolithic slab pours, high-frequency vibrator compaction for void elimination, and mandatory 21-day pond curing cycles.',
    icon: Layers,
    badge: 'Structural RCC',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    skills: ['Monolithic Pours', 'M20/M25 Grades', '21-Day Curing'],
  },
  {
    id: '05',
    role: 'Civil Site Engineers',
    designation: 'Technical Compliance & Structural Survey Leads',
    description: 'Performs digital level surveys, compressive concrete cube strength testing, structural reinforcement audits, and milestone quality inspections.',
    icon: Compass,
    badge: 'Technical Assurance',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    skills: ['Cube Testing', 'Drawing Verification', 'Quality Audits'],
  },
  {
    id: '06',
    role: 'Dedicated Construction Workforce',
    designation: 'Field Craftsmanship & Execution Crew',
    description: 'The energetic backbone driving foundation excavation, concrete conveying, precision shuttering handling, and coordinated manual craftsmanship powering daily site velocity.',
    icon: Users,
    badge: 'Core Workforce',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    skills: ['Excavation Craft', 'Material Handling', 'Daily Coordination'],
  },
];

/* ─── 3 Philosophy Visual Points ─── */
const PHILOSOPHY_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Quality First',
    subtitle: 'Tested materials & IS code adherence',
  },
  {
    icon: Activity,
    title: 'Reliable Execution',
    subtitle: 'On-schedule milestones & supervision',
  },
  {
    icon: Building2,
    title: 'Structural Integrity',
    subtitle: 'Engineered for decades of safety',
  },
];

/* ─── Secondary Brand Title for Typing Effect ─── */
const BRAND_TITLE = '- Ramashish Civil Construction';

/* ─── About Section Description Segments with Highlights ─── */
const ABOUT_DESC_SEGMENTS = [
  { text: 'RAMASHISH Civil Construction', cls: 'font-extrabold text-[#0B1B35]' },
  { text: ' is led by ', cls: 'text-[#172033]/85' },
  { text: 'Sandeep Sharma', cls: 'font-bold text-[#C69A45]' },
  { text: ', an experienced civil contractor with over ', cls: 'text-[#172033]/85' },
  { text: '25 years of practical, hands-on construction expertise', cls: 'font-bold text-[#C69A45]' },
  { text: '. Based in ', cls: 'text-[#172033]/85' },
  { text: 'Bhopal, Madhya Pradesh', cls: 'font-bold text-[#0B1B35]' },
  { text: ', we deliver dependable ', cls: 'text-[#172033]/85' },
  { text: 'residential, commercial and structural construction solutions', cls: 'font-semibold text-[#C69A45]' },
  { text: ' with a strong focus on ', cls: 'text-[#172033]/85' },
  { text: 'quality, safety and execution', cls: 'font-bold text-[#C69A45]' },
  { text: '.', cls: 'text-[#172033]/85' },
];

const TOTAL_ABOUT_CHARS = ABOUT_DESC_SEGMENTS.reduce((sum, s) => sum + s.text.length, 0);

/* ═══════════════════════════════════════════════════
   TEXT SEGMENTS FOR OBJECTIVE & VISION
═══════════════════════════════════════════════════ */
const OBJECTIVE_QUOTE = [
  { text: 'To deliver ' },
  { text: 'dependable', cls: 'text-[#C69A45] font-black' },
  { text: ' civil construction solutions through ' },
  { text: 'practical planning', cls: 'text-[#C69A45] font-black' },
  { text: ', ' },
  { text: 'quality workmanship', cls: 'text-[#C69A45] font-black' },
  { text: ', and ' },
  { text: 'responsible project execution', cls: 'text-[#C69A45] font-black' },
  { text: '.' },
];

const VISION_QUOTE = [
  { text: 'To build ' },
  { text: 'lasting structures', cls: 'text-[#C69A45] font-black' },
  { text: ' and ' },
  { text: 'long-term relationships', cls: 'text-[#C69A45] font-black' },
  { text: ' through experience, ' },
  { text: 'integrity', cls: 'text-[#C69A45] font-black' },
  { text: ', and attention to ' },
  { text: 'construction quality', cls: 'text-[#C69A45] font-black' },
  { text: '.' },
];

/* ─── Typewriter text component for Objective & Vision quotes ─── */
function ObjectiveVisionTypewriter({ segments, inView, speed = 18, delay = 250, minHeightClass = '' }) {
  const totalChars = segments.reduce((sum, s) => sum + s.text.length, 0);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedCount((prev) => {
          if (prev >= totalChars) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, totalChars, speed, delay]);

  let remaining = typedCount;

  return (
    <div className={`relative ${minHeightClass}`}>
      {segments.map((seg, i) => {
        if (remaining <= 0) return null;
        const take = Math.min(remaining, seg.text.length);
        remaining -= take;
        return (
          <span key={i} className={seg.cls || ''}>
            {seg.text.slice(0, take)}
          </span>
        );
      })}
      {typedCount < totalChars && inView && (
        <span className="inline-block w-[2px] h-[0.95em] bg-[#C69A45] align-baseline ml-0.5 animate-pulse" />
      )}
    </div>
  );
}

/* ─── Compact Pill ─── */
function ObjectiveVisionPill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C69A45]/40 bg-[#C69A45]/10 text-[#9E7422] text-[11px] font-mono tracking-wider uppercase font-bold">
      <Icon className="w-3 h-3 shrink-0" />
      {label}
    </span>
  );
}

function useBrandTypewriter(trigger) {
  const [typedBrand, setTypedBrand] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setTypedBrand('');
    setIsTyping(true);

    let i = 0;
    const speed = 35;

    const timer = setInterval(() => {
      i += 1;
      setTypedBrand(BRAND_TITLE.slice(0, i));
      if (i >= BRAND_TITLE.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [trigger]);

  return { typedBrand, isTyping };
}

/* ─── Interactive 3D Tilt Team Member Card ─── */
function TeamMemberCard({ member, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Icon = member.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group relative h-full bg-white border border-[#E8E4DA] hover:border-[#C69A45] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(11,27,53,0.12)] transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Top Realistic Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#071D3B]">
            <img
              src={member.image}
              alt={member.role}
              className="w-full h-full object-cover filter contrast-[1.04] group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Dark gradient overlay for typography readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B35]/95 via-[#0B1B35]/35 to-transparent pointer-events-none" />

            {/* Badges on Top */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-md bg-[#0B1B35]/85 border border-[#C69A45]/50 text-[#E8C46B] font-mono text-[11px] font-bold tracking-wider backdrop-blur-sm shadow-sm">
                #{member.id}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B1B35]/85 border border-[#C69A45]/40 text-[#E8C46B] font-mono text-[10px] tracking-wider uppercase font-semibold backdrop-blur-sm shadow-sm">
                <Icon className="w-3 h-3 text-[#C69A45]" />
                {member.badge}
              </span>
            </div>

            {/* Role Title in bottom overlay */}
            <div className="absolute bottom-3 left-3.5 right-3.5 pointer-events-none z-10">
              <h4 className="font-heading font-black text-lg sm:text-xl text-white leading-tight drop-shadow-md group-hover:text-[#E8C46B] transition-colors duration-300">
                {member.role}
              </h4>
            </div>
          </div>

          {/* Subtle Metallic Gold Accent Line */}
          <div className="h-[2.5px] w-full bg-gradient-to-r from-[#C69A45] via-[#E8C46B] to-transparent" />

          {/* Card Body */}
          <div className="p-4 sm:p-5">
            <p className="font-mono text-[11px] font-bold text-[#C69A45] uppercase tracking-wider mb-2">
              {member.designation}
            </p>
            <p
              className="text-[13px] sm:text-[13.5px] text-[#172033]/75 font-sans leading-relaxed text-justify mb-4"
              style={{ textAlign: 'justify', textJustify: 'inter-word' }}
            >
              {member.description}
            </p>
          </div>
        </div>

        {/* Footer Skill Pills */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E8E4DA]/80">
            {member.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-0.5 rounded bg-[#FAFAF7] border border-[#E8E4DA] text-[#0B1B35] font-mono text-[10px] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const teamSectionRef = useRef(null);

  // Parallax for team showcase hero banner
  const { scrollYProgress: teamScrollY } = useScroll({
    target: teamSectionRef,
    offset: ['start end', 'end start'],
  });
  const teamParallaxY = useTransform(teamScrollY, [0, 1], ['-8%', '8%']);

  // Scroll parallax for owner card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const cardParallaxY = useTransform(scrollYProgress, [0, 1], ['-2.5%', '4.5%']);
  const smoothCardY = useSpring(cardParallaxY, { stiffness: 90, damping: 25 });

  // Viewport trigger
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const { typedBrand } = useBrandTypewriter(isInView);
  const [aboutCharsTyped, setAboutCharsTyped] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAboutCharsTyped((c) => {
          if (c >= TOTAL_ABOUT_CHARS) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, 16);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, [isInView]);

  // Interactive 3D mouse tilt (desktop only)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 3.5,
      y: (x / (rect.width / 2)) * 3.5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24 bg-[#FAFAF7]/40 relative overflow-hidden border-b border-[#E8E4DA]"
    >
      {/* ── Architectural Blueprint Grid Background ── */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      {/* ── Soft Ambient Glows ── */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C69A45]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[520px] h-[520px] bg-[#0B1B35]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═════════════════════════════════════════════════════════════════════
            2. MAIN HEADING & SECONDARY BRAND TITLE
            - Gaps removed (tightened top and bottom spacing)
            - Main heading in Dark Green, sliding in from the left
            - Secondary brand title in Indigo with letter typing animation
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="mb-6 lg:mb-8 border-b border-[#E8E4DA] pb-4 sm:pb-5">
          {/* Main Heading: Single line with italic font style, Dark Green, Slide from left */}
          <motion.h2
            initial={{ opacity: 0, x: -70 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.25rem] font-black italic tracking-tight text-[#09412B] leading-tight lg:whitespace-nowrap"
          >
            The Strength Behind Every Structure
          </motion.h2>

          {/* Secondary Brand Title: Dark Blue colour with Letter Typing Style Animation */}
          <div className="mt-2.5 sm:mt-3 flex items-center min-h-[2rem]">
            <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold italic text-[#071D3B] tracking-wide">
              {typedBrand}
            </span>
            <span className="inline-block w-0.5 sm:w-1 h-[0.9em] bg-[#071D3B] ml-1.5 align-middle animate-pulse" />
          </div>

          {/* Subtle animated accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="mt-3 w-48 sm:w-64 h-[2px] bg-gradient-to-r from-[#071D3B] via-[#C69A45] to-transparent rounded-full"
          />
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            TWO-COLUMN ARCHITECTURAL LAYOUT
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ═════════════════════════════════════════════════════════════════
              3. OWNER IMAGE CARD – CINEMATIC DEEP WATER EFFECT (5 cols)
              - Deep navy background behind photograph
              - Subtle deep-water atmosphere (background, person's face untouched)
              - Realistic blue underwater light rays
              - Floating light particles
              - Parallax & subtle 3D tilt
              - Premium navy border with thin metallic gold edges
              - White Information Panel at bottom
          ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: smoothCardY }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer architectural precision frames */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#C69A45]/30 rounded-3xl pointer-events-none" />
              <div className="absolute -inset-1 border border-[#0B1B35]/20 rounded-2xl pointer-events-none" />

              {/* Corner crosshair ticks */}
              <div className="absolute -top-3 -left-3 w-4 h-4 border-t-2 border-l-2 border-[#0B1B35] pointer-events-none z-20" />
              <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b-2 border-r-2 border-[#0B1B35] pointer-events-none z-20" />

              {/* Image Card Container with entrance reveal */}
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, x: -80, rotateY: -8 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transformPerspective: 1200,
                  rotateX: isHovered && !isTouchDevice ? tilt.x : 0,
                  rotateY: isHovered && !isTouchDevice ? tilt.y : 0,
                  transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`relative aspect-[4/5] rounded-2xl overflow-hidden
                  bg-[#0B1B35] border-2 border-[#0B1B35]
                  shadow-[0_20px_50px_rgba(11,27,53,0.18)]
                  hover:shadow-[0_25px_65px_rgba(11,27,53,0.22),0_0_40px_rgba(198,154,69,0.28)]
                  transition-shadow duration-500 group select-none`}
              >
                {/* Thin metallic gold inner edge */}
                <div className="absolute inset-0 rounded-2xl border border-[#C69A45]/50 pointer-events-none z-20" />

                {/* ── DEEP WATER ATMOSPHERE (BACKGROUND LAYER) ── */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#051122] via-[#0B1B35] to-[#040C18] pointer-events-none">
                  {/* Subtle underwater cyan-blue radial glow behind portrait */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/18 rounded-full blur-[80px]" />

                  {/* Realistic blue underwater light rays swaying */}
                  <div className="absolute -top-12 -left-12 w-[140%] h-[140%] opacity-35 mix-blend-screen bg-[repeating-linear-gradient(118deg,rgba(56,189,248,0.20)_0px,rgba(56,189,248,0.20)_35px,transparent_60px,transparent_135px)] blur-md animate-water-rays" />

                  {/* Soft gold light caustic shimmer reflection */}
                  <div className="absolute -top-8 -right-8 w-full h-full opacity-18 mix-blend-color-dodge bg-[repeating-linear-gradient(135deg,rgba(198,154,69,0.25)_0px,rgba(198,154,69,0.25)_25px,transparent_45px,transparent_120px)] blur-sm" />

                  {/* Floating subtle luminous light particles */}
                  {PARTICLES.map((p, i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-full bg-cyan-200/60 blur-[0.6px]"
                      style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: p.top,
                      }}
                      animate={{
                        y: [0, -32, 0],
                        opacity: [0.2, 0.75, 0.2],
                        scale: [1, 1.25, 1],
                      }}
                      transition={{
                        duration: p.dur,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: p.delay,
                      }}
                    />
                  ))}
                </div>

                {/* ── PHOTOGRAPH OF SANDEEP SHARMA ── */}
                {/* Face is pristine, completely sharp and clear */}
                <div className="relative w-full h-full flex items-center justify-center p-4 pb-28">
                  <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-full overflow-hidden border-2 border-[#C69A45]/60 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                    <img
                      src="/images/owner/sandeep-sharma.jpg"
                      alt="Sandeep Sharma — Proprietor & Master Civil Contractor"
                      className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Soft ambient vignette */}
                    <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0B1B35]/40 pointer-events-none" />
                  </div>
                </div>

                {/* Top Badge: Field Authority */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-[#0B1B35]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#C69A45]/60 shadow-lg flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C69A45]" />
                    <span className="font-heading font-black text-[11px] tracking-wider text-[#FAFAF7]">
                      25+ YEARS IN THE FIELD
                    </span>
                  </div>
                </div>

                {/* Top Right: Location Tag */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-[#0B1B35]/85 backdrop-blur-md px-3 py-1 rounded-md border border-[#E8D8B8]/30 text-[#E8D8B8] font-mono text-[10px] tracking-widest uppercase">
                    BHOPAL · MP
                  </div>
                </div>

                {/* ═════════════════════════════════════════════════════════════
                    4. OWNER INFORMATION CARD (Bottom of image frame)
                    - White information panel
                    - Navy typography
                    - Gold small labels and details
                    - Smooth upward reveal
                    - Clean, not oversized
                ═════════════════════════════════════════════════════════════ */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-4 left-4 right-4 z-20 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-xl border-l-4 border-[#C69A45] shadow-2xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {/* Name in Deep Navy */}
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-[#0B1B35] leading-tight tracking-tight">
                        SANDEEP SHARMA
                      </h3>
                      {/* Title in Metallic Gold */}
                      <p className="text-xs sm:text-sm font-heading font-bold text-[#C69A45] tracking-wide uppercase mt-0.5">
                        Proprietor | Master Civil Contractor
                      </p>
                      {/* Experience statement */}
                      <p className="text-xs sm:text-sm text-[#172033] font-semibold mt-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C69A45]" />
                        25+ Years of Construction Experience
                      </p>
                    </div>

                    {/* Small quote badge */}
                    <div className="w-9 h-9 rounded-full bg-[#0B1B35] text-[#C69A45] flex items-center justify-center shrink-0 shadow-md">
                      <Quote className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              5. ABOUT CONTENT – SEAMLESS EDITORIAL ARCHITECTURAL LAYOUT
              - No excessive cards or box-within-box clutter
              - Clean headings, rich typography, smooth transitions
          ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-12">

            {/* ─── INTRODUCTION & SITE TEAM (Grouped closely together) ─── */}
            <div className="space-y-6 sm:space-y-7">
              {/* ─── SECTION 01 – OUR INTRODUCTION ─── */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Heading */}
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-[2.1rem] font-black text-[#0B1B35] tracking-tight leading-snug hover:text-[#C69A45] transition-colors duration-300 cursor-default">
                  Decades of Concrete Reality in India
                </h3>

                {/* Highlighted text with letter-by-letter typing animation aligned in paragraph style */}
                <p className="text-base sm:text-lg text-[#172033]/85 font-sans leading-relaxed min-h-[4rem] text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  {(() => {
                    let accumulated = 0;
                    return ABOUT_DESC_SEGMENTS.map((seg, idx) => {
                      const segStart = accumulated;
                      accumulated += seg.text.length;
                      if (aboutCharsTyped <= segStart) return null;
                      const visiblePart = seg.text.slice(0, Math.max(0, aboutCharsTyped - segStart));
                      return (
                        <span key={idx} className={seg.cls}>
                          {visiblePart}
                        </span>
                      );
                    });
                  })()}
                  {aboutCharsTyped < TOTAL_ABOUT_CHARS && (
                    <span className="inline-block w-1.5 h-4 sm:h-5 bg-[#C69A45] ml-0.5 align-middle animate-pulse" />
                  )}
                </p>

                {/* ─── OBJECTIVE & VISION BOXES (Side by side, beneath the blue-box paragraph) ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* CARD 1: CORE OBJECTIVE */}
                  <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative bg-transparent border-2 border-[#C69A45]/40 rounded-xl overflow-hidden shadow-sm hover:border-[#C69A45] hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#E8E4DA]">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#C69A45]/15 border border-[#C69A45]/35 flex items-center justify-center text-[#C69A45] shrink-0">
                              <Target className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="font-heading font-black text-[13px] tracking-[0.2em] text-[#0B1B35] uppercase block">
                                Our Core Objective
                              </span>
                              <span className="font-mono text-[10px] text-[#5A6573] tracking-wider uppercase">
                                Civil · Mission Statement
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[9px] text-[#5A6573] tracking-wider">
                            REF // OBJ-01
                          </span>
                        </div>

                        {/* Quote */}
                        <div className="font-heading font-bold text-[15px] sm:text-[17.5px] lg:text-[18.5px] text-[#0B1B35] leading-relaxed text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                          <span className="text-[#C69A45] text-lg sm:text-xl mr-1">&ldquo;</span>
                          <ObjectiveVisionTypewriter
                            segments={OBJECTIVE_QUOTE}
                            inView={isInView}
                            speed={16}
                            delay={350}
                          />
                          <span className="text-[#C69A45] text-lg sm:text-xl ml-0.5">&rdquo;</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CARD 2: STRATEGIC VISION */}
                  <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative bg-transparent border-2 border-[#C69A45]/40 rounded-xl overflow-hidden shadow-sm hover:border-[#C69A45] hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#E8E4DA]">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#C69A45]/15 border border-[#C69A45]/35 flex items-center justify-center text-[#C69A45] shrink-0">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="font-heading font-black text-[13px] tracking-[0.2em] text-[#0B1B35] uppercase block">
                                Our Enduring Vision
                              </span>
                              <span className="font-mono text-[10px] text-[#5A6573] tracking-wider uppercase">
                                Civil · Long-Term Commitment
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-[9px] text-[#5A6573] tracking-wider">
                            REF // VIS-02
                          </span>
                        </div>

                        {/* Quote */}
                        <div className="font-heading font-bold text-[15px] sm:text-[17.5px] lg:text-[18.5px] text-[#0B1B35] leading-relaxed text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                          <span className="text-[#C69A45] text-lg sm:text-xl mr-1">&ldquo;</span>
                          <ObjectiveVisionTypewriter
                            segments={VISION_QUOTE}
                            inView={isInView}
                            speed={16}
                            delay={450}
                          />
                          <span className="text-[#C69A45] text-lg sm:text-xl ml-0.5">&rdquo;</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* ─── SECTION 02 & 03 moved beneath the two-column grid ─── */}
            </div>

          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PREMIUM TEAM SECTION – Full-width, visually rich, below the grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <div ref={teamSectionRef} className="relative mt-16 sm:mt-20 lg:mt-24 overflow-hidden">

        {/* ── Blueprint grid background ── */}
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

        {/* ── Ambient gold glow ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C69A45]/6 rounded-full blur-[120px] pointer-events-none" />

        {/* ── HERO INTRO BANNER ── */}
        <div className="relative overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mb-8 sm:mb-10">
          {/* Parallax Background Image */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
              style={{ y: teamParallaxY }}
              className="absolute inset-[-10%] will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=75"
                alt="Construction site"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B35]/94 via-[#0B1B35]/80 to-[#071D3B]/90" />
            {/* Subtle structural line pattern */}
            <div className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, #C69A45 0px, #C69A45 1px, transparent 1px, transparent 60px),
                                  repeating-linear-gradient(0deg, #C69A45 0px, #C69A45 1px, transparent 1px, transparent 60px)`,
              }}
            />
          </div>

          {/* Hero Content – compact height, single-line typography */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-7 sm:py-8 lg:py-9">
            {/* Supertitle badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 mb-2 sm:mb-2.5"
            >
              <span className="w-8 h-[2px] bg-[#C69A45]" />
              <span className="font-mono text-[10px] sm:text-[11px] text-[#C69A45] tracking-[0.25em] uppercase font-bold">
                [ 06 Dedicated Professionals ]
              </span>
            </motion.div>

            {/* Main heading – single line */}
            <div className="overflow-hidden mb-1.5 sm:mb-2">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-black text-white tracking-tight leading-tight lg:whitespace-nowrap"
              >
                The People Behind <span className="text-[#E8C46B]">Our Excellence</span>
              </motion.h2>
            </div>

            {/* Subtitle – single line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-sm sm:text-base lg:text-lg text-white/80 font-medium italic max-w-none lg:whitespace-nowrap"
            >
              Experienced Professionals. Skilled Craftsmen. Stronger Foundations.
            </motion.p>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="mt-3.5 sm:mt-4 w-28 sm:w-40 h-[2px] bg-gradient-to-r from-[#C69A45] via-[#E8C46B] to-transparent rounded-full"
            />
          </div>
        </div>

        {/* ── 6 PREMIUM TEAM CARDS ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamMemberCard key={member.id} member={member} index={idx} />
            ))}
          </div>

          {/* ── Section divider & CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-7 pt-5 border-t border-[#E8E4DA] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="font-mono text-xs text-[#5A6573] tracking-widest uppercase">
                VERIFIED WORKFORCE · RAMASHISH CIVIL CONSTRUCTION
              </p>
              <p className="text-sm text-[#172033]/70 mt-0.5 font-sans">
                Every professional trained, supervised and vetted on live construction sites.
              </p>
            </div>
            <a
              href="#services"
              onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-[#0B1B35] text-white border-2 border-[#C69A45]/60 hover:border-[#C69A45] hover:bg-[#09412B] hover:shadow-lg shadow-[#0B1B35]/20 transition-all duration-300 font-heading font-bold text-sm tracking-wide shrink-0"
            >
              <span>Explore Our Construction Expertise</span>
              <ArrowRight className="w-4 h-4 text-[#E8C46B] group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 03 – OUR WORKING PHILOSOPHY (Placed beneath Team Showcase)
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 pt-4 border-t border-[#E8E4DA]"
        >
          {/* Section Heading */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] text-[#C69A45] font-bold uppercase mb-1.5">
              <span className="w-8 h-[2px] bg-[#C69A45]" />
              [ 03 // CORE WORKING PHILOSOPHY ]
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-black text-[#0B1B35] tracking-tight leading-tight hover:text-[#C69A45] transition-colors duration-300 cursor-default lg:whitespace-nowrap">
              Built on Discipline. Delivered with Precision.
            </h3>
            <p className="text-base sm:text-lg text-[#172033]/85 font-sans leading-relaxed mt-2 text-justify max-w-4xl" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
              We believe strong construction begins with proper planning, quality materials, skilled workmanship and continuous site supervision. Our approach ensures that every project receives attention from its foundation to its finishing stage.
            </p>
          </div>

          {/* Three Compact Visual Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3">
            {PHILOSOPHY_POINTS.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-2xl bg-white border border-[#C69A45]/40 hover:border-[#C69A45] hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0B1B35] text-[#C69A45] flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:bg-[#C69A45] group-hover:text-[#0B1B35] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-black text-base sm:text-lg text-[#0B1B35] group-hover:text-[#C69A45] transition-colors duration-300">
                    {pt.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#172033]/65 font-sans mt-1.5 leading-relaxed">
                    {pt.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
