import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import type { RootState } from '../store/store';
import { addWaitlistSubmission, clearCurrentTicket } from '../store/slices/landingSlice';

export const WaitlistPage: React.FC = () => {
  const currentTicket = useSelector((state: RootState) => state.landing.currentTicket);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer & Technical Creator',
    monthlyVolume: '10,000 - 50,000 articles',
    channels: ['LinkedIn Post', 'Twitter Thread'],
    databasePref: 'PostgreSQL (Prisma)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChannel = (channel: string) => {
    setFormData((prev) => {
      const exists = prev.channels.includes(channel);
      return {
        ...prev,
        channels: exists ? prev.channels.filter((c) => c !== channel) : [...prev.channels, channel],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      dispatch(addWaitlistSubmission(formData));
      setIsSubmitting(false);
      toast.success('VIP Pass Granted!');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#2563EB', '#4F46E5', '#7C3AED'],
        });
      } catch (err) {
        // ignore
      }
    }, 600);
  };

  const copyTicket = () => {
    if (currentTicket) {
      navigator.clipboard.writeText(`VIP-PASS-${currentTicket.ticketNumber}`);
      toast.success('VIP Ticket ID copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Icon icon="solar:ticket-bold" />
          Stage-1 Early Access Program
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          Claim Your VIP Priority Pass
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Be among the first engineers to deploy the 2-Stage local Ollama + Gemini Pro intelligence framework.
        </p>
      </div>

      {currentTicket ? (
        <div className="glass-panel-deep p-8 sm:p-12 rounded-3xl border border-blue-200/80 shadow-md text-center space-y-8 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 mx-auto flex items-center justify-center text-3xl shadow-2xs">
            <Icon icon="solar:crown-star-bold" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 font-['Outfit']">Priority Ticket Granted!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your onboarding request is confirmed in our local priority queue. Save your ticket ID below.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="relative max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Icon icon="solar:pulse-2-bold" className="text-xl text-cyan-300" />
                <span className="font-bold text-white font-['Outfit']">ResearchPulse</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                VIP FOUNDER TICKET
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Queue Identifier</span>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 font-mono">
                #{currentTicket.ticketNumber}
              </div>
              <p className="text-xs text-slate-300 font-mono">{currentTicket.email}</p>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 text-left text-xs text-slate-400">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Role</span>
                <span className="text-slate-200 font-medium">{currentTicket.role.split(' ')[0]}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Database</span>
                <span className="text-slate-200 font-medium">{currentTicket.databasePref.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={copyTicket}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Icon icon="solar:copy-bold" />
              <span>Copy Pass Identifier</span>
            </button>
            <button
              onClick={() => dispatch(clearCurrentTicket())}
              className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
            >
              Submit Another Registration
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel-deep p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Work / Dev Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maya@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Primary Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="Developer & Technical Creator">Developer & Technical Creator</option>
                  <option value="CTO / Engineering Lead">CTO / Engineering Lead</option>
                  <option value="DevRel / Content Strategist">DevRel / Content Strategist</option>
                  <option value="Solo Founder / Indie Hacker">Solo Founder / Indie Hacker</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Monthly Scrape Volume</label>
                <select
                  value={formData.monthlyVolume}
                  onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="Under 10,000 articles">Under 10,000 articles / mo</option>
                  <option value="10,000 - 50,000 articles">10,000 - 50,000 articles / mo</option>
                  <option value="50,000 - 150,000 articles">50,000 - 150,000 articles / mo</option>
                  <option value="150,000+ articles">150,000+ articles / mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Database Layer Preference</label>
              <select
                value={formData.databasePref}
                onChange={(e) => setFormData({ ...formData, databasePref: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
              >
                <option value="PostgreSQL (Prisma)">PostgreSQL (Relational via Prisma)</option>
                <option value="MongoDB (Mongoose)">MongoDB (Document Store via Mongoose)</option>
                <option value="Both / Decoupled Repository">Both / Dynamic Decoupled Repository</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Channels You Syndicate Content To</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['LinkedIn Post', 'Twitter Thread', 'Video Hooks', 'Telegram / Notion'].map((ch) => {
                  const isChecked = formData.channels.includes(ch);
                  return (
                    <button
                      type="button"
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon={isChecked ? 'solar:check-square-bold' : 'solar:square-linear'} className="text-base text-blue-600" />
                        <span className="truncate">{ch}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Use-Case Details / Custom Ingestion Requirements</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Tell us what developer topics, languages, or custom feeds you plan to monitor..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Icon icon="solar:spinner-line-bold" className="animate-spin text-lg" />
                  Generating Priority Ticket...
                </>
              ) : (
                <>
                  <Icon icon="solar:ticket-bold" className="text-lg text-blue-400" />
                  Register for VIP Early Access
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-2 shadow-2xs">
          <Icon icon="solar:cpu-bolt-bold" className="text-2xl text-blue-600" />
          <h4 className="text-base font-bold text-slate-900">Stage-1 Docker Compose</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instant 1-command deployment with local Ollama Llama 3.3, Postgres and Express pre-configured.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-2 shadow-2xs">
          <Icon icon="solar:shield-star-bold" className="text-2xl text-indigo-600" />
          <h4 className="text-base font-bold text-slate-900">Direct Maintainer Channel</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Private Telegram/Discord channel with the core maintainers for custom scraper assistance.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-2 shadow-2xs">
          <Icon icon="solar:star-circle-bold" className="text-2xl text-purple-600" />
          <h4 className="text-base font-bold text-slate-900">Guaranteed Token ROI</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminate at least 85% of your LLM bill within 48 hours of deploying the two-stage pipeline.
          </p>
        </div>
      </div>

    </div>
  );
};
