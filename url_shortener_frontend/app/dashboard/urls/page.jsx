'use client';

import { useEffect, useState } from 'react';
import { useUrls } from '@/hooks/useUrls';
import { UrlTable } from '@/components/urls/UrlTable';
import { UrlCard } from '@/components/urls/UrlCard';
import { DeleteUrlDialog } from '@/components/urls/DeleteUrlDialog';
import { EditUrlDialog } from '@/components/urls/EditUrlDialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Link as LinkIcon, Search } from 'lucide-react';
import { useState as useFilterState } from 'react';

export default function UrlsPage() {
  const { urls, fetchUrls, deleteUrl, updateUrl, isLoading } = useUrls();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  // Filter URLs
  const filteredUrls = urls.filter((url) => {
    // Search filter
    const matchesSearch =
      url.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      url.originalUrl.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    let matchesStatus = true;
    if (filterStatus === 'active') {
      matchesStatus = url.isActive && (!url.expiresAt || new Date(url.expiresAt) > new Date());
    } else if (filterStatus === 'inactive') {
      matchesStatus = !url.isActive || (url.expiresAt && new Date(url.expiresAt) <= new Date());
    }

    return matchesSearch && matchesStatus;
  });

  const handleEdit = (url) => {
    setSelectedUrl(url);
    setEditDialogOpen(true);
  };

  const handleDelete = (url) => {
    setSelectedUrl(url);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUrl) {
      await deleteUrl(selectedUrl._id || selectedUrl.id);
    }
  };

  const handleEditConfirm = async (formData) => {
    if (selectedUrl) {
      await updateUrl(selectedUrl._id || selectedUrl.id, formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My URLs</h1>
          <p className="text-gray-600 mt-1">Manage all your short links</p>
        </div>
        <Link href="/dashboard">
          <Button>Create New</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by short code or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ].map((filter) => (
            <Button
              key={filter.value}
              variant={filterStatus === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* URLs List */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : filteredUrls.length > 0 ? (
        <>
          <UrlTable
            urls={filteredUrls}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
          <div className="md:hidden space-y-3">
            {filteredUrls.map((url) => (
              <UrlCard
                key={url._id || url.id}
                url={url}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <LinkIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {searchQuery ? 'No URLs found' : 'No URLs yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? 'Try adjusting your search filters'
              : 'Create your first short link to get started'}
          </p>
          <Link href="/dashboard">
            <Button>Create URL</Button>
          </Link>
        </div>
      )}

      {/* Dialogs */}
      <DeleteUrlDialog
        url={selectedUrl}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <EditUrlDialog
        url={selectedUrl}
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onConfirm={handleEditConfirm}
      />
    </div>
  );
}
