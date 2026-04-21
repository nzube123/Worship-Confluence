"use client";

import { motion } from "framer-motion";
import SongCard from "@/components/ui/SongCard";
import { allChoirSongs, allIndividualSongs } from "@/data/programmeSongs";

export default function SongCatalogue() {
  return (
    <section id="song-catalogue" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-center text-3xl font-bold text-white">Song Catalogue</h2>
        <p className="mx-auto max-w-2xl text-center text-gray-300">
          Explore the choir and individual artiste songs available for selection at Worship Confluence.
        </p>
      </motion.div>

      <div className="mt-16 space-y-16">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">Choir Star Songs</h3>
              <p className="mt-2 text-gray-400">A curated list of choir songs for your performance selection.</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {allChoirSongs.map((song, index) => (
              <SongCard key={song.id} song={song} rank={index + 1} />
            ))}
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">Individual Artiste Songs</h3>
              <p className="mt-2 text-gray-400">Browse through individual artiste selections for your registration.</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {allIndividualSongs.map((song, index) => (
              <SongCard key={song.id} song={song} rank={index + 1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
