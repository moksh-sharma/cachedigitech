import HeroSection, { LatestHighlightsSection } from '../components/HomeComponent/HeroSection'
import FreeVapt from '../components/HomeComponent/FreeVapt'
import CacheSolutionsSection from '../components/HomeComponent/CacheSolutionsSection'
// import CacheSolutionsSection from '../components/HomeComponent/CacheSolutions'
import ServicesSection from '../components/HomeComponent/services-section'
import GlobalPartnersSection from '../components/HomeComponent/Globalpartners'
import PartnershipSection from '../components/HomeComponent/PartnershipSection'
import { ProgressInNumbers } from '../components/HomeComponent/ProgressInNumbers'
import CTASection from '../components/HomeComponent/Subscribe'
// removed Chatbot imports
import PartnershipCards from '../components/AboutPageComponent/Cards'
import { useEffect } from 'react'


export default function HomePage() {

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when page loads
  }, []);
  return (
    <>
      <HeroSection />
      {/* <FreeVapt /> */}
      {/* <ChatBot  /> */}

      {/* <CacheSolutionsSection /> */}
      <CacheSolutionsSection />
      {/* <CacheSolutionsSection /> */}

      {/* <ServicesSection /> */}
      <LatestHighlightsSection />
      {/* <GlobalPartnersSection /> */}
      <PartnershipSection />
      {/* <PartnershipCards /> */}
      <ProgressInNumbers />
      <CTASection />  

      {/* Chatbot components removed */}

      {/* <FullScreenThreeImageSlider /> */}
    </>
  )
}
