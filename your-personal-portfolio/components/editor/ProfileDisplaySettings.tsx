"use client";

import { useProfile } from '@/contexts/ProfileContext';

export function ProfileDisplaySettings() {
  const { profile, updateDisplaySettings } = useProfile();
  const { showWeb2, showWeb3, defaultView } = profile.displaySettings;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Profile Display Mode</h2>

      <div className="space-y-3">
        {/* Show Web2 */}
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={showWeb2}
            onChange={(e) => updateDisplaySettings({ showWeb2: e.target.checked })}
            className="w-4 h-4"
          />
          <div>
            <p className="font-medium">Show Web2 Profile</p>
            <p className="text-sm text-gray-500">Traditional tech stack and experience</p>
          </div>
        </label>

        {/* Show Web3 */}
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={showWeb3}
            onChange={(e) => updateDisplaySettings({ showWeb3: e.target.checked })}
            className="w-4 h-4"
          />
          <div>
            <p className="font-medium">Show Web3 Profile</p>
            <p className="text-sm text-gray-500">Communities and blockchain presence</p>
          </div>
        </label>
      </div>

      {/* Default View (only if both enabled) */}
      {showWeb2 && showWeb3 && (
        <div className="pt-4 border-t">
          <label className="block text-sm font-medium mb-3">
            Default View (when visitor opens your profile):
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="defaultView"
                checked={defaultView === 'web2'}
                onChange={() => updateDisplaySettings({ defaultView: 'web2' })}
                className="w-4 h-4"
              />
              <span>Web2</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="defaultView"
                checked={defaultView === 'web3'}
                onChange={() => updateDisplaySettings({ defaultView: 'web3' })}
                className="w-4 h-4"
              />
              <span>Web3</span>
            </label>
          </div>
        </div>
      )}

      {/* Warning if none selected */}
      {!showWeb2 && !showWeb3 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Please enable at least one profile type
          </p>
        </div>
      )}
    </div>
  );
}