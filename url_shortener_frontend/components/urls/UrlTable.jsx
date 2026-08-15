'use client';

import { formatDate, formatNumber, getStatusColor, getStatusText, isUrlExpired, truncateUrl } from '@/lib/utils';
import { UrlActions } from './UrlActions';

export function UrlTable({ urls, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Short Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {urls.map((url) => {
              const isExpired = isUrlExpired(url.expiresAt);
              const statusColor = getStatusColor(url.isActive, isExpired);
              const statusText = getStatusText(url.isActive, isExpired);

              return (
                <tr key={url._id || url.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <code className="text-sm font-mono font-bold text-indigo-600">
                      {url.shortCode}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 truncate" title={url.originalUrl}>
                      {truncateUrl(url.originalUrl)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900">
                      {formatNumber(url.clicks)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor}`}>
                      {statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {formatDate(url.createdAt)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <UrlActions
                      url={url}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
