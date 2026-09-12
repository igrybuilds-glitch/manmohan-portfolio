import React, { useState } from 'react';
import { X, Sparkles, User, ExternalLink, ShieldCheck, Camera, Box, ArrowRight, Activity, MapPin } from 'lucide-react';
import { sound } from '../../utils/audio';

interface FounderPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusCharacter: () => void;
  onStartInquiry: () => void;
}

export const FounderPhotoModal: React.FC<FounderPhotoModalProps> = ({
  isOpen,
  onClose,
  onFocusCharacter,
  onStartInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'comparison' | 'manifesto'>('photo');

  if (!isOpen) return null;

  return (
    <div
      id="founder-photo-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      <div
        id="founder-photo-modal-content"
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl border-2 border-[#18181B]/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DCD2] bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center text-white shadow-sm">
              <User size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#18181B] uppercase tracking-tight">
                  MANMOHAN // FOUNDER & ARCHITECT
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-[10px] font-mono font-bold uppercase">
                  VERIFIED PROFILE
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#71717A]">
                IGRYbuilds Founder • Kruzoe Co-Founder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers */}
            <div className="hidden sm:flex items-center bg-[#F4EFE6] p-1 rounded-xl border border-[#E2DCD2] text-xs font-mono font-bold">
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveTab('photo');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'photo'
                    ? 'bg-white text-[#18181B] shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                PHOTO
              </button>
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveTab('comparison');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-white text-[#18181B] shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                3D CHARACTER COMPARISON
              </button>
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveTab('manifesto');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'manifesto'
                    ? 'bg-white text-[#18181B] shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                MANIFESTO
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-white border border-[#E2DCD2] hover:bg-[#18181B] hover:text-white flex items-center justify-center text-[#71717A] transition-all cursor-pointer shadow-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {activeTab === 'photo' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Full Portrait Photo */}
              <div className="md:col-span-6 flex justify-center">
                <div className="relative group w-full max-w-md rounded-2xl overflow-hidden border-2 border-[#18181B] shadow-2xl bg-[#18181B]">
                  <img
                    src="/manmohan.png"
                    alt="Manmohan - Founder & Architect"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto aspect-[3/4] object-cover object-center"
                  />
                  
                  {/* Photo Overlay HUD metadata */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[10px] tracking-wider border border-white/20">
                    PORTRAIT_ID // MANMOHAN_ORIGIN
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#18181B]/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#0284C7] block uppercase font-bold">
                        FOUNDER SPECIFICATION
                      </span>
                      <span className="text-xs font-black uppercase">
                        Manmohan • Systems Architect
                      </span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Right Column: Bio & Technical Identity */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] font-bold uppercase tracking-widest mb-1">
                    <MapPin size={13} />
                    <span>NEW DELHI • GLOBAL ARCHITECTURE</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-[#18181B] tracking-tight uppercase leading-none mb-3">
                    MANMOHAN
                  </h2>

                  <p className="text-sm sm:text-base font-semibold text-[#3F3F46] leading-snug mb-4">
                    "I design and engineer automated growth engines and immersive WebGL digital worlds that do not sleep."
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-[#E2DCD2] space-y-2 mb-4 text-xs text-[#52525B] leading-relaxed">
                    <p>
                      As Founder of <strong className="text-[#18181B]">IGRYbuilds</strong> and Co-Founder of <strong className="text-[#18181B]">Kruzoe</strong>, I combine high-craft design typography with autonomous backend machinery.
                    </p>
                    <p>
                      Every system is built to convert attention into verified business transactions without manual overhead.
                    </p>
                  </div>

                  {/* Core Attributes */}
                  <div className="grid grid-cols-2 gap-2.5 font-mono text-[11px]">
                    <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#E2DCD2]">
                      <span className="text-[#71717A] block text-[10px]">VENTURE // 01</span>
                      <span className="font-extrabold text-[#18181B]">IGRYbuilds</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#E2DCD2]">
                      <span className="text-[#71717A] block text-[10px]">VENTURE // 02</span>
                      <span className="font-extrabold text-[#18181B]">Kruzoe</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#E2DCD2]">
                      <span className="text-[#71717A] block text-[10px]">ROLE</span>
                      <span className="font-extrabold text-[#0284C7]">Full-Stack Architect</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#E2DCD2]">
                      <span className="text-[#71717A] block text-[10px]">PRIMARY STACK</span>
                      <span className="font-extrabold text-[#18181B]">Three.js • AI • TS</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playTerminalKey();
                      onFocusCharacter();
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-[#F4EFE6] border-2 border-[#18181B] text-xs font-mono font-bold text-[#18181B] flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                  >
                    <Box size={14} className="text-[#0284C7]" />
                    <span>INSPECT 3D VOXEL AVATAR</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playTerminalKey();
                      onClose();
                      onStartInquiry();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#18181B] hover:bg-[#0284C7] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                  >
                    <span>START INQUIRY</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h4 className="text-xl font-black text-[#18181B] uppercase">
                  Real Portrait vs. 3D Voxel Translation
                </h4>
                <p className="text-xs text-[#71717A] font-mono mt-1">
                  How Manmohan's real aesthetic was sculpted 1:1 into Minecraft voxels
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Real Portrait Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#E2DCD2] shadow-sm flex flex-col items-center">
                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-[#E2DCD2]">
                    <img
                      src="/manmohan.png"
                      alt="Manmohan Real Photo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full space-y-2 font-mono text-xs">
                    <div className="flex justify-between py-1 border-b border-[#E2DCD2]">
                      <span className="text-[#71717A]">HAIRSTYLE</span>
                      <span className="font-bold text-[#18181B]">Textured Curly Fringe</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2DCD2]">
                      <span className="text-[#71717A]">FACIAL HAIR</span>
                      <span className="font-bold text-[#18181B]">Trimmed Mustache & Goatee</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2DCD2]">
                      <span className="text-[#71717A]">ATTIRE</span>
                      <span className="font-bold text-[#0284C7]">Cerulean Teal Builder Crewneck</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#71717A]">PROP</span>
                      <span className="font-bold text-[#18181B]">Sapphire Mirror Camera</span>
                    </div>
                  </div>
                </div>

                {/* 2. 3D Voxel Model Breakdown */}
                <div className="p-5 rounded-2xl bg-white border border-[#E2DCD2] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-sm bg-[#0284C7]" />
                      <span className="font-mono text-xs font-black text-[#18181B] uppercase tracking-wider">
                        IN-ENGINE 3D VOXEL SPEC
                      </span>
                    </div>

                    <div className="space-y-3 text-xs text-[#52525B] leading-relaxed">
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2]">
                        <h5 className="font-bold text-[#18181B] mb-1">Volumetric Voxel Curls</h5>
                        <p>
                          Multi-layered staggered hair geometry replicating the natural wave and forehead fringe curl in deep espresso tones.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2]">
                        <h5 className="font-bold text-[#18181B] mb-1">Accurate Facial Topography</h5>
                        <p>
                          Micro-voxel trimmed mustache and chin goatee blocks with warm golden/olive subsurface skin reflectance.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2]">
                        <h5 className="font-bold text-[#18181B] mb-1">The Sapphire Terminal Prop</h5>
                        <p>
                          In his left hand, the 3D character holds a metallic sapphire smartphone matching the mirror selfie, projecting live cyber holograms.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playTerminalKey();
                      onFocusCharacter();
                      onClose();
                    }}
                    className="mt-4 w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-mono text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera size={14} />
                    <span>TELEPORT CAMERA TO 3D CHARACTER</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manifesto' && (
            <div className="max-w-2xl mx-auto space-y-6 font-sans">
              <div>
                <span className="text-xs font-mono font-bold text-[#0284C7] tracking-widest uppercase block mb-1">
                  THE BUILDER'S CREDO
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#18181B] uppercase">
                  "No generic templates. Only engineered leverage."
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#52525B] leading-relaxed">
                <p>
                  Most agency websites look like clone templates generated in an afternoon. I built this portfolio inside a real WebGL voxel world because software should evoke emotion, demonstrate technical prowess, and command trust through craftsmanship.
                </p>
                <p>
                  Whether working on <strong className="text-[#18181B]">IGRYbuilds</strong> or direct consumer brands like <strong className="text-[#18181B]">Kruzoe</strong>, the mandate is identical: build systems that out-convert, out-operate, and out-last competitors.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E2DCD2] flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[#71717A] block text-[10px]">DIRECT CONTACT</span>
                  <span className="font-bold text-[#18181B]">igrybuilds@gmail.com</span>
                </div>
                <button
                  onClick={() => {
                    sound.playTerminalKey();
                    onClose();
                    onStartInquiry();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#18181B] text-white font-bold hover:bg-[#0284C7] transition-all cursor-pointer"
                >
                  START CONVERSATION
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
