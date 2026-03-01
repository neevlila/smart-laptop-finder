import { useNavigate } from "react-router-dom";
import { Zap, ListChecks, Trophy, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <ListChecks className="h-6 w-6" />,
      title: "Answer 6 Quick Questions",
      description: "Tell us about your gaming habits, budget, and what matters most to you.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Our Algorithm Matches You",
      description: "We score 18+ laptops across performance, portability, battery, and display.",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Get Your Top 3 Picks",
      description: "See exactly why each laptop fits your needs, with a full comparison table.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-14 items-center justify-between">
          <span className="font-display text-lg font-bold text-foreground">
            Smart<span className="text-primary">Purchase</span>
          </span>
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
            Gaming Laptops
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="container py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            AI-Powered Decision Assistant
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            Find the Perfect Gaming Laptop in{" "}
            <span className="text-primary">60 Seconds</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop scrolling through endless reviews. Answer 6 simple questions and get personalized
            recommendations from 18+ gaming laptops under $1,500.
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-hero transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Now <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-muted-foreground mt-4">Free • No sign-up required • Takes 60 seconds</p>
        </div>
      </section>

      {/* How it works */}
      <section className="container pb-20 md:pb-32">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-border bg-card p-6 shadow-card text-center"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                {step.icon}
              </div>
              <div className="absolute -top-3 -left-3 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 SmartPurchase. Decision Assistant for Gaming Laptops.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
