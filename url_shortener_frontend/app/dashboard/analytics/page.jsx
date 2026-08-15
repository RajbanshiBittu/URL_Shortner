'use client';

import { useEffect } from 'react';
import { useUrls } from '@/hooks/useUrls';
import { StatCard } from '@/components/dashboard/StatCard';
import { BarChart3, Link } from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/utils';

export default function AnalyticsPage() {
  const { urls, fetchUrls, isLoading } = useUrls();

  useEffect(() => {
    fetchUrls();
  }, []);

  // Calculate analytics
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  const activeUrls = urls.filter(
    (url) => url.isActive && (!url.expiresAt || new Date(url.expiresAt) > new Date())
  ).length;
  const avgClicks = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;

  // Top URLs
  const topUrls = [...urls]
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Performance overview of your short links</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Link}
          label="Total Links"
          value={totalUrls}
          trend={totalUrls > 0 ? 5 : 0}
        />
        <StatCard
          icon={BarChart3}
          label="Total Clicks"
          value={formatNumber(totalClicks)}
          trend={totalClicks > 0 ? 12 : 0}
        />
        <StatCard
          icon={Link}
          label="Active Links"
          value={activeUrls}
          trend={activeUrls > 0 ? 3 : 0}
        />
        <StatCard
          icon={BarChart3}
          label="Avg Clicks/Link"
          value={formatNumber(avgClicks)}
          trend={avgClicks > 0 ? 8 : 0}
        />
      </div>

      {/* Top Performing URLs */}
      {topUrls.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Links</h2>

          <div className="space-y-3">
            {topUrls.map((url, index) => (
              <div
                key={url._id || url.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 font-bold text-indigo-600 text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono font-bold text-indigo-600">
                    {url.shortCode}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{url.originalUrl}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-gray-900">
                    {formatNumber(url.clicks)}
                  </p>
                  <p className="text-xs text-gray-500">clicks</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {urls.length === 0 && !isLoading && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No analytics yet</h3>
          <p className="text-gray-600">Create some short links to see analytics data</p>
        </div>
      )}
    </div>
  );
}
