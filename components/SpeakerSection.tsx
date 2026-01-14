import React, { useLayoutEffect, useRef } from 'react';
import { siteData } from '../siteContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Speaker Card Component
interface SpeakerCardProps {
  speaker: {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
  };
  index: number;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, index }) => {
  // Split title by @ to separate role and company
  const titleParts = speaker.title.split('@');
  const role = titleParts[0]?.trim() || '';
  const company = titleParts[1]?.trim() || '';

  return (
    <div className="speaker-card group relative flex flex-col bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden hover:border-dark-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-dark-blue-900/20">
      {/* Avatar Section - taller on mobile for better visibility */}
      <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

        {/* Purple Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue-600/0 to-dark-blue-900/0 group-hover:from-dark-blue-600/20 group-hover:to-dark-blue-900/30 transition-all duration-500 z-5" />

        {/* Avatar Image */}
        <img
          src={speaker.avatar}
          alt={speaker.name}
          className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&size=400&background=6b00ff&color=fff&bold=true`;
          }}
        />

        {/* Speaker Number Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-dark-blue-400 text-sm font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
            #{speaker.id}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        {/* Name */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight font-sans group-hover:text-dark-blue-300 transition-colors duration-300">
          {speaker.name}
        </h3>

        {/* Title/Position - Fixed height container for alignment */}
        <div className="h-12 sm:h-14 md:h-16 mb-3 sm:mb-4">
          {/* Role (first line) */}
          <p className="text-dark-blue-400 text-xs sm:text-sm md:text-base font-medium font-sans leading-tight">
            {role}
          </p>
          {/* Company (second line with @) */}
          {company && (
            <p className="text-dark-blue-400/70 text-xs sm:text-sm md:text-base font-medium font-sans leading-tight">
              @ {company}
            </p>
          )}
        </div>

        {/* Bio */}
        <p className="text-gray-400 text-sm sm:text-sm md:text-base leading-relaxed font-sans font-normal flex-1 whitespace-pre-line">
          {speaker.bio}
        </p>

        {/* Decorative Line */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 sm:w-8 h-[2px] bg-gradient-to-r from-dark-blue-600 to-transparent rounded-full" />
            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-sans">Speaker</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Speaker Section
export const SpeakerSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Mobile parallax animation
    if (window.innerWidth < 768) {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.speaker-card');
        cards.forEach((card: any, i) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center bg-[#060606] relative overflow-hidden pt-24 md:pt-0 pb-20 md:pb-0"
    >
      {/* Background Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,_rgba(107,0,255,0.15)_0%,_rgba(130,55,255,0.08)_40%,_transparent_70%)] pointer-events-none blur-[60px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,_rgba(107,0,255,0.1)_0%,_rgba(130,55,255,0.05)_40%,_transparent_70%)] pointer-events-none blur-[80px]" />

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header - Only show if title or subtitle exists */}
        {(siteData.speakers.sectionTitle || siteData.speakers.sectionSubtitle) && (
          <div className="mb-10 md:mb-16">
            {siteData.speakers.sectionSubtitle && (
              <span className="text-dark-blue-400 text-sm md:text-base uppercase tracking-[0.3em] font-sans mb-2 block">
                {siteData.speakers.sectionSubtitle}
              </span>
            )}
            {siteData.speakers.sectionTitle && (
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-sans">
                {siteData.speakers.sectionTitle}
              </h2>
            )}
          </div>
        )}

        {/* Speaker Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8"
        >
          {siteData.speakers.speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakerSection;
