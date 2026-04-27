import { ProgrammeDayRaw, ProgrammeDay, Song } from "./types";
import { parseSongString } from "./youtube";

const programDaysRaw: ProgrammeDayRaw[] = [
  {
    day: "Day 1",
    stage: "Prelim Stage 1 (1 Song for 2 Contestants)",
    date: "May 29 Evening & May 30 Morning",
    choirSongs: [
      "We will Wait (Ron Kenoly)",
      "I Will Dance (Ron Kenoly)",
      "Sing Out (Ron Kenoly)",
      "We Offer Praises (Ron Kenoly)",
      "Praise the Lord All Nations (Ron Kenoly)",
      "Going Up to the High Places (Ron Kenoly)",
      "Lift Him Up (Ron Kenoly)",
      "Be Glorified (Ron Kenoly)",
      "I See The Lord (Ron Kenoly)",
      "Hallowed Be Your Name (Ron Kenoly)",
    ],
    individualSongs: [
      "Miracle (Iyke Onka)",
      "Sailing (Iyke Onka)",
      "Prevailing Word (Iyke Onka)",
      "All I Wanna Do (Iyke Onka)",
      "Call Me (Iyke Onka)",
      "I Remember (Elijah Oleyade)",
      "I Stand Amazed in Your Presence (Sinach)",
      "The Presence of the Lord (Sinach)",
      "The Wonder of His Hands (Alvin Slaughter)",
      "I Sing (Mary Mary Ft. BB Jay)",
    ],
  },
  {
    day: "Day 2",
    stage: "Knockout Stage 2 (1 Song per contestant)",
    date: "May 30 Evening",
    choirSongs: [
      "Have You Counted the Cost",
      "Sweet is the Promise",
      "Peace Perfect Peace",
      "It is well With My Soul",
      "Great is Thy Faithfulness",
      "A Wonderful Savior is Jesus My Lord",
      "Heavens Came Down",
      "Old Rugged Cross",
      "He Leadeth Me",
      "Praise To The Lord The Almighty",
      "All Hail the Power of Jesus Name",
      "Abide With Me",
    ],
    individualSongs: [
      "I Met The Master (Jimmy Swaggart)",
      "Just a Mention of Your Name (Jimmy Swaggart)",
      "When I say Jesus (Jimmy Swaggart)",
      "Remind Me Dear Lord (Jimmy Swaggart)",
      "He Chose Me (Jimmy Swaggart)",
      "Wasted Years (Jimmy Swaggart)",
      "His Voice Makes the Diff (Jimmy Swaggart)",
      "Leaving on My Mind (Jimmy Swaggart)",
      "Do you know My Saviour (Jimmy Swaggart)",
      "Your Grace and Mercy (Jimmy Swaggart)",
      "Just a Closer Walk (Jimmy Swaggart)",
      "I know a Man Who Can (Jimmy Swaggart)",
    ],
  },
  {
    day: "Day 3",
    stage: "Quarter-Final (1 Song for 2 Contestants)",
    date: "May 31 Evening",
    choirSongs: [
      "Master the Tempest is Raging (MaryAnn Baker)",
      "And the Glory of the Lord (Handel Messiah)",
      "Blessed Assurance (Brother Mag)",
    ],
    individualSongs: [
      "Comfort Ye My People (Handel Messiah)",
      "Every Valley Shall be Exalted (Handel Messiah)",
      "Behold and See (Handel Messiah)",
    ],
  },
  {
    day: "Day 4",
    stage: "Semi-Final 4-A & 4-B (1 Song for 1 Contestant)",
    date: "June 5 Evening",
    choirSongs: [
      "Nobody Else Like You (Andrew Crouch)",
      "Amazed (Hezekiah Walker)",
      "Omenma (Chandler Moore)",
      "Thank You (Mary Mary)",
    ],
    individualSongs: [
      "Welu Welu (Sam Okposo)",
      "You Go Bow (Tony One Week)",
      "Victory (Eben) / Jesus I Love You (Stanley Okr)",
      "E Dey Work (Sam Song)",
    ],
  },
  {
    day: "Day 5",
    stage: "Final Stage 5-A (All Contestants)",
    date: "June 6 Evening",
    choirSongs: [
      "Something About the Name Jesus (Kirk Franklin)",
      "The Choir's Original Song",
    ],
    individualSongs: [
      "Mercy Said No (Cece Winnans)",
      "Artiste's Original Own Song",
    ],
  },
  {
    day: "Day 6",
    stage: "Final Stage 5-B (Songs for all Contestants)",
    date: "June 7 Evening",
    choirSongs: [
      "1.The Spirit is Poured (Brother Mag)",
      "The Choir's Original Song",
    ],
    individualSongs: [
      "1)I Can’t Resist (Brother Mag)",
      "Artiste’s Original Own Song",
    ],
  },
];

function buildSongList(rawSongs: string[]): Song[] {
  return rawSongs.flatMap((songString) => parseSongString(songString));
}

function uniqueSongs(songs: Song[]): Song[] {
  const seen = new Set<string>();
  return songs.filter((song) => {
    if (seen.has(song.id)) {
      return false;
    }
    seen.add(song.id);
    return true;
  });
}

export const programmeDays: ProgrammeDay[] = programDaysRaw.map((day) => ({
  ...day,
  choirSongs: buildSongList(day.choirSongs),
  individualSongs: buildSongList(day.individualSongs),
}));

export const programmeDaysStructured = programmeDays;
export const programmeDaysRaw = programDaysRaw;

export const allChoirSongs: Song[] = uniqueSongs(
  programmeDays.flatMap((day) => day.choirSongs),
);
export const allIndividualSongs: Song[] = uniqueSongs(
  programmeDays.flatMap((day) => day.individualSongs),
);
