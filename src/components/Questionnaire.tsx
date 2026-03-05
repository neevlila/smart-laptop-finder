import { QuestionAnswer } from "@/types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionnaireProps {
  onComplete: (answers: QuestionAnswer) => void;
}

interface QuestionConfig {
  key: keyof QuestionAnswer;
  title: string;
  subtitle: string;
  options: { value: string; label: string; description: string }[];
}

const questions: QuestionConfig[] = [
  {
    key: "budget",
    title: "What's your budget?",
    subtitle: "This helps us narrow down the best options for you.",
    options: [
      { value: "under-800", label: "Under ₹65,000", description: "Best value picks" },
      { value: "800-1000", label: "₹65,000 – ₹85,000", description: "Sweet spot for performance" },
      { value: "1000-1300", label: "₹85,000 – ₹1,10,000", description: "Premium mid-range" },
      { value: "1300-1500", label: "₹1,10,000 – ₹1,25,000", description: "Top-tier options" },
    ],
  },
  {
    key: "games",
    title: "What type of games do you play?",
    subtitle: "Different games have different hardware demands.",
    options: [
      { value: "esports", label: "Esports / Competitive", description: "Valorant, CS2, League" },
      { value: "aaa", label: "AAA Titles", description: "Cyberpunk, Elden Ring, Starfield" },
      { value: "indie", label: "Indie / Casual", description: "Stardew Valley, Hades, Celeste" },
      { value: "mixed", label: "A Mix of Everything", description: "I play all kinds of games" },
    ],
  },
  {
    key: "portability",
    title: "How important is portability?",
    subtitle: "Do you need to carry this laptop around often?",
    options: [
      { value: "very", label: "Very Important", description: "I travel with it daily" },
      { value: "somewhat", label: "Somewhat", description: "Occasional trips" },
      { value: "not", label: "Not Important", description: "It stays on my desk" },
    ],
  },
  {
    key: "battery",
    title: "How important is battery life?",
    subtitle: "Will you game away from a power outlet?",
    options: [
      { value: "very", label: "Very Important", description: "I need all-day battery" },
      { value: "somewhat", label: "Somewhat", description: "A few hours is fine" },
      { value: "not", label: "Not Important", description: "Always plugged in" },
    ],
  },
  {
    key: "screen",
    title: "How important is screen quality?",
    subtitle: "Resolution, refresh rate, and color accuracy.",
    options: [
      { value: "very", label: "Very Important", description: "I want the best display" },
      { value: "somewhat", label: "Somewhat", description: "Good enough is fine" },
      { value: "not", label: "Not Important", description: "I use an external monitor" },
    ],
  },
  {
    key: "preference",
    title: "What's your overall priority?",
    subtitle: "If you had to choose one thing to optimize for.",
    options: [
      { value: "performance", label: "Maximum Performance", description: "Highest FPS possible" },
      { value: "balanced", label: "Balanced", description: "Good at everything" },
      { value: "battery", label: "Longevity & Portability", description: "Light and long-lasting" },
    ],
  },
];

const Questionnaire = ({ onComplete }: QuestionnaireProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionAnswer>>({});
  const [direction, setDirection] = useState(1);

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const canGoNext = answers[current.key] !== undefined;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      onComplete(answers as QuestionAnswer);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-secondary h-1">
        <motion.div
          className="h-1 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Step indicator */}
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Question {step + 1} of {questions.length}
          </p>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Question */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                {current.title}
              </h2>
              <p className="text-muted-foreground mb-8">{current.subtitle}</p>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {current.options.map((option, i) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 ${
                      answers[current.key] === option.value
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-border bg-card hover:border-primary/30 hover:bg-surface"
                    }`}
                  >
                    <div className="font-semibold text-card-foreground">{option.label}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{option.description}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex items-center gap-1 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === questions.length - 1 ? "See Results" : "Next"} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
