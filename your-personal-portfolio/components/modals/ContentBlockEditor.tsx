"use client";

import { useState } from 'react';
import { Modal } from './Modal';
import { ContentBlockType } from '@/lib/types';

interface ContentBlockEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: ContentBlockType, content: string, duration?: string) => void;
}

export function ContentBlockEditor({ isOpen, onClose, onSave }: ContentBlockEditorProps) {
  const [type, setType] = useState<ContentBlockType>('title');
  const [content, setContent] = useState('');
  const [hasDuration, setHasDuration] = useState(false);
  const [duration, setDuration] = useState('');

  const handleSave = () => {
    if (!content.trim()) return;

    onSave(
      type,
      content,
      hasDuration && duration.trim() ? duration : undefined
    );

    // Reset and close
    setType('title');
    setContent('');
    setHasDuration(false);
    setDuration('');
    onClose();
  };

  const handleClose = () => {
    // Reset on close
    setType('title');
    setContent('');
    setHasDuration(false);
    setDuration('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Content Block" maxWidth="md">
      <div className="p-6 space-y-6">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Choose what type:
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setType('title')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                type === 'title'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Title
              <p className="text-xs text-gray-500 mt-1">Large heading (H1)</p>
            </button>
            <button
              onClick={() => setType('context')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                type === 'context'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Context
              <p className="text-xs text-gray-500 mt-1">Description text (H3)</p>
            </button>
          </div>
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {type === 'title' ? 'Title Text *' : 'Description *'}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              type === 'title'
                ? 'e.g., Past Projects, Educational Attainment'
                : 'e.g., Brief description of your project or role'
            }
            rows={type === 'title' ? 2 : 4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-1">
            {type === 'title' 
              ? 'This will appear as a large heading'
              : 'This will appear as descriptive text below the title'
            }
          </p>
        </div>

        {/* Duration Toggle */}
        <div className="flex items-start gap-3 p-4 border rounded-lg">
          <input
            type="checkbox"
            id="hasDuration"
            checked={hasDuration}
            onChange={(e) => setHasDuration(e.target.checked)}
            className="w-4 h-4 mt-1"
          />
          <div className="flex-1">
            <label htmlFor="hasDuration" className="font-medium cursor-pointer">
              Add Duration
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Add a date or time period (e.g., "2023 - 2024", "Jan 2024")
            </p>
          </div>
        </div>

        {/* Duration Input (conditional) */}
        {hasDuration && (
          <div className="ml-7">
            <label className="block text-sm font-medium mb-2">
              Duration / Date
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 2023 - 2024, Jan 2024, Present"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Preview */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-xs text-gray-500 mb-2">Preview:</p>
          {type === 'title' ? (
            <h2 className="text-2xl font-bold">
              {content || 'Your title here'}
              {hasDuration && duration && (
                <span className="text-lg text-gray-500 ml-2">
                  ({duration})
                </span>
              )}
            </h2>
          ) : (
            <p className="text-gray-700">
              {content || 'Your description here'}
              {hasDuration && duration && (
                <span className="text-sm text-gray-500 ml-2">
                  • {duration}
                </span>
              )}
            </p>
          )}
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
            disabled={!content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Block
          </button>
        </div>
      </div>
    </Modal>
  );
}