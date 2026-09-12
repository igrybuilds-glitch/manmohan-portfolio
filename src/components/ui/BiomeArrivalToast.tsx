import React, { useEffect, useState, useRef } from 'react';
import {
  Compass,
  Zap,
  Moon,
  Bot,
  Palette,
  Flame,
  Sprout,
  Radio,
  Gem,
  Shield,
  Send,
  X,
  MapPin,
} from 'lucide-react';
import { WorldId } from '../../types';

interface BiomeArrivalToastProps {
  activeWorld: WorldId;
  offsetTop?: boolean;
  isIntroActive?: boolean;
}

interface BiomeLocationInfo {
  name: string;
  orderBadge: string;
  subtitle: string;
  coords: string;
  accent: string;
  icon: React.ElementType;
}

const BIOME_LOCATIONS: Record<WorldId, BiomeLocationInfo> = {
  origin: {
    name: 'ORIGIN PLAINS',
    orderBadge: 'WORLD 01',
    subtitle: 'The Builder\'s Foundation',
    coords: 'X: 000 • Y: 64 • Z: 000',
    accent: '#E11D48',
    icon: Compass,
  },
  automation: {
    name: 'REDSTONE CITADEL',
    orderBadge: 'WORLD 02',
    subtitle: 'Autonomous Operations Lab',
    coords: 'X: +160 • Y: 68 • Z: -120',
    accent: '#EA580C',
    icon: Zap,
  },
  'after-sleep': {
    name: 'MIDNIGHT VAULT',
    orderBadge: 'WORLD 03',
    subtitle: 'Business After Dark',
    coords: 'X: +280 • Y: 72 • Z: -260',
    accent: '#6366F1',
    icon: Moon,
  },
  'ai-lab': {
    name: 'NEURAL SANCTUM',
    orderBadge: 'WORLD 04',
    subtitle: 'AI & JARVIS Business OS',
    coords: 'X: +140 • Y: 65 • Z: -420',
    accent: '#06B6D4',
    icon: Bot,
  },
  creative: {
    name: 'CREATIVE PRISM',
    orderBadge: 'WORLD 05',
    subtitle: 'High-Craft Brand Engine',
    coords: 'X: -180 • Y: 60 • Z: -150',
    accent: '#EC4899',
    icon: Palette,
  },
  content: {
    name: 'NETHER FORGE',
    orderBadge: 'WORLD 06',
    subtitle: 'Editorial Pipeline & Creative',
    coords: 'X: -300 • Y: 64 • Z: -280',
    accent: '#F97316',
    icon: Flame,
  },
  growth: {
    name: 'GROWTH CANOPY',
    orderBadge: 'WORLD 07',
    subtitle: 'Giant 3D Conversion Funnel',
    coords: 'X: -180 • Y: 75 • Z: -460',
    accent: '#10B981',
    icon: Sprout,
  },
  analytics: {
    name: 'TELEMETRY TOWER',
    orderBadge: 'WORLD 08',
    subtitle: 'Data Strategy & Radar',
    coords: 'X: 000 • Y: 72 • Z: -580',
    accent: '#3B82F6',
    icon: Radio,
  },
  projects: {
    name: 'DIAMOND ARCHIVES',
    orderBadge: 'WORLD 09',
    subtitle: 'Flagship Ventures & Case Studies',
    coords: 'X: -100 • Y: 62 • Z: -720',
    accent: '#06B6D4',
    icon: Gem,
  },
  founder: {
    name: "ARCHITECT'S CITADEL",
    orderBadge: 'WORLD 10',
    subtitle: 'Manmohan // Builder & Craft',
    coords: 'X: +120 • Y: 58 • Z: -720',
    accent: '#E11D48',
    icon: Shield,
  },
  contact: {
    name: 'BEACON OBSERVATORY',
    orderBadge: 'WORLD 11',
    subtitle: 'Direct Frequency & Build Inquiry',
    coords: 'X: 000 • Y: 60 • Z: -880',
    accent: '#A855F7',
    icon: Send,
  },
};

export const BiomeArrivalToast: React.FC<BiomeArrivalToastProps> = ({
  activeWorld,
  offsetTop = false,
  isIntroActive = false,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentWorld, setCurrentWorld] = useState<WorldId>(activeWorld);
  const isFirstMount = useRef<boolean>(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // If cinematic intro is actively showing, wait until intro closes
    if (isIntroActive) {
      setIsVisible(false);
      return;
    }

    if (isFirstMount.current) {
      isFirstMount.current = false;
    }

    setCurrentWorld(activeWorld);
    setIsVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Auto-dismiss after 4.2 seconds
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 4200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeWorld, isIntroActive]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const biome = BIOME_LOCATIONS[currentWorld] || BIOME_LOCATIONS.origin;
  const IconComponent = biome.icon || MapPin;

  return (
    <div
      id="minecraft-biome-arrival-toast"
      className="fixed top-20 left-4 sm:left-6 z-40 transition-all duration-300 pointer-events-auto"
      style={{
        animation: 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <div
        onClick={handleDismiss}
        title="Click to dismiss"
        className="group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-[#18181B]/95 text-white border-2 shadow-2xl shadow-black/50 backdrop-blur-md max-w-sm cursor-pointer select-none transition-transform hover:scale-[1.02]"
        style={{
          borderColor: biome.accent,
        }}
      >
        {/* Pixel Icon Frame */}
        <div
          className="w-11 h-11 rounded-lg bg-[#27272A] border border-[#3F3F46] flex items-center justify-center shrink-0 shadow-inner relative overflow-hidden"
          style={{
            boxShadow: `inset 0 0 10px ${biome.accent}25`,
          }}
        >
          {/* Subtle corner pixel accents */}
          <div
            className="absolute top-0 left-0 w-1.5 h-1.5"
            style={{ backgroundColor: biome.accent }}
          />
          <div
            className="absolute bottom-0 right-0 w-1.5 h-1.5"
            style={{ backgroundColor: biome.accent }}
          />

          <IconComponent
            size={20}
            className="transition-transform group-hover:scale-110"
            style={{ color: biome.accent }}
          />
        </div>

        {/* Content Body */}
        <div className="flex flex-col pr-4 min-w-[200px]">
          {/* Top Minecraft Tag */}
          <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-minecraft font-bold tracking-widest text-[#F59E0B] uppercase drop-shadow-[1px_1px_0px_rgba(0,0,0,0.9)]">
            <span>LOCATION ARRIVED!</span>
            <span className="text-[#52525B]">•</span>
            <span className="text-[#38BDF8]">{biome.orderBadge}</span>
          </div>

          {/* Location Name in Authentic Minecraft Font */}
          <span className="font-minecraft text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider mt-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.95)]">
            {biome.name}
          </span>

          {/* Subtitle & Coordinates */}
          <div className="flex items-center justify-between gap-2 mt-1 text-[10px] font-mono text-[#A1A1AA] leading-tight">
            <span className="truncate max-w-[170px]">{biome.subtitle}</span>
          </div>

          {/* Minecraft Coordinates */}
          <div className="text-[9px] font-mono text-[#71717A] tracking-wider mt-0.5">
            {biome.coords}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="absolute top-2 right-2 p-1 text-[#71717A] hover:text-white rounded transition-colors"
          title="Dismiss notification"
          aria-label="Dismiss biome notification"
        >
          <X size={12} />
        </button>

        {/* Minecraft-style Bottom Progress Bar */}
        <div className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full overflow-hidden bg-white/10">
          <div
            className="h-full origin-left animate-[shrinkProgress_4.2s_linear_forwards]"
            style={{ backgroundColor: biome.accent }}
          />
        </div>
      </div>
    </div>
  );
};
