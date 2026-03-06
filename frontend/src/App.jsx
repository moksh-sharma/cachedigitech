// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useLenis } from "./context/LenisContext";

import Navbar from "./components/HomeComponent/Navbar";
import Footer from "./components/HomeComponent/Footer";
import CookieBanner from "./components/CookieBanner";
import HomePage from "./Render_Pages/HomePage";
import ServiceDetail from "./Render_Pages/service-detail";
import Contact from "./components/ServicesComponent/contact";
import InsightPage from "./Pages/InsightPage";
import CommunityPage from "./Pages/CommunitPage";
import DeveloperTeam from "./Pages/DeveloperTeam";
import ContactUsPage from "./Pages/ContactUsPage";
import AboutCache from "./Pages/AboutPage";
import InnovationsPage from "./Pages/InnovationsPage";
import Profile from "./components/AboutPageComponent/profile";
import AwardsAndCertificationsPage from "./Pages/AwardsAndCertificationsPage";
import PartnershipCards from "./components/AboutPageComponent/Cards";
import TeamSection from "./components/AboutPageComponent/Team";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import TermsOfUsePage from "./Pages/TermsOfUse";
import Careers from "./Pages/Career";
import EPFAmendmentNotice from "./Pages/EPFAmendmentNotice";
// import CloudServicesPage from "./Pages/coudpage";
import CloudServicesPage from "./Pages/coudpage";
import CybersecurityServicesPage from "./Pages/cybersecurity";
import InfrastructureServicesPage from "./Pages/infrastructureservicepage";
import NetworkingServicesPage from "./Pages/NetworkingServicepage";
import AIDataServicesPage from "./Pages/aianddataservicepage";
import TelecomPage from "./Pages/TelecomePage";
// import ConsultingServicesPage from "./Pages/consultingservicePage";
// import InfrastructureServicesPage from "./Pages/NetworkingServicepage";
import NetworkingConsultingPage from "./Pages/consultingservicePage";
import ManagedServicesPage from "./Pages/ManagedServices";
import GRC from "./Pages/GRCDashbaord";
import NotFoundPage from "./Pages/NotFoundPage";
import BlogCmsPage from "./Pages/BlogCmsPage";
import BlogDetailPage from "./Pages/BlogDetailPage";
import BlogsPage from "./Pages/BlogsPage";
import CaseStudiesPage from "./Pages/CaseStudiesPage";
// Notification pages
import CampaignsPage from "./Pages/CampaignsPage";
import NewsletterPage from "./Pages/NewsletterPage";
import OffersPage from "./Pages/OffersPage";
// removed Chatbot import
function App() {
  const location = useLocation();
  const { scrollTo } = useLenis();

  // Scroll to top on route change (smooth via Lenis when available)
  useEffect(() => {
    if (scrollTo) {
      scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location.pathname, scrollTo]);

  const isAdmin = location.pathname === '/admin';

  return (
    <>
      <div className={!isAdmin ? "min-h-screen flex flex-col" : ""}>
        {!isAdmin && <Navbar />}
        {/* Page routes — flex-1 so content fills space and footer sticks to bottom */}
        <main className={!isAdmin ? "flex-1 min-h-0" : ""}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/service/infra" element={<InfrastructureServicesPage />} />
            <Route path="/service/network" element={<NetworkingServicesPage />} />
            <Route path="/service/cloud-solutions" element={<CloudServicesPage />} />
            {/* <Route path="/service/cybersecurity" element={<CybersecurityServicesPage />} />
        <Route path="/service/AI" element={<AIDataServicesPage />} />
        <Route path="/consultingservice" element={<NetworkingConsultingPage />} */}


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
            <Route path="/admin" element={<BlogCmsPage />} />
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
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <CookieBanner />}
      </div>
    </>
  );
}

export default App;
