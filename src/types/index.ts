export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Exchange {
  user: Message;
  assistant: Message;
}

export interface Block {
  id: string;
  theme: string;
  exchanges: Exchange[];
  keywords: string[];
}

export type SearchMode = "filter" | "highlight";

export interface SearchResult {
  filteredBlocks: Block[];
  matchCount: number;
  totalBlocks: number;
}

export interface AppState {
  inputText: string;
  blocks: Block[];
  searchQuery: string;
  searchMode: SearchMode;
}
