import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Sparkles, CheckCircle2, CornerDownLeft, Shield, Flame } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TerminalLine {
  id: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface WorldTerminalProps {
  onUnlockAchievement?: (title: string, description: string) => void;
  onNavigateWorld?: (worldId: string) => void;
}

export const WorldTerminal: React.FC<WorldTerminalProps> = ({
  onUnlockAchievement,
  onNavigateWorld,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'SYSTEM.INIT() -> VOXEL KERNEL V4.2 LOADED' },
    { id: '2', type: 'system', text: 'NEURAL_CORES: 12 AGENTS ACTIVE • SUB-100MS LATENCY' },
    { id: '3', type: 'system', text: 'FOUNDER: MANMOHAN (IGRYbuilds & Kruzoe)' },
    { id: '4', type: 'output', text: 'Type "help" to list available operational commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    sound.playTerminalKey();

    const userEntry: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      text: `> ${cmd}`,
    };

    const newLines = [...lines, userEntry];
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setLines([
        { id: Date.now().toString(), type: 'system', text: 'TERMINAL BUFFER CLEARED.' },
      ]);
      setInput('');
      return;
    }

    if (lower === 'help') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'COMMAND DIRECTORY:\n  • projects  - Enumerate flagship enterprise systems\n  • skills    - Query proficiency matrix & inventory\n  • status    - Report live system uptime & telemetry\n  • contact   - Connect directly with Manmohan\n  • redstone  - Trigger high-voltage automation core\n  • diamond   - [EASTER EGG] Mine rare voxel artifacts\n  • sudo build - Trigger full-stack deploy pipeline\n  • clear     - Reset console buffer',
      });
    } else if (lower === 'projects') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: '[DEPLOYED SYSTEMS]:\n  1. JobFlow AI (Autonomous Resume Intelligence & Dispatch)\n  2. Kruzoe Workspace (Multi-Tenant Collaborative Operating System)\n  3. Autonomous Revenue OS (24/7 Lead-to-Calendar Conversion Engine)\n  4. Voxel 3D Engine (GPU-Accelerated WebGL Architecture)',
      });
      if (onNavigateWorld) onNavigateWorld('projects');
    } else if (lower === 'skills') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: '[CORE ARSENAL]: TypeScript, React 19, Three.js, WebGL, Node/Express, n8n, Python, Gemini LLM, Docker, Cloud Run, PostgreSQL, Tailwind CSS.',
      });
    } else if (lower === 'status') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: '[SYSTEM METRICS]: 100% Operational | Audio: Synthesized Web Audio | WebGL: HDR Bloom Enabled | Location: Bangalore, India / Global Clients.',
      });
    } else if (lower === 'contact') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: '[COMMUNICATION CHANNELS]:\n  • Email: igrybuilds@gmail.com\n  • Direct Chat: Available in Contact Observatory below\n  • Calendar: 20-min Discovery Session open',
      });
      if (onNavigateWorld) onNavigateWorld('contact');
    } else if (lower === 'diamond') {
      sound.playSecretUnlock();
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: '✦ [EASTER EGG UNLOCKED] You mined a rare Diamond Block at Y: -58! Achievement added to your profile.',
      });
      if (onUnlockAchievement) {
        onUnlockAchievement('Diamond Miner', 'Discovered hidden voxel treasure in the terminal.');
      }
    } else if (lower === 'redstone') {
      sound.playRedstonePulse();
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: '⚡ [REDSTONE OVERCLOCK] Circuit energized. 12 operational nodes pulsating at maximum voltage.',
      });
      if (onUnlockAchievement) {
        onUnlockAchievement('Redstone Master', 'Overclocked the neural automation core via terminal.');
      }
    } else if (lower.startsWith('sudo')) {
      sound.playAchievement();
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: '👑 [ROOT ACCESS GRANTED] Executing full-scale digital construction... All tests green.',
      });
      if (onUnlockAchievement) {
        onUnlockAchievement('Root Architect', 'Invoked superuser rights in Manmohan OS.');
      }
    } else {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `Command not recognized: "${cmd}". Type "help" for valid directives.`,
      });
    }

    setLines(newLines);
    setInput('');
  };

  return (
    <div
      id="interactive-developer-terminal"
      className="w-full bg-[#101012] border-4 border-[#27272A] rounded-2xl p-4 sm:p-6 shadow-2xl font-mono relative overflow-hidden"
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#27272A] text-xs text-[#71717A]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          <span className="ml-2 text-white font-bold tracking-wider uppercase">
            MANMOHAN.SH // CLI
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-[#A1A1AA]">
          TYPE "HELP" • BASH EMULATOR
        </span>
      </div>

      {/* Terminal Output Log Area */}
      <div className="h-64 sm:h-72 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-[#27272A] text-xs sm:text-sm">
        {lines.map((line) => {
          let color = 'text-[#D4D4D8]';
          if (line.type === 'system') color = 'text-[#71717A]';
          if (line.type === 'input') color = 'text-[#E11D48] font-bold';
          if (line.type === 'success') color = 'text-[#34D399]';
          if (line.type === 'error') color = 'text-[#F87171]';

          return (
            <div key={line.id} className={`${color} whitespace-pre-wrap leading-relaxed`}>
              {line.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Prompt Form Input */}
      <form onSubmit={handleCommand} className="mt-4 pt-3 border-t border-[#27272A] flex items-center gap-2">
        <span className="text-[#E11D48] font-bold text-sm select-none">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command (e.g. 'help', 'projects', 'redstone')..."
          className="flex-1 bg-transparent text-white text-xs sm:text-sm font-mono focus:outline-none placeholder-[#52525B]"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#E11D48] text-[#D4D4D8] hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>EXEC</span>
          <CornerDownLeft size={13} />
        </button>
      </form>
    </div>
  );
};
