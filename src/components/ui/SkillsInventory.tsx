import React, { useState } from 'react';
import { 
  X, Sparkles, Code2, Cpu, Wrench, Palette, Database, Layers,
  Terminal, Bot, Workflow, Globe, Box, Flame, Shield, Zap
} from 'lucide-react';
import { sound } from '../../utils/audio';

export interface InventorySkillItem {
  id: string;
  name: string;
  category: 'web' | 'ai' | 'design' | 'tools' | 'systems';
  icon: any;
  stackSize: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  level: number; // 1-100
  lore: string;
  description: string;
  keyProjects: string[];
}

export const SKILL_ITEMS: InventorySkillItem[] = [
  // Web Dev
  {
    id: 'react-ts',
    name: 'React 19 & TypeScript',
    category: 'web',
    icon: Code2,
    stackSize: 64,
    rarity: 'legendary',
    level: 96,
    lore: 'Forged in high-concurrency client-state fires. Type safety grade IV.',
    description: 'Component architecture, custom hooks, memory optimizations, and real-time reactive streaming interfaces.',
    keyProjects: ['JobFlow AI', 'Kruzoe Workspace', 'Voxel Engine'],
  },
  {
    id: 'threejs',
    name: 'Three.js & WebGL Shaders',
    category: 'web',
    icon: Box,
    stackSize: 32,
    rarity: 'epic',
    level: 90,
    lore: 'Infused with GPU volumetric rendering and physically accurate soft bloom.',
    description: 'Procedural voxel terrain, custom GLSL normal mapping, dynamic shadow maps, and spatial audio integration.',
    keyProjects: ['IGRY Voxel World', '3D Landmark Monoliths'],
  },
  {
    id: 'nextjs',
    name: 'Next.js & Node / Express',
    category: 'web',
    icon: Globe,
    stackSize: 64,
    rarity: 'rare',
    level: 92,
    lore: 'High-throughput serverless microservices with sub-50ms cold starts.',
    description: 'Edge functions, REST & RPC backends, caching pipelines, and secure webhook ingestors.',
    keyProjects: ['Enterprise Webhook Proxy', 'Automated Lead Engine'],
  },
  // AI & Automation
  {
    id: 'gemini-llm',
    name: 'LLM Orchestration & Agents',
    category: 'ai',
    icon: Bot,
    stackSize: 64,
    rarity: 'legendary',
    level: 95,
    lore: 'Autonomous neural reasoning engine with structured schema validation.',
    description: 'Multi-turn agentic workflows, semantic search, vector embeddings, and zero-shot task planning.',
    keyProjects: ['JARVIS Business OS', 'Resume AI Analyzer'],
  },
  {
    id: 'n8n-make',
    name: 'n8n, Make & Custom Redstone',
    category: 'ai',
    icon: Workflow,
    stackSize: 64,
    rarity: 'legendary',
    level: 98,
    lore: 'Pure zero-loss operational conduits. Connects anything with an API.',
    description: 'Complex branching logic, failure fallback queues, idempotency safeguards, and live CRM sync.',
    keyProjects: ['Autonomous Revenue OS', 'WhatsApp AI Dispatch'],
  },
  {
    id: 'whatsapp-api',
    name: 'WhatsApp Business Cloud API',
    category: 'ai',
    icon: Zap,
    stackSize: 48,
    rarity: 'epic',
    level: 94,
    lore: 'Instant two-way conversation pipelines with automated intent routing.',
    description: 'Template validation, webhook signature verification, dynamic media dispatch, and interactive lists.',
    keyProjects: ['Lead Qualification Bot', 'Midnight Booking Agent'],
  },
  // Systems
  {
    id: 'cloud-infra',
    name: 'Docker, GCP & Cloud Run',
    category: 'systems',
    icon: Cpu,
    stackSize: 32,
    rarity: 'rare',
    level: 88,
    lore: 'Immutable container clusters scaling from zero to thousands of calls.',
    description: 'Multi-stage Docker builds, container ingress routing, cloud secrets management, and health probes.',
    keyProjects: ['Containerized APIs', 'Microservice Fleet'],
  },
  {
    id: 'databases',
    name: 'PostgreSQL, Redis & Supabase',
    category: 'systems',
    icon: Database,
    stackSize: 64,
    rarity: 'epic',
    level: 91,
    lore: 'ACID-compliant storage combined with in-memory distributed locks.',
    description: 'Complex relational schemas, connection pooling, cache invalidation, and automated migration scripts.',
    keyProjects: ['Multi-Tenant CRM', 'Session Telemetry Vault'],
  },
  // Design
  {
    id: 'ui-ux',
    name: 'Figma & Design Systems',
    category: 'design',
    icon: Palette,
    stackSize: 64,
    rarity: 'rare',
    level: 89,
    lore: 'Pixel-disciplined visual hierarchy with mathematical 8pt spatial rhythm.',
    description: 'Component libraries, design tokens, micro-interaction states, and high-fidelity prototypes.',
    keyProjects: ['Kruzoe Brand Architecture', 'IGRYbuilds Studio'],
  },
  {
    id: 'motion-craft',
    name: 'Framer Motion & Interaction',
    category: 'design',
    icon: Sparkles,
    stackSize: 48,
    rarity: 'epic',
    level: 93,
    lore: 'Physics-based spring curves that bring static layouts into vivid life.',
    description: 'Staggered entrances, layout transitions, drag gestures, and scroll-driven kinematics.',
    keyProjects: ['Kinetic Portfolio', 'Hero Dynamic Cam'],
  },
  // Tools
  {
    id: 'terminal-git',
    name: 'Git, Linux & Shell Scripting',
    category: 'tools',
    icon: Terminal,
    stackSize: 64,
    rarity: 'rare',
    level: 95,
    lore: 'Standard issue warrior equipment for fast automated deployments.',
    description: 'CI/CD GitHub Actions pipelines, bash automation scripts, and server hardening.',
    keyProjects: ['DevOps Workflows', 'Build Pipelines'],
  },
  {
    id: 'security-auth',
    name: 'OAuth 2.0 & Cryptography',
    category: 'tools',
    icon: Shield,
    stackSize: 16,
    rarity: 'epic',
    level: 90,
    lore: 'Enchanted with SHA-256 signatures and JWT bearer protections.',
    description: 'Token refresh flows, PKCE authorization, role-based access control (RBAC), and rate limiting.',
    keyProjects: ['Secure Auth Gateways', 'API Key Rotation'],
  },
];

interface SkillsInventoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsInventory: React.FC<SkillsInventoryProps> = ({ isOpen, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<InventorySkillItem>(SKILL_ITEMS[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'ai' | 'design' | 'systems' | 'tools'>('all');

  if (!isOpen) return null;

  const filteredItems = activeTab === 'all' 
    ? SKILL_ITEMS 
    : SKILL_ITEMS.filter((item) => item.category === activeTab);

  // Fill up a standard 9x3 Minecraft inventory grid (27 slots)
  const totalSlots = 27;
  const slots = Array.from({ length: totalSlots }, (_, i) => filteredItems[i] || null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-[#F59E0B] border-[#F59E0B]/60 bg-[#F59E0B]/10';
      case 'epic': return 'text-[#A855F7] border-[#A855F7]/60 bg-[#A855F7]/10';
      case 'rare': return 'text-[#3B82F6] border-[#3B82F6]/60 bg-[#3B82F6]/10';
      default: return 'text-[#71717A] border-[#3F3F46] bg-[#27272A]';
    }
  };

  return (
    <div 
      id="skills-inventory-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#1C1C1E] border-4 border-[#3A3A3C] shadow-2xl rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minecraft Style Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2C2C2E] border-b-4 border-[#3A3A3C]">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-[#E11D48] rotate-45 border border-white/40" />
            <h2 className="text-base sm:text-lg font-mono font-black tracking-wider text-[#F4F4F5] uppercase">
              PLAYER INVENTORY // SKILLS & ARTIFACTS
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#3A3A3C] hover:bg-[#E11D48] text-[#A1A1AA] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#242426] border-b border-[#3A3A3C] overflow-x-auto">
          {[
            { id: 'all', label: 'ALL ITEMS' },
            { id: 'web', label: 'WEB & 3D' },
            { id: 'ai', label: 'AI & AUTOMATION' },
            { id: 'systems', label: 'SYSTEMS & INFRA' },
            { id: 'design', label: 'DESIGN & MOTION' },
            { id: 'tools', label: 'TOOLS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playHover();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/30'
                  : 'bg-[#1C1C1E] text-[#A1A1AA] hover:bg-[#3A3A3C] hover:text-white border border-[#3A3A3C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Grid + Inspector Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* 9x3 Slot Inventory Matrix (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="text-xs font-mono font-bold text-[#71717A] tracking-wider uppercase">
              STORAGE MATRIX (27 SLOTS)
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 p-4 bg-[#141415] rounded-xl border-2 border-[#2C2C2E] shadow-inner">
              {slots.map((item, idx) => {
                const isSelected = selectedItem?.id === item?.id;
                const IconComponent = item?.icon;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (item) {
                        sound.playInventoryClick();
                        setSelectedItem(item);
                      }
                    }}
                    onMouseEnter={() => {
                      if (item) sound.playHover();
                    }}
                    className={`relative aspect-square rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer select-none ${
                      item
                        ? isSelected
                          ? 'border-[#E11D48] bg-[#E11D48]/20 shadow-[0_0_12px_#E11D48]'
                          : 'border-[#3A3A3C] bg-[#222224] hover:border-white/60 hover:bg-[#2C2C2E] hover:scale-105'
                        : 'border-[#262628] bg-[#18181A]/60'
                    }`}
                  >
                    {item && IconComponent && (
                      <>
                        <IconComponent
                          size={24}
                          className={`${
                            isSelected ? 'text-[#E11D48]' : 'text-[#E4E4E7]'
                          } transition-colors`}
                        />
                        {/* Stack Count (Minecraft Style) */}
                        <span className="absolute bottom-1 right-1 text-[10px] font-mono font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                          {item.stackSize}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hotbar (9 Quick Slots) */}
            <div className="mt-2">
              <div className="text-[11px] font-mono font-bold text-[#71717A] tracking-wider uppercase mb-2">
                ACTIVE HOTBAR
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 p-3 bg-[#18181A] rounded-xl border-2 border-[#E11D48]/40">
                {SKILL_ITEMS.slice(0, 9).map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        sound.playInventoryClick();
                        setSelectedItem(item);
                      }}
                      className={`relative aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer transition-transform ${
                        isSelected
                          ? 'border-[#E11D48] bg-[#E11D48]/20 scale-105'
                          : 'border-[#3A3A3C] bg-[#222224] hover:scale-105'
                      }`}
                    >
                      <Icon size={20} className={isSelected ? 'text-[#E11D48]' : 'text-white'} />
                      <span className="absolute top-0.5 left-1 text-[9px] font-mono text-[#71717A]">
                        {idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Item Inspector & Lore Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col p-5 bg-[#18181A] rounded-xl border-2 border-[#2C2C2E] justify-between">
            {selectedItem ? (
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#27272A] border-2 border-[#3F3F46] flex items-center justify-center shrink-0">
                    <selectedItem.icon size={26} className="text-[#E11D48]" />
                  </div>
                  <div>
                    <h3 className="text-base font-mono font-black text-white uppercase">
                      {selectedItem.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getRarityColor(selectedItem.rarity)}`}>
                        {selectedItem.rarity}
                      </span>
                      <span className="text-xs font-mono text-[#A1A1AA]">
                        LEVEL {selectedItem.level}/100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Level Stat Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#71717A] mb-1">
                    <span>PROFICIENCY</span>
                    <span className="text-white font-bold">{selectedItem.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#27272A] rounded-full overflow-hidden p-0.5 border border-[#3F3F46]">
                    <div
                      className="h-full bg-gradient-to-r from-[#E11D48] to-[#FB7185] rounded-full transition-all duration-500"
                      style={{ width: `${selectedItem.level}%` }}
                    />
                  </div>
                </div>

                {/* Item Lore (Minecraft Item Tooltip Flavor) */}
                <div className="p-3 rounded-lg bg-[#27272A]/80 border border-[#3F3F46] font-mono text-xs text-[#F59E0B] italic leading-relaxed">
                  "{selectedItem.lore}"
                </div>

                {/* Description */}
                <div className="text-xs text-[#D4D4D8] leading-relaxed">
                  {selectedItem.description}
                </div>

                {/* Integrated Systems & Projects */}
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#71717A] tracking-wider uppercase block mb-2">
                    PROVEN IN BATTLE:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.keyProjects.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded bg-[#27272A] text-white font-mono text-[11px] border border-[#3F3F46]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-mono text-[#71717A]">
                SELECT AN ITEM TO INSPECT
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#2C2C2E] flex items-center justify-between text-[11px] font-mono text-[#71717A]">
              <span>PRESS [E] OR CLICK OUTSIDE TO CLOSE</span>
              <span className="text-[#E11D48]">MANMOHAN OS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
