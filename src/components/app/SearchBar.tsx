import { Search, Filter, Highlighter, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchMode } from "@/types";
import { motion } from "framer-motion";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  mode: SearchMode;
  onModeChange: (m: SearchMode) => void;
  matchCount: number;
  totalBlocks: number;
}

export default function SearchBar({
  query,
  onQueryChange,
  mode,
  onModeChange,
  matchCount,
  totalBlocks,
}: SearchBarProps) {
  const showing = mode === "filter" ? matchCount : totalBlocks;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-3"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.history.back()}
        className="w-fit gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search blocks..."
            className="pl-10 bg-card"
            aria-label="Search organized blocks"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-lg border border-border">
            <Button
              variant={mode === "filter" ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange("filter")}
              className="gap-1.5 rounded-none"
              aria-label="Filter mode"
            >
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <Button
              variant={mode === "highlight" ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange("highlight")}
              className="gap-1.5 rounded-none"
              aria-label="Highlight mode"
            >
              <Highlighter className="h-3.5 w-3.5" />
              Highlight
            </Button>
          </div>

          <span className="whitespace-nowrap text-xs text-muted-foreground">
            Showing {showing} of {totalBlocks} blocks
          </span>
        </div>
      </div>
    </motion.div>
  );
}