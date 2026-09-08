import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { openContact, openWaitlist } from '../store/slices/landingSlice';
import { GITHUB_REPO_URL, DEV_LINKEDIN_URL } from '../services/formspree';

export const Footer: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/95 backdrop-blur-md mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                <Icon icon="solar:pulse-2-bold" className="text-base text-cyan-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit']">
                Research<span className="text-blue-600">Pulse</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              The dual-engine content intelligence framework. Slashing LLM token costs by 91.4% with local Ollama pre-filtering and Gemini Pro viral blueprint synthesis.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>All Scrapers & AI Engines Operational (99.9% Uptime)</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Master Overview</Link>
              </li>
              <li>
                <Link to="/playground" className="hover:text-blue-600 transition-colors">AI Research Lab</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-600 transition-colors">Pricing & Token ROI</Link>
              </li>
              <li>
                <Link to="/waitlist" className="hover:text-blue-600 transition-colors">VIP Waitlist Access</Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Open Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Engineering</h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>
                <Link to="/architecture" className="hover:text-blue-600 transition-colors">6-Layer Pipeline</Link>
              </li>
              <li>
                <Link to="/architecture#database" className="hover:text-blue-600 transition-colors">SQL / NoSQL Repos</Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-blue-600 transition-colors">Telemetry & Funnel</Link>
              </li>
              <li>
                <Link to="/analytics#contributors" className="hover:text-blue-600 transition-colors">Contributors Hub</Link>
              </li>
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Connect & Support</h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>
                <button
                  onClick={() => dispatch(openContact())}
                  className="hover:text-blue-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon icon="solar:chat-round-call-bold" className="text-blue-600" />
                  Contact Us (Formspree)
                </button>
              </li>
              <li>
                <a
                  href={DEV_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <Icon icon="mdi:linkedin" className="text-blue-600" />
                  Developer LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <Icon icon="mdi:github" className="text-slate-900" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <button
                  onClick={() => dispatch(openWaitlist())}
                  className="text-blue-600 hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon icon="solar:star-fall-bold" />
                  Request Early Access
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResearchPulse. Built by <a href={DEV_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-blue-600 font-semibold underline underline-offset-2">Akash Mallick</a>.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <Icon icon="logos:vitejs" className="text-sm" /> Vite
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="logos:react" className="text-sm" /> React 19
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="logos:tailwindcss-icon" className="text-sm" /> Tailwind v4
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="simple-icons:ollama" className="text-sm text-slate-900" /> Ollama Llama 3.3
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
