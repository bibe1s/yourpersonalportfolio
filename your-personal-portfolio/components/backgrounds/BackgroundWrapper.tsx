"use client";

import { BackgroundConfig } from '@/lib/types';
import { ParticlesBackground } from './ParticlesBackground';

// Import all ReactBits backgrounds
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
import './BackgroundWrapper.css'; // Import new CSS file

interface BackgroundWrapperProps {
  config: BackgroundConfig;
  children: React.ReactNode;
}

// Map background types to components
const backgroundComponents: Record<string, React.ComponentType<any>> = {
  'liquid-ether': LiquidEther,
  'prism': Prism,
  'dark-veil': DarkVeil,
  'light-rays': LightRays,
  'aurora': Aurora,
  'plasma': Plasma,
  'particles': Particles,
  'gradient-blinds': GradientBlinds,
  'galaxy': Galaxy,
  'faulty-terminal': FaultyTerminal,
  'ripple-grid': RippleGrid,
  'threads': Threads,
  'irisdescence': Irisdescence,
  'prismatic-burst': PrismaticBurst,
  'orb': Orb,
  'letter-glitch': LetterGlitch,
  'liquid-chrome': LiquidChrome,
  'balatro': Balatro,
};

export function BackgroundWrapper({ config, children }: BackgroundWrapperProps) {
  // Get the background component based on type
  const BackgroundComponent = config.type ? backgroundComponents[config.type] : null;

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Layer - Fixed position */}
      {config.type !== 'none' && (
        <div className="fixed inset-0 z-0">
          {config.type === 'particles' && (
            <ParticlesBackground
              color={config.color || '#'}
              speed={config.speed || 50}
              density={config.density || 50}
              interactive={config.interactive || true}
            />
          )}
          
          {/* Render ReactBits background if selected */}
          {BackgroundComponent && config.type !== 'particles' && (
            <BackgroundComponent />
          )}
        </div>
      )}

      {/* Content Layer - Scrollable, with pointer-events disabled */}
      <div className="relative z-10 pointer-events-none">
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
}