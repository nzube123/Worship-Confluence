import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const individualSong = pgTable("individual_songs", {
  id: serial("id").unique(),
  songTitle: text("song_title"),
  artist: text("artist"),
});

export const choirSong = pgTable("choir_songs", {
  id: serial("id").unique(),
  songTitle: text("song_title"),
  choirName: text("choir_name"),
});

export const indivualRegistration = pgTable("individual", {
  id: serial("id").unique(),
  fullName: text("full_name"),
  phoneNumber: varchar("phone_number", { length: 14 }),
  Song: integer("Indiv_song").references(() => individualSong.id),
});

export const choirRegistration = pgTable("choir", {
    id: serial("id").unique(),
    choirName: text("choir_name"),
    phoneNumber: varchar("phone_number", { length: 14 }),
    Song: integer("choir_song").references(() => choirSong.id)
})  
