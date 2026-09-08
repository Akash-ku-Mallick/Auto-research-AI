import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import type { RootState } from '../store/store';
import { closeWaitlist, addWaitlistSubmission, clearCurrentTicket } from '../store/slices/landingSlice';

export const WaitlistModal: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.landing.isWaitlistOpen);
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

  if (!isOpen) return null;

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
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#4F46E5', '#7C3AED'],
        });
      } catch (err) {
        // ignore
      }
    }, 600);
  };

  const handleClose = () => {
    dispatch(clearCurrentTicket());
    dispatch(closeWaitlist());
  };

  const copyTicket = () => {
    if (currentTicket) {
      navigator.clipboard.writeText(`VIP-PASS-${currentTicket.ticketNumber}`);
      toast.success('VIP Pass ID copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_25px_60px_rgba(15,23,42,0.18)] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer z-10"
        >
          <Icon icon="solar:close-circle-bold" className="text-xl" />
        </button>

        {currentTicket ? (
          <div className="text-center py-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Icon icon="solar:crown-star-bold" />
              VIP Access Confirmed
            </div>

            {/* Glowing VIP Pass Badge */}
            <div className="relative max-w-sm mx-auto p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:pulse-2-bold" className="text-xl text-cyan-300" />
                  <span className="font-bold text-white font-['Outfit']">ResearchPulse</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-white/10 border border-white/20">
                  STAGE-1 EARLY ACCESS
                </span>
              </div>

              <div className="py-2 space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">Priority Ticket</div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 font-mono">
                  #{currentTicket.ticketNumber}
                </div>
                <p className="text-xs text-slate-300">{currentTicket.email}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Database: {currentTicket.databasePref.split(' ')[0]}</span>
                <span>Role: {currentTicket.role.split(' ')[0]}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You are in the priority onboarding queue for the self-hosted Docker framework and cloud API keys.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={copyTicket}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                <Icon icon="solar:copy-bold" className="text-sm" />
                Copy Pass ID
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-2xs">
                <Icon icon="solar:star-fall-bold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Join VIP Early Access</h3>
                <p className="text-xs text-slate-500">Deploy the 2-Stage AI Engine before public rollout</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sarah Chen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@dev.io"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="Developer & Technical Creator">Developer & Technical Creator</option>
                    <option value="CTO / Engineering Lead">CTO / Engineering Lead</option>
                    <option value="DevRel / Content Strategist">DevRel / Content Strategist</option>
                    <option value="Solo Founder / Indie Hacker">Solo Founder / Indie Hacker</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Database Preference</label>
                  <select
                    value={formData.databasePref}
                    onChange={(e) => setFormData({ ...formData, databasePref: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="PostgreSQL (Prisma)">PostgreSQL (via Prisma)</option>
                    <option value="MongoDB (Mongoose)">MongoDB (via Mongoose)</option>
                    <option value="Both / Dual Switching">Both / Decoupled Repository</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Content Syndication Channels</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['LinkedIn Post', 'Twitter Thread', 'Video Hooks', 'Telegram / Notion'].map((ch) => {
                    const checked = formData.channels.includes(ch);
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => toggleChannel(ch)}
                        className={`p-2 rounded-xl text-left border transition-all text-[11px] cursor-pointer ${
                          checked
                            ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon icon={checked ? 'solar:check-square-bold' : 'solar:square-linear'} className="text-sm text-blue-600" />
                          <span>{ch}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notes / Custom Research Use-Cases</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. tracking Rust repos, AI safety papers, LLM benchmarking..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="solar:spinner-line-bold" className="animate-spin text-lg" />
                    Allocating VIP Ticket...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:ticket-bold" className="text-lg text-blue-400" />
                    Claim My Early Access Priority Pass
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
