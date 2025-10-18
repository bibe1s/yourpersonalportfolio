// app/components/profile/TechStackSection.tsx

"use client";

import { TechStackItem } from '@/lib/types';

interface TechStackSectionProps {
  items: TechStackItem[];
  title: string;
}

export function TechStackSection({ items, title }: TechStackSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative"
            title={item.name}
          >
            {/* Circle icon */}
            <div className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 overflow-hidden flex items-center justify-center group-hover:scale-110">
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-600">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Tooltip on hover */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}