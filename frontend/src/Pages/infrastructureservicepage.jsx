import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Server, HardDrive, Cpu, Monitor, Network, Users, 
  CheckCircle, TrendingUp, ArrowRight, Target, Database,
  FileText, Shield, Settings, Zap,
  Globe
} from 'lucide-react';

const InfrastructureServicesPage = () => {
  const [animatedText, setAnimatedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL for section navigation
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0); // scroll to top when page loads
    }
  }, [location]);

  // Hero section animated texts
  const heroTexts = [
    'Build Robust Infrastructure for Digital Excellence',
    'Scalable, Reliable, and High-Performance Solutions',
    'Your Partner in Infrastructure Transformation'
  ];

  useEffect(() => {
    const currentText = heroTexts[textIndex];
    let charIndex = 0;
    
    const typeWriter = setInterval(() => {
      if (charIndex < currentText.length) {
        setAnimatedText(currentText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeWriter);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % heroTexts.length);
          setAnimatedText('');
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typeWriter);
  }, [textIndex]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      id: 'consult',
      label: 'Consult',
      icon: Users,
      title: 'What We Consult',
      subtitle: 'Expert guidance for infrastructure strategy, technology roadmaps, and digital transformation initiatives',
      description: 'Our infrastructure consulting services help organizations develop comprehensive technology strategies aligned with business objectives. We provide expert guidance in infrastructure planning, technology selection, capacity planning, and modernization roadmaps to ensure optimal performance and scalability.',
      keyFeatures: [
        { icon: Target, title: 'Strategy Development', desc: 'Comprehensive infrastructure roadmap creation' },
        { icon: Cpu, title: 'Technology Planning', desc: 'Hardware and software technology selection' },
        { icon: TrendingUp, title: 'Capacity Planning', desc: 'Future growth and scalability planning' },
        { icon: FileText, title: 'Documentation', desc: 'Complete infrastructure documentation and standards' }
      ]
    },
    {
      id: 'design',
      label: 'Design',
      icon: Settings,
      title: 'What We Design',
      subtitle: 'Custom infrastructure solutions designed for performance, scalability, and reliability',
      description: 'Our infrastructure design services create robust, scalable architectures tailored to your specific requirements. We design comprehensive solutions covering servers, storage, networking, virtualization, and cloud integration that provide optimal performance while supporting future growth and business requirements.',
      keyFeatures: [
        { icon: Server, title: 'Server Architecture', desc: 'High-performance server and compute design' },
        { icon: Network, title: 'Network Design', desc: 'Scalable and secure network architecture' },
        { icon: Database, title: 'Storage Solutions', desc: 'Advanced storage and data management design' },
        { icon: Globe, title: 'Cloud Integration', desc: 'Hybrid and multi-cloud architecture design' }
      ]
    },
    {
      id: 'build',
      label: 'Build',
      icon: Cpu,
      title: 'What We Build',
      subtitle: 'End-to-end infrastructure deployment with seamless integration and minimal business disruption',
      description: 'Our infrastructure build services provide complete implementation and deployment of IT infrastructure solutions. From server provisioning and network setup to storage configuration and system integration, we handle every aspect of infrastructure deployment while ensuring minimal business disruption and optimal performance.',
      keyFeatures: [
        { icon: Server, title: 'Server Deployment', desc: 'Complete server provisioning and configuration' },
        { icon: Network, title: 'Network Implementation', desc: 'Network infrastructure setup and configuration' },
        { icon: HardDrive, title: 'Storage Integration', desc: 'Storage systems deployment and optimization' },
        { icon: Settings, title: 'System Integration', desc: 'Seamless integration with existing systems' }
      ]
    },
    {
      id: 'operate',
      label: 'Operate & Manage',
      icon: Monitor,
      title: 'What We Operate & Manage',
      subtitle: '24/7 infrastructure monitoring, management, and support for optimal performance and reliability',
      description: 'Our managed infrastructure services provide round-the-clock monitoring and management of your IT infrastructure. With 24/7 operations center coverage, proactive monitoring, and rapid issue resolution, we ensure your infrastructure operates at peak performance while you focus on core business activities.',
      keyFeatures: [
        { icon: Clock, title: '24/7 Monitoring', desc: 'Continuous infrastructure monitoring and alerting' },
        { icon: Shield, title: 'Proactive Management', desc: 'Preventive maintenance and optimization' },
        { icon: Zap, title: 'Rapid Response', desc: 'Quick issue resolution and support' },
        { icon: TrendingUp, title: 'Performance Optimization', desc: 'Ongoing performance tuning and improvements' }
      ]
    },
    {
      id: 'migrate',
      label: 'Data Center Migration',
      icon: ArrowRight,
      title: 'What We Migrate',
      subtitle: 'Seamless data center migration services with zero downtime and complete business continuity',
      description: 'Our data center migration services provide comprehensive planning and execution for relocating your entire IT infrastructure. From legacy systems to modern cloud environments, we ensure seamless transitions with minimal business disruption, maintaining data integrity and system performance throughout the migration process.',
      keyFeatures: [
        { icon: Target, title: 'Migration Planning', desc: 'Comprehensive migration strategy and timeline development' },
        { icon: Shield, title: 'Data Protection', desc: 'Complete data backup and security during migration' },
        { icon: Clock, title: 'Zero Downtime', desc: 'Business continuity with minimal service interruption' },
        { icon: CheckCircle, title: 'Quality Assurance', desc: 'Thorough testing and validation post-migration' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        id="hero"
        className="relative h-[80vh] bg-cover bg-center scroll-mt-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 max-w-4xl">
            <div className="mb-6">
              <Server className="w-16 h-16 mx-auto mb-4" aria-hidden />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4 tracking-tight">
              Infra & Networking
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed text-white/95">
              Building robust, scalable, and high-performance IT infrastructure solutions
            </p>
            <div className="h-8" aria-live="polite">
              <p className="text-lg">
                {animatedText}<span className="animate-pulse" aria-hidden>|</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation (below hero, sticky on scroll) */}
      <nav aria-label="Service sections" className="bg-white border-b border-red-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {services.map((service) => {
              const IconComponent = service.icon;
              const isActive = activeSection === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => scrollToSection(service.id)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Go to ${service.label}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'text-red-600 bg-red-50 border-red-200 shadow-sm'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" aria-hidden />
                  <span>{service.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className="py-16 lg:py-24 px-4 sm:px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="mb-6">
                {React.createElement(service.icon, { className: "w-16 h-16 text-red-600 mx-auto mb-4" })}
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{service.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{service.subtitle}</p>
            </div>

            {/* Content Section */}
            <div className="mb-16">
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto text-center">
                {service.description}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.keyFeatures.map((feature, featureIndex) => (
                  <div key={featureIndex} className="text-center p-6 bg-gray-50 rounded-lg">
                    {React.createElement(feature.icon, { className: "w-12 h-12 text-red-600 mx-auto mb-4" })}
                    <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            {index < services.length - 1 && (
              <div className="border-t border-gray-200 my-16"></div>
            )}
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Infrastructure?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Partner with Cache for end-to-end infrastructure consulting, design, build, and managed operations. Let's build a foundation that scales with your business.
          </p>
          <Link
            to="/contactus"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InfrastructureServicesPage;