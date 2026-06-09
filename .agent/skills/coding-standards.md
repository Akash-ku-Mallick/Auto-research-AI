# Coding Standards

## General Standards
* **Language**: TypeScript Strict Mode
* **Case Conventions**:
  * Folder naming: `kebab-case`
  * File naming: `feature.type.ts` pattern (e.g. `sources.controller.ts`, `sources.repository.ts`, `configSlice.ts`)
* **Linting & Validation**: Use Zod schemas for all request validation and environment configuration.

## Backend Standards (Node.js + Express)
* **Architecture**: Clean, modular layered architecture:
  * **Controllers** (`*.controller.ts`): Receive HTTP requests, run Zod validations, call service layers, and return responses.
  * **Services** (`*.service.ts`): Orchestrate core business logic and AI/Parsing modules.
  * **Repositories** (`*.repository.ts`): Handle database querying. Must implement a uniform repository interface (`repository.interface.ts`) to support switching between Prisma (PostgreSQL) and Mongoose (MongoDB).
* **Rules**:
  * No `any` type annotations. Use strict typings or `unknown`.
  * No default exports; always use named exports.
  * Use structured logging and central Express error-handling middleware.

## Frontend Standards (Vite + React)
* **State Management**:
  * Use **Redux Toolkit (RTK)** for global UI configuration and state management.
  * Use **RTK Query** (defined in `services/api.ts`) for caching, mutations, and queries to the Express API.
* **Component Design**:
  * Functional components with TypeScript typed props.
  * Avoid TailwindCSS; use Vanilla CSS for glassmorphic/dark elements.

## Testing Standards
* **Framework**: Vitest
* **Coverage Target**: 80%+ code coverage on core business logic services.