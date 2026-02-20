import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, AlertCircle, FileText, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Block, SearchMode } from "@/types";
import { parseConversation } from "@/lib/parser";
import { categorizeExchanges } from "@/lib/categorizer";
import { searchBlocks, highlightText } from "@/lib/search";
import { saveState, loadState, clearState } from "@/lib/storage";
import { SAMPLE_CONVERSATION } from "@/lib/sampleData";

import { ThemeToggle } from "@/components/theme-toggle";
import SearchBar from "@/components/app/SearchBar";
import BlockCard from "@/components/app/BlockCard";
import SkeletonCards from "@/components/app/SkeletonCards";

export default function AppPage() {
  const [searchParams] = useSearchParams();

  const [inputText, setInputText] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("filter");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasOrganized, setHasOrganized] = useState(false);

  // Load persisted state
  useEffect(() => {
    const saved = loadState();
    if (!saved) return;

    setInputText(saved.inputText ?? "");
    setBlocks(saved.blocks ?? []);
    setSearchQuery(saved.searchQuery ?? "");
    setSearchMode(saved.searchMode ?? "filter");
    if ((saved.blocks ?? []).length > 0) setHasOrganized(true);
  }, []);

  const organize = useCallback(
    (text?: string) => {
      const source = text ?? inputText;

      if (!source.trim()) {
        setError("Please paste a conversation before organizing.");
        return;
      }

      setError("");
      setIsLoading(true);

      setTimeout(() => {
        const exchanges = parseConversation(source);

        if (exchanges.length === 0) {
          setError(
            "Could not parse any exchanges. Use the format: User: ... Assistant: ..."
          );
          setIsLoading(false);
          return;
        }

        const organized = categorizeExchanges(exchanges);
        setBlocks(organized);
        setHasOrganized(true);
        setIsLoading(false);
      }, 400);
    },
    [inputText]
  );

  // Demo mode (?demo=true)
  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      setInputText(SAMPLE_CONVERSATION);
      organize(SAMPLE_CONVERSATION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist state
  useEffect(() => {
    if (hasOrganized || inputText) {
      saveState({ inputText, blocks, searchQuery, searchMode });
    }
  }, [inputText, blocks, searchQuery, searchMode, hasOrganized]);

  const handleReset = () => {
    setInputText("");
    setBlocks([]);
    setSearchQuery("");
    setSearchMode("filter");
    setError("");
    setHasOrganized(false);
    clearState();
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_CONVERSATION);
    organize(SAMPLE_CONVERSATION);
  };

  const handleCopySample = async () => {
    await navigator.clipboard.writeText(SAMPLE_CONVERSATION);
  };

  const { filteredBlocks, matchCount, totalBlocks } = searchBlocks(
    blocks,
    searchQuery,
    searchMode
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-black md:text-4xl">
            <span className="gradient-text">TectorAI</span>{" "}
            <span className="text-foreground">Chat Organizer</span>
          </h1>
          <p className="text-muted-foreground">
            Paste a conversation, organize it into semantic blocks, and search
            through them.
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setError("");
            }}
            placeholder={
              "User: How do I price my SaaS product?\nAssistant: Consider these pricing strategies...\nUser: What about competitor analysis?\nAssistant: Research your competitors by..."
            }
            className="mb-4 min-h-[180px] resize-y bg-card font-mono text-sm"
            aria-label="Paste your conversation here"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => organize()}
              disabled={isLoading}
              className="gap-2 font-semibold"
              size="lg"
            >
              <Sparkles className="h-5 w-5" />
              {isLoading ? "Organizing..." : "Ingest & Organize"}
            </Button>

            <Button
              onClick={handleLoadSample}
              variant="secondary"
              size="lg"
              className="gap-2"
              disabled={isLoading}
            >
              <FileText className="h-4 w-4" />
              Sample Input
            </Button>

            <Button
              onClick={handleCopySample}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Sample
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </motion.div>

        {/* Search & Blocks */}
        {(hasOrganized || isLoading) && (
          <>
            {!isLoading && blocks.length > 0 && (
              <SearchBar
                query={searchQuery}
                onQueryChange={setSearchQuery}
                mode={searchMode}
                onModeChange={setSearchMode}
                matchCount={matchCount}
                totalBlocks={totalBlocks}
              />
            )}

            {isLoading ? (
              <SkeletonCards />
            ) : (
              <motion.div layout className="grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filteredBlocks.map((block, i) => (
                    <BlockCard
                      key={block.id}
                      block={block}
                      index={i}
                      searchQuery={searchMode === "highlight" ? searchQuery : ""}
                      highlightText={highlightText}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!isLoading && filteredBlocks.length === 0 && searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-muted-foreground"
              >
                No blocks match "{searchQuery}"
              </motion.p>
            )}
          </>
        )}
      </div>
    </div>
  );
}