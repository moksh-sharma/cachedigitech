import React, { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { Routes, useLocation } from "react-router-dom";
import { useAppLoader } from "../context/AppLoaderContext";
import { useLenis } from "../context/LenisContext";
import { RouteTransitionCurtain } from "./RouteTransitionCurtain";

function locationsMatch(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
}

function RouteTransitionPlaceholder() {
  return <div className="min-h-[50vh] w-full" aria-hidden />;
}

export function AnimatedRoutes({ children }) {
  const location = useLocation();
  const { loaderDone } = useAppLoader();
  const { scrollTo, resize } = useLenis();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState("idle");
  const pendingLocationRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const locationRef = useRef(location);
  const displayLocationRef = useRef(displayLocation);

  locationRef.current = location;
  displayLocationRef.current = displayLocation;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollPageToTop = useCallback(() => {
    if (scrollTo) {
      scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [scrollTo]);

  useEffect(() => {
    if (!loaderDone) {
      setDisplayLocation(location);
      return;
    }

    if (locationsMatch(location, displayLocation)) return;

    if (prefersReducedMotion()) {
      setDisplayLocation(location);
      scrollPageToTop();
      if (resize) window.setTimeout(resize, 100);
      return;
    }

    if (isTransitioningRef.current) {
      pendingLocationRef.current = location;
      return;
    }

    isTransitioningRef.current = true;
    document.documentElement.classList.add("route-transition-active");
    setPhase("cover");
  }, [location, displayLocation, loaderDone, scrollPageToTop, resize]);

  const handleCoverEnd = useCallback(() => {
    const next = pendingLocationRef.current ?? locationRef.current;
    pendingLocationRef.current = null;
    setDisplayLocation(next);
    scrollPageToTop();
    requestAnimationFrame(() => setPhase("reveal"));
  }, [scrollPageToTop]);

  const handleRevealEnd = useCallback(() => {
    setPhase("idle");
    isTransitioningRef.current = false;
    document.documentElement.classList.remove("route-transition-active");

    if (resize) window.setTimeout(resize, 100);

    const pending = pendingLocationRef.current;
    if (!pending || locationsMatch(pending, displayLocationRef.current)) {
      pendingLocationRef.current = null;
      return;
    }

    isTransitioningRef.current = true;
    document.documentElement.classList.add("route-transition-active");
    requestAnimationFrame(() => setPhase("cover"));
  }, [resize]);

  useEffect(() => {
    if (loaderDone) return;
    setDisplayLocation(location);
  }, [location, loaderDone]);

  return (
    <>
      <RouteTransitionCurtain
        phase={phase}
        onCoverEnd={handleCoverEnd}
        onRevealEnd={handleRevealEnd}
      />
      <Suspense fallback={<RouteTransitionPlaceholder />}>
        <Routes location={displayLocation}>{children}</Routes>
      </Suspense>
    </>
  );
}
