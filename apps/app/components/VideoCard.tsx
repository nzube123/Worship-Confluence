"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { cn } from "../app/lib/utils";
// import { cn } from "@/app/lib/utils";

interface VideoCardProps {
  videoId: string;
  thumbnail: string;
  title: string;
  description: string;
  className?: string;
}

export default function VideoCard({ videoId, thumbnail, title, description, className }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = Boolean(videoId && videoId !== "YOUR_VIDEO_ID_1");

  return (
    <article className={cn("rounded-2xl border border-white/10 bg-gradient-to-br from-purple-950/30 to-black/60 p-4 shadow-lg", className)}>
      <div className="relative overflow-hidden rounded-xl bg-white/10 aspect-video">
        {isPlaying && hasVideo ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            title={title}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="relative group block h-full w-full overflow-hidden text-left"
            onClick={() => hasVideo && setIsPlaying(true)}
            aria-label={`Play ${title}`}
          >
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-200 hover:bg-black/40" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition group-hover:scale-105">
                <FaPlay className="ml-1" />
              </span>
            </span>
          </button>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-300">{description}</p>
    </article>
  );
}
