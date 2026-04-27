import { Song } from "./types";

const artistCorrections: Record<string, string> = {
  "Cece Winnans": "CeCe Winans",
  "Sam Song": "Samsong",
  "Elijah Oleyade": "Elijah Oyelade",
  "Stanley Okr": "Stanley Okorie",
};

const youtubeIdCache: Record<string, string | null> = {};

function titleCase(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => {
      if (word.toUpperCase() === word || word.length <= 2) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function normalizeArtist(artist: string): string {
  const corrected = artistCorrections[artist.trim()] ?? artist.trim();
  return titleCase(corrected.replace(/\s+/g, " ").trim());
}

export function normalizeTitle(title: string): string {
  return titleCase(title.replace(/[’‘”“]/g, "'").replace(/\s+/g, " ").trim());
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘”“]/g, "'")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function parseSongString(rawSong: string): Song[] {
  const cleaned = rawSong.replace(/[\u2018\u2019\u201C\u201D]/g, "'").trim();
  const parts = cleaned.split(/\s*\/\s*/g);

  return parts.map((part) => {
    const withoutNumberPrefix = part.replace(/^\s*\d+[\.)]?\s*/g, "").trim();
    const metadataMatch = withoutNumberPrefix.match(/^(.*?)\s*\(([^)]+)\)\s*$/);

    const title = metadataMatch ? normalizeTitle(metadataMatch[1]) : normalizeTitle(withoutNumberPrefix);
    const artist = metadataMatch ? normalizeArtist(metadataMatch[2]) : undefined;
    const id = slugify(`${title}${artist ? `-${artist}` : ""}`);

    return {
      id,
      title,
      artist,
      source: "youtube" as const,
    };
  });
}

export async function fetchYouTubeId(title: string, artist?: string): Promise<string | undefined> {
  const query = `${title}${artist ? ` ${artist}` : ""} official`.trim();
  if (youtubeIdCache[query] !== undefined) {
    return youtubeIdCache[query] ?? undefined;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    youtubeIdCache[query] = null;
    return undefined;
  }

  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("part", "snippet");
  searchUrl.searchParams.set("maxResults", "5");
  searchUrl.searchParams.set("q", query);
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("key", apiKey);
  searchUrl.searchParams.set("videoEmbeddable", "true");

  try {
    const response = await fetch(searchUrl.toString());
    if (!response.ok) {
      youtubeIdCache[query] = null;
      return undefined;
    }

    const data = await response.json();
    const item = Array.isArray(data.items) ? data.items[0] : undefined;
    const videoId = item?.id?.videoId;

    youtubeIdCache[query] = videoId ?? null;
    return videoId;
  } catch (error) {
    youtubeIdCache[query] = null;
    return undefined;
  }
}

export function formatYoutubeUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function formatYoutubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;
}
