import { useState, useRef, useEffect } from 'react';
import { Shield, Cloud, Database, Cog, BarChart3, HeadphonesIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const CORE_OFFERINGS = [
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

const CAROUSEL_INTERVAL_MS = 4000;

export default function CoreOfferingsSection() {
  const [offeringsVisible, setOfferingsVisible] = useState(false);
  const [viewWidth, setViewWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [activeOfferingIndex, setActiveOfferingIndex] = useState(CORE_OFFERINGS.length);
  const [transitionDisabled, setTransitionDisabled] = useState(false);
  const sectionRef = useRef(null);
  const carouselPausedRef = useRef(false);

  const n = CORE_OFFERINGS.length;
  const extendedOfferings = [...CORE_OFFERINGS, ...CORE_OFFERINGS, ...CORE_OFFERINGS];
  const totalExtended = extendedOfferings.length;

  const isMobile = viewWidth < 768;
  const CARD_WIDTH = isMobile ? Math.min(340, viewWidth - 48) : 380;
  const CARD_GAP = isMobile ? 24 : 32;
  const CARD_STEP = CARD_WIDTH + CARD_GAP;
  const CARD_HEIGHT = isMobile ? 420 : 520;

  useEffect(() => {
    const onResize = () => setViewWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOfferingsVisible(true); }, { threshold: 0.12 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
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

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-100/20 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-3">What we do</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mx-auto mb-4">
            Our Core Offerings
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--apple-gray) max-w-2xl mx-auto px-2">
            Comprehensive technology solutions designed to transform and elevate your business
          </p>
        </div>

        <div
          className={`relative overflow-hidden flex flex-col ${offeringsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}
          onMouseEnter={() => { carouselPausedRef.current = true; }}
          onMouseLeave={() => { carouselPausedRef.current = false; }}
        >
          <div
            className="relative flex justify-center items-start py-6 sm:py-8"
            style={{ minHeight: CARD_HEIGHT + 24 }}
          >
            {extendedOfferings.map((offering, index) => {
              const offset = index - activeOfferingIndex;
              const isActive = offset === 0;
              const scale = isActive ? 1 : Math.abs(offset) === 1 ? 0.9 : 0.75;
              const opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.85 : 0.5;
              const zIndex = isActive ? 10 : Math.max(0, 5 - Math.abs(offset));
              return (
                <div
                  key={index}
                  className="absolute top-0 group bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100 shadow-xl ease-out cursor-pointer flex flex-col overflow-y-auto"
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    left: '50%',
                    transform: `translateX(calc(-50% + ${offset * CARD_STEP}px)) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: transitionDisabled ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                  }}
                  onClick={() => setActiveOfferingIndex(n + (index % n))}
                >
                  <div className="mb-3 sm:mb-5 w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-8 sm:[&>svg]:w-8">
                    {offering.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-(--apple-black) mb-2 sm:mb-3 leading-tight shrink-0 line-clamp-none sm:line-clamp-2">{offering.title}</h3>
                  <p className="text-(--apple-gray) text-sm sm:text-[15px] leading-relaxed line-clamp-none overflow-y-auto">{offering.description}</p>
                </div>
              );
            })}
          </div>
          <div className="relative z-10 flex justify-center items-center gap-4 pt-4 pb-2 shrink-0">
            <button
              type="button"
              onClick={goPrev}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-(--apple-black) hover:bg-gray-50 hover:border-gray-300 transition-colors"
              aria-label="Previous offering"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="w-8 h-0.5 bg-gray-300 rounded" aria-hidden />
            <button
              type="button"
              onClick={goNext}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-(--apple-black) hover:bg-gray-50 hover:border-gray-300 transition-colors"
              aria-label="Next offering"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
