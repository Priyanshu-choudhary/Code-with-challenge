import React from 'react';

/**
 * Full-page loading spinner shown while lazy route chunks are fetching.
 * Pure CSS — zero dependencies.
 */
export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-purple-900/30" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
        </div>
        <span className="text-sm text-gray-400 tracking-widest uppercase">Loading…</span>
      </div>
    </div>
  );
}
