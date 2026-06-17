import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/slider.css";

const INDUSTRIES = [
  "Telecom",
  "Retail",
  "Banking & Financial Services",
  "Automobile & Manufacturing",
  "IT/ITES",
  "Healthcare & Hospitality",
  "Government & Public Sector",
];

const CUSTOMER_LOGOS = [
  { name: "Airtel", img: "/about/profile-marquee/airtel.webp" },
  { name: "HT", img: "/about/profile-marquee/ht-media.webp" },
  { name: "Erricson", img: "/about/profile-marquee/ericsson.webp" },
  { name: "Energizer", img: "/about/profile-marquee/ienergizer.webp" },
  { name: "industryTower", img: "/about/profile-marquee/industower.webp" },
  { name: "JKCement", img: "/about/profile-marquee/jk-cement.webp" },
  { name: "Jubilant", img: "/about/profile-marquee/jubilant.webp" },
  { name: "Lal Path Lab", img: "/about/profile-marquee/lal-path-lab.webp" },
  { name: "TCL", img: "/about/profile-marquee/tcl.webp" },
  { name: "Nokia", img: "/about/profile-marquee/nokia.webp" },
  { name: "Cisco", img: "/about/profile-marquee/cisco.webp" },
  { name: "NSE", img: "/about/profile-marquee/nse.webp" },
  { name: "RJCorp", img: "/about/profile-marquee/rjcorp.webp" },
  { name: "CDAC", img: "/about/profile-marquee/cdac.webp" },
  { name: "PhonePe", img: "/about/profile-marquee/phonepe.webp" },
  { name: "Hero MotoCorp", img: "/about/profile-marquee/hero.webp" },
  { name: "Vodafone", img: "/about/profile-marquee/vodafone.webp" },
];

export default function ProfileHighlightSections() {
  const [whyVisible, setWhyVisible] = useState(false);
  const [industryVisible, setIndustryVisible] = useState(false);
  const whyRef = useRef(null);
  const industryRef = useRef(null);

  useEffect(() => {
    const observers = [];
    const createObserver = (ref, setVisible, threshold = 0.12) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setVisible(true);
      }, { threshold });
      obs.observe(ref.current);
      observers.push(obs);
    };
    createObserver(whyRef, setWhyVisible);
    createObserver(industryRef, setIndustryVisible);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Why Cache Digitech Section */}
      <section ref={whyRef} className="relative py-10 sm:py-16 md:py-28 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-red-50/30 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-16 items-center transition-all duration-700 ${whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="order-2 lg:order-1">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase text-red-500 mb-2 sm:mb-3">Why us</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-(--apple-black) tracking-tight leading-[1.12] mb-4 sm:mb-8">
                Why Cache Digitech
              </h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-(--apple-gray) mb-3 sm:mb-6">
                What makes Cache Digitech different is our agility, flexibility, and customer-first mindset.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-(--apple-gray) mb-3 sm:mb-6">
                We combine deep technical expertise with human understanding, offering accessible global support, world-class infrastructure, and a skilled team that delivers excellence with speed and empathy.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-(--apple-gray)">
                Every engagement reflects our commitment to quality, innovation, and enduring partnerships.
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border border-gray-100 relative aspect-[4/3] w-full max-w-md mx-auto sm:max-w-none sm:mx-0 min-h-[200px] sm:min-h-[320px] bg-gray-100 order-1 lg:order-2">
              <img
                src="/mission.webp"
                alt="Our Philosophy - excellence with agility, service with heart"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section ref={industryRef} className="relative py-10 sm:py-12 md:py-16 min-h-0 md:min-h-[50vh] flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(160deg, #1a1a1a 0%, #2d1f1f 40%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(220,38,38,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`mb-8 sm:mb-10 transition-all duration-700 ${industryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-400 mb-3">Sectors</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.08] max-w-2xl mx-auto mb-4">
              Our Industry Expertise
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-2">
              With a strong presence across multiple sectors, Cache Digitech partners with global technology leaders to deliver end-to-end solutions that drive efficiency, innovation, and customer satisfaction.
            </p>
          </div>
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 transition-all duration-700 ${industryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: industryVisible ? "150ms" : "0ms" }}>
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry}
                to={`/case-studies?industry=${encodeURIComponent(industry)}`}
                className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-300"
                aria-label={`View ${industry} case studies`}
              >
                {industry}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative py-12 sm:py-16 md:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #fafbfc 0%, #f1f5f9 50%, #fafbfc 100%)" }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-red-100/20 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-3">Clients</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mx-auto mb-4">
              Trusted By
            </h2>
            <p className="text-base sm:text-lg text-(--apple-gray) max-w-2xl mx-auto leading-relaxed px-2">
              Driven by trust, strengthened by results. Our clients are the proof of our commitment to quality.
            </p>
          </div>
          <div className="logo-marquee overflow-hidden py-4">
            <div className="logo-marquee__track">
              {[...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS].map((logo, idx) => (
                <div key={idx} className="logo-marquee__item shrink-0 min-w-[140px] h-[80px] rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/80 shadow-sm flex items-center justify-center px-5">
                  <img src={logo.img} alt={logo.name} className="max-h-10 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
