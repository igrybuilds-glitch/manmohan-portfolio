import React, { useEffect, useRef, useState } from 'react';
import { WorldId } from '../../types';
import { sound } from '../../utils/audio';

interface BiomeTheme {
  name: string;
  subname: string;
  accent: string;
  colors: string[];
  particleType: 'redstone' | 'spore' | 'portal' | 'stars' | 'ember' | 'cyber' | 'diamond' | 'gold';
}

const BIOME_THEMES: Record<WorldId, BiomeTheme> = {
  origin: {
    name: 'ORIGIN PLAINS',
    subname: 'COMMAND FOUNDATION // 01',
    accent: '#E11D48',
    colors: ['#22C55E', '#10B981', '#E11D48', '#F59E0B', '#FFFFFF'],
    particleType: 'spore',
  },
  automation: {
    name: 'REDSTONE CITADEL',
    subname: 'AUTONOMOUS OPERATIONS // 02',
    accent: '#EA580C',
    colors: ['#E11D48', '#EF4444', '#F97316', '#FFAA00', '#FF2A55'],
    particleType: 'redstone',
  },
  'after-sleep': {
    name: 'MIDNIGHT VAULT',
    subname: 'BUSINESS AFTER DARK // 03',
    accent: '#6366F1',
    colors: ['#818CF8', '#A78BFA', '#6366F1', '#38BDF8', '#E0E7FF'],
    particleType: 'stars',
  },
  'ai-lab': {
    name: 'NEURAL SANCTUM',
    subname: 'AI INTELLIGENCE LAB // 04',
    accent: '#06B6D4',
    colors: ['#06B6D4', '#3B82F6', '#10B981', '#A855F7', '#67E8F9'],
    particleType: 'cyber',
  },
  creative: {
    name: 'CREATIVE PRISM',
    subname: 'BRAND STUDIO PAVILION // 05',
    accent: '#EC4899',
    colors: ['#EC4899', '#F43F5E', '#8B5CF6', '#FBBF24', '#FDA4AF'],
    particleType: 'portal',
  },
  content: {
    name: 'NETHER FORGE',
    subname: 'DIRECT RESPONSE CREATIVE // 06',
    accent: '#F97316',
    colors: ['#F97316', '#EF4444', '#FBBF24', '#EA580C', '#FFA500'],
    particleType: 'ember',
  },
  growth: {
    name: 'GROWTH CANOPY',
    subname: 'ACQUISITION MATRIX // 07',
    accent: '#10B981',
    colors: ['#10B981', '#84CC16', '#22C55E', '#EAB308', '#86EFAC'],
    particleType: 'spore',
  },
  analytics: {
    name: 'TELEMETRY TOWER',
    subname: 'DATA STRATEGY & RADAR // 08',
    accent: '#3B82F6',
    colors: ['#3B82F6', '#F59E0B', '#06B6D4', '#E11D48', '#93C5FD'],
    particleType: 'cyber',
  },
  projects: {
    name: 'DIAMOND ARCHIVES',
    subname: 'FLAGSHIP DEPLOYMENTS // 09',
    accent: '#06B6D4',
    colors: ['#06B6D4', '#67E8F9', '#818CF8', '#E0E7FF', '#38BDF8'],
    particleType: 'diamond',
  },
  founder: {
    name: "ARCHITECT'S CITADEL",
    subname: 'FOUNDER & CRAFT // 10',
    accent: '#E11D48',
    colors: ['#E11D48', '#F59E0B', '#D97706', '#FEF08A', '#F43F5E'],
    particleType: 'gold',
  },
  contact: {
    name: 'BEACON OBSERVATORY',
    subname: 'DIRECT FREQUENCY // 11',
    accent: '#A855F7',
    colors: ['#A855F7', '#EC4899', '#38BDF8', '#E11D48', '#C084FC'],
    particleType: 'portal',
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  decay: number;
  rotation: number;
  vRot: number;
  shape: 'cube' | 'cross' | 'rune' | 'sparkle';
  wobbleSpeed: number;
  wobbleOffset: number;
}

interface BiomeParticleOverlayProps {
  activeWorld: WorldId;
  reducedMotion?: boolean;
}

export const BiomeParticleOverlay: React.FC<BiomeParticleOverlayProps> = ({
  activeWorld,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentBiome, setCurrentBiome] = useState<BiomeTheme>(BIOME_THEMES[activeWorld]);
  const [vignetteOpacity, setVignetteOpacity] = useState<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isFirstRender = useRef<boolean>(true);

  // Trigger burst whenever activeWorld changes
  useEffect(() => {
    // Avoid loud blast on the very first mount if desired, but still initialize biome
    const theme = BIOME_THEMES[activeWorld] || BIOME_THEMES.origin;
    setCurrentBiome(theme);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Play unique Minecraft-inspired ambient sound for this specific biome
    sound.playBiomeTransition(activeWorld);

    // Crossfade dynamic background soundscape to the new world
    sound.crossfadeToSoundscape(activeWorld);

    // Flash ethereal biome vignette
    setVignetteOpacity(0.18);
    const vignetteTimeout = setTimeout(() => {
      setVignetteOpacity(0);
    }, 450);

    // Spawn Minecraft particles on canvas
    spawnParticles(theme);

    return () => {
      clearTimeout(vignetteTimeout);
    };
  }, [activeWorld]);

  const spawnParticles = (theme: BiomeTheme) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const count = reducedMotion ? 16 : 75;
    const newParticles: Particle[] = [];

    const shapes: ('cube' | 'cross' | 'rune' | 'sparkle')[] = ['cube', 'cube', 'cross', 'rune', 'sparkle'];

    for (let i = 0; i < count; i++) {
      // Pick random color from theme
      const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      // Disperse from center with outward radial explosion + upward float (Minecraft portal style)
      const startX = width / 2 + (Math.random() - 0.5) * (width * 0.7);
      const startY = height / 2 + (Math.random() - 0.5) * (height * 0.6);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;

      // Upward drift bias
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - (Math.random() * 2.2 + 0.8);

      newParticles.push({
        x: startX,
        y: startY,
        vx,
        vy,
        size: Math.floor(Math.random() * 7) + 5, // 5px to 12px chunky voxel pixels
        color,
        alpha: 1.0,
        life: 1.0,
        decay: Math.random() * 0.016 + 0.012, // lasts ~0.9s - 1.4s
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        shape,
        wobbleSpeed: Math.random() * 0.06 + 0.02,
        wobbleOffset: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = newParticles;

    // Start render loop if not running
    if (!animFrameRef.current) {
      renderLoop();
    }
  };

  const renderLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      animFrameRef.current = null;
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      animFrameRef.current = null;
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    const particles = particlesRef.current;
    let aliveCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.life <= 0) continue;

      aliveCount++;
      p.life -= p.decay;
      p.alpha = Math.max(0, p.life);

      // Physics update: slight gravity and upward buoyant drift
      p.wobbleOffset += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobbleOffset) * 0.8;
      p.y += p.vy;
      p.vy += 0.02; // soft gravity
      p.rotation += p.vRot;

      // Draw Minecraft Voxel Particle
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.shape === 'cube') {
        // Pixel-perfect crisp Minecraft square particle
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        // Highlight top/left pixel edge like a 3D voxel
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, 1.5);
        ctx.fillRect(-p.size / 2, -p.size / 2, 1.5, p.size);

        // Shadow bottom/right edge
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(-p.size / 2, p.size / 2 - 1.5, p.size, 1.5);
        ctx.fillRect(p.size / 2 - 1.5, -p.size / 2, 1.5, p.size);
      } else if (p.shape === 'cross') {
        // Minecraft Enchantment Table / Sparkle Star (+)
        ctx.fillStyle = p.color;
        const half = p.size / 2;
        const arm = p.size * 0.35;
        ctx.fillRect(-arm / 2, -half, arm, p.size);
        ctx.fillRect(-half, -arm / 2, p.size, arm);

        // Inner glowing core
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-arm / 4, -arm / 4, arm / 2, arm / 2);
      } else if (p.shape === 'rune') {
        // Floating glyph square / portal rune
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 4, -p.size / 4, p.size / 2, p.size / 2);
      } else {
        // Sparkle / diamond glint
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-1, -1, 2, 2);
      }

      ctx.restore();
    }

    if (aliveCount > 0) {
      animFrameRef.current = requestAnimationFrame(renderLoop);
    } else {
      ctx.clearRect(0, 0, width, height);
      animFrameRef.current = null;
    }
  };

  return (
    <div
      id="biome-particle-overlay"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Biome Shift Edge Glow Vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: vignetteOpacity,
          background: `radial-gradient(ellipse at center, transparent 45%, ${currentBiome.accent} 100%)`,
        }}
      />

      {/* 2. Floating High-DPI Voxel Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
