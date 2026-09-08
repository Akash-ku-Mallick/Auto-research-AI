# ResearchPulse Implementation Progress Tracker

## Current Iteration: Iteration 3 (Refinement & Backend Integration)
- [x] Active Task: Redesign UI to match Popsters dashboard reference layout in Light Mode with high-performance 3-column architecture.
- [ ] Next Task: Wire Right Panel Watchlist and 6 Mini Analytics Charts to real backend analytics endpoints.

---

## 📋 Iteration 1: MVP (Core Pipeline)

### Module 1: Infrastructure & Configuration (MVP)
- [x] Setup repository directories (`backend/` and `frontend/`) and configuration files (`package.json`, `tsconfig.json`, `.env.example`).
- [x] Implement Express backend server boilerplate in TypeScript.
- [x] Create repository interfaces (`repository.interface.ts`) to decouple DB implementations.
- [x] Implement PostgreSQL repository setup (Prisma models & client).
- [x] Implement MongoDB repository setup (Mongoose schemas & models).
- [x] Implement database factory (`db.config.ts`) to dynamically boot the database adapter based on config.
- [x] Setup Frontend Vite React app with Redux Toolkit (RTK) and RTK Query (`store.ts`, `api.ts`).
- [x] Build configuration UI (`ConfigForm.tsx`) to enter and test database credentials, saving them in `system_configs`.

### Module 2: Ingestion & Scrapers (MVP)
- [x] Create scrapers interface & feed parser module (RSS, HN RSS, GitHub Trending).
- [x] Create normalization pipeline translating scraper output to standard `sources` and `research_articles` schemas.
- [x] Add backend endpoints to add/enable/disable sources and trigger ingestion.

### Module 3: Filtering & Scoring (MVP)
- [x] Implement whitelist/blacklist topic filtering logic.
- [x] Setup Gemini Provider wrapper implementing `AIProvider` interface.
- [x] Implement Article Analysis prompt scoring logic (1-10) using Gemini.

### Module 4: Reporting & Scheduling (MVP)
- [x] Build local scheduler service using `node-cron` to automatically trigger ingest + score cycles.
- [x] Implement markdown report generator that exports top-scored research to a local output folder.

---

## 🚀 Iteration 2: Full-Fledged (Production Desk)

### Module 5: Cost Optimization & Advanced AI
- [x] Setup Ollama Provider wrapper for Llama 3.3 / Mistral / Qwen.
- [x] Implement two-stage AI processing: Ollama cheap filtering -> Gemini deep scoring.
- [x] Build provider fallback/failover factory controls.

### Module 6: Trend Detection & Secondary Strategic Stage
- [x] Implement AI trend clustering logic (grouping related stories).
- [x] Build secondary content strategy prompts (generating LinkedIn posts, short video ideas, hooks, contrarian perspectives).

### Module 7: UI Overhaul & Dashboard Experience
- [x] Redesign UI to match Popsters dashboard reference layout (Light Mode default, dark gradient sidebar, 3-column architecture, high performance Recharts).
- [x] Implement memoized `ArticleCard.tsx` with drag-and-drop cover image, metrics pills, score breakdown, and content strategy triggers.
- [x] Build `RightPanel.tsx` with analyzed sources watchlist, statistics tabs, smooth monotone AreaChart, and 6 mini analytics charts.
- [x] Upgrade `Sidebar.tsx` with sources counters, run history, and bottom AI provider toggle.

### Module 8: Multi-channel Integrations
- [ ] Implement Telegram bot delivery service (submitting formatted digests).
- [ ] Implement Notion workspace database integration sync.
- [ ] Add saved search profile configuration.

---

## ⚡ Iteration 3: Component Refinement & Architecture Integration

### Module 9: Right Panel & Analytics API Integration
- [ ] Connect Right Panel Analyzed Sources Watchlist to live backend API (saving watchlists, fetching real source item counts & top scores).
- [ ] Connect Right Panel 6 mini analytics charts to real aggregated backend analytics endpoints (hits by source, publish hour distribution, cluster momentum, dev impact by source, India impact by day).
- [ ] Implement backend image storage endpoint for persisting custom uploaded cover images.
- [ ] Refine Date Range Picker filter (`24/07/2026 - 29/07/2026`) in backend SQL/Mongo queries to filter research feed by custom date windows.
- [ ] Implement export/download functionality for generated Reports (`Reports` button in Right Panel header).
