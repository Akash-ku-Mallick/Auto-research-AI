# System Architecture

## Backend

Node.js + TypeScript

Framework:
Express

Database:
PostgreSQL or MongoDB (Dynamic / User-configured)

ORM / ODM:
Prisma (PostgreSQL) and Mongoose (MongoDB)

AI Layer:
Provider abstraction

Supported providers:

* Gemini
* Ollama
* OpenAI (future)

## Core Modules

### Sources

Responsible for:

* RSS ingestion
* HackerNews ingestion
* Reddit ingestion
* GitHub ingestion

### Filtering

Responsible for:

* Whitelist matching
* Blacklist exclusion
* Deduplication

### AI Engine

Responsible for:

* Article analysis
* Content scoring
* Hook generation

### Reporting

Responsible for:

* Markdown generation
* HTML generation
* Telegram delivery

### Scheduler

Responsible for:

* Job execution (via lightweight node-cron)
* Source polling

## Design Principles

* Modular
* Provider-agnostic
* Source-agnostic
* Database-agnostic (via Repository Pattern)
* Testable
