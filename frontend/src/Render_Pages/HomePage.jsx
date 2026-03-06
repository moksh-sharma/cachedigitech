import HeroSection from '../components/HomeComponent/HeroSection'
import CacheSolutionsSection from '../components/HomeComponent/CacheSolutionsSection'
import { ProgressInNumbers } from '../components/HomeComponent/ProgressInNumbers'
import CTASection from '../components/HomeComponent/Subscribe'
import { BlogSection } from '../components/InsightComponent/blog-section'
import CareersSection from '../components/HomeComponent/CareersSection'
import { useEffect } from 'react'


export default function HomePage() {

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when page loads
  }, []);
  return (
    <>
      <HeroSection />
      <CacheSolutionsSection />
      <ProgressInNumbers />
      <BlogSection />
      <CareersSection />
      <CTASection />

      {/* Chatbot components removed */}

      {/* <FullScreenThreeImageSlider /> */}
    </>
  )
}
