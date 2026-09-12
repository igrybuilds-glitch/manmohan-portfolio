import React, { useState } from 'react';
import { BarChart3, Radio, ArrowRight, ShieldCheck, Target, Zap, Activity, Terminal as TerminalIcon } from 'lucide-react';
import { sound } from '../../utils/audio';
import { WorldTerminal } from '../ui/WorldTerminal';

interface World8DataStrategyProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
  onUnlockAchievement?: (title: string, desc: string) => void;
  onNavigateWorld?: (worldId: string) => void;
}

export const World8DataStrategy: React.FC<World8DataStrategyProps> = ({
  onStartProject,
  onNextWorld,
  onUnlockAchievement,
  onNavigateWorld,
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'terminal'>('metrics');
  const [selectedMetric, setSelectedMetric] = useState<'latency' | 'conversion' | 'cac' | 'ltv'>('conversion');

  const metrics = {
    conversion: {
      label: 'CONVERSION VELOCITY',
      value: '14.8%',
      benchmark: 'Industry Benchmark: 2.3%',
      description: 'End-to-end inbound traffic to discovery call conversion through instant AI qualification.',
      lift: '+540% over static forms',
    },
    latency: {
      label: 'RESPONSE LATENCY',
      value: '1.4s',
      benchmark: 'Industry Benchmark: 4h 12m',
      description: 'Autonomous multi-modal capture across Web, WhatsApp, and inbound voice calls.',
      lift: 'Zero-drop lead retention',
    },
    cac: {
      label: 'CUSTOMER ACQUISITION COST',
      value: '-62%',
      benchmark: 'Organic + Targeted Referral Multiplier',
      description: 'Systematized content distribution and automated nurturing reducing paid ad dependency.',
      lift: 'High-margin margin expansion',
    },
    ltv: {
      label: 'LIFETIME CONTRACT VALUE',
      value: '3.8x',
      benchmark: 'Post-Sale Automated Orchestration',
      description: 'Proactive milestone check-ins, automated renewal reminders, and expansion triggers.',
      lift: '92% 12-month client retention',
    },
  };

  return (
    <div
      id="world-data-strategy"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <BarChart3 size={14} className="text-[#EA580C]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 08 // DATA & STRATEGY • TELEMETRY TOWERS
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-[#FAF7F2]/90 border border-[#E2DCD2]">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('metrics');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-[#18181B] text-white shadow-sm'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            TELEMETRY METRICS
          </button>
          <button
            onClick={() => {
              sound.playTerminalKey();
              setActiveTab('terminal');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-[#E11D48] text-white shadow-sm'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            <TerminalIcon size={12} />
            <span>DEV TERMINAL (CLI)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 pointer-events-auto">
        {activeTab === 'terminal' ? (
          <div className="max-w-3xl mx-auto">
            <WorldTerminal
              onUnlockAchievement={onUnlockAchievement}
              onNavigateWorld={onNavigateWorld}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Headline & Telemetry Selectors */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight uppercase leading-[1.0] mb-3">
                  TELEMETRY TOWERS &<br />
                  <span className="text-[#EA580C]">STRATEGIC ADVANTAGE.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#52525B] max-w-xl font-sans">
                  Real-time analytics replacing guesswork. We monitor every pipeline velocity indicator to ensure maximum capital efficiency.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-xl">
                {(Object.keys(metrics) as Array<keyof typeof metrics>).map((key) => {
                  const item = metrics[key];
                  const isSelected = selectedMetric === key;

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sound.playClick();
                        setSelectedMetric(key);
                      }}
                      className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#18181B] text-white border-[#18181B] shadow-lg shadow-black/10 -translate-y-0.5'
                          : 'bg-white text-[#18181B] border-[#E2DCD2] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#EA580C]' : 'text-[#71717A]'}`}>
                        {item.label}
                      </span>
                      <span className="text-2xl font-black block">
                        {item.value}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Telemetry Insight Card */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl shadow-black/5 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#EA580C]/10 text-[#EA580C] text-[10px] font-mono font-extrabold uppercase tracking-wider">
                    ACTIVE TELEMETRY STREAM
                  </span>
                  <span className="text-xs font-mono text-[#71717A] font-semibold">
                    SYSTEM AUDIT
                  </span>
                </div>

                <h3 className="text-3xl font-black text-[#18181B] uppercase tracking-tight mb-1">
                  {metrics[selectedMetric].value}
                </h3>
                <span className="text-xs font-mono font-bold text-[#EA580C] block mb-3">
                  {metrics[selectedMetric].benchmark}
                </span>

                <p className="text-sm text-[#3F3F46] leading-relaxed mb-6">
                  {metrics[selectedMetric].description}
                </p>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2DCD2] mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#71717A] uppercase">OUTCOME:</span>
                  <span className="text-xs font-black text-[#18181B]">{metrics[selectedMetric].lift}</span>
                </div>

                <button
                  onClick={() => onStartProject(`Telemetry Audit: ${metrics[selectedMetric].label}`)}
                  className="w-full py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>AUDIT MY DIGITAL PIPELINE</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onNextWorld}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#EA580C] transition-all shadow-sm cursor-pointer"
        >
          <span>TRAVEL TO SELECTED VENTURES</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#EA580C]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 8 OF 11 • DATA & RADAR INTELLIGENCE
        </span>
      </div>
    </div>
  );
};
