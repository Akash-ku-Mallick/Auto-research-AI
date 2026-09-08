import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';

export const ArchitecturePage: React.FC = () => {
  const [activeDbTab, setActiveDbTab] = useState<'prisma' | 'mongoose' | 'interface'>('prisma');
  const [activeApiTab, setActiveApiTab] = useState<number>(0);

  const prismaCode = `// prisma/schema.prisma (PostgreSQL Engine)
datasource db {
  provider = "postgresql"
  url      = env("PG_CONNECTION_STRING")
}

generator client {
  provider = "prisma-client-js"
}

model SystemConfig {
  key        String   @id @db.VarChar(255)
  value      String   @db.Text
  updatedAt  DateTime @default(now()) @updatedAt @map("updated_at")

  @@map("system_configs")
}

model Source {
  id              Int         @id @default(autoincrement())
  name            String      @db.VarChar(255)
  type            String      @db.VarChar(50) // "rss" | "hackernews" | "github" | "reddit"
  url             String?     @db.VarChar(1024)
  enabled         Boolean     @default(true)
  intervalMinutes Int         @default(60) @map("interval_minutes")
  topicRules      TopicRule[]
  createdAt       DateTime    @default(now()) @map("created_at")

  @@map("sources")
}

model ResearchResult {
  id              Int      @id @default(autoincrement())
  title           String   @db.VarChar(512)
  viralScore      Float    @map("viral_score") // 0.0 - 10.0
  developerImpact String   @map("developer_impact")
  hookText        String   @db.Text @map("hook_text")
  sourceType      String   @map("source_type")
  createdAt       DateTime @default(now()) @map("created_at")

  @@map("research_results")
}`;

  const mongooseCode = `// database/mongodb/models/Source.ts (MongoDB Engine)
import mongoose, { Schema, Document } from 'mongoose';

export interface ISource extends Document {
  name: string;
  type: 'rss' | 'hackernews' | 'github' | 'reddit';
  url?: string;
  enabled: boolean;
  intervalMinutes: number;
  priority: number;
  createdAt: Date;
}

const SourceSchema = new Schema<ISource>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['rss', 'hackernews', 'github', 'reddit'] },
  url: { type: String },
  enabled: { type: Boolean, default: true },
  intervalMinutes: { type: Number, default: 60 },
  priority: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export const MongoSourceModel = mongoose.model<ISource>('Source', SourceSchema);`;

  const repoInterfaceCode = `// database/repository.interface.ts (Clean Architecture Decoupling)
export interface IRepository<T> {
  findById(id: string | number): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(item: Partial<T>): Promise<T>;
  update(id: string | number, item: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
}

// Dynamically instantiated at runtime via DbAdapterFactory
export class DbAdapterFactory {
  static getRepository<T>(entity: string): IRepository<T> {
    const dbType = process.env.DB_TYPE || 'postgres';
    if (dbType === 'postgres') {
      return new PostgresRepository<T>(entity);
    }
    return new MongoRepository<T>(entity);
  }
}`;

  const apiEndpoints = [
    {
      method: 'POST',
      path: '/api/research/run',
      desc: 'Triggers an on-demand multi-stage scraping and scoring batch cycle.',
      curl: `curl -X POST http://localhost:5000/api/research/run \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -d '{
    "sources": ["hackernews", "github-trending"],
    "aiProvider": "hybrid_ollama_gemini",
    "minViralThreshold": 8
  }'`,
    },
    {
      method: 'GET',
      path: '/api/research/results',
      desc: 'Fetches recent normalized articles with Stage-1 and Stage-2 scores.',
      curl: `curl -X GET "http://localhost:5000/api/research/results?limit=25&viralMin=7" \\
  -H "Accept: application/json"`,
    },
    {
      method: 'POST',
      path: '/api/config',
      desc: 'Dynamically updates active database adapter or API credentials at runtime.',
      curl: `curl -X POST http://localhost:5000/api/config \\
  -H "Content-Type: application/json" \\
  -d '{
    "dbType": "postgres",
    "ollamaHost": "http://localhost:11434",
    "geminiModel": "gemini-2.5-pro"
  }'`,
    },
  ];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Icon icon="solar:structure-bold" />
          Technical Blueprint & System Specs
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          Clean Decoupled Architecture
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Designed for maximum extensibility. Decoupled scraper workers, pluggable AI providers, and interchangeable SQL/NoSQL database backends.
        </p>
      </div>

      {/* 6-LAYER ARCHITECTURE FLOWCHART */}
      <div className="glass-panel-deep p-8 rounded-3xl border border-slate-200/80 space-y-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-mono text-blue-700 font-bold">6-LAYER PLATFORM DATAFLOW</span>
          </div>
          <span className="text-xs font-mono text-slate-500">Pipeline Throughput: ~380ms end-to-end</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              layer: 'Layer 1',
              title: 'Source Fetching Layer',
              desc: 'Autonomous background cron tasks query public RSS, HackerNews Firebase API, GitHub Trending scrapers, and Reddit subreddits with exponential backoff.',
              icon: 'solar:feed-bold',
              color: 'text-orange-600 bg-orange-50',
            },
            {
              layer: 'Layer 2',
              title: 'Normalization Pipeline',
              desc: 'Raw ingested feeds are sanitized into a canonical JSON structure: sanitized title, clean body excerpt, canonical URL, and ISO-8601 published date.',
              icon: 'solar:tuning-square-2-bold',
              color: 'text-blue-600 bg-blue-50',
            },
            {
              layer: 'Layer 3',
              title: 'Topic Filtering Layer',
              desc: 'Applies whitelist and blacklist keywords, custom regex rules, and duplicate hash verification to strip out PR hype and promotional spam.',
              icon: 'solar:filter-bold',
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              layer: 'Layer 4',
              title: 'Pluggable AI Provider Factory',
              desc: 'Interface-based AI provider abstraction. The factory effortlessly directs prompt workloads to local Ollama (Llama 3.3) or cloud Gemini Pro.',
              icon: 'solar:magic-stick-3-bold',
              color: 'text-indigo-600 bg-indigo-50',
            },
            {
              layer: 'Layer 5',
              title: 'Research & Scoring Engine',
              desc: 'Multi-dimensional evaluation: Viral Score (0-10), Developer Architecture Impact, Market Significance, Visual potential, and Hook generation.',
              icon: 'solar:chart-square-bold',
              color: 'text-purple-600 bg-purple-50',
            },
            {
              layer: 'Layer 6',
              title: 'Omnichannel Blueprint Export',
              desc: 'Synthesizes tailored formats: ready-to-post LinkedIn articles, 4-tweet threads, short video scripts, and webhook dispatch to Notion & Telegram.',
              icon: 'solar:share-circle-bold',
              color: 'text-pink-600 bg-pink-50',
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">{item.layer}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${item.color}`}>
                  <Icon icon={item.icon} />
                </div>
              </div>
              <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DUAL SQL / NOSQL SCHEMA CODE VIEWER */}
      <div id="database" className="glass-panel-deep p-8 rounded-3xl border border-slate-200/80 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">Decoupled SQL & NoSQL Repositories</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Switch database vendors without touching a single line of business logic.
            </p>
          </div>

          {/* Database Code Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveDbTab('prisma')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeDbTab === 'prisma' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PostgreSQL (Prisma)
            </button>
            <button
              onClick={() => setActiveDbTab('mongoose')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeDbTab === 'mongoose' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              MongoDB (Mongoose)
            </button>
            <button
              onClick={() => setActiveDbTab('interface')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeDbTab === 'interface' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Repository Interface
            </button>
          </div>
        </div>

        {/* Code Box */}
        <div className="relative rounded-2xl bg-slate-950 text-slate-100 p-6 overflow-hidden shadow-md">
          <button
            onClick={() =>
              handleCopyCode(
                activeDbTab === 'prisma' ? prismaCode : activeDbTab === 'mongoose' ? mongooseCode : repoInterfaceCode
              )
            }
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Icon icon="solar:copy-bold" />
            <span>Copy Code</span>
          </button>

          <pre className="text-xs text-slate-200 font-mono overflow-x-auto leading-relaxed max-h-[420px]">
            {activeDbTab === 'prisma' && prismaCode}
            {activeDbTab === 'mongoose' && mongooseCode}
            {activeDbTab === 'interface' && repoInterfaceCode}
          </pre>
        </div>
      </div>

      {/* OPENAPI / REST API cURL EXPLORER */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">REST API & OpenAPI Specification</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Programmatically trigger scraping jobs, update configurations, and retrieve high-viral blueprints.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-600">OpenAPI 3.1 Compliant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {apiEndpoints.map((ep, idx) => (
            <button
              key={idx}
              onClick={() => setActiveApiTab(idx)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                activeApiTab === idx
                  ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                    ep.method === 'POST' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {ep.method}
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 truncate">{ep.path}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{ep.desc}</p>
            </button>
          ))}
        </div>

        <div className="relative rounded-2xl bg-slate-950 text-cyan-300 p-6 shadow-md">
          <button
            onClick={() => handleCopyCode(apiEndpoints[activeApiTab].curl)}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Icon icon="solar:copy-bold" />
            <span>Copy cURL</span>
          </button>
          <pre className="text-xs font-mono overflow-x-auto leading-relaxed">
            {apiEndpoints[activeApiTab].curl}
          </pre>
        </div>
      </div>

    </div>
  );
};
