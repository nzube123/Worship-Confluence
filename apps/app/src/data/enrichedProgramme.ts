import { programmeDays } from "@/data/programmeSongs";
import { enrichSongs } from "@/src/utils/transformSongs";

export async function getEnrichedProgramme() {
  return enrichSongs(programmeDays);
}

export const enrichedProgrammePromise = getEnrichedProgramme();
