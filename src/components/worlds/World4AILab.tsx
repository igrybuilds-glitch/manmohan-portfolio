import React, { useState } from 'react';
import { Bot, MessageSquare, PhoneCall, Terminal, Send, ArrowRight, Play, CheckCircle2, Mic, Volume2 } from 'lucide-react';
import { JARVIS_COMMANDS } from '../../data/portfolioWorlds';
import { sound } from '../../utils/audio';

interface World4AILabProps {
  onStartProject: (service: string) => void;
  onNextWorld: () => void;
}

type AILabTab = 'jarvis' | 'chatbot' | 'whatsapp' | 'voice';

export const World4AILab: React.FC<World4AILabProps> = ({
  onStartProject,
  onNextWorld,
}) => {
  const [activeTab, setActiveTab] = useState<AILabTab>('jarvis');

  // JARVIS OS state
  const [selectedJarvisCommand, setSelectedJarvisCommand] = useState(JARVIS_COMMANDS[0]);
  const [customJarvisInput, setCustomJarvisInput] = useState('');
  const [jarvisLog, setJarvisLog] = useState<{ prompt: string; response: string; time: string }[]>([
    {
      prompt: 'System initialization check',
      response: 'JARVIS Business OS online. Connected to 12 operational pipelines. Ready for instructions.',
      time: 'ONLINE',
    },
  ]);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string; time: string }[]>([
    { sender: 'bot', text: 'Hello! I am the IGRYbuilds autonomous assistant. What system are you looking to architect?', time: 'Just now' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Voice Agent State
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleSendChatMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    sound.playClick();
    const newMsgs = [...chatMessages, { sender: 'user' as const, text, time: 'Just now' }];
    setChatMessages(newMsgs);
    setChatInput('');

    // AI automated response
    setTimeout(() => {
      sound.playBlockPlace();
      let botReply = "Understood. I have evaluated your requirements. Our systems can integrate this via customized webhooks and AI qualification. Would you like to reserve a 20-minute discovery session with Manmohan?";
      if (text.toLowerCase().includes('timings') || text.toLowerCase().includes('time')) {
        botReply = "Our automated systems operate 24 hours a day, 7 days a week. For meetings with Manmohan, we offer morning and afternoon slots across all timezones.";
      } else if (text.toLowerCase().includes('book') || text.toLowerCase().includes('tomorrow')) {
        botReply = "Tomorrow has open slots at 2:00 PM and 4:30 PM BST. I have pre-reserved 4:30 PM for you. Would you like me to send the Google Meet calendar invite?";
      }
      setChatMessages([...newMsgs, { sender: 'bot' as const, text: botReply, time: 'Just now' }]);
    }, 600);
  };

  const handleExecuteJarvis = (cmd: typeof JARVIS_COMMANDS[0]) => {
    sound.playSystemActivate('ai');
    setSelectedJarvisCommand(cmd);
    setJarvisLog((prev) => [
      ...prev,
      {
        prompt: cmd.prompt,
        response: cmd.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div
      id="world-ai-lab"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      {/* Top Tagline Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <Bot size={14} className="text-[#E11D48]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase">
            WORLD 04 // AI INTELLIGENCE LAB • NEURAL INTERFACES
          </span>
        </div>

        {/* 4 Tool Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E2DCD2] shadow-sm">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('jarvis');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'jarvis' ? 'bg-[#18181B] text-white' : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            <Terminal size={12} />
            <span>JARVIS OS</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('chatbot');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'chatbot' ? 'bg-[#18181B] text-white' : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            <Bot size={12} />
            <span>AI CHATBOT</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('whatsapp');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'whatsapp' ? 'bg-[#18181B] text-white' : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            <MessageSquare size={12} />
            <span>WHATSAPP AI</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('voice');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'voice' ? 'bg-[#18181B] text-white' : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            <PhoneCall size={12} />
            <span>VOICE AGENT</span>
          </button>
        </div>
      </div>

      {/* Center Dynamic AI Playground */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 pointer-events-auto">
        {/* VIEW 1: JARVIS BUSINESS OS */}
        {activeTab === 'jarvis' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="mb-4">
                <span className="text-[10px] font-mono font-black text-[#E11D48] tracking-widest uppercase block mb-1">
                  EXECUTIVE NEURAL CONSOLE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#18181B] tracking-tight uppercase leading-tight mb-2">
                  JARVIS AI BUSINESS OS
                </h2>
                <p className="text-sm text-[#52525B]">
                  Autonomous operations control unit. Ask complex cross-system questions; receive verified business telemetry and trigger autonomous workflows.
                </p>
              </div>

              {/* Preset Prompts */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-mono font-bold text-[#71717A] uppercase tracking-wider block">
                  EXECUTE PRESET EXECUTIVE PROMPTS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {JARVIS_COMMANDS.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => handleExecuteJarvis(cmd)}
                      className={`p-3 rounded-2xl text-left transition-all border text-xs font-bold cursor-pointer ${
                        selectedJarvisCommand.id === cmd.id
                          ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-md shadow-[#E11D48]/30'
                          : 'bg-[#FAF7F2] text-[#18181B] border-[#E2DCD2] hover:bg-white hover:border-[#E11D48]/40'
                      }`}
                    >
                      "{cmd.prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Output Window */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-[#18181B] text-white p-6 border border-black shadow-2xl relative overflow-hidden font-mono">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E11D48]" />
                    <span className="text-xs font-bold tracking-wider text-white/90">JARVIS CORE // v4.2</span>
                  </div>
                  <span className="text-[10px] text-white/50">{selectedJarvisCommand.actionTriggered}</span>
                </div>

                {/* Telemetry Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {selectedJarvisCommand.telemetry.map((t) => (
                    <div key={t.label} className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[9px] text-white/50 uppercase block">{t.label}</span>
                      <span className="text-sm font-extrabold text-[#E11D48]">{t.val}</span>
                    </div>
                  ))}
                </div>

                {/* Response Display */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 text-xs leading-relaxed text-white/90">
                  <span className="text-[#E11D48] font-bold block mb-1">&gt; EXECUTIVE SYNTHESIS:</span>
                  {selectedJarvisCommand.response}
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/40">
                  <span>TELEMETRY: VERIFIED</span>
                  <span>AUTONOMOUS EXECUTION: ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: AI CHATBOT SIMULATOR */}
        {activeTab === 'chatbot' && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl bg-white border border-[#E2DCD2] shadow-xl p-6">
              <div className="flex items-center justify-between border-b border-[#E2DCD2] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#E11D48] text-white flex items-center justify-center font-black text-xs">
                    AI
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#18181B]">IGRYbuilds Conversational Agent</h4>
                    <span className="text-[10px] font-mono text-[#E11D48] font-bold">● Active 24/7 // Latency 1.2s</span>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  {['Timings?', 'Book tomorrow at 4 PM', 'Pricing structure?'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleSendChatMessage(preset)}
                      className="px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#E11D48] hover:text-white text-[#71717A] text-[10px] font-bold border border-[#E2DCD2] transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Body */}
              <div className="h-64 overflow-y-auto space-y-3 mb-4 pr-1">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-sm p-3.5 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#18181B] text-white rounded-br-none'
                          : 'bg-[#FAF7F2] text-[#18181B] border border-[#E2DCD2] rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input row */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  placeholder="Ask any question or schedule a meeting..."
                  className="flex-1 px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E2DCD2] text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
                />
                <button
                  onClick={() => handleSendChatMessage()}
                  className="px-5 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send size={13} />
                  <span>SEND</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: WHATSAPP AI SIMULATOR */}
        {activeTab === 'whatsapp' && (
          <div className="max-w-md mx-auto">
            <div className="rounded-3xl bg-[#075E54] p-3 shadow-2xl border-4 border-[#18181B]">
              <div className="bg-[#128C7E] px-4 py-2.5 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-[11px]">
                    IG
                  </div>
                  <div>
                    <h4 className="text-xs font-black">IGRYbuilds Official Bot</h4>
                    <span className="text-[9px] text-white/80 block">Verified Business Account</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full">ONLINE</span>
              </div>

              <div className="bg-[#ECE5DD] p-4 h-72 rounded-b-2xl space-y-3 overflow-y-auto">
                <div className="p-3 rounded-xl bg-white text-xs shadow-sm max-w-[85%] text-[#18181B] rounded-tl-none">
                  <p className="font-bold text-[#075E54] text-[10px] mb-0.5">IGRYbuilds AI</p>
                  <p>Welcome! We received your request regarding custom logistics automation. Let's get your setup ready.</p>
                  <span className="text-[9px] text-gray-400 block text-right mt-1">11:15 PM ✓✓</span>
                </div>

                <div className="p-3 rounded-xl bg-[#DCF8C6] text-xs shadow-sm max-w-[85%] ml-auto text-[#18181B] rounded-tr-none">
                  <p>We process ~14,000 orders/month. Can this integrate with our legacy ERP?</p>
                  <span className="text-[9px] text-gray-400 block text-right mt-1">11:16 PM ✓✓</span>
                </div>

                <div className="p-3 rounded-xl bg-white text-xs shadow-sm max-w-[85%] text-[#18181B] rounded-tl-none">
                  <p className="font-bold text-[#075E54] text-[10px] mb-0.5">IGRYbuilds AI</p>
                  <p>Yes! We establish encrypted REST webhooks directly to your database with automated retry buffers. Shall I reserve a slot for tomorrow?</p>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1">
                    <button className="w-full py-1.5 rounded bg-[#25D366] text-white font-bold text-[10px] text-center">
                      Confirm Meeting (3:30 PM)
                    </button>
                  </div>
                  <span className="text-[9px] text-gray-400 block text-right mt-1">11:17 PM ✓✓</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: AI VOICE AGENT SIMULATOR */}
        {activeTab === 'voice' && (
          <div className="max-w-xl mx-auto">
            <div className="rounded-3xl bg-white border border-[#E2DCD2] shadow-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E11D48]/10 text-[#E11D48] flex items-center justify-center mx-auto mb-4">
                <PhoneCall size={28} className={isVoiceActive ? 'animate-bounce' : ''} />
              </div>

              <span className="text-xs font-mono font-bold text-[#E11D48] tracking-widest uppercase block mb-1">
                11:47 PM AUTONOMOUS INCOMING CALL
              </span>
              <h3 className="text-2xl font-black text-[#18181B] uppercase mb-2">
                AI Voice Receptionist
              </h3>
              <p className="text-xs text-[#52525B] max-w-sm mx-auto mb-6">
                Sub-400ms conversational voice synthesis answering technical inquiries and locking discovery calls.
              </p>

              {/* Animated Waveform Bars */}
              <div className="flex items-center justify-center gap-1.5 h-12 mb-6">
                {[12, 28, 44, 20, 36, 48, 24, 40, 16, 32].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-[#E11D48] rounded-full transition-all duration-150"
                    style={{
                      height: isVoiceActive ? `${Math.min(48, Math.max(8, h * (0.6 + Math.random())))}px` : '8px',
                      opacity: isVoiceActive ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsVoiceActive(!isVoiceActive);
                }}
                className={`px-7 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer ${
                  isVoiceActive
                    ? 'bg-[#18181B] text-white'
                    : 'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-[#E11D48]/30'
                }`}
              >
                {isVoiceActive ? 'DISCONNECT SIMULATED CALL' : 'TEST CALL RECEPTION (DEMO)'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <button
          onClick={onNextWorld}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md border border-[#E2DCD2] text-xs font-bold text-[#18181B] hover:text-[#E11D48] transition-all shadow-sm cursor-pointer"
        >
          <span>TRAVEL TO CREATIVE STUDIO</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#E11D48]" />
        </button>

        <span className="text-xs font-mono text-[#71717A] tracking-wider hidden sm:inline-block">
          STEP 4 OF 11 • AUTONOMOUS INTELLIGENCE
        </span>
      </div>
    </div>
  );
};
