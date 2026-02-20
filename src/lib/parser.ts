import { Exchange, Message } from "@/types";

export function parseConversation(text: string): Exchange[] {
  const lines = text.split("\n").filter((l) => l.trim());
  const messages: Message[] = [];

  let currentRole: "user" | "assistant" | null = null;
  let currentContent = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("User:")) {
      if (currentRole && currentContent) {
        messages.push({ role: currentRole, content: currentContent.trim() });
      }
      currentRole = "user";
      currentContent = trimmed.replace(/^User:\s*/, "");
    } else if (trimmed.startsWith("Assistant:")) {
      if (currentRole && currentContent) {
        messages.push({ role: currentRole, content: currentContent.trim() });
      }
      currentRole = "assistant";
      currentContent = trimmed.replace(/^Assistant:\s*/, "");
    } else {
      currentContent += " " + trimmed;
    }
  }

  if (currentRole && currentContent) {
    messages.push({ role: currentRole, content: currentContent.trim() });
  }

  const exchanges: Exchange[] = [];
  for (let i = 0; i < messages.length - 1; i += 2) {
    if (messages[i].role === "user" && messages[i + 1]?.role === "assistant") {
      exchanges.push({ user: messages[i], assistant: messages[i + 1] });
    }
  }

  return exchanges;
}
