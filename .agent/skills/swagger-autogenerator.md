# Swagger & RTK Codegen Synchronization

## Overview
This skill defines the synchronization workflow between the backend APIs and the frontend Redux Toolkit Query services. We use an automated code generation tool located in the `rtk-codegen` directory.

## Workflow

The automated tool reads the backend's live OpenAPI (Swagger) specifications and Enums configurations, caches them, and translates them directly into frontend API endpoints using `@rtk-query/codegen-openapi`.

### 1. Generating Endpoints
- The script `rtk-codegen/generate.js` serves as the engine. 
- It uses the local `.env` configuration (specifically `BASE_URL`) to determine where the backend is running.
- It attempts to fetch `${BASE_URL}/docs-json` for the Swagger spec and `${BASE_URL}/api/configurations/enums` for shared Enums.
- The specs are cached as JSON files within the `rtk-codegen` folder. If the new specification precisely matches the cache, generation is skipped to save time.

### 2. Output and Post-Processing
- Swagger endpoints are generated based on `openapi-config.js` and output to `../frontend/src/store/generatedApi.ts`.
- The generation engine will inject `api.ts` as the base API, meaning all backend configuration details should remain agnostic within the generated components.
- The script automatically executes a post-processing pass over `generatedApi.ts` to prepend ESLint disable directives (e.g. `/* eslint-disable @typescript-eslint/no-explicit-any */`) ensuring the build pipeline does not fail on generated code constraints.

### 3. Enum Generation
- Dynamic Enums retrieved from the backend are processed and transformed into static TypeScript exports.
- These are written directly to `../frontend/src/types/enums.ts`.

## Execution
The `rtk-codegen` directory contains its own dependencies (`npm install` to setup).
- Run `npm run generate` or `node generate.js` from within the `rtk-codegen` folder whenever a new backend controller is added or an endpoint interface changes.

## Backend Responsibilities
When developing the Express backend, you must ensure:
1. Every new router is documented with an OpenAPI (Swagger) integration.
2. The `/docs-json` endpoint correctly serves the full application API schema.
3. The `/api/configurations/enums` endpoint serves all global types that the frontend might need (if applicable).
