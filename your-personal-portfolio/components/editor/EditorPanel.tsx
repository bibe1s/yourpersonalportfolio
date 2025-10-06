"use client";

import { ModeToggle } from './ModeToggle';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { SocialLinksEditor } from './SocialLinksEditor';
import { ProfileDisplaySettings } from './ProfileDisplaySettings';
import { SaveCancelBar } from './SaveCancelBar';
import { Palette } from 'lucide-react';

export function EditorPanel() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b bg-white">
        <ModeToggle />
        
        <button
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Change Background"
        >
          <Palette className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
        <PersonalInfoEditor />
        
        <div className="border-t pt-8">
          <SocialLinksEditor />
        </div>
        
        <div className="border-t pt-8">
          <ProfileDisplaySettings />
        </div>

        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">Content Sections</h2>
          <p className="text-gray-600">
            Section editor coming in next steps! 🚀
          </p>
        </div>
      </div>

      {/* Fixed Save/Cancel Bar */}
      <SaveCancelBar />
    </div>
  );
}