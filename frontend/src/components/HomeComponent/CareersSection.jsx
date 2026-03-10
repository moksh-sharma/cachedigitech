import React from "react";
import { Link } from "react-router-dom";

const CAREERS_HERO_IMAGE = "/images/careers-meeting.png";

export default function CareersSection() {
  return (
    <section
      id="careers"
      className="relative overflow-hidden scroll-mt-20"
      style={{ background: "linear-gradient(180deg, #fafbfc 0%, #f1f5f9 50%, #fafbfc 100%)" }}
    >
      {/* Main strip: image + content + CTA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pt-0 pb-12 lg:pb-16">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-100/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left: Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-lg md:text-xl font-extrabold tracking-[0.3em] uppercase text-red-500 mb-3">
              Careers at Cache
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mb-6">
              Explore new opportunities
            </h2>
            <p className="text-(--apple-gray) text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Join a team that values innovation, integrity, and impact. From technology to business development—find your path and grow with Cache Digitech.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-full transition-colors duration-300 ease-out shadow-md hover:shadow-lg group"
            >
              View open roles
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 ease-out group-hover:translate-x-0.5" aria-hidden>
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src={CAREERS_HERO_IMAGE}
              alt="Careers at Cache Digitech"
              className="w-full h-full object-cover aspect-4/3"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
