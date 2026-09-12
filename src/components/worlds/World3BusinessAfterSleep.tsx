import React, { useState } from 'react';
import { Moon, Sun, Clock, CheckCircle, ArrowRight, ShieldCheck, FileCheck, Smartphone } from 'lucide-react';
import { AFTER_DARK_TIMELINE } from '../../data/portfolioWorlds';
import { TimelineEvent } from '../../types';
import { sound } from '../../utils/audio';

interface World3BusinessAfterSleepProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
}

export const World3BusinessAfterSleep: React.FC<World3BusinessAfterSleepProps> = ({
  onStartProject,
  onNextWorld,
}) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState(1);
  const currentEvent = AFTER_DARK_TIMELINE[selectedEventIndex];

  return (
    <div
      id="world-business-after-dark"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <Moon size={14} className="text-[#E11D48]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 03 // BUSINESS AFTER DARK • 11:00 PM → 07:00 AM
          </span>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-[#E11D48]/10 border border-[#E11D48]/20 text-[#E11D48] text-xs font-mono font-extrabold tracking-widest uppercase">
          DEMO / SIMULATION SPECIFICATION
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        
        {/* Left: Headline & Timeline Scrubber */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight uppercase leading-[1.0] mb-3">
              WHILE YOU SLEEP,<br />
              <span className="text-[#E11D48]">THE SYSTEM CONVERTS.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] max-w-xl font-sans">
              Watch what happens when the business owner closes their laptop at 11:00 PM. High-intent midnight inquiries turn into booked calendar appointments by 07:00 AM.
            </p>
          </div>

          {/* Interactive Timeline Scrubber */}
          <div className="p-4 rounded-3xl bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm space-y-2">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#71717A] uppercase flex items-center gap-1.5">
                <Clock size={13} className="text-[#E11D48]" />
                SELECT A TIMELINE MILESTONE
              </span>
              <span className="text-[10px] font-mono text-[#E11D48] font-bold">
                SIMULATION SCENARIO
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AFTER_DARK_TIMELINE.map((item, idx) => {
                const isSelected = selectedEventIndex === idx;
                return (
                  <button
                    key={item.time}
                    onClick={() => {
                      sound.playClick();
                      setSelectedEventIndex(idx);
                    }}
                    className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-md shadow-[#E11D48]/30 -translate-y-0.5'
                        : 'bg-white text-[#18181B] border-[#E2DCD2] hover:bg-[#FAF7F2] hover:border-[#E11D48]/40'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-extrabold uppercase block mb-1 ${isSelected ? 'text-white/80' : 'text-[#71717A]'}`}>
                      {item.time}
                    </span>
                    <span className="text-xs font-black block truncate">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Detailed Milestone State & Morning Report Simulation Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Milestone Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl shadow-black/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-xs font-mono font-black">
                {currentEvent.time}
              </span>
              <span className="text-[10px] font-mono font-bold text-[#71717A] tracking-wider uppercase">
                {currentEvent.tag}
              </span>
            </div>

            <h3 className="text-xl font-black text-[#18181B] uppercase tracking-tight mb-2">
              {currentEvent.title}
            </h3>

            <p className="text-sm text-[#3F3F46] leading-relaxed mb-4">
              {currentEvent.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E2DCD2] text-xs font-mono text-[#52525B]">
              {currentEvent.meta}
            </div>
          </div>

          {/* 7:00 AM Morning Executive Briefing Preview */}
          <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E2DCD2] shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#18181B] uppercase">
              <Smartphone size={14} className="text-[#E11D48]" />
              <span>07:00 AM MORNING EXECUTIVE BRIEFING (SIMULATED)</span>
            </div>
            <div className="text-xs text-[#52525B] leading-relaxed space-y-1">
              <p>• <strong>New Discovery Calls:</strong> 2 booked meetings scheduled for today.</p>
              <p>• <strong>High-Intent Accounts:</strong> 1 qualified enterprise lead tagged.</p>
              <p>• <strong>System Health:</strong> 100% uptime, zero dropped webhooks overnight.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onNextWorld}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#E11D48] transition-all shadow-sm cursor-pointer"
        >
          <span>TRAVEL TO AI INTELLIGENCE LAB</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#E11D48]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 3 OF 11 • ZERO-TOUCH REVENUE
        </span>
      </div>
    </div>
  );
};
