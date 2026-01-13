import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit Animation: Smooth slide up like cargokite
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: onComplete
        });
      }
    });

    // Subtle glow animation in background
    gsap.to(glowRef.current, {
      x: "10%",
      y: "10%",
      scale: 1.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 1. Line appears first (cargokite style - thin line)
    tl.fromTo(".loader-line",
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.2, ease: "power2.out" }
    );

    // 2. Percentage counter (cargokite style - smooth, realistic loading)
    tl.addLabel("counting", "-=0.8");

    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 60,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      }
    }, "counting");

    // 3. Stage 1 text reveal (0-60%)
    tl.fromTo(".loader-text-stage1",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "counting+=0.5"
    );

    // 4. Continue counting to 100% (slower, realistic)
    tl.to(progressObj, {
      value: 100,
      duration: 2.0,
      ease: "power1.inOut", // Realistic slow down
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      }
    });

    // 5. Stage 2 text reveal (60-100%)
    tl.fromTo(".loader-text-stage2",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=1.5"
    );

    // 6. Hold at 100% briefly before exit
    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#060606] flex flex-col justify-center px-6 md:px-24 font-sans overflow-hidden"
    >
      {/* Background Image - Full opacity as template */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/Template/BG.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Purple Glow Background - Animated (cargokite style) */}
      <div
        ref={glowRef}
        className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(107,0,255,0.35)_0%,_rgba(130,55,255,0.2)_40%,_transparent_70%)] pointer-events-none blur-[100px] opacity-60"
      ></div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Percentage Display - Optimized for laptop screens */}
        <div className="flex items-start leading-none mb-4 md:mb-6">
          <h1 className="text-[20vw] md:text-[12rem] lg:text-[14rem] font-light text-white tracking-tighter tabular-nums leading-none font-sans">
            {progress}
          </h1>
          <span className="text-4xl md:text-6xl lg:text-7xl text-white font-light mt-4 md:mt-8 lg:mt-10 ml-2 opacity-90">%</span>
        </div>

        {/* Separator Line - CargoKite style (thin, elegant) */}
        <div className="w-full h-[1px] bg-white/20 mb-6 md:mb-10 overflow-hidden">
          <div className="loader-line h-full bg-gradient-to-r from-dark-blue-600 via-dark-blue-500 to-dark-blue-600"></div>
        </div>

        {/* Text Block - Stage reveals - Optimized sizing */}
        <div className="space-y-2 md:space-y-4">
          {/* Stage 1: Reveals at 0-60% */}
          <p className="loader-text-stage1 text-lg md:text-2xl lg:text-3xl text-gray-400 font-light tracking-wide opacity-0">
            AI Workforce 2026
          </p>

          {/* Stage 2: Reveals at 60-100% */}
          <div className="space-y-1 md:space-y-2">
            <h2 className="loader-text-stage2 text-3xl md:text-5xl lg:text-7xl font-normal text-white leading-[1.05] tracking-tight opacity-0">
              Rước Bot Về Nhà
            </h2>
            <h2 className="loader-text-stage2 text-3xl md:text-5xl lg:text-7xl font-normal text-white leading-[1.05] tracking-tight opacity-0">
              Chăm Lo Việc Nhà
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loader;