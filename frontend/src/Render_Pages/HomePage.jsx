import { lazy, Suspense, useEffect } from 'react'
import HeroSection from '../components/HomeComponent/HeroSection'

const CacheSolutionsSection = lazy(() => import('../components/HomeComponent/CacheSolutionsSection'))
const ProgressInNumbers = lazy(() =>
  import('../components/HomeComponent/ProgressInNumbers').then((m) => ({ default: m.ProgressInNumbers }))
)
const CTASection = lazy(() => import('../components/HomeComponent/Subscribe'))
const BlogSection = lazy(() =>
  import('../components/InsightComponent/blog-section').then((m) => ({ default: m.BlogSection }))
)
const CareersSection = lazy(() => import('../components/HomeComponent/CareersSection'))

function BelowFoldFallback() {
  return <div className="min-h-[24px] w-full" aria-hidden />
}

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <HeroSection />
      <Suspense fallback={<BelowFoldFallback />}>
        <CacheSolutionsSection />
        <ProgressInNumbers />
        <BlogSection />
        <CareersSection />
        <CTASection />
      </Suspense>
    </>
  )
}
