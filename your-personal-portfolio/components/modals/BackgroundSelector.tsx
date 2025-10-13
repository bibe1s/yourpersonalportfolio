import { useState } from 'react';
import { X } from 'lucide-react';

// Import all your backgrounds
import LiquidEther from '@/components/backgrounds/LiquidEther';
import Prism from '@/components/backgrounds/Prism';
import DarkVeil from '@/components/backgrounds/DarkVeil';
import LightRays from '@/components/backgrounds/LightRays';
import Aurora from '@/components/backgrounds/Aurora';
import Plasma from '@/components/backgrounds/Plasma';
import Particles from '@/components/backgrounds/Particles';
import GradientBlinds from '@/components/backgrounds/GradientBlinds';
import Galaxy from '@/components/backgrounds/Galaxy';
import FaultyTerminal from '@/components/backgrounds/FaultyTerminal';
import RippleGrid from '@/components/backgrounds/RippleGrid';
import Threads from '@/components/backgrounds/Threads';
import Irisdescence from '@/components/backgrounds/Irisdescence';
import PrismaticBurst from '@/components/backgrounds/PrismaticBurst';
import Orb from '@/components/backgrounds/Orb';
import LetterGlitch from '@/components/backgrounds/LetterGlitch';
import LiquidChrome from '@/components/backgrounds/LiquidChrome';
import Balatro from '@/components/backgrounds/Balatro';

interface BackgroundOption {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  category: 'OGL' | 'THREE' | 'OTHER';
}

const backgrounds: BackgroundOption[] = [
  { id: 'prism', name: 'Prism', component: Prism, category: 'OGL' },
  { id: 'dark-veil', name: 'Dark Veil', component: DarkVeil, category: 'OGL' },
  { id: 'light-rays', name: 'Light Rays', component: LightRays, category: 'OGL' },
  { id: 'aurora', name: 'Aurora', component: Aurora, category: 'OGL' },
  { id: 'plasma', name: 'Plasma', component: Plasma, category: 'OGL' },
  { id: 'particles', name: 'Particles', component: Particles, category: 'OGL' },
  { id: 'gradient-blinds', name: 'Gradient Blinds', component: GradientBlinds, category: 'OGL' },
  { id: 'galaxy', name: 'Galaxy', component: Galaxy, category: 'OGL' },
  { id: 'faulty-terminal', name: 'Faulty Terminal', component: FaultyTerminal, category: 'OGL' },
  { id: 'ripple-grid', name: 'Ripple Grid', component: RippleGrid, category: 'OGL' },
  { id: 'threads', name: 'Threads', component: Threads, category: 'OGL' },
  { id: 'irisdescence', name: 'Irisdescence', component: Irisdescence, category: 'OGL' },
  { id: 'prismatic-burst', name: 'Prismatic Burst', component: PrismaticBurst, category: 'OGL' },
  { id: 'orb', name: 'Orb', component: Orb, category: 'OGL' },
  { id: 'liquid-chrome', name: 'Liquid Chrome', component: LiquidChrome, category: 'OGL' },
  { id: 'balatro', name: 'Balatro', component: Balatro, category: 'OGL' },
  { id: 'liquid-ether', name: 'Liquid Ether', component: LiquidEther, category: 'THREE' },
  { id: 'letter-glitch', name: 'Letter Glitch', component: LetterGlitch, category: 'OTHER' },
];

interface BackgroundSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: string, color: string, speed: number, density: number, interactive: boolean) => void;
  currentConfig: any;
}

export function BackgroundSelector({ isOpen, onClose, onSave, currentConfig }: BackgroundSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(currentConfig?.type || 'aurora');

  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // Save with default settings - you can customize these
    onSave(id, '#3b82f6', 50, 50, true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Background</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Select an animated background for your portfolio ({backgrounds.length} available)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {backgrounds.map((bg) => {
              const BackgroundComponent = bg.component;
              const isSelected = selectedId === bg.id;
              const isHovered = hoveredId === bg.id;

              return (
                <button
                  key={bg.id}
                  onClick={() => handleSelect(bg.id)}
                  onMouseEnter={() => setHoveredId(bg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative group rounded-xl overflow-hidden aspect-video transition-all duration-300 ${
                    isSelected
                      ? 'ring-4 ring-blue-500 scale-105'
                      : 'ring-2 ring-gray-300 dark:ring-gray-700 hover:ring-gray-400 dark:hover:ring-gray-600 hover:scale-105'
                  }`}
                >
                  {/* Preview */}
                  <div className="absolute inset-0 w-full h-full bg-black">
                    <div className="w-full h-full scale-150 origin-center">
                      <BackgroundComponent />
                    </div>
                  </div>

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                      isHovered || isSelected ? 'opacity-100' : 'opacity-70'
                    }`}
                  />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold text-sm truncate">
                      {bg.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                        {bg.category}
                      </span>
                      {isSelected && (
                        <span className="text-blue-400 text-xs">Active</span>
                      )}
                    </div>
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}