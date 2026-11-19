import React, { useState, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { CLIENT_REVIEWS } from '../../data/clientReviews';

export default function ClientReviewsMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-[#07200F] border border-[#1A4A28] px-4 sm:px-6 lg:px-7 pt-3.5 sm:pt-4 pb-0 shadow-md overflow-hidden mb-8 sm:mb-10">
      {/* Blueprint grid ambient layer */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {/* Golden Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C99A32]/60 rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C99A32]/60 rounded-bl-2xl sm:rounded-bl-3xl pointer-events-none" />

      {/* Decorative watermark quote */}
      <Quote className="w-16 h-16 sm:w-20 sm:h-20 text-[#C99A32]/10 absolute -top-2 -left-2 pointer-events-none" />

      {/* Header: Centered Heading */}
      <div className="text-center relative z-10 mb-2 sm:mb-2.5">
        <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
          What Our Clients Say
        </h3>
      </div>

      {/* Horizontal Continuous Marquee Track */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-7 overflow-hidden">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#07200F] via-[#07200F]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#07200F] via-[#07200F]/80 to-transparent z-10" />

        {/* Scroll Container with Touch / Hover Pause */}
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="flex gap-4 sm:gap-5 py-2.5 px-4 sm:px-6 w-max animate-marquee-rtl"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '85s',
            }}
          >
            {[...CLIENT_REVIEWS, ...CLIENT_REVIEWS].map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-[260px] sm:w-[275px] shrink-0 bg-white border border-[#E8E4DA] hover:border-[#C99A32] rounded-xl p-3.5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-default"
              >
                <div>
                  {/* Client Header: Photo, Name, Location & Stars */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#C99A32]/40 shrink-0 shadow-sm"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-bold text-xs sm:text-[13px] text-[#071B36] truncate leading-snug group-hover:text-[#C99A32] transition-colors">
                        {review.name}
                      </h4>
                      <p className="font-mono text-[9.5px] text-[#C99A32] font-semibold truncate">
                        {review.location}
                      </p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(review.rating)].map((_, s) => (
                          <Star key={s} className="w-2.5 h-2.5 fill-[#E8C46B] text-[#E8C46B]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Short Feedback Quote */}
                  <p
                    className="text-[11px] sm:text-[11.5px] text-[#172033]/80 font-sans leading-relaxed text-justify line-clamp-3 mb-2.5 italic"
                    style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                  >
                    &ldquo;{review.feedback}&rdquo;
                  </p>
                </div>

                {/* Small Image of Work with Project Name & Year */}
                <div className="relative rounded-lg overflow-hidden aspect-[16/9] border border-[#E8E4DA] bg-[#071B36]">
                  <img
                    src={review.workImage}
                    alt={review.projectName}
                    className="w-full h-full object-cover filter contrast-[1.02] group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/85 via-[#071B36]/25 to-transparent pointer-events-none" />
                  <span className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white font-mono text-[8.5px] font-bold tracking-wider uppercase pointer-events-none">
                    <span className="truncate pr-1 text-white/95">{review.projectName}</span>
                    <span className="text-[#E8C46B] shrink-0 font-semibold">{review.year}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
