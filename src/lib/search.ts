import { Block, SearchMode, SearchResult } from "@/types";
import React from "react";

function blockMatchesQuery(block: Block, query: string): boolean {
  const q = query.toLowerCase();
  if (block.theme.toLowerCase().includes(q)) return true;
  return block.exchanges.some(
    (ex) =>
      ex.user.content.toLowerCase().includes(q) ||
      ex.assistant.content.toLowerCase().includes(q)
  );
}

export function searchBlocks(
  blocks: Block[],
  query: string,
  mode: SearchMode
): SearchResult {
  if (!query.trim()) {
    return { filteredBlocks: blocks, matchCount: blocks.length, totalBlocks: blocks.length };
  }

  if (mode === "filter") {
    const filtered = blocks.filter((b) => blockMatchesQuery(b, query));
    return { filteredBlocks: filtered, matchCount: filtered.length, totalBlocks: blocks.length };
  }

  // Highlight mode — return all blocks, matching ones will be highlighted in UI
  const matchCount = blocks.filter((b) => blockMatchesQuery(b, query)).length;
  return { filteredBlocks: blocks, matchCount, totalBlocks: blocks.length };
}

export function highlightText(
  text: string,
  query: string
): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    i % 2 === 1
      ? React.createElement(
          "mark",
          {
            key: i,
            className:
              "bg-accent/30 text-accent-foreground rounded px-0.5 font-semibold",
          },
          part
        )
      : part
  );
}
