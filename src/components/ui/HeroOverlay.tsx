import React from 'react';
import { ArrowRight, Sparkles, Box, Cpu, Workflow, Layout, TrendingUp, Layers, ChevronRight } from 'lucide-react';
import { SystemId } from '../../types';
import { SYSTEM_NODES } from '../../data/systemsData';
import { PersonalPortraitCard } from './PersonalPortraitCard';
import { sound } from '../../utils/audio';

interface HeroOverlayProps {
  activeSystem: SystemId | null;
  hoveredSystem: SystemId | null;
  onSelectSystem: (id: SystemId) => void;
  onHoverSystem: (id: SystemId | null) => void;
  onExploreWork: () => void;
  onStartProject: () => void;
  onFocusCharacter: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  activeSystem,
  hoveredSystem,
  onSelectSystem,
  onHoverSystem,
  onExploreWork,
  onStartProject,
  onFocusCharacter,
}) => {
  return (
    <div
      id="hero-editorial-overlay"
      className="relative z-20 w-full min-h-screen flex flex-col justify-between pt-24 pb-20 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Section: Badges & Person Credentials */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pointer-events-auto">
        
        {/* Brand & Metaphor Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2]/80 shadow-sm">
          <div className="w-2 h-2 rounded-sm bg-[#E11D48] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            AI • AUTOMATION • DIGITAL EXPERIENCES • BUSINESS GROWTH
          </span>
        </div>

        {/* Integrated Personal Portrait Placement */}
        <div className="self-end lg:self-auto">
          <PersonalPortraitCard onFocusCharacter={onFocusCharacter} />
        </div>
      </div>

      {/* Center Section: Editorial Headline & Value Proposition */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8">
        <div className="max-w-3xl pointer-events-auto">
          
          {/* Main Headline */}
          <h1
            id="hero-main-headline"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-[#18181B] leading-[0.96] tracking-tight font-sans uppercase mb-6 drop-shadow-sm select-none"
          >
            I BUILD<br />
            <span className="text-[#E11D48] relative inline-block">
              DIGITAL SYSTEMS
              <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#E11D48]/20 rounded-full" />
            </span><br />
            THAT KEEP WORKING.
          </h1>

          {/* Supporting Line */}
          <p
            id="hero-supporting-line"
            className="text-base sm:text-lg md:text-xl text-[#3F3F46] font-normal leading-relaxed max-w-2xl mb-8 font-sans"
          >
            AI automation, digital experiences and growth systems built to help businesses attract, convert and operate better.
          </p>

          {/* Tactile CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Primary CTA: Vivid Crimson Tactile Button */}
            <button
              id="cta-explore-work-btn"
              onClick={() => {
                sound.playHover();
                onExploreWork();
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group px-8 py-4 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm sm:text-base font-extrabold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#E11D48]/30 hover:shadow-2xl hover:shadow-[#E11D48]/40 hover:-translate-y-0.5 active:translate-y-0 border-b-4 border-[#9F1239] active:border-b-0 active:mt-1 flex items-center gap-3 cursor-pointer"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Secondary CTA: Tactile Cream / Slate Outline */}
            <button
              id="cta-start-project-btn"
              onClick={() => {
                sound.playHover();
                onStartProject();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-7 py-4 rounded-2xl bg-[#FAF7F2]/90 hover:bg-white text-[#18181B] hover:text-[#E11D48] text-sm sm:text-base font-bold tracking-wider uppercase backdrop-blur-md border border-[#D5CFC5] hover:border-[#E11D48]/50 shadow-md shadow-black/5 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Interactive System Switcher Pills */}
          <div className="p-3 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E2DCD2]/80 shadow-sm max-w-xl">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-bold">
                INTERACTIVE DIGITAL ARCHITECTURE
              </span>
              <span className="text-[10px] font-mono text-[#E11D48] font-semibold flex items-center gap-1">
                <Box size={11} /> 3D VOXEL ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SYSTEM_NODES.map((node) => {
                const isActive = activeSystem === node.id;
                const isHovered = hoveredSystem === node.id;

                return (
                  <button
                    key={node.id}
                    id={`hero-system-pill-${node.id}`}
                    onClick={() => {
                      sound.playSystemActivate(node.id);
                      onSelectSystem(node.id);
                    }}
                    onMouseEnter={() => {
                      sound.playHover();
                      onHoverSystem(node.id);
                    }}
                    onMouseLeave={() => onHoverSystem(null)}
                    className={`p-2.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#18181B] text-white border-[#18181B] shadow-md'
                        : isHovered
                        ? 'bg-white text-[#18181B] border-[#E11D48] shadow-sm'
                        : 'bg-white/60 text-[#3F3F46] border-[#E2DCD2]/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono tracking-wider uppercase opacity-60">
                        0{SYSTEM_NODES.indexOf(node) + 1}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-[#E11D48] animate-ping' : 'bg-[#E11D48]/40'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-bold tracking-tight uppercase truncate">
                      {node.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Hint Banner */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-[#71717A] font-mono pointer-events-auto">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-[#E11D48]" />
          <span>Move cursor for 3D parallax • Click voxel systems to inspect</span>
        </div>
        <div className="hidden sm:block text-[11px]">
          IGRYbuilds Studio // Manmohan © 2026
        </div>
      </div>
    </div>
  );
};
