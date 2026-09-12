import React, { useEffect } from 'react';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onClose,
}) => {
  useEffect(() => {
    if (achievement) {
      sound.playAchievement();
      const timer = setTimeout(() => {
        onClose();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div
      id="minecraft-advancement-toast"
      className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-6 duration-300 pointer-events-auto"
    >
      <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-[#18181B]/95 text-white border-2 border-[#E11D48] shadow-2xl shadow-black/40 backdrop-blur-md max-w-sm">
        {/* Pixel Icon Frame */}
        <div className="w-11 h-11 rounded-lg bg-[#27272A] border border-[#3F3F46] flex items-center justify-center shrink-0 shadow-inner">
          <Sparkles size={22} className="text-[#E11D48] animate-bounce" />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase flex items-center gap-1">
            <span>ADVANCEMENT MADE!</span>
          </span>
          <span className="text-sm font-black text-white uppercase tracking-tight">
            {achievement.title}
          </span>
          <span className="text-xs text-[#A1A1AA] leading-tight mt-0.5">
            {achievement.description}
          </span>
        </div>
      </div>
    </div>
  );
};
