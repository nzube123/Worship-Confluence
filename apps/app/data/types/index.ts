export interface Song {
  id: string;
  title: string;
  artist?: string;
  youtubeId?: string;
  source?: "youtube";
}

export interface Score {
  songId: string;
  contestantId: string;
  rating: number;
  comment?: string;
}

export interface ProgrammeDayRaw {
  day: string;
  stage: string;
  date: string;
  choirSongs: string[];
  individualSongs: string[];
}

export interface ProgrammeDay {
  day: string;
  stage: string;
  date: string;
  choirSongs: Song[];
  individualSongs: Song[];
}

export interface FormData {
  fullName?: string;
  choirName?: string;
  phoneNumber: string;
  email: string;
  songSelected: string;
  day: string;
}