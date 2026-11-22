'use client';

import React, { useState } from 'react';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ExternalImageCardProps {
  src: string;
  title: string;
  sourceUrl: string;
  sourceLabel: string;
  caption?: string;
  className?: string;
}

export function ExternalImageCard({
  src,
  title,
  sourceUrl,
  sourceLabel,
  caption,
  className = '',
}: ExternalImageCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure
      className={`rounded-2xl border-2 border-[#F0D6E2] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="relative bg-[#FFF7FA] flex items-center justify-center min-h-[220px] max-h-[380px] overflow-hidden border-b border-[#F0D6E2]">
        {!hasError ? (
          <img
            src={src}
            alt={title}
            onError={() => setHasError(true)}
            className="w-full h-auto max-h-[380px] object-contain hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="p-8 text-center flex flex-col items-center gap-2 text-[#6D5970]">
            <ImageIcon className="w-10 h-10 text-[#FF2E7E] opacity-70 mb-1" />
            <p className="text-xs font-semibold text-[#1A1020]">{title}</p>
            <p className="text-[11px] text-[#6D5970]">Visual preview available via link below</p>
          </div>
        )}
      </div>

      <figcaption className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-bold text-[#1A1020] truncate">{title}</p>
          {caption && <p className="text-[11px] text-[#6D5970] line-clamp-1">{caption}</p>}
        </div>

        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#FFF0F6] text-[#FF2E7E] border border-[#FFB8D2] hover:bg-[#FFE4EF] transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <span>{sourceLabel}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </figcaption>
    </figure>
  );
}
