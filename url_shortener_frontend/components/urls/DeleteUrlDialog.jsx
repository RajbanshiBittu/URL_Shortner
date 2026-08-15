'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function DeleteUrlDialog({ url, isOpen, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">Delete URL</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Are you sure you want to delete{' '}
          <code className="font-mono font-bold text-indigo-600">{url?.shortCode}</code>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
