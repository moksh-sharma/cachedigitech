import { useEffect, useState, useRef } from "react";
import { Star, Award, Users } from "lucide-react";

export function Partners() {
  const stats = [
    { number: 100, suffix: "+", label: "Technology Partners", icon: Star },
    { number: 300, suffix: "+", label: "Certified Engineers", icon: Award },
    { number: 34, suffix: "+", label: "Years Partnership", icon: Users }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            setTrigger((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-10 lg:mb-12 transition-all duration-600 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-lg md:text-xl font-extrabold tracking-[0.25em] uppercase text-red-500 mb-2">
            By the numbers
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-gray-900 tracking-tight">
            Trusted scale & experience
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100/80 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center sm:border-r border-gray-200/80 last:border-r-0 transition-all duration-600 ease-out ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                <StatCounter
                  key={`${index}-${trigger}`}
                  value={stat.number}
                  suffix={stat.suffix}
                  label={stat.label}
                  Icon={stat.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCounter({
  value,
  suffix,
  label,
  Icon
}: {
  value: number;
  suffix: string;
  label: string;
  Icon: React.ElementType;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(
        parseFloat((startValue + (value - startValue) * eased).toFixed(1))
      );
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 w-full">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 flex items-center justify-center ring-1 ring-red-100/50">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
      </div>
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums text-red-500 tracking-tight">
        {Number.isInteger(value) ? Math.round(count) : count}
        {suffix}
      </div>
      <div className="text-gray-600 text-xs sm:text-sm font-medium max-w-[120px] leading-snug">
        {label}
      </div>
    </div>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
