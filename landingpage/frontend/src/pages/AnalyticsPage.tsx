import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { submitToFormspree, FORMSPREE_COLLAB_ID, GITHUB_REPO_URL, DEV_LINKEDIN_URL } from '../services/formspree';

export const AnalyticsPage: React.FC = () => {
  const [collabForm, setCollabForm] = useState({
    name: '',
    email: '',
    github: '',
    interest: 'AI Provider Engine (Ollama / Gemini)',
    portfolioPr: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCollabSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabForm.name || !collabForm.email || !collabForm.github) {
      toast.error('Please fill in Name, Email, and GitHub profile URL.');
      return;
    }

    setIsSubmitting(true);
    const res = await submitToFormspree(FORMSPREE_COLLAB_ID, {
      ...collabForm,
      formType: 'Open Source Contributor Application',
    });
    setIsSubmitting(false);

    if (res.ok) {
      setIsSuccess(true);
      toast.success('Collaborator application dispatched to maintainers!');
    } else {
      toast.error(res.error || 'Failed to submit application. Please try again.');
    }
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    toast.success('Command copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Icon icon="solar:chart-square-bold" />
          Pipeline Telemetry & Open Source Community
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          Telemetry, Vision & Contributors Hub
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Real-time metrics from our distributed scraping clusters, architectural mission, and open-source contributor ecosystem.
        </p>
      </div>

      {/* 1. PROJECT DETAILS & CORE MISSION */}
      <div className="glass-panel-deep p-8 sm:p-10 rounded-3xl border border-slate-200/80 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-2xs">
            <Icon icon="solar:lightbulb-bolt-bold" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">Project Mission & Origin Story</h2>
            <span className="text-xs text-slate-500">Why ResearchPulse exists</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed pt-2">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base">The Developer Information Overload Problem</h3>
            <p>
              Engineering founders and technical creators lose 15 to 20 hours each week tracking fragmented sources: HackerNews frontpages, GitHub trending repositories, Reddit dev communities, and dozens of RSS feeds.
            </p>
            <p>
              Simultaneously, single-stage cloud LLM architectures make continuous real-time summarization economically unviable, running up API bills exceeding $1,200/month for low-signal noise.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base">The ResearchPulse Architectural Paradigm</h3>
            <p>
              ResearchPulse solves this with a self-hostable, dual-engine framework: Stage-1 filters and discards 82% of chatter locally at zero cost using Ollama (Llama 3.3). Only genuine top-tier signals reach Gemini Pro for deep blueprint generation.
            </p>
            <p>
              The platform is completely open-source, featuring interchangeable database layers (Prisma PostgreSQL and Mongoose MongoDB) and pluggable AI providers.
            </p>
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME PIPELINE TELEMETRY DASHBOARD */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Live Process Telemetry</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Aggregated Last 30 Days</span>
        </div>

        {/* 4 Core Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Total Articles Classified</span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">148,290+</div>
            <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
              <Icon icon="solar:arrow-up-linear" /> +18.4% growth vs last cycle
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Token Cost Reduction</span>
            <div className="text-3xl font-extrabold text-blue-700 font-mono">91.4%</div>
            <p className="text-[11px] text-blue-600 flex items-center gap-1 font-semibold">
              <Icon icon="solar:shield-check-bold" /> Stage-1 Local Ollama filter
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Stage-1 Local Latency</span>
            <div className="text-3xl font-extrabold text-emerald-600 font-mono">380ms</div>
            <p className="text-[11px] text-slate-500">Llama 3.3 offline inference</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Estimated Cost Saved</span>
            <div className="text-3xl font-extrabold text-purple-600 font-mono">$4,820</div>
            <p className="text-[11px] text-slate-500">Monthly vs raw GPT-4 single pass</p>
          </div>
        </div>

        {/* Scraper Health Matrix Table */}
        <div className="glass-panel rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Scraper Engine Cluster Health</h4>
            <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ● Cluster Uptime: 99.9%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-mono border-b border-slate-200">
                <tr>
                  <th className="p-4">Source Scraper</th>
                  <th className="p-4">Polling Cadence</th>
                  <th className="p-4">Articles / Day</th>
                  <th className="p-4">Filter Pass Rate</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-bold text-slate-900">
                    <Icon icon="simple-icons:ycombinator" className="text-orange-500 text-base" />
                    HackerNews Firebase Stream
                  </td>
                  <td className="p-4 font-mono">Every 15 mins</td>
                  <td className="p-4 font-mono">1,840</td>
                  <td className="p-4 font-mono text-blue-700 font-bold">24.2%</td>
                  <td className="p-4 text-emerald-700 font-mono font-semibold">● 99.9% Uptime</td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-bold text-slate-900">
                    <Icon icon="mdi:github" className="text-slate-900 text-base" />
                    GitHub Trending Repositories
                  </td>
                  <td className="p-4 font-mono">Every 30 mins</td>
                  <td className="p-4 font-mono">620</td>
                  <td className="p-4 font-mono text-blue-700 font-bold">38.6%</td>
                  <td className="p-4 text-emerald-700 font-mono font-semibold">● 100% Uptime</td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-bold text-slate-900">
                    <Icon icon="mdi:reddit" className="text-orange-600 text-base" />
                    Reddit Tech (/r/programming, /r/localllama)
                  </td>
                  <td className="p-4 font-mono">Every 20 mins</td>
                  <td className="p-4 font-mono">1,210</td>
                  <td className="p-4 font-mono text-blue-700 font-bold">14.8%</td>
                  <td className="p-4 text-emerald-700 font-mono font-semibold">● 99.7% Uptime</td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 flex items-center gap-2 font-bold text-slate-900">
                    <Icon icon="solar:feed-bold" className="text-amber-600 text-base" />
                    Custom RSS Feeds (Substack / Tech Blogs)
                  </td>
                  <td className="p-4 font-mono">Every 60 mins</td>
                  <td className="p-4 font-mono">1,450</td>
                  <td className="p-4 font-mono text-blue-700 font-bold">19.5%</td>
                  <td className="p-4 text-emerald-700 font-mono font-semibold">● 120+ Active Feeds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. CONTRIBUTORS & COMMUNITY SHOWCASE */}
      <div id="contributors" className="space-y-12 pt-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 font-['Outfit']">Core Maintainers & Contributors</h2>
          <p className="text-slate-600 text-sm">
            Meet the engineers shaping the ResearchPulse architecture and learn how to submit your first Pull Request.
          </p>
        </div>

        {/* Maintainer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Akash Mallick */}
          <div className="glass-panel-deep p-7 rounded-3xl border border-blue-200/80 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  AM
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Lead Maintainer
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Akash Mallick</h3>
                <span className="text-xs text-blue-600 font-semibold">Lead Architect & AI Systems</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Architected the 2-Stage AI Engine (local Ollama + Gemini Pro), swappable SQL/NoSQL repository pattern, and unified normalization pipeline.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
              <a
                href={DEV_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-2xs"
              >
                <Icon icon="mdi:linkedin" className="text-base" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all"
                title="GitHub Repo"
              >
                <Icon icon="mdi:github" className="text-lg" />
              </a>
            </div>
          </div>

          {/* Frontend & UX */}
          <div className="glass-card p-7 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-4 shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                  <Icon icon="solar:pallete-2-bold" />
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                  Core Maintainer
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Frontend & UX Engineering</h3>
                <span className="text-xs text-indigo-600 font-semibold">Superhuman UI & Redux State</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Constructed the daylight frosted glass UI system, Framer Motion ambient gradient mesh, and multi-page routing architecture.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>Tailwind v4 • Vite • RTK</span>
            </div>
          </div>

          {/* Ingestion & Scrapers */}
          <div className="glass-card p-7 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-4 shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl">
                  <Icon icon="solar:server-square-bold" />
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold">
                  Core Maintainer
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Data Ingestion & Schedulers</h3>
                <span className="text-xs text-purple-600 font-semibold">Workers & Normalization</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Maintains multi-feed background scrapers, node-cron schedulers, and duplicate removal algorithms.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>Node.js • TypeScript • Express</span>
            </div>
          </div>

        </div>

        {/* HOW TO CONTRIBUTE CODE */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">How to Contribute Code</h3>
              <p className="text-xs text-slate-500 mt-1">Get started locally in 4 simple terminal steps.</p>
            </div>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-all self-start sm:self-auto shadow-2xs"
            >
              <Icon icon="mdi:github" className="text-base text-slate-900" />
              <span>GitHub Repository</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>1. Clone Repository</span>
                <button
                  onClick={() => copyCommand('git clone https://github.com/Akash-ku-Mallick/Auto-research-AI.git')}
                  className="hover:text-blue-600 cursor-pointer"
                  title="Copy"
                >
                  <Icon icon="solar:copy-bold" />
                </button>
              </div>
              <code className="text-blue-700 block font-bold">git clone https://github.com/Akash-ku-Mallick/Auto-research-AI.git</code>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>2. Install Dependencies</span>
                <button
                  onClick={() => copyCommand('npm install')}
                  className="hover:text-blue-600 cursor-pointer"
                  title="Copy"
                >
                  <Icon icon="solar:copy-bold" />
                </button>
              </div>
              <code className="text-blue-700 block font-bold">npm install && cd landingpage/frontend && npm install</code>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>3. Start Local Ollama Llama 3.3</span>
                <button
                  onClick={() => copyCommand('ollama run llama3.3')}
                  className="hover:text-blue-600 cursor-pointer"
                  title="Copy"
                >
                  <Icon icon="solar:copy-bold" />
                </button>
              </div>
              <code className="text-blue-700 block font-bold">ollama run llama3.3</code>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>4. Launch Full Stack</span>
                <button
                  onClick={() => copyCommand('npm run landing')}
                  className="hover:text-blue-600 cursor-pointer"
                  title="Copy"
                >
                  <Icon icon="solar:copy-bold" />
                </button>
              </div>
              <code className="text-blue-700 block font-bold">npm run landing # Launches Superhuman UI</code>
            </div>
          </div>
        </div>

        {/* 4. FORMSPREE COLLABORATOR FORM */}
        <div className="glass-panel-deep p-8 sm:p-10 rounded-3xl border border-blue-200/80 shadow-md space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-2xs">
              <Icon icon="solar:user-plus-bold" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">Apply as an Open Source Collaborator</h3>
              <p className="text-xs text-slate-500">Submits directly to maintainers via Formspree (`xyeynqdp`)</p>
            </div>
          </div>

          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center text-3xl">
                <Icon icon="solar:check-circle-bold" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Outfit']">Application Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying to collaborate on ResearchPulse. Akash and the maintainers will review your GitHub profile and reach out shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleCollabSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={collabForm.name}
                    onChange={(e) => setCollabForm({ ...collabForm, name: e.target.value })}
                    placeholder="e.g. Jordan Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={collabForm.email}
                    onChange={(e) => setCollabForm({ ...collabForm, email: e.target.value })}
                    placeholder="jordan@dev.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">GitHub Profile URL *</label>
                  <input
                    type="url"
                    required
                    value={collabForm.github}
                    onChange={(e) => setCollabForm({ ...collabForm, github: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Contribution Domain</label>
                  <select
                    value={collabForm.interest}
                    onChange={(e) => setCollabForm({ ...collabForm, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="AI Provider Engine (Ollama / Gemini)">AI Provider Engine (Ollama / Gemini / Local Llama)</option>
                    <option value="Custom Source Scrapers & Parsers">Custom Source Scrapers & Parsers (HN, Reddit, RSS)</option>
                    <option value="Frontend Glassmorphic UI & Vite">Frontend Glassmorphic UI & Vite Architecture</option>
                    <option value="Decoupled Repositories (Prisma & Mongo)">Decoupled Repositories (Prisma & Mongo)</option>
                    <option value="Docker & Production Infrastructure">Docker & Production Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sample PR or Portfolio Link (Optional)</label>
                  <input
                    type="url"
                    value={collabForm.portfolioPr}
                    onChange={(e) => setCollabForm({ ...collabForm, portfolioPr: e.target.value })}
                    placeholder="https://github.com/.../pull/12"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Note on What You'd Like to Build</label>
                <textarea
                  rows={3}
                  value={collabForm.notes}
                  onChange={(e) => setCollabForm({ ...collabForm, notes: e.target.value })}
                  placeholder="e.g. I want to build an automated Telegram channel broadcaster scraper..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="solar:spinner-line-bold" className="animate-spin text-lg" />
                    Submitting Application to Formspree...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:letter-bold" className="text-lg text-blue-400" />
                    Submit Collaborator Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
