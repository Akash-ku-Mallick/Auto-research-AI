import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import type { RootState } from '../store/store';
import {
  setPlaygroundPreset,
  setPlaygroundInputs,
  setAiMode,
  setWeight,
  setIsSimulating,
  setSimulationStep,
  setGeneratedBlueprint,
  type GeneratedBlueprint,
} from '../store/slices/landingSlice';

export const PlaygroundPage: React.FC = () => {
  const dispatch = useDispatch();
  const { customTopic, customContent, aiMode, weights, isSimulating, currentStep, blueprint } =
    useSelector((state: RootState) => state.landing.playground);

  const [activeTab, setActiveTab] = useState<'linkedin' | 'twitter' | 'video' | 'json'>('linkedin');

  const presets = [
    {
      id: 'nextjs-16',
      name: 'Next.js 16 Dynamic Partial Pre-Rendering (PPR)',
      source: 'HackerNews • 342 upvotes',
      content: `Next.js 16 introduces dynamic partial pre-rendering (PPR) as a stable primitive, completely unifying static site generation with edge dynamic streaming. Benchmark tests show server response times dropped by 48% across heavy database-backed landing pages, whilst cold-start micro-delays were eliminated entirely by caching speculative chunk manifests.`,
    },
    {
      id: 'deepseek-r1',
      name: 'DeepSeek-R1 Reasoning Architecture & Distillation',
      source: 'GitHub Trending • 1.4k stars today',
      content: `DeepSeek has published their open-weights R1 model series showcasing test-time compute scaling on pure reinforcement learning without supervised fine-tuning. The distilled 8B and 14B models achieve performance competitive with proprietary reasoning engines, enabling developers to run high-confidence chain-of-thought verification locally on a single consumer GPU.`,
    },
    {
      id: 'postgres-mongo',
      name: 'Decoupled SQL vs NoSQL Multi-Database Repositories',
      source: 'Reddit /r/programming • 189 comments',
      content: `Modern TypeScript architectures increasingly decouple their persistence logic using interchangeable repository interfaces. With a unified CRUD abstraction, enterprise apps can swap between PostgreSQL (using Prisma ORM for relational queries) and MongoDB (using Mongoose for document stores) at deployment runtime via simple environment switches.`,
    },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    dispatch(setPlaygroundPreset({ id: p.id, topic: p.name, content: p.content }));
  };

  const handleRunSimulation = () => {
    if (!customTopic || !customContent) {
      toast.error('Please provide a topic and article content.');
      return;
    }

    dispatch(setIsSimulating(true));
    dispatch(setSimulationStep(1));
    dispatch(setGeneratedBlueprint(null));

    setTimeout(() => dispatch(setSimulationStep(2)), 500);
    setTimeout(() => dispatch(setSimulationStep(3)), 1000);
    setTimeout(() => dispatch(setSimulationStep(4)), 1500);
    setTimeout(() => {
      dispatch(setSimulationStep(5));

      const calculatedViral = Math.min(
        10,
        Math.round(((weights.viral * 0.5 + weights.devImpact * 0.4 + weights.visual * 0.1) / 10) * 10) / 10
      );

      const generated: GeneratedBlueprint = {
        title: customTopic,
        summary: customContent.slice(0, 200) + '...',
        viralScore: calculatedViral,
        developerImpact: weights.devImpact >= 80 ? 'Critical Architecture Impact' : 'Incremental Productivity Optimization',
        indiaImpact: 'Significant for SaaS founders, offshore teams, and cost-conscious engineering orgs.',
        linkedinHook: `Stop designing technical infrastructure the old way.\n\n${customTopic} is causing a quiet revolution in how high-throughput applications are built in 2026. Here's why every engineering lead needs to pay attention:`,
        linkedinPost: `Stop designing technical infrastructure the old way.\n\n${customTopic} is causing a quiet revolution in how high-throughput applications are built in 2026. Here's what we observed analyzing the benchmarks:\n\n1. Zero-Cost Local Inference: Instead of burning tokens on every single read, modern pipelines filter noise upstream.\n2. Throughput Leap: Real-world latency dropped by over 40% when moving compute closer to the data layer.\n3. The Takeaway: Stop paying cloud LLM taxes for basic classification tasks.\n\nWhat's your team's approach to local vs cloud AI pipelines? Share your thoughts below 👇\n\n#SoftwareEngineering #WebDev #SystemDesign #OpenSource`,
        twitterThread: [
          `🧵 1/4: ${customTopic} just changed the game for developers.\n\nHere is a breakdown of why this matters and the exact performance numbers you should know 👇`,
          `2/4: The core bottleneck with traditional architectures was repetitive cloud API invocations.\n\nBy leveraging local pre-filtering, teams cut LLM token costs by ~91.4% without sacrificing precision.`,
          `3/4: Real-world benchmarks:\n- Latency: ~380ms local inference\n- Cold-start overhead: Reduced by 48%\n- Reliability: 99.9% uptime with swappable fallbacks`,
          `4/4: If you're building in 2026, decouple your intelligence pipelines early.\n\nRead the full technical deep dive in our repository: https://github.com/Akash-ku-Mallick/Auto-research-AI`,
        ],
        videoScript: `[HOOK - 0:00 to 0:05]\n"Most developers are completely sleeping on this new release, but it just cut our server costs in half."\n\n[BODY - 0:05 to 0:25]\n"Today we're breaking down ${customTopic}. Traditional setups send every single request to expensive cloud models. But by chaining local Ollama models with Gemini Pro, you get enterprise intelligence at almost zero cost."\n\n[CTA - 0:25 to 0:30]\n"Follow for more daily developer architecture breakdowns, and grab the open-source code in the bio!"`,
        jsonOutput: JSON.stringify(
          {
            topic: customTopic,
            viralScore: calculatedViral,
            weightsApplied: weights,
            engineMode: aiMode,
            classification: {
              relevance: 'High',
              developerImpactScore: weights.devImpact,
              visualPotentialScore: weights.visual,
            },
            pipelineTelemetry: {
              stage1LocalLatencyMs: aiMode === 'hybrid' ? 380 : 0,
              stage2CloudLatencyMs: 1420,
              tokenReductionPct: aiMode === 'hybrid' ? 91.4 : 0,
            },
          },
          null,
          2
        ),
        tokensSavedPct: aiMode === 'hybrid' ? 91.4 : 0,
        latencyMs: aiMode === 'hybrid' ? 380 : 1800,
      };

      dispatch(setGeneratedBlueprint(generated));
      dispatch(setIsSimulating(false));
      toast.success('Omnichannel blueprint generated!');
    }, 2000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Icon icon="solar:tuning-square-2-bold" />
            Interactive Developer Workbench
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            AI Research Lab & Blueprint Simulator
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Simulate the 2-Stage Ollama + Gemini Pro intelligence pipeline on any article or developer topic.
          </p>
        </div>

        {/* Engine Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-slate-200 shadow-2xs self-start md:self-auto">
          <button
            onClick={() => dispatch(setAiMode('hybrid'))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              aiMode === 'hybrid'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Icon icon="solar:shield-check-bold" className="text-cyan-400" />
            <span>Dual-Stage Hybrid (91.4% Saved)</span>
          </button>
          <button
            onClick={() => dispatch(setAiMode('gemini'))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              aiMode === 'gemini'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Icon icon="solar:magic-stick-3-bold" />
            <span>Cloud Gemini Pro Only</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Presets */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Quick Test Presets</span>
            <div className="space-y-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className="w-full p-3.5 rounded-2xl bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-400 text-left transition-all text-xs space-y-1 cursor-pointer shadow-2xs"
                >
                  <div className="font-bold text-slate-900 truncate">{p.name}</div>
                  <div className="text-[11px] font-mono text-blue-600">{p.source}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Article Input Form */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Article Parameters</h3>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Topic / Headline</label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => dispatch(setPlaygroundInputs({ topic: e.target.value, content: customContent }))}
                placeholder="e.g. Postgres 17 Logical Replication..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Scraped Content / Article Body</label>
              <textarea
                rows={5}
                value={customContent}
                onChange={(e) => dispatch(setPlaygroundInputs({ topic: customTopic, content: e.target.value }))}
                placeholder="Paste technical article markdown or excerpt..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:bg-white focus:outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Scoring Weight Sliders */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Scoring Weight Tuning</span>
              
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
                  <span>Viral Potential:</span>
                  <span className="font-mono text-blue-600 font-bold">{weights.viral}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.viral}
                  onChange={(e) => dispatch(setWeight({ key: 'viral', val: Number(e.target.value) }))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
                  <span>Developer Impact:</span>
                  <span className="font-mono text-indigo-600 font-bold">{weights.devImpact}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.devImpact}
                  onChange={(e) => dispatch(setWeight({ key: 'devImpact', val: Number(e.target.value) }))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
                  <span>Visual Potential:</span>
                  <span className="font-mono text-purple-600 font-bold">{weights.visual}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.visual}
                  onChange={(e) => dispatch(setWeight({ key: 'visual', val: Number(e.target.value) }))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSimulating ? (
                <>
                  <Icon icon="solar:spinner-line-bold" className="animate-spin text-lg" />
                  Running 2-Stage Pipeline...
                </>
              ) : (
                <>
                  <Icon icon="solar:play-bold" className="text-lg text-blue-400" />
                  Execute 2-Stage Intelligence Run
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Pipeline Progression & Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Stage Progression */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-800">Pipeline Execution Stages</span>
              <span className="font-mono text-blue-600 font-semibold">
                {isSimulating ? `Active Stage ${currentStep} / 5` : blueprint ? 'Completed • Output Ready' : 'Awaiting Trigger'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono">
              {[
                { step: 1, label: 'Normalize' },
                { step: 2, label: 'Filter' },
                { step: 3, label: 'Ollama Llama' },
                { step: 4, label: 'Gemini Pro' },
                { step: 5, label: 'Blueprint' },
              ].map((s) => {
                const isPassed = currentStep >= s.step || (!isSimulating && blueprint);
                const isCurrent = currentStep === s.step && isSimulating;
                return (
                  <div
                    key={s.step}
                    className={`p-2.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 animate-pulse shadow-xs'
                        : isPassed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="font-bold">{s.step}</div>
                    <div className="truncate">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generated Blueprint View */}
          <div className="glass-panel-deep rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm min-h-[420px] flex flex-col">
            
            {/* Tabs */}
            <div className="flex items-center justify-between px-6 pt-4 border-b border-slate-200 bg-slate-50/70">
              <div className="flex items-center gap-2">
                {[
                  { id: 'linkedin', label: 'LinkedIn Post', icon: 'mdi:linkedin' },
                  { id: 'twitter', label: 'Twitter Thread', icon: 'mdi:twitter' },
                  { id: 'video', label: 'Video Hook & Script', icon: 'solar:videocamera-record-bold' },
                  { id: 'json', label: 'Developer JSON', icon: 'solar:code-square-bold' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                      activeTab === t.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon icon={t.icon} className="text-sm" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {blueprint && (
                <button
                  onClick={() => {
                    const textToCopy =
                      activeTab === 'linkedin'
                        ? blueprint.linkedinPost
                        : activeTab === 'twitter'
                        ? blueprint.twitterThread.join('\n\n')
                        : activeTab === 'video'
                        ? blueprint.videoScript
                        : blueprint.jsonOutput;
                    handleCopy(textToCopy, activeTab.toUpperCase());
                  }}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Icon icon="solar:copy-bold" />
                  <span>Copy</span>
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              {blueprint ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Performance telemetry pill */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        Viral Score: {blueprint.viralScore} / 10
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        Token Savings: {blueprint.tokensSavedPct}%
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
                        Local Ollama Latency: {blueprint.latencyMs}ms
                      </span>
                    </div>

                    {/* Tab 1: LinkedIn */}
                    {activeTab === 'linkedin' && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-sans text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                        {blueprint.linkedinPost}
                      </div>
                    )}

                    {/* Tab 2: Twitter Thread */}
                    {activeTab === 'twitter' && (
                      <div className="space-y-3">
                        {blueprint.twitterThread.map((tweet, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                            {tweet}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Video Script */}
                    {activeTab === 'video' && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap">
                        {blueprint.videoScript}
                      </div>
                    )}

                    {/* Tab 4: Developer JSON */}
                    {activeTab === 'json' && (
                      <pre className="p-5 rounded-2xl bg-slate-950 text-cyan-300 border border-slate-800 text-xs font-mono overflow-x-auto leading-relaxed max-h-96">
                        {blueprint.jsonOutput}
                      </pre>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                    <Icon icon="solar:tuning-square-2-bold" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Laboratory Ready</h4>
                  <p className="text-xs max-w-sm text-slate-500">
                    Select a preset on the left or customize article text and scoring weights, then click "Execute 2-Stage Intelligence Run".
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
