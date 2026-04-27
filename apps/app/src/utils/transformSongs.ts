import { fetchYouTubeId } from "@/src/services/youtubeService";

export function parseSong(input: string) {
  const cleaned = input.replace(/^\s*\d+[\.)]?\s*/g, "").replace(/\s+/g, " ").trim();
  const parts = cleaned.split(/\s*\/\s*/g);

  return parts.map((part) => {
    const match = part.trim().match(/^(.*?)\s*\((.*?)\)$/);

    if (match) {
      return {
        title: match[1].trim(),
        artist: match[2].trim(),
      };
    }

    return {
      title: part.trim(),
    };
  });
}

export async function enrichSongs(programmeDays: any[]) {
  return Promise.all(
    programmeDays.map(async (day) => {
      const choirSongs = (
        await Promise.all(
          day.choirSongs.map(async (song: string) => {
            const parsedSongs = parseSong(song);
            return Promise.all(
              parsedSongs.map(async (parsed) => ({
                ...parsed,
                youtubeId: await fetchYouTubeId(parsed.title, parsed.artist),
              }))
            );
          })
        )
      ).flat();

      const individualSongs = (
        await Promise.all(
          day.individualSongs.map(async (song: string) => {
            const parsedSongs = parseSong(song);
            return Promise.all(
              parsedSongs.map(async (parsed) => ({
                ...parsed,
                youtubeId: await fetchYouTubeId(parsed.title, parsed.artist),
              }))
            );
          })
        )
      ).flat();

      return {
        ...day,
        choirSongs,
        individualSongs,
      };
    })
  );
}
