const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('http'); // Fallback to http for localhost

// Load local .env variables
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SWAGGER_URL = `${BASE_URL}/docs-json`;
const ENUMS_URL = `${BASE_URL}/api/configurations/enums`;

const SWAGGER_CACHE_FILE = path.join(__dirname, 'swagger-cache.json');
const ENUMS_CACHE_FILE = path.join(__dirname, 'enums-cache.json');

const GENERATED_API_PATH = path.join(__dirname, '../frontend/src/store/generatedApi.ts');
const GENERATED_ENUMS_PATH = path.join(__dirname, '../frontend/src/types/enums.ts');

/**
 * Utility to fetch JSON from a URL
 */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            resolve(null); // Backend might not be ready or endpoint is missing
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (e) => reject(e));
  });
}

/**
 * Handle Swagger / RTK API Generation
 */
async function handleSwagger() {
  console.log(`[Swagger] Fetching live specifications from ${SWAGGER_URL}...`);
  try {
    const liveSpec = await fetchJSON(SWAGGER_URL);
    if (!liveSpec) {
      console.log(`[Swagger] Could not fetch specs. Ensure backend is running and /docs-json exists.`);
      return;
    }

    const liveSpecString = JSON.stringify(liveSpec, null, 2);
    let cachedSpecString = '';
    
    if (fs.existsSync(SWAGGER_CACHE_FILE)) {
      cachedSpecString = fs.readFileSync(SWAGGER_CACHE_FILE, 'utf8');
    }

    if (liveSpecString === cachedSpecString && fs.existsSync(GENERATED_API_PATH)) {
      console.log(`[Swagger] No changes detected in API specs. Skipping code generation.`);
      return;
    }

    console.log(`[Swagger] Changes detected! Writing cache and running codegen...`);
    fs.writeFileSync(SWAGGER_CACHE_FILE, liveSpecString);

    // Run RTK Codegen
    execSync('npx @rtk-query/codegen-openapi openapi-config.js', { stdio: 'inherit', cwd: __dirname });

    // Post-processing
    if (fs.existsSync(GENERATED_API_PATH)) {
      console.log(`[Swagger] Post-processing generated API file...`);
      let generatedCode = fs.readFileSync(GENERATED_API_PATH, 'utf8');
      
      const eslintDisables = `/* eslint-disable @typescript-eslint/no-explicit-any */\n/* eslint-disable @typescript-eslint/ban-ts-comment */\n/* eslint-disable @typescript-eslint/no-unused-vars */\n\n`;
      
      fs.writeFileSync(GENERATED_API_PATH, eslintDisables + generatedCode);
      console.log(`[Swagger] Success! Frontend API services updated.`);
    }

  } catch (error) {
    console.error(`[Swagger] Error during generation:`, error);
  }
}

/**
 * Handle Global Enums Generation
 */
async function handleEnums() {
  console.log(`[Enums] Fetching live Enums from ${ENUMS_URL}...`);
  try {
    const liveEnums = await fetchJSON(ENUMS_URL);
    if (!liveEnums) {
      console.log(`[Enums] Endpoint not found or backend offline. Skipping Enums.`);
      return;
    }

    const liveEnumsString = JSON.stringify(liveEnums, null, 2);
    let cachedEnumsString = '';

    if (fs.existsSync(ENUMS_CACHE_FILE)) {
      cachedEnumsString = fs.readFileSync(ENUMS_CACHE_FILE, 'utf8');
    }

    if (liveEnumsString === cachedEnumsString && fs.existsSync(GENERATED_ENUMS_PATH)) {
      console.log(`[Enums] No changes detected. Skipping generation.`);
      return;
    }

    console.log(`[Enums] Changes detected! Building TypeScript definitions...`);
    fs.writeFileSync(ENUMS_CACHE_FILE, liveEnumsString);

    let tsCode = `// AUTO-GENERATED ENUMS FILE\n// Do not edit directly.\n\n`;

    // Assuming the backend returns an object of objects/arrays representing Enums
    for (const [enumName, enumValues] of Object.entries(liveEnums)) {
      tsCode += `export enum ${enumName} {\n`;
      if (Array.isArray(enumValues)) {
        enumValues.forEach(val => {
          tsCode += `  ${val.toUpperCase().replace(/[^a-zA-Z0-9]/g, '_')} = "${val}",\n`;
        });
      } else if (typeof enumValues === 'object') {
        for (const [key, val] of Object.entries(enumValues)) {
          tsCode += `  ${key} = ${typeof val === 'string' ? `"${val}"` : val},\n`;
        }
      }
      tsCode += `}\n\n`;
    }

    // Ensure directory exists
    const typesDir = path.dirname(GENERATED_ENUMS_PATH);
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true });
    }

    fs.writeFileSync(GENERATED_ENUMS_PATH, tsCode);
    console.log(`[Enums] Success! Enums generated at ${GENERATED_ENUMS_PATH}`);
  } catch (error) {
    console.error(`[Enums] Error during generation:`, error);
  }
}

/**
 * Main execution block
 */
async function run() {
  console.log(`=== ResearchPulse Code Generator ===\n`);
  await handleSwagger();
  await handleEnums();
  console.log(`\n=== Code Generation Complete ===`);
}

run();
