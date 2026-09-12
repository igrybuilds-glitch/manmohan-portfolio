import React, { useState } from 'react';
import { Briefcase, ArrowRight, ExternalLink, CheckCircle2, Layers, Cpu, Sparkles } from 'lucide-react';
import { MAJOR_PROJECTS } from '../../data/portfolioWorlds';
import { ProjectShowcase } from '../../types';
import { sound } from '../../utils/audio';

interface World9ProjectsProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
}

export const World9Projects: React.FC<World9ProjectsProps> = ({
  onStartProject,
  onNextWorld,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase>(MAJOR_PROJECTS[0]);

  return (
    <div
      id="world-selected-ventures"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <Briefcase size={14} className="text-[#E11D48]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 09 // SELECTED VENTURES • PRODUCT SHOWCASE
          </span>
        </div>

        <div className="flex gap-2">
          {MAJOR_PROJECTS.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedProject(proj);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#18181B] text-white border-[#18181B] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#71717A] border-[#E2DCD2] hover:bg-white hover:text-[#18181B]'
                }`}
              >
                {proj.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Case Study Deep Dive */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pointer-events-auto">
        {/* Left Column: Project Overview & Problem / Context */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-[10px] font-mono font-black">
                {selectedProject.statusTag}
              </span>
              <span className="text-xs font-mono text-[#71717A] font-bold">
                ROLE: {selectedProject.role}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#18181B] tracking-tight uppercase leading-[1.0] mb-2">
              {selectedProject.title}
            </h2>
            <p className="text-sm font-semibold text-[#E11D48] mb-4">
              {selectedProject.subtitle}
            </p>
            <p className="text-sm text-[#52525B] leading-relaxed mb-6 font-sans">
              {selectedProject.tagline}
            </p>
          </div>

          {/* Problem & Thinking Breakdown */}
          <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E2DCD2] space-y-4">
            <div>
              <span className="text-[10px] font-mono font-black text-[#E11D48] uppercase tracking-wider block mb-1">
                01 // THE PROBLEM & HUMAN CONTEXT
              </span>
              <p className="text-xs text-[#27272A] leading-relaxed">
                {selectedProject.problem}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E2DCD2]">
              <span className="text-[10px] font-mono font-black text-[#18181B] uppercase tracking-wider block mb-1">
                02 // STRATEGIC THINKING & SOLUTION
              </span>
              <p className="text-xs text-[#3F3F46] leading-relaxed">
                {selectedProject.solution}
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {selectedProject.metrics.map((m) => (
              <div key={m.label} className="p-3.5 rounded-2xl bg-white border border-[#E2DCD2] text-center shadow-sm">
                <span className="text-xl font-black text-[#18181B] block">{m.value}</span>
                <span className="text-[10px] font-mono font-bold text-[#71717A] uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: System Architecture & Workflow Stages */}
        <div className="lg:col-span-6 space-y-4">
          {/* Workflow Sequence */}
          {selectedProject.workflowStages && (
            <div className="p-6 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl">
              <span className="text-[10px] font-mono font-black text-[#71717A] uppercase tracking-wider block mb-3">
                INTEGRATED WORKFLOW SEQUENCE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.workflowStages.map((wf) => (
                  <div key={wf.step} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2]">
                    <span className="text-[9px] font-mono font-black text-[#E11D48] block mb-0.5">
                      STEP {wf.step} // {wf.title}
                    </span>
                    <p className="text-xs text-[#3F3F46] leading-tight">
                      {wf.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Architecture */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl">
            <span className="text-[10px] font-mono font-black text-[#71717A] uppercase tracking-wider block mb-3">
              TECHNICAL ARCHITECTURE & INFRASTRUCTURE
            </span>
            <div className="space-y-2 mb-4">
              {selectedProject.systemArchitecture.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#27272A]">
                  <CheckCircle2 size={14} className="text-[#E11D48] shrink-0 mt-0.5" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#18181B] text-white text-xs mb-4">
              <span className="font-bold text-[#E11D48]">BUSINESS IMPACT: </span>
              {selectedProject.businessValue}
            </div>

            <button
              onClick={() => onStartProject(`Project Inquiry: ${selectedProject.title}`)}
              className="w-full py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>DISCUSS A SIMILAR PLATFORM</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onNextWorld}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#E11D48] transition-all shadow-sm cursor-pointer"
        >
          <span>TRAVEL TO THE FOUNDER</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#E11D48]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 9 OF 11 • VENTURES & PRODUCT WORLDS
        </span>
      </div>
    </div>
  );
};
