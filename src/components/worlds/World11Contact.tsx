import React, { useState } from 'react';
import { Mail, Calendar, ArrowRight, CheckCircle2, Send, Sparkles, MessageSquare } from 'lucide-react';
import { sound } from '../../utils/audio';

interface World11ContactProps {
  onBackToOrigin: () => void;
}

export const World11Contact: React.FC<World11ContactProps> = ({
  onBackToOrigin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI & Automation Pipeline',
    budget: '$5k - $15k',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSystemActivate('growth');
    setIsSubmitted(true);
  };

  return (
    <div
      id="world-contact-closure"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <Sparkles size={14} className="text-[#E11D48]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 11 // NARRATIVE CLOSURE • COMMAND STRUCTURE COMPLETE
          </span>
        </div>

        <div className="text-xs font-mono text-[#E11D48] font-bold tracking-wider uppercase">
          ● MONUMENT FULLY ERECTED
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Column: Narrative Closure & Direct Touchpoints */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-mono font-black text-[#E11D48] tracking-widest uppercase block mb-1">
              THE WORK IS BUILT. THE WORLD RUNS.
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#18181B] tracking-tight uppercase leading-[0.98] mb-4">
              LET'S BUILD<br />
              <span className="text-[#E11D48]">SOMETHING USEFUL.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed font-sans max-w-xl">
              You’ve traveled through all 11 worlds—from the first stone placed at the origin to autonomous midnight conversions and completed platforms. Now, let’s architect your digital system.
            </p>
          </div>

          <div className="space-y-3 max-w-md">
            <a
              href="mailto:igrybuilds@gmail.com"
              className="p-4 rounded-2xl bg-white border border-[#E2DCD2] shadow-sm flex items-center justify-between hover:border-[#E11D48]/50 hover:bg-[#FAF7F2] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E11D48]/10 text-[#E11D48] flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase block">DIRECT EMAIL</span>
                  <span className="text-xs sm:text-sm font-black text-[#18181B]">igrybuilds@gmail.com</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-[#71717A]" />
            </a>

            <div className="p-4 rounded-2xl bg-white border border-[#E2DCD2] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#71717A] uppercase block">DISCOVERY APPOINTMENTS</span>
                  <span className="text-xs sm:text-sm font-black text-[#18181B]">20-Min Architecture Session</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#EA580C] bg-[#EA580C]/10 px-2.5 py-1 rounded-full">
                SLOTS OPEN
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Project Architecture Form */}
        <div className="lg:col-span-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E11D48]/10 text-[#E11D48] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#18181B] uppercase">Inquiry Ingested</h3>
                <p className="text-xs text-[#52525B] max-w-sm mx-auto">
                  Thank you, {formData.name || 'there'}! The IGRYbuilds autonomous pipeline has received your project parameters. Manmohan will review and reach out within 4 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#18181B] text-white text-xs font-bold uppercase"
                >
                  SEND ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-black text-[#18181B] uppercase">Project Architecture Brief</h3>
                  <span className="text-[10px] font-mono font-bold text-[#E11D48]">DIRECT INGEST</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-[#71717A] uppercase block mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2] text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold text-[#71717A] uppercase block mb-1">WORK EMAIL</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2] text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-[#71717A] uppercase block mb-1">PRIMARY REQUIREMENT</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2] text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                    >
                      <option>AI & Automation Pipeline</option>
                      <option>Full-Stack Web & 3D WebGL</option>
                      <option>Brand Identity & Creative Systems</option>
                      <option>Growth Funnel Architecture</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold text-[#71717A] uppercase block mb-1">ESTIMATED BUDGET</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2] text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                    >
                      <option>$3k - $5k</option>
                      <option>$5k - $15k</option>
                      <option>$15k - $40k</option>
                      <option>$40k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-[#71717A] uppercase block mb-1">SYSTEM VISION / PAIN POINTS</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe the bottleneck or project you'd like to build..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2] text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-[#E11D48]/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} />
                  <span>TRANSMIT PROJECT SPECIFICATION</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onBackToOrigin}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#E11D48] transition-all shadow-sm cursor-pointer"
        >
          <span>RETURN TO WORLD 01 // ORIGIN</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#E11D48]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          THE 11 WORLDS OF IGRYBUILDS ARE FULLY EXPLORED
        </span>
      </div>
    </div>
  );
};
