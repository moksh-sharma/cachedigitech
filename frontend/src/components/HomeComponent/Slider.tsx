import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../css/slider.css";

interface Slide {
  img: string;
  title: string;
  desc: string;
  link: string; // ✅ New property
}

const slides: Slide[] = [
  {
    img: "/images/consultingimg.webp",
    title: "Consulting & Auditing",
    desc: "Expert IT consulting and compliance audits to optimize performance.",
    link: "/consultingservice",
  },
  {
    img: "/images/aimlimg.webp",
    title: "Data AI",
    desc: "Harness the power of AI & ML for automation and smarter decision-making.",
    link: "/aianddataservice",
  },
  {
    img: "/images/cyberimg.webp",
    title: "Cyber Security",
    desc: "End-to-end security solutions to protect networks, applications.",
    link: "/cybersecurity",
  },
  {
    img: "/images/cloudimg.webp",
    title: "Cloud",
    desc: "Scalable and secure cloud infrastructure services.",
    link: "/cloudservices",
  },
  {
    img: "/manageservices.jpg",
    title: "Managed Services",
    desc: "Comprehensive IT management, monitoring, and support services.",
    link: "/managedservices",
  },
  {
    img: "/images/infraimg.webp",
    title: "Infra & Networking",
    desc: "Robust IT infra and network solutions to strengthen and accelerate digital transformation.",
    link: "/infrastructureservice",
  },
  {
    img: "/images/grc.png",
    title: "Sanchalan AI",
    desc: "AI-driven Governance, Risk, and Compliance platform to streamline operations.",
    link: "/grc-dashboard",
  },
];

const EXTENSION_COUNT = 3;
const extendedSlides = [
  ...slides.slice(-EXTENSION_COUNT),
  ...slides,
  ...slides.slice(0, EXTENSION_COUNT),
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(EXTENSION_COUNT);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ready, setReady] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Touch swipe
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    let cancelled = false;
    // Preload first few images to avoid layout jank
    const preload = Promise.all(
      slides.slice(0, 3).map(
        (s) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = s.img;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    );

    preload.then(() => {
      if (cancelled) return;
      // Enable transitions after first layout
      requestAnimationFrame(() => {
        setReady(true);
        setIsTransitioning(true);
        startAutoScroll();
      });
    });

    return () => {
      cancelled = true;
      stopAutoScroll();
    };
  }, []);

  const handlePrevClick = () => {
    if (!ready) return;
    stopAutoScroll();
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    startAutoScroll();
  };

  const handleNextClick = () => {
    if (!ready) return;
    stopAutoScroll();
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    startAutoScroll();
  };

  const getTransformValue = () => {
    if (!sliderRef.current || !slideRefs.current[currentIndex]) return 0;
    const activeSlide = slideRefs.current[currentIndex];
    const centerOffset =
      sliderRef.current.offsetWidth / 2 - activeSlide.offsetWidth / 2;
    const scrollOffset = activeSlide.offsetLeft;
    return centerOffset - scrollOffset;
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= slides.length + EXTENSION_COUNT) {
      setIsTransitioning(false);
      requestAnimationFrame(() => {
        setCurrentIndex(EXTENSION_COUNT);
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    } else if (currentIndex < EXTENSION_COUNT) {
      setIsTransitioning(false);
      requestAnimationFrame(() => {
        setCurrentIndex(slides.length + currentIndex);
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }
  };

  // ✅ Handle Touch Events (mobile swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipe = 50; // minimum swipe distance

    if (distance > minSwipe) {
      // Swipe left → Next slide
      handleNextClick();
    } else if (distance < -minSwipe) {
      // Swipe right → Prev slide
      handlePrevClick();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-gray-900 py-6">
      {/* Prev Button */}
      <button
        onClick={handlePrevClick}
        className="hidden md:block absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-black text-white p-3 rounded-full hover:bg-gray-900/90 transition-all duration-300 ease-out hover:scale-110 shadow-lg backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextClick}
        className="hidden md:block absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-black text-white p-3 rounded-full hover:bg-gray-900/90 transition-all duration-300 ease-out hover:scale-110 shadow-lg backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="relative w-full md:w-[50rem] overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flex flex-row py-8 ${
            isTransitioning ? "transition-transform duration-700 ease-out" : ""
          }`}
          style={{ transform: `translateX(${getTransformValue()}px)`, willChange: 'transform' }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              ref={(el) => (slideRefs.current[index] = el)}
              className={`flex-shrink-0 w-60 h-86 relative transition-all duration-700 ease-out
              ${index === currentIndex ? "transform scale-110 z-10" : "transform scale-90 z-0"}
              mx-2 sm:mx-4 rounded-xl overflow-hidden`}
              style={{
                filter: index !== currentIndex ? "brightness(0.5)" : "none",
              }}
            >
              <Link to={slide.link}>
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === currentIndex ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === currentIndex ? "high" : "auto"}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/240x344/000000/FFFFFF?text=Image+Unavailable";
                  }}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 text-white transition-opacity duration-800 ease-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="card">
                    <h3>{slide.title}</h3>
                    <p>{slide.desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
