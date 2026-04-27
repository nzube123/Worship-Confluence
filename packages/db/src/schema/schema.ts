import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const individualDb = pgTable("individual", {
  id: serial("id").unique(),
  fullName: text("full_name"),
  phoneNumber: varchar("phone_number", { length: 14 }),
  email: text("email"),
  songSelected: text("song_selected"),
  day: text("day-selected")
});

export const choirDb = pgTable("choir", {
    id: serial("id").unique(),
    choirName: text("choir_name"),
    phoneNumber: varchar("phone_number", { length: 14 }),
    email: text("email"),
    songSelected: text("song_selected"),
    day: text("day-selected")
})  
