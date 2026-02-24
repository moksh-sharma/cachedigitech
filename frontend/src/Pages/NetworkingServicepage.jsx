import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Network, Router, Wifi, Cable, Globe, Users, 
  CheckCircle, XCircle, TrendingUp, DollarSign, 
  Clock, Star, ArrowRight, Target, Database,
  FileText, Shield, Settings, Zap, Eye,
  Monitor, Server, Lock, AlertTriangle, Radio
} from 'lucide-react';

const NetworkingServicesPage = () => {
  const [activeTab, setActiveTab] = useState('audit');
  const [animatedText, setAnimatedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
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
  
    
  const navigate = useNavigate();

  // Hero section animated texts
  const heroTexts = [
    'Connect Your Business with Advanced Network Solutions',
    'Reliable, Secure, and High-Performance Networking',
    'Your Partner in Network Infrastructure Excellence'
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

  const tabs = [
    {
      id: 'audit',
      label: 'Audit',
      icon: Eye,
      heroImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      content: {
        title: 'Network Assessment & Performance Audit',
        subtitle: 'Comprehensive evaluation of your network infrastructure, performance analysis, and security assessment',
        about: {
          description: 'Our network audit services provide thorough assessment of your entire network infrastructure, including LAN/WAN performance, security configurations, bandwidth utilization, and connectivity analysis. We identify bottlenecks, security vulnerabilities, and optimization opportunities to ensure your network meets current and future business requirements.',
          keyFeatures: [
            { icon: Network, title: 'Network Topology Analysis', desc: 'Complete network infrastructure mapping and analysis' },
            { icon: TrendingUp, title: 'Performance Assessment', desc: 'Bandwidth utilization and traffic flow analysis' },
            { icon: Shield, title: 'Security Evaluation', desc: 'Network security posture and vulnerability assessment' },
            { icon: Router, title: 'Equipment Audit', desc: 'Hardware inventory and lifecycle assessment' }
          ]
        },
        prosAndCons: {
          pros: [
            'Identifies network performance bottlenecks and capacity issues',
            'Discovers security vulnerabilities and compliance gaps',
            'Provides detailed network documentation and asset inventory',
            'Reveals cost optimization opportunities and upgrade needs',
            'Ensures network aligns with business growth requirements'
          ],
          cons: [
            'Assessment may require network monitoring and access permissions',
            'Could temporarily impact network performance during testing',
            'May reveal more infrastructure issues than initially anticipated',
            'Comprehensive audit requires time and coordination across teams'
          ]
        },
        services: [
          {
            title: 'Network Performance & Capacity Analysis',
            description: 'Comprehensive analysis of network performance including bandwidth utilization, latency measurements, throughput testing, and capacity planning for future growth.',
            benefits: ['Performance optimization', 'Capacity planning', 'Bottleneck identification']
          },
          {
            title: 'Security & Compliance Assessment',
            description: 'Detailed security evaluation including firewall configurations, access controls, network segmentation, and compliance with industry standards.',
            benefits: ['Security enhancement', 'Compliance assurance', 'Risk mitigation']
          },
          {
            title: 'Infrastructure & Equipment Audit',
            description: 'Complete inventory and assessment of network hardware including switches, routers, wireless access points, and cabling infrastructure.',
            benefits: ['Asset management', 'Lifecycle planning', 'Upgrade roadmap']
          }
        ],
        relatedServices: ['Network Consulting', 'Performance Optimization', 'Security Assessment', 'Infrastructure Planning']
      }
    },
    {
      id: 'consult',
      label: 'Consult',
      icon: Users,
      heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      content: {
        title: 'Strategic Network Consulting & Planning',
        subtitle: 'Expert guidance for network strategy, technology roadmaps, and digital transformation initiatives',
        about: {
          description: 'Our networking consulting services help organizations develop comprehensive network strategies aligned with business objectives. We provide expert guidance in network planning, technology selection, security frameworks, and modernization roadmaps to ensure optimal connectivity and performance.',
          keyFeatures: [
            { icon: Target, title: 'Network Strategy', desc: 'Comprehensive network roadmap development' },
            { icon: Globe, title: 'WAN/LAN Planning', desc: 'Wide and local area network design strategies' },
            { icon: Wifi, title: 'Wireless Strategy', desc: 'Enterprise wireless and mobility planning' },
            { icon: FileText, title: 'Standards & Policies', desc: 'Network policies and documentation development' }
          ]
        },
        prosAndCons: {
          pros: [
            'Clear network strategy aligned with business objectives',
            'Expert guidance on latest networking technologies and trends',
            'Optimized network investments and technology selection',
            'Reduced risks through proven methodologies and planning',
            'Enhanced team capabilities through knowledge transfer'
          ],
          cons: [
            'Requires significant time investment from technical teams',
            'Strategy implementation may require substantial network upgrades',
            'Initial consulting engagement represents upfront investment',
            'Success depends on organizational commitment to recommendations'
          ]
        },
        services: [
          {
            title: 'Network Architecture & Strategy Development',
            description: 'Comprehensive network planning including topology design, technology selection, scalability planning, and integration strategies for optimal performance.',
            benefits: ['Strategic direction', 'Technology optimization', 'Scalability planning']
          },
          {
            title: 'Security & Compliance Framework',
            description: 'Development of network security policies, compliance frameworks, access control strategies, and security architecture planning.',
            benefits: ['Security framework', 'Compliance readiness', 'Risk management']
          },
          {
            title: 'Technology Selection & Vendor Management',
            description: 'Expert guidance on networking equipment selection, vendor evaluation, procurement strategies, and technology lifecycle management.',
            benefits: ['Optimal technology choices', 'Vendor optimization', 'Cost efficiency']
          }
        ],
        relatedServices: ['Network Assessment', 'Technology Planning', 'Vendor Management', 'Project Management']
      }
    },
    {
      id: 'design',
      label: 'Design',
      icon: Settings,
      heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80',
      content: {
        title: 'Network Architecture Design & Engineering',
        subtitle: 'Custom network solutions designed for performance, scalability, security, and reliability',
        about: {
          description: 'Our network design services create robust, scalable network architectures tailored to your specific requirements. We design comprehensive solutions covering LAN/WAN, wireless, security, and cloud connectivity that provide optimal performance while supporting future growth and business requirements.',
          keyFeatures: [
            { icon: Network, title: 'LAN/WAN Design', desc: 'High-performance local and wide area network design' },
            { icon: Wifi, title: 'Wireless Solutions', desc: 'Enterprise wireless and mobility architecture' },
            { icon: Shield, title: 'Security Integration', desc: 'Network security and firewall design' },
            { icon: Globe, title: 'Cloud Connectivity', desc: 'Hybrid and cloud network integration design' }
          ]
        },
        prosAndCons: {
          pros: [
            'Custom-designed networks that fit specific business needs',
            'Scalable architecture that grows with business requirements',
            'Optimized performance and bandwidth utilization',
            'Integrated security and compliance considerations',
            'Future-proof design with latest networking technologies'
          ],
          cons: [
            'Design process requires significant upfront planning and analysis',
            'Custom solutions may be more complex than standard implementations',
            'Higher initial design costs compared to off-the-shelf solutions',
            'May require specialized expertise for implementation and maintenance'
          ]
        },
        services: [
          {
            title: 'Enterprise LAN/WAN Design',
            description: 'Comprehensive network design including campus LAN, branch connectivity, WAN optimization, and high-availability configurations for optimal performance.',
            benefits: ['Network performance', 'High availability', 'Scalable design']
          },
          {
            title: 'Wireless & Mobility Solutions',
            description: 'Advanced wireless design including enterprise Wi-Fi, guest networks, mobile device management, and location-based services integration.',
            benefits: ['Wireless performance', 'Mobility support', 'User experience']
          },
          {
            title: 'Network Security Architecture',
            description: 'Integrated security design including firewalls, intrusion prevention, network segmentation, and secure remote access solutions.',
            benefits: ['Security integration', 'Threat protection', 'Compliance support']
          }
        ],
        relatedServices: ['Network Implementation', 'Security Design', 'Wireless Solutions', 'Cloud Integration']
      }
    },
    {
      id: 'build',
      label: 'Build',
      icon: Router,
      heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
      content: {
        title: 'Network Implementation & Deployment',
        subtitle: 'End-to-end network deployment with seamless integration and minimal business disruption',
        about: {
          description: 'Our network build services provide complete implementation and deployment of networking solutions. From switch and router configuration to wireless deployment and security implementation, we handle every aspect of network deployment while ensuring minimal business disruption and optimal performance.',
          keyFeatures: [
            { icon: Router, title: 'Equipment Deployment', desc: 'Complete network hardware installation and configuration' },
            { icon: Cable, title: 'Cabling & Infrastructure', desc: 'Structured cabling and physical infrastructure setup' },
            { icon: Wifi, title: 'Wireless Implementation', desc: 'Enterprise wireless network deployment' },
            { icon: Settings, title: 'Configuration & Testing', desc: 'Network configuration, optimization, and testing' }
          ]
        },
        prosAndCons: {
          pros: [
            'Professional deployment with minimal business disruption',
            'Expert configuration for optimal performance and security',
            'Comprehensive testing and validation before go-live',
            'Integration with existing network and security infrastructure',
            'Ongoing support during initial operational period'
          ],
          cons: [
            'Implementation timeline depends on network complexity and size',
            'May require planned downtime for certain network segments',
            'Requires coordination across multiple teams and vendors',
            'Staff training may be needed for new networking technologies'
          ]
        },
        services: [
          {
            title: 'Network Equipment Installation',
            description: 'Complete deployment of networking hardware including switches, routers, firewalls, wireless access points, and network management systems.',
            benefits: ['Professional installation', 'Expert configuration', 'Performance optimization']
          },
          {
            title: 'Structured Cabling & Infrastructure',
            description: 'Comprehensive cabling deployment including fiber optic, copper cabling, patch panels, and telecommunications room setup.',
            benefits: ['Infrastructure reliability', 'Cable management', 'Future scalability']
          },
          {
            title: 'Wireless Network Deployment',
            description: 'Enterprise wireless implementation including access point placement, controller configuration, security setup, and coverage optimization.',
            benefits: ['Wireless coverage', 'Performance optimization', 'Security implementation']
          }
        ],
        relatedServices: ['Network Design', 'Infrastructure Services', 'Security Implementation', 'Testing & Validation']
      }
    },
    {
      id: 'operate',
      label: 'Operate & Manage',
      icon: Monitor,
      heroImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80',
      content: {
        title: 'Managed Network Services & Operations',
        subtitle: '24/7 network monitoring, management, and support for optimal performance and reliability',
        about: {
          description: 'Our managed networking services provide round-the-clock monitoring and management of your network infrastructure. With 24/7 network operations center coverage, proactive monitoring, and rapid issue resolution, we ensure your network operates at peak performance while you focus on core business activities.',
          keyFeatures: [
            { icon: Clock, title: '24/7 Network Monitoring', desc: 'Continuous network monitoring and alerting' },
            { icon: Zap, title: 'Proactive Management', desc: 'Preventive maintenance and optimization' },
            { icon: AlertTriangle, title: 'Rapid Response', desc: 'Quick issue resolution and support' },
            { icon: TrendingUp, title: 'Performance Optimization', desc: 'Ongoing network tuning and improvements' }
          ]
        },
        prosAndCons: {
          pros: [
            '24/7 professional network monitoring and management',
            'Proactive issue detection and prevention',
            'Reduced internal IT overhead and operational costs',
            'Access to specialized networking expertise and tools',
            'Predictable operational costs with managed service agreements'
          ],
          cons: [
            'Ongoing operational costs for managed services',
            'Dependency on external service provider',
            'May require service provider access to network infrastructure',
            'Potential communication delays for complex network issues'
          ]
        },
        services: [
          {
            title: '24/7 Network Operations Center',
            description: 'Comprehensive network monitoring including real-time performance tracking, fault detection, traffic analysis, and automated alerting systems.',
            benefits: ['Continuous monitoring', 'Proactive alerts', 'Performance tracking']
          },
          {
            title: 'Network Management & Maintenance',
            description: 'Complete operational management including configuration management, firmware updates, security patching, and preventive maintenance.',
            benefits: ['Operational efficiency', 'Reduced downtime', 'Expert management']
          },
          {
            title: 'Performance & Capacity Management',
            description: 'Ongoing performance optimization, bandwidth management, capacity planning, and network scaling recommendations for optimal efficiency.',
            benefits: ['Optimal performance', 'Capacity optimization', 'Proactive scaling']
          }
        ],
        relatedServices: ['Network Monitoring', 'Technical Support', 'Performance Optimization', 'Incident Management']
      }
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${currentTab.heroImage})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <div className="mb-6">
              {React.createElement(currentTab.icon, { className: "w-16 h-16 mx-auto mb-4" })}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {currentTab.content.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {currentTab.content.subtitle}
            </p>
            <div className="h-8">
              <p className="text-lg">
                {animatedText}<span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* About Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About This Service</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {currentTab.content.about.description}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentTab.content.about.keyFeatures.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  {React.createElement(feature.icon, { className: "w-12 h-12 text-red-600 mx-auto mb-4" })}
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Advantages</h2>
            <div className=" gap-8">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Advantages
                </h3>
                <ul className="space-y-2">
                  {currentTab.content.prosAndCons.pros.map((pro, index) => (
                    <li key={index} className="text-green-700 flex items-start gap-2">
                      <Star className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Considerations
                </h3>
                <ul className="space-y-2">
                  {currentTab.content.prosAndCons.cons.map((con, index) => (
                    <li key={index} className="text-amber-700 flex items-start gap-2">
                      <XCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>

          {/* Detailed Services */}
          {/* <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Service Details</h2>
            <div className="space-y-8">
              {currentTab.content.services.map((service, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit, bIndex) => (
                      <span 
                        key={bIndex}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Related Services */}
          {/* <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {currentTab.content.relatedServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 hover:bg-red-100 px-4 py-2 rounded-lg cursor-pointer transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-red-700 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-red-600 to-red-700 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Transform your business with our expert {currentTab.label.toLowerCase()} services
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate('/contactus')} className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingServicesPage;