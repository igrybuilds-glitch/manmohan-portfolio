import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HeroHeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNavigate: (section: string) => void;
  onOpenInventory?: () => void;
  onReplayIntro?: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onNavigate,
  onOpenInventory,
  onReplayIntro,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'WORK', id: 'work' },
    { label: 'AUTOMATION', id: 'automation' },
    { label: 'AI', id: 'ai' },
    { label: 'CREATIVE', id: 'creative' },
    { label: 'GROWTH', id: 'growth' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    sound.playHover();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="hero-floating-header"
      className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-5 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Founder Identity */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative w-9 h-9 rounded-lg bg-[#1E2022] flex items-center justify-center shadow-md shadow-black/5 transition-transform duration-300 group-hover:scale-105 border border-[#1E2022]/10">
              {/* Voxel logo cube icon */}
              <div className="w-4 h-4 rounded-sm bg-[#E11D48] transform rotate-12 transition-transform duration-300 group-hover:rotate-45" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E11D48] ring-2 ring-[#FAF7F2] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[#1E2022] font-sans group-hover:text-[#E11D48] transition-colors">
                IGRY<span className="text-[#E11D48]">builds</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#71717A] uppercase">
                By Manmohan
              </span>
            </div>
          </div>

          {/* Quick Founder Profile Badge */}
          <button
            onClick={() => handleNavClick('about')}
            title="View Founder Profile & Photo"
            className="hidden lg:flex items-center gap-2 py-1 px-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white border border-[#E2DCD2] hover:border-[#0284C7] shadow-sm transition-all cursor-pointer group"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#18181B]/20 shrink-0">
              <img
                src="/manmohan.png"
                alt="Manmohan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#18181B] group-hover:text-[#0284C7] transition-colors">
              MANMOHAN
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          </button>
        </div>

        {/* Minimal Floating Navigation Pill */}
        <nav
          id="hero-floating-nav"
          aria-label="Hero navigation"
          className="hidden md:flex pointer-events-auto items-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E2DCD2]/70 shadow-sm shadow-black/5"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#3F3F46] hover:text-[#18181B] hover:bg-white/80 transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Status Pill & Audio Control & Inventory */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Inventory Hotkey Button */}
          {onOpenInventory && (
            <button
              onClick={() => {
                sound.playInventoryClick();
                onOpenInventory();
              }}
              title="Open Skills Inventory [Hotkey E]"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E2DCD2]/80 hover:border-[#E11D48] text-xs font-mono font-bold text-[#27272A] hover:text-[#E11D48] transition-all shadow-sm cursor-pointer"
            >
              <div className="w-2.5 h-2.5 bg-[#E11D48] rounded-[2px]" />
              <span>INVENTORY [E]</span>
            </button>
          )}

          {/* Audio Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={() => {
              sound.playHover();
              onToggleSound();
            }}
            title={soundEnabled ? 'Mute synthesized sound effects' : 'Enable tactile audio'}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            className="w-9 h-9 rounded-full bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E2DCD2]/70 flex items-center justify-center text-[#52525B] hover:text-[#E11D48] hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Quick Connect CTA */}
          <button
            id="nav-cta-contact-btn"
            onClick={() => handleNavClick('contact')}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#18181B] text-white text-xs font-semibold tracking-wide hover:bg-[#E11D48] transition-all duration-300 shadow-sm shadow-black/10 group cursor-pointer"
          >
            <span>Let's Build</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile menu hamburger */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2]/70 flex items-center justify-center text-[#27272A] cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 p-4 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-xl border border-[#E2DCD2] shadow-xl space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#27272A] hover:bg-white hover:text-[#E11D48] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#E2DCD2]/60">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 rounded-xl bg-[#E11D48] text-white text-sm font-semibold tracking-wide text-center"
            >
              START A PROJECT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
