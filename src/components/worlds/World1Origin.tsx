import React from 'react';
import { ArrowRight, Box, ChevronRight, Sparkles, Layers, ArrowDown } from 'lucide-react';
import { SystemId } from '../../types';
import { SYSTEM_NODES } from '../../data/systemsData';
import { PersonalPortraitCard } from '../ui/PersonalPortraitCard';
import { sound } from '../../utils/audio';

interface World1OriginProps {
  activeSystem: SystemId | null;
  hoveredSystem: SystemId | null;
  onSelectSystem: (id: SystemId) => void;
  onHoverSystem: (id: SystemId | null) => void;
  onExploreWork: () => void;
  onStartProject: () => void;
  onFocusCharacter: () => void;
  onNextWorld: () => void;
  onOpenInventory?: () => void;
}

export const World1Origin: React.FC<World1OriginProps> = ({
  activeSystem,
  hoveredSystem,
  onSelectSystem,
  onHoverSystem,
  onExploreWork,
  onStartProject,
  onFocusCharacter,
  onNextWorld,
  onOpenInventory,
}) => {
  return (
    <div
      id="world-origin-overlay"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Credentials Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2]/80 shadow-sm">
          <div className="w-2 h-2 rounded-sm bg-[#E11D48] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            AI • AUTOMATION • DIGITAL EXPERIENCES • BUSINESS GROWTH
          </span>
        </div>

        <div className="self-end lg:self-auto">
          <PersonalPortraitCard onFocusCharacter={onFocusCharacter} />
        </div>
      </div>

      {/* Main Editorial Hero Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8">
        <div className="max-w-3xl pointer-events-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-block px-3 py-1 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-xs font-mono font-bold tracking-wider border border-[#E11D48]/20">
              WORLD 01 // ORIGIN & COMMAND FOUNDATION
            </div>
            <div className="text-xs font-mono font-bold text-[#71717A] tracking-widest uppercase">
              BUILD • CREATE • AUTOMATE
            </div>
          </div>

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

          <p
            id="hero-supporting-line"
            className="text-base sm:text-lg md:text-xl text-[#3F3F46] font-normal leading-relaxed max-w-2xl mb-8 font-sans"
          >
            AI automation, digital experiences and growth systems built to help businesses attract, convert and operate better.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
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

            {onOpenInventory && (
              <button
                onClick={() => {
                  sound.playInventoryClick();
                  onOpenInventory();
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-5 py-4 rounded-2xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
                title="Open Skills Inventory [E]"
              >
                <div className="w-2.5 h-2.5 bg-[#E11D48] rounded-[2px]" />
                <span>INVENTORY [E]</span>
              </button>
            )}
          </div>

          {/* Interactive Monolith Switcher */}
          <div className="p-3 rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E2DCD2]/80 shadow-sm max-w-xl">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-bold">
                PHYSICAL VOXEL FOUNDATION
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
                    id={`hero-system-btn-${node.id}`}
                    onClick={() => {
                      sound.playSystemActivate(node.id);
                      onSelectSystem(node.id);
                    }}
                    onMouseEnter={() => {
                      sound.playHover();
                      onHoverSystem(node.id);
                    }}
                    onMouseLeave={() => onHoverSystem(null)}
                    className={`px-3 py-2.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#1E2022] text-white border-[#1E2022] shadow-md shadow-black/10 -translate-y-0.5'
                        : isHovered
                        ? 'bg-white text-[#1E2022] border-[#E11D48]/40 shadow-sm -translate-y-0.5'
                        : 'bg-[#FAF7F2] text-[#3F3F46] border-[#E2DCD2]/80 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-75">
                        {node.id}
                      </span>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                    </div>
                    <span className="text-xs font-extrabold truncate">
                      {node.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Travel Indicator */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={() => {
            sound.playHover();
            onNextWorld();
          }}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] shadow-sm text-xs font-bold text-[#18181B] hover:text-[#E11D48] transition-all cursor-pointer"
        >
          <span>TRAVEL TO AUTOMATION LAB</span>
          <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform text-[#E11D48]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          SCROLL OR CLICK TO TRAVEL THROUGH THE 11 CONNECTED WORLDS
        </span>
      </div>
    </div>
  );
};
