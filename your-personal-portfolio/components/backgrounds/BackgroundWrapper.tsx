"use client";

import { BackgroundConfig } from '@/lib/types';
import { ParticlesBackground } from './ParticlesBackground';

interface BackgroundWrapperProps {
  config: BackgroundConfig;
  children: React.ReactNode;
}

export function BackgroundWrapper({ config, children }: BackgroundWrapperProps) {
  return (
    <div className="relative w-full h-full">
      {/* Background Layer */}
      {config.type !== 'none' && (
        <div className="absolute inset-0 overflow-hidden">
          {config.type === 'particles' && (
            <ParticlesBackground
              color={config.color}
              speed={config.speed}
              density={config.density}
              interactive={config.interactive}
            />
          )}
          {/* More backgrounds will go here later */}
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}