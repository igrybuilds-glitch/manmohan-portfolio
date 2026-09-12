import React from 'react';
import { X, ExternalLink, ArrowRight, Sparkles, Layers, CheckCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface WorkShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const WorkShowcaseModal: React.FC<WorkShowcaseModalProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
  if (!isOpen) return null;

  const projects = [
    {
      title: 'Kruzoe Digital Ecosystem',
      client: 'Kruzoe / Co-Founder',
      category: 'Autonomous Agent Platform & SaaS',
      desc: 'Architected end-to-end multi-agent workflow systems and bespoke conversion experience resulting in 3.4x pipeline acceleration.',
      tag: 'AI + AUTOMATION',
      metrics: '3.4x Pipeline Growth',
    },
    {
      title: 'Apex Neural Pipeline',
      client: 'Enterprise Client',
      category: 'Intelligent RAG & Knowledge Engine',
      desc: 'Reduced internal customer support latency by 72% via production vector search models and self-healing webhooks.',
      tag: 'AI ARCHITECTURE',
      metrics: '72% Latency Cut',
    },
    {
      title: 'Voxel Command Hub',
      client: 'IGRYbuilds Labs',
      category: '3D WebGL Digital Experience',
      desc: 'Interactive 60fps real-time spatial web environment blending tactile brand storytelling with measurable conversion.',
      tag: '3D WEB EXPERIENCES',
      metrics: '99/100 Lighthouse',
    },
  ];

  return (
    <div
      id="work-showcase-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200 select-none"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E2DCD2] shadow-2xl">
        <button
          id="close-work-modal-btn"
          onClick={() => {
            sound.playHover();
            onClose();
          }}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-[#E2DCD2] flex items-center justify-center text-[#52525B] hover:text-[#18181B] hover:bg-[#F4EFE6] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#E11D48] uppercase tracking-wider font-bold mb-1">
          <Sparkles size={14} />
          <span>PORTFOLIO SHOWCASE // MANMOHAN</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight mb-2">
          Featured Digital Systems
        </h3>
        <p className="text-sm text-[#52525B] mb-6">
          Selected high-impact engineering projects, AI pipelines, and digital architectures built by Manmohan.
        </p>

        <div className="space-y-4 mb-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E2DCD2] hover:border-[#E11D48]/50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] font-bold">
                  {proj.tag}
                </span>
                <span className="text-xs font-mono font-bold text-[#18181B]">
                  {proj.metrics}
                </span>
              </div>

              <h4 className="text-lg font-extrabold text-[#18181B] group-hover:text-[#E11D48] transition-colors">
                {proj.title}
              </h4>
              <p className="text-xs font-medium text-[#71717A] mb-2">
                {proj.client} • {proj.category}
              </p>
              <p className="text-xs text-[#3F3F46] leading-relaxed">
                {proj.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2DCD2]">
          <span className="text-xs text-[#71717A] font-mono">
            Want a custom system architected for your brand?
          </span>
          <button
            onClick={() => {
              sound.playHover();
              onClose();
              onStartProject();
            }}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#E11D48]/25"
          >
            <span>START A PROJECT</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
