import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CURTAIN_EASING, CURTAIN_LOGO_SRC, LOADER_SLIDE_MS } from "../constants/appLoader";
import "./RouteTransitionCurtain.css";

/**
 * @param {"idle" | "cover" | "reveal"} phase
 */
export function RouteTransitionCurtain({ phase, onCoverEnd, onRevealEnd }) {
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
          className="route-transition-logo"
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
