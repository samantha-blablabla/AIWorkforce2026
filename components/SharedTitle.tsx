import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { siteData } from '../siteContent';

interface SharedTitleProps {
  position: 'loader' | 'intro';
}

// Shared title component - Always fixed, GSAP animates position
const SharedTitle: React.FC<SharedTitleProps> = ({ position }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Calculate loader position (below progress bar)
  const getLoaderPosition = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const left = isMobile ? 16 : isTablet ? 40 : 64;

    // Try to get actual progress bar position
    const progressBar = document.querySelector('.loader-progress-container');
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect();
      // Position SharedTitle below the progress bar with gap
      const gap = isMobile ? 16 : 24;
      return { left, top: rect.bottom + gap };
    }

    // Fallback: Calculate based on known layout
    // Loader content is vertically centered with flex items-center
    // Progress number: 18vw on mobile, 10rem on md, 12rem on lg
    // Plus progress bar and margins
    const vh = window.innerHeight;
    const progressNumberHeight = isMobile ? vh * 0.18 : isTablet ? 160 : 192; // approximate heights
    const progressBarMargin = isMobile ? 8 : 16;
    const progressBarHeight = 3;
    const gap = isMobile ? 16 : 24;

    // Center point + half of progress section height + gap
    const centerY = vh / 2;
    const progressSectionHeight = progressNumberHeight + progressBarMargin + progressBarHeight;
    const top = centerY + progressSectionHeight / 2 + gap;

    return { left, top };
  };

  // Calculate intro position (vertically centered)
  const getIntroPosition = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const left = isMobile ? 16 : isTablet ? 40 : 64;
    const top = window.innerHeight / 2;

    return { left, top };
  };

  // Set initial position on mount
  useEffect(() => {
    if (!titleRef.current) return;

    const el = titleRef.current;

    // Use requestAnimationFrame to ensure DOM is ready
    // This allows progress bar to be rendered before we query its position
    requestAnimationFrame(() => {
      const loaderPos = getLoaderPosition();

      // Always start at loader position
      gsap.set(el, {
        left: loaderPos.left,
        top: loaderPos.top,
        yPercent: 0,
        opacity: 1
      });

      setIsReady(true);
    });
  }, []);

  // Animate when position changes to 'intro'
  useEffect(() => {
    if (!titleRef.current || !isReady) return;
    if (position !== 'intro' || hasAnimatedRef.current) return;

    const el = titleRef.current;
    const introPos = getIntroPosition();

    // Animate to intro position (centered vertically)
    gsap.to(el, {
      top: introPos.top,
      left: introPos.left,
      yPercent: -50, // Center vertically
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.15
    });

    hasAnimatedRef.current = true;
  }, [position, isReady]);

  return (
    <div
      ref={titleRef}
      id="shared-title"
      className="shared-title fixed z-[150] text-left"
      style={{
        // Initial position will be set by GSAP
        opacity: 0 // Start invisible, GSAP will set opacity
      }}
    >
      <div className="space-y-1 md:space-y-3">
        {/* Line 1: Subtitle */}
        <p className="title-line title-line-1 text-lg md:text-2xl lg:text-3xl text-gray-300 font-light tracking-wide font-sans opacity-0">
          {siteData.intro.titleLine1}
        </p>

        {/* Lines 2 & 3: Main titles - Larger on mobile */}
        <div className="space-y-0">
          <h2 className="title-line title-line-2 text-[11vw] md:text-6xl lg:text-8xl leading-[1.05] md:leading-[0.95] font-bold text-white tracking-tight font-sans opacity-0">
            {siteData.intro.titleLine2}
          </h2>
          <h2 className="title-line title-line-3 text-[11vw] md:text-6xl lg:text-8xl leading-[1.05] md:leading-[0.95] font-bold text-white tracking-tight font-sans opacity-0">
            {siteData.intro.titleLine3}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SharedTitle;
