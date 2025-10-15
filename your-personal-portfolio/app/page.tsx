"use client";

import { useProfile } from '@/contexts/ProfileContext';
import { HolographicProfileCard } from '@/components/profile/HolographicProfileCard';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { useState, useEffect } from 'react';

export default function EditorPage() {
  const { profile, currentMode } = useProfile();
  const [renderKey, setRenderKey] = useState(0);
  
  // Force re-render whenever profile changes
  useEffect(() => {
    setRenderKey(prev => prev + 1);
    console.log('🔄 Profile updated, re-rendering preview...');
  }, [profile, currentMode]);
  
  // Safety check
  if (!profile || !profile[currentMode] || !profile[currentMode].personal) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const currentPersonal = profile[currentMode].personal;

  // Debug log to see what's being passed
  console.log('🎨 Current Personal Data:', {
    enable3D: currentPersonal.enable3D,
    enableGradient: currentPersonal.enableGradient,
    borderStyle: currentPersonal.borderStyle,
  });

  return (
    <div className="flex h-screen">
      {/* Left Side - Live Profile Card Preview */}
      <div className="flex w-1/3 bg-black overflow-y-auto items-center justify-center">
        <HolographicProfileCard 
          key={`profile-card-${renderKey}`} // Force complete re-render
          personal={currentPersonal} 
        />
      </div>

      {/* Right Side - Editor Panel */}
      <div className="w-2/3 bg-white">
        <EditorPanel />
      </div>
    </div>
  );
}