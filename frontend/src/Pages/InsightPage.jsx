import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "../components/InsightComponent/hero-section";
import { ProblemsSection } from "../components/InsightComponent/problems-section";
import { CEOSection } from "../components/InsightComponent/ceo-section";
import { EventsSection } from "../components/InsightComponent/events-section";


export default function InsightPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-4">
        {/* <HeroSection /> */}
        <CEOSection />
        <EventsSection />
        <ProblemsSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}