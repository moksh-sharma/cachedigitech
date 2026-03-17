import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

const LENIS_OPTIONS = {
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.05,
  touchMultiplier: 1.8,
  anchors: true,
  autoResize: true,
};

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const lenis = new Lenis({
      ...LENIS_OPTIONS,
      wrapper: window,
      content: document.documentElement,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { lerp: 0.12, ...options });
    } else {
      const y = typeof target === 'number' ? target : 0;
      window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
    }
  }, []);

  const resize = useCallback(() => {
    if (lenisRef.current?.resize) lenisRef.current.resize();
  }, []);

  return (
    <LenisContext.Provider value={{ lenisRef, scrollTo, resize }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  const ctx = useContext(LenisContext);
  return ctx;
}

export default LenisContext;
