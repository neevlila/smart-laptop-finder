import { useParams, useNavigate } from "react-router-dom";
import { laptops } from "@/data/laptops";
import { ArrowLeft, Star, ExternalLink } from "lucide-react";
import { getLaptopImage } from "@/assets/laptops";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const laptop = laptops.find((l) => l.id === id);

  if (!laptop) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Product not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">Go home</button>
        </div>
      </div>
    );
  }

  const scores = [
    { label: "Performance", value: laptop.performance_score },
    { label: "Portability", value: laptop.portability_score },
    { label: "Battery", value: laptop.battery_score },
    { label: "Screen", value: laptop.screen_score },
  ];

  const specs = [
    { label: "CPU", value: laptop.cpu },
    { label: "GPU", value: laptop.gpu },
    { label: "RAM", value: laptop.ram },
    { label: "Storage", value: laptop.storage },
    { label: "Display", value: laptop.screen_size },
    { label: "Weight", value: laptop.weight },
    { label: "Battery Life", value: laptop.battery_life },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-14 items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      </nav>

      <div className="container py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-2/5">
              <div className="w-full aspect-square bg-surface rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={getLaptopImage(laptop.id)}
                  alt={laptop.name}
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="md:w-3/5">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{laptop.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">₹{laptop.price.toLocaleString("en-IN")}</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(laptop.rating) ? "fill-highlight text-highlight" : "text-border"}`} />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">{laptop.rating}/5</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{laptop.best_for}</p>
              <a
                href={laptop.affiliate_link}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-hero hover:bg-primary/90 transition-all"
              >
                View Deal <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {scores.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl border border-border bg-card p-4 text-center shadow-card"
              >
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs font-medium text-muted-foreground mt-1">{s.label}</div>
                <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Specs */}
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Specifications</h2>
            <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              {specs.map((spec, i) => (
                <div key={spec.label} className={`flex items-center justify-between px-5 py-3 ${i % 2 === 0 ? "" : "bg-surface/50"}`}>
                  <span className="text-sm font-medium text-muted-foreground">{spec.label}</span>
                  <span className="text-sm font-semibold text-card-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">Strengths</h3>
              <ul className="space-y-2">
                {laptop.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-success font-bold mt-0.5">✓</span>
                    <span className="text-card-foreground">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">Weaknesses</h3>
              <ul className="space-y-2">
                {laptop.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive font-bold mt-0.5">✗</span>
                    <span className="text-card-foreground">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
