import React, { useEffect, useState, useRef } from 'react';
import { siteData } from '../siteContent';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rhythmic loading simulation
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit Animation: Slide up like a curtain
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete
        });
      }
    });

    // Animate progress 0 -> 100 with "rhythm" (slow start, fast middle, slow end)
    const progressObj = { value: 0 };
    
    tl.to(progressObj, {
      value: 100,
      duration: 3.5,
      ease: "expo.inOut", // The "rhythmic" ease
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      }
    });

    // Text reveal animation
    gsap.fromTo(textRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // Format number to always be at least 2 digits (e.g., 01, 05, 99)
  const formattedProgress = progress < 10 ? `0${progress}` : progress;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-6 md:p-12 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-dark-blue-900/20 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Top Header during loading */}
      <div className="flex justify-between items-start opacity-50 relative z-10">
        <span className="text-sm tracking-widest uppercase">AI Workforce</span>
        <span className="text-sm tracking-widest uppercase">2026</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-end md:items-end justify-between w-full mb-10 md:mb-0 relative z-10">
        
        {/* Text Info */}
        <div ref={textRef} className="mb-10 md:mb-4 relative z-10">
           <h2 className="text-3xl md:text-5xl font-medium leading-tight text-white">
            {siteData.intro.titleLine1}
          </h2>
          <p className="text-dark-blue-400 mt-2 text-lg md:text-xl">
             Loading Experience...
          </p>
        </div>

        {/* Big Counter */}
        <div className="relative z-10 flex items-baseline leading-none">
          <h1 className="text-[25vw] md:text-[20vw] font-bold text-white tracking-tighter leading-none -mb-4 md:-mb-10">
            {formattedProgress}
          </h1>
          <span className="text-2xl md:text-5xl font-light text-dark-blue-500 ml-2 md:ml-4 -translate-y-4 md:-translate-y-8">
            %
          </span>
        </div>
      </div>

      {/* Progress Bar Line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/10">
        <div 
          className="h-full bg-dark-blue-600 transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Loader;
