import React, { useRef, useCallback, useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * ConstructionIntro — full-screen brand intro video.
 * - Hides video until canplaythrough fires (no stutter on first frame)
 * - Plays exactly once, never loops
 * - Pauses on the final frame, then fades out into the home page
 */
export default function ConstructionIntro({ onComplete, onSkip }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const finishingRef = useRef(false);
  const fallbackRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  const finish = useCallback((fast = false) => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    clearTimeout(fallbackRef.current);

    if (videoRef.current) videoRef.current.pause();

    const dur = fast ? 0.3 : 0.6;
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: dur,
        ease: 'power2.inOut',
        onComplete: () => { if (onComplete) onComplete(); },
      });
    } else {
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = false;

    const onReady = () => {
      setVideoReady(true);
      video.play().catch(() => {});
      // Safety fallback: video duration + 1s buffer
      const dur = isFinite(video.duration) && video.duration > 0
        ? (video.duration * 1000) + 1000
        : 8000;
      fallbackRef.current = setTimeout(() => finish(false), dur);
    };

    if (video.readyState >= 4) {
      // Already buffered (e.g. cached)
      onReady();
    } else {
      video.addEventListener('canplaythrough', onReady, { once: true });
    }

    return () => {
      video.removeEventListener('canplaythrough', onReady);
      clearTimeout(fallbackRef.current);
    };
  }, [finish]);

  return (
    <div
      ref={containerRef}
      style={{ zIndex: 999999 }}
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-[#dcdcdc]"
    >
      {/* Video — hidden via opacity until buffered, so first frame shows cleanly */}
      <video
        ref={videoRef}
        src="/Final_logo_of_RCC_6sec.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={() => finish(false)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Loading spinner shown while video buffers */}
      {!videoReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#D9A126] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Skip Intro button */}
      <button
        onClick={() => finish(true)}
        className="absolute top-6 right-6 z-10 inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest uppercase text-[#071D3B] bg-white border border-[#D9A126] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#F8F8F6] hover:border-[#F3CF76] transition-all duration-200 shadow-md"
      >
        <span>SKIP INTRO</span>
        <span className="text-[#D9A126]">➔</span>
      </button>
    </div>
  );
}
