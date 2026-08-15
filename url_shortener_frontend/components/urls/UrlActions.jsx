'use client';

import { Copy, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';

export function UrlActions({ url, onEdit, onDelete }) {
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    setCopying(true);
    const success = await copyToClipboard(url.shortUrl);
    setCopying(false);
    if (success) {
      toast.success('Short URL copied!');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        disabled={copying}
        title="Copy short URL"
      >
        <Copy size={16} />
      </Button>
      <a
        href={url.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Open original URL"
      >
        <Button variant="ghost" size="sm">
          <ExternalLink size={16} />
        </Button>
      </a>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(url)}
        title="Edit URL"
      >
        <Edit size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => onDelete(url)}
        title="Delete URL"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
