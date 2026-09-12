import React, { useState } from 'react';
import { User, ArrowRight, ShieldCheck, Award, Heart, CheckCircle2, Terminal, Camera, Box, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { FounderPhotoModal } from '../ui/FounderPhotoModal';

interface World10FounderProps {
  onStartProject: () => void;
  onNextWorld: () => void;
  onFocusCharacter?: () => void;
}

export const World10Founder: React.FC<World10FounderProps> = ({
  onStartProject,
  onNextWorld,
  onFocusCharacter,
}) => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [profileView, setProfileView] = useState<'photo' | 'character'>('photo');

  return (
    <div
      id="world-founder"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Founder Photo & Character Inspection Modal */}
      <FounderPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onFocusCharacter={() => onFocusCharacter && onFocusCharacter()}
        onStartInquiry={onStartProject}
      />

      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <User size={14} className="text-[#0284C7]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 10 // THE FOUNDER • MANMOHAN
          </span>
        </div>

        <div className="text-xs font-mono text-[#71717A] tracking-wider uppercase hidden sm:block">
          BUILDER • SYSTEMS ARCHITECT • ENTREPRENEUR
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Column: Founder Persona & Story */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <span className="text-xs font-mono font-black text-[#0284C7] tracking-widest uppercase block mb-1">
              FOUNDER, IGRYBUILDS • CO-FOUNDER, KRUZOE
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#18181B] tracking-tight uppercase leading-[0.98] mb-3">
              MANMOHAN.
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#18181B] max-w-xl mb-4">
              "I build digital systems that keep working."
            </p>
            <p className="text-sm text-[#52525B] max-w-xl leading-relaxed font-sans mb-6">
              I operate at the intersection of high-craft design, autonomous engineering, and commercial conversion. Whether orchestrating zero-latency lead pipelines or directing brand worlds like Kruzoe, I treat code and design as unified leverage for business owners.
            </p>
          </div>

          {/* 3 Core Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#E2DCD2] shadow-sm">
              <span className="text-[10px] font-mono font-black text-[#0284C7] block mb-1">01 // PRINCIPLE</span>
              <h4 className="text-xs font-black uppercase text-[#18181B] mb-1">CRAFT OVER NOISE</h4>
              <p className="text-xs text-[#52525B] leading-tight">
                Refusing generic AI slop. Every curve, typographic step, and animation serves a mathematical purpose.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2DCD2] shadow-sm">
              <span className="text-[10px] font-mono font-black text-[#0284C7] block mb-1">02 // PRINCIPLE</span>
              <h4 className="text-xs font-black uppercase text-[#18181B] mb-1">SYSTEMS THAT SLEEP NOT</h4>
              <p className="text-xs text-[#52525B] leading-tight">
                Architecting automated pipelines that qualify prospects and confirm appointments while you rest.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2DCD2] shadow-sm">
              <span className="text-[10px] font-mono font-black text-[#0284C7] block mb-1">03 // PRINCIPLE</span>
              <h4 className="text-xs font-black uppercase text-[#18181B] mb-1">ZERO FLUFF RESULTS</h4>
              <p className="text-xs text-[#52525B] leading-tight">
                Measurable business lift: lower acquisition costs, higher conversion ratios, and bulletproof uptime.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Founder Photo & 3D Character Card */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl relative overflow-hidden">
            {/* View Mode Toggle: Photo vs 3D Voxel Character */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F4EFE6] border border-[#E2DCD2]">
                <button
                  onClick={() => {
                    sound.playHover();
                    setProfileView('photo');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    profileView === 'photo'
                      ? 'bg-white text-[#18181B] shadow-sm'
                      : 'text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  <Camera size={12} />
                  <span>FOUNDER PHOTO</span>
                </button>

                <button
                  onClick={() => {
                    sound.playHover();
                    setProfileView('character');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    profileView === 'character'
                      ? 'bg-white text-[#18181B] shadow-sm'
                      : 'text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  <Box size={12} />
                  <span>3D VOXEL SKIN</span>
                </button>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981]">
                ONLINE
              </span>
            </div>

            {profileView === 'photo' ? (
              /* Authentic Photo Presentation */
              <div className="space-y-4">
                <div
                  onClick={() => {
                    sound.playTerminalKey();
                    setIsPhotoModalOpen(true);
                  }}
                  className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#18181B]/10 hover:border-[#0284C7] shadow-md cursor-pointer transition-all duration-300"
                >
                  <img
                    src="/manmohan.png"
                    alt="Manmohan - Systems Architect"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[10px] border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span>AUTHENTIC PORTRAIT</span>
                  </div>

                  {/* Click to Zoom Pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0284C7] text-white font-mono text-[10px] font-bold shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={11} />
                    <span>ZOOM</span>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-black uppercase leading-tight drop-shadow-md">
                      Manmohan
                    </h3>
                    <p className="text-[11px] font-mono text-white/90">
                      Founder @ IGRYbuilds • Co-Founder @ Kruzoe
                    </p>
                  </div>
                </div>

                {/* Identity Highlights */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E2DCD2] flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#71717A] uppercase block">SPECIALIZATION</span>
                    <span className="font-extrabold text-[#18181B]">Digital Systems & WebGL</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#71717A] uppercase block">LOCATION</span>
                    <span className="font-extrabold text-[#0284C7]">New Delhi, IN</span>
                  </div>
                </div>
              </div>
            ) : (
              /* 3D Character Translation Specs */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2DCD2] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2DCD2] pb-2 text-xs font-mono">
                    <span className="font-bold text-[#18181B]">3D VOXEL AVATAR // SPEC</span>
                    <span className="text-[#0284C7] font-bold">1:1 TRANSLATION</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-[#E2DCD2]/60 font-mono text-[11px]">
                      <span className="text-[#71717A]">CURLY FRINGE HAIR</span>
                      <span className="font-bold text-[#18181B]">Sculpted Voxel Waves</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[#E2DCD2]/60 font-mono text-[11px]">
                      <span className="text-[#71717A]">FACIAL STUBBLE</span>
                      <span className="font-bold text-[#18181B]">Trimmed Mustache & Goatee</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[#E2DCD2]/60 font-mono text-[11px]">
                      <span className="text-[#71717A]">SIGNATURE ATTIRE</span>
                      <span className="font-bold text-[#0284C7]">Cerulean Teal Crewneck</span>
                    </div>

                    <div className="flex items-center justify-between py-1 font-mono text-[11px]">
                      <span className="text-[#71717A]">SAPPHIRE PHONE PROP</span>
                      <span className="font-bold text-[#18181B]">Triple-Lens Camera</span>
                    </div>
                  </div>
                </div>

                {onFocusCharacter && (
                  <button
                    onClick={() => {
                      sound.playTerminalKey();
                      onFocusCharacter();
                    }}
                    className="w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-bold uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>TELEPORT CAMERA TO 3D CHARACTER</span>
                  </button>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-5 space-y-2.5">
              <button
                onClick={onStartProject}
                className="w-full py-3.5 rounded-xl bg-[#18181B] hover:bg-[#0284C7] text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <span>CONNECT WITH MANMOHAN</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => {
                  sound.playTerminalKey();
                  setIsPhotoModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-transparent hover:bg-[#FAF7F2] border border-[#E2DCD2] text-xs font-mono font-bold text-[#52525B] hover:text-[#18181B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ZoomIn size={13} />
                <span>EXPAND FULL PHOTO & STORY</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onNextWorld}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#0284C7] transition-all shadow-sm cursor-pointer"
        >
          <span>TRAVEL TO "BUILD WITH ME" (FINAL CLOSURE)</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#0284C7]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 10 OF 11 • FOUNDER PROFILE
        </span>
      </div>
    </div>
  );
};
