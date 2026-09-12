import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Terminal, Volume2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    // Stage 0: Initial dark screen + ambient particles
    const t1 = setTimeout(() => setStage(1), 600);
    // Stage 1: World seed & neural voxel engine init
    const t2 = setTimeout(() => setStage(2), 1600);
    // Stage 2: Main title "BUILD. CREATE. AUTOMATE."
    const t3 = setTimeout(() => setStage(3), 2800);
    // Stage 3: Creator introduction & CTA
    const t4 = setTimeout(() => setStage(4), 4000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const skipIntro = () => {
    if (isDismissing) return;
    setIsDismissing(true);
    sound.playClick();
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      id="cinematic-intro-overlay"
      onClick={skipIntro}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-12 select-none transition-opacity duration-700 ${
        isDismissing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${
        stage >= 2 ? 'bg-gradient-to-b from-black/85 via-black/75 to-black/90 backdrop-blur-sm' : 'bg-[#09090B]'
      }`}
    >
      {/* Top Telemetry Header */}
      <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-[#71717A] tracking-wider">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping" />
          <span>WORLD_SEED: #MANMOHAN-VOXEL-OS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#A1A1AA]">
          <span>RENDER_ENGINE: WEBGL_HDR</span>
          <span>POST_PROCESS: BLOOM_ACES</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            skipIntro();
          }}
          className="px-3 py-1 rounded bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] font-mono text-[11px] tracking-widest uppercase transition-colors cursor-pointer border border-[#3F3F46]"
        >
          SKIP INTRO [SPACE]
        </button>
      </div>

      {/* Main Center Cinematic Revelation */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl my-auto">
        {/* Stage 1: Boot Log */}
        {stage >= 1 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-xs font-mono font-bold tracking-widest border border-[#E11D48]/20 mb-6 animate-in fade-in zoom-in-95 duration-500">
            <Sparkles size={14} />
            <span>VOXEL SYSTEM ONLINE • READY TO EXPLORE</span>
          </div>
        )}

        {/* Stage 2 & 3: Bold Cinematic Title */}
        {stage >= 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase font-sans leading-none mb-4">
              BUILD.<br />
              <span className="text-[#E11D48] drop-shadow-[0_0_25px_rgba(225,29,72,0.4)]">
                CREATE.
              </span><br />
              AUTOMATE.
            </h1>
          </div>
        )}

        {/* Stage 4: Creator & Enter CTA */}
        {stage >= 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
            <p className="text-sm sm:text-base md:text-lg text-[#D4D4D8] font-sans max-w-xl mb-8 leading-relaxed">
              Step into the living Minecraft-inspired universe of <strong className="text-white font-bold">Manmohan</strong> — Systems Architect, Founder of <span className="text-[#E11D48]">IGRYbuilds</span> & Co-Founder of <span className="text-[#E11D48]">Kruzoe</span>.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                skipIntro();
              }}
              onMouseEnter={() => sound.playHover()}
              className="group relative px-8 py-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-mono font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-2xl shadow-[#E11D48]/40 hover:scale-105 border-b-4 border-[#9F1239] active:border-b-0 active:mt-1 flex items-center gap-3 cursor-pointer"
            >
              <Play size={16} className="fill-white" />
              <span>ENTER THE WORLD</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-[#71717A]">
        <span>CLICK ANYWHERE OR PRESS SPACE TO ENTER</span>
        <span>SOUND: SYNTHESIZED WEB AUDIO</span>
      </div>
    </div>
  );
};
