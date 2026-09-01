import { ProblemsSection } from "../components/InsightComponent/problems-section";
import { CEOSection } from "../components/InsightComponent/ceo-section";
import { EventsSection } from "../components/InsightComponent/events-section";
import { usePageScroll } from '../hooks/usePageScroll';


export default function InsightPage() {
  usePageScroll({ delayMs: 150 });

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