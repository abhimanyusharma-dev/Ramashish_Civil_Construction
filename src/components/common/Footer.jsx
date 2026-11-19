import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Mail, ShieldCheck, User, Share2 } from 'lucide-react';
import { company, navLinks } from '../../data/company';

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#071B36] to-[#051326] text-white relative overflow-hidden border-t-2 border-[#C99A32]">
      {/* Blueprint Grid Watermark in Navy */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {/* Large Brand Wordmark Background Watermark */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-[0.04] z-0">
        <span className="font-heading font-black italic text-[16vw] tracking-tighter text-[#C99A32] leading-none whitespace-nowrap block">
          RAMASHISH
        </span>
      </div>

      {/* Subtle Ambient Gold Glow in Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#C99A32]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            {/* Official Brand Identity (Emblem + Large Wordmark Image) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <div className="h-16 sm:h-18 w-auto flex items-center justify-center shrink-0 bg-white p-1.5 rounded-lg border border-[#C99A32]/40 shadow-md">
                <img
                  src="/images/brand/official-emblem.png"
                  alt="RAMASHISH Official Emblem"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-16 sm:h-18 w-auto flex items-center bg-white px-3 py-1.5 rounded-lg border border-[#C99A32]/40 shadow-md">
                <img
                  src="/images/brand/official-wordmark.png"
                  alt="RAMASHISH CIVIL CONSTRUCTION"
                  className="h-full w-auto max-w-[300px] sm:max-w-[420px] object-contain"
                />
              </div>
            </div>

            <p className="text-xs text-white/75 leading-relaxed pt-2 font-sans">
              Led by <strong className="text-white">Sandeep Sharma</strong> with 25+ years of practical civil engineering excellence and 150+ completed projects. Constructing landmark residential villas, commercial infrastructure, and heavy RCC structures.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[#E8C46B] text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C99A32]" />
              <span>25+ Years of Engineering Trust</span>
            </div>

            {/* Social Media & Contact Icons */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-[11px] font-mono text-white/60">Connect:</span>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors shadow-sm"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="tel:+919827386803"
                className="w-8 h-8 rounded bg-white/10 hover:bg-[#C99A32] text-white flex items-center justify-center transition-colors shadow-sm"
                title="Direct Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C99A32] rounded-sm" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-heading">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#E8C46B] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-[#C99A32]">›</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C99A32] rounded-sm" />
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-sans">
              {company.services.map((srv, idx) => (
                <li key={idx}>
                  <a
                    href="/#services"
                    className="hover:text-[#E8C46B] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-[#C99A32] font-mono font-bold">0{idx + 1}.</span> {srv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Direct Connect */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C99A32] rounded-sm" />
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C99A32] shrink-0 mt-0.5" />
                <span>{company.location}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C99A32] shrink-0" />
                <a
                  href="tel:+919827386803"
                  className="hover:text-[#E8C46B] transition-colors font-mono font-bold text-white text-sm"
                >
                  +91 9827386803
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors font-mono text-white"
                >
                  WhatsApp: +91 9827386803
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C99A32] shrink-0" />
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-[#E8C46B] transition-colors font-mono"
                >
                  {company.email}
                </a>
              </div>

              <div className="pt-3 flex gap-2">
                <a
                  href="tel:+919827386803"
                  className="px-3.5 py-2 bg-[#C99A32] text-[#071B36] text-[11px] font-heading font-bold rounded-md hover:bg-[#9E7422] hover:text-white transition-colors shadow-sm"
                >
                  Call Direct
                </a>
                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#25D366] text-white text-[11px] font-heading font-bold rounded-md hover:bg-[#1ebe5b] transition-colors shadow-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Image 3: Exact Bottom Proprietor & Phone Ribbon */}
        <div className="my-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#051326] via-[#071B36] to-[#051326] border-t-2 border-b-2 border-[#C99A32] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Sandeep Sharma PROPRIETOR */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#C99A32] text-[#071B36] flex items-center justify-center font-bold shadow-md">
              <User className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h5 className="font-heading text-lg sm:text-xl font-black text-white leading-tight">
                Sandeep Sharma
              </h5>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#E8C46B] uppercase font-bold block">
                PROPRIETOR
              </span>
            </div>
          </div>

          {/* Right: Phone Direct Dial */}
          <a
            href="tel:+919827386803"
            className="flex items-center gap-3 bg-[#C99A32] hover:bg-[#9E7422] text-[#071B36] hover:text-white px-6 py-2.5 rounded-lg font-mono font-black text-lg sm:text-xl tracking-wider shadow-md hover:scale-[1.02] transition-all"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>9827386803</span>
          </a>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {CURRENT_YEAR} {company.name}. All rights reserved.</p>
          <p className="font-mono text-[11px] text-white/50">
            Constructed with Precision · Civil Engineering Excellence · Bhopal, India
          </p>
        </div>
      </div>
    </footer>
  );
}
