import { Laptop } from "@/types";
import { Star } from "lucide-react";
import { getLaptopImage } from "@/assets/laptops";
import { motion } from "framer-motion";

interface LaptopCardProps {
  laptop: Laptop;
  rank: number;
  matchReason: string;
  score: number;
  onViewDetails: (id: string) => void;
}

const LaptopCard = ({ laptop, rank, matchReason, score, onViewDetails }: LaptopCardProps) => {
  const rankLabels = ["Best Match", "Runner Up", "Great Pick"];
  const rankColors = [
    "bg-primary text-primary-foreground",
    "bg-accent text-accent-foreground",
    "bg-secondary text-secondary-foreground",
  ];

  return (
    <motion.div
      className="group relative rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${rankColors[rank]}`}>
          #{rank + 1} {rankLabels[rank]}
        </span>
        <span className="text-sm font-semibold text-primary">{score}% Match</span>
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="w-full h-40 bg-surface rounded-lg flex items-center justify-center mb-4 overflow-hidden">
          <img
            src={getLaptopImage(laptop.id)}
            alt={laptop.name}
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <h3 className="font-display text-lg font-bold text-card-foreground text-center">{laptop.name}</h3>
        <p className="text-2xl font-bold text-primary mt-1">₹{laptop.price.toLocaleString("en-IN")}</p>
      </div>

      <div className="flex items-center justify-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(laptop.rating) ? "fill-highlight text-highlight" : "text-border"}`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">{laptop.rating}</span>
      </div>

      <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">{matchReason}</p>

      <div className="space-y-2 mb-4">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {laptop.pros.slice(0, 2).map((pro, i) => (
            <span key={i} className="inline-flex items-center rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
              ✓ {pro}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {laptop.cons.slice(0, 1).map((con, i) => (
            <span key={i} className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
              ✗ {con}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(laptop.id)}
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Details
        </button>
        <a
          href={laptop.affiliate_link}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Deal →
        </a>
      </div>
    </motion.div>
  );
};

export default LaptopCard;
