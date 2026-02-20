import { motion } from "framer-motion";
import { Tag, User, Bot } from "lucide-react";
import { Block } from "@/types";
import React from "react";

interface BlockCardProps {
  block: Block;
  index: number;
  searchQuery: string;
  highlightText: (text: string, query: string) => React.ReactNode;
}

const themeColors: Record<string, string> = {
  "Pricing Strategy": "from-primary/20 to-primary/5 border-primary/30",
  "Starting Price Points": "from-accent/20 to-accent/5 border-accent/30",
  "Competitor Analysis": "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  "Free Trial Strategy": "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  "Sales Team Building": "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
};

export default function BlockCard({ block, index, searchQuery, highlightText }: BlockCardProps) {
  const colorClass = themeColors[block.theme] || "from-primary/20 to-primary/5 border-primary/30";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -4 }}
      className={`overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm ${colorClass}`}
    >
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <h3 className="text-base font-bold">
            {searchQuery ? highlightText(block.theme, searchQuery) : block.theme}
          </h3>
          <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            {block.exchanges.length} exchange{block.exchanges.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="space-y-3">
          {block.exchanges.map((ex, i) => (
            <div key={i} className="space-y-2">
              <div className="flex gap-2">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm">
                  {searchQuery ? highlightText(ex.user.content, searchQuery) : ex.user.content}
                </p>
              </div>
              <div className="flex gap-2">
                <Bot className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? highlightText(ex.assistant.content, searchQuery) : ex.assistant.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        {block.keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {block.keywords.slice(0, 5).map((kw) => (
              <span
                key={kw}
                className="rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
