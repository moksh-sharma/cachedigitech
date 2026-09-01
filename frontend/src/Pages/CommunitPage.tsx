import { lazy, Suspense } from 'react';
import { Hero } from '../components/CommunityComponent/Code-component-1-26';
import { usePageScroll } from '../hooks/usePageScroll';

const IndustryVerticals = lazy(() =>
  import('../components/CommunityComponent/IndustryVerticals').then((m) => ({
    default: m.IndustryVerticals,
  }))
);
const Partners = lazy(() =>
  import('../components/CommunityComponent/Partners').then((m) => ({ default: m.Partners }))
);
const ClientsCards = lazy(() => import('../components/CommunityComponent/clientsCards'));

function BelowFoldFallback() {
  return <div className="min-h-[20vh] w-full" aria-hidden />;
}

export default function CommunityPage() {
  usePageScroll();

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Suspense fallback={<BelowFoldFallback />}>
          <IndustryVerticals />
          <Partners />
          <ClientsCards />
        </Suspense>
      </main>
    </div>
  );
}
