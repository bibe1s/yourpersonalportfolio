"use client";

import { useProfile } from '@/contexts/ProfileContext';
import { Upload } from 'lucide-react';

export function PersonalInfoEditor() {
  const { profile, updatePersonalInfo } = useProfile();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Personal Information</h2>

      {/* Profile Image */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          {profile.personal.image ? (
            <img
              src={profile.personal.image}
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
              value={profile.personal.image}
              onChange={(e) => updatePersonalInfo({ image: e.target.value })}
              placeholder="Paste image URL"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste a direct image URL (e.g., from Imgur, your website)
            </p>
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={profile.personal.name}
          onChange={(e) => updatePersonalInfo({ name: e.target.value })}
          placeholder="John Doe"
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
          value={profile.personal.title}
          onChange={(e) => updatePersonalInfo({ title: e.target.value })}
          placeholder="Frontend Developer"
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
          value={profile.personal.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          placeholder="john@example.com"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Contact Number *
        </label>
        <input
          type="tel"
          value={profile.personal.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          placeholder="+63 XXX-XXX-XXXX"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 3D Effect Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="image3D"
          checked={profile.personal.imageIs3D}
          onChange={(e) => updatePersonalInfo({ imageIs3D: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="image3D" className="text-sm">
          Enable 3D image effect (hover animation)
        </label>
      </div>
    </div>
  );
}