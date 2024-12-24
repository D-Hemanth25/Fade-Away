import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isLast: boolean;
}

export function StepCard({ title, description, icon: Icon, isLast }: StepCardProps) {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-black/50 to-cyan-950/30 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-cyan-950 flex items-center justify-center group-hover:bg-cyan-900 transition-colors">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white text-center">
          {title}
        </h3>
        <p className="text-cyan-100/70 text-center text-sm">
          {description}
        </p>
      </div>
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
      )}
    </div>
  );
}