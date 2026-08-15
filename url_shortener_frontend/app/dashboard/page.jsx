'use client';

import { useEffect } from 'react';
import { useUrls } from '@/hooks/useUrls';
import { useAuth } from '@/hooks/useAuth';
import { StatCard } from '@/components/dashboard/StatCard';
import { CreateUrlForm } from '@/components/dashboard/CreateUrlForm';
import { Link, BarChart3, Zap } from 'lucide-react';
import Link as NextLink from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { urls, fetchUrls } = useUrls();
  const { user } = useAuth();

  useEffect(() => {
    fetchUrls();
  }, []);

  // Calculate stats
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  const activeUrls = urls.filter((url) => url.isActive && (!url.expiresAt || new Date(url.expiresAt) > new Date())).length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's an overview of your short links</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Link}
          label="Total Links"
          value={totalUrls}
          trend={totalUrls > 0 ? 5 : 0}
          trendUp={true}
        />
        <StatCard
          icon={BarChart3}
          label="Total Clicks"
          value={totalClicks}
          trend={totalClicks > 0 ? 12 : 0}
          trendUp={true}
        />
        <StatCard
          icon={Zap}
          label="Active Links"
          value={activeUrls}
          trend={activeUrls > 0 ? 3 : 0}
          trendUp={true}
        />
      </div>

      {/* Create URL Section */}
      <CreateUrlForm />

      {/* Recent URLs Section */}
      {urls.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Links</h2>
              <p className="text-sm text-gray-600 mt-1">Your most recently created short links</p>
            </div>
            <NextLink href="/dashboard/urls">
              <Button variant="outline">View All</Button>
            </NextLink>
          </div>

          {/* URLs List */}
          <div className="space-y-3">
            {urls.slice(0, 5).map((url) => (
              <div
                key={url._id || url.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{url.shortCode}</p>
                  <p className="text-xs text-gray-500 truncate">{url.originalUrl}</p>
                </div>
                <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{url.clicks}</p>
                    <p className="text-xs text-gray-500">clicks</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      url.isActive && (!url.expiresAt || new Date(url.expiresAt) > new Date())
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {url.isActive && (!url.expiresAt || new Date(url.expiresAt) > new Date())
                      ? 'Active'
                      : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {urls.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Link className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No links yet</h3>
          <p className="text-gray-600 mb-6">Create your first short link above to get started</p>
        </div>
      )}
    </div>
  );
}
