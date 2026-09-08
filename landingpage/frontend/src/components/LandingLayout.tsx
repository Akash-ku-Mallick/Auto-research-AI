import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import { AmbientBackground } from './AmbientBackground';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ContactModal } from './ContactModal';
import { WaitlistModal } from './WaitlistModal';

export const LandingLayout: React.FC = () => {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detect if browser is running in pure CPU software rendering mode
    // (e.g., when 'Use graphics acceleration when available' is disabled)
    let isSoftware = false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        isSoftware = true;
      } else {
        const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : (gl as any).getParameter((gl as any).RENDERER);
        isSoftware = /basic render|swiftshader|software|llvmpipe|gdi/i.test(renderer || '');
      }
    } catch {
      isSoftware = false;
    }

    if (isSoftware) {
      document.documentElement.setAttribute('data-software-render', 'true');
      // In software mode, native browser C++ compositor scrolling is far faster
      // and eliminates all JavaScript wheel interception overhead.
      return;
    }

    document.documentElement.removeAttribute('data-software-render');

    // In GPU hardware-accelerated mode, initialize Lenis for butter-smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.3,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-[#F4F8FD] text-slate-900 flex flex-col selection:bg-blue-500/20 selection:text-blue-900">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#0F172A',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 500,
          },
        }}
      />
      <AmbientBackground />
      <Navbar />
      
      {/* Main Routed Page Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
      <ContactModal />
      <WaitlistModal />
    </div>
  );
};
