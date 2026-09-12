import React, { useState } from 'react';
import { Play, Sparkles, Activity, CheckCircle2, ArrowRight, Zap, RefreshCw, Flame, Layers } from 'lucide-react';
import { AUTOMATION_NODES } from '../../data/portfolioWorlds';
import { AutomationNode } from '../../types';
import { sound } from '../../utils/audio';
import { RedstoneAutomationMachine } from '../ui/RedstoneAutomationMachine';

interface World2AutomationLabProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
}

export const World2AutomationLab: React.FC<World2AutomationLabProps> = ({
  onStartProject,
  onNextWorld,
}) => {
  const [viewMode, setViewMode] = useState<'machine' | 'nodes'>('machine');
  const [selectedNode, setSelectedNode] = useState<AutomationNode>(AUTOMATION_NODES[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  const simulationPipeline = [0, 1, 2, 4, 5, 6, 7, 11]; // node indices in execution order

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);
    sound.playClick();

    simulationPipeline.forEach((nodeIdx, step) => {
      setTimeout(() => {
        setActiveStepIndex(nodeIdx);
        setSelectedNode(AUTOMATION_NODES[nodeIdx]);
        sound.playBlockPlace();
      }, step * 850);
    });

    setTimeout(() => {
      setIsSimulating(false);
      sound.playSystemActivate('automation');
    }, simulationPipeline.length * 850 + 200);
  };

  return (
    <div
      id="world-automation-lab"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 02 // AUTOMATION FACILITY • FLAGSHIP ARCHITECTURE
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FAF7F2]/90 border border-[#E2DCD2]">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('machine');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'machine'
                  ? 'bg-[#E11D48] text-white shadow-sm'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              <Flame size={13} />
              <span>REDSTONE ENGINE</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('nodes');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'nodes'
                  ? 'bg-[#18181B] text-white shadow-sm'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              <Layers size={13} />
              <span>12-NODE TOPOLOGY</span>
            </button>
          </div>

          {viewMode === 'nodes' && (
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer ${
                isSimulating
                  ? 'bg-[#EA580C] text-white animate-pulse'
                  : 'bg-[#18181B] hover:bg-[#EA580C] text-white hover:shadow-lg'
              }`}
            >
              {isSimulating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>MOVING...</span>
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" />
                  <span>SIMULATE</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Center Layout: Machine View OR Living Network Grid */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 pointer-events-auto">
        {viewMode === 'machine' ? (
          <div className="w-full">
            <RedstoneAutomationMachine />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headline & Living 12-Node Grid */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight uppercase leading-[1.0] mb-3">
                  YOUR BUSINESS<br />
                  <span className="text-[#EA580C] underline decoration-[#EA580C]/30 decoration-wavy">
                    DOESN'T HAVE TO SLEEP.
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-[#52525B] max-w-xl font-sans">
                  A self-healing automation fabric where incoming prospects are captured, qualified, booked, and synched to CRM in real-time. Zero human hold times.
                </p>
              </div>

              {/* 12 Connected Nodes Living Grid */}
              <div className="p-4 rounded-3xl bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#71717A] uppercase flex items-center gap-1.5">
                    <Activity size={13} className="text-[#EA580C]" />
                    LIVING AUTOMATION PIPELINE (12 NODES)
                  </span>
                  <span className="text-[10px] font-mono text-[#EA580C] font-semibold">
                    RED ENERGY SIGNAL: ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {AUTOMATION_NODES.map((node, idx) => {
                    const isSelected = selectedNode.id === node.id;
                    const isStepActive = activeStepIndex === idx;

                    return (
                      <button
                        key={node.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedNode(node);
                        }}
                        className={`relative p-3 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                          isStepActive
                            ? 'bg-[#EA580C] text-white border-[#EA580C] scale-105 shadow-lg shadow-[#EA580C]/40 ring-2 ring-white'
                            : isSelected
                            ? 'bg-[#18181B] text-white border-[#18181B] shadow-md shadow-black/10 -translate-y-0.5'
                            : 'bg-white text-[#18181B] border-[#E2DCD2]/90 hover:border-[#EA580C]/50 hover:bg-[#FAF7F2]'
                        }`}
                      >
                        {isStepActive && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E11D48]" />
                          </span>
                        )}
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${isStepActive || isSelected ? 'opacity-80 text-white' : 'text-[#71717A]'}`}>
                          {node.role}
                        </span>
                        <span className="text-xs font-black block truncate">
                          {node.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Node Inspector Detail Card */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl shadow-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EA580C]/10 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#EA580C]/10 text-[#EA580C] text-[10px] font-mono font-extrabold uppercase tracking-wider">
                    NODE INSPECTION
                  </span>
                  <span className="text-xs font-mono text-[#71717A] font-semibold">
                    SYSTEM STATUS // NOMINAL
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#18181B] uppercase tracking-tight mb-1">
                  {selectedNode.label}
                </h3>
                <span className="text-xs font-mono font-bold text-[#EA580C] block mb-4">
                  {selectedNode.role}
                </span>

                <p className="text-sm text-[#27272A] font-medium leading-relaxed mb-4">
                  {selectedNode.summary}
                </p>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2DCD2] mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#71717A] uppercase block mb-1.5">
                    TECHNICAL ARCHITECTURE & EXECUTION
                  </span>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {selectedNode.detail}
                  </p>
                </div>

                <button
                  onClick={() => onStartProject(`Automation System: ${selectedNode.label}`)}
                  className="w-full py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>IMPLEMENT THIS PIPELINE</span>
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
          <span>TRAVEL TO "BUSINESS AFTER DARK"</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#EA580C]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 2 OF 11 • ENTERPRISE AUTOMATION
        </span>
      </div>
    </div>
  );
};
