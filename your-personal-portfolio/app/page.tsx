"use client";

import { useProfile } from '@/contexts/ProfileContext';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { EditorPanel } from '@/components/editor/EditorPanel';

export default function EditorPage() {
  const { profile, currentMode } = useProfile();
  
  // Safety check - make sure profile structure exists
  if (!profile || !profile[currentMode] || !profile[currentMode].personal) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Get the personal info for current mode
  const currentPersonal = profile[currentMode].personal;

  return (
    <div className="flex h-screen">
      {/* Left Side - Live Profile Card Preview */}
      <div className="w-1/3 bg-black overflow-y-auto">
        <ProfileCard personal={currentPersonal} />
      </div>

      {/* Right Side - Editor Panel */}
      <div className="w-2/3 bg-white">
        <EditorPanel />
      </div>
    </div>
  );
}