import type { Score } from "@/data/types";

export const scoreCategories = ["vocalQuality", "stagePresence", "arrangement", "audienceImpact"] as const;

export function createScore(payload: Score): Score {
  return {
    songId: payload.songId,
    contestantId: payload.contestantId,
    rating: Math.min(10, Math.max(0, payload.rating)),
    comment: payload.comment?.trim() || undefined,
  };
}

export function averageScore(scores: Score[]): number {
  const validScores = scores.filter((score) => typeof score.rating === "number");
  if (validScores.length === 0) {
    return 0;
  }

  const total = validScores.reduce((sum, score) => sum + score.rating, 0);
  return total / validScores.length;
}
