import { motion } from "framer-motion";

export default function SkeletonCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-muted animate-pulse" />
            <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-full rounded bg-muted animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-muted animate-pulse" />
            <div className="h-3 w-4/6 rounded bg-muted animate-pulse" />
            <div className="h-3 w-full rounded bg-muted animate-pulse" />
            <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
