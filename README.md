# 🚀 Chat Organizer

A semantic chat organization tool that transforms raw conversations into structured, searchable knowledge blocks.

---

## 📌 Overview

Chat Organizer is a frontend web application that ingests unstructured conversations written in a `User:` / `Assistant:` format and organizes them into meaningful semantic blocks.

The application focuses on:
- Clean parsing logic
- Intelligent keyword-based semantic grouping
- Real-time search functionality
- Smooth, modern UI with animations
- Client-side persistence

This project was built as part of a take-home assignment to demonstrate frontend architecture, logical thinking, and UI/UX polish.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/chat-organizer.git
cd chat-organizer
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

### 4️⃣ Open in Browser

```
http://localhost:8080
```

---

## 🧠 How It Works

### 1️⃣ Parsing Layer

The application expects conversations in the following format:

```
User: Question here
Assistant: Answer here
```

#### Parsing Process:
- The raw input is split using the `User:` marker
- Each `User` message is paired with the next `Assistant` response
- Converted into structured exchange objects:

```ts
{
  id: string;
  user: string;
  assistant: string;
}
```

This structured format enables reliable semantic processing.

---

### 2️⃣ Semantic Grouping Engine

Instead of simple text splitting, the application performs intelligent grouping using a keyword-based scoring system.

#### Process:

1. Predefined themes include:
   - Theme name
   - Associated keywords
   - UI styling properties

2. Each exchange is:
   - Scored based on keyword matches
   - Assigned to the highest-scoring theme
   - Given a fallback category if no strong match exists

3. Exchanges with similar themes are grouped into semantic blocks.

This creates meaningful knowledge clusters rather than simple chronological groupings.

---

### 3️⃣ Search Engine

The search system supports two modes:

#### 🔍 Filter Mode
- Displays only blocks containing the search query
- Updates in real-time

#### ✨ Highlight Mode
- Displays all blocks
- Highlights matched keywords inside content
- Case-insensitive matching

This improves usability for quick knowledge retrieval.

---

### 4️⃣ Persistence

To enhance user experience:

- Application state is stored in `localStorage`
- Automatically restores:
  - Input text
  - Organized blocks
  - Search query
  - Selected search mode
- No backend required

---

## 🏗️ Architecture Overview

```
Raw Conversation Input
        ↓
Parsing Layer
        ↓
Structured Exchange Objects
        ↓
Keyword Scoring Engine
        ↓
Thematic Block Grouping
        ↓
Search Layer (Filter / Highlight)
        ↓
UI Rendering
```

---

## 🛠️ Tech Stack

- **React + Vite** — Frontend framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — UI animations
- **Lucide Icons** — Clean icon set
- **LocalStorage** — Client-side persistence

---

## 🎯 Key Features

- Semantic conversation grouping
- Intelligent keyword scoring
- Real-time search
- Highlight functionality
- Session persistence
- Responsive layout
- Smooth animated UI
- Clean modular architecture

---

## ⏱️ Time Spent

Approximately **4–5 hours**, including:

- Parsing logic implementation
- Semantic grouping engine
- Search & highlight logic
- UI development & animations
- Testing and refinements

---

## 🚀 Future Improvements

If given more time, I would:

- Implement embedding-based semantic similarity (vector search)
- Integrate OpenAI API for true semantic clustering
- Add drag-and-drop block reordering
- Enable exporting blocks (JSON / Markdown)
- Add unit and integration testing
- Improve theme classification using NLP techniques
- Add backend persistence option

---

## 👩‍💻 Author

**Sruthi Kommati**  
B.Tech CSE (2026)  
Indian Institute of Information Technology Sri City  

GitHub: https://github.com/sruthi141  
LinkedIn: https://linkedin.com/in/sruthikommati