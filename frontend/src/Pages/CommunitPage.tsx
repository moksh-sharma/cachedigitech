import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/CommunityComponent/Code-component-1-26';
import { IndustryVerticals } from '../components/CommunityComponent/IndustryVerticals';
import { Partners } from '../components/CommunityComponent/Partners';
import ClientsCards from '../components/CommunityComponent/clientsCards';

export default function CommunityPage() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL for section navigation
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # symbol
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0); // scroll to top when page loads without hash
    }
  }, [location]);
  
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <IndustryVerticals />
        <Partners />
        <ClientsCards />
      </main>
    </div>
  );
}