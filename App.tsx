import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import { Navigation } from './components/Navigation';
import { IntroSection, OverviewSection, RoadmapSection, RegistrationSectionComponent } from './components/Sections';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Horizontal Scroll Logic
  useLayoutEffect(() => {
    if (loading || isMobile) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.panel');
      const amountToScroll = 100 * (sections.length - 1);
      
      const scrollTween = gsap.to(sections, {
        xPercent: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 2, 
          snap: {
            snapTo: 1 / (sections.length - 1),
            inertia: false,
            duration: { min: 0.1, max: 0.2 },
            delay: 0.1
          },
          end: "+=6000", 
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.round(progress * (sections.length - 1));
            setCurrentSection(index);
          }
        }
      });
      triggerRef.current = (scrollTween as any).scrollTrigger;
    }, containerRef);

    return () => ctx.revert();
  }, [loading, isMobile]);

  // Handle Mobile Scroll Spy
  useEffect(() => {
    if (!isMobile || loading) return;
    
    const handleScroll = () => {
       const scrollPosition = window.scrollY + window.innerHeight / 3;
       const sections = document.querySelectorAll('.panel');
       sections.forEach((sec, idx) => {
          const el = sec as HTMLElement;
          if (el.offsetTop <= scrollPosition && (el.offsetTop + el.offsetHeight) > scrollPosition) {
             setCurrentSection(idx);
          }
       });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, loading]);

  const handleNavigate = (index: number) => {
    if (isMobile) {
       const sections = document.querySelectorAll('.panel');
       if (sections[index]) {
         sections[index].scrollIntoView({ behavior: 'smooth' });
       }
    } else {
       if (triggerRef.current) {
         const st = triggerRef.current;
         const totalDistance = st.end - st.start;
         const progress = index / 3; 
         const targetScroll = st.start + (totalDistance * progress);
         
         window.scrollTo({
           top: targetScroll,
           behavior: 'smooth'
         });
       }
    }
  };

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans">
      <Navigation 
        currentSection={currentSection} 
        totalSections={4} 
        onNavigate={handleNavigate}
      />
      
      <div 
        ref={containerRef} 
        className={`w-full h-full ${!isMobile ? 'overflow-hidden' : ''}`}
      >
        <div 
          ref={sectionsRef}
          className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}
          style={{ width: isMobile ? '100%' : '400vw' }}
        >
          {/* 
            Desktop: Each panel MUST be w-screen (100vw) relative to the 400vw container.
            Using w-full would make them 400vw wide each, breaking the layout.
          */}
          <div className="panel w-full md:w-screen min-h-screen md:h-screen"><IntroSection /></div>
          <div className="panel w-full md:w-screen min-h-screen md:h-screen"><OverviewSection /></div>
          <div className="panel w-full md:w-screen min-h-screen md:h-screen"><RoadmapSection /></div>
          <div className="panel w-full md:w-screen min-h-screen md:h-screen"><RegistrationSectionComponent /></div>
        </div>
      </div>
    </div>
  );
};

export default App;
