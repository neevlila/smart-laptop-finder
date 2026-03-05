import { describe, it, expect } from "vitest";
import { laptops } from "../data/laptops";
import { getRecommendations, deriveWeights } from "../lib/scoring";
import type { QuestionAnswer } from "../types";

// Basic sanity tests for the recommendation logic.

describe("scoring utilities", () => {
  it("deriveWeights should return balanced weights by default", () => {
    const answers: QuestionAnswer = {
      budget: "800-1000",
      games: "mixed",
      portability: "not",
      battery: "not",
      screen: "not",
      preference: "balanced",
    };

    const weights = deriveWeights(answers);
    expect(weights.performance).toBeGreaterThan(0);
    expect(weights.portability).toBeGreaterThan(0);
    expect(weights.battery).toBeGreaterThan(0);
    expect(weights.screen).toBeGreaterThan(0);
  });

  it("filterByBudget should not discard all laptops for realistic budgets", () => {
    // We run getRecommendations on each budget range and expect at least one result.
    const commonAnswers: Omit<QuestionAnswer, "budget"> = {
      games: "aaa",
      portability: "somewhat",
      battery: "somewhat",
      screen: "somewhat",
      preference: "balanced",
    };

    const budgets: QuestionAnswer["budget"][] = [
      "under-800",
      "800-1000",
      "1000-1300",
      "1300-1500",
    ];

    budgets.forEach((budget) => {
      const answers = { ...commonAnswers, budget } as QuestionAnswer;
      const recs = getRecommendations(laptops, answers);
      expect(recs.length).toBeGreaterThan(0);
    });
  });
});
