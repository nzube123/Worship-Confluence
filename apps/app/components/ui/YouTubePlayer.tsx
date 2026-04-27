"use client";

import { useMemo } from "react";
import { formatYoutubeEmbedUrl } from "@/data/youtube";

interface YouTubePlayerProps {
  youtubeId?: string;
  title?: string;
}

export default function YouTubePlayer({ youtubeId, title }: YouTubePlayerProps) {
  const embedUrl = useMemo(() => (youtubeId ? formatYoutubeEmbedUrl(youtubeId) : undefined), [youtubeId]);

  if (!youtubeId) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/50 p-6 text-center text-sm text-gray-300">
        <p className="font-semibold text-white">Preview unavailable</p>
        <p className="mt-2">A YouTube preview is not available for {title ?? "this song"} yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 shadow-xl">
      <iframe
        src={embedUrl}
        title={title ?? "YouTube preview"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-[420px] w-full min-h-[240px] border-0"
      />
    </div>
  );
}
