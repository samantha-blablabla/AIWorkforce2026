import React, { useLayoutEffect, useRef } from 'react';
import { siteData } from '../siteContent';
import RegisterForm from './RegisterForm';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure ScrollTrigger is registered (safe to call multiple times)
gsap.registerPlugin(ScrollTrigger);

// SECTION 1: INTRO
export const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Only apply parallax on mobile vertical scroll
    if (window.innerWidth < 768) {
      const ctx = gsap.context(() => {
        // Parallax Background
        gsap.to(bgRef.current, {
          yPercent: 30, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
        
        // Parallax Text
        gsap.to(textRef.current, {
           yPercent: -10,
           ease: "none",
           scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
           }
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    // Use w-screen to ensure exactly 100vw width in horizontal flex container
    <section ref={sectionRef} className="w-screen min-h-screen md:h-screen flex-shrink-0 relative flex items-center bg-grid pt-20 md:pt-0 overflow-hidden">
      {/* Text aligned with logo position: left-6 md:left-10 */}
      <div ref={textRef} className="relative z-10 max-w-6xl mt-6 md:mt-10 ml-6 md:ml-10">
        <h2 className="text-lg md:text-2xl lg:text-4xl text-gray-200 mb-3 md:mb-4 font-light tracking-wide font-sans">
          {siteData.intro.titleLine1}
        </h2>
        {/* Optimized for laptop: smaller on md, larger on lg */}
        <h1 className="text-4xl md:text-6xl lg:text-[8rem] font-bold leading-[1.1] tracking-tight font-sans">
          <span className="block text-white">{siteData.intro.titleLine2}</span>
          <span className="block text-white">{siteData.intro.titleLine3}</span>
        </h1>
      </div>
    </section>
  );
};

// SECTION 2: OVERVIEW
export const OverviewSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.overview-item-number');
        items.forEach((item: any, i) => {
           gsap.fromTo(item, 
             { y: 0 },
             { 
               y: -30, 
               ease: "none",
               scrollTrigger: {
                 trigger: item.parentNode,
                 start: "top bottom",
                 end: "bottom top",
                 scrub: 1
               }
             }
           );
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-screen min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center bg-[#060606] md:border-r border-white/5 relative pt-24 md:pt-0">
        <div className="w-full px-6 md:px-20 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 border-t-0 border-b-0 md:border-t md:border-b border-white/10 md:border-none py-8 md:py-0">
                {siteData.overview.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`
                            group flex flex-col justify-start p-0 md:p-10 transition-colors duration-500
                            md:hover:bg-white/5
                            min-h-[auto] md:min-h-[400px]
                            border-none
                        `}
                    >
                        <span className="overview-item-number text-5xl md:text-8xl font-bold text-dark-blue-600 mb-2 md:mb-8 font-sans tracking-tight block transform will-change-transform">
                            {item.id}.
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 md:mb-6 text-white leading-tight font-sans tracking-tight">
                            {item.title}
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed font-sans font-light">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

// SECTION 3: ROADMAP
export const RoadmapSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      const ctx = gsap.context(() => {
        gsap.to(glowRef.current, {
           y: 100,
           opacity: 0.5,
           ease: "none",
           scrollTrigger: {
             trigger: sectionRef.current,
             start: "top bottom",
             end: "bottom top",
             scrub: true
           }
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-screen min-h-screen md:h-screen flex-shrink-0 flex items-center px-6 md:px-20 md:border-r border-white/5 bg-[#060606] relative overflow-visible pt-24 md:pt-0 pb-20 md:pb-0">
        <div ref={glowRef} className="absolute bottom-0 left-1/4 w-[800px] h-[600px] bg-dark-blue-900/20 rounded-full blur-[120px] will-change-transform"></div>

        <div className="w-full relative z-10">
            
            <div className="relative mt-10 md:mt-20">
                <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-dark-blue-900/30 via-dark-blue-600 to-dark-blue-900/30"></div>
                <div className="md:hidden absolute top-0 left-[5px] w-[2px] h-full bg-gradient-to-b from-dark-blue-600 via-dark-blue-900 to-transparent"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {siteData.roadmap.map((item, idx) => (
                        <div key={idx} className="relative group cursor-pointer perspective-1000 pl-8 md:pl-0 pt-0 md:pt-24">
                            <div className="absolute top-2 left-0 md:top-[34px] md:left-0 w-3 h-3 rounded-full bg-dark-blue-600 ring-4 md:ring-8 ring-[#050505] group-hover:scale-150 transition-transform duration-300 shadow-[0_0_20px_rgba(107,0,255,0.5)] z-20"></div>
                            
                            <span className="text-dark-blue-400 font-sans text-lg md:text-xl mb-1 md:mb-3 block tracking-wider group-hover:text-white transition-colors duration-300">{item.quarter}</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 leading-none group-hover:text-dark-blue-300 transition-colors duration-300 font-sans">{item.title}</h3>
                            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xs md:group-hover:opacity-0 transition-opacity duration-300 font-sans">{item.details}</p>

                            <div className="hidden md:block absolute bottom-full left-0 mb-8 w-72 p-6 bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30 shadow-2xl shadow-dark-blue-900/30 pointer-events-none group-hover:pointer-events-auto">
                                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#111] border-b border-r border-white/10 transform rotate-45"></div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-dark-blue-900/50 flex items-center justify-center text-dark-blue-400 border border-dark-blue-500/30">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <div>
                                      <span className="text-xs font-sans text-dark-blue-300 uppercase block tracking-widest">Milestone</span>
                                      <span className="text-white font-bold text-sm font-sans">{item.quarter}</span>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-sans">{item.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

// SECTION 4: REGISTRATION - Match template exactly
export const RegistrationSectionComponent: React.FC = () => {
  return (
    <section className="w-screen min-h-screen md:h-screen flex-shrink-0 flex flex-col md:flex-row relative overflow-hidden pt-20 md:pt-0">
        {/* Background Image - Same as Loader */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/Template/BG.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Purple Glow - Bottom Left like template */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,_rgba(107,0,255,0.4)_0%,_rgba(130,55,255,0.25)_40%,_transparent_70%)] pointer-events-none blur-[120px]"></div>

        {/* Left Side - Slogan */}
        <div className="w-full md:w-1/2 h-auto md:h-full relative flex flex-col justify-center px-6 md:pl-20 md:pr-10 z-10 pb-8 md:pb-0">
             <div className="relative">
                 <h3 className="text-lg md:text-xl font-light text-gray-300 mb-3 tracking-wide font-sans">
                    {siteData.registration.sloganSmall}
                 </h3>
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-white font-sans">
                    <span className="block">{siteData.registration.sloganLine1}</span>
                    <span className="block">{siteData.registration.sloganLine2}</span>
                 </h2>
             </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 lg:px-20 relative z-10 pb-20 md:pb-0">
             <RegisterForm />
        </div>
    </section>
  );
};
