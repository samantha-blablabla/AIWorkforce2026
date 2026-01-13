import React from 'react';
import { siteData } from '../siteContent';
import RegisterForm from './RegisterForm';

// SECTION 1: INTRO
export const IntroSection: React.FC = () => {
  return (
    <section className="w-screen h-screen flex-shrink-0 relative flex items-center px-6 md:px-20 bg-grid">
      <div className="relative z-10 max-w-6xl mt-20">
        <h2 className="text-2xl md:text-4xl text-gray-200 mb-4 font-light tracking-wide font-sans">
          {siteData.intro.titleLine1}
        </h2>
        <h1 className="text-6xl md:text-[8rem] font-bold leading-[0.9] tracking-tighter font-sans">
          <span className="block text-white">{siteData.intro.titleLine2}</span>
          <span className="block text-white">{siteData.intro.titleLine3}</span>
        </h1>
      </div>
      
      {/* Background Visual Element */}
      <div className="absolute top-0 right-0 w-full h-full md:w-3/5 opacity-40 mix-blend-overlay pointer-events-none">
         <img 
            src={siteData.intro.bgImage} 
            alt="AI Visual" 
            className="w-full h-full object-cover grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]"></div>
      </div>
    </section>
  );
};

// SECTION 2: OVERVIEW
export const OverviewSection: React.FC = () => {
  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-[#050505] border-r border-white/5 relative">
        <div className="w-full px-6 md:px-20 flex flex-col justify-center">
            
            {/* 
              Grid Layout: 
              - Vertically centered in the viewport
              - Items inside are top-aligned
              - Removed border-white/10 and border-l logic
            */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-b border-white/10 md:border-none py-12 md:py-0">
                {siteData.overview.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`
                            group flex flex-col justify-start p-8 md:p-10 transition-colors duration-500
                            hover:bg-white/5
                            min-h-[400px] /* Ensure uniform height for alignment */
                        `}
                    >
                        {/* Number */}
                        <span className="text-7xl md:text-8xl font-bold text-dark-blue-600 mb-8 font-sans tracking-tight">
                            {item.id}.
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight font-sans tracking-tight">
                            {item.title}
                        </h3>
                        
                        {/* Description */}
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
  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center px-6 md:px-20 border-r border-white/5 bg-[#050505] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[600px] bg-dark-blue-900/20 rounded-full blur-[120px]"></div>

        <div className="w-full relative z-10">
            <h2 className="text-[15vw] font-bold text-white/5 absolute -top-1/2 left-0 pointer-events-none select-none leading-none tracking-tighter font-sans">
                ROADMAP
            </h2>
            
            <div className="relative mt-20">
                {/* Horizontal Line */}
                <div className="absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-dark-blue-900/30 via-dark-blue-600 to-dark-blue-900/30"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {siteData.roadmap.map((item, idx) => (
                        <div key={idx} className="relative pt-24 group cursor-pointer perspective-1000">
                            {/* Dot on line */}
                            <div className="absolute top-[34px] left-0 w-3 h-3 rounded-full bg-dark-blue-600 ring-8 ring-[#050505] group-hover:scale-150 transition-transform duration-300 shadow-[0_0_20px_rgba(107,0,255,0.5)] z-20"></div>
                            
                            <span className="text-dark-blue-400 font-sans text-xl mb-3 block tracking-wider group-hover:text-white transition-colors duration-300">{item.quarter}</span>
                            <h3 className="text-3xl font-bold text-white mb-3 leading-none group-hover:text-dark-blue-300 transition-colors duration-300 font-sans">{item.title}</h3>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-xs group-hover:opacity-0 transition-opacity duration-300 font-sans">{item.details}</p>

                            {/* HOVER TOOLTIP / MODAL - Positioned ABOVE the timeline */}
                            <div className="absolute bottom-full left-0 mb-8 w-72 p-6 bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30 shadow-2xl shadow-dark-blue-900/30 pointer-events-none group-hover:pointer-events-auto">
                                {/* Arrow pointing DOWN */}
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
                                <div className="w-full h-[1px] bg-white/10 mb-3"></div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-white/40 font-sans">Priority: High</span>
                                  <div className="text-xs text-dark-blue-400 flex items-center gap-1 group/link font-sans">
                                      <span>Explore</span>
                                      <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                  </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

// SECTION 4: REGISTRATION
export const RegistrationSectionComponent: React.FC = () => {
  return (
    <section className="w-screen h-screen flex-shrink-0 flex flex-col md:flex-row bg-[#050505] relative overflow-hidden">
        {/* Background Visual: Radial Purple Glow mimicking the reference */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_rgba(107,0,255,0.2),_transparent_60%)] pointer-events-none z-0"></div>

        {/* Left Side: Text Content */}
        <div className="hidden md:flex w-1/2 h-full relative flex-col justify-center pl-24 pr-10 z-10">
             <div className="relative">
                 <h3 className="text-2xl font-normal text-white mb-2 tracking-wide font-sans">
                    {siteData.registration.sloganSmall}
                 </h3>
                 <h2 className="text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white font-sans">
                    <span className="block">{siteData.registration.sloganLine1}</span>
                    <span className="block">{siteData.registration.sloganLine2}</span>
                 </h2>
             </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 relative z-10">
             <RegisterForm />
        </div>
    </section>
  );
};
