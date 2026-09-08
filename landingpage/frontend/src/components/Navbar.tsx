import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { openWaitlist, openContact } from '../store/slices/landingSlice';
import { GITHUB_REPO_URL, DEV_LINKEDIN_URL } from '../services/formspree';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', to: '/' },
    { label: 'AI Lab', to: '/playground' },
    { label: 'Architecture', to: '/architecture' },
    { label: 'Pricing & ROI', to: '/pricing' },
    { label: 'Telemetry & Community', to: '/analytics' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo (Superhuman Inspired) */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Icon icon="solar:pulse-2-bold" className="text-lg text-cyan-300" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit']">
              Research<span className="text-blue-600">Pulse</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
              v2.4
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/60 p-1 rounded-full border border-slate-200/80 shadow-xs">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* GitHub Stars */}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:border-slate-300 transition-all shadow-2xs"
          >
            <Icon icon="mdi:github" className="text-base text-slate-900" />
            <span>Star</span>
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono">
              1.2k
            </span>
          </a>

          {/* Dev Profile */}
          <a
            href={DEV_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100/80 transition-all"
            title="Connect with Lead Developer"
          >
            <Icon icon="mdi:linkedin" className="text-base" />
            <span className="hidden xl:inline">Akash M.</span>
          </a>

          {/* Contact Us Trigger */}
          <button
            onClick={() => dispatch(openContact())}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors"
          >
            Contact
          </button>

          {/* Superhuman Style Pill CTA */}
          <button
            onClick={() => dispatch(openWaitlist())}
            className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Get Early Access</span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
              <Icon icon="solar:arrow-right-linear" className="text-xs" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => dispatch(openWaitlist())}
            className="px-3 py-1.5 rounded-full bg-slate-950 text-[11px] font-semibold text-white shadow-xs"
          >
            Waitlist
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700"
            aria-label="Toggle Navigation"
          >
            <Icon icon={isMobileMenuOpen ? 'solar:close-circle-bold' : 'solar:hamburger-menu-bold'} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                dispatch(openContact());
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800"
            >
              Contact Us (Inquiries & Partnerships)
            </button>
            <div className="flex items-center gap-2">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700"
              >
                <Icon icon="mdi:github" className="text-base text-slate-900" />
                GitHub
              </a>
              <a
                href={DEV_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-50 text-xs font-semibold text-blue-700"
              >
                <Icon icon="mdi:linkedin" className="text-base" />
                Connect Dev
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
