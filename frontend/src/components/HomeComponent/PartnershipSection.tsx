import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, Zap } from 'lucide-react';

const PartnershipSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const partnerships = [
    {
      icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: 'Best-in-Class Solutions',
      description:
        'Access to cutting-edge technologies and enterprise-grade platforms',
    },
    {
      icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: 'Expert Support',
      description:
        'Direct access to vendor support and specialized technical expertise',
    },
    {
      icon: <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: 'Future-Ready',
      description:
        'Stay ahead with early access to new features and technologies',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)',
      }}
    >
      {/* Ambient blurs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-red-100/25 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-red-50/20 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading — matches image: pill, Strategic PARTNERSHIPS, description */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-400/80 px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" aria-hidden />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-red-500">
              Global Network
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[var(--apple-black)] tracking-tight leading-[1.08] max-w-2xl mx-auto mb-4">
            Strategic <span className="text-red-500">PARTNERSHIPS</span>
          </h2>
          <p className="text-[var(--apple-gray)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Driving collaborative innovation through global alliances and integrated technology frameworks designed for the modern enterprise.
          </p>
        </div>

        {/* Cards — animated on scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {partnerships.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 120}ms` }}
            >
              <Card icon={item.icon} title={item.title} description={item.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="group h-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300">
    <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-xl bg-red-50 text-red-500 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-[var(--apple-black)] mb-3 group-hover:text-red-600 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-[var(--apple-gray)] leading-relaxed">
      {description}
    </p>
  </div>
);

export default PartnershipSection;
