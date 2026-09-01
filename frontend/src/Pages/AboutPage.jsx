import React, { lazy, Suspense } from "react";
import { Target, Users, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import { useContent } from "../context/ContentContext";
import { usePageScroll } from '../hooks/usePageScroll';

const CEOSection = lazy(() =>
  import("../components/InsightComponent/ceo-section").then((m) => ({ default: m.CEOSection }))
);
const AwardsSection = lazy(() => import("../components/AboutPageComponent/ImageSlider"));
const Certifications = lazy(() => import("../components/AboutPageComponent/Certifications"));
const CoreOfferingsSection = lazy(() => import("../components/AboutPageComponent/CoreOfferingsSection"));
const CacheSolutionsSection = lazy(() => import("../components/HomeComponent/CacheSolutionsSection"));

function BelowFoldFallback() {
  return <div className="min-h-[16vh] w-full" aria-hidden />;
}

const DEFAULT_ABOUT = {
  conceptOfCache: { title: "About Cache Digitech", body: "Cache Digitech is a global system integrator that partners with leaders in business and society to tackle their most important challenges and capture their greatest opportunities." },
  profileOfCache: { title: "About Cache", body: "Since its founding in 1991, Cache has been a pioneer in business strategy. Today, we work closely with clients to empower their organizations to grow, build sustainable competitive advantage, and drive positive societal impact." },
  missionVision: { title: "Our Mission", body: "Cache Digitech is a global system integrator firm dedicated to unlocking the potential of the world's innovators. Our approach is guided by five fundamental principles: Innovative Solutions, Collaborative Growth, and Integrity & Leadership." },
};

function AboutCache() {
  usePageScroll();
  const concept = useContent('about', 'conceptOfCache');
  const profile = useContent('about', 'profileOfCache');
  const mission = useContent('about', 'missionVision');

  const principles = [
    {
      icon: Lightbulb,
      title: "Innovative Solutions",
      description: "We challenge conventional thinking to deliver creative and impactful solutions for complex challenges."
    },
    {
      icon: Users,
      title: "Collaborative Growth",
      description: "We partner with clients and teams to drive sustainable success and lasting organizational value."
    },
    {
      icon: Shield,
      title: "Integrity & Leadership",
      description: "We operate with transparency and accountability, addressing challenges decisively while upholding the highest ethical standards."
    }
  ];

  return (
    <div className="w-full">
      {/* ===== Video Section ===== */}
      <div id="concept-of-cache" className="relative w-full h-screen overflow-hidden">
        {/* Background (GIF) — LCP: eager */}
        <img
          src="/videos/aboutpage.gif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-8 lg:px-12 text-white z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{concept.title || DEFAULT_ABOUT.conceptOfCache.title}</h1>
          <p className="max-w-2xl text-base sm:text-lg mb-4 sm:mb-6">
            {concept.body || DEFAULT_ABOUT.conceptOfCache.body}
          </p>
        </div>
      </div>

      {/* ===== Company Stats Section ===== */}
      <div id="profile-of-cache" className="w-full bg-white py-16 px-6 sm:px-8 lg:px-12 text-center relative ">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-4">{profile.title || DEFAULT_ABOUT.profileOfCache.title}</h2>
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-800 leading-relaxed mb-16">
          {profile.body || DEFAULT_ABOUT.profileOfCache.body}
        </p>
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 md:gap-12 mb-12 text-center">
  <div>
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">1991</h2>
    <p className="text-gray-700 text-sm sm:text-base">Founded By</p>
    <p className="text-gray-700 text-sm sm:text-base">Prarthana Gupta</p>
  </div>

  <div>
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">800cr+</h2>
    <p className="text-gray-700 text-sm sm:text-base">Annual Revenue</p>
  </div>

  <div>
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">300+</h2>
    <p className="text-gray-700 text-sm sm:text-base">
      Indian Cities Serving <br className="hidden sm:block" />
      spanning multiple industries
    </p>
  </div>
</div>
      </div>

      {/* ===== Our Mission Section ===== */}
      <div id="mission-vision" className="w-full bg-gray-50 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-bold text-red-600 mb-4">{mission.title || DEFAULT_ABOUT.missionVision.title}</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {mission.body || DEFAULT_ABOUT.missionVision.body}
              </p>

              <div className="space-y-6">
                {principles.map((principle, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <principle.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{principle.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-red-600 mb-2">
                      <Lightbulb className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Innovation</h4>
                    <p className="text-gray-600 text-xs">Cutting-edge solutions</p>
                  </div>

                  <div className="bg-linear-to-br from-red-100 to-red-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mt-8">
                    <div className="text-red-600 mb-2">
                      <Target className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Precision</h4>
                    <p className="text-gray-600 text-xs">Strategic execution</p>
                  </div>

                  <div className="bg-linear-to-br from-red-200 to-red-300 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-red-700 mb-2">
                      <Users className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Partnership</h4>
                    <p className="text-gray-600 text-xs">Collaborative growth</p>
                  </div>

                  <div className="bg-linear-to-br from-red-300 to-red-400 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mt-8">
                    <div className="text-red-700 mb-2">
                      <Shield className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Integrity</h4>
                    <p className="text-gray-600 text-xs">Trust & transparency</p>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-red-500">
                    <TrendingUp className="w-12 h-12 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<BelowFoldFallback />}>
        <div id="team">
          <CEOSection />
        </div>

        <AwardsSection />
        <Certifications sectionOnly />
        <CoreOfferingsSection />

        <div id="meaning-of-logo">
          <CacheSolutionsSection />
        </div>
      </Suspense>
    </div>
  );
}

export default AboutCache;
