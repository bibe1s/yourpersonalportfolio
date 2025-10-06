"use client";

import { useProfile } from '@/contexts/ProfileContext';
import { Check, AlertCircle, Save } from 'lucide-react';

export function SaveCancelBar() {
  const { hasUnsavedChanges, saveChanges, discardChanges } = useProfile();

  if (!hasUnsavedChanges) {
    return (
      <div className="fixed bottom-0 right-0 w-full md:w-1/2 bg-gray-50 border-t p-4">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Check className="w-4 h-4 mr-2 text-green-500" />
          All changes saved
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-1/2 bg-white border-t shadow-lg p-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center text-sm">
          <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
          <span className="text-gray-700 font-medium">
            You have unsaved changes
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={discardChanges}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={saveChanges}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}