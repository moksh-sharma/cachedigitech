import { useState, useEffect, useRef } from "react";
import CampaignPromoSection from "./CampaignPromoSection";

const PILLARS = [
  {
    icon: "volunteer_activism",
    title: "Technology with Empathy",
    description: "Every solution we build is guided by human values and purpose, not just profit.",
  },
  {
    icon: "verified",
    title: "Trust by Design",
    description: "Trust is earned through consistent delivery, transparency, and standing by our customers.",
  },
  {
    icon: "diversity_3",
    title: "Women-Led Excellence",
    description: "A diverse, inclusive organization where leadership is defined by vision and values.",
  },
  {
    icon: "trending_up",
    title: "Vision 2030",
    description: "Building towards becoming a benchmark in excellence, inclusion, and sustainability.",
  },
];

export default function WhoWeArePage({ onNavigateToService }) {
  const [foundationInView, setFoundationInView] = useState(false);
  const foundationSectionRef = useRef(null);

  useEffect(() => {
    const el = foundationSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFoundationInView(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Dell / Campaign promotion ── */}
      <CampaignPromoSection />

      {/* ── Core Values Grid ── */}
      <section
        ref={foundationSectionRef}
        className="py-14 lg:py-20 px-6 sm:px-8 lg:px-12 bg-linear-to-b from-white to-gray-50/80 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header: scroll-triggered fade + slide up */}
          <div
            className={`text-center mb-12 lg:mb-14 transition-all duration-700 ease-out ${
              foundationInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "50ms" }}
          >
            <p className="text-lg md:text-xl font-extrabold tracking-[0.3em] uppercase text-red-500 mb-3">
              Our Foundation
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mx-auto">
              Core Values
            </h2>
            <div
              className={`mx-auto mt-4 h-0.5 w-16 bg-red-500/80 transition-all duration-700 ease-out ${
                foundationInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "250ms" }}
            />
          </div>

          {/* Cards: staggered entrance when section in view */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className={`group bg-white rounded-2xl border border-gray-200/90 p-6 lg:p-7 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-500 ease-out ${
                  foundationInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${200 + idx * 80}ms`,
                }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 mb-5 group-hover:bg-red-100 group-hover:scale-105 transition-all duration-300 ease-out">
                  <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                </div>
                <h4 className="text-(--apple-black) font-semibold text-base mb-2 group-hover:text-red-600 transition-colors duration-300 ease-out">
                  {pillar.title}
                </h4>
                <p className="text-(--apple-gray) text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
