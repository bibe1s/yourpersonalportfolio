// app/components/profile/ContentBlock.tsx

"use client";

import { ContentBlock as ContentBlockType } from '@/lib/types';

interface ContentBlockProps {
  block: ContentBlockType;
}

export function ContentBlock({ block }: ContentBlockProps) {
  if (block.type === 'title') {
    return (
      <h2 className="text-2xl font-bold text-white mb-2">
        {block.content}
        {block.duration && (
          <span className="text-lg text-gray-400 ml-2">
            ({block.duration})
          </span>
        )}
      </h2>
    );
  }

  // type === 'context'
  return (
    <div className="text-gray-300 mb-3">
      <p className="text-lg">
        {block.content}
        {block.duration && (
          <span className="text-sm text-gray-400 ml-2">
            • {block.duration}
          </span>
        )}
      </p>
    </div>
  );
}