import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { openWaitlist } from '../store/slices/landingSlice';

export const PricingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isAnnual, setIsAnnual] = useState(true);
  const [monthlyVolume, setMonthlyVolume] = useState(25000);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const directCloudCost = Math.round(monthlyVolume * 0.042);
  const researchPulseCost = Math.round(monthlyVolume * 0.18 * 0.008 + (isAnnual ? 24 : 29));
  const estimatedSavings = Math.max(0, directCloudCost - researchPulseCost);
  const savingsPercent = Math.round((estimatedSavings / directCloudCost) * 100) || 91;

  const faqs = [
    {
      q: 'How does the 2-Stage Engine actually achieve a 91.4% cost reduction?',
      a: 'Traditional content platforms invoke expensive cloud LLM APIs (GPT-4 or Claude 3.5) for every single raw headline ingested. ResearchPulse decouples the pipeline into two stages: Stage-1 runs locally on your machine or server using Ollama (Llama 3.3) at $0.00 API cost, scoring and rejecting ~82% of low-signal noise. Stage-2 only sends the top ~18% high-viral candidates to Gemini Pro for deep blueprint generation.',
    },
    {
      q: 'Can I self-host ResearchPulse completely offline?',
      a: 'Yes! The entire core engine is open-source under ISC license. You can deploy it using Docker and configure local Ollama for both Stage-1 and Stage-2, achieving 100% offline air-gapped content intelligence with zero external API calls.',
    },
    {
      q: 'What databases are supported out of the box?',
      a: 'ResearchPulse implements an interchangeable repository pattern. You can run PostgreSQL with Prisma or MongoDB with Mongoose simply by toggling DB_TYPE in your configuration without rewriting application code.',
    },
    {
      q: 'How do the background scrapers avoid getting rate-limited or blocked?',
      a: 'Our ingestion workers utilize exponential backoff, jittered cron intervals, and public read-only endpoints (RSS feeds, HackerNews Firebase REST API, GitHub public trending APIs, and Reddit JSON feeds) complying with rate limits.',
    },
    {
      q: 'Can I connect custom RSS feeds or internal company documentation?',
      a: 'Absolutely. You can register custom RSS feeds or internal REST endpoints via the Sources Manager in the app, and attach specific whitelist/blacklist keyword rules.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Icon icon="solar:calculator-minimalistic-bold" />
          Predictable Cloud & Self-Hosted Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          Invest in Signal, Not Token Waste
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Open-source self-hostable freedom with zero artificial lock-in. Scale up with hosted background schedulers and enterprise multi-channel syndication.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly Billing</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-slate-200 p-1 flex items-center transition-all cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-full bg-blue-600 transition-transform ${
                isAnnual ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* 3 PRICING TIERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tier 1: Developer Community */}
        <div className="glass-card p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">Community Open Source</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">Self-Hosted</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">Developer</div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 font-mono">$0</span>
              <span className="text-xs text-slate-500 font-mono">/ forever (Free)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ideal for individual engineers and founders running local Ollama inference on their workstations.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-200 text-xs text-slate-700">
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Full access to open-source repository</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Unlimited local Ollama Llama 3.3 filtering</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>HackerNews, GitHub & Reddit scrapers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Decoupled Prisma (Postgres) & Mongo repos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Export to Markdown & JSON formats</span>
              </li>
            </ul>
          </div>

          <a
            href="https://github.com/Akash-ku-Mallick/Auto-research-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <Icon icon="mdi:github" className="text-base text-slate-900" />
            <span>Deploy Open Source</span>
          </a>
        </div>

        {/* Tier 2: Pro Strategist (Superhuman Highlight) */}
        <div className="glass-panel-deep p-8 rounded-3xl border-2 border-blue-600 flex flex-col justify-between space-y-6 relative shadow-xl">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-950 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
            Most Popular for DevRel & Founders
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-700 uppercase tracking-wider font-semibold">Cloud Managed</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">2-Stage Hosted</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">Pro Strategist</div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 font-mono">{isAnnual ? '$24' : '$29'}</span>
              <span className="text-xs text-slate-500 font-mono">/ month {isAnnual && '(billed annually)'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated 24/7 background cron intelligence with managed Gemini Pro API credits and multi-channel blueprints.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-200 text-xs text-slate-700">
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Up to 50,000 articles monitored / month</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Managed Gemini Pro 2.5 API token allocation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Automated Trend Narrative Clustering</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>LinkedIn, Twitter threads & Video hooks auto-sync</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-blue-600 text-base shrink-0" />
                <span>Direct Notion & Telegram digest webhooks</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => dispatch(openWaitlist())}
            className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon icon="solar:ticket-bold" className="text-base text-blue-400" />
            <span>Claim Pro Early Access</span>
          </button>
        </div>

        {/* Tier 3: Enterprise Scale */}
        <div className="glass-card p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-600 uppercase tracking-wider font-semibold">High Volume / Agency</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">Dedicated</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">Enterprise</div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 font-mono">{isAnnual ? '$79' : '$99'}</span>
              <span className="text-xs text-slate-500 font-mono">/ month</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For tech companies, content marketing agencies, and research teams tracking hundreds of feeds.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-200 text-xs text-slate-700">
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-purple-600 text-base shrink-0" />
                <span>250,000+ articles processed per month</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-purple-600 text-base shrink-0" />
                <span>Custom scrapers & private RSS feeds setup</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-purple-600 text-base shrink-0" />
                <span>Custom fine-tuned Ollama prompt templates</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-purple-600 text-base shrink-0" />
                <span>Multi-seat collaboration & audit trails</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:check-circle-bold" className="text-purple-600 text-base shrink-0" />
                <span>Dedicated Slack/Discord support channel</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => dispatch(openWaitlist())}
            className="w-full py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Icon icon="solar:shield-star-bold" className="text-base text-purple-600" />
            <span>Contact Enterprise Sales</span>
          </button>
        </div>

      </div>

      {/* INTERACTIVE TOKEN ROI CALCULATOR */}
      <div className="glass-panel-deep p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-md space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <Icon icon="solar:wallet-money-bold" />
              Interactive ROI Calculator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Calculate Your Monthly Token Savings
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Slide to your monthly ingestion volume and compare single-stage cloud LLMs vs ResearchPulse 2-Stage.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-slate-500 font-mono block font-semibold">Estimated Monthly Cost Reduction</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">
              ~{savingsPercent}% Less
            </span>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-slate-900">Monthly Scraped Articles Volume:</span>
            <span className="font-mono text-blue-600 text-base sm:text-lg font-bold">
              {monthlyVolume.toLocaleString()} articles / month
            </span>
          </div>
          <input
            type="range"
            min="2000"
            max="100000"
            step="1000"
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500">
            <span>2,000 articles</span>
            <span>25,000 articles</span>
            <span>50,000 articles</span>
            <span>100,000 articles</span>
          </div>
        </div>

        {/* Cost Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-rose-600 uppercase tracking-wider font-semibold">Traditional Cloud LLM</span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">${directCloudCost.toLocaleString()}</div>
            <p className="text-[11px] text-slate-500">100% articles routed directly to GPT-4/Claude ($0.042/ea)</p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 text-center space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-blue-700 uppercase tracking-wider font-semibold">ResearchPulse 2-Stage</span>
            <div className="text-3xl font-extrabold text-blue-700 font-mono">${researchPulseCost.toLocaleString()}</div>
            <p className="text-[11px] text-slate-600">82% filtered by Ollama at $0.00 + only 18% to Gemini Pro</p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-emerald-700 uppercase tracking-wider font-semibold">Your Monthly Net Savings</span>
            <div className="text-3xl font-extrabold text-emerald-700 font-mono">${estimatedSavings.toLocaleString()}</div>
            <p className="text-[11px] text-slate-600">Equivalent to ${(estimatedSavings * 12).toLocaleString()} annual budget saved</p>
          </div>

        </div>
      </div>

      {/* FAQ ACCORDION */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-bold text-slate-900 font-['Outfit']">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm">Everything you need to know about self-hosting, architecture, and pricing.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="glass-card rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    className={`text-lg transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
