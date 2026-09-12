import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Compass, MapPin } from 'lucide-react';
import { WORLDS } from '../../data/portfolioWorlds';
import { WorldId } from '../../types';
import { sound } from '../../utils/audio';

interface WorldNavigatorProps {
  activeWorld: WorldId;
  onSelectWorld: (worldId: WorldId) => void;
}

export const WorldNavigator: React.FC<WorldNavigatorProps> = ({
  activeWorld,
  onSelectWorld,
}) => {
  const currentIndex = WORLDS.findIndex((w) => w.id === activeWorld);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + WORLDS.length) % WORLDS.length;
    sound.playClick();
    onSelectWorld(WORLDS[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % WORLDS.length;
    sound.playClick();
    onSelectWorld(WORLDS[nextIdx].id);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div
      id="world-floating-navigator"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] sm:max-w-4xl w-full px-2 pointer-events-none"
    >
      <div className="p-2 sm:p-2.5 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E2DCD2] shadow-xl shadow-black/10 flex items-center justify-between gap-2 pointer-events-auto">
        
        {/* Prev World Button */}
        <button
          onClick={handlePrev}
          title="Previous World (Left Arrow)"
          className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E2DCD2] flex items-center justify-center text-[#18181B] hover:text-[#E11D48] transition-all cursor-pointer shrink-0 shadow-sm"
        >
          <ChevronLeft size={16} />
        </button>

        {/* 11 World Dots & Labels */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1 px-1">
          {WORLDS.map((w, idx) => {
            const isActive = w.id === activeWorld;
            return (
              <button
                key={w.id}
                onClick={() => {
                  sound.playClick();
                  onSelectWorld(w.id);
                }}
                className={`group relative px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#18181B] text-white shadow-md'
                    : 'text-[#71717A] hover:text-[#18181B] hover:bg-white/80'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? 'bg-[#E11D48] scale-125' : 'bg-[#D4D4D8] group-hover:bg-[#E11D48]/60'
                  }`}
                />
                <span className="text-[10px] hidden sm:inline font-mono tracking-wider">
                  0{idx + 1}
                </span>
                <span className={`text-[11px] font-sans font-bold ${isActive ? 'inline' : 'hidden md:inline'}`}>
                  {w.label.split('//')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next World Button */}
        <button
          onClick={handleNext}
          title="Next World (Right Arrow)"
          className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E2DCD2] flex items-center justify-center text-[#18181B] hover:text-[#E11D48] transition-all cursor-pointer shrink-0 shadow-sm"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
