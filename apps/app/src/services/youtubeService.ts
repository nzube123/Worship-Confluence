import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY as string | undefined;
const cache = new Map<string, string | null>();

async function fetchVideoId(query: string): Promise<string | null> {
  if (!API_KEY) {
    console.warn("YouTube API key is missing. Set YOUTUBE_API_KEY in .env");
    cache.set(query, null);
    return null;
  }

  if (cache.has(query)) {
    return cache.get(query) ?? null;
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
    query
  )}&key=${encodeURIComponent(API_KEY)}&videoEmbeddable=true`;

  let attempt = 0;
  while (attempt < 2) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`YouTube API returned ${response.status}`);
      }

      const data = await response.json();
      const videoId = data?.items?.[0]?.id?.videoId ?? null;
      cache.set(query, videoId);
      return videoId;
    } catch (error) {
      attempt += 1;
      if (attempt >= 2) {
        console.error("YouTube fetch error:", error);
        cache.set(query, null);
        return null;
      }
    }
  }

  cache.set(query, null);
  return null;
}

export async function fetchYouTubeId(title: string, artist?: string): Promise<string | null> {
  const query = `${title}${artist ? ` ${artist}` : ""} official`.trim();
  return fetchVideoId(query);
}
