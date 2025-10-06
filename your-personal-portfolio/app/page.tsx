"use client";

import { EditorPanel } from '@/components/editor/EditorPanel';

export default function EditorPage() {
  return (
    <div className="flex h-screen">
      {/* Left Side - Preview Button */}

      {/* Right Side - Editor Panel */}
      <div className="w-full bg-white">
        <EditorPanel />
                <button
          onClick={() => window.open('/preview', '_blank')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
        >
          Open Preview in New Tab →
        </button>
      </div>
    </div>
  );
}