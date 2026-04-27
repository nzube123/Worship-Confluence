"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { allChoirSongs, allIndividualSongs } from "../../data/programmeSongs";
import SongCard from "../../components/ui/SongCard";
import { Song } from "../../data/types";
import YouTubePlayer from "../../components/ui/YouTubePlayer";

export default function SelectSongPage() {
  const [selectedSongId, setSelectedSongId] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  // Keeping your memo exactly as requested
  const selectedSong = useMemo(
    () => [...allChoirSongs, ...allIndividualSongs].find((song) => song.id === selectedSongId),
    [selectedSongId]
  );

  const handleConfirmSelection = () => {
    if (!selectedSong) {
      setConfirmationMessage("Please select a song before confirming.");
      return;
    }

    setConfirmationMessage(`You have selected: ${selectedSong.title}${selectedSong.artist ? ` (${selectedSong.artist})` : ""}.`);
  };

  const renderSongList = (title: string, songs: Song[]) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {songs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            rank={index + 1}
            selected={song.id === selectedSongId}
            onSelect={setSelectedSongId}
          />
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <p className="text-sm uppercase tracking-[0.32em] text-purple-300">Song Selection</p>
          <h1 className="text-4xl font-bold text-white">Select Your Song</h1>
          <p className="max-w-3xl text-gray-300">
            Choose one song from the catalogue, then confirm your selection to proceed with your registration song choice.
          </p>
        </motion.div>

        <div className="mt-12 space-y-16">
          {renderSongList("Choir Star Songs", allChoirSongs)}
          {renderSongList("Individual Artiste Songs", allIndividualSongs)}
        </div>

        {selectedSong ? (
          <div className="mt-12 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div>
              <YouTubePlayer youtubeId={selectedSong.youtubeId} title={selectedSong.title} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-300">Selected song</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {selectedSong.title}
                    {selectedSong.artist ? ` — ${selectedSong.artist}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleConfirmSelection}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Confirm Selection
                </button>
              </div>

              {confirmationMessage ? (
                <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-950/30 p-4 text-sm text-green-200">
                  {confirmationMessage}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-white/10 bg-black/50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-300">Selected song</p>
                <p className="mt-1 text-lg font-semibold text-white">No song selected yet.</p>
              </div>
              <button
                type="button"
                onClick={handleConfirmSelection}
                disabled
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white/50"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}