import React from 'react';
import { Home, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { company } from '../data/company';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#172238] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Blueprint Ambient Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center bg-[#F8F6F0] border border-[#E8E4DA] p-8 sm:p-12 shadow-xl rounded-2xl">
        <div className="w-16 h-16 border-2 border-[#C99A32] bg-white rounded-xl flex items-center justify-center mx-auto mb-6 text-[#0B2347] shadow-sm">
          <span className="font-heading font-black text-2xl text-[#0B2347]">404</span>
        </div>

        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C99A32] mb-2 font-bold">
          PAGE NOT FOUND
        </p>

        <h1 className="font-heading text-3xl sm:text-4xl font-black text-[#0B2347] mb-4">
          BLUEPRINT NOT LOCATED.
        </h1>

        <div className="section-divider mx-auto mb-6" />

        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-8">
          The architectural plan or page you requested does not exist or has been relocated within the Shree Ram Ashish portfolio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            to="/"
            icon={Home}
            iconPosition="left"
            className="bg-[#C99A32] text-[#0B2347] font-bold"
          >
            Return to Homepage
          </Button>

          <Button
            variant="outline"
            size="md"
            href="tel:+919827386803"
            icon={Phone}
            iconPosition="left"
            className="border-[#0B2347] text-[#0B2347]"
          >
            Call Contractor
          </Button>
        </div>
      </div>
    </div>
  );
}
