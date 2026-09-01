import { useState, useRef, useEffect } from 'react';
import { Shield, Cloud, Globe, Users, Target, Eye } from 'lucide-react';
import CoreOfferingsSection from './CoreOfferingsSection';
import ProfileHighlightSections from './ProfileHighlightSections';

export default function Profile() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [aboutVisible, setAboutVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observers = [];
    const createObserver = (ref, setVisible, threshold = 0.12) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
      obs.observe(ref.current);
      observers.push(obs);
    };
    createObserver(aboutRef, setAboutVisible);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-(--apple-black) min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/videos/aboutpage.gif"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
        </div>
        <div className="absolute inset-0 overflow-hidden z-1 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.3)' }}
          >
            Cache Digitech Pvt. Ltd.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            A leading System Integration, Consulting and IT Infrastructure company empowering organizations to innovate, secure, and scale for over three decades in a digital-first world.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-red-600 hover:border-red-500 transition-all duration-300 text-sm font-medium">
              <Globe className="h-4 w-4 mr-2 shrink-0" />
              Global Presence
            </span>
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-red-600 hover:border-red-500 transition-all duration-300 text-sm font-medium">
              <Users className="h-4 w-4 mr-2 shrink-0" />
              34+ Years Experience
            </span>
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-red-600 hover:border-red-500 transition-all duration-300 text-sm font-medium">
              <Shield className="h-4 w-4 mr-2 shrink-0" />
              Support
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 z-10 pointer-events-none">
          <div className="w-12 h-0.5 bg-white/40 rounded-full" />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative py-12 sm:py-16 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-100/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-3">About us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mx-auto">
              About Cache Digitech
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-(--apple-gray)">
                Cache Digitech is a leading System Integration, Consulting and IT Infrastructure partner with over three decades of experience. From New Delhi, Mumbai, and Dubai we help organizations innovate, secure, and scale with support and solutions built on engineering excellence and trust. We serve enterprises across telecom, BFSI, manufacturing, and the public sector with a global partner ecosystem and a focus on digital transformation.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-red-500/20 relative aspect-4/3 min-h-[240px] sm:min-h-[320px] order-1 md:order-2">
              <img
                src="/leadership-booth.webp"
                alt="Our Commitment - teamwork and partnership"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <CoreOfferingsSection />

      <ProfileHighlightSections />

      {/* Vision & Mission Section */}
      <section className="relative py-12 sm:py-16 md:py-28 overflow-hidden text-white" style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #2d1515 50%, #1a1a1a 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(220,38,38,0.12),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-400 mb-3">Purpose</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.08] text-white max-w-2xl mx-auto">
              Vision & Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-8 lg:p-10 hover:bg-white/15 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-red-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-white/90">
                To become the most trusted technology partner and the best company for our customers, OEMs, and employees-powered by a global presence, best-in-class service infrastructure, NOC, and secure, compliant SOC.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-white/80 mt-4">
                We aim to continuously earn trust and confidence through operational excellence, accessibility, and unwavering commitment to quality.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-8 lg:p-10 hover:bg-white/15 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-white/90">
                To design and deliver agile, intelligent, and secure digital ecosystems that elevate business performance, strengthen digital trust, and drive sustainable global growth-while making every customer, partner, and employee proud to be part of the Cache Digitech journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      {/* <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl mb-4">Cache Digitech Pvt. Ltd.</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Empowering organizations to innovate, secure, and scale in a digital first world.
          </p>
          <div className="mt-6 flex justify-center space-x-8">
            <span className="text-gray-400">New Delhi</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Mumbai</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Dubai</span>
          </div>
        </div>
      </footer> */}
    </div>
  );
}