import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit Animation: Slide up
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: "power4.inOut",
          onComplete: onComplete
        });
      }
    });

    // 1. Animate Line Expansion
    // Thicker line as requested
    tl.fromTo(".loader-line", 
      { width: 0 },
      { width: "100%", duration: 1.5, ease: "power3.inOut" }
    );

    // 2. Parallel: Count up & Text Reveal
    tl.addLabel("content");
    
    // Animate progress 0 -> 100 with "latency" (slow end)
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 3.5, // Slower duration
      ease: "expo.out", // Fast start, very slow ("laggy") end
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      }
    }, "content-=1"); 

    // Text Stagger Reveal
    tl.fromTo(".loader-text", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "content-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-center px-6 md:px-24 font-sans overflow-hidden"
    >
      {/* Purple Glow Background - Top Right Swoosh */}
      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,_rgba(107,0,255,0.4)_0%,_transparent_70%)] pointer-events-none blur-[60px]"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-5xl">
        
        {/* Percentage Display */}
        <div className="flex items-start leading-none mb-4 md:mb-6">
          {/* Font weight 400 (font-normal) as requested */}
          <h1 className="text-[25vw] md:text-[14rem] font-normal text-[#E0E0E0] tracking-tighter tabular-nums leading-none font-sans">
            {progress}
          </h1>
          <span className="text-4xl md:text-6xl text-[#E0E0E0] font-normal mt-4 md:mt-8 ml-1">%</span>
        </div>

        {/* Separator Line - Thicker (h-[2px]) */}
        <div className="loader-line w-full h-[2px] bg-gray-500 mb-8 md:mb-12"></div>

        {/* Text Block */}
        <div className="space-y-2 md:space-y-4">
          <p className="loader-text text-xl md:text-3xl text-gray-400 font-normal tracking-wide">
            AI Workforce 2026
          </p>
          <h2 className="loader-text text-4xl md:text-7xl font-medium text-white leading-[1.1] tracking-tight">
            <span className="block">Rước Bot Về Nhà</span>
            <span className="block">Chăm Lo Việc Nhà</span>
          </h2>
        </div>

      </div>
    </div>
  );
};

export default Loader;