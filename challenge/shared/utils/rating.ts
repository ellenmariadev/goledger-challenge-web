import { ratingGuide } from "@/shared/constants/rating";

export type RatingCode = (typeof ratingGuide)[number]["code"];

const RATING_THRESHOLDS: [number, RatingCode][] = [
  [18, "NC-17"],
  [17, "R"],
  [13, "PG-13"],
  [10, "PG"],
  [0, "G"],
];

export function getRatingCodeFromRecommendedAge(recommendedAge: number): RatingCode {
  return (RATING_THRESHOLDS.find(([min]) => recommendedAge >= min)?.[1]) ?? "G";
}

export function getRatingByRecommendedAge(recommendedAge: number) {
  const code = getRatingCodeFromRecommendedAge(recommendedAge);
  return ratingGuide.find((rating) => rating.code === code) ?? ratingGuide[0];
}