import { Block, Exchange } from "@/types";

interface ThemeConfig {
  label: string;
  keywords: string[];
}

const THEMES: ThemeConfig[] = [
  {
    label: "Pricing Strategy",
    keywords: ["price", "pricing", "cost", "tier", "value-based", "plan"],
  },
  {
    label: "Starting Price Points",
    keywords: ["$", "month", "per month", "29", "99", "cac", "ltv", "ratio"],
  },
  {
    label: "Competitor Analysis",
    keywords: ["competitor", "competitors", "similarweb", "g2", "capterra", "spreadsheet", "positioning"],
  },
  {
    label: "Free Trial Strategy",
    keywords: ["free trial", "trial", "freemium", "14-day", "30-day", "credit card"],
  },
  {
    label: "Sales Team Building",
    keywords: ["sales team", "sdr", "ae", "vp of sales", "founder-led", "arr", "hiring"],
  },
];

function scoreExchange(exchange: Exchange, theme: ThemeConfig): number {
  const text = (exchange.user.content + " " + exchange.assistant.content).toLowerCase();
  return theme.keywords.reduce((score, kw) => {
    return score + (text.includes(kw.toLowerCase()) ? 1 : 0);
  }, 0);
}

export function categorizeExchanges(exchanges: Exchange[]): Block[] {
  if (exchanges.length === 0) return [];

  // Score each exchange against each theme
  const assignments: { exchange: Exchange; theme: string; score: number; keywords: string[] }[] = [];

  for (const ex of exchanges) {
    let bestTheme = "";
    let bestScore = 0;
    let bestKeywords: string[] = [];

    for (const theme of THEMES) {
      const score = scoreExchange(ex, theme);
      if (score > bestScore) {
        bestScore = score;
        bestTheme = theme.label;
        bestKeywords = theme.keywords.filter((kw) =>
          (ex.user.content + " " + ex.assistant.content).toLowerCase().includes(kw.toLowerCase())
        );
      }
    }

    assignments.push({
      exchange: ex,
      theme: bestTheme || "General Discussion",
      score: bestScore,
      keywords: bestKeywords,
    });
  }

  // Group by theme
  const grouped = new Map<string, { exchanges: Exchange[]; keywords: Set<string> }>();
  for (const a of assignments) {
    if (!grouped.has(a.theme)) {
      grouped.set(a.theme, { exchanges: [], keywords: new Set() });
    }
    const g = grouped.get(a.theme)!;
    g.exchanges.push(a.exchange);
    a.keywords.forEach((k) => g.keywords.add(k));
  }

  let blocks: Block[] = Array.from(grouped.entries()).map(([theme, data], i) => ({
    id: `block-${i}`,
    theme,
    exchanges: data.exchanges,
    keywords: Array.from(data.keywords),
  }));

  // Ensure 4-5 blocks
  if (blocks.length < 4) {
    // Split largest blocks
    while (blocks.length < 4) {
      const largest = blocks.reduce((a, b) => (a.exchanges.length > b.exchanges.length ? a : b));
      if (largest.exchanges.length <= 1) break;
      const mid = Math.ceil(largest.exchanges.length / 2);
      const newBlock: Block = {
        id: `block-${blocks.length}`,
        theme: largest.theme + " (cont.)",
        exchanges: largest.exchanges.slice(mid),
        keywords: largest.keywords,
      };
      largest.exchanges = largest.exchanges.slice(0, mid);
      blocks.push(newBlock);
    }
  }

  if (blocks.length > 5) {
    // Merge smallest blocks
    while (blocks.length > 5) {
      blocks.sort((a, b) => a.exchanges.length - b.exchanges.length);
      const smallest = blocks.shift()!;
      blocks[0].exchanges.push(...smallest.exchanges);
      blocks[0].keywords = [...new Set([...blocks[0].keywords, ...smallest.keywords])];
    }
  }

  // Re-assign IDs
  return blocks.map((b, i) => ({ ...b, id: `block-${i}` }));
}
