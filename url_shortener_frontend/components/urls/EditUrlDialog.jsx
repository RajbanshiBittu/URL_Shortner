'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { updateUrlSchema } from '@/validators';
import { Loader, X } from 'lucide-react';

export function EditUrlDialog({ url, isOpen, onClose, onConfirm }) {
  const [formData, setFormData] = useState({ originalUrl: '', expiresAt: '' });
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (url && isOpen) {
      setFormData({
        originalUrl: url.originalUrl || '',
        expiresAt: url.expiresAt ? url.expiresAt.split('T')[0] : '',
      });
      setErrors({});
    }
  }, [url, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate
      updateUrlSchema.parse(formData);

      setIsUpdating(true);
      await onConfirm(formData);
      setIsUpdating(false);
      onClose();
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      setIsUpdating(false);
    }
  };

  if (!isOpen || !url) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Edit URL</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Original URL */}
          <div>
            <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Original URL
            </label>
            <input
              id="originalUrl"
              type="url"
              name="originalUrl"
              value={formData.originalUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className={`w-full px-3 py-2 rounded-lg border transition text-sm ${
                errors.originalUrl
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
              } focus:ring-1 outline-none`}
              disabled={isUpdating}
            />
            {errors.originalUrl && (
              <p className="text-red-600 text-xs mt-1">{errors.originalUrl}</p>
            )}
          </div>

          {/* Expiration Date */}
          <div>
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
              Expires At (Optional)
            </label>
            <input
              id="expiresAt"
              type="date"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border transition text-sm ${
                errors.expiresAt
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
              } focus:ring-1 outline-none`}
              disabled={isUpdating}
            />
            {errors.expiresAt && (
              <p className="text-red-600 text-xs mt-1">{errors.expiresAt}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
