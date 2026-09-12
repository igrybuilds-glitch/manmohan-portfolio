import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RefreshCw, Zap, Bot, MessageSquare, Calendar, 
  TrendingUp, CheckCircle2, ChevronRight, Activity, Flame
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface MachineStage {
  id: string;
  step: number;
  label: string;
  sublabel: string;
  icon: any;
  metric: string;
  payload: string;
}

const MACHINE_STAGES: MachineStage[] = [
  {
    id: 'lead',
    step: 1,
    label: 'LEAD INGESTION',
    sublabel: 'Meta Ad / Webhook / Inbound Form',
    icon: Zap,
    metric: '< 120ms',
    payload: '{"intent": "hire_engineer", "source": "direct"}',
  },
  {
    id: 'automation',
    step: 2,
    label: 'REDSTONE ROUTING',
    sublabel: 'n8n & Custom Webhook Queue',
    icon: Activity,
    metric: '99.9% Uptime',
    payload: '{"pipeline": "priority_enterprise_v2"}',
  },
  {
    id: 'ai',
    step: 3,
    label: 'AI NEURAL REASONING',
    sublabel: 'Gemini Intent & Context Extraction',
    icon: Bot,
    metric: 'Structured JSON',
    payload: '{"qualification_score": 0.98, "needs_demo": true}',
  },
  {
    id: 'whatsapp',
    step: 4,
    label: 'WHATSAPP CONVERSATION',
    sublabel: 'Two-Way Interactive Voice & Text',
    icon: MessageSquare,
    metric: '< 8s Reply',
    payload: '{"status": "delivered_and_read", "sentiment": "eager"}',
  },
  {
    id: 'followup',
    step: 5,
    label: 'AUTONOMOUS NURTURE',
    sublabel: 'Objection Handling & Value Pitch',
    icon: Flame,
    metric: 'Zero Human Effort',
    payload: '{"case_study_sent": "JobFlow_AI_Scale"}',
  },
  {
    id: 'booking',
    step: 6,
    label: 'DIRECT CALENDAR SYNC',
    sublabel: 'Google Calendar & CRM Locked',
    icon: Calendar,
    metric: 'Auto-Scheduled',
    payload: '{"calendar_slot": "Thursday 3:00 PM EST"}',
  },
  {
    id: 'result',
    step: 7,
    label: 'REVENUE CAPTURE',
    sublabel: 'Client Onboarded & Deal Signed',
    icon: TrendingUp,
    metric: '+340% Conversion',
    payload: '{"client_status": "active_partner", "growth": "scaled"}',
  },
];

export const RedstoneAutomationMachine: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isOverclocked, setIsOverclocked] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => {
        const next = (prev + 1) % MACHINE_STAGES.length;
        sound.playRedstonePulse();
        return next;
      });
    }, isOverclocked ? 900 : 1800);

    return () => clearInterval(interval);
  }, [isRunning, isOverclocked]);

  const triggerManualCycle = () => {
    sound.playRedstonePulse();
    setActiveStage(0);
    setIsRunning(true);
  };

  const toggleOverclock = () => {
    sound.playHover();
    setIsOverclocked((prev) => !prev);
  };

  return (
    <div 
      id="redstone-automation-machine"
      className="w-full bg-[#18181A] border-4 border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
    >
      {/* Background Redstone Conduit Grid Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#E11D48_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Machine Header & Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E11D48] tracking-widest uppercase mb-1">
            <Flame size={14} className="animate-pulse" />
            <span>REDSTONE ENGINE // LIVE SIMULATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-mono font-black text-white uppercase tracking-tight">
            AUTONOMOUS ENTERPRISE PIPELINE
          </h3>
        </div>

        {/* Machine Control Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleOverclock}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer flex items-center gap-2 ${
              isOverclocked
                ? 'bg-[#E11D48] border-[#FB7185] text-white shadow-[0_0_15px_#E11D48]'
                : 'bg-[#27272A] border-[#3F3F46] text-[#A1A1AA] hover:text-white hover:border-white/50'
            }`}
          >
            <Zap size={14} className={isOverclocked ? 'animate-bounce' : ''} />
            <span>{isOverclocked ? 'OVERCLOCKED (2X)' : 'NORMAL SPEED'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsRunning((r) => !r);
            }}
            className="p-2.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-white border border-[#3F3F46] transition-colors cursor-pointer"
            title={isRunning ? 'Pause Machine' : 'Resume Machine'}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={triggerManualCycle}
            className="p-2.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-white border border-[#3F3F46] transition-colors cursor-pointer"
            title="Reset Cycle"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Sequential Machine Stages (Horizontal / Responsive Grid) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-8">
        {MACHINE_STAGES.map((stage, idx) => {
          const isActive = activeStage === idx;
          const isPassed = activeStage > idx;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              onClick={() => {
                sound.playRedstonePulse();
                setActiveStage(idx);
              }}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
                isActive
                  ? 'bg-[#E11D48]/15 border-[#E11D48] shadow-[0_0_20px_rgba(225,29,72,0.35)] scale-[1.02]'
                  : isPassed
                  ? 'bg-[#222224] border-[#E11D48]/40 text-[#D4D4D8]'
                  : 'bg-[#1C1C1E] border-[#2E2E32] text-[#71717A] opacity-75'
              }`}
            >
              {/* Connector Pin */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isActive ? 'bg-[#E11D48] text-white' : 'bg-[#27272A] text-[#A1A1AA]'
                }`}>
                  STAGE 0{stage.step}
                </span>
                <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#E11D48] animate-ping'
                    : isPassed
                    ? 'bg-[#E11D48]'
                    : 'bg-[#3F3F46]'
                }`} />
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-2 rounded-lg ${
                  isActive ? 'bg-[#E11D48] text-white' : 'bg-[#27272A] text-[#D4D4D8]'
                }`}>
                  <Icon size={18} />
                </div>
                <div className="text-xs font-mono font-bold text-white uppercase leading-tight">
                  {stage.label}
                </div>
              </div>

              {/* Metric */}
              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#71717A]">BENCHMARK</span>
                <span className={isActive ? 'text-[#FB7185] font-bold' : 'text-[#A1A1AA]'}>
                  {stage.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Live Telemetry Inspector */}
      <div className="relative z-10 bg-[#121214] border-2 border-[#27272A] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#E11D48] animate-pulse" />
          <span className="text-[#A1A1AA] uppercase">ACTIVE TELEMETRY:</span>
          <span className="text-white font-bold uppercase">
            {MACHINE_STAGES[activeStage].label}
          </span>
          <span className="hidden sm:inline text-[#71717A]">|</span>
          <span className="hidden sm:inline text-[#E11D48]">
            {MACHINE_STAGES[activeStage].sublabel}
          </span>
        </div>

        <div className="w-full md:w-auto bg-[#18181B] px-3 py-1.5 rounded-lg border border-[#3F3F46] text-[#A1A1AA] overflow-x-auto text-[11px]">
          <span className="text-[#E11D48] mr-2">PAYLOAD:</span>
          <code>{MACHINE_STAGES[activeStage].payload}</code>
        </div>
      </div>
    </div>
  );
};
