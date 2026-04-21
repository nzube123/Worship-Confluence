export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export const mediaVideos: VideoItem[] = [
  {
    id: "YOUR_VIDEO_ID_1",
    title: "Worship Night Recap",
    description: "A powerful scripture-driven atmosphere with live worship.",
    thumbnail: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80&sat=-30&exp=15",
  },
  {
    id: "YOUR_VIDEO_ID_2",
    title: "Conference Highlights",
    description: "Key moments from prayer, praise, and prophetic celebration.",
    thumbnail: "https://images.unsplash.com/photo-1516466723877-0fdb3b42f5cc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "YOUR_VIDEO_ID_3",
    title: "Worship Leader Session",
    description: "Behind-the-scenes teaching and worship activation segments.",
    thumbnail: "https://images.unsplash.com/photo-1445820132579-318df5cad58c?auto=format&fit=crop&w=800&q=80",
  },
];
