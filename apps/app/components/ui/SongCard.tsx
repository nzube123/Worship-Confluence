"use client";

import { motion } from "framer-motion";
import type { Song } from "../../data/types";
import { formatYoutubeUrl } from "../../data/youtube";

interface SongCardProps {
  song: Song;
  selected?: boolean;
  rank?: number;
  onSelect?: (songId: string) => void;
}

export default function SongCard({ song, selected = false, rank, onSelect }: SongCardProps) {
  const isSelectable = typeof onSelect === "function";
  const hasPreview = Boolean(song.youtubeId);
  const isDisabled = !isSelectable && !hasPreview;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    if (onSelect) {
      onSelect(song.id);
      return;
    }

    if (song.youtubeId) {
      window.open(formatYoutubeUrl(song.youtubeId), "_blank");
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={isDisabled ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      disabled={isDisabled}
      className={`w-full rounded-3xl border border-white/10 bg-black/50 p-6 text-left shadow-lg transition duration-200 ${
        isDisabled ? "cursor-not-allowed opacity-80" : "hover:border-purple-400 hover:bg-purple-950/60"
      } ${selected ? "border-green-400/40 bg-green-950/40" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {typeof rank === "number" ? (
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-purple-300">{rank}</span>
          ) : null}
          <h3 className="mt-3 text-lg font-semibold text-white">{song.title}</h3>
          <p className="mt-2 text-sm text-gray-300">{song.artist ?? "Unknown artist"}</p>
        </div>
        {selected ? (
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-200">
            Selected
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
        {isSelectable ? (
          <span>{selected ? "Selected" : "Tap to select"}</span>
        ) : hasPreview ? (
          <span>Play on YouTube</span>
        ) : (
          <span className="text-amber-200">Preview unavailable</span>
        )}
        <span className="rounded-full border border-white/10 px-2 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
          {song.source ?? "unknown"}
        </span>
      </div>
    </motion.button>
  );
}
