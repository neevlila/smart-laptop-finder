import { useNavigate } from "react-router-dom";
import { Zap, ListChecks, Trophy, ArrowRight, Shield, Sparkles, Monitor, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

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
      description: "We score 28+ laptops across performance, portability, battery, and display.",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Get Your Top 3 Picks",
      description: "See exactly why each laptop fits your needs, with a full comparison table.",
    },
  ];

  const trustBadges = [
    { icon: <Shield className="h-4 w-4" />, text: "Unbiased Recommendations" },
    { icon: <Monitor className="h-4 w-4" />, text: "28+ Laptops Analyzed" },
    { icon: <Zap className="h-4 w-4" />, text: "60 Second Results" },
    { icon: <Users className="h-4 w-4" />, text: "10,000+ Users" },
  ];

  const stats = [
    { value: "28+", label: "Laptops Analyzed" },
    { value: "60s", label: "Average Time" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "₹50K–1.5L", label: "Price Range" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="container py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 text-balance"
            >
              Find the Perfect Gaming Laptop in{" "}
              <span className="text-primary">60 Seconds</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Stop scrolling through endless reviews. Answer 6 simple questions and get personalized
              recommendations from 28+ gaming laptops under ₹1,25,000.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={() => navigate("/quiz")}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-hero transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0 hover:bg-primary/90"
              >
                Start Now 
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
            <p className="text-sm text-muted-foreground mt-4">Free • No sign-up required • Takes 60 seconds</p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-surface px-3 py-1.5 rounded-full border border-border">
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="container pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-xl border border-border bg-card p-4 text-center shadow-card"
              >
                <div className="font-display text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="container pb-20 md:pb-32">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                whileHover={{ y: -5 }}
                className="relative rounded-xl border border-border bg-card p-6 shadow-card text-center transition-shadow hover:shadow-elevated"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -left-3 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
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
    </PageTransition>
  );
};

export default Landing;
