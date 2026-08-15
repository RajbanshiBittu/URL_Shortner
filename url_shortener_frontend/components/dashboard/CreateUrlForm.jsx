'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUrls } from '@/hooks/useUrls';
import { createUrlSchema } from '@/validators';
import { Copy, Loader } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

export function CreateUrlForm() {
  const { createUrl, isLoading } = useUrls();
  const [originalUrl, setOriginalUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [generatedUrl, setGeneratedUrl] = useState(null);

  const handleChange = (e) => {
    setOriginalUrl(e.target.value);
    if (errors.originalUrl) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate
      createUrlSchema.parse({ originalUrl });

      // Create URL
      const result = await createUrl(originalUrl);
      
      setGeneratedUrl(result);
      setOriginalUrl('');

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setGeneratedUrl(null);
      }, 10000);
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleCopy = async () => {
    if (generatedUrl?.shortUrl) {
      const success = await copyToClipboard(generatedUrl.shortUrl);
      if (success) {
        toast.success('Short URL copied to clipboard!');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create a short link</h2>
        <p className="text-gray-600">Paste a long URL and we'll create a short link you can share</p>
      </div>

      {!generatedUrl ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Long URL
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  id="url"
                  type="url"
                  value={originalUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/very/long/url"
                  className={`w-full px-4 py-3 rounded-lg border transition ${
                    errors.originalUrl
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
                  } focus:ring-1 outline-none text-sm`}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !originalUrl.trim()} 
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader size={18} className="animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  'Shorten'
                )}
              </Button>
            </div>
            {errors.originalUrl && (
              <p className="text-red-600 text-sm mt-2">{errors.originalUrl}</p>
            )}
          </div>

          {/* Info */}
          <p className="text-xs text-gray-500">
            Paste any URL and we'll create a short link that's easy to share. Your links will be active immediately.
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium mb-3">✓ Short link created successfully!</p>
            
            {/* Original URL */}
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-1">Original URL</p>
              <p className="text-sm text-gray-900 break-all">{generatedUrl.originalUrl}</p>
            </div>

            {/* Short URL */}
            <div>
              <p className="text-xs text-gray-600 mb-1">Short URL</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedUrl.shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-mono"
                />
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  size="sm"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <p className="text-gray-600 text-xs">Clicks</p>
                <p className="text-lg font-bold text-gray-900">{generatedUrl.clicks}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">Short Code</p>
                <p className="text-lg font-bold text-indigo-600">{generatedUrl.shortCode}</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setGeneratedUrl(null)} 
            variant="outline" 
            className="w-full"
          >
            Create Another
          </Button>
        </div>
      )}
    </div>
  );
}
