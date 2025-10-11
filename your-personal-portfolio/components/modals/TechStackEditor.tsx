"use client";

import { useState } from 'react';
import { Modal } from './Modal';
import { Upload, Link as LinkIcon } from 'lucide-react';

interface TechStackEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, iconUrl: string) => void;
}

export function TechStackEditor({ isOpen, onClose, onSave }: TechStackEditorProps) {
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const handleSave = () => {
    if (!name.trim() || !iconUrl.trim()) return;

    onSave(name, iconUrl);

    // Reset and close
    setName('');
    setIconUrl('');
    onClose();
  };

  const handleClose = () => {
    // Reset on close
    setName('');
    setIconUrl('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Tech/Community" maxWidth="md">
      <div className="p-6 space-y-6">
        {/* Icon Preview */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {iconUrl ? (
              <img
                src={iconUrl}
                alt="Preview"
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Upload className="w-12 h-12 text-gray-400" />
            )}
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., React, TypeScript, Discord"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-1">
            The name of the technology or community
          </p>
        </div>

        {/* Icon URL Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Icon URL *
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="https://example.com/icon.png"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => {
                const url = prompt('Paste icon URL:');
                if (url) setIconUrl(url);
              }}
              className="px-3 py-2 border rounded-lg hover:bg-gray-50"
              title="Paste URL"
            >
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Direct link to the icon image (PNG, SVG, or JPG)
          </p>
        </div>

        {/* Tips */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900 mb-2">💡 Where to find icons:</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• <strong>Tech logos:</strong> simpleicons.org (copy CDN link)</li>
            <li>• <strong>Upload to Imgur:</strong> imgur.com (get direct link)</li>
            <li>• <strong>Community logos:</strong> From official websites</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !iconUrl.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>
      </div>
    </Modal>
  );
}