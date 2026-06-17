import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CURTAIN_BAR_EASE,
  CURTAIN_EASING,
  CURTAIN_FINAL_MS,
  CURTAIN_LOGO_SRC,
  CURTAIN_PANEL_FILL,
  CURTAIN_STEP_MS,
  LOADER_SLIDE_MS,
} from "../constants/appLoader";
import "./RouteTransitionCurtain.css";

const MOBILE_CURTAIN_QUERY = "(max-width: 767px)";

/** Panel center positions — matches Framer LoadScreen layout. */
const PANEL_CENTERS = [10, 30, 50, 70, 90];

/** Visible height % per animation step (0 = hidden at top edge, 100 = full screen). */
const BAR_STEPS = {
  collapsed: [0, 0, 0, 0, 0],
  step2: [100, 100, 0, 100, 100],
  step3: [100, 0, 0, 0, 100],
  full: [100, 100, 100, 100, 100],
};

const COVER_STEPS = ["collapsed", "step3", "step2", "full"];
const REVEAL_STEPS = ["full", "step2", "step3", "collapsed"];

const STEP_DURATION_MS = {
  cover: {
    step3: CURTAIN_STEP_MS,
    step2: CURTAIN_STEP_MS,
    full: CURTAIN_FINAL_MS,
  },
  reveal: {
    step2: CURTAIN_FINAL_MS,
    step3: CURTAIN_STEP_MS,
    collapsed: CURTAIN_STEP_MS,
  },
};

function durationForStep(phase, step) {
  return (STEP_DURATION_MS[phase]?.[step] ?? CURTAIN_STEP_MS) / 1000;
}

function waitForStep(phase, step) {
  return STEP_DURATION_MS[phase]?.[step] ?? CURTAIN_STEP_MS;
}

function useMobileRouteTransition() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MOBILE_CURTAIN_QUERY).matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia(MOBILE_CURTAIN_QUERY);
    const onChange = (event) => setIsMobile(event.matches);
    onChange(media);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

function MobileSlideCurtain({ phase, onCoverEnd, onRevealEnd }) {
  const curtainRef = useRef(null);
  const [coverReady, setCoverReady] = useState(false);
  const onCoverEndRef = useRef(onCoverEnd);
  const onRevealEndRef = useRef(onRevealEnd);

  onCoverEndRef.current = onCoverEnd;
  onRevealEndRef.current = onRevealEnd;

  useEffect(() => {
    if (phase !== "cover") {
      setCoverReady(true);
      return undefined;
    }
    setCoverReady(false);
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setCoverReady(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "cover" && phase !== "reveal") return undefined;

    const curtain = curtainRef.current;
    if (!curtain) return undefined;
    if (phase === "cover" && !coverReady) return undefined;

    const onEnd = (e) => {
      if (e.target !== curtain || e.propertyName !== "transform") return;
      if (phase === "cover") onCoverEndRef.current?.();
      else onRevealEndRef.current?.();
    };

    curtain.addEventListener("transitionend", onEnd);
    const fallback = window.setTimeout(() => {
      if (phase === "cover") onCoverEndRef.current?.();
      else onRevealEndRef.current?.();
    }, LOADER_SLIDE_MS + 120);

    return () => {
      curtain.removeEventListener("transitionend", onEnd);
      clearTimeout(fallback);
    };
  }, [phase, coverReady]);

  if (phase === "idle") return null;

  const curtainClass =
    phase === "cover" && !coverReady
      ? "route-transition-curtain route-transition-curtain--reveal"
      : `route-transition-curtain route-transition-curtain--${phase}`;

  return createPortal(
    <div
      className="route-transition route-transition--active"
      aria-hidden="true"
      style={{
        "--route-curtain-duration": `${LOADER_SLIDE_MS}ms`,
        "--route-curtain-easing": CURTAIN_EASING,
      }}
    >
      <div ref={curtainRef} className={curtainClass}>
        <img
          className="route-transition-logo route-transition-logo--centered"
          src={CURTAIN_LOGO_SRC}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
}

function DesktopBarCurtain({ phase, onCoverEnd, onRevealEnd }) {
  const [barStep, setBarStep] = useState("collapsed");
  const onCoverEndRef = useRef(onCoverEnd);
  const onRevealEndRef = useRef(onRevealEnd);

  onCoverEndRef.current = onCoverEnd;
  onRevealEndRef.current = onRevealEnd;

  useEffect(() => {
    if (phase !== "cover" && phase !== "reveal") return undefined;

    const steps = phase === "cover" ? COVER_STEPS : REVEAL_STEPS;
    const onComplete = phase === "cover" ? onCoverEndRef : onRevealEndRef;
    const timers = [];
    let cancelled = false;

    setBarStep(steps[0]);

    const runFrom = (index) => {
      if (cancelled || index >= steps.length) return;

      const step = steps[index];
      if (index > 0) {
        setBarStep(step);
      }

      if (index === steps.length - 1) {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) onComplete.current?.();
          }, waitForStep(phase, step) + 40)
        );
        return;
      }

      const nextStep = steps[index + 1];
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) runFrom(index + 1);
        }, waitForStep(phase, nextStep))
      );
    };

    if (phase === "cover") {
      let raf2;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (!cancelled) runFrom(1);
        });
      });
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
        timers.forEach(clearTimeout);
      };
    }

    setBarStep("full");
    runFrom(0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "cover" && phase !== "reveal") return undefined;

    const onComplete = phase === "cover" ? onCoverEnd : onRevealEnd;
    const fallback = window.setTimeout(() => onComplete?.(), LOADER_SLIDE_MS + 200);

    return () => clearTimeout(fallback);
  }, [phase, onCoverEnd, onRevealEnd]);

  if (phase === "idle") return null;

  const heights = BAR_STEPS[barStep];
  const transitionDuration = durationForStep(phase, barStep);

  return createPortal(
    <div className="route-transition route-transition--active" aria-hidden="true">
      <div
        className="route-bar-loader"
        style={{ "--route-bar-fill": CURTAIN_PANEL_FILL }}
      >
        {PANEL_CENTERS.map((center, index) => (
          <motion.div
            key={center}
            className="route-bar-loader__panel"
            style={{ left: `calc(${center}% - 10%)` }}
            initial={false}
            animate={{
              height: `${heights[index]}%`,
            }}
            transition={{
              duration: transitionDuration,
              ease: CURTAIN_BAR_EASE,
            }}
          >
            <img
              className="route-transition-logo"
              src={CURTAIN_LOGO_SRC}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{ left: `calc(${60 - center}vw)` }}
            />
          </motion.div>
        ))}
      </div>
    </div>,
    document.body
  );
}

/**
 * @param {"idle" | "cover" | "reveal"} phase
 */
export function RouteTransitionCurtain({ phase, onCoverEnd, onRevealEnd }) {
  const isMobile = useMobileRouteTransition();

  if (isMobile) {
    return (
      <MobileSlideCurtain
        phase={phase}
        onCoverEnd={onCoverEnd}
        onRevealEnd={onRevealEnd}
      />
    );
  }

  return (
    <DesktopBarCurtain
      phase={phase}
      onCoverEnd={onCoverEnd}
      onRevealEnd={onRevealEnd}
    />
  );
}
