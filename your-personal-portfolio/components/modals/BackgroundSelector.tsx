"use client";

import { useState } from 'react';
import { Modal } from './Modal';
import { BackgroundType } from '@/lib/types';

interface BackgroundSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: BackgroundType, color: string, speed: number, density: number, interactive: boolean) => void;
  currentConfig: {
    type: BackgroundType;
    color: string;
    speed: number;
    density: number;
    interactive: boolean;
  };
}

const BACKGROUND_OPTIONS = [
  { type: 'none' as BackgroundType, name: 'None', icon: '⬜', description: 'Solid color' },
  { type: 'particles' as BackgroundType, name: 'Particles', icon: '✨', description: 'Floating connected dots' },
  { type: 'grid' as BackgroundType, name: 'Grid', icon: '📐', description: 'Animated grid lines (Coming soon)' },
  { type: 'gradient' as BackgroundType, name: 'Gradient', icon: '🌈', description: 'Moving gradient mesh (Coming soon)' },
  { type: 'meteors' as BackgroundType, name: 'Meteors', icon: '☄️', description: 'Shooting stars (Coming soon)' },
  { type: 'dots' as BackgroundType, name: 'Dots', icon: '⚫', description: 'Dot pattern (Coming soon)' },
  { type: 'ripple' as BackgroundType, name: 'Ripple', icon: '💧', description: 'Water ripple effect (Coming soon)' },
];

export function BackgroundSelector({ 
  isOpen, 
  onClose, 
  onSave,
  currentConfig 
}: BackgroundSelectorProps) {
  const [selectedType, setSelectedType] = useState<BackgroundType>(currentConfig.type);
  const [color, setColor] = useState(currentConfig.color);
  const [speed, setSpeed] = useState(currentConfig.speed);
  const [density, setDensity] = useState(currentConfig.density);
  const [interactive, setInteractive] = useState(currentConfig.interactive);

  const handleSave = () => {
    onSave(selectedType, color, speed, density, interactive);
    onClose();
  };

  const isComingSoon = (type: BackgroundType) => {
    return !['none', 'particles'].includes(type);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Background Settings" maxWidth="lg">
      <div className="p-6 space-y-6">
        {/* Background Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Choose Background Type:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {BACKGROUND_OPTIONS.map((option) => (
              <button
                key={option.type}
                onClick={() => !isComingSoon(option.type) && setSelectedType(option.type)}
                disabled={isComingSoon(option.type)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedType === option.type
                    ? 'border-blue-500 bg-blue-50'
                    : isComingSoon(option.type)
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-semibold">{option.name}</div>
                <div className="text-xs text-gray-500 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings (only show if not 'none') */}
        {selectedType !== 'none' && (
          <>
            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Color
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Speed: {speed}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>

            {/* Density Slider */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Density: {density}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Interactive Toggle */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <input
                type="checkbox"
                id="interactive"
                checked={interactive}
                onChange={(e) => setInteractive(e.target.checked)}
                className="w-4 h-4"
              />
              <div className="flex-1">
                <p className="font-medium">
                  Interactive
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Particles react to mouse movement
                </p>
              </div>
            </div>
          </>
        )}

        {/* Preview Note */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            💡 <strong>Tip:</strong> Changes will apply immediately. Open the preview page in another tab to see the effect!
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Background
          </button>
        </div>
      </div>
    </Modal>
  );
}