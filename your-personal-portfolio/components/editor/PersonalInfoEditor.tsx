"use client";

import { useProfile } from '@/contexts/ProfileContext';
import { Upload } from 'lucide-react';

export function PersonalInfoEditor() {
  const { profile, currentMode, updatePersonalInfo } = useProfile();
  
  // Get personal info for current mode
  const personal = profile[currentMode].personal;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
          {currentMode === 'web2' ? '👔 Web2 (Real You)' : '🎭 Web3 (Persona)'}
        </span>
      </div>

      {/* Profile Image */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          {personal.image ? (
            <img
              src={personal.image}
              alt="Profile"
              className="w-20 h-20 rounded-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <input
              type="text"
              value={personal.image}
              onChange={(e) => updatePersonalInfo(currentMode, { image: e.target.value })}
              placeholder="Paste image URL"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {currentMode === 'web2' 
                ? 'Your real photo (for professional profile)'
                : 'Your avatar/PFP (anime, NFT, character art)'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {currentMode === 'web2' ? 'Full Name *' : 'Display Name / Pseudonym *'}
        </label>
        <input
          type="text"
          value={personal.name}
          onChange={(e) => updatePersonalInfo(currentMode, { name: e.target.value })}
          placeholder={currentMode === 'web2' ? 'John Doe' : 'CryptoNinja.eth'}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Title / Role *
        </label>
        <input
          type="text"
          value={personal.title}
          onChange={(e) => updatePersonalInfo(currentMode, { title: e.target.value })}
          placeholder={currentMode === 'web2' ? 'Frontend Developer' : 'Community Ambassador'}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={personal.email}
          onChange={(e) => updatePersonalInfo(currentMode, { email: e.target.value })}
          placeholder="your@example.com"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Contact Number {currentMode === 'web3' && '(Optional)'}
        </label>
        <input
          type="tel"
          value={personal.phone}
          onChange={(e) => updatePersonalInfo(currentMode, { phone: e.target.value })}
          placeholder="+63 XXX-XXX-XXXX"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 3D Effect Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="image3D"
          checked={personal.imageIs3D}
          onChange={(e) => updatePersonalInfo(currentMode, { imageIs3D: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="image3D" className="text-sm">
          Enable 3D image effect (hover animation)
        </label>
      </div>
    </div>
  );
}