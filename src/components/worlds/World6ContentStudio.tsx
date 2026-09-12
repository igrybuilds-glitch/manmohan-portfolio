import React, { useState } from 'react';
import { BookOpen, ArrowRight, CheckCircle2, FileText, Send, Share2, BarChart2 } from 'lucide-react';
import { CONTENT_WORKFLOW } from '../../data/portfolioWorlds';
import { sound } from '../../utils/audio';

interface World6ContentStudioProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
}

export const World6ContentStudio: React.FC<World6ContentStudioProps> = ({
  onStartProject,
  onNextWorld,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepData = CONTENT_WORKFLOW[activeStep];

  return (
    <div
      id="world-content-studio"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <BookOpen size={14} className="text-[#BE123C]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 06 // CONTENT STUDIO • EDITORIAL PIPELINE
          </span>
        </div>

        <div className="text-xs font-mono text-[#71717A] tracking-wider uppercase hidden sm:block">
          7-STEP END-TO-END PUBLISHING SYSTEM
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left: Headline & 7-Step Progress Rail */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight uppercase leading-[1.0] mb-3">
              EDITORIAL SYSTEMS THAT<br />
              <span className="text-[#BE123C]">COMMAND ATTENTION.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] max-w-xl font-sans">
              High-signal writing and multimedia distribution engineered to establish enduring domain authority and convert casual readers into qualified clients.
            </p>
          </div>

          {/* 7-Step Pipeline Rail */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {CONTENT_WORKFLOW.map((stage, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(idx);
                  }}
                  className={`p-3 rounded-2xl text-center transition-all border cursor-pointer ${
                    isCurrent
                      ? 'bg-[#BE123C] text-white border-[#BE123C] shadow-md shadow-[#BE123C]/30 -translate-y-1'
                      : 'bg-white text-[#18181B] border-[#E2DCD2] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-black block mb-0.5 ${isCurrent ? 'text-white/80' : 'text-[#BE123C]'}`}>
                    {stage.step}
                  </span>
                  <span className="text-xs font-black block truncate">
                    {stage.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Stage Deep-Dive Card */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl shadow-black/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-[#BE123C]/10 text-[#BE123C] text-xs font-mono font-black">
                STAGE {stepData.step} // {stepData.name}
              </span>
              <span className="text-xs font-mono font-bold text-[#71717A]">
                {stepData.label}
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#18181B] uppercase tracking-tight mb-2">
              {stepData.label}
            </h3>

            <p className="text-sm text-[#3F3F46] leading-relaxed mb-6">
              {stepData.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2DCD2] mb-6">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#71717A] uppercase block mb-1">
                SYSTEM OUTPUT & DELIVERABLE:
              </span>
              <p className="text-xs font-semibold text-[#18181B]">
                {stepData.deliverable}
              </p>
            </div>

            <button
              onClick={() => onStartProject(`Content Strategy: ${stepData.name}`)}
              className="w-full py-3 rounded-xl bg-[#BE123C] hover:bg-[#9F1239] text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>DEPLOY THIS EDITORIAL SYSTEM</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onNextWorld}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#BE123C] transition-all shadow-sm cursor-pointer"
        >
          <span>TRAVEL TO GROWTH FUNNEL CITY</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#BE123C]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 6 OF 11 • EDITORIAL PIPELINE
        </span>
      </div>
    </div>
  );
};
