// src/App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useLenis } from "./context/LenisContext";

import Navbar from "./components/HomeComponent/Navbar";
import Footer from "./components/HomeComponent/Footer";
import CookieBanner from "./components/CookieBanner";

// Route-based code splitting: load pages only when their route is visited
const HomePage = lazy(() => import("./Render_Pages/HomePage"));
const ServiceDetail = lazy(() => import("./Render_Pages/service-detail"));
const Contact = lazy(() => import("./components/ServicesComponent/contact"));
const InsightPage = lazy(() => import("./Pages/InsightPage"));
const CommunityPage = lazy(() => import("./Pages/CommunitPage"));
const DeveloperTeam = lazy(() => import("./Pages/DeveloperTeam"));
const ContactUsPage = lazy(() => import("./Pages/ContactUsPage"));
const AboutCache = lazy(() => import("./Pages/AboutPage"));
const InnovationsPage = lazy(() => import("./Pages/InnovationsPage"));
const Profile = lazy(() => import("./components/AboutPageComponent/profile"));
const AwardsAndCertificationsPage = lazy(() => import("./Pages/AwardsAndCertificationsPage"));
const PartnershipCards = lazy(() => import("./components/AboutPageComponent/Cards"));
const TeamSection = lazy(() => import("./components/AboutPageComponent/Team"));
const PrivacyPolicyPage = lazy(() => import("./Pages/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./Pages/TermsOfUse"));
const Careers = lazy(() => import("./Pages/Career"));
const EPFAmendmentNotice = lazy(() => import("./Pages/EPFAmendmentNotice"));
const CloudServicesPage = lazy(() => import("./Pages/coudpage"));
const CybersecurityServicesPage = lazy(() => import("./Pages/cybersecurity"));
const InfrastructureServicesPage = lazy(() => import("./Pages/infrastructureservicepage"));
const NetworkingServicesPage = lazy(() => import("./Pages/NetworkingServicepage"));
const AIDataServicesPage = lazy(() => import("./Pages/aianddataservicepage"));
const TelecomPage = lazy(() => import("./Pages/TelecomePage"));
const NetworkingConsultingPage = lazy(() => import("./Pages/consultingservicePage"));
const ManagedServicesPage = lazy(() => import("./Pages/ManagedServices"));
const GRC = lazy(() => import("./Pages/GRCDashbaord"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const BlogDetailPage = lazy(() => import("./Pages/BlogDetailPage"));
const BlogsPage = lazy(() => import("./Pages/BlogsPage"));
const CaseStudiesPage = lazy(() => import("./Pages/CaseStudiesPage"));
const CampaignsPage = lazy(() => import("./Pages/CampaignsPage"));
const NewsletterPage = lazy(() => import("./Pages/NewsletterPage"));
const OffersPage = lazy(() => import("./Pages/OffersPage"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-gray-400 text-sm">Loading…</div>
    </div>
  );
}
function App() {
  const location = useLocation();
  const { scrollTo } = useLenis();

  // Remove loader as soon as the GIF has played once (duration parsed from loading.gif: 33 frames = 5000ms)
  useEffect(() => {
    const loader = document.getElementById("app-loader");
    const img = loader?.querySelector("#app-loader-img");
    const gifPlayDurationMs = 5000; // One full loop of loading.gif
    const maxWaitMs = 1500;

    const removeLoader = () => {
      if (loader?.parentNode) loader.remove();
    };

    const scheduleRemove = () => {
      setTimeout(removeLoader, gifPlayDurationMs);
    };

    if (!loader) return;

    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        scheduleRemove();
      } else {
        img.addEventListener("load", scheduleRemove, { once: true });
        img.addEventListener("error", removeLoader, { once: true });
      }
    } else {
      scheduleRemove();
    }
    setTimeout(removeLoader, maxWaitMs);
  }, []);

  // Scroll to top on route change (smooth via Lenis when available)
  useEffect(() => {
    if (scrollTo) {
      scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location.pathname, scrollTo]);

  const isAdmin = false; // Backend removed; no admin panel

  return (
    <>
      <div className={!isAdmin ? "min-h-screen flex flex-col" : ""}>
        {!isAdmin && <Navbar />}
        {/* Page routes — flex-1 so content fills space and footer sticks to bottom */}
        <main className={!isAdmin ? "flex-1 min-h-0" : ""}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/service/infra" element={<InfrastructureServicesPage />} />
              <Route path="/service/network" element={<NetworkingServicesPage />} />
              <Route path="/service/cloud-solutions" element={<CloudServicesPage />} />
              <Route path="/cloudservices" element={<CloudServicesPage />} />
              <Route path="/cybersecurity" element={<CybersecurityServicesPage />} />
              <Route path="/infrastructureservice" element={<InfrastructureServicesPage />} />
              <Route path="/aianddataservice" element={<AIDataServicesPage />} />
              <Route path="/manageservices" element={<ManagedServicesPage />} />
              <Route path="/consultingservice" element={<NetworkingConsultingPage />} />
              <Route path="/grc-dashboard" element={<GRC />} />
              <Route path="/telecom" element={<TelecomPage />} />



              <Route path="/contact" element={<Contact />} />
              <Route path="/insights" element={<InsightPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/admin" element={<Navigate to="/" replace />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/developerteam" element={<DeveloperTeam />} />
              <Route path="/contactus" element={<ContactUsPage />} />
              <Route path="/about" element={<AboutCache />} />
              <Route path="/innovations" element={<InnovationsPage />} />
              <Route path="/about/profile" element={<Profile />} />
              <Route path="/about/awards" element={<AwardsAndCertificationsPage />} />
              <Route path="/about/certifications" element={<Navigate to="/about/awards" replace />} />
              <Route path="/about/alliances" element={<PartnershipCards />} />
              <Route path="/about/leadership" element={<TeamSection />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/epf-amendment-notice" element={<EPFAmendmentNotice />} />

              {/* Notification pages */}
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/newsletter" element={<NewsletterPage />} />
              <Route path="/offers" element={<OffersPage />} />

              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          </Suspense>
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <CookieBanner />}
      </div>
    </>
  );
}

export default App;
