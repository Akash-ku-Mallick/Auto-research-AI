# ResearchPulse Landing Page Agent Directive & Technical Specification

## 🚀 Core App Concept: ResearchPulse
**ResearchPulse** is an enterprise-grade, AI-driven content research and trend intelligence platform designed for developers, technical founders, and content strategists. It automates multi-channel content scraping (RSS, HackerNews, GitHub Trending, Reddit), filters noise using a cost-efficient **2-Stage AI Engine** (Local Ollama/Llama 3.3 for fast cheap filtering + Gemini Pro for deep viral scoring & analysis), clusters emerging developer narratives, and generates multi-format content blueprints (LinkedIn posts, video hooks, newsletters, Telegram digests, Notion sync).

---

## 🎨 Design System, Glassmorphism & Animated Gradient Blobs

### 1. Custom Ambient Gradient Blobs & Background Mesh
- **Base Ambient Gradient**:
  ```css
  background: linear-gradient(90deg, hsla(179, 83%, 64%, 1) 0%, hsla(338, 75%, 64%, 1) 50%, hsla(14, 92%, 86%, 1) 100%);
  ```
- **Blob Implementation**:
  - Rendered in a fixed global component (`AmbientBackground.tsx`) positioned behind all routes.
  - Features organic floating blobs/shapes using **Framer Motion** (`motion.div` floating translate, rotation, and gentle scale pulsing).
  - Ultra-heavy gaussian blur (`blur-3xl` / `blur-[140px]`) with subtle opacity (12%-22%) to create a dynamic ambient glow.

### 2. Glassmorphism Architecture
- **Theme**: Modern Obsidian Dark Mode (`#0B0F17`) with floating frosted glass layers overlaying the ambient animated gradient blobs.
- **Glass Card Specs**:
  - Translucent glass panels (`bg-[#131B2E]/65` or `bg-slate-900/50`)
  - Deep backdrop blur (`backdrop-blur-xl`)
  - Translucent glowing borders (`border border-white/10` transitioning to `border-cyan-500/40` or `border-pink-500/40` on hover)
  - Glowing drop shadows (`shadow-[0_0_40px_rgba(88,239,236,0.12)]`)

### 3. Color Palette
- **Background Obsidian**: `#0B0F17`
- **Surface / Glass Card**: `#131B2E` / `rgba(19, 27, 46, 0.65)`
- **Gradient Cyan Accent**: `hsla(179, 83%, 64%, 1)` (`#58EFEC`)
- **Gradient Magenta Accent**: `hsla(338, 75%, 64%, 1)` (`#E85C90`)
- **Gradient Coral Accent**: `hsla(14, 92%, 86%, 1)`
- **Electric Indigo Accent**: `#6366F1`
- **Text Primary**: `#F8FAFC` (Slate 50)
- **Text Secondary**: `#94A3B8` (Slate 400)
- **Borders & Dividers**: `rgba(255, 255, 255, 0.08)` / `#1E293B`

---

## 🛠️ Technical Requirements & Stack

- **Framework**: Vite + React + TypeScript (`npm create vite@latest`)
- **Routing**: `react-router-dom` (Multi-page client-side routing with shared Layout)
- **Styling**: Tailwind CSS + Custom CSS Variables for Gradient Mesh
- **Animations**: `framer-motion` (for fluid blob movement, page transitions, and micro-animations)
- **State Management**: Redux Toolkit (RTK) with `react-redux`
- **API Handling**: RTK Query (`createApi`, `fetchBaseQuery`)
- **Forms & Validation**: `react-hook-form` + `@hookform/resolvers` + `yup`
- **Form Endpoints**: Formspree (`https://formspree.io/forms`) integration for Collaborator Application Form and Contact Us / Feedback Form
- **Notifications**: `react-hot-toast`
- **SEO & Meta (Optional)**: `react-helmet-async`
- **Icons & Visuals**: `@iconify/react`

---

## 🧭 Multi-Page Routing Architecture (`react-router-dom`)

The application is structured as a rich multi-page experience sharing a persistent global layout (`AmbientBackground`, glassmorphic `Navbar`, `Footer`, and `WaitlistModal` controlled via Redux):

```text
/                  -> Master Landing Page (Hero, Live Animation, Before/After Split, Interactive Demo Box, Features, Architecture Teaser, Pricing Teaser, Contributors Teaser, CTA)
/playground        -> Interactive AI Research Lab (Full-fledged live prompt & article simulation laboratory)
/pricing           -> Dedicated Pricing & ROI Token Savings Calculator Page
/architecture      -> Deep-Dive Architecture & Developer Docs (System blueprint, SQL/NoSQL repos, OpenAPI preview)
/analytics         -> Live Process Analytics & Contributors Hub (Project details, ingestion telemetry, pipeline throughput, and contributor showcase)
/waitlist          -> VIP Early Access & Workflow Onboarding Survey Page
```

---

## 📊 Project Details, Process Analytics & Contributors Specifications

### 1. Project Details & Core Mission
- **Background & Problem Statement**: Modern developers and technical creators spend 15-20 hours every week manually tracking RSS feeds, Reddit threads, Hacker News frontpages, and GitHub releases. High LLM API costs make continuous single-stage summarization unaffordable.
- **The ResearchPulse Solution**: A self-hostable, dual-engine intelligence framework that pre-filters articles locally at zero cost using **Ollama (Llama 3.3)**, applies **Gemini Pro** for high-confidence scoring, clusters emerging tech trends, and outputs ready-to-use blueprints for LinkedIn, Twitter/X, and video channels.
- **Repository Architecture**: Decoupled clean architecture with interchangeable Database layers (PostgreSQL via Prisma or MongoDB via Mongoose) and pluggable AI providers.

### 2. Process Analytics & Telemetry Dashboard
Visual real-time glassmorphic cards and graphs displaying live telemetry of the intelligence pipeline:
- **Throughput Metrics**:
  - `148,290+` Articles Normalized & Classified this month
  - `91.4%` Token Cost Reduction vs Single-Stage API Architectures
  - `380ms` Average Stage-1 Ollama Local Filter Latency
  - `1.8s` Stage-2 Gemini Pro Deep Scoring & Hook Generation Latency
- **Ingestion Engine Health**:
  - HackerNews RSS Feed: `99.9% Uptime` (Every 15 min)
  - GitHub Trending Scraper: `100% Uptime` (Every 30 min)
  - Reddit Tech Topics: `99.7% Uptime` (Subreddit monitoring)
  - Custom RSS Feeds: `120+ Active Feeds`
- **Pipeline Conversion Funnel**:
  - Raw Scraped Articles: `100%` (Ingested)
  - Topic Whitelist/Blacklist Rules: `42%` (Passed rule filters)
  - Stage-1 Local Ollama Pre-Filter: `18%` (Passed viral threshold >= 7)
  - Stage-2 Deep Blueprint Generation: `8%` (Delivered to high-impact feed)
- **Cost Efficiency Metric**:
  - Saved estimated `$4,820 / month` across monitored sources compared to raw un-cached GPT-4/Claude single-pass prompts.

### 3. Contributors & Community Showcase
- **Core Engineering & Maintainers**:
  - Dedicated developer cards featuring GitHub avatar, role, bio, and key contributions:
    - **Lead Architect & AI Systems**: Core pipeline design, 2-stage AI provider factory, and dynamic SQL/NoSQL repository decoupling.
    - **Frontend & UX Lead**: Glassmorphic UI, Redux Toolkit architecture, Framer Motion animations.
    - **Data Ingestion & Scrapers Lead**: Feed normalization, topic filtering rules, and node-cron background schedulers.
- **Open Source Community & Contribution Workflow**:
  - Link to GitHub repository with live Star & Fork counters.
  - "How to Contribute" Guide:
    1. Fork repository & clone locally.
    2. Add new Scraper in `backend/src/modules/sources/`.
    3. Register new AI Provider implementing `AIProvider` interface.
    4. Submit Pull Request with automated test coverage.
  - Contributor Hall of Fame grid with dynamic avatars and contribution badges (Bug Hunter, Scraper Author, Docs Contributor).

---

## 📄 Dedicated Pages Breakdown

### 1. Master Landing Page (`/`)
- **Header**: Glassmorphic sticky navigation with route indicators and CTA buttons.
- **Hero Section**: Headline, dual CTAs, Framer Motion looping AI pipeline animation, and live metrics counter bar.
- **The "Before vs After" Split Section**: Side-by-side productivity leap comparison cards.
- **Interactive Demo Box (Teaser)**: Quick clickable prompt test simulator.
- **Core Features Grid**: 6 frosted glass cards.
- **Process Analytics Snapshot**: Mini live telemetry cards showing real-time throughput and token cost savings.
- **Architecture & Pricing Teasers**: Snapshot widgets linking to `/architecture` and `/pricing`.
- **Contributors & Community Teaser**: GitHub stars badge and featured contributor avatar bubbles linking to `/analytics`.
- **High-Conversion CTA Banner**: Early access badge.

### 2. Interactive AI Research Lab (`/playground`)
- Full-screen interactive workbench: Test article prompts or select presets (*"Next.js 16 Routing"*, *"DeepSeek-R1 Architecture"*, *"Postgres vs MongoDB"*).
- AI Mode toggle (Hybrid Ollama + Gemini vs Direct Gemini) and scoring weight sliders.
- Real-time animated pipeline progress visualizer.
- Generated multi-format blueprints (LinkedIn Hook, Twitter Thread, Video Script, Developer Summary JSON) with one-click copy and toast notifications.

### 3. Pricing & Token ROI Calculator Page (`/pricing`)
- Monthly vs Annual toggle (20% discount).
- 3 Tier Cards: Developer ($0), Pro Strategist ($29/mo), Enterprise ($99/mo).
- Interactive Volume & Model Slider calculating cost comparison and savings.
- Detailed feature comparison matrix & collapsible FAQ accordion.

### 4. Architecture & Developer Docs Page (`/architecture`)
- 6-Layer Platform Architecture flowchart (Scrapers -> Normalizer -> Topic Rules -> AI Provider -> Scoring -> Multi-Channel Export).
- Dynamic SQL/NoSQL Repository Pattern explanation with toggleable Prisma and Mongoose schema code viewers.
- OpenAPI / Swagger interactive endpoint explorer with copyable cURL snippets.

### 5. Live Process Analytics & Contributors Hub (`/analytics`)
- **Full Project Details & Vision**: Detailed mission statement, architectural philosophy, and open-source roadmap.
- **Interactive Telemetry Dashboard**:
  - Live throughput counters, scraper health matrix, and pipeline funnel chart.
  - Latency breakdown graph (Stage-1 local inference vs Stage-2 cloud LLM).
- **Contributors Showcase**:
  - Team & Maintainer cards with social links and GitHub handles.
  - Contributor wall of fame with avatar badges.
  - Contribution guide with copyable terminal commands to get started locally.
  - **Collaborator Application Form**: Integrated with Formspree (`https://formspree.io/forms`), allowing developers to apply as core maintainers/scraper contributors with fields for Name, GitHub Profile, Skills/Interests (Scrapers, AI Providers, Frontend, Infra), and Sample PR/Portfolio link.

### 6. VIP Early Access & Workflow Survey Page (`/waitlist`)
- Comprehensive Yup-validated form: Name, Work Email, Role, Monthly Volume, Content Channels, Database Preference, and Notes.
- Redux-backed submission with loading states, ticket number generation (`#428`), and toast confirmation.

### 7. Formspree Integration & Contact Us Modal / Section
- **Service Integration**: `services/formspree.ts` utility providing safe submission with configurable form IDs (via `VITE_FORMSPREE_CONTACT_ID` / `VITE_FORMSPREE_COLLAB_ID`) and fallback mock simulation for local development.
- **Collaborator Form**: Embedded directly in the Contributors Hub (`/analytics`) to capture open-source contributor proposals.
- **Contact Us / Support Modal**: Global glassmorphic modal and footer trigger for developer partnerships, enterprise inquiries, bug reports, and feedback via Formspree.