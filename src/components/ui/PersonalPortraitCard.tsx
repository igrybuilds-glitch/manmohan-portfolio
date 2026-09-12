import React from 'react';
import { Sparkles, Terminal, Activity, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PersonalPortraitCardProps {
  onFocusCharacter: () => void;
}

export const PersonalPortraitCard: React.FC<PersonalPortraitCardProps> = ({ onFocusCharacter }) => {
  return (
    <div
      id="personal-portrait-card"
      onClick={() => {
        sound.playHover();
        onFocusCharacter();
      }}
      className="group relative cursor-pointer p-4 rounded-2xl bg-[#FAF7F2]/85 backdrop-blur-md border border-[#E2DCD2]/80 shadow-md shadow-black/5 hover:border-[#E11D48]/40 transition-all duration-300 max-w-sm select-none"
    >
      {/* Top Meta Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-[#71717A] uppercase font-semibold">
            ARCHITECT // IN SCENE
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] font-bold">
          LIVE VOXEL WORLD
        </span>
      </div>

      <div className="flex items-start gap-3.5">
        {/* Authentic Founder Photo Frame with Voxel Accents */}
        <div className="relative flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#18181B] to-[#27272A] p-0.5 shadow-md overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-[#E2DCD2] group-hover:border-[#0284C7]/80">
          <img
            src="/manmohan.png"
            alt="Manmohan - Founder & Architect"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-[10px]"
          />
          
          {/* Quick interactive inspect icon */}
          <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#0284C7] flex items-center justify-center text-white text-[9px] shadow-sm">
            <ArrowUpRight size={10} />
          </div>
        </div>

        {/* Identity & Credentials */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-extrabold text-[#18181B] text-base tracking-tight leading-none group-hover:text-[#E11D48] transition-colors">
              MANMOHAN
            </h4>
          </div>
          
          <p className="text-xs font-semibold text-[#3F3F46] mt-1 leading-snug">
            Founder of <span className="text-[#E11D48]">IGRYbuilds</span>
          </p>
          <p className="text-[11px] text-[#71717A] leading-tight">
            Co-Founder of <span className="text-[#18181B] font-medium">Kruzoe</span>
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-[#52525B]">
            <Activity size={11} className="text-[#E11D48]" />
            <span className="truncate">Actively engineering digital systems</span>
          </div>
        </div>
      </div>
    </div>
  );
};
