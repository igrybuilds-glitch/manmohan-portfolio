import React from 'react';
import { X, CheckCircle2, ArrowRight, Zap, Layers, Cpu, Workflow, Layout, TrendingUp } from 'lucide-react';
import { SystemNodeInfo } from '../../types';
import { sound } from '../../utils/audio';

interface SystemDetailCardProps {
  system: SystemNodeInfo | null;
  onClose: () => void;
  onSelectCTA: (systemName: string) => void;
}

export const SystemDetailCard: React.FC<SystemDetailCardProps> = ({
  system,
  onClose,
  onSelectCTA,
}) => {
  if (!system) return null;

  const getIcon = () => {
    switch (system.id) {
      case 'ai':
        return <Cpu className="text-[#E11D48]" size={22} />;
      case 'automation':
        return <Workflow className="text-[#EA580C]" size={22} />;
      case 'web':
        return <Layout className="text-[#E11D48]" size={22} />;
      case 'growth':
        return <TrendingUp className="text-[#BE123C]" size={22} />;
    }
  };

  return (
    <div
      id="system-detail-modal"
      className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[440px] p-6 rounded-3xl bg-[#FAF7F2]/95 backdrop-blur-xl border border-[#E2DCD2] shadow-2xl shadow-black/15 animate-in fade-in slide-in-from-bottom-6 duration-300 select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2DCD2]/70">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white shadow-sm border border-[#E2DCD2]/50">
            {getIcon()}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-[#71717A]">
              {system.category}
            </span>
            <h3 className="text-lg font-extrabold text-[#18181B] tracking-tight leading-none">
              {system.name}
            </h3>
          </div>
        </div>

        <button
          id="close-system-detail-btn"
          onClick={() => {
            sound.playHover();
            onClose();
          }}
          className="w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-[#E2DCD2] flex items-center justify-center text-[#71717A] hover:text-[#18181B] transition-colors"
          aria-label="Close details"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tagline & Description */}
      <p className="text-xs font-semibold text-[#E11D48] mb-1">
        {system.tagline}
      </p>
      <p className="text-sm text-[#3F3F46] leading-relaxed mb-4">
        {system.description}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/70 border border-[#E2DCD2]/60 mb-4">
        {system.metrics.map((metric, idx) => (
          <div key={idx} className="text-center">
            <div className="text-base sm:text-lg font-extrabold text-[#18181B] tracking-tight">
              {metric.value}
            </div>
            <div className="text-[10px] font-mono text-[#71717A] uppercase leading-tight mt-0.5">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Core Architectural Capabilities */}
      <div className="space-y-1.5 mb-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-bold">
          CORE CAPABILITIES
        </div>
        {system.features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-[#27272A]">
            <CheckCircle2 size={13} className="text-[#E11D48] flex-shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          id={`inquire-system-${system.id}-btn`}
          onClick={() => {
            sound.playHover();
            onSelectCTA(system.name);
          }}
          className="flex-1 py-3 px-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md shadow-[#E11D48]/25 flex items-center justify-center gap-2 group"
        >
          <span>BUILD WITH THIS SYSTEM</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            sound.playHover();
            onClose();
          }}
          className="py-3 px-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E2DCD2] text-xs font-bold text-[#52525B] transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};
