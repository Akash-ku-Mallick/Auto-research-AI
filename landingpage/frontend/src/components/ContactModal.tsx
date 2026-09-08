import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import type { RootState } from '../store/store';
import { closeContact } from '../store/slices/landingSlice';
import { submitToFormspree, FORMSPREE_CONTACT_ID, DEV_LINKEDIN_URL } from '../services/formspree';

export const ContactModal: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.landing.isContactOpen);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Partnership & Integration',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const res = await submitToFormspree(FORMSPREE_CONTACT_ID, {
      ...formData,
      formType: 'General Contact / Inquiries',
    });
    setIsSubmitting(false);

    if (res.ok) {
      setIsSuccess(true);
      toast.success('Message sent! We will get back to you shortly.');
    } else {
      toast.error(res.error || 'Failed to submit. Please try again.');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      category: 'Partnership & Integration',
      message: '',
    });
    dispatch(closeContact());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_25px_60px_rgba(15,23,42,0.18)] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <Icon icon="solar:close-circle-bold" className="text-xl" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center text-3xl">
              <Icon icon="solar:check-circle-bold" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">Message Dispatched!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been submitted directly to our core maintainers via Formspree. You can also connect directly with Akash on LinkedIn.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={DEV_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm"
              >
                <Icon icon="mdi:linkedin" className="text-base" />
                Connect on LinkedIn
              </a>
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
                <Icon icon="solar:chat-round-line-bold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Contact ResearchPulse</h3>
                <p className="text-xs text-slate-500">Connected via Formspree (`xqpkyvdq`)</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Work / Developer Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Topic / Inquiry Type</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="Partnership & Integration">Partnership & Integration</option>
                  <option value="Custom AI Provider">Custom AI Provider / Scraper Request</option>
                  <option value="Enterprise Self-Hosted Deployment">Enterprise Self-Hosted Deployment</option>
                  <option value="Bug Report or Pipeline Issue">Bug Report or Pipeline Issue</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Message / Requirements *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your use-case, content volume, or custom requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-blue-600 focus:bg-white focus:outline-none transition-all resize-none"
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
                    Dispatching to Formspree...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:plain-2-bold" className="text-lg text-blue-400" />
                    Send Inquiry
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
