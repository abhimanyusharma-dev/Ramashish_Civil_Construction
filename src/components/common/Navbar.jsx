import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, FileText, Play, PhoneCall, Calculator } from 'lucide-react';
import { navLinks } from '../../data/company';

export default function Navbar({ onReplayIntro }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener for sticky styling and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === '/') {
        const sections = ['home', 'services', 'projects', 'process', 'about', 'why-us', 'contact'];
        const scrollPosition = window.scrollY + 220;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${targetId}`);
      }
    } else if (href.startsWith('#')) {
      const el = document.getElementById(href.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/98 backdrop-blur-md border-b border-[#E8E4DA] shadow-sm`}
      >
        {/* TOP ROW: Full Screen Width Brand Presentation (Large Logo + ONE LINE Brand Name) */}
        <div className={`w-full px-4 sm:px-8 lg:px-12 xl:px-16 transition-all duration-300 ${scrolled ? 'py-1.5 sm:py-2' : 'py-2 sm:py-2.5'} border-b border-[#E8E4DA]/60 flex items-center justify-between`}>
          <Link
            to="/"
            className="flex items-center gap-3 sm:gap-4 group focus:outline-none"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Architectural Brand Emblem (Official Uploaded Graphic - Reduced 20%) */}
            <div className={`transition-all duration-300 ${scrolled ? 'h-10 sm:h-11 md:h-13' : 'h-13 sm:h-16 md:h-18'} w-auto flex items-center justify-center shrink-0`}>
              <img
                src="/images/brand/official-emblem.png"
                alt="RAMASHISH CIVIL CONSTRUCTION"
                className="h-full w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(7,27,54,0.15)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* RAMASHISH - CIVIL CONSTRUCTION (Official HD Wordmark Graphic - Reduced 20%) */}
            <div className={`transition-all duration-300 ${scrolled ? 'h-8 sm:h-9 md:h-10' : 'h-10 sm:h-13 md:h-14'} w-auto flex items-center`}>
              <img
                src="/images/brand/official-wordmark.png"
                alt="RAMASHISH CIVIL CONSTRUCTION"
                className="h-full w-auto max-w-[170px] sm:max-w-[270px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[490px] object-contain filter drop-shadow-[0_1px_4px_rgba(7,27,54,0.12)]"
              />
            </div>
          </Link>

          {/* Mobile Menu & Quick Contact Call Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+919827386803"
              className="contact-animated-btn px-2.5 py-1.5 rounded-lg border text-xs font-heading font-extrabold flex items-center gap-1.5 shadow-xs"
              title="Call 9827386803"
            >
              <PhoneCall className="w-3.5 h-3.5 contact-phone-icon shrink-0" />
              <span className="font-mono text-[11px] font-bold">9827386803</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#071B36] hover:text-[#C99A32] hover:bg-[#F7F7F5] focus:outline-none transition-colors border border-[#E8E4DA]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* BOTTOM ROW (UNDERNEATH): Navigation Menu & "GET YOUR FREE QUOTATION" CTA */}
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-2 hidden lg:flex items-center justify-between bg-[#FBFBFA]/90">
          {/* Navigation Links: Home, About, Services, Projects, Process, Why Us, Contact + Contact Phone Badge */}
          <nav className="flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('/#', '').replace('#', '');
              const isActive = location.pathname === '/' && activeSection === sectionId;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-xs uppercase tracking-[0.16em] font-heading font-bold transition-all py-1.5 relative group cursor-pointer ${
                    isActive ? 'text-[#C99A32]' : 'text-[#071B36] hover:text-[#C99A32]'
                  }`}
                >
                  {link.name}
                  {isActive ? (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute left-0 bottom-0 w-full h-[2px] bg-[#C99A32]"
                    />
                  ) : (
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C99A32] transition-all duration-300 group-hover:w-full" />
                  )}
                </button>
              );
            })}

            {/* Animated Contact Phone Button positioned directly on the right side of CONTACT */}
            <a
              href="tel:+919827386803"
              className="contact-animated-btn px-3 py-1.5 rounded-lg border-2 text-xs font-heading font-extrabold flex items-center gap-2 cursor-pointer transition-all shadow-sm group select-none ml-1 sm:ml-2"
              title="Call RAMASHISH Civil Construction (Sandeep Sharma): 9827386803"
            >
              <PhoneCall className="w-3.5 h-3.5 contact-phone-icon shrink-0" />
              <span className="font-mono text-xs font-bold tracking-wider">9827386803</span>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/house-construction-calculator"
              className="btn-quotation px-5 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-[#E8C46B]" />
              <span>Build Cost Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E8C46B] transition-transform" />
            </Link>
            <button
              onClick={() => handleNavClick('/#contact')}
              className="btn-quotation-green px-5 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all group"
            >
              <FileText className="w-3.5 h-3.5 text-[#E8C46B]" />
              <span>GET YOUR FREE QUOTATION</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E8C46B] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Responsive overlay with brand and navigation) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] bg-white/98 backdrop-blur-xl z-40 lg:hidden flex flex-col p-6 overflow-y-auto border-t border-[#E8E4DA]"
          >
            <div className="flex flex-col space-y-3 my-auto py-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-base font-heading font-bold tracking-wider uppercase text-[#071B36] hover:text-[#C99A32] transition-colors py-2.5 border-b border-[#E8E4DA] flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#C99A32]" />
                </button>
              ))}



              <div className="pt-4 space-y-3">
                {/* Mobile Call CTA */}
                <a
                  href="tel:+919827386803"
                  className="contact-animated-btn w-full py-3.5 px-4 rounded-lg border-2 text-xs font-heading font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md"
                >
                  <PhoneCall className="w-4 h-4 contact-phone-icon" />
                  <span>CALL DIRECT: 9827386803</span>
                </a>

                {/* Mobile Build Cost Calculator Button */}
                <Link
                  to="/house-construction-calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-quotation w-full py-3.5 px-4 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calculator className="w-4 h-4 text-[#E8C46B]" />
                  <span>Build Cost Calculator</span>
                </Link>

                {/* Mobile Quotation Button */}
                <button
                  onClick={() => handleNavClick('/#contact')}
                  className="btn-quotation-green w-full py-3.5 px-4 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <FileText className="w-4 h-4 text-[#E8C46B]" />
                  <span>GET YOUR FREE QUOTATION</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
