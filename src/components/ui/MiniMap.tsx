import React, { useState, useEffect } from 'react';
import {
  Compass,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Navigation,
  MapPin,
  EyeOff,
  Eye,
} from 'lucide-react';
import { WorldId } from '../../types';
import { sound } from '../../utils/audio';

interface MiniMapProps {
  activeWorld: WorldId;
  onSelectWorld: (worldId: WorldId) => void;
  isFastTraveling?: boolean;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

interface MapNode {
  id: WorldId;
  order: number;
  label: string;
  fullName: string;
  subname: string;
  xPct: number; // 0 - 100%
  yPct: number; // 0 - 100%
  accent: string;
  coords: string;
}

const MAP_NODES: MapNode[] = [
  {
    id: 'origin',
    order: 1,
    label: '01',
    fullName: 'ORIGIN PLAINS',
    subname: 'The Builder\'s Foundation',
    xPct: 50,
    yPct: 86,
    accent: '#E11D48',
    coords: 'X: 00 • Z: 00',
  },
  {
    id: 'automation',
    order: 2,
    label: '02',
    fullName: 'REDSTONE CITADEL',
    subname: 'Autonomous Operations',
    xPct: 76,
    yPct: 74,
    accent: '#EA580C',
    coords: 'X: +16 • Z: -18',
  },
  {
    id: 'after-sleep',
    order: 3,
    label: '03',
    fullName: 'MIDNIGHT VAULT',
    subname: 'Business After Dark',
    xPct: 88,
    yPct: 57,
    accent: '#6366F1',
    coords: 'X: +28 • Z: -32',
  },
  {
    id: 'ai-lab',
    order: 4,
    label: '04',
    fullName: 'NEURAL SANCTUM',
    subname: 'AI Intelligence Lab',
    xPct: 76,
    yPct: 43,
    accent: '#06B6D4',
    coords: 'X: +14 • Z: -48',
  },
  {
    id: 'creative',
    order: 5,
    label: '05',
    fullName: 'CREATIVE PRISM',
    subname: 'High-Craft Brand Engine',
    xPct: 24,
    yPct: 74,
    accent: '#EC4899',
    coords: 'X: -18 • Z: -20',
  },
  {
    id: 'content',
    order: 6,
    label: '06',
    fullName: 'NETHER FORGE',
    subname: 'Editorial Systems',
    xPct: 12,
    yPct: 57,
    accent: '#F97316',
    coords: 'X: -32 • Z: -34',
  },
  {
    id: 'growth',
    order: 7,
    label: '07',
    fullName: 'GROWTH CANOPY',
    subname: '3D Conversion Funnel',
    xPct: 24,
    yPct: 43,
    accent: '#10B981',
    coords: 'X: -20 • Z: -52',
  },
  {
    id: 'analytics',
    order: 8,
    label: '08',
    fullName: 'TELEMETRY TOWER',
    subname: 'Data Strategy Radar',
    xPct: 50,
    yPct: 35,
    accent: '#3B82F6',
    coords: 'X: 00 • Z: -66',
  },
  {
    id: 'projects',
    order: 9,
    label: '09',
    fullName: 'DIAMOND ARCHIVES',
    subname: 'Selected Flagships',
    xPct: 30,
    yPct: 22,
    accent: '#06B6D4',
    coords: 'X: -10 • Z: -78',
  },
  {
    id: 'founder',
    order: 10,
    label: '10',
    fullName: 'ARCHITECT CITADEL',
    subname: 'Manmohan Profile',
    xPct: 70,
    yPct: 22,
    accent: '#F59E0B',
    coords: 'X: +12 • Z: -78',
  },
  {
    id: 'contact',
    order: 11,
    label: '11',
    fullName: 'BEACON OBSERVATORY',
    subname: 'Direct Frequency',
    xPct: 50,
    yPct: 9,
    accent: '#A855F7',
    coords: 'X: 00 • Z: -95',
  },
];

// Connection lines representing pathways in the 3D voxel world
const PATHWAY_CONNECTIONS: [WorldId, WorldId][] = [
  // Eastern automation spine
  ['origin', 'automation'],
  ['automation', 'after-sleep'],
  ['after-sleep', 'ai-lab'],
  ['ai-lab', 'analytics'],

  // Western creative spine
  ['origin', 'creative'],
  ['creative', 'content'],
  ['content', 'growth'],
  ['growth', 'analytics'],

  // Northern summit
  ['analytics', 'projects'],
  ['analytics', 'founder'],
  ['projects', 'contact'],
  ['founder', 'contact'],
];

export const MiniMap: React.FC<MiniMapProps> = ({
  activeWorld,
  onSelectWorld,
  isFastTraveling = false,
  isVisible = true,
  onToggleVisibility,
}) => {
  const [internalVisible, setInternalVisible] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);

  const visible = isVisible !== undefined ? isVisible : internalVisible;

  // Toggle visibility with 'M' hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in inputs or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        sound.playHover();
        if (onToggleVisibility) {
          onToggleVisibility();
        } else {
          setInternalVisible((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleVisibility]);

  const activeNode = MAP_NODES.find((n) => n.id === activeWorld) || MAP_NODES[0];

  const handleNodeClick = (node: MapNode) => {
    if (node.id === activeWorld || isFastTraveling) return;
    sound.playFastTravel();
    onSelectWorld(node.id);
  };

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playHover();
    if (onToggleVisibility) {
      onToggleVisibility();
    } else {
      setInternalVisible(false);
    }
  };

  return (
    <div
      id="minecraft-minimap-container"
      className={`fixed top-20 right-4 sm:right-6 z-30 select-none transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
      }`}
    >
      {/* Outer Minecraft HUD Frame */}
      <div
        className={`relative rounded-xl bg-[#121214]/95 backdrop-blur-md border-2 border-[#27272A] shadow-2xl shadow-black/70 overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'w-[185px] sm:w-[200px]' : 'w-[230px] sm:w-[250px]'
        }`}
        style={{
          boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 15px ${activeNode.accent}15`,
        }}
      >
        {/* Pixel Header Bar */}
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between px-3 py-2 bg-[#18181B] border-b border-[#27272A] cursor-pointer hover:bg-[#202024] transition-colors"
        >
          <div className="flex items-center gap-2">
            {/* Pulsing Radar Beacon Blip */}
            <div className="relative flex items-center justify-center w-3 h-3">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: activeNode.accent }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: activeNode.accent }}
              />
            </div>

            <span className="font-minecraft text-[8px] sm:text-[9px] font-bold text-[#F59E0B] tracking-wider uppercase drop-shadow-[1px_1px_0px_#000]">
              MINI-MAP
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#71717A]">
            <span className="text-[8px] font-mono font-bold text-[#A1A1AA]">
              [{activeNode.order}/11]
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
                sound.playHover();
              }}
              className="p-0.5 hover:text-white rounded transition-colors"
              title={isCollapsed ? 'Expand mini-map' : 'Minimize mini-map'}
              aria-label={isCollapsed ? 'Expand mini-map' : 'Minimize mini-map'}
            >
              {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
            <button
              type="button"
              onClick={handleHide}
              className="p-0.5 hover:text-white rounded transition-colors"
              title="Hide mini-map for cinematic view (Hotkey: M)"
              aria-label="Hide mini-map"
            >
              <EyeOff size={13} />
            </button>
          </div>
        </div>

        {/* Collapsed State: Compact HUD Status Strip */}
        {isCollapsed ? (
          <div
            onClick={() => setIsCollapsed(false)}
            className="p-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-white/5 transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-minecraft text-[8px] text-white truncate max-w-[130px] drop-shadow-[1px_1px_0px_#000]">
                {activeNode.fullName}
              </span>
              <span className="text-[8px] font-mono text-[#71717A] mt-0.5">
                {activeNode.coords}
              </span>
            </div>
            <div
              className="w-3 h-3 rounded-[2px] shadow-sm shrink-0"
              style={{ backgroundColor: activeNode.accent }}
            />
          </div>
        ) : (
          /* Expanded State: 2D Pixel-Art World Grid */
          <div className="relative p-2.5">
            {/* Top Coordinate & Biome Sub-Header */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#27272A]/80 text-[8px] font-mono">
              <div className="flex items-center gap-1 text-[#D4D4D8]">
                <Compass size={11} className="text-[#F59E0B]" />
                <span className="truncate max-w-[125px] font-semibold">
                  {activeNode.fullName}
                </span>
              </div>
              <span className="text-[#71717A]">
                {activeNode.coords}
              </span>
            </div>

            {/* Pixel Grid Canvas Stage */}
            <div
              className="relative w-full h-[220px] rounded-lg bg-[#0C0C0E] border border-[#27272A] overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #1F1F23 1px, transparent 1px),
                  linear-gradient(to bottom, #1F1F23 1px, transparent 1px)
                `,
                backgroundSize: '16px 16px',
              }}
            >
              {/* Compass Cardinal Marks */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] font-minecraft font-bold text-[#52525B]">
                N
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-minecraft font-bold text-[#52525B]">
                S
              </div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] font-minecraft font-bold text-[#52525B]">
                W
              </div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[7px] font-minecraft font-bold text-[#52525B]">
                E
              </div>

              {/* Faint Center Radar Crosshair */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                <div className="w-full h-[1px] bg-white" />
                <div className="h-full w-[1px] bg-white absolute" />
              </div>

              {/* SVG Connecting Pathway Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {PATHWAY_CONNECTIONS.map(([startId, endId], idx) => {
                  const nodeA = MAP_NODES.find((n) => n.id === startId);
                  const nodeB = MAP_NODES.find((n) => n.id === endId);
                  if (!nodeA || !nodeB) return null;

                  const isCurrentPathway =
                    (activeWorld === startId && activeWorld === endId) ||
                    (activeWorld === startId || activeWorld === endId);

                  return (
                    <line
                      key={`path-${idx}`}
                      x1={`${nodeA.xPct}%`}
                      y1={`${nodeA.yPct}%`}
                      x2={`${nodeB.xPct}%`}
                      y2={`${nodeB.yPct}%`}
                      stroke={isCurrentPathway ? activeNode.accent : '#27272A'}
                      strokeWidth={isCurrentPathway ? 1.5 : 1}
                      strokeDasharray="2 3"
                      strokeOpacity={isCurrentPathway ? 0.8 : 0.45}
                    />
                  );
                })}
              </svg>

              {/* 11 Interactive Pixel-Art World Nodes */}
              {MAP_NODES.map((node) => {
                const isActive = node.id === activeWorld;
                const isHovered = hoveredNode?.id === node.id;

                return (
                  <button
                    key={node.id}
                    id={`minimap-node-${node.id}`}
                    type="button"
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => {
                      setHoveredNode(node);
                      sound.playHover();
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                    title={`${node.order}. ${node.fullName} (Click to Fast Travel)`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none transition-all duration-200 ease-out active:scale-95 ${
                      isHovered
                        ? 'z-30 scale-125'
                        : isActive
                        ? 'z-20 scale-105'
                        : 'z-10 hover:z-30 hover:scale-115'
                    }`}
                    style={{
                      left: `${node.xPct}%`,
                      top: `${node.yPct}%`,
                    }}
                  >
                    {/* Active Radar Ripple */}
                    {isActive && (
                      <span
                        className="absolute -inset-2 rounded-md animate-ping opacity-60 pointer-events-none"
                        style={{ backgroundColor: node.accent }}
                      />
                    )}

                    {/* Subtle Minecraft Slot Hover Frame */}
                    <div
                      className={`absolute -inset-1 rounded-[4px] border transition-all duration-200 pointer-events-none ${
                        isHovered
                          ? 'border-white/60 bg-white/15 scale-110 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.2)]'
                          : isActive
                          ? 'border-white/30 bg-white/5 opacity-80'
                          : 'border-transparent opacity-0 group-hover:opacity-100 group-hover:border-white/30 group-hover:bg-white/5 group-hover:scale-105'
                      }`}
                    />

                    {/* Voxel Pixel Block Button with subtle scale & lighting */}
                    <div
                      className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-[3px] flex items-center justify-center transition-all duration-200 ease-out ${
                        isActive
                          ? 'ring-2 ring-white shadow-[0_0_12px_currentColor]'
                          : isHovered
                          ? 'ring-2 ring-white/95 shadow-[0_0_14px_currentColor]'
                          : 'group-hover:ring-1.5 group-hover:ring-white/80 group-hover:shadow-[0_0_8px_currentColor]'
                      }`}
                      style={{
                        backgroundColor: node.accent,
                        color: node.accent,
                        boxShadow: isActive || isHovered
                          ? `0 0 12px ${node.accent}, inset 1px 1px 0px rgba(255,255,255,0.8), inset -1px -1px 0px rgba(0,0,0,0.7)`
                          : 'inset 1px 1px 0px rgba(255,255,255,0.4), inset -1px -1px 0px rgba(0,0,0,0.6)',
                      }}
                    >
                      {/* Voxel Grid Texture Inset */}
                      <div className="absolute inset-0.5 border border-black/30 rounded-[2px]" />

                      {/* World Order Number */}
                      <span className="font-minecraft text-[7px] text-white font-bold drop-shadow-[1px_1px_0px_#000] relative z-10 transition-transform duration-200 group-hover:scale-110">
                        {node.order}
                      </span>
                    </div>

                    {/* Minecraft Player Arrow Beacon Locator (Only on Active World) */}
                    {isActive && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-bounce">
                        {/* Triangular Player Cursor */}
                        <div
                          className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px]"
                          style={{ borderTopColor: '#FEF08A' }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hovered / Active World Preview Telemetry Box */}
            <div className="mt-2 px-2 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-between text-[8px] font-mono">
              <div className="flex flex-col truncate pr-2">
                <span className="font-minecraft text-[8px] text-white truncate drop-shadow-[1px_1px_0px_#000]">
                  {hoveredNode ? hoveredNode.fullName : activeNode.fullName}
                </span>
                <span className="text-[#A1A1AA] text-[8px] truncate mt-0.5">
                  {hoveredNode ? hoveredNode.subname : activeNode.subname}
                </span>
              </div>

              <span
                className="shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                style={{
                  backgroundColor: `${hoveredNode ? hoveredNode.accent : activeNode.accent}25`,
                  color: hoveredNode ? hoveredNode.accent : activeNode.accent,
                }}
              >
                {isFastTraveling
                  ? 'WARPING...'
                  : hoveredNode
                  ? hoveredNode.id === activeWorld
                    ? 'HERE'
                    : 'FAST TRAVEL'
                  : 'ACTIVE'}
              </span>
            </div>

            {/* Hotkey Helper Footer */}
            <div className="mt-1.5 px-1 flex items-center justify-between text-[7px] font-mono text-[#52525B]">
              <span>CINEMATIC: [M] HIDE/SHOW</span>
              <span>FAST TRAVEL: CLICK NODE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
