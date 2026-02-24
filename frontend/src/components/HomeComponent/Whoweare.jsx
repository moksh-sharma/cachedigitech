import { useState, useEffect, useRef } from "react";

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
      {/* ── Mission Banner (matches ROI banner style) ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1d1d1f 0%, #2d2d30 40%, #1d1d1f 100%)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8 py-12 lg:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: statement */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <p className="text-white text-lg lg:text-xl font-semibold leading-snug">
                We don't just build technology —
                <br />
                <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  we give life to it.
                </span>
              </p>
              <p className="text-white text-lg lg:text-xl font-semibold leading-snug">
                We don't just deliver projects —
                <br />
                <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  we deliver peace of mind.
                </span>
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-24 bg-white/15" />

            {/* Right: vision */}
            <div className="flex-1">
              <p className="text-gray-400 text-sm leading-relaxed text-center lg:text-left">
                As we move toward our{" "}
                <span className="font-bold text-red-400">Vision 2030</span>, we are writing our story —
                brick by brick — to become one of the best organizations for our customers, OEMs, partners,
                and employees, setting benchmarks in excellence, inclusion, and sustainability.
              </p>
            </div>
          </div>
        </div>

        {/* Ambient blurs */}
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── Core Values Grid ── */}
      <section
        ref={foundationSectionRef}
        className="py-14 lg:py-20 px-6 bg-gradient-to-b from-white to-gray-50/80 overflow-hidden"
      >
        <div className="max-w-[1100px] mx-auto">
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
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-[var(--apple-black)] tracking-tight leading-[1.08] max-w-2xl mx-auto">
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
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 mb-5 group-hover:bg-red-100 group-hover:scale-105 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                </div>
                <h4 className="text-[var(--apple-black)] font-semibold text-base mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {pillar.title}
                </h4>
                <p className="text-[var(--apple-gray)] text-sm leading-relaxed">
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
