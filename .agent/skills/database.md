# Database Standards

The system must support both **PostgreSQL** and **MongoDB** dynamically. The active database option and connection credentials are saved in the system configuration, and accessed via a Repository Pattern.

* **PostgreSQL ORM**: Prisma
* **MongoDB ODM**: Mongoose

## Tables / Collections

* `system_configs` - Stores active database choices, credentials, and API keys.
* `sources` - Ingested feed sources (RSS, HN, Reddit, etc.).
* `topic_rules` - Rules for whitelists and blacklists.
* `ai_providers` - Configured AI engine parameters and states.
* `research_articles` - Normalized ingest articles/stories.
* `research_scores` - Scores, viral analysis, visual potential, hooks.
* `trend_clusters` - Aggregated emerging trend clusters.
* `reports` - Emitted report references.

## Naming Conventions

* **PostgreSQL**: `snake_case` table and field names. IDs use `uuid` or autoincrementing serial keys.
* **MongoDB**: `camelCase` collection and field names (standard Mongoose patterns). IDs use `ObjectId`.

## Soft Deletion

Always include support for soft deletes using:
* `deleted_at` / `deletedAt` (nullable timestamp/date)