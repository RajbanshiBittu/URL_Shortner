'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
  });

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">General</h2>

        <div className="space-y-6">
          {/* Language */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Language</p>
              <p className="text-sm text-gray-600">Choose your preferred language</p>
            </div>
            <select className="px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Theme</p>
              <p className="text-sm text-gray-600">Choose your preferred appearance</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-gray-100 border border-gray-300">
                <Sun size={18} />
              </button>
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <Moon size={18} />
              </button>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Timezone</p>
              <p className="text-sm text-gray-600">Set your timezone for accurate timestamps</p>
            </div>
            <select className="px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none">
              <option>UTC</option>
              <option>GMT+1</option>
              <option>GMT+2</option>
              <option>EST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Notifications</h2>

        <div className="space-y-4">
          {/* Email Notifications */}
          <label className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  emailNotifications: e.target.checked,
                }))
              }
              className="w-5 h-5 rounded border-gray-300 text-indigo-600"
            />
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email updates about your links</p>
            </div>
          </label>

          {/* Two-Factor Authentication */}
          <label className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  twoFactorAuth: e.target.checked,
                }))
              }
              className="w-5 h-5 rounded border-gray-300 text-indigo-600"
            />
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
          </label>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button>Save Settings</Button>
        </div>
      </div>

      {/* API & Integrations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">API & Integrations</h2>
        <p className="text-sm text-gray-600 mb-4">
          API access coming soon. You'll be able to programmatically create and manage short links.
        </p>
        <Button variant="outline" disabled>
          Generate API Key
        </Button>
      </div>
    </div>
  );
}
