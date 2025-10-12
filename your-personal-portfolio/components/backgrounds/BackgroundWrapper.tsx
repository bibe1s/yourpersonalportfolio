"use client";

import { BackgroundConfig } from '@/lib/types';
import { ParticlesBackground } from './ParticlesBackground';

interface BackgroundWrapperProps {
  config: BackgroundConfig;
  children: React.ReactNode;
}

export function BackgroundWrapper({ config, children }: BackgroundWrapperProps) {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Layer - Fixed position */}
      {config.type !== 'none' && (
        <div className="fixed inset-0 z-0">
          {config.type === 'particles' && (
            <ParticlesBackground
                color={config.color || '#3b82f6'}
                speed={config.speed || 50}
                density={config.density || 50}
                interactive={config.interactive || true}
            />
            )}
          {/* More backgrounds will go here later */}
        </div>
      )}

      {/* Content Layer - Scrollable */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}