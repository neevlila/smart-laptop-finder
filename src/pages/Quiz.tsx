import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Questionnaire from "@/components/Questionnaire";
import LaptopCard from "@/components/LaptopCard";
import ComparisonTable from "@/components/ComparisonTable";
import { QuestionAnswer } from "@/types";
import { getRecommendations } from "@/lib/scoring";
import { laptops } from "@/data/laptops";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const Quiz = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<ReturnType<typeof getRecommendations> | null>(null);

  const handleComplete = (answers: QuestionAnswer) => {
    const recs = getRecommendations(laptops, answers);
    setResults(recs);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!results) {
    return (
      <PageTransition>
        <Questionnaire onComplete={handleComplete} />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar
          rightContent={
            <button
              onClick={() => setResults(null)}
              className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retake Quiz
            </button>
          }
        />

        <div className="container py-12 md:py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Your Top 3 Recommendations
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Based on your preferences, here are the gaming laptops we think you'll love.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {results.map((result, i) => (
              <motion.div
                key={result.laptop.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <LaptopCard
                  laptop={result.laptop}
                  rank={i}
                  matchReason={result.matchReason}
                  score={result.score}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Side-by-Side Comparison
            </h2>
            <ComparisonTable laptops={results} />
          </motion.div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Quiz;
