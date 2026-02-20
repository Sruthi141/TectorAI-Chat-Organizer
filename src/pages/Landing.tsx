import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, Search, Layers, ArrowRight, Zap, MessageSquare, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  {
    icon: Brain,
    title: "Smart Categorization",
    description: "Automatically groups conversations into semantic blocks using intelligent keyword matching.",
  },
  {
    icon: Search,
    title: "Instant Search",
    description: "Filter or highlight blocks with real-time search. Toggle between filter and highlight modes.",
  },
  {
    icon: Layers,
    title: "Visual Organization",
    description: "Beautiful card-based layout with clear theme labels, making conversations scannable.",
  },
  {
    icon: Zap,
    title: "Persistent State",
    description: "Your work is saved automatically. Come back anytime and pick up where you left off.",
  },
];

const steps = [
  { num: "01", title: "Paste", description: "Drop your conversation into the text area" },
  { num: "02", title: "Organize", description: "Click 'Ingest & Organize' to categorize" },
  { num: "03", title: "Search", description: "Find exactly what you need instantly" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              AI-Powered Chat Intelligence
            </div>
            <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
              <span className="gradient-text">TectorAI</span>
              <br />
              <span className="text-foreground">Chat Organizer</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Transform messy conversations into structured, searchable knowledge blocks.
              Paste, organize, and find what matters — in seconds.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="gap-2 px-8 text-base font-semibold"
                onClick={() => navigate("/app?demo=true")}
              >
                <MessageSquare className="h-5 w-5" />
                Try the Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 text-base font-semibold"
                onClick={() => navigate("/app")}
              >
                Open App
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Powerful Features
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                className="glass-card p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <f.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold"
          >
            How It Works
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto flex max-w-4xl flex-col gap-8 md:flex-row"
          >
            {steps.map((s) => (
              <motion.div key={s.num} variants={item} className="flex-1 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-black text-primary">
                  {s.num}
                </div>
                <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glow-primary mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">tectorai-organizer</span>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3">
              {["Pricing Strategy", "Competitor Analysis", "Sales Team"].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="rounded-lg border border-border bg-secondary/50 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Grid3X3 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-muted" />
                    <div className="h-2 w-3/4 rounded bg-muted" />
                    <div className="h-2 w-1/2 rounded bg-muted" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2 font-semibold text-foreground">TectorAI Chat Organizer</p>
          <p>Built with React · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Deployment
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
