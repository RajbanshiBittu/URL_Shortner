'use client';

import { formatDate, getStatusColor, getStatusText, isUrlExpired, truncateUrl } from '@/lib/utils';
import { UrlActions } from './UrlActions';

export function UrlCard({ url, onEdit, onDelete }) {
  const isExpired = isUrlExpired(url.expiresAt);
  const statusColor = getStatusColor(url.isActive, isExpired);
  const statusText = getStatusText(url.isActive, isExpired);

  return (
    <div className="md:hidden bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <code className="text-sm font-mono font-bold text-indigo-600">
            {url.shortCode}
          </code>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{url.originalUrl}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${statusColor}`}>
          {statusText}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-600 mb-1">Clicks</p>
          <p className="text-lg font-bold text-gray-900">{url.clicks}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Created</p>
          <p className="text-sm font-medium text-gray-900">{formatDate(url.createdAt)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <UrlActions
          url={url}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
