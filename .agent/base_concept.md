For your use case, I would not build this as a simple cron script. I'd build it as a modular research platform because you'll quickly want to add sources, prompts, scoring logic, and AI providers without changing code.

## High-Level Architecture

```text
┌────────────────────────────────────┐
│          Admin Config UI           │
│   (Vite + Redux Toolkit / RTK)     │
│  - Select DB (Postgres / MongoDB)  │
│  - Input connection keys & tokens  │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│    Database Layer (Configurable)   │
│       [PostgreSQL or MongoDB]      │
│                                    │
│ Sources        │ Topics            │
│ AI Providers   │ System Configs    │
│ Research Jobs  │ Research Results  │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│     Express Backend API Service    │
│      (Node.js + TS + Express)      │
│  - Route Handlers & Controllers    │
│  - Db Adapter Factory              │
│  - Scheduler (node-cron)           │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│       Source Fetching Layer        │
├────────────────────────────────────┤
│ RSS                                │
│ HackerNews                         │
│ Reddit                             │
│ GitHub Trending                    │
│ Custom APIs                        │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│     Normalization Pipeline         │
├────────────────────────────────────┤
│ Title                              │
│ Description                        │
│ URL                                │
│ Source                             │
│ Published Date                     │
│ Metadata                           │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│       Topic Filtering Layer        │
├────────────────────────────────────┤
│ Whitelist                          │
│ Blacklist                          │
│ Regex Rules                        │
│ Duplicate Removal                  │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│         AI Research Engine         │
├────────────────────────────────────┤
│ Gemini                             │
│ Ollama (Llama local)               │
│ OpenAI (future)                    │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│      Research & Scoring Layer      │
├────────────────────────────────────┤
│ Relevance Score                    │
│ Viral Score                        │
│ Dev Impact                         │
│ Indian Impact                      │
│ Visual Potential                   │
│ Hook Generation                    │
└───────────────┬────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│        Report Generation           │
├────────────────────────────────────┤
│ Markdown                           │
│ HTML                               │
│ CSV                                │
│ Telegram                           │
│ WhatsApp                           │
│ Notion                             │
└────────────────────────────────────┘
```

---

# Suggested Folder Structure

```text
auto-research/
├── backend/                        # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.config.ts        # Dynamic database connection setup
│   │   │   ├── ai.config.ts
│   │   │   └── scheduler.config.ts
│   │   ├── database/
│   │   │   ├── repository.interface.ts # Interface defining standard operations
│   │   │   ├── postgres/           # PostgreSQL Schema, Prisma client, Repos
│   │   │   │   ├── prisma/
│   │   │   │   └── pg-repo.ts
│   │   │   └── mongodb/            # MongoDB Schemas, Mongoose models, Repos
│   │   │       ├── models/
│   │   │       └── mongo-repo.ts
│   │   ├── modules/
│   │   │   ├── sources/
│   │   │   ├── ai/
│   │   │   ├── filtering/
│   │   │   ├── scoring/
│   │   │   └── reporting/
│   │   ├── scheduler/
│   │   ├── routes/                 # Express REST API routes
│   │   │   ├── config.routes.ts    # Config endpoint (updates keys/db info)
│   │   │   ├── sources.routes.ts
│   │   │   └── research.routes.ts
│   │   ├── middleware/             # Express middlewares
│   │   └── app.ts                  # Express Application setup & bootstrap
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/                       # Vite + React + Redux + TypeScript Frontend
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx
    │   ├── store/                  # Redux Toolkit (RTK) Store Setup
    │   │   ├── store.ts
    │   │   └── slices/             # Redux state slices
    │   │       ├── configSlice.ts  # Database settings & Key management
    │   │       ├── sourceSlice.ts  # Research sources state
    │   │       └── researchSlice.ts# Research results state
    │   ├── services/               # RTK Query APIs
    │   │   └── api.ts              # RTK Query backend communication
    │   ├── components/             # Reusable UI Components
    │   │   ├── ConfigForm.tsx      # DB/Keys configuration form
    │   │   ├── SourceManager.tsx   # Sources manager
    │   │   └── ResearchDashboard.tsx # Results viewer
    │   └── styles/
    │       └── index.css           # Styling
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

---

# Database Design

Since the platform supports both **PostgreSQL** (relational) and **MongoDB** (document-based), the data structures are mapped below for both environments. 

Additionally, a dynamic config system stores system keys and configurations in the active database or local config, allowing users to enter keys and toggle database options from the config UI.

---

## system_configs
Stores application-wide settings, active DB type, connection credentials, and third-party API keys.

### PostgreSQL (SQL)
```sql
CREATE TABLE system_configs (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB (Mongoose Schema)
```ts
const SystemConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  updated_at: { type: Date, default: Date.now }
});
```

---

## sources

### PostgreSQL (SQL)
```sql
CREATE TABLE sources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  url VARCHAR(1024),
  enabled BOOLEAN DEFAULT TRUE,
  interval_minutes INTEGER DEFAULT 60,
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB (Mongoose Schema)
```ts
const SourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String },
  enabled: { type: Boolean, default: true },
  interval_minutes: { type: Number, default: 60 },
  priority: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
});
```

---

## topic_rules

### PostgreSQL (SQL)
```sql
CREATE TABLE topic_rules (
  id SERIAL PRIMARY KEY,
  source_id INTEGER REFERENCES sources(id) ON DELETE CASCADE,
  whitelist_keywords TEXT[],
  blacklist_keywords TEXT[],
  enabled BOOLEAN DEFAULT TRUE
);
```

### MongoDB (Mongoose Schema)
```ts
const TopicRuleSchema = new mongoose.Schema({
  source_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
  whitelist_keywords: [{ type: String }],
  blacklist_keywords: [{ type: String }],
  enabled: { type: Boolean, default: true }
});
```

---

## ai_providers

### PostgreSQL (SQL)
```sql
CREATE TABLE ai_providers (
  id SERIAL PRIMARY KEY,
  provider VARCHAR(50) NOT NULL,
  active BOOLEAN DEFAULT FALSE,
  model VARCHAR(100) NOT NULL,
  api_key VARCHAR(512)
);
```

### MongoDB (Mongoose Schema)
```ts
const AIProviderSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  active: { type: Boolean, default: false },
  model: { type: String, required: true },
  api_key: { type: String }
});
```

---

# AI Provider Toggle

Create common interface

```ts
export interface AIProvider {
  generate(prompt: string): Promise<string>;
}
```

Gemini

```ts
class GeminiProvider implements AIProvider {}
```

Ollama

```ts
class OllamaProvider implements AIProvider {}
```

Factory

```ts
const provider = ProviderFactory.getActiveProvider();
```

Then your pipeline never knows which AI is running.

---

# Local Llama Recommendation

Do not run raw Llama.

Run through:

Ollama

```bash
ollama run llama3.3
```

Advantages:

* No API cost
* Easy model switching
* Local inference
* REST API available

```bash
POST http://localhost:11434/api/generate
```

Node can consume it directly.

---

# Research Prompt

For each article:

```text
You are a content research analyst.

Analyze this article.

Return JSON only.

{
 "summary":"",
 "developerImpact":"",
 "indiaImpact":"",
 "viralScore":0,
 "visualPotential":0,
 "hook":"",
 "tags":[]
}

Article:
{{content}}
```

---

# Secondary Research Stage

After scoring 50 articles:

```text
You are a senior content strategist.

Select only articles scoring 8 or higher.

For each selected article provide:

- Why it matters
- Who it impacts
- Content angle
- Contrarian angle
- Short video idea
- LinkedIn post idea
- Newsletter idea

Return JSON.
```

This two-stage approach saves tokens.

---

# Interactive Article Chat & Deep Research

To allow users to dive deeper into specific articles:

## Article Chat
* **Chat Initialization**: When a user wants to discuss an article, generate a unique `chat_id` and associate it with the `article_id`.
* **State Persistence**: This allows users to start, leave, and resume conversations about a specific article without losing context.
* **Model Selection**: The chat panel will open using the currently selected AI model (Gemini or Ollama).

## Deep Research Mode
* **Trigger**: Provide a "Deep Research" button within the article or chat view.
* **Mechanism**:
  * AI generates targeted search keywords and builds a temporary Knowledge Base (KB) around the article.
  * The system performs automated web searches based on these keywords.
* **Controlled Research**:
  * Users can manually add new sources or specific URLs.
  * The AI will run another controlled research loop against these user-provided sources to enrich the findings.

---

# Output Table

Generate markdown automatically:

```md
| Topic | Source | Viral Score | Why Hot | Hook |
|---------|---------|---------|---------|---------|
| Next.js 16 Routing | HackerNews | 9 | Impacts SSR performance | Stop building routes the old way |
| Gemini Release | GitHub | 8 | New AI capabilities | Google quietly changed AI again |
```

---

# Premium Upgrade (Worth Adding)

Instead of only scoring individual posts:

Create a trend clustering stage.

Example:

```text
Article A:
Gemini 3 Released

Article B:
Open Source Gemini Alternative

Article C:
Developers Migrating to Gemini
```

AI groups them into:

```text
Trend:
"Rapid Shift Toward Gemini Ecosystem"

Strength: 9.5
Articles: 3
```

This is much more valuable than headline aggregation because it identifies emerging narratives.

---

# Tech Stack I'd Use

### Frontend (Vite App)
* **Framework**: React + TypeScript
* **State Management**: Redux + Redux Toolkit (RTK)
* **Data Fetching**: RTK Query (efficient caching and backend synching)
* **Build Tool**: Vite (extremely fast development and build times)
* **Styling**: Vanilla CSS (highly customizable, responsive, modern glassmorphism)

### Backend (Lightweight Node)
* **Runtime**: Node.js + TypeScript
* **Framework**: Express (lightweight, minimal HTTP web framework)
* **ORM/ODM Layers**:
  * **Prisma** (for PostgreSQL connection and mapping)
  * **Mongoose** (for MongoDB schema and connections)
* **Design Pattern**: Repository Pattern (abstracts database operations so either SQL/NoSQL backend can be used interchangeably based on user configuration)

### Database Options (User Configurable)
* **PostgreSQL**: Relational option using connection strings (supported by Prisma).
* **MongoDB**: Document option using Mongo URI (supported by Mongoose).

### Configuration & Keys (Configured via Frontend Config Form)
* `DB_TYPE` (`postgres` | `mongodb`)
* `PG_CONNECTION_STRING` (e.g. `postgresql://user:password@localhost:5432/db`)
* `MONGO_CONNECTION_STRING` (e.g. `mongodb+srv://...`)
* `GEMINI_API_KEY`
* `OLLAMA_HOST` (e.g. `http://localhost:11434`)
* `OPENAI_API_KEY` (future extension)

### Scheduling
* **Scheduler**: `node-cron` (lightweight process-internal scheduler instead of heavier BullMQ + Redis requirement)

### AI Provider Layer
* **Gemini** (Pro modeling for refined analysis)
* **Ollama (Llama 3.3)** (Local offline inference for cheap first-stage filtering)

### Parsing & Scraping
* **RSS Parser**
* **Cheerio**
* **Axios**

### Output Channels
* **Markdown**
* **Telegram**
* **Notion**
* **Email Digest**

For your specific goal (daily content research for developer-focused content), I would prioritize:

1. Setting up the Vite + RTK config UI to input database connection details and API keys.
2. Building the Express backend to save configuration, bootstrap database adapters (Postgres/Mongo) dynamically, and test connections.
3. Implementing the RSS/HN/GitHub scrapers.
4. Using Ollama/Llama locally for initial cheap filtering, followed by Gemini for shortlisted articles.
5. Emitting to Markdown, Notion, or Telegram.

This keeps operational and AI costs extremely low while offering full PostgreSQL vs MongoDB configuration freedom.
