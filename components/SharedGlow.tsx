import React from 'react';

interface SharedGlowProps {
  position: 'loader' | 'intro';
}

// Shared glow element - CSS transition for smooth position change
const SharedGlow: React.FC<SharedGlowProps> = ({ position }) => {
  return (
    <div
      id="shared-glow"
      className={`
        fixed z-[105] pointer-events-none blur-[80px] will-change-transform
        transition-all duration-1000 ease-out
        bg-[radial-gradient(circle,_rgba(107,0,255,0.3)_0%,_rgba(130,55,255,0.2)_40%,_transparent_70%)]
        ${position === 'loader'
          ? 'top-[-20%] right-[-20%] w-[70vw] h-[70vw] opacity-50'
          : 'bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] opacity-60'
        }
      `}
    />
  );
};

export default SharedGlow;
