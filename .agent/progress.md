# ResearchPulse Implementation Progress Tracker

## Current Iteration: MVP (Iteration 1)
- [ ] Active Task: Create scrapers interface & feed parser module (RSS, HN RSS, GitHub Trending).

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
- [ ] Create scrapers interface & feed parser module (RSS, HN RSS, GitHub Trending).
- [ ] Create normalization pipeline translating scraper output to standard `sources` and `research_articles` schemas.
- [ ] Add backend endpoints to add/enable/disable sources and trigger ingestion.

### Module 3: Filtering & Scoring (MVP)
- [ ] Implement whitelist/blacklist topic filtering logic.
- [ ] Setup Gemini Provider wrapper implementing `AIProvider` interface.
- [ ] Implement Article Analysis prompt scoring logic (1-10) using Gemini.

### Module 4: Reporting & Scheduling (MVP)
- [ ] Build local scheduler service using `node-cron` to automatically trigger ingest + score cycles.
- [ ] Implement markdown report generator that exports top-scored research to a local output folder.

---

## 🚀 Iteration 2: Full-Fledged (Production Desk)

### Module 5: Cost Optimization & Advanced AI
- [ ] Setup Ollama Provider wrapper for Llama 3.3 / Mistral / Qwen.
- [ ] Implement two-stage AI processing: Ollama cheap filtering -> Gemini deep scoring.
- [ ] Build provider fallback/failover factory controls.

### Module 6: Trend Detection & Secondary Strategic Stage
- [ ] Implement AI trend clustering logic (grouping related stories).
- [ ] Build secondary content strategy prompts (generating LinkedIn posts, short video ideas, hooks, contrarian perspectives).

### Module 7: UI Dashboard & Dashboard Experience
- [ ] Build glassmorphic dashboard interface based on branding guidelines.
- [ ] Implement research feed viewer with interactive sorting, search, filtering by scores, and tag views.
- [ ] Build trend overview section with cluster visualizations.
- [ ] Implement source status overview page (interval tracker, manual trigger).

### Module 8: Multi-channel Integrations
- [ ] Implement Telegram bot delivery service (submitting formatted digests).
- [ ] Implement Notion workspace database integration sync.
- [ ] Add saved search profile configuration.
