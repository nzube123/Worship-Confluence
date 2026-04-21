import { programmeDays } from "@/data/programmeSongs";
import { enrichSongs } from "@/src/utils/transformSongs";

async function main() {
  const enrichedProgramme = await enrichSongs(programmeDays);
  console.log(JSON.stringify(enrichedProgramme, null, 2));
}

main().catch((error) => {
  console.error("Failed to enrich programme:", error);
  process.exit(1);
});
