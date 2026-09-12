import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { VoxelWorld } from './components/3d/VoxelWorld';
import { HeroHeader } from './components/ui/HeroHeader';
import { WorldNavigator } from './components/ui/WorldNavigator';
import { World1Origin } from './components/worlds/World1Origin';
import { World2AutomationLab } from './components/worlds/World2AutomationLab';
import { World3BusinessAfterSleep } from './components/worlds/World3BusinessAfterSleep';
import { World4AILab } from './components/worlds/World4AILab';
import { World5CreativeStudio } from './components/worlds/World5CreativeStudio';
import { World6ContentStudio } from './components/worlds/World6ContentStudio';
import { World7GrowthFunnel } from './components/worlds/World7GrowthFunnel';
import { World8DataStrategy } from './components/worlds/World8DataStrategy';
import { World9Projects } from './components/worlds/World9Projects';
import { World10Founder } from './components/worlds/World10Founder';
import { World11Contact } from './components/worlds/World11Contact';
import { SystemDetailCard } from './components/ui/SystemDetailCard';
import { ControlToolbar } from './components/ui/ControlToolbar';
import { ProjectModal } from './components/ui/ProjectModal';
import { WorkShowcaseModal } from './components/ui/WorkShowcaseModal';
import { GameCursor } from './components/ui/GameCursor';
import { CinematicIntro } from './components/ui/CinematicIntro';
import { SkillsInventory } from './components/ui/SkillsInventory';
import { AchievementToast } from './components/ui/AchievementToast';
import { BiomeArrivalToast } from './components/ui/BiomeArrivalToast';
import { BiomeParticleOverlay } from './components/ui/BiomeParticleOverlay';
import { MiniMap } from './components/ui/MiniMap';
import { FastTravelScreenWipe } from './components/ui/FastTravelScreenWipe';
import { SystemId, WorldId, CameraViewMode, WorldSettings } from './types';
import { SYSTEM_NODES } from './data/systemsData';
import { WORLDS } from './data/portfolioWorlds';
import { sound } from './utils/audio';

export default function App() {
  const [activeWorld, setActiveWorld] = useState<WorldId>('origin');
  const [activeSystem, setActiveSystem] = useState<SystemId | null>(null);
  const [hoveredSystem, setHoveredSystem] = useState<SystemId | null>(null);
  const [cameraMode, setCameraMode] = useState<CameraViewMode>('cinematic');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [inquirySystemName, setInquirySystemName] = useState('General Inquiry');
  const [achievement, setAchievement] = useState<{ title: string; description: string } | null>(null);
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true);
  const [fastTravelState, setFastTravelState] = useState<{
    isTraveling: boolean;
    targetWorld: WorldId | null;
  }>({
    isTraveling: false,
    targetWorld: null,
  });

  const [settings, setSettings] = useState<WorldSettings>({
    soundEnabled: true,
    reducedMotion: false,
    timeOfDay: 'day',
    quality: 'high',
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setSettings((prev) => ({ ...prev, reducedMotion: true }));
      }
    }
  }, []);

  // Keyboard shortcut listener ('E' for Inventory, 'M' for Mini-Map cinematic toggle, 'Escape' to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        sound.playInventoryClick();
        setIsInventoryOpen((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        sound.playHover();
        setShowMiniMap((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsInventoryOpen(false);
        setIsProjectModalOpen(false);
        setIsWorkModalOpen(false);
        setActiveSystem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUnlockAchievement = (title: string, description: string) => {
    sound.playAchievement();
    setAchievement({ title, description });
  };

  // Debounced wheel listener to navigate smoothly between the 11 worlds
  useEffect(() => {
    let lastScrollTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.overflow-y-auto, textarea, input, select')) {
        return;
      }
      const now = Date.now();
      if (now - lastScrollTime < 800) return;

      if (Math.abs(e.deltaY) > 35) {
        lastScrollTime = now;
        const currentIndex = WORLDS.findIndex((w) => w.id === activeWorld);
        if (e.deltaY > 0) {
          const nextIndex = Math.min(currentIndex + 1, WORLDS.length - 1);
          if (nextIndex !== currentIndex) {
            sound.playClick();
            setActiveWorld(WORLDS[nextIndex].id);
          }
        } else {
          const prevIndex = Math.max(currentIndex - 1, 0);
          if (prevIndex !== currentIndex) {
            sound.playClick();
            setActiveWorld(WORLDS[prevIndex].id);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeWorld]);

  const handleSelectSystem = (id: SystemId | null) => {
    setActiveSystem(id);
    if (id) {
      setCameraMode('cinematic');
    }
  };

  const handleHoverSystem = (id: SystemId | null) => {
    setHoveredSystem(id);
  };

  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    sound.setEnabled(next);
    setSettings((prev) => ({ ...prev, soundEnabled: next }));
    if (next) {
      sound.crossfadeToSoundscape(activeWorld, 1.2);
    }
  };

  const handleToggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const handleFastTravel = (targetId: WorldId) => {
    if (targetId === activeWorld || fastTravelState.isTraveling) return;
    setFastTravelState({
      isTraveling: true,
      targetWorld: targetId,
    });
  };

  const handleNavigate = (section: string) => {
    if (section === 'home' || section === 'origin') {
      setActiveWorld('origin');
      setActiveSystem(null);
      setCameraMode('cinematic');
    } else if (section === 'automation') {
      setActiveWorld('automation');
    } else if (section === 'ai') {
      setActiveWorld('ai-lab');
    } else if (section === 'creative') {
      setActiveWorld('creative');
    } else if (section === 'growth') {
      setActiveWorld('growth');
    } else if (section === 'work') {
      setActiveWorld('projects');
    } else if (section === 'about') {
      setActiveWorld('founder');
    } else if (section === 'contact') {
      setActiveWorld('contact');
    }
  };

  const handleOpenInquiryForSystem = (systemName: string) => {
    setInquirySystemName(systemName);
    setIsProjectModalOpen(true);
  };

  const activeSystemData = SYSTEM_NODES.find((s) => s.id === activeSystem) || null;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#FAF7F2] select-none font-sans">
      {/* 0. Custom Minecraft Game Crosshair Cursor */}
      <GameCursor />

      {/* 0.05 Minecraft Biome Transition Particle & Warp Overlay */}
      <BiomeParticleOverlay
        activeWorld={activeWorld}
        reducedMotion={settings.reducedMotion}
      />

      {/* 0.1 Achievement Toast Notification */}
      <AchievementToast
        achievement={achievement}
        onClose={() => setAchievement(null)}
      />

      {/* 0.2 Biome Arrival Toast Notification */}
      <BiomeArrivalToast
        activeWorld={activeWorld}
        offsetTop={Boolean(achievement)}
        isIntroActive={showIntro}
      />

      {/* 0.2 Cinematic Intro Overlay */}
      {showIntro && (
        <CinematicIntro
          onComplete={() => {
            setShowIntro(false);
            sound.crossfadeToSoundscape(activeWorld, 1.8);
            handleUnlockAchievement('Entered The World', 'Welcomed into Manmohan\'s living digital realm.');
          }}
        />
      )}

      {/* 0.3 Fullscreen Interactive Skills Inventory Grid */}
      <SkillsInventory
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        onStartInquiry={(item) => {
          setIsInventoryOpen(false);
          setInquirySystemName(`Skills Arsenal: ${item.name}`);
          setIsProjectModalOpen(true);
        }}
      />

      {/* 1. Real 3D Minecraft-Inspired Voxel World (WebGL Three.js Canvas with HDR Bloom) */}
      <VoxelWorld
        activeWorld={activeWorld}
        activeSystem={activeSystem}
        hoveredSystem={hoveredSystem}
        cameraMode={cameraMode}
        settings={settings}
        onSelectSystem={handleSelectSystem}
        onHoverSystem={handleHoverSystem}
      />

      {/* 2. Floating Minimal Header Navigation */}
      <HeroHeader
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        onNavigate={handleNavigate}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* 2.1 Minecraft Pixel-Art Overworld Mini-Map with Fast Travel & Cinematic Toggle */}
      <MiniMap
        activeWorld={activeWorld}
        onSelectWorld={handleFastTravel}
        isFastTraveling={fastTravelState.isTraveling}
        isVisible={showMiniMap}
        onToggleVisibility={() => {
          sound.playHover();
          setShowMiniMap((prev) => !prev);
        }}
      />

      {/* 2.1b Restore Mini-Map Pill for clean cinematic view */}
      {!showMiniMap && (
        <button
          id="restore-minimap-pill"
          type="button"
          onClick={() => {
            sound.playHover();
            setShowMiniMap(true);
          }}
          className="fixed top-20 right-4 sm:right-6 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-[#27272A] text-white text-xs font-mono font-semibold shadow-xl shadow-black/60 hover:bg-[#202024] hover:border-[#3F3F46] transition-all duration-200 pointer-events-auto group"
          title="Show Mini-Map (Hotkey: M)"
        >
          <Compass size={13} className="text-[#F59E0B] group-hover:rotate-45 transition-transform" />
          <span className="font-minecraft text-[9px] text-[#F59E0B]">MAP</span>
          <span className="text-[9px] text-[#71717A]">[M]</span>
        </button>
      )}

      {/* 2.2 Cinematic Screen-Wipe Transition for Fast Travel */}
      <FastTravelScreenWipe
        isTraveling={fastTravelState.isTraveling}
        targetWorld={fastTravelState.targetWorld}
        onWipePeak={() => {
          setActiveSystem(null);
          if (fastTravelState.targetWorld) {
            setActiveWorld(fastTravelState.targetWorld);
          }
          setIsProjectModalOpen(false);
          setIsWorkModalOpen(false);
          setIsInventoryOpen(false);
        }}
        onComplete={() => {
          setFastTravelState({
            isTraveling: false,
            targetWorld: null,
          });
        }}
      />

      {/* 3. The 11 Distinct Connected Worlds */}
      <div className="absolute inset-0 z-20 overflow-y-auto">
        {activeWorld === 'origin' && (
          <World1Origin
            activeSystem={activeSystem}
            hoveredSystem={hoveredSystem}
            onSelectSystem={handleSelectSystem}
            onHoverSystem={handleHoverSystem}
            onExploreWork={() => setActiveWorld('projects')}
            onStartProject={() => {
              setInquirySystemName('Command Foundation Build');
              setIsProjectModalOpen(true);
            }}
            onFocusCharacter={() => setCameraMode('character')}
            onNextWorld={() => setActiveWorld('automation')}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {activeWorld === 'automation' && (
          <World2AutomationLab
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('after-sleep')}
          />
        )}

        {activeWorld === 'after-sleep' && (
          <World3BusinessAfterSleep
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('ai-lab')}
          />
        )}

        {activeWorld === 'ai-lab' && (
          <World4AILab
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('creative')}
          />
        )}

        {activeWorld === 'creative' && (
          <World5CreativeStudio
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('content')}
          />
        )}

        {activeWorld === 'content' && (
          <World6ContentStudio
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('growth')}
          />
        )}

        {activeWorld === 'growth' && (
          <World7GrowthFunnel
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('analytics')}
          />
        )}

        {activeWorld === 'analytics' && (
          <World8DataStrategy
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('projects')}
            onUnlockAchievement={handleUnlockAchievement}
            onNavigateWorld={(w) => setActiveWorld(w as WorldId)}
          />
        )}

        {activeWorld === 'projects' && (
          <World9Projects
            onStartProject={handleOpenInquiryForSystem}
            onNextWorld={() => setActiveWorld('founder')}
          />
        )}

        {activeWorld === 'founder' && (
          <World10Founder
            onStartProject={() => {
              setInquirySystemName('Connect with Manmohan');
              setIsProjectModalOpen(true);
            }}
            onFocusCharacter={() => setCameraMode('character')}
            onNextWorld={() => setActiveWorld('contact')}
          />
        )}

        {activeWorld === 'contact' && (
          <World11Contact
            onBackToOrigin={() => setActiveWorld('origin')}
          />
        )}
      </div>

      {/* 4. Floating 11-World Navigator Bar */}
      <WorldNavigator
        activeWorld={activeWorld}
        onSelectWorld={(id) => setActiveWorld(id)}
      />

      {/* 5. Interactive 3D System Inspector Modal (when clicking AI, Automation, Web, Growth in World 1) */}
      <SystemDetailCard
        system={activeSystemData}
        onClose={() => setActiveSystem(null)}
        onSelectCTA={handleOpenInquiryForSystem}
      />

      {/* 6. Floating Cinematic Camera & Audio Controls HUD */}
      <ControlToolbar
        cameraMode={cameraMode}
        settings={settings}
        onChangeCamera={(mode) => {
          setActiveSystem(null);
          setCameraMode(mode);
        }}
        onToggleSound={handleToggleSound}
        onToggleReducedMotion={handleToggleReducedMotion}
        showMiniMap={showMiniMap}
        onToggleMiniMap={() => {
          sound.playHover();
          setShowMiniMap((prev) => !prev);
        }}
      />

      {/* 7. Work Showcase Preview Modal */}
      <WorkShowcaseModal
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
        onStartProject={() => {
          setInquirySystemName('Custom Digital System Build');
          setIsProjectModalOpen(true);
        }}
      />

      {/* 8. Start Project Inquiry Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        initialType={inquirySystemName}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </main>
  );
}

