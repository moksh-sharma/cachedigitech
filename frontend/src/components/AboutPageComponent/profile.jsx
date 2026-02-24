import { useState, useRef, useEffect } from 'react';
import { Shield, Cloud, Database, Cog, BarChart3, HeadphonesIcon, Globe, Users, Target, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../css/slider.css';

export default function Profile() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [offeringsVisible, setOfferingsVisible] = useState(false);
  const [whyVisible, setWhyVisible] = useState(false);
  const [industryVisible, setIndustryVisible] = useState(false);
  const aboutRef = useRef(null);
  const offeringsRef = useRef(null);
  const whyRef = useRef(null);
  const industryRef = useRef(null);
  const carouselPausedRef = useRef(false);

  const CARD_WIDTH = 380;
  const CARD_GAP = 32;
  const CARD_STEP = CARD_WIDTH + CARD_GAP;
  const CAROUSEL_INTERVAL_MS = 4000;

  const coreOfferings = [
    {
      icon: <Cog className="h-8 w-8 text-red-600" />,
      title: "System Integration & IT Infrastructure Solutions",
      description: "Designing and implementing secure, scalable, and high-performing IT ecosystems by integrating cutting-edge technologies across compute, storage, and network layers. Building the digital backbone of enterprises through advanced data centers, private and hybrid cloud environments, and resilient IT frameworks built for performance and growth."
    },
    {
      icon: <Shield className="h-8 w-8 text-black" />,
      title: "Cybersecurity",
      description: "Delivering robust, end-to-end security architectures and compliance frameworks that safeguard businesses and ensure continuity in an evolving threat landscape. Protecting enterprises with end-to-end security architectures, compliance solutions, and managed detection & response services."
    },
    {
      icon: <Cloud className="h-8 w-8 text-red-600" />,
      title: "Cloud & Digital Transformation",
      description: "Helping enterprises modernize through hybrid and multi-cloud strategies that enhance scalability, agility, and operational efficiency. Enabling organizations to move to the cloud confidently through hybrid, private, and public cloud solutions, ensuring business continuity and scalability."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-black" />,
      title: "Consulting & Audit",
      description: "Our Consulting & Audit division specializes in designing and implementing end-to-end infrastructure solutions that are scalable, secure, and compliant. We conduct audits, gap analyses, and risk assessments, and our consulting experts ensure your systems remain robust, optimized, and aligned with compliance and business objectives."
    },
    {
      icon: <Database className="h-8 w-8 text-red-600" />,
      title: "Data Analytics & Artificial Intelligence (AI)",
      description: "Our Data Analytics team transforms complex data into meaningful business insights, empowering leaders to make informed, strategic, and data-driven decisions. Our energetic AI team works across industries to solve complex challenges, delivering predictive dashboards, intelligent insights, and enhanced user experiences that drive innovation and efficiency."
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8 text-black" />,
      title: "Managed Services",
      description: "At the heart of our delivery excellence lies our world-class service infrastructure, comprising a 24x7 Global Network Operations Center (NOC) and a dedicated Security Operations Center (SOC). These centers ensure continuous monitoring, rapid response, and compliance — keeping our customers' operations secure, connected, and protected worldwide. Offering round-the-clock operational support, proactive monitoring, and optimization services to help clients focus on their core business goals."
    }
  ];

  const n = coreOfferings.length;
  const extendedOfferings = [...coreOfferings, ...coreOfferings, ...coreOfferings];
  const totalExtended = extendedOfferings.length;

  const [activeOfferingIndex, setActiveOfferingIndex] = useState(n);
  const [transitionDisabled, setTransitionDisabled] = useState(false);

  useEffect(() => {
    if (n <= 0) return;
    const id = setInterval(() => {
      if (carouselPausedRef.current) return;
      setActiveOfferingIndex((i) => {
        if (i === totalExtended - 1) {
          setTransitionDisabled(true);
          return n;
        }
        return i + 1;
      });
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [n, totalExtended]);

  useEffect(() => {
    if (!transitionDisabled) return;
    const id = requestAnimationFrame(() => setTransitionDisabled(false));
    return () => cancelAnimationFrame(id);
  }, [transitionDisabled, activeOfferingIndex]);

  useEffect(() => {
    const observers = [];
    const createObserver = (ref, setVisible, threshold = 0.12) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
      obs.observe(ref.current);
      observers.push(obs);
    };
    createObserver(aboutRef, setAboutVisible);
    createObserver(offeringsRef, setOfferingsVisible);
    createObserver(whyRef, setWhyVisible);
    createObserver(industryRef, setIndustryVisible);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const goNext = () => {
    setActiveOfferingIndex((i) => {
      if (i === totalExtended - 1) {
        setTransitionDisabled(true);
        return n;
      }
      return i + 1;
    });
  };

  const goPrev = () => {
    setActiveOfferingIndex((i) => {
      if (i === 0) {
        setTransitionDisabled(true);
        return 2 * n - 1;
      }
      return i - 1;
    });
  };

  const industries = [
    "Telecom",
    "Retail",
    "Banking & Financial Services", 
    "Automobile & Manufacturing",
    "IT/ITES",
    "Healthcare & Hospitality",
    "Government & Public Sector"
  ];

  // Customer logos (using available assets in /public)
  const customerLogos = [
    { name: 'Airtel', img: '/clients/airtel.png' },
    { name: 'HT', img: '/clients/HT Media.png' },
    { name: 'Erricson', img: '/clients/ericsson.png' },
    { name: 'Energizer', img: '/clients/ienergizer.png' },
    { name: 'industryTower', img: '/clients/industower.png' },
    { name: 'JKCement', img: '/clients/jk cement.png' },
    { name: 'Jubilant', img: '/clients/jubilant.png' },
    { name: 'Lal Path Lab', img: '/clients/lal path lab.png' },
    { name: 'TCL', img: '/clients/tcl.png' },
    { name: 'Nokia', img: '/clients/nokia.png' },
    { name: 'Cisco', img: '/Partners/cisco.png' },
    { name: 'NSE', img: '/clients/nse.png' },
    { name: 'RJCorp', img: '/clients/rjcorp.webp' },
    { name: 'CDAC', img: '/clients/cdac.jpeg' },
    { name: 'PhonePe', img: '/clients/phonepe.png' },
    { name: 'Hero MotoCorp', img: '/clients/hero.png' },
    { name: 'Vodafone', img: '/clients/vodafone.png' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--apple-black)] min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            src="/videos/aboutpage.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>
        <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
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
              <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
              Global Presence
            </span>
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-red-600 hover:border-red-500 transition-all duration-300 text-sm font-medium">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              34+ Years Experience
            </span>
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-red-600 hover:border-red-500 transition-all duration-300 text-sm font-medium">
              <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
              24×7 Support
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 z-10 pointer-events-none">
          <div className="w-12 h-0.5 bg-white/40 rounded-full" />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-100/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] uppercase text-red-500 mb-3">About us</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-light text-[var(--apple-black)] tracking-tight leading-[1.08] max-w-2xl mx-auto">
              About Cache Digitech
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-[var(--apple-gray)]">
                Cache Digitech is a leading System Integration, Consulting and IT Infrastructure partner with over three decades of experience. From New Delhi, Mumbai, and Dubai we help organizations innovate, secure, and scale with 24×7 support and solutions built on engineering excellence and trust. We serve enterprises across telecom, BFSI, manufacturing, and the public sector with a global partner ecosystem and a focus on digital transformation.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-red-500/20 relative aspect-[4/3] min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Our Commitment — teamwork and partnership"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section ref={offeringsRef} className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}>
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-100/20 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] uppercase text-red-500 mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-light text-[var(--apple-black)] tracking-tight leading-[1.08] max-w-2xl mx-auto mb-4">
              Our Core Offerings
            </h2>
            <p className="text-xl text-[var(--apple-gray)] max-w-2xl mx-auto">
              Comprehensive technology solutions designed to transform and elevate your business
            </p>
          </div>

          <div
            className={`relative overflow-hidden ${offeringsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}
            onMouseEnter={() => { carouselPausedRef.current = true; }}
            onMouseLeave={() => { carouselPausedRef.current = false; }}
          >
            <div className="relative flex justify-center items-start min-h-[520px] py-8">
              {extendedOfferings.map((offering, index) => {
                const offset = index - activeOfferingIndex;
                const isActive = offset === 0;
                const scale = isActive ? 1 : Math.abs(offset) === 1 ? 0.9 : 0.75;
                const opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.85 : 0.5;
                const zIndex = isActive ? 10 : Math.max(0, 5 - Math.abs(offset));
                return (
                  <div
                    key={index}
                    className="absolute top-0 group bg-white rounded-2xl p-8 border border-gray-100 shadow-xl ease-out cursor-pointer flex flex-col"
                    style={{
                      width: CARD_WIDTH,
                      height: 520,
                      left: '50%',
                      transform: `translateX(calc(-50% + ${offset * CARD_STEP}px)) scale(${scale})`,
                      opacity,
                      zIndex,
                      transition: transitionDisabled ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                    }}
                    onClick={() => setActiveOfferingIndex(n + (index % n))}
                  >
                    <div className="mb-5 w-14 h-14 shrink-0 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors [&>svg]:h-8 [&>svg]:w-8">
                      {offering.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--apple-black)] mb-3 leading-tight shrink-0">{offering.title}</h3>
                    <p className="text-[var(--apple-gray)] text-[15px] leading-relaxed">{offering.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center gap-4 pt-2 pb-4">
              <button
                type="button"
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-[var(--apple-black)] hover:bg-gray-50 hover:border-gray-300 transition-colors"
                aria-label="Previous offering"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <span className="w-8 h-0.5 bg-gray-300 rounded" aria-hidden />
              <button
                type="button"
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-[var(--apple-black)] hover:bg-gray-50 hover:border-gray-300 transition-colors"
                aria-label="Next offering"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cache Digitech Section */}
      <section ref={whyRef} className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-red-50/30 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] uppercase text-red-500 mb-3">Why us</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--apple-black)] tracking-tight leading-[1.08] mb-8">
                Why Cache Digitech
              </h2>
              <p className="text-lg leading-relaxed text-[var(--apple-gray)] mb-6">
                What makes Cache Digitech different is our agility, flexibility, and customer-first mindset.
              </p>
              <p className="text-lg leading-relaxed text-[var(--apple-gray)] mb-6">
                We combine deep technical expertise with human understanding, offering accessible global support, world-class infrastructure, and a skilled team that delivers excellence with speed and empathy.
              </p>
              <p className="text-lg leading-relaxed text-[var(--apple-gray)]">
                Every engagement reflects our commitment to quality, innovation, and enduring partnerships.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative aspect-[4/3] min-h-[320px] bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Our Philosophy — excellence with agility, service with heart"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section ref={industryRef} className="relative py-20 md:py-28 min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #2d1f1f 40%, #1a1a1a 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(220,38,38,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`mb-14 transition-all duration-700 ${industryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] uppercase text-red-400 mb-3">Sectors</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.08] max-w-2xl mx-auto mb-4">
              Our Industry Expertise
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              With a strong presence across multiple sectors, Cache Digitech partners with global technology leaders to deliver end-to-end solutions that drive efficiency, innovation, and customer satisfaction.
            </p>
          </div>
          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-700 ${industryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: industryVisible ? '150ms' : '0ms' }}>
            {industries.map((industry, index) => (
              <Link
                key={index}
                to={`/insights?industry=${encodeURIComponent(industry)}#success-stories`}
                className="px-5 py-2.5 text-base font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-300"
                aria-label={`View ${industry} case studies`}
              >
                {industry}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 50%, #fafbfc 100%)' }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-red-100/20 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] uppercase text-red-500 mb-3">Clients</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--apple-black)] tracking-tight leading-[1.08] max-w-2xl mx-auto mb-4">
              Trusted By
            </h2>
            <p className="text-lg text-[var(--apple-gray)] max-w-2xl mx-auto leading-relaxed">
              Driven by trust, strengthened by results. Our clients are the proof of our commitment to quality.
            </p>
          </div>
          <div className="logo-marquee overflow-hidden py-4">
            <div className="logo-marquee__track">
              {[...customerLogos, ...customerLogos].map((logo, idx) => (
                <div key={idx} className="logo-marquee__item flex-shrink-0 min-w-[140px] h-[80px] rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/80 shadow-sm flex items-center justify-center px-5">
                  <img src={logo.img} alt={logo.name} className="max-h-10 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative py-20 md:py-28 overflow-hidden text-white" style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #2d1515 50%, #1a1a1a 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(220,38,38,0.12),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] uppercase text-red-400 mb-3">Purpose</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08] text-white max-w-2xl mx-auto">
              Vision & Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 lg:p-10 hover:bg-white/15 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-red-300" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed text-white/90">
                To become the most trusted technology partner and the best company for our customers, OEMs, and employees—powered by a global presence, best-in-class service infrastructure, 24×7 NOC, and secure, compliant SOC.
              </p>
              <p className="text-lg leading-relaxed text-white/80 mt-4">
                We aim to continuously earn trust and confidence through operational excellence, accessibility, and unwavering commitment to quality.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 lg:p-10 hover:bg-white/15 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-300" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed text-white/90">
                To design and deliver agile, intelligent, and secure digital ecosystems that elevate business performance, strengthen digital trust, and drive sustainable global growth—while making every customer, partner, and employee proud to be part of the Cache Digitech journey.
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