import { programmeDays } from "../../data/programmeSongs";
import { enrichSongs } from "../utils/transformSongs";

export async function getEnrichedProgramme() {
  return enrichSongs(programmeDays);
}

export const enrichedProgrammePromise = getEnrichedProgramme();
