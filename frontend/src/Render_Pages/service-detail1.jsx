import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Star, Zap, Shield, Users, Award, Sparkles } from 'lucide-react';

const serviceDetails = {
  'infra': {
    id: 'infra',
    title: 'Infra',
    description: 'Custom web applications built with modern technologies.',
    fullDescription: 'We specialize in creating custom web applications using cutting-edge technologies like React, Node.js, and modern cloud infrastructure.',
    servicePoints: [
      'Responsive and mobile-first design approach',
      'Modern JavaScript frameworks (React, Vue, Angular)',
      'RESTful API development and integration',
      'Database design and optimization',
      'Performance optimization and caching',
      'SEO implementation and best practices',
      'Security measures and data protection',
      'Cross-browser compatibility testing'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for Web Development?',
      description: 'We don\'t just build websites; we craft digital experiences that drive results. Our team combines technical expertise with creative vision to deliver web solutions that not only look stunning but perform exceptionally. From concept to launch, we ensure your web presence stands out in the digital landscape and converts visitors into customers.'
    },
    benefits: [
      {
        title: 'Faster Loading',
        description: 'Optimized code for lightning-fast performance',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security and 99.9% uptime',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'SEO Optimized',
        description: 'Built for search engines from the ground up',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'User Focused',
        description: 'Intuitive design that converts visitors to customers',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Quality Assured',
        description: 'Rigorous testing and quality control processes',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Future Ready',
        description: 'Scalable architecture that grows with your business',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Responsive Design',
      'Modern JavaScript Frameworks',
      'API Integration',
      'Database Design',
      'Performance Optimization',
      'SEO Implementation'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
    backgroundImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $5,000'
  },
  'network': {
    id: 'network',
    title: 'Network Solutions',
    description: 'Native and cross-platform mobile apps.',
    fullDescription: 'Build engaging mobile applications for iOS and Android platforms that provide exceptional user experiences.',
    servicePoints: [
      'Native iOS and Android app development',
      'Cross-platform solutions with React Native',
      'App Store and Google Play optimization',
      'Push notification implementation',
      'Offline functionality and data synchronization',
      'In-app purchase integration',
      'Real-time features and live updates',
      'App analytics and performance monitoring'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for Mobile Apps?',
      description: 'Mobile is the future, and we\'re here to make your app stand out in crowded app stores. Our mobile development expertise ensures your app not only functions flawlessly across all devices but also delivers an engaging user experience that keeps users coming back. We understand mobile user behavior and build apps that drive engagement and retention.'
    },
    benefits: [
      {
        title: 'Cross-Platform',
        description: 'One codebase for both iOS and Android',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Native Performance',
        description: 'Smooth, fast, and responsive user experience',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'App Store Ready',
        description: 'Optimized for app store approval and ranking',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'User Engagement',
        description: 'Push notifications and retention features',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Offline Support',
        description: 'Works seamlessly even without internet',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'Regular Updates',
        description: 'Continuous improvement and feature additions',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Native iOS & Android Development',
      'Cross-platform Solutions',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality',
      'Real-time Synchronization'
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'Expo'],
    backgroundImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $8,000'
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
    description: 'Transform your data into actionable insights.',
    fullDescription: 'Unlock the power of your data with advanced analytics and machine learning solutions for data-driven decisions.',
    servicePoints: [
      'Data visualization and dashboard creation',
      'Machine learning model development',
      'Real-time analytics implementation',
      'Predictive analytics and forecasting',
      'Business intelligence solutions',
      'Data pipeline automation',
      'Statistical analysis and reporting',
      'Data mining and pattern recognition'
    ],
    whyChooseUs: {
      title: 'Why Choose Us for Data Analytics?',
      description: 'Data is the new oil, but raw data is just potential energy. We transform your data into powerful insights that drive real business decisions. Our analytics solutions don\'t just show you what happened – they predict what will happen and recommend what you should do next. Turn your data into your competitive advantage.'
    },
    benefits: [
      {
        title: 'Actionable Insights',
        description: 'Clear recommendations from complex data',
        icon: <Zap className="h-6 w-6" />
      },
      {
        title: 'Predictive Power',
        description: 'Forecast trends and anticipate changes',
        icon: <Shield className="h-6 w-6" />
      },
      {
        title: 'Real-time',
        description: 'Live dashboards and instant alerts',
        icon: <Star className="h-6 w-6" />
      },
      {
        title: 'Data-Driven',
        description: 'Make decisions based on facts, not guesses',
        icon: <Users className="h-6 w-6" />
      },
      {
        title: 'Automated',
        description: 'Self-updating reports and recommendations',
        icon: <Award className="h-6 w-6" />
      },
      {
        title: 'ROI Focused',
        description: 'Analytics that directly impact your bottom line',
        icon: <Sparkles className="h-6 w-6" />
      }
    ],
    features: [
      'Data Visualization',
      'Machine Learning Models',
      'Real-time Analytics',
      'Predictive Analytics',
      'Business Intelligence',
      'Data Pipeline Automation'
    ],
    technologies: ['Python', 'R', 'TensorFlow', 'Tableau', 'Apache Spark', 'SQL'],
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&crop=center',
    pricing: 'Starting from $6,000'
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

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [serviceId]);

  useEffect(() => {
    if (!serviceId || !serviceDetails[serviceId]) return;

    const interval = setInterval(() => {
      setCurrentBenefitIndex((prev) =>
        (prev + 1) % serviceDetails[serviceId].benefits.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [serviceId]);

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
          <button
            className="self-start text-white hover:text-yellow-300 mb-6 transition-colors duration-300 flex items-center gap-2 px-4 py-2"
            onClick={() => navigate(-1)}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </button>
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

        {/* Auto-scrolling Benefits Cards */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10" data-testid="benefits-title">Services & Benefits</h2>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentBenefitIndex * (100 / 3)}%)`,
                width: `${service.benefits.length * (100 / 3)}%`
              }}
            >
              {service.benefits.map((benefit, index) => (
                <div key={index} className="p-4" style={{ width: `${100 / service.benefits.length}%` }}>
                  <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-col items-center text-center h-full">
                      <div className="mb-6 p-3 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                        <div className="text-primary">
                          {benefit.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3" data-testid={`benefit-title-${index}`}>
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`benefit-description-${index}`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
        <div className="mt-24 bg-accent/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="cta-title">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            Let's turn your vision into reality with our expert {service.title.toLowerCase()} solutions.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-6 text-lg text-white bg-[#ff0506] font-medium rounded-lg animate-pulse hover:animate-none"
            data-testid="button-lets-make-it-happen"
          >
            Let's Make It Happen
          </button>
        </div>
      </div>
    </div>
  );
}