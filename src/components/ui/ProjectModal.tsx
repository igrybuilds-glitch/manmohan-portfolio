import React, { useState } from 'react';
import { X, Send, CheckCircle, ArrowRight, Sparkles, Building2, Mail, MessageSquare } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProjectModalProps {
  isOpen: boolean;
  initialType?: string;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  initialType = 'General Inquiry',
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectScope: initialType,
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSystemActivate('growth');
    setSubmitted(true);
  };

  return (
    <div
      id="project-inquiry-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E2DCD2] shadow-2xl">
        <button
          id="close-project-modal-btn"
          onClick={() => {
            sound.playHover();
            onClose();
          }}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-[#E2DCD2] flex items-center justify-center text-[#52525B] hover:text-[#18181B] hover:bg-[#F4EFE6] transition-colors"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E11D48]/10 text-[#E11D48] flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#18181B]">
              Message Dispatched
            </h3>
            <p className="text-sm text-[#52525B] max-w-sm mx-auto">
              Thank you for reaching out to <span className="font-bold text-[#E11D48]">IGRYbuilds</span>. Manmohan will review your digital system requirements and follow up promptly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E11D48] uppercase tracking-wider font-bold mb-1">
              <Sparkles size={14} />
              <span>START A DIGITAL SYSTEM</span>
            </div>
            <h3 className="text-2xl font-black text-[#18181B] tracking-tight mb-2">
              Build with IGRYbuilds
            </h3>
            <p className="text-xs text-[#71717A] mb-6">
              Partner with Manmohan to construct high-performance AI, automation pipelines, and digital experiences.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-[#3F3F46] mb-1">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera // Acme Corp"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5CFC5] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-[#3F3F46] mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@acmecorp.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5CFC5] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-[#3F3F46] mb-1">
                  System Architecture Focus
                </label>
                <select
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5CFC5] text-sm text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                >
                  <option value="AI Intelligence Systems">AI Intelligence Systems & Agents</option>
                  <option value="Workflow Automation">Workflow Automation & Integrations</option>
                  <option value="Digital Experiences">High-Impact 3D Web & Products</option>
                  <option value="Business Growth Funnels">Business Growth Funnels & Conversion</option>
                  <option value="Full Ecosystem Architecture">Full Ecosystem Architecture (All)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-[#3F3F46] mb-1">
                  System Goals & Timeline
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your business goals and what systems you want to automate or launch..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5CFC5] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#E11D48] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#E11D48]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>INITIATE PROJECT DISCUSSION</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
