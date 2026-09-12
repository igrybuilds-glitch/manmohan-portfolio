import React, { useState } from 'react';
import { Palette, Layers, Sparkles, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { CREATIVE_OBJECTS } from '../../data/portfolioWorlds';
import { sound } from '../../utils/audio';

interface World5CreativeStudioProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
}

export const World5CreativeStudio: React.FC<World5CreativeStudioProps> = ({
  onStartProject,
  onNextWorld,
}) => {
  const [selectedAsset, setSelectedAsset] = useState(CREATIVE_OBJECTS[0]);

  return (
    <div
      id="world-creative-studio"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <Palette size={14} className="text-[#E11D48]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 05 // CREATIVE STUDIO • VISUAL GRAVITY
          </span>
        </div>

        <div className="text-xs font-mono text-[#71717A] tracking-wider uppercase hidden sm:block">
          CRAFT OVER COMMODITY • EDITORIAL IDENTITY
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left: Headline & Creative Grid */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight uppercase leading-[1.0] mb-3">
              HIGH-CRAFT VISUAL IDENTITY &<br />
              <span className="text-[#E11D48]">BRAND GRAVITY.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] max-w-xl font-sans">
              Distinctive design systems engineered to cut through digital noise. From typographic hierarchy to tactile physical unboxing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CREATIVE_OBJECTS.map((obj) => {
              const isSelected = selectedAsset.id === obj.id;
              return (
                <button
                  key={obj.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAsset(obj);
                  }}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#18181B] text-white border-[#18181B] shadow-lg shadow-black/10 -translate-y-1'
                      : 'bg-white text-[#18181B] border-[#E2DCD2] hover:bg-[#FAF7F2] hover:border-[#E11D48]/40'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#E11D48]' : 'text-[#71717A]'}`}>
                    {obj.category}
                  </span>
                  <span className="text-xs font-black block">
                    {obj.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Asset Detail Inspector */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl shadow-black/5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-[10px] font-mono font-extrabold uppercase tracking-wider">
                DESIGN ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-[#71717A] font-semibold">
                {selectedAsset.category}
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#18181B] uppercase tracking-tight mb-2">
              {selectedAsset.title}
            </h3>

            <p className="text-sm text-[#3F3F46] leading-relaxed mb-6">
              {selectedAsset.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2DCD2] mb-6">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#71717A] uppercase block mb-2">
                CORE DELIVERABLE SPECIFICATIONS:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {selectedAsset.examples.map((ex) => (
                  <div key={ex} className="flex items-center gap-1.5 text-xs text-[#27272A] font-medium">
                    <CheckCircle2 size={13} className="text-[#E11D48]" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onStartProject(`Creative Design: ${selectedAsset.title}`)}
              className="w-full py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>COMMISSION THIS DESIGN SYSTEM</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onNextWorld}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#E11D48] transition-all shadow-sm cursor-pointer"
        >
          <span>TRAVEL TO CONTENT STUDIO</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#E11D48]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 5 OF 11 • CREATIVE ARCHITECTURE
        </span>
      </div>
    </div>
  );
};
