import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import { Navigation } from './components/Navigation';
import SharedTitle from './components/SharedTitle';
import SharedGlow from './components/SharedGlow';
import { IntroSection, OverviewSection, RoadmapSection, RegistrationSectionComponent } from './components/Sections';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

type Phase = 'loader' | 'transitioning' | 'intro';

const App: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('loader');
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [unmountLoader, setUnmountLoader] = useState(false);

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

  // Handle loader animation complete - start transition
  const handleLoaderComplete = useCallback(() => {
    setPhase('transitioning');
  }, []);

  // SIMPLE TRANSITION - No Flip, just fade and slide
  useLayoutEffect(() => {
    if (phase !== 'transitioning') return;

    // Fade out Loader
    gsap.to("#loader-container", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        setUnmountLoader(true);
        setPhase('intro');
      }
    });

    // Slide in Navigation elements
    gsap.fromTo("#desktop-nav",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 }
    );

    gsap.fromTo("#mobile-nav",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 }
    );

    gsap.fromTo("#bottom-bar",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4 }
    );
  }, [phase]);

  // GSAP Horizontal Scroll Logic
  useLayoutEffect(() => {
    if (phase !== 'intro' || isMobile) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.panel');
      const amountToScroll = 100 * (sections.length - 1);

      const scrollTween = gsap.to(sections, {
        xPercent: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          snap: {
            snapTo: 1 / (sections.length - 1),
            inertia: false,
            duration: { min: 0.1, max: 0.3 },
            delay: 0.05
          },
          end: "+=5000",
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
  }, [phase, isMobile]);

  // Handle Mobile Scroll Spy
  useEffect(() => {
    if (!isMobile || phase !== 'intro') return;

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
  }, [isMobile, phase]);

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

  // Get SharedTitle position based on phase
  const getTitlePosition = (): 'loader' | 'intro' => {
    if (phase === 'loader') return 'loader';
    return 'intro'; // Both transitioning and intro use intro position
  };

  // Get SharedGlow position based on phase
  const getGlowPosition = (): 'loader' | 'intro' => {
    if (phase === 'loader') return 'loader';
    return 'intro';
  };

  return (
    <div className="bg-[#060606] text-white min-h-screen font-sans">
      {/* ========== SHARED GLOW - z-[105] ========== */}
      {/* HIDE when scrolled past IntroSection (currentSection > 0) */}
      <div
        style={{
          opacity: phase === 'loader' || currentSection === 0 ? 1 : 0,
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <SharedGlow position={getGlowPosition()} />
      </div>

      {/* ========== LOADER - z-[100] ========== */}
      {!unmountLoader && (
        <div
          id="loader-container"
          className="fixed inset-0 z-[100]"
          style={{
            pointerEvents: phase === 'loader' ? 'auto' : 'none'
          }}
        >
          <Loader onComplete={handleLoaderComplete} />
        </div>
      )}

      {/* ========== SHARED TITLE - Single instance with GSAP animation ========== */}
      {/* Always rendered, position animated from loader to intro */}
      {/* HIDE when scrolled past IntroSection (currentSection > 0) */}
      <div
        style={{
          opacity: currentSection === 0 ? 1 : 0,
          pointerEvents: currentSection === 0 ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <SharedTitle position={getTitlePosition()} />
      </div>

      {/* ========== NAVIGATION - Animated in during transition ========== */}
      <Navigation
        currentSection={currentSection}
        totalSections={4}
        onNavigate={handleNavigate}
      />

      {/* ========== MAIN CONTENT - z-[50] ========== */}
      {/* Always rendered but hidden during loader phase */}
      <div
        ref={containerRef}
        className={`w-full h-full ${!isMobile ? 'overflow-hidden' : 'overflow-x-hidden'} z-[50]`}
        style={{
          position: phase === 'loader' ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          visibility: phase === 'loader' ? 'hidden' : 'visible'
        }}
      >
        <div
          ref={sectionsRef}
          className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}
          style={{ width: isMobile ? '100%' : '400vw' }}
        >
          <div className="panel w-full md:w-screen min-h-screen md:h-screen">
            <IntroSection />
          </div>
          <div className="panel w-full md:w-screen min-h-screen md:h-screen"><OverviewSection /></div>
          <div className="panel w-full md:w-screen min-h-screen md:h-screen"><RoadmapSection /></div>
          <div className="panel w-full md:w-screen min-h-screen md:h-screen"><RegistrationSectionComponent /></div>
        </div>
      </div>
    </div>
  );
};

export default App;
