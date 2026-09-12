import React, { useEffect, useState, useRef } from 'react';
import { Compass, Sparkles, Zap, Navigation } from 'lucide-react';
import { WorldId } from '../../types';

interface FastTravelScreenWipeProps {
  isTraveling: boolean;
  targetWorld: WorldId | null;
  onWipePeak: () => void;
  onComplete: () => void;
}

const BIOME_WIPE_DATA: Record<WorldId, { name: string; order: string; coords: string; accent: string }> = {
  origin: {
    name: 'ORIGIN PLAINS',
    order: 'WORLD 01',
    coords: 'X: 000 • Y: 64 • Z: 000',
    accent: '#E11D48',
  },
  automation: {
    name: 'REDSTONE CITADEL',
    order: 'WORLD 02',
    coords: 'X: +160 • Y: 68 • Z: -120',
    accent: '#EA580C',
  },
  'after-sleep': {
    name: 'MIDNIGHT VAULT',
    order: 'WORLD 03',
    coords: 'X: +280 • Y: 72 • Z: -260',
    accent: '#6366F1',
  },
  'ai-lab': {
    name: 'NEURAL SANCTUM',
    order: 'WORLD 04',
    coords: 'X: +140 • Y: 65 • Z: -420',
    accent: '#06B6D4',
  },
  creative: {
    name: 'CREATIVE PRISM',
    order: 'WORLD 05',
    coords: 'X: -180 • Y: 60 • Z: -150',
    accent: '#EC4899',
  },
  content: {
    name: 'NETHER FORGE',
    order: 'WORLD 06',
    coords: 'X: -300 • Y: 64 • Z: -280',
    accent: '#F97316',
  },
  growth: {
    name: 'GROWTH CANOPY',
    order: 'WORLD 07',
    coords: 'X: -180 • Y: 75 • Z: -460',
    accent: '#10B981',
  },
  analytics: {
    name: 'TELEMETRY TOWER',
    order: 'WORLD 08',
    coords: 'X: 000 • Y: 72 • Z: -580',
    accent: '#3B82F6',
  },
  projects: {
    name: 'DIAMOND ARCHIVES',
    order: 'WORLD 09',
    coords: 'X: -100 • Y: 62 • Z: -720',
    accent: '#06B6D4',
  },
  founder: {
    name: "ARCHITECT'S CITADEL",
    order: 'WORLD 10',
    coords: 'X: +120 • Y: 58 • Z: -720',
    accent: '#F59E0B',
  },
  contact: {
    name: 'BEACON OBSERVATORY',
    order: 'WORLD 11',
    coords: 'X: 000 • Y: 60 • Z: -880',
    accent: '#A855F7',
  },
};

const SHUTTER_COLUMNS = 8;

export const FastTravelScreenWipe: React.FC<FastTravelScreenWipeProps> = ({
  isTraveling,
  targetWorld,
  onWipePeak,
  onComplete,
}) => {
  // 'idle' | 'covering' | 'covered' | 'uncovering'
  const [phase, setPhase] = useState<'idle' | 'covering' | 'covered' | 'uncovering'>('idle');
  const hasTriggeredPeak = useRef(false);

  useEffect(() => {
    if (!isTraveling || !targetWorld) {
      setPhase('idle');
      hasTriggeredPeak.current = false;
      return;
    }

    hasTriggeredPeak.current = false;
    setPhase('covering');

    // At 260ms, the screen is completely covered by the shutter columns
    const peakTimer = window.setTimeout(() => {
      setPhase('covered');
      if (!hasTriggeredPeak.current) {
        hasTriggeredPeak.current = true;
        onWipePeak();
      }
    }, 280);

    // At 350ms, start unveiling the new destination view
    const uncoverTimer = window.setTimeout(() => {
      setPhase('uncovering');
    }, 360);

    // At 640ms, the transition is fully complete
    const completeTimer = window.setTimeout(() => {
      setPhase('idle');
      onComplete();
    }, 660);

    return () => {
      clearTimeout(peakTimer);
      clearTimeout(uncoverTimer);
      clearTimeout(completeTimer);
    };
  }, [isTraveling, targetWorld]);

  if (phase === 'idle' || !targetWorld) {
    return null;
  }

  const destination = BIOME_WIPE_DATA[targetWorld] || BIOME_WIPE_DATA.origin;

  return (
    <div
      id="fast-travel-screen-wipe"
      className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden"
      aria-live="assertive"
      aria-label={`Fast traveling to ${destination.name}`}
    >
      {/* 1. Staggered Pixel Shutter Columns */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: SHUTTER_COLUMNS }).map((_, idx) => {
          // Staggered calculation across columns
          const isCovering = phase === 'covering';
          const isCovered = phase === 'covered';
          const isUncovering = phase === 'uncovering';

          // Transition styles for entering vs exiting
          let transformStyle = 'translateY(-100%)';
          let transitionStyle = 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)';

          if (isCovering) {
            transformStyle = 'translateY(0%)';
            transitionStyle = `transform 260ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 28}ms`;
          } else if (isCovered) {
            transformStyle = 'translateY(0%)';
            transitionStyle = 'none';
          } else if (isUncovering) {
            transformStyle = 'translateY(100%)';
            transitionStyle = `transform 260ms cubic-bezier(0.7, 0, 0.84, 0) ${idx * 24}ms`;
          }

          return (
            <div
              key={idx}
              className="relative h-full flex-1 bg-[#101013] border-r border-[#202026] overflow-hidden"
              style={{
                transform: transformStyle,
                transition: transitionStyle,
              }}
            >
              {/* Subtle pixel scanline texture */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8) 51%),
                    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '100% 4px, 16px 100%',
                }}
              />

              {/* Leading Glow Edge along bottom of shutter */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1.5"
                style={{
                  backgroundColor: destination.accent,
                  boxShadow: `0 0 16px ${destination.accent}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. Centered Fast Travel Telemetry & Warp HUD */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-200 ${
          phase === 'covered' || phase === 'covering' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative max-w-md w-full flex flex-col items-center px-6 py-5 rounded-2xl bg-[#18181B]/90 border-2 border-white/20 shadow-2xl shadow-black/80 backdrop-blur-lg">
          {/* Animated Ender/Warp Beacon */}
          <div className="relative flex items-center justify-center w-12 h-12 mb-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: destination.accent }}
            />
            <div
              className="w-10 h-10 rounded-xl border-2 border-white/80 bg-[#27272A] flex items-center justify-center shadow-lg"
              style={{
                boxShadow: `0 0 20px ${destination.accent}`,
              }}
            >
              <Navigation
                size={22}
                className="animate-pulse"
                style={{ color: destination.accent }}
              />
            </div>
          </div>

          {/* Minecraft Status Tag */}
          <div className="flex items-center gap-2 font-minecraft text-[9px] sm:text-[10px] text-[#F59E0B] tracking-widest uppercase mb-1 drop-shadow-[1px_1px_0px_#000]">
            <Zap size={12} className="text-[#F59E0B]" />
            <span>FAST TRAVEL ENGAGED</span>
            <span className="text-[#52525B]">•</span>
            <span className="text-[#38BDF8]">{destination.order}</span>
          </div>

          {/* Destination Biome Name */}
          <h2 className="font-minecraft text-sm sm:text-base md:text-lg font-black text-white tracking-wider uppercase drop-shadow-[2px_2px_0px_#000] my-1">
            {destination.name}
          </h2>

          {/* Fast Travel Coordinates */}
          <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-[#A1A1AA]">
            <Compass size={12} className="text-[#A1A1AA]" />
            <span>WARP VECTORS: {destination.coords}</span>
          </div>

          {/* High-speed Warp Progress Bar */}
          <div className="w-full h-1 mt-4 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-[pulse_0.4s_ease-in-out_infinite]"
              style={{ backgroundColor: destination.accent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
