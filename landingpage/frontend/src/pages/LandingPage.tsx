import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import { openWaitlist, setPlaygroundPreset } from '../store/slices/landingSlice';
import toast from 'react-hot-toast';

export const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Optimized Scroll-Linked Parallax
  // Connected directly to scrollY since Lenis already provides smooth momentum RAF scrolling.
  // This eliminates 7 simultaneous CPU spring-physics solvers on every frame.
  const { scrollY } = useScroll();

  // Unidirectional vertical parallax motion at distinct speeds (0-cost linear interpolation)
  const yCenterImg = useTransform(scrollY, [0, 800], [0, -45]);
  const yPillBottom = useTransform(scrollY, [0, 800], [0, -75]);
  const yCenterDock = useTransform(scrollY, [0, 800], [0, -95]);
  const yLeftCard = useTransform(scrollY, [0, 800], [0, -125]);
  const yRightDoc = useTransform(scrollY, [0, 800], [0, -160]);
  const yPillTop = useTransform(scrollY, [0, 800], [0, -190]);
  const yBottomFeed = useTransform(scrollY, [0, 800], [0, -235]);

  // Mini Interactive Demo Box state
  const demoPresets = [
    {
      id: 'nextjs-16',
      title: 'Next.js 16 Partial Pre-Rendering (PPR)',
      source: 'HackerNews',
      score: 9.4,
      stage1: 'Ollama Llama 3.3 (310ms)',
      stage2: 'Gemini Pro (1.4s)',
      hook: 'Stop building server-rendered routes the old way. Next.js 16 PPR just cut cold-start delays by 48%.',
      tags: ['Next.js', 'SSR', 'WebDev', 'React19'],
    },
    {
      id: 'deepseek-r1',
      title: 'DeepSeek-R1 Reasoning Architecture',
      source: 'GitHub Trending',
      score: 9.8,
      stage1: 'Ollama Llama 3.3 (280ms)',
      stage2: 'Gemini Pro (1.6s)',
      hook: 'Open weights just beat proprietary reasoning models. Here is why DeepSeek-R1 changes local AI inference.',
      tags: ['AI', 'OpenSource', 'DeepSeek', 'LLMs'],
    },
    {
      id: 'postgres-mongo',
      title: 'Decoupled SQL vs NoSQL Repository Patterns',
      source: 'Reddit /r/programming',
      score: 8.9,
      stage1: 'Ollama Llama 3.3 (350ms)',
      stage2: 'Gemini Pro (1.2s)',
      hook: 'Why choose between Prisma and MongoDB? How to architect a swappable database layer in TypeScript.',
      tags: ['TypeScript', 'Architecture', 'Postgres', 'MongoDB'],
    },
  ];

  const [activeDemo, setActiveDemo] = useState(demoPresets[0]);
  const [activeTabFilter, setActiveTabFilter] = useState<'hn' | 'gh' | 'rd'>('hn');

  const handleLaunchInLab = () => {
    dispatch(
      setPlaygroundPreset({
        id: activeDemo.id,
        topic: activeDemo.title,
        content: activeDemo.hook,
      })
    );
    navigate('/playground');
  };

  return (
    <div className="flex flex-col space-y-24 sm:space-y-36 pt-6 pb-24 overflow-hidden">
      
      {/* 1. SUPERHUMAN HERO COMPOSITION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-12">
        
        {/* Release Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>ResearchPulse 2.4</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-600 font-medium">Dual-Engine Intelligence</span>
          <Icon icon="solar:arrow-right-linear" className="text-slate-400" />
        </motion.div>

        {/* Centerpiece Hero Headline (Superhuman Style) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-slate-900 font-['Outfit'] max-w-5xl mx-auto leading-[1.12]"
        >
          Content Research, Trends, and AI{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            that works in every feed and tab
          </span>
        </motion.h1>

        {/* Superhuman Center Pill CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <button
            onClick={() => dispatch(openWaitlist())}
            className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            <span>Get ResearchPulse</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform shadow-sm">
              <Icon icon="solar:arrow-right-linear" className="text-base" />
            </div>
          </button>
        </motion.div>

        {/* 2. THE SUPERHUMAN FLOATING UI STAGE WITH CENTERPIECE CREATOR PHOTOGRAPHY */}
        <div className="relative mt-14 sm:mt-20 max-w-6xl mx-auto min-h-[580px] sm:min-h-[640px] flex items-center justify-center">
          
          {/* Ambient Sky Glow Backdrop (High-Performance Zero-Cost Radial Gradient, No Blur Filter) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(219,234,254,0.7)_0%,rgba(238,242,255,0.35)_45%,transparent_70%)] rounded-full pointer-events-none" />

          {/* Central Subject Photography (Carefully Blended Profile in Daylight) */}
          <motion.div
            style={{ y: yCenterImg }}
            className="relative z-10 w-72 sm:w-96 md:w-[440px] h-[480px] sm:h-[560px] mx-auto overflow-hidden rounded-b-3xl parallax-gpu"
          >
            {/* Creator Profile Image */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=75"
              alt="Content Strategist & Engineer in Daylight"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
            />
            {/* Daylight Horizon Fade (Zero-Cost Gradient Overlay, 100% CPU Compatible) */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F4F8FD] via-[#F4F8FD]/75 to-transparent pointer-events-none" />
          </motion.div>

          {/* FLOATING CARD 1: Left AI Ingest & Copilot Conversation (Speed: -125px) */}
          <motion.div
            style={{ y: yLeftCard }}
            className="absolute top-2 left-0 sm:left-4 md:left-8 z-20 parallax-gpu"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-72 sm:w-84 glass-panel-deep p-5 rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.1)] text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shadow-xs">
                  <Icon icon="solar:pulse-2-bold" />
                </div>
                <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-semibold">
                  STAGE-1 OLLAMA
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                Looks like you're tracking <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">#hackernews</span> and <strong className="text-slate-900">Next.js 16 PPR</strong> was just published. Would you like me to score viral potential?
              </p>

              <div className="flex items-center justify-end">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-xs">
                  yes!
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/80 space-y-2">
                <span className="text-[11px] font-medium text-slate-500 block">AI Engine Confidence:</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[94%] h-full bg-gradient-to-r from-blue-500 to-indigo-600" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800">9.4 / 10</span>
                </div>
              </div>

              {/* Input simulator pill */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-400 shadow-2xs">
                <span>generate viral hook</span>
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                  ↑
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* FLOATING CARD 2: Bottom-Left Real-Time Feed Ingest (Speed: -235px - Fastest Foreground Layer) */}
          <motion.div
            style={{ y: yBottomFeed }}
            className="absolute -bottom-4 sm:bottom-2 left-2 sm:left-12 z-20 parallax-gpu"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-80 sm:w-96 glass-panel-deep p-4 rounded-3xl border border-white/80 shadow-[0_25px_60px_rgba(15,23,42,0.12)] text-left space-y-3"
            >
              {/* Feed Tabs */}
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/70 text-xs font-semibold">
                <Icon icon="solar:hamburger-menu-bold" className="text-slate-400 text-base" />
                <button
                  onClick={() => setActiveTabFilter('hn')}
                  className={`px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                    activeTabFilter === 'hn' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  HackerNews 12
                </button>
                <button
                  onClick={() => setActiveTabFilter('gh')}
                  className={`px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                    activeTabFilter === 'gh' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  GitHub 8
                </button>
                <button
                  onClick={() => setActiveTabFilter('rd')}
                  className={`px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                    activeTabFilter === 'rd' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Reddit 19
                </button>
              </div>

              {/* List items */}
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-white/70 hover:bg-white border border-slate-100 flex items-center justify-between transition-colors">
                  <div className="truncate pr-2">
                    <span className="font-bold text-slate-800">Next.js 16 PPR</span>
                    <span className="text-slate-500 ml-1.5 truncate">Server response times dropped 48%...</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    9.4
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white/70 hover:bg-white border border-slate-100 flex items-center justify-between transition-colors">
                  <div className="truncate pr-2">
                    <span className="font-bold text-slate-800">DeepSeek-R1 Distilled</span>
                    <span className="text-slate-500 ml-1.5 truncate">8B model runs locally on single GPU...</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    9.8
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white/70 hover:bg-white border border-slate-100 flex items-center justify-between transition-colors">
                  <div className="truncate pr-2">
                    <span className="font-bold text-slate-800">Prisma vs Mongo Repos</span>
                    <span className="text-slate-500 ml-1.5 truncate">Decoupling TypeScript persistence...</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    8.9
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* FLOATING CENTER RAIL: Vertical Icon Dock (Speed: -95px) */}
          <motion.div
            style={{ y: yCenterDock }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3 p-2 rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-xl parallax-gpu"
          >
            <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm shadow-sm" title="AI Copilot">
              <Icon icon="solar:pulse-2-bold" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm transition-colors" title="Google Gemini">
              <Icon icon="solar:magic-stick-3-bold" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm transition-colors" title="Scraper Feeds">
              <Icon icon="solar:feed-bold" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm transition-colors" title="Database Repos">
              <Icon icon="solar:database-bold" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm transition-colors" title="Cron Scheduler">
              <Icon icon="solar:clock-circle-bold" />
            </button>
          </motion.div>

          {/* FLOATING ACTION PILL 1: Top Right (Speed: -190px) */}
          <motion.div
            style={{ y: yPillTop }}
            className="absolute top-8 sm:top-14 right-4 sm:right-16 z-30 parallax-gpu"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="action-pill-glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold cursor-pointer shadow-md"
            >
              <Icon icon="solar:user-speak-bold" className="text-blue-600 text-base" />
              <span>Tailor blueprint for technical founders</span>
            </motion.div>
          </motion.div>

          {/* FLOATING CARD 3: Right Document Editor (Team Workspace) (Speed: -160px) */}
          <motion.div
            style={{ y: yRightDoc }}
            className="absolute top-20 sm:top-28 right-0 sm:right-4 md:right-8 z-20 parallax-gpu"
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-80 sm:w-96 glass-panel-deep p-5 rounded-3xl border border-white/80 shadow-[0_25px_60px_rgba(15,23,42,0.12)] text-left space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Icon icon="solar:home-2-bold" className="text-blue-600" />
                  <span>Team workspace</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">Share</span>
                  <Icon icon="solar:settings-bold" className="text-sm cursor-pointer" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">
                  Next.js 16 PPR Developer Blueprint
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Stop building SSR routes the old way. Next.js 16 unites static site generation with edge streaming. Here is what engineering leads must know:
                </p>
                <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-slate-700 leading-relaxed font-sans">
                  <span className="font-semibold text-blue-900 block mb-0.5">LinkedIn Hook:</span>
                  "Cold starts just dropped by 48%. Why partial pre-rendering makes traditional page caching obsolete..."
                </div>
              </div>

              {/* Rich Text Toolbar (Just like Superhuman) */}
              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="font-bold hover:text-slate-800 cursor-pointer">T▾</span>
                  <span className="font-bold hover:text-slate-800 cursor-pointer">B</span>
                  <span className="italic hover:text-slate-800 cursor-pointer">I</span>
                  <span className="underline hover:text-slate-800 cursor-pointer">U</span>
                  <span className="line-through hover:text-slate-800 cursor-pointer">S</span>
                  <Icon icon="solar:list-bold" className="hover:text-slate-800 cursor-pointer" />
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      'Cold starts just dropped by 48%. Why partial pre-rendering makes traditional page caching obsolete...'
                    );
                    toast.success('Hook copied to clipboard!');
                  }}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Copy Hook
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* FLOATING ACTION PILL 2: Bottom Right (Speed: -75px) */}
          <motion.div
            style={{ y: yPillBottom }}
            className="absolute bottom-4 sm:bottom-8 right-6 sm:right-24 z-30 parallax-gpu"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="action-pill-dark px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold cursor-pointer"
            >
              <Icon icon="solar:magic-stick-bold" className="text-cyan-400 text-base" />
              <span>Synthesize with Gemini Pro (1.4s)</span>
            </motion.div>
          </motion.div>

        </div>

        {/* 3. METRICS COUNTER BAR (CLEAN LIGHT TILES) */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: 'Articles Normalized This Month', value: '148,290+', icon: 'solar:documents-bold', color: 'text-blue-600' },
            { label: 'Token Cost Reduction vs Cloud', value: '91.4%', icon: 'solar:shield-warning-bold', color: 'text-indigo-600' },
            { label: 'Avg Stage-1 Local Latency', value: '380ms', icon: 'solar:stopwatch-bold', color: 'text-emerald-600' },
            { label: 'Monthly Dev Savings Estimated', value: '$4,820', icon: 'solar:wallet-money-bold', color: 'text-purple-600' },
          ].map((metric, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl flex flex-col items-center text-center">
              <Icon icon={metric.icon} className={`text-2xl ${metric.color} mb-2`} />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">{metric.value}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE "BEFORE VS AFTER" SPLIT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            The Content Engineering Paradigm Shift
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            See how the dual-stage framework transforms manual cognitive overload into an automated developer broadcast flywheel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Before: Manual Chaos */}
          <div className="p-8 rounded-3xl bg-white/70 border border-slate-200 shadow-sm relative overflow-hidden space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
                <Icon icon="solar:sad-circle-bold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">The Old Way (Manual Chaos)</h3>
                <span className="text-xs text-rose-600 font-mono font-semibold">15-20 Hours / Week Lost</span>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <Icon icon="solar:close-circle-bold" className="text-rose-500 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Dozens of open browser tabs</strong>: Manually checking Hacker News, Reddit /r/programming, and GitHub releases every hour.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="solar:close-circle-bold" className="text-rose-500 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Crushing LLM API costs</strong>: Sending 100% of raw scraped headlines through GPT-4 or Claude costs $1,200+ each month for noise.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="solar:close-circle-bold" className="text-rose-500 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Missed viral narratives</strong>: Trends slip through the cracks before you notice that 5 independent articles are discussing the same pattern.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="solar:close-circle-bold" className="text-rose-500 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Manual rewriting slog</strong>: Painstakingly adapting single tech summaries for LinkedIn, Twitter/X threads, and developer newsletters.</span>
              </li>
            </ul>
          </div>

          {/* After: ResearchPulse Flywheel */}
          <div className="p-8 rounded-3xl bg-white/90 border-2 border-blue-600/30 shadow-[0_20px_50px_rgba(37,99,235,0.08)] relative overflow-hidden space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-blue-100">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-xs">
                <Icon icon="solar:rocket-bold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">With ResearchPulse (Autonomous)</h3>
                <span className="text-xs text-blue-600 font-mono font-semibold">0 Manual Hours • 91.4% Cost Reduction</span>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Unified automated ingestion</strong>: HackerNews, GitHub, and Reddit monitored on automated cron loops and deduplicated.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Local Ollama Llama 3.3 filter</strong>: Discards irrelevant chatter offline at zero cost. Cloud Gemini Pro is only invoked for genuine &gt;= 8 scores.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Automatic narrative clustering</strong>: AI groups multiple related articles into emerging developer shifts (e.g. "Move to Local LLMs").</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-lg shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">One-click multi-format blueprints</strong>: Ready-to-publish LinkedIn hooks, Twitter threads, video scripts, and structured JSON.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE DEMO BOX TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-deep rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)] space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
                <Icon icon="solar:magic-stick-bold" />
                Instant Intelligence Simulator
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                Experience the 2-Stage Engine Live
              </h3>
              <p className="text-sm text-slate-500 mt-1">Select an active tech topic or launch full custom laboratory.</p>
            </div>

            <button
              onClick={handleLaunchInLab}
              className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Open in Full AI Lab</span>
              <Icon icon="solar:arrow-right-linear" />
            </button>
          </div>

          {/* Preset Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {demoPresets.map((preset) => {
              const isSelected = activeDemo.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveDemo(preset)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-400 text-blue-950 shadow-xs'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-mono text-slate-500">{preset.source}</span>
                    <span className="font-bold text-blue-700">Viral: {preset.score}/10</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 truncate">{preset.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Preset Result Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">Synthesized Viral Hook</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono border border-emerald-200">Stage-2 Generated</span>
              </div>
              <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed italic">
                "{activeDemo.hook}"
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {activeDemo.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pipeline Telemetry Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Engine Breakdown</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Stage-1 (Local Ollama):</span>
                  <span className="text-emerald-700 font-mono font-semibold">{activeDemo.stage1}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Stage-2 (Gemini Pro):</span>
                  <span className="text-indigo-700 font-mono font-semibold">{activeDemo.stage2}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 pt-2 border-t border-slate-200">
                  <span>Calculated Viral Score:</span>
                  <span className="text-blue-700 font-mono font-bold text-sm">{activeDemo.score} / 10</span>
                </div>
              </div>

              <button
                onClick={handleLaunchInLab}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Icon icon="solar:tuning-square-2-bold" />
                Customize Weights in Lab
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CORE FEATURES GRID (6 CLEAN FROSTED GLASS CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Built for High-Velocity Content Engineers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to automate multi-channel research, filter high-signal developer topics, and distribute technical authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Multi-Channel Scraper Engine',
              desc: 'Continuous background workers for HackerNews, GitHub Trending, Reddit subreddits, and custom RSS feeds with automated deduplication.',
              icon: 'solar:feed-bold',
              tag: 'Clean Ingestion',
              color: 'text-blue-600 bg-blue-50',
            },
            {
              title: '2-Stage AI Engine (Cost Buster)',
              desc: 'Local Ollama Llama 3.3 pre-scores hundreds of raw articles at zero API cost. Gemini Pro is invoked only for verified viral candidates.',
              icon: 'solar:magic-stick-3-bold',
              tag: '91.4% Cost Reduction',
              color: 'text-indigo-600 bg-indigo-50',
            },
            {
              title: 'Dynamic Topic Whitelist / Blacklist',
              desc: 'Fine-grained keyword matching, regex rules, and anti-hype filters to ensure your feed only captures authentic technical signal.',
              icon: 'solar:filter-bold',
              tag: 'Precision Rules',
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              title: 'Trend Narrative Clustering',
              desc: 'Instead of isolated headlines, AI clusters related developer articles into high-level macro shifts (e.g. "Move from Vite to Turbopack").',
              icon: 'solar:graph-up-bold',
              tag: 'Narrative Power',
              color: 'text-purple-600 bg-purple-50',
            },
            {
              title: 'Decoupled SQL / NoSQL Repositories',
              desc: 'Switch between PostgreSQL (Prisma) and MongoDB (Mongoose) with a single environment flag without altering application logic.',
              icon: 'solar:database-bold',
              tag: 'Interchangeable DB',
              color: 'text-amber-600 bg-amber-50',
            },
            {
              title: 'Omnichannel Blueprint Generator',
              desc: 'Instantly produce ready-to-post LinkedIn hooks, Twitter/X threads, short video scripts, and markdown digests with one-click export.',
              icon: 'solar:share-circle-bold',
              tag: 'Multi-Format Output',
              color: 'text-pink-600 bg-pink-50',
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="glass-card p-7 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${feat.color}`}>
                    <Icon icon={feat.icon} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold px-2.5 py-1 rounded-full bg-slate-100">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                <span>Explore Technical Specs</span>
                <Icon icon="solar:arrow-right-linear" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HIGH CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950 text-white shadow-xl">
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
              <Icon icon="solar:shield-check-bold" />
              Self-Hostable • Dual-Engine Framework
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Ready to Automate Your Technical Content Pipeline?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Join the VIP early access group. Get the full self-hosted Docker compose manifest, Ollama 2-stage prompt configurations, and automated cron workers.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => dispatch(openWaitlist())}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icon icon="solar:ticket-bold" className="text-lg text-blue-600" />
                <span>Get Early Access Pass</span>
              </button>

              <Link
                to="/pricing"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Icon icon="solar:calculator-minimalistic-bold" className="text-lg text-indigo-400" />
                <span>Calculate Your Token ROI</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
