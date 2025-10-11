"use client";

import { ModeToggle } from './ModeToggle';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { SocialLinksEditor } from './SocialLinksEditor';
import { ProfileDisplaySettings } from './ProfileDisplaySettings';
import { DraggableSectionsList } from './DraggableSectionsList';
import { SaveCancelBar } from './SaveCancelBar';
import { Palette, ExternalLink } from 'lucide-react';

export function EditorPanel() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b bg-white">
        <ModeToggle />
        
        <div className="flex gap-2">
          <button
            onClick={() => window.open('/preview', '_blank')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Preview
          </button>
          
          <button
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Change Background"
          >
            <Palette className="w-5 h-5 text-gray-600" />
          </button>
        </div>
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
          <DraggableSectionsList />
        </div>
      </div>

      {/* Fixed Save/Cancel Bar */}
      <SaveCancelBar />
    </div>
  );
}