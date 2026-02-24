import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Star, Zap, Shield, Users, Award, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import '../components/ServicesComponent/service-detail.css';

// Service detail structure
// id: string
// title: string
// description: string
// fullDescription: string
// servicePoints: string[]
// whyChooseUs: { title: string, description: string }
// benefits: Array of { title: string, description: string, icon: React.ReactNode }
// features: string[]
// technologies: string[]
// backgroundImage: string
// pricing: string

const serviceDetails = {

  'infra': {
    id: 'infra',
    title: 'Infrastructure Services',
    description: 'Robust IT infrastructure solutions for reliable business operations.',
    fullDescription: 'We provide comprehensive IT infrastructure services including server management, network setup, system administration, and hardware optimization to build reliable foundations for your business operations.',
    servicePoints: [
      'Server setup and configuration management',
      'Network infrastructure design and implementation',
      'System administration and monitoring',
      'Hardware procurement and installation',
      'Backup and disaster recovery solutions',
      'Performance monitoring and optimization',
      'Security hardening and compliance',
      'Infrastructure automation and scripting'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for Infrastructure Services?',
      description: 'Your IT infrastructure is the backbone of your business operations. We understand that reliable, scalable, and secure infrastructure is crucial for business continuity and growth. Our infrastructure experts design and implement robust solutions that ensure maximum uptime, optimal performance, and seamless scalability. We focus on building infrastructure that not only meets your current needs but also adapts to future requirements.'
    },
    benefits: [
      {
        title: 'High Availability',
        description: '99.9% uptime with redundant systems',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Secure Architecture',
        description: 'Enterprise-grade security and compliance',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'Scalable Solutions',
        description: 'Infrastructure that grows with your business',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: '24/7 Monitoring',
        description: 'Continuous monitoring and proactive support',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Cost Optimization',
        description: 'Efficient resource utilization and cost control',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Expert Support',
        description: 'Dedicated infrastructure specialists',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Server Management',
      'Network Configuration',
      'System Administration',
      'Hardware Setup',
      'Backup Solutions',
      'Performance Monitoring'
    ],
    technologies: ['Linux', 'Windows Server', 'VMware', 'Docker', 'Kubernetes', 'Ansible'],
    backgroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $3,000'
  },
  'network': {
    id: 'network',
    title: 'Network Solutions',
    description: 'Comprehensive networking services for seamless connectivity.',
    fullDescription: 'We provide comprehensive networking services including LAN/WAN setup, network security, wireless solutions, and network monitoring to ensure seamless connectivity and optimal network performance.',
    servicePoints: [
      'LAN/WAN network design and implementation',
      'Wireless network setup and optimization',
      'Network security configuration and monitoring',
      'VPN setup and remote access solutions',
      'Network troubleshooting and maintenance',
      'Bandwidth optimization and traffic management',
      'Network documentation and asset management',
      'Network performance monitoring and reporting'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for Network Solutions?',
      description: 'In today\'s connected world, reliable network infrastructure is essential for business operations. Our networking experts design and implement robust network solutions that ensure seamless connectivity, optimal performance, and enhanced security. We understand that network downtime can be costly, which is why we focus on building resilient networks with proactive monitoring and rapid response capabilities.'
    },
    benefits: [
      {
        title: 'Reliable Connectivity',
        description: 'Stable and consistent network performance',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Enhanced Security',
        description: 'Advanced network security and threat protection',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'Scalable Design',
        description: 'Network architecture that grows with your needs',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'Remote Access',
        description: 'Secure VPN and remote connectivity solutions',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Performance Monitoring',
        description: 'Real-time network monitoring and optimization',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Expert Support',
        description: 'Dedicated network specialists and 24/7 support',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'LAN/WAN Setup',
      'Wireless Networks',
      'Network Security',
      'VPN Solutions',
      'Network Monitoring',
      'Performance Optimization'
    ],
    technologies: ['Cisco', 'Juniper', 'Ubiquiti', 'Fortinet', 'Meraki', 'pfSense'],
    backgroundImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $4,000'
  },
  'cloud-solutions': {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services.',
    fullDescription: 'Transform your business with cloud-first solutions that optimize costs and build scalable infrastructure.',
    servicePoints: [
      'Cloud migration strategy and implementation',
      'Infrastructure as Code (IaC) setup',
      'Auto-scaling and load balancing',
      'Cost optimization and monitoring',
      'Security and compliance management',
      'Disaster recovery planning',
      'Multi-cloud and hybrid solutions',
      '24/7 monitoring and support'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for Cloud Solutions?',
      description: 'The cloud isn\'t just about moving your data off-site; it\'s about transforming how your business operates. Our cloud experts don\'t just migrate your systems – we reimagine them for the cloud-native world. We help you unlock unprecedented scalability, reduce costs, and ensure your infrastructure can adapt to whatever the future brings.'
    },
    benefits: [
      {
        title: 'Cost Savings',
        description: 'Reduce infrastructure costs by up to 40%',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Scalable',
        description: 'Auto-scale based on demand automatically',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'Reliable',
        description: '99.99% uptime with disaster recovery',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'Global Reach',
        description: 'Deploy worldwide with edge locations',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Secure',
        description: 'Enterprise-grade security and compliance',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Future Ready',
        description: 'Always up-to-date with latest technologies',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Cloud Migration',
      'Infrastructure as Code',
      'Auto-scaling Solutions',
      'Cost Optimization',
      'Security & Compliance',
      'Disaster Recovery'
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Terraform', 'Docker'],
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $3,000'
  },
  'AI': {
    id: 'AI',
    title: 'Artificial Intelligence',
    description: 'Advanced AI and machine learning solutions to drive innovation.',
    fullDescription: 'We provide cutting-edge artificial intelligence and machine learning solutions including predictive analytics, automation, chatbots, and intelligent data processing to help businesses innovate and stay competitive.',
    servicePoints: [
      'Machine learning model development and deployment',
      'Natural language processing and chatbot development',
      'Computer vision and image recognition systems',
      'Predictive analytics and forecasting models',
      'Process automation and intelligent workflows',
      'AI-powered recommendation systems',
      'Deep learning and neural network solutions',
      'AI integration and API development'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for AI Solutions?',
      description: 'Artificial Intelligence is transforming industries, and we help you harness its power to drive innovation and competitive advantage. Our AI experts develop custom solutions that automate processes, enhance decision-making, and create new opportunities for growth. We combine deep technical expertise with business understanding to deliver AI solutions that provide real value and measurable results.'
    },
    benefits: [
      {
        title: 'Intelligent Automation',
        description: 'Automate complex processes with AI-powered solutions',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Predictive Insights',
        description: 'Forecast trends and make proactive decisions',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'Enhanced Efficiency',
        description: 'Streamline operations and reduce manual work',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'Personalized Experiences',
        description: 'Deliver customized user experiences at scale',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Competitive Advantage',
        description: 'Stay ahead with cutting-edge AI technology',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Continuous Learning',
        description: 'AI systems that improve and adapt over time',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'Process Automation',
      'AI Integration'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face', 'Azure AI'],
    backgroundImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $7,000'
  },
  'cybersecurity': {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets.',
    fullDescription: 'Protect your organization from cyber threats with comprehensive security solutions and robust security measures.',
    servicePoints: [
      'Comprehensive security audits and assessments',
      'Vulnerability testing and penetration testing',
      'Security policy development and implementation',
      'Employee security training and awareness',
      'Incident response planning and execution',
      'Compliance management (GDPR, HIPAA, SOX)',
      'Network security and firewall configuration',
      'Continuous monitoring and threat detection'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for Cybersecurity?',
      description: 'In today\'s digital world, security isn\'t optional – it\'s essential. We don\'t just protect your systems; we build a security culture that makes your entire organization resilient against threats. Our proactive approach means we stop attacks before they happen, not after the damage is done. Sleep peacefully knowing your digital assets are fortress-strong.'
    },
    benefits: [
      {
        title: 'Threat Prevention',
        description: 'Stop attacks before they breach your systems',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: '24/7 Monitoring',
        description: 'Round-the-clock security surveillance',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'Compliance Ready',
        description: 'Meet all regulatory requirements effortlessly',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'Expert Team',
        description: 'Certified security professionals on your side',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Rapid Response',
        description: 'Immediate action on security incidents',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Peace of Mind',
        description: 'Focus on business while we handle security',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Security Audits',
      'Vulnerability Assessment',
      'Penetration Testing',
      'Security Training',
      'Incident Response',
      'Compliance Management'
    ],
    technologies: ['Nessus', 'Metasploit', 'Wireshark', 'Splunk', 'SIEM', 'Firewall'],
    backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $4,000'
  },
  'consulting': {
    id: 'consulting',
    title: 'IT Consulting',
    description: 'Strategic technology consulting and digital transformation.',
    fullDescription: 'Navigate digital transformation with expert guidance and strategic technology consulting services.',
    servicePoints: [
      'Technology strategy development and roadmapping',
      'Digital transformation planning and execution',
      'Process optimization and automation',
      'Vendor selection and technology evaluation',
      'Project management and implementation',
      'Change management and user adoption',
      'IT governance and risk assessment',
      'Technology investment analysis and ROI planning'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for IT Consulting?',
      description: 'Technology moves fast, but strategic thinking makes it work for you. We don\'t just recommend the latest tools – we craft technology strategies that align with your business vision. Our consulting approach combines deep technical knowledge with business acumen to ensure every technology decision drives your success forward, not just follows trends.'
    },
    benefits: [
      {
        title: 'Strategic Vision',
        description: 'Long-term technology roadmap aligned with goals',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Cost Effective',
        description: 'Optimize IT spend and maximize ROI',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'Expert Guidance',
        description: 'Industry veterans with proven track records',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'Change Management',
        description: 'Smooth transitions with minimal disruption',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Vendor Neutral',
        description: 'Unbiased recommendations for your needs',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Results Driven',
        description: 'Measurable outcomes and continuous improvement',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Technology Strategy',
      'Digital Transformation',
      'Process Optimization',
      'Vendor Selection',
      'Project Management',
      'Change Management'
    ],
    technologies: ['Agile', 'DevOps', 'ITIL', 'Prince2', 'Lean', 'Six Sigma'],
    backgroundImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $2,500'
  }
};

export default function ServiceDetail() {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      window.scrollTo(0, 0); // scroll to top when page loads
    }, []);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [serviceId]);

  useEffect(() => {
    if (!serviceId || !serviceDetails[serviceId]) return;
    
    const interval = setInterval(() => {
      setCurrentBenefitIndex((prev) => {
        const totalBenefits = serviceDetails[serviceId].benefits.length;
        const maxIndex = isMobile ? totalBenefits - 1 : Math.ceil(totalBenefits / 3) - 1;
        const nextIndex = prev + 1;
        
        // Reset to beginning when we've shown all original cards once
        if (nextIndex > maxIndex) {
          // Reset to the beginning without animation
          setIsTransitioning(false);
          setTimeout(() => {
            setCurrentBenefitIndex(0);
            setIsTransitioning(true);
          }, 50);
          return prev;
        }
        
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [serviceId, isMobile]);
  
  if (!serviceId || !serviceDetails[serviceId]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
      </div>
    );
  }
  
  const service = serviceDetails[serviceId];
  
  return (
    <div className={`min-h-screen bg-background transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <Button 
            variant="ghost" 
            className="self-start text-white hover:text-yellow-300 mb-6 transition-colors duration-300"
            onClick={() => navigate(-1)}
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Button>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up" data-testid="service-title">
            {service.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl animate-fade-in-up animation-delay-200" data-testid="service-description">
            {service.description}
          </p>
        </div>
      </div>
      
      {/* Service Details Points */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10" data-testid="service-details-title">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.servicePoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-card hover:shadow-md transition-shadow duration-300" data-testid={`service-point-${index}`}>
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{point}</span>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 bg-muted rounded-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" data-testid="why-choose-us-title">
            {service.whyChooseUs.title}
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto" data-testid="why-choose-us-description">
            {service.whyChooseUs.description}
          </p>
        </div>

        {/* Services & Benefits Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10 hidden-on-small-devices" data-testid="benefits-title">Services & Benefits</h2>
          
          {/* Desktop View - 3 columns in 1 row with auto-swapping */}
          <div className="hidden md:block">
            <div className="relative overflow-hidden">
              <div 
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ 
                  transform: `translateX(-${currentBenefitIndex * (100 / 3)}%)`,
                  width: `${Math.ceil(service.benefits.length / 3) * 100}%`
                }}
              >
                {Array.from({ length: Math.ceil(service.benefits.length / 3) }, (_, groupIndex) => (
                  <div key={`group-${groupIndex}`} className="w-full flex" style={{ width: '100%' }}>
                    {service.benefits.slice(groupIndex * 3, (groupIndex + 1) * 3).map((benefit, index) => (
                      <div key={`benefit-${groupIndex * 3 + index}`} className="w-1/3 px-4">
                        <Card className="h-full">
                          <CardContent className="p-6 flex flex-col items-center text-center h-full">
                            <div className="mb-6 p-3 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                              <div className="text-primary">
                                {benefit.icon}
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3" data-testid={`benefit-title-${groupIndex * 3 + index}`}>
                              {benefit.title}
                            </h3>
                            <p className="text-muted-foreground" data-testid={`benefit-description-${groupIndex * 3 + index}`}>
                              {benefit.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                    {/* Fill empty slots if needed */}
                    {service.benefits.slice(groupIndex * 3, (groupIndex + 1) * 3).length < 3 && 
                      Array.from({ length: 3 - service.benefits.slice(groupIndex * 3, (groupIndex + 1) * 3).length }, (_, emptyIndex) => (
                        <div key={`empty-${groupIndex}-${emptyIndex}`} className="w-1/3 px-4"></div>
                      ))
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View - Single card with auto-swapping - Hidden on small devices */}
          <div className="block md:hidden hidden-on-small-devices">
            <div className="relative overflow-hidden">
              <div 
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ 
                  transform: `translateX(-${currentBenefitIndex * 100}%)`,
                  width: `${service.benefits.length * 100}%`
                }}
              >
                {service.benefits.map((benefit, index) => (
                  <div key={`mobile-benefit-${index}`} className="px-4" style={{ width: `${100 / service.benefits.length}%`, flexShrink: 0 }}>
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center h-full">
                        <div className="mb-6 p-3 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                          <div className="text-primary">
                            {benefit.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3" data-testid={`mobile-benefit-title-${index}`}>
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`mobile-benefit-description-${index}`}>
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10" data-testid="key-features-title">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-card rounded-lg shadow-sm" data-testid={`feature-${index}`}>
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-accent/10 rounded-2xl p-8  md:p-12 text-center ">
          <h2 className="text-3xl font-bold mb-4" data-testid="cta-title">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            Let's turn your vision into reality with our expert {service.title.toLowerCase()} solutions.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            className="px-8 py-6 text-lg text-white bg-[#ff0506] font-medium animate-pulse hover:animate-none"
            onClick={() => navigate('/contactus')}
            data-testid="button-lets-make-it-happen"
          >
            Let's Make It Happen
          </Button>
        </div>
      </div>
    </div>
  );
}