import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Code, Smartphone, Cloud, TrendingUp, Shield, Users, ArrowRight } from "lucide-react";

// Service structure
// id: string
// title: string
// description: string
// icon: React.ReactNode
// iconBg: string
// iconColor: string
// backgroundImage?: string

const services = [
  {
    id: "infra",
    title: "Infra",
    description: "Custom web applications built with modern technologies. From responsive websites to complex web platforms, we deliver scalable solutions.",
    icon: <Code className="h-6 w-6" />,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    backgroundImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=500&fit=crop&crop=center"
  },
  {
    id: "network",
    title: "Network Solutions",
    description: "Native and cross-platform mobile apps that provide exceptional user experiences across iOS and Android devices.",
    icon: <Smartphone className="h-6 w-6" />,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    backgroundImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop&crop=center"
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services. We help businesses leverage cloud technologies for better performance and cost efficiency.",
    icon: <Cloud className="h-6 w-6" />,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop&crop=center"
  },
  {
    id: "AI",
    title: "Artificial Intelligence",
    description: "Transform your data into actionable insights. Advanced analytics, machine learning, and business intelligence solutions.",
    icon: <TrendingUp className="h-6 w-6" />,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop&crop=center"
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets. From vulnerability assessments to incident response planning.",
    icon: <Shield className="h-6 w-6" />,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
    backgroundImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=500&fit=crop&crop=center"
  },
  {
    id: "consulting",
    title: "IT Consulting",
    description: "Strategic technology consulting to align your IT infrastructure with business goals. Expert guidance for digital transformation.",
    icon: <Users className="h-6 w-6" />,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    backgroundImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=500&fit=crop&crop=center"
  }
];

// ServiceCardProps structure
// service: Service object
// onLearnMore?: function that takes serviceId string
// isMobile?: boolean

function ServiceCard({ service, onLearnMore, isMobile = false }) {
  if (isMobile) {
    return (
      <div
        className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-[0_20px_25px_-5px_rgb(219,11,11),0_10px_10px_-5px_rgba(22,15,15,0.295)]"
        onClick={() => onLearnMore?.(service.id)}
      >
        <div className="relative p-0">
          {/* Background Image for Mobile */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-150"
            style={{ backgroundImage: `url(${service.backgroundImage})` }}
          />
          
          {/* Background Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:bg-black/70 group-hover:backdrop-blur-md" />
          
          {/* Content */}
          <div className="relative z-10 p-4 text-white">
            <div className="flex items-center gap-4">
              {/* Large icon on the left */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
                <div className="text-xl text-white transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
              </div>
              
              {/* Content area */}
              <div className="flex-1">
                {/* Heading at same level as icon */}
                <h3 className="mb-1 text-base font-semibold text-white transition-colors duration-300 group-hover:text-[#ff0506]" data-testid={`title-${service.id}`}>
                  {service.title}
                </h3>
                
                {/* View More below heading, aligned right */}
                <div className="flex justify-end">
                  <p className="text-xs font-medium text-gray-400 transition-colors duration-300 group-hover:text-[#ff0506]" data-testid={`view-more-${service.id}`}>
                    View More
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-full cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-[0_20px_25px_-5px_rgb(219,11,11),0_10px_10px_-5px_rgba(22,15,15,0.295)]">
      <div className="relative h-full p-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-150"
          style={{ backgroundImage: `url(${service.backgroundImage})` }}
        />
        
        {/* Strong Background Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:bg-black/70 group-hover:backdrop-blur-md" />
        
        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
              <div className="text-white transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
            </div>
            <h3 className="mb-3 text-xl font-semibold transition-all duration-300 group-hover:scale-105 group-hover:text-[#ff0506]" data-testid={`title-${service.id}`}>
              {service.title}
            </h3>
            <p className="leading-relaxed text-white/90 transition-colors duration-300 group-hover:text-white" data-testid={`description-${service.id}`}>
              {service.description}
            </p>
          </div>
          <div className="mt-6">
            <button
              className="group-hover:text-[#ff0506] group-hover:scale-105 inline-flex items-center font-medium text-white transition-all duration-300 hover:translate-x-1"
              data-testid={`button-learn-more-${service.id}`}
              onClick={() => onLearnMore?.(service.id)}
            >
              Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [currentDesktopIndex, setCurrentDesktopIndex] = useState(0);
  const navigate = useNavigate();
  
  const servicesPerDesktopView = 3;
  const totalDesktopPages = Math.ceil(services.length / servicesPerDesktopView);

  const handleLearnMore = useCallback((serviceId) => {
    // Map service IDs to their corresponding routes and default sections
    const serviceRoutes = {
      'infra': '/infrastructureservice#audit',
      'network': '/service/network#audit', 
      'cloud-solutions': '/cloudservices#audit',
      'AI': '/aianddataservice#audit',
      'cybersecurity': '/cybersecurity#audit',
      'consulting': '/consultingservice#audit'
    };
    
    const route = serviceRoutes[serviceId] || `/service/${serviceId}`;
    navigate(route);
  }, [navigate]);

  const handleDesktopPrevious = useCallback(() => {
    if (currentDesktopIndex > 0) {
      setCurrentDesktopIndex(prev => prev - 1);
    }
  }, [currentDesktopIndex]);

  const handleDesktopNext = useCallback(() => {
    if (currentDesktopIndex < totalDesktopPages - 1) {
      setCurrentDesktopIndex(prev => prev + 1);
    }
  }, [currentDesktopIndex, totalDesktopPages]);

  return (
    <section className="flex h-screen flex-col bg-background overflow-hidden">
      <div className="flex-shrink-0 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#ff0506] font-bold text-foreground mb-2" data-testid="section-title">
          Our Services
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="section-description">
          Comprehensive solutions to help your business grow and succeed.
        </p>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 min-h-0">
        {/* Desktop Layout - 1 row x 3 columns with square cards */}
        <div className="hidden lg:flex flex-col max-w-6xl mx-auto justify-center" style={{ height: 'calc(100vh - 120px)' }}>
          {/* Desktop Grid Container with smooth transitions */}
          <div className="flex items-center justify-center overflow-hidden h-[60vh] max-h-[60vh]">
            <div 
              className="flex h-full transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentDesktopIndex * 100}%)`,
                width: `${totalDesktopPages * 100}%`
              }}
            >
              {Array.from({ length: totalDesktopPages }, (_, pageIndex) => (
                <div key={pageIndex} className="flex-shrink-0 w-full grid grid-cols-3 gap-8 px-8 h-full">
                  {services
                    .slice(pageIndex * servicesPerDesktopView, (pageIndex + 1) * servicesPerDesktopView)
                    .map((service) => (
                      <div key={service.id} className="w-full h-full max-h-full">
                        <ServiceCard
                          service={service}
                          onLearnMore={handleLearnMore}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons Below Cards */}
          <div className="mt-6 flex items-center justify-center gap-6 pb-4">
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-md transition-all duration-300 enabled:hover:bg-accent-foreground/5"
              onClick={handleDesktopPrevious}
              disabled={currentDesktopIndex === 0}
              data-testid="button-desktop-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Pagination Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalDesktopPages }, (_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${currentDesktopIndex === index ? 'bg-primary' : 'bg-border'}`}
                  data-testid={`desktop-dot-${index}`}
                />
              ))}
            </div>
            
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-md transition-all duration-300 enabled:hover:bg-accent-foreground/5"
              onClick={handleDesktopNext}
              disabled={currentDesktopIndex === totalDesktopPages - 1}
              data-testid="button-desktop-next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Layout - Vertical Scroll */}
        <div className="lg:hidden h-full">
          <div className="overflow-y-auto space-y-3 px-2 pb-2" style={{ height: 'calc(100vh - 170px)', marginBottom: '10px' }} data-testid="mobile-scroll-container">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="w-full"
                data-scroll-stop={index === services.length - 1 ? "true" : "false"}
              >
                <ServiceCard
                  service={service}
                  onLearnMore={handleLearnMore}
                  isMobile={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}