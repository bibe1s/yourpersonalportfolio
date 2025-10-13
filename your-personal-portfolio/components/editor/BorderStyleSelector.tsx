import React from 'react';
import { Sparkles, Zap, Grid3x3, Waves, Palette } from 'lucide-react';

export type BorderStyle = 'none' | 'gradient' | 'star' | 'electric' | 'pixel' | 'blur';

interface BorderStyleOption {
  value: BorderStyle;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const borderOptions: BorderStyleOption[] = [
  {
    value: 'gradient',
    label: 'Gradient Chase',
    description: 'Rainbow light racing around',
    icon: <Palette className="w-4 h-4" />,
  },
  {
    value: 'star',
    label: 'Star Border',
    description: 'Light particles racing',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    value: 'electric',
    label: 'Electric',
    description: 'Pulsing electric glow',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    value: 'pixel',
    label: 'Pixel Glitch',
    description: 'Glitchy pixel shift',
    icon: <Grid3x3 className="w-4 h-4" />,
  },
  {
    value: 'blur',
    label: 'Soft Blur',
    description: 'Gentle pulsing blur',
    icon: <Waves className="w-4 h-4" />,
  },
  {
    value: 'none',
    label: 'Static Glow',
    description: 'Subtle static effect',
    icon: <div className="w-4 h-4 rounded-full bg-purple-500/30" />,
  },
];

interface BorderStyleSelectorProps {
  value: BorderStyle;
  onChange: (style: BorderStyle) => void;
}

export const BorderStyleSelector: React.FC<BorderStyleSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Border Animation Style
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as BorderStyle)}
        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
      >
        {borderOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} - {option.description}
          </option>
        ))}
      </select>
      
      {/* Visual Preview Grid */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {borderOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              relative p-3 rounded-lg border-2 transition-all
              ${
                value === option.value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
              }
            `}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="text-purple-500">{option.icon}</div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};