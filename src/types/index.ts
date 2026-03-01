export interface Laptop {
  id: string;
  name: string;
  image: string;
  price: number;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  weight: string;
  battery_life: string;
  screen_size: string;
  rating: number;
  pros: string[];
  cons: string[];
  affiliate_link: string;
  performance_score: number;
  portability_score: number;
  battery_score: number;
  screen_score: number;
  best_for: string;
}

export interface QuestionAnswer {
  budget: "under-800" | "800-1000" | "1000-1300" | "1300-1500";
  games: "esports" | "aaa" | "indie" | "mixed";
  portability: "very" | "somewhat" | "not";
  battery: "very" | "somewhat" | "not";
  screen: "very" | "somewhat" | "not";
  preference: "performance" | "balanced" | "battery";
}

export interface ScoringWeights {
  performance: number;
  portability: number;
  battery: number;
  screen: number;
}
