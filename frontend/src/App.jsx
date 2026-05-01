// src/App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useLenis } from "./context/LenisContext";
import { useAppLoader } from "./context/AppLoaderContext";

import Navbar from "./components/HomeComponent/Navbar";
import Footer from "./components/HomeComponent/Footer";
import CookieBanner from "./components/CookieBanner";

// Home is imported eagerly so the first paint after the splash does not wait on a lazy chunk (hero is above the fold)
import HomePage from "./Render_Pages/HomePage";
// Route-based code splitting: load other pages only when their route is visited
const ServiceDetail = lazy(() => import("./Render_Pages/service-detail"));
const Contact = lazy(() => import("./components/ServicesComponent/contact"));
const InsightPage = lazy(() => import("./Pages/InsightPage"));
const CommunityPage = lazy(() => import("./Pages/CommunitPage"));
const DeveloperTeam = lazy(() => import("./Pages/DeveloperTeam"));
const ContactUsPage = lazy(() => import("./Pages/ContactUsPage"));
const AboutCache = lazy(() => import("./Pages/AboutPage"));
const InnovationsPage = lazy(() => import("./Pages/InnovationsPage"));
const InnovationsProjectPage = lazy(() => import("./Pages/InnovationsProjectPage"));
const Profile = lazy(() => import("./components/AboutPageComponent/profile"));
const AwardsAndCertificationsPage = lazy(() => import("./Pages/AwardsAndCertificationsPage"));
const PartnershipCards = lazy(() => import("./components/AboutPageComponent/Cards"));
const TeamSection = lazy(() => import("./components/AboutPageComponent/Team"));
const PrivacyPolicyPage = lazy(() => import("./Pages/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./Pages/TermsOfUse"));
const Careers = lazy(() => import("./Pages/Career"));
const EPFAmendmentNotice = lazy(() => import("./Pages/EPFAmendmentNotice"));
const CloudServicesPage = lazy(() => import("./Pages/coudpage"));
const CloudSubServicePage = lazy(() => import("./Pages/CloudSubServicePage"));
const ServiceSubPage = lazy(() => import("./Pages/ServiceSubPage"));
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

/** No “Loading…” text after the global splash — avoids a second loading state on route transitions */
function RouteTransitionPlaceholder() {
  return <div className="min-h-[50vh] w-full" aria-hidden />;
}
function App() {
  const location = useLocation();
  const { scrollTo, resize } = useLenis();
  const { setLoaderDone } = useAppLoader();

  // Remove loader as soon as the GIF has played once (duration parsed from loading.gif: 33 frames = 5000ms)
  useEffect(() => {
    const loader = document.getElementById("app-loader");
    const img = loader?.querySelector("#app-loader-img");
    const gifPlayDurationMs = 5000; // One full loop of loading.gif
    const maxWaitMs = 1500;

    const removeLoader = () => {
      setLoaderDone(true);
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

  // Scroll to top on route change and resize Lenis so smooth scroll applies to new page content
  useEffect(() => {
    if (scrollTo) {
      scrollTo(0, { immediate: false });
      // Recalculate dimensions after route change so Lenis applies to the new page
      const t = resize ? setTimeout(resize, 100) : undefined;
      return () => { if (t) clearTimeout(t); };
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location.pathname, scrollTo, resize]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 min-h-0">
          <Suspense fallback={<RouteTransitionPlaceholder />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/service/infra" element={<InfrastructureServicesPage />} />
              <Route path="/service/network" element={<NetworkingServicesPage />} />
              <Route path="/service/cloud-solutions" element={<CloudServicesPage />} />
              <Route path="/cloudservices" element={<CloudServicesPage />} />
              <Route path="/cloud/:slug" element={<CloudSubServicePage />} />
              <Route path="/cybersecurity/:slug" element={<ServiceSubPage section="cybersecurity" />} />
              <Route path="/cybersecurity" element={<CybersecurityServicesPage />} />
              <Route path="/infrastructure/:slug" element={<ServiceSubPage section="infrastructure" />} />
              <Route path="/infrastructureservice" element={<InfrastructureServicesPage />} />
              <Route path="/data-analytics/:slug" element={<ServiceSubPage section="data-analytics" />} />
              <Route path="/aianddataservice" element={<AIDataServicesPage />} />
              <Route path="/managed-services/:slug" element={<ServiceSubPage section="managed-services" />} />
              <Route path="/manageservices" element={<ManagedServicesPage />} />
              <Route path="/consulting/:slug" element={<ServiceSubPage section="consulting" />} />
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
              <Route path="/innovations/projects/:slug" element={<InnovationsProjectPage />} />
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
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
}

export default App;
