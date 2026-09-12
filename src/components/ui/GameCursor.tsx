import React, { useEffect, useState } from 'react';

export const GameCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, canvas');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div className="relative -top-3.5 -left-3.5 w-7 h-7 flex items-center justify-center">
        {/* Center Reticle Dot */}
        <div
          className={`w-1.5 h-1.5 transition-all duration-150 ${
            isHovered
              ? 'bg-[#E11D48] scale-150 shadow-[0_0_8px_#E11D48]'
              : 'bg-[#18181B] shadow-[0_0_2px_rgba(255,255,255,0.8)]'
          } ${isClicking ? 'scale-75' : ''}`}
        />

        {/* 4 Crosshair Ticks */}
        {/* Top */}
        <div
          className={`absolute top-0 w-0.5 transition-all duration-150 ${
            isHovered ? 'h-2 bg-[#E11D48]' : 'h-1.5 bg-[#18181B]'
          } ${isHovered ? '-translate-y-1' : ''}`}
        />
        {/* Bottom */}
        <div
          className={`absolute bottom-0 w-0.5 transition-all duration-150 ${
            isHovered ? 'h-2 bg-[#E11D48]' : 'h-1.5 bg-[#18181B]'
          } ${isHovered ? 'translate-y-1' : ''}`}
        />
        {/* Left */}
        <div
          className={`absolute left-0 h-0.5 transition-all duration-150 ${
            isHovered ? 'w-2 bg-[#E11D48]' : 'w-1.5 bg-[#18181B]'
          } ${isHovered ? '-translate-x-1' : ''}`}
        />
        {/* Right */}
        <div
          className={`absolute right-0 h-0.5 transition-all duration-150 ${
            isHovered ? 'w-2 bg-[#E11D48]' : 'w-1.5 bg-[#18181B]'
          } ${isHovered ? 'translate-x-1' : ''}`}
        />

        {/* Subtle Outer Diamond when Hovering */}
        {isHovered && (
          <div className="absolute w-5 h-5 border border-[#E11D48]/50 rotate-45 animate-pulse" />
        )}
      </div>
    </div>
  );
};
