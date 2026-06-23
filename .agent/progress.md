# ResearchPulse Implementation Progress Tracker

## Current Iteration: Iteration 2 (Full-Fledged)
- [ ] Active Task: Implement two-stage AI processing: Ollama cheap filtering -> Gemini deep scoring.

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
- [ ] Build secondary content strategy prompts (generating LinkedIn posts, short video ideas, hooks, contrarian perspectives).

### Module 7: UI Dashboard & Dashboard Experience
- [x] Build glassmorphic dashboard interface based on branding guidelines.
- [x] Implement research feed viewer with interactive sorting, search, filtering by scores, and tag views.
- [x] Build trend overview section with cluster visualizations.
- [x] Implement source status overview page (interval tracker, manual trigger).

### Module 8: Multi-channel Integrations
- [ ] Implement Telegram bot delivery service (submitting formatted digests).
- [ ] Implement Notion workspace database integration sync.
- [ ] Add saved search profile configuration.
