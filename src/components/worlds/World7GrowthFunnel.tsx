import React, { useState } from 'react';
import { TrendingUp, ArrowRight, Zap, Calculator, CheckCircle2, ChevronDown } from 'lucide-react';
import { GROWTH_STAGES } from '../../data/portfolioWorlds';
import { sound } from '../../utils/audio';

interface World7GrowthFunnelProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
}

export const World7GrowthFunnel: React.FC<World7GrowthFunnelProps> = ({
  onStartProject,
  onNextWorld,
}) => {
  const [selectedStage, setSelectedStage] = useState(GROWTH_STAGES[4]); // Qualification by default
  const [monthlyVisitors, setMonthlyVisitors] = useState(10000);

  // Conversion model calculation
  const leads = Math.round(monthlyVisitors * 0.05); // 5% conversion to lead
  const qualified = Math.round(leads * 0.45); // 45% qualification
  const bookings = Math.round(qualified * 0.60); // 60% booking
  const sales = Math.round(bookings * 0.35); // 35% close rate
  const estRevenue = sales * 4500; // $4,500 average contract

  return (
    <div
      id="world-growth-funnel"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <TrendingUp size={14} className="text-[#E11D48]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 07 // GROWTH FUNNEL CITY • CONVERSION MACHINE
          </span>
        </div>

        <div className="text-xs font-mono text-[#71717A] tracking-wider uppercase hidden sm:block">
          9-STAGE FULL-FUNNEL MATHEMATICS
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left: 9-Stage Inverted Funnel Machine */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight uppercase leading-[1.0] mb-3">
              GIANT 3D<br />
              <span className="text-[#E11D48]">CONVERSION MACHINE.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] max-w-xl font-sans">
              From top-of-funnel traffic to high-ticket retention loops. Every stage is engineered with feedback loops to eliminate drop-off.
            </p>
          </div>

          {/* 9 Cascading Funnel Bars */}
          <div className="space-y-1.5 max-w-xl">
            {GROWTH_STAGES.map((st, idx) => {
              const isSelected = selectedStage.step === st.step;
              // Visual width decreases as funnel descends
              const widthPct = 100 - idx * 7.5;

              return (
                <button
                  key={st.step}
                  onClick={() => {
                    sound.playClick();
                    setSelectedStage(st);
                  }}
                  style={{ width: `${widthPct}%` }}
                  className={`mx-auto p-2.5 rounded-xl flex items-center justify-between transition-all border text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-md shadow-[#E11D48]/30 scale-102'
                      : 'bg-white/95 text-[#18181B] border-[#E2DCD2] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-black ${isSelected ? 'text-white/80' : 'text-[#E11D48]'}`}>
                      {st.step}
                    </span>
                    <span className="text-xs font-black uppercase truncate">
                      {st.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white/90' : 'text-[#71717A]'}`}>
                    {st.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Funnel Calculator & Stage Detail */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected Stage Detail Card */}
          <div className="p-5 rounded-3xl bg-white border border-[#E2DCD2] shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-[10px] font-mono font-black">
                STAGE {selectedStage.step} // {selectedStage.name}
              </span>
              <span className="text-xs font-mono font-bold text-[#71717A]">
                {selectedStage.type}
              </span>
            </div>

            <h3 className="text-xl font-black text-[#18181B] uppercase mb-1">
              {selectedStage.name}
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed mb-3">
              {selectedStage.desc}
            </p>
          </div>

          {/* Interactive Conversion Simulator */}
          <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E2DCD2] shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-black text-[#18181B] uppercase">
              <Calculator size={14} className="text-[#E11D48]" />
              <span>LIVE PIPELINE MATHEMATICS (SIMULATION)</span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#71717A]">MONTHLY TRAFFIC</span>
                  <span className="font-bold text-[#18181B]">{monthlyVisitors.toLocaleString()} Visitors</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  className="w-full accent-[#E11D48]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E2DCD2]">
                <div className="p-2 rounded-xl bg-white border border-[#E2DCD2] text-center">
                  <span className="text-[9px] font-mono text-[#71717A] uppercase block">Leads</span>
                  <span className="text-sm font-black text-[#18181B]">{leads}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E2DCD2] text-center">
                  <span className="text-[9px] font-mono text-[#71717A] uppercase block">Qualified</span>
                  <span className="text-sm font-black text-[#18181B]">{qualified}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E2DCD2] text-center">
                  <span className="text-[9px] font-mono text-[#71717A] uppercase block">Booked</span>
                  <span className="text-sm font-black text-[#18181B]">{bookings}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E2DCD2] text-center">
                  <span className="text-[9px] font-mono text-[#71717A] uppercase block">Closed</span>
                  <span className="text-sm font-black text-[#E11D48]">{sales}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#18181B] text-white flex items-center justify-between">
                <span className="text-xs font-mono">SIMULATED PIPELINE REVENUE:</span>
                <span className="text-base font-black text-[#E11D48]">${estRevenue.toLocaleString()}/mo</span>
              </div>
            </div>

            <button
              onClick={() => onStartProject('Full Funnel Optimization')}
              className="w-full py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-extrabold uppercase transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>BUILD THIS FUNNEL</span>
              <ArrowRight size={13} />
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
          <span>TRAVEL TO DATA & STRATEGY</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#E11D48]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 7 OF 11 • CONVERSION ARCHITECTURE
        </span>
      </div>
    </div>
  );
};
