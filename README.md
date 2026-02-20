# 🚀 TectorAI Chat Organizer

Transform messy conversations into structured, searchable knowledge blocks using semantic organization.

🔗 Live Demo: [Add Your Deployed Link Here]  
📦 GitHub Repo: [Add Your Repo Link Here]

---

## 📌 Overview

TectorAI Chat Organizer is a web application that ingests raw chat conversations and intelligently organizes them into semantic blocks. Users can then search and filter through structured knowledge for quick retrieval.

This project was built as part of the TectorAI Take-Home Assignment.

---

## ✨ Features

### ✅ Chat Ingestion
- Paste raw conversation text (User / Assistant format)
- Click **"Ingest & Organize"** to process content

### ✅ Semantic Organization
- Automatically groups exchanges into thematic blocks
- Keyword-based scoring system
- Intelligent theme assignment
- Fallback categorization for unmatched content

### ✅ Search Functionality
- Real-time block filtering
- Highlighted keyword matches
- Toggle between filter mode and highlight mode

### ✅ Persistence
- Stores organized data in localStorage
- Automatically restores previous session

### ✅ UI & UX
- Responsive layout
- Smooth animations using Framer Motion
- Clean component structure
- Modern gradient-based theme cards

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|----------|
| React + Vite | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide Icons | UI Icons |
| LocalStorage | Client-side persistence |

---

## 🧠 Architecture Overview

### 1️⃣ Parsing Layer
- Splits raw conversation into structured exchanges
- Converts text into `{ user, assistant }` objects

### 2️⃣ Semantic Scoring Engine
- Scores exchanges against predefined themes
- Assigns best-matching theme
- Groups exchanges into blocks

### 3️⃣ Search Engine
- Filters blocks by query
- Highlights matched text
- Supports dynamic toggling

---

## 📂 Project Structure


src/
├── components/
│ ├── ChatInput.tsx
│ ├── SearchBar.tsx
│ ├── BlocksGrid.tsx
│
├── lib/
│ ├── parseConversation.ts
│ ├── organizeBlocks.ts
│ ├── highlight.ts
│
├── types.ts
├── main.tsx
└── App.tsx


---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/tectorai-chat-organizer.git

# Navigate into the project
cd tectorai-chat-organizer

# Install dependencies
npm install

# Start development server
npm run dev

App runs on:

http://localhost:8080
🚀 Deployment

This project can be deployed easily on:

Vercel

Netlify

Render

Build command:

npm run build
🎯 Key Evaluation Criteria Covered

Clean architecture

Modular component design

Semantic grouping logic

Search optimization

UI polish & animation

State persistence

Error handling

📸 Screenshots

(Add screenshots here after deployment)

👩‍💻 Author

Sruthi Kommati
B.Tech CSE (2026)
Indian Institute of Information Technology Sri City

GitHub: https://github.com/sruthi141

LinkedIn: https://linkedin.com/in/sruthikommati
