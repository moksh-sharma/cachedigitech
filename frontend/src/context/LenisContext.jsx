import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

const LENIS_OPTIONS = {
  duration: 0.8,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.35,
  touchMultiplier: 2.5,
  anchors: true,
};

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      ...LENIS_OPTIONS,
      autoResize: true,
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
      lenisRef.current.scrollTo(target, { lerp: 0.18, ...options });
    } else {
      const y = typeof target === 'number' ? target : 0;
      window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <LenisContext.Provider value={{ lenisRef, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  const ctx = useContext(LenisContext);
  return ctx;
}

export default LenisContext;
