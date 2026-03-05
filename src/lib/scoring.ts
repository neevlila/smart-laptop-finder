import { QuestionAnswer, ScoringWeights, Laptop } from "@/types";

/**
 * Derives scoring weights from user answers.
 * Each answer adjusts how much we value performance, portability, battery, and screen.
 */
export function deriveWeights(answers: QuestionAnswer): ScoringWeights {
  const weights: ScoringWeights = {
    performance: 25,
    portability: 25,
    battery: 25,
    screen: 25,
  };

  // Game type adjusts performance weight
  switch (answers.games) {
    case "aaa":
      weights.performance += 20;
      weights.screen += 10;
      break;
    case "esports":
      weights.performance += 10;
      weights.portability += 5;
      break;
    case "indie":
      weights.battery += 10;
      weights.portability += 5;
      break;
    case "mixed":
      weights.performance += 10;
      weights.screen += 5;
      break;
  }

  // Portability importance
  switch (answers.portability) {
    case "very":
      weights.portability += 20;
      break;
    case "somewhat":
      weights.portability += 8;
      break;
  }

  // Battery importance
  switch (answers.battery) {
    case "very":
      weights.battery += 20;
      break;
    case "somewhat":
      weights.battery += 8;
      break;
  }

  // Screen importance
  switch (answers.screen) {
    case "very":
      weights.screen += 20;
      break;
    case "somewhat":
      weights.screen += 8;
      break;
  }

  // Overall preference
  switch (answers.preference) {
    case "performance":
      weights.performance += 15;
      break;
    case "battery":
      weights.battery += 10;
      weights.portability += 5;
      break;
    case "balanced":
      // Keep balanced
      break;
  }

  return weights;
}

/**
 * Filters laptops by budget range
 */
function filterByBudget(laptops: Laptop[], budget: QuestionAnswer["budget"]): Laptop[] {
  // budget values are in thousands (e.g. "under-800" means under ₹80,000).
  // laptop.price is stored as a full rupee amount (e.g. 65999), so we need
  // to map the string keys to realistic rupee ranges.
  const ranges: Record<string, [number, number]> = {
    // using explicit values keeps the intent clear and avoids off-by-thousand
    "under-800": [0, 80000],         // up to ₹80 000
    "800-1000": [80000, 100000],     // ₹80 000–₹1 00 000
    "1000-1300": [100000, 130000],   // ₹1 00 000–₹1 30 000
    "1300-1500": [130000, 150000],   // ₹1 30 000–₹1 50 000
  };
  const [min, max] = ranges[budget];
  return laptops.filter((l) => l.price >= min && l.price <= max);
}

/**
 * Calculates a weighted score for a laptop based on user preferences.
 * Returns a normalized score out of 100.
 */
function calculateScore(laptop: Laptop, weights: ScoringWeights): number {
  const totalWeight = weights.performance + weights.portability + weights.battery + weights.screen;

  const score =
    (laptop.performance_score * weights.performance +
      laptop.portability_score * weights.portability +
      laptop.battery_score * weights.battery +
      laptop.screen_score * weights.screen) /
    totalWeight;

  return Math.round(score * 10) / 10;
}

/**
 * Main recommendation engine.
 * Filters by budget, scores remaining laptops, returns top 3.
 */
export function getRecommendations(
  allLaptops: Laptop[],
  answers: QuestionAnswer
): { laptop: Laptop; score: number; matchReason: string }[] {
  const weights = deriveWeights(answers);
  const filtered = filterByBudget(allLaptops, answers.budget);

  // If budget filter returns too few, expand to all laptops under $1500
  const pool = filtered.length >= 3 ? filtered : allLaptops.filter((l) => l.price <= 150000);

  const scored = pool.map((laptop) => {
    const score = calculateScore(laptop, weights);

    // Generate a match reason based on the highest weighted category
    const categories = [
      { name: "performance", weight: weights.performance, score: laptop.performance_score },
      { name: "portability", weight: weights.portability, score: laptop.portability_score },
      { name: "battery life", weight: weights.battery, score: laptop.battery_score },
      { name: "screen quality", weight: weights.screen, score: laptop.screen_score },
    ].sort((a, b) => b.weight * b.score - a.weight * a.score);

    const top = categories[0];
    const matchReason = `Excels in ${top.name} (${top.score}/100) which aligns with your priorities. Overall match score: ${score}%.`;

    return { laptop, score, matchReason };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}
