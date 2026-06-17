import { useEffect, useRef, useState } from "react";
import "./FooterEyes.css";

const MAX_PUPIL_OFFSET = 6;

function Eye({ side }) {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.min(MAX_PUPIL_OFFSET, Math.hypot(dx, dy));
      const angle = Math.atan2(dy, dx);

      setOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className={`footer-eyes__eye footer-eyes__eye--${side}`}>
      <div className="footer-eyes__socket" aria-hidden="true" />
      <div ref={trackRef} className="footer-eyes__track">
        <div
          className="footer-eyes__pupil-follower"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <div className="footer-eyes__pupil" />
          <div className="footer-eyes__highlight" />
        </div>
      </div>
    </div>
  );
}

/** Framer eyes — https://framer.com/m/eyes-ZYGv.js@FfIIKDynKRXjqznTXtaR */
export default function FooterEyes() {
  return (
    <div className="footer-eyes" aria-hidden="true">
      <Eye side="left" />
      <Eye side="right" />
    </div>
  );
}
