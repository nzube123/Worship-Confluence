"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { programmeDays } from "@/data/programmeSongs";

export default function ProgrammeCatalogue() {
  const [currentDay, setCurrentDay] = useState(0);
  const totalDays = programmeDays.length;
  const currentDayData = programmeDays[currentDay];
  const hasNextDay = currentDay < totalDays - 1;
  const hasPreviousDay = currentDay > 0;

  const handlePrevious = () => {
    if (hasPreviousDay) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleNext = () => {
    if (hasNextDay) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <section id="programme" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-center text-3xl font-bold text-white">Programme</h2>
        <p className="mx-auto max-w-2xl text-center text-gray-300">
          Choir Star and Individual Artiste songs for each stage of the competition.
        </p>
      </motion.div>

      {currentDayData ? (
        <motion.div
          key={currentDay}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 space-y-6"
        >
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-widest text-purple-300">{currentDayData.day}</p>
              <h3 className="text-2xl font-bold text-white">{currentDayData.stage}</h3>
              <p className="text-gray-400">{currentDayData.date}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left font-semibold text-white">Day</th>
                  <th className="px-6 py-4 text-left font-semibold text-white">Stage</th>
                  <th className="px-6 py-4 text-left font-semibold text-white">Choir Star Songs</th>
                  <th className="px-6 py-4 text-left font-semibold text-white">Individual Artiste Songs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-white font-medium">{currentDayData.day}</td>
                  <td className="px-6 py-4 max-w-xs">{currentDayData.stage}</td>
                  <td className="px-6 py-4">
                    <ol className="space-y-2 list-decimal list-inside">
                      {currentDayData.choirSongs.map((song) => (
                        <li key={song.id} className="text-gray-300">
                          <span className="font-semibold text-white">{song.title}</span>
                          {song.artist ? <span className="text-sm text-gray-400"> — {song.artist}</span> : null}
                        </li>
                      ))}
                    </ol>
                  </td>
                  <td className="px-6 py-4">
                    <ol className="space-y-2 list-decimal list-inside">
                      {currentDayData.individualSongs.map((song) => (
                        <li key={song.id} className="text-gray-300">
                          <span className="font-semibold text-white">{song.title}</span>
                          {song.artist ? <span className="text-sm text-gray-400"> — {song.artist}</span> : null}
                        </li>
                      ))}
                    </ol>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
              <p className="mb-4 text-sm text-gray-400">Choir Star Songs</p>
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasNextDay}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-green-500 px-5 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next →
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
              <p className="mb-4 text-sm text-gray-400">Individual Artiste Songs</p>
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasNextDay}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-green-500 px-5 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!hasPreviousDay}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Previous
            </button>

            <span className="text-sm font-medium text-gray-300">
              {currentDayData.day} of {totalDays} days
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasNextDay}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-green-500 px-5 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="mt-12 rounded-2xl border border-white/10 bg-black/40 p-8 text-center">
          <p className="text-gray-400">No programme data available for this day.</p>
        </div>
      )}
    </section>
  );
}
