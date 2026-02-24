import { useRef, useState, useEffect } from "react";

/**
 * A 3D shape (CSS 3D cube) that rotates based on scroll progress when the section is in view.
 * No Three.js required — uses CSS 3D transforms.
 */
export function ScrollReactiveModel({ className = "" }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = section just in view, 1 = section scrolled past

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      // Progress 0 when section top touches bottom of viewport (entering), 1 when section bottom touches top of viewport (leaving)
      const visibleStart = windowHeight;
      const visibleEnd = 0;
      const sectionStart = rect.top;
      const sectionEnd = rect.bottom;
      // Map: when rect.top goes from windowHeight to -sectionHeight, progress goes 0 -> 1
      const totalTravel = windowHeight + sectionHeight;
      const currentTravel = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentTravel / totalTravel));
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Map scroll progress to rotation (full rotation as user scrolls through section)
  const rotateY = scrollProgress * 360;
  const rotateX = scrollProgress * 180 * 0.3;

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center min-h-[320px] lg:min-h-[400px] overflow-hidden ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full max-w-[280px] aspect-square flex items-center justify-center"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
      >
        {/* CSS 3D cube */}
        <div
          className="relative w-40 h-40 lg:w-52 lg:h-52"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl font-semibold text-white/90 text-sm backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              transform: "translateZ(80px)",
              boxShadow: "inset 0 0 40px rgba(255,255,255,0.1)",
            }}
          >
            <span className="opacity-90">Our Values</span>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              transform: "rotateY(180deg) translateZ(80px)",
              boxShadow: "inset 0 0 40px rgba(255,255,255,0.08)",
            }}
          />
          {/* Right */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
              transform: "rotateY(90deg) translateZ(80px)",
              boxShadow: "inset 0 0 30px rgba(255,255,255,0.1)",
            }}
          />
          {/* Left */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
              transform: "rotateY(-90deg) translateZ(80px)",
              boxShadow: "inset 0 0 30px rgba(255,255,255,0.08)",
            }}
          />
          {/* Top */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
              transform: "rotateX(90deg) translateZ(80px)",
              boxShadow: "inset 0 0 30px rgba(255,255,255,0.1)",
            }}
          />
          {/* Bottom */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #5b21b6 100%)",
              transform: "rotateX(-90deg) translateZ(80px)",
              boxShadow: "inset 0 0 30px rgba(255,255,255,0.06)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
