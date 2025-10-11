"use client";

import { useProfile } from '@/contexts/ProfileContext';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { SocialLinkEditor } from '@/components/modals/SocialLinkEditor';
import { SocialPlatform } from '@/lib/types';

export function SocialLinksEditor() {
  const { profile, addSocialLink, deleteSocialLink } = useProfile();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddLink = (platform: SocialPlatform, url: string) => {
    addSocialLink({ platform, url });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Social Links</h2>

      {/* Current Links */}
      <div className="space-y-2">
        {profile.socialLinks.length === 0 ? (
          <p className="text-sm text-gray-500">No social links yet. Add one below!</p>
        ) : (
          profile.socialLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <p className="font-medium capitalize">{link.platform}</p>
                <p className="text-sm text-gray-500 truncate">{link.url}</p>
              </div>
              <button
                onClick={() => deleteSocialLink(link.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
                title="Delete"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
      >
        <Plus className="w-4 h-4" />
        Add Social Link
      </button>

      {/* Modal */}
      <SocialLinkEditor
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddLink}
      />
    </div>
  );
}