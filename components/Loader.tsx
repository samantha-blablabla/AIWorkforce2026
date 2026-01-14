import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  // Preload BG image
  useEffect(() => {
    const img = new Image();
    img.src = '/Template/BG.png';
    img.onload = () => setBgLoaded(true);
    const timeout = setTimeout(() => setBgLoaded(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (bgLoaded && bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [bgLoaded]);

  useEffect(() => {
    // Smooth counter using requestAnimationFrame
    let animationId: number;
    const updateCounter = () => {
      const current = progressRef.current;
      const displayed = progress;
      if (Math.abs(current - displayed) > 0.5) {
        setProgress(Math.round(current));
      }
      animationId = requestAnimationFrame(updateCounter);
    };
    animationId = requestAnimationFrame(updateCounter);

    // Update progress bar width based on progress
    const updateProgressBar = () => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressRef.current}%`;
      }
      requestAnimationFrame(updateProgressBar);
    };
    requestAnimationFrame(updateProgressBar);

    const tl = gsap.timeline({
      onComplete: () => {
        // EXIT TRANSITION for loader-specific elements
        const exitTl = gsap.timeline({
          onComplete: onComplete // Trigger phase change in App
        });

        // 1. Percent slides UP and fades
        exitTl.to(percentRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        });

        // 2. Progress bar slides LEFT and fades
        exitTl.to(".loader-progress-container", {
          x: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, "-=0.3");

        // 3. BG and grid fade out
        exitTl.to([bgRef.current, ".loader-grid"], {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3");

        // 4. Container background becomes transparent
        exitTl.to(containerRef.current, {
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.3");
      }
    });

    // Text reveal animations for SharedTitle (targeting by class)
    // Stage 1 text reveal - slide from bottom
    tl.fromTo(".title-line-1",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "+=0.3"
    );

    // Counter animation - Phase 1: 0-40% (fast start)
    tl.to(progressRef, {
      current: 40,
      duration: 1.0,
      ease: "power1.out",
    }, "<");

    // Phase 2: 40-80% (slow middle)
    tl.to(progressRef, {
      current: 80,
      duration: 1.6,
      ease: "power1.inOut",
    });

    // Stage 2 text reveal - staggered slide from bottom for main titles
    tl.fromTo(".title-line-2, .title-line-3",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=1.2"
    );

    // Phase 3: 80-100% (accelerate to finish)
    tl.to(progressRef, {
      current: 100,
      duration: 0.6,
      ease: "power2.in",
    });

    // Small pause before transition
    tl.to({}, { duration: 0.3 });

    return () => {
      cancelAnimationFrame(animationId);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-[#060606] font-sans overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          ref={bgRef}
          src="/Template/BG.png"
          alt=""
          className="w-full h-full object-cover opacity-0"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Grid overlay */}
      <div className="loader-grid absolute inset-0 bg-grid opacity-[0.05] pointer-events-none"></div>

      {/* Content - FLEX COLUMN LAYOUT */}
      {/* Progress on TOP, Title BELOW with gap */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-4 md:px-10 lg:px-16 flex flex-col gap-4 md:gap-6">

          {/* ===== PROGRESS SECTION (TOP) - z-[100] below SharedTitle z-[110] ===== */}
          <div className="relative z-[100]">
            {/* Percentage Display - Larger like template */}
            <div ref={percentRef} className="flex items-start leading-none mb-2 md:mb-4">
              <h1 className="text-[18vw] md:text-[10rem] lg:text-[12rem] font-light text-white tracking-tighter tabular-nums leading-none font-sans">
                {progress}
              </h1>
              <span className="text-3xl md:text-5xl lg:text-6xl text-white font-light mt-3 md:mt-5 lg:mt-8 ml-1 opacity-80">%</span>
            </div>

            {/* Progress Bar - Full width with padding */}
            <div className="loader-progress-container w-full h-[2px] md:h-[3px] bg-white/15 overflow-hidden rounded-full">
              <div
                ref={progressBarRef}
                className="loader-progress-bar h-full bg-gradient-to-r from-dark-blue-500 via-dark-blue-400 to-dark-blue-500 rounded-full transition-none"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>

          {/* ===== TITLE PLACEHOLDER ===== */}
          {/* SharedTitle is rendered at App level with GSAP animation */}
          {/* This space provides layout reference */}

        </div>
      </div>
    </div>
  );
};

export default Loader;
