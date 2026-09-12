import React from 'react';
import { Video, User, Grid3X3, Eye, Volume2, VolumeX, Gauge, Compass } from 'lucide-react';
import { CameraViewMode, WorldSettings } from '../../types';
import { sound } from '../../utils/audio';

interface ControlToolbarProps {
  cameraMode: CameraViewMode;
  settings: WorldSettings;
  onChangeCamera: (mode: CameraViewMode) => void;
  onToggleSound: () => void;
  onToggleReducedMotion: () => void;
  showMiniMap?: boolean;
  onToggleMiniMap?: () => void;
}

export const ControlToolbar: React.FC<ControlToolbarProps> = ({
  cameraMode,
  settings,
  onChangeCamera,
  onToggleSound,
  onToggleReducedMotion,
  showMiniMap = true,
  onToggleMiniMap,
}) => {
  const cameraOptions: { id: CameraViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'cinematic', label: 'Cinematic', icon: <Video size={13} /> },
    { id: 'character', label: 'Character', icon: <User size={13} /> },
    { id: 'systems', label: 'Systems', icon: <Grid3X3 size={13} /> },
    { id: 'overview', label: 'World', icon: <Eye size={13} /> },
  ];

  return (
    <div
      id="hero-control-toolbar"
      className="fixed bottom-6 left-6 z-30 flex flex-wrap items-center gap-2 pointer-events-auto select-none"
    >
      {/* Camera Switcher Pill */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2]/80 shadow-md shadow-black/5">
        <span className="hidden sm:inline-block pl-2.5 pr-1 text-[10px] font-mono uppercase text-[#71717A] font-bold">
          CAM:
        </span>
        {cameraOptions.map((opt) => (
          <button
            key={opt.id}
            id={`cam-mode-${opt.id}-btn`}
            onClick={() => {
              sound.playHover();
              onChangeCamera(opt.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              cameraMode === opt.id
                ? 'bg-[#18181B] text-white shadow-sm'
                : 'text-[#52525B] hover:text-[#18181B] hover:bg-white/70'
            }`}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Reduced Motion Toggle Button */}
      <button
        id="reduced-motion-btn"
        onClick={() => {
          sound.playHover();
          onToggleReducedMotion();
        }}
        title={settings.reducedMotion ? 'Enable full 3D motion parallax' : 'Enable reduced motion'}
        className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
          settings.reducedMotion
            ? 'bg-[#E11D48] text-white border-[#E11D48]'
            : 'bg-[#FAF7F2]/90 text-[#52525B] border-[#E2DCD2]/80 hover:bg-white hover:text-[#18181B]'
        }`}
      >
        <Gauge size={13} />
        <span className="hidden sm:inline">{settings.reducedMotion ? 'Reduced Motion: ON' : 'Parallax'}</span>
      </button>

      {/* MiniMap Visibility Toggle Button */}
      {onToggleMiniMap && (
        <button
          id="toggle-minimap-toolbar-btn"
          onClick={() => {
            sound.playHover();
            onToggleMiniMap();
          }}
          title={showMiniMap ? 'Hide Mini-Map (Hotkey: M)' : 'Show Mini-Map (Hotkey: M)'}
          className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
            showMiniMap
              ? 'bg-[#18181B] text-white border-[#27272A]'
              : 'bg-[#FAF7F2]/90 text-[#71717A] border-[#E2DCD2]/80 hover:bg-white hover:text-[#18181B]'
          }`}
        >
          <Compass size={13} className={showMiniMap ? 'text-[#F59E0B]' : ''} />
          <span className="hidden sm:inline">Map [M]</span>
        </button>
      )}
    </div>
  );
};
