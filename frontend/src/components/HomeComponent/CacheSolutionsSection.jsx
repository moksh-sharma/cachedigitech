import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ArrowRight, Check, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const capabilities = [
  {
    name: 'Audit & Consult',
    icon: '🔍',
    subtopics: [
      { name: 'Infra', description: 'Infrastructure audits for performance, compliance, and cost-effectiveness; plus strategic consulting to design scalable, resilient systems aligned to business objectives.' },
      { name: 'Cloud', description: 'Cloud audits to evaluate architecture, security posture, and cost optimization; plus consulting to guide adoption, optimize costs, and maximize cloud value.' },
      { name: 'Cyber', description: 'Cybersecurity audits to identify gaps and ensure compliance; plus consulting to build security strategies, risk frameworks, and incident response plans.' },
      { name: 'Networking', description: 'Network audits to analyze performance and configurations; plus consulting to design efficient, secure network architectures for future growth.' },
      { name: 'Data & AI', description: 'Audits of data governance and AI models for ethical implementation; plus consulting to develop data strategies and implement AI solutions.' }
    ]
  },
  {
    name: 'Design',
    icon: '🎨',
    subtopics: [
      { name: 'Infra', description: 'Infrastructure design services to create robust, scalable system architectures that meet your specific business requirements and performance needs.' },
      { name: 'Cloud', description: 'Cloud architecture design to create efficient, cost-effective cloud solutions that leverage the best of cloud-native technologies.' },
      { name: 'Cyber', description: 'Security architecture design to build comprehensive security frameworks that protect your assets while enabling business operations.' },
      { name: 'Networking', description: 'Network design services to create high-performance, secure network infrastructures that support your connectivity requirements.' },
      { name: 'Data & AI', description: 'Data architecture and AI system design to create intelligent solutions that transform your data into actionable business insights.' }
    ]
  },
  {
    name: 'Build',
    icon: '🔧',
    subtopics: [
      { name: 'Infra', description: 'Infrastructure implementation and deployment services to build reliable, high-performance systems that power your business operations.' },
      { name: 'Cloud', description: 'Cloud solution development and deployment to build scalable, resilient cloud applications and infrastructure.' },
      { name: 'Cyber', description: 'Security solution implementation to build comprehensive security systems that protect your organization from evolving threats.' },
      { name: 'Networking', description: 'Network implementation services to build robust, secure network infrastructures that connect your business operations.' },
      { name: 'Data & AI', description: 'Data platform and AI solution development to build intelligent systems that drive innovation and business value.' }
    ]
  },
  {
    name: 'Operate & Manage',
    icon: '⚙️',
    subtopics: [
      { name: 'Infra', description: 'Ongoing infrastructure management and optimization services to ensure peak performance, reliability, and cost-effectiveness.' },
      { name: 'Cloud', description: 'Cloud operations and management services to optimize performance, manage costs, and ensure continuous availability of your cloud resources.' },
      { name: 'Cyber', description: 'Security operations and management to provide continuous monitoring, threat detection, and incident response capabilities.' },
      { name: 'Networking', description: 'Network operations and management services to maintain optimal network performance, security, and reliability.' },
      { name: 'Data & AI', description: 'Data and AI operations management to ensure continuous performance, model accuracy, and value delivery from your data investments.' }
    ]
  }
];

const caseStudyData = {
  'Telecom': {
    name: 'Telecom Network Modernization',
    description: 'Transformed a major telecom operator\'s infrastructure with 5G deployment, network optimization, and digital service platforms that increased network efficiency by 45% and customer satisfaction by 35%.',
    image: "/girl-hand.webp",
    benefits: ['45% increase in network efficiency', '35% improvement in customer satisfaction', '5G network deployment', 'Enhanced digital service delivery'],
    approach: ['Network infrastructure assessment', '5G rollout strategy', 'Digital transformation roadmap']
  },
  'BFSI': {
    name: 'Banking & Financial Services Innovation',
    description: 'Modernized core banking systems for a leading financial institution, implementing digital banking solutions, fraud detection systems, and regulatory compliance frameworks that reduced operational costs by 40%.',
    image: "public/girl-hand.webp",
    benefits: ['40% reduction in operational costs', '99.9% system uptime', 'Enhanced fraud detection', 'Regulatory compliance automation'],
    approach: ['Legacy system modernization', 'Digital banking implementation', 'Security framework deployment']
  },
  'Automobile & Manufacturing': {
    name: 'Smart Manufacturing & Automotive Solutions',
    description: 'Implemented Industry 4.0 solutions for automotive manufacturing, including IoT integration, predictive maintenance, and supply chain optimization that improved production efficiency by 50%.',
    image: "public/girl-hand.webp",
    benefits: ['50% improvement in production efficiency', '30% reduction in downtime', 'Predictive maintenance implementation', 'Supply chain optimization'],
    approach: ['Smart factory design', 'IoT sensor deployment', 'Automation integration']
  },
  'Retail': {
    name: 'Retail Digital Transformation',
    description: 'Revolutionized retail operations with omnichannel platforms, inventory management systems, and customer analytics that increased sales by 60% and improved customer experience across all touchpoints.',
    image: "public/girl-hand.webp",
    benefits: ['60% increase in sales', 'Omnichannel customer experience', 'Real-time inventory management', 'Personalized customer analytics'],
    approach: ['Customer journey mapping', 'Platform integration', 'Data analytics implementation']
  },
  'Healthcare & Hospitality': {
    name: 'Healthcare & Hospitality Innovation',
    description: 'Delivered comprehensive digital solutions for healthcare providers and hospitality chains, including patient management systems, telemedicine platforms, and guest experience optimization that improved service quality by 55%.',
    image: '/blog/healthcare.webp',
    benefits: ['55% improvement in service quality', 'Enhanced patient care delivery', 'Streamlined guest experiences', 'HIPAA compliance achieved'],
    approach: ['Service design optimization', 'Digital platform integration', 'Compliance framework implementation']
  },
  'Government & Public Sector': {
    name: 'Government Digital Services',
    description: 'Transformed government operations with citizen service portals, digital identity systems, and automated workflows that reduced processing time by 70% and enhanced transparency in public services.',
    image: '/industryvertical/government.svg',
    benefits: ['70% reduction in processing time', 'Enhanced citizen satisfaction', 'Improved service transparency', 'Digital identity implementation'],
    approach: ['Digital governance framework', 'Citizen-centric design', 'Security and privacy compliance']
  },
  'IT & ITES': {
    name: 'IT Services & Technology Solutions',
    description: 'Modernized IT infrastructure and services for technology companies, implementing cloud-native architectures, DevOps practices, and automation frameworks that increased operational efficiency by 65%.',
    image: '/images/itimg.webp',
    benefits: ['65% increase in operational efficiency', 'Cloud-native architecture', 'DevOps automation', 'Scalable infrastructure solutions'],
    approach: ['Infrastructure modernization', 'Cloud migration strategy', 'Automation implementation']
  }
};

const caseStudyItems = ['Telecom', 'BFSI', 'Automobile & Manufacturing', 'Retail', 'Healthcare & Hospitality', 'Government & Public Sector', 'IT & ITES'];

export default function CacheSolutionsSection() {
  const navigate = useNavigate();
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [definitionOpen, setDefinitionOpen] = useState(false);
  
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [doorSliderOpen, setDoorSliderOpen] = useState(false);
  const [selectedAuditSubtopic, setSelectedAuditSubtopic] = useState(null);
  
  const dropdownRef = React.useRef(null);
  
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCapabilitiesOpen(false);
        setCaseStudiesOpen(false);
        setSelectedCapability(null);
        setDoorSliderOpen(false);
        setSelectedAuditSubtopic(null);
        setSelectedSubtopic(null);
        setExplanationOpen(false);
        setDefinitionOpen(false);
        setSelectedItem(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCapabilities = () => {
    setCapabilitiesOpen(!capabilitiesOpen);
    if (caseStudiesOpen) setCaseStudiesOpen(false);
    if (capabilitiesOpen) {
      setSelectedCapability(null);
      setDoorSliderOpen(false);
      setSelectedAuditSubtopic(null);
      setSelectedSubtopic(null);
      setExplanationOpen(false);
    }
  };

  const toggleCaseStudies = () => {
    setCaseStudiesOpen(!caseStudiesOpen);
    if (capabilitiesOpen) setCapabilitiesOpen(false);
    if (caseStudiesOpen) {
      setSelectedItem(null);
      setDefinitionOpen(false);
      setSelectedCapability(null);
      setDoorSliderOpen(false);
      setSelectedAuditSubtopic(null);
      setSelectedSubtopic(null);
      setExplanationOpen(false);
    }
  };

  const selectCapabilityCategory = (capability) => {
    if (selectedCapability?.name === capability.name) {
      setSelectedCapability(null);
      setDoorSliderOpen(false);
      setSelectedAuditSubtopic(null);
    } else {
      setSelectedCapability(capability);
      setDoorSliderOpen(true);
      setSelectedItem(null);
    }
    setCapabilitiesOpen(false);
  };

  const selectAuditSubtopic = (subtopic) => {
    setSelectedAuditSubtopic(subtopic);
    setExplanationOpen(true);
    setSelectedSubtopic(subtopic);
  };

  const closeDoorSlider = () => {
    setDoorSliderOpen(false);
    setSelectedAuditSubtopic(null);
    setSelectedCapability(null);
  };

  const selectSubtopic = (subtopic) => {
    setSelectedSubtopic(subtopic);
    setExplanationOpen(true);
  };

  const closeExplanation = () => {
    setExplanationOpen(false);
    setSelectedSubtopic(null);
  };

  const selectItem = (itemName) => {
    const data = caseStudyData[itemName];
    if (data) {
      setSelectedItem(data);
      setCapabilitiesOpen(false);
      setCaseStudiesOpen(false);
      setSelectedCapability(null);
      setDoorSliderOpen(false);
      setSelectedAuditSubtopic(null);
    }
  };

  const showDefinition = () => {
    if (selectedItem) {
      setDefinitionOpen(true);
    }
  };

  const handleLearnMore = () => {
    if (selectedItem) {
      navigate(`/insights?activeStudy=${encodeURIComponent(selectedItem.name)}#success-stories`);
    }
  };

  const closeDefinition = () => {
    setDefinitionOpen(false);
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const tileVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const definitionVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: 30,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const doorSliderVariants = {
    hidden: { 
      opacity: 0,
      x: "100%",
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const doorPanelVariants = {
    hidden: { 
      scaleX: 0,
      transformOrigin: "left",
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    visible: { 
      scaleX: 1,
      transformOrigin: "left",
      transition: { duration: 0.4, ease: "easeInOut", delay: 0.2 }
    }
  };

  return (
    <>
      {/* Visible content removed — dropdowns now live in HeroSection. Only modals remain. */}

      <AnimatePresence>
        {definitionOpen && selectedItem && (
          <motion.div 
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="overlay-definition"
          >
            <div 
              className="absolute inset-0 backdrop-blur-sm bg-primary/10"
              onClick={closeDefinition}
            />
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
              <motion.div 
                className="bg-white rounded-2xl shadow-2xl border border-gray-300 max-w-3xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden"
                variants={definitionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                data-testid="card-definition"
              >
                <div className="overflow-y-auto max-h-full">
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <img 
                        src={selectedItem.image}
                        alt={`${selectedItem.name} icon`}
                        className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-300"
                        data-testid="img-definition"
                      />
                      <h2 className="text-lg sm:text-2xl font-bold text-black" data-testid="text-definition-title">
                        {selectedItem.name}
                      </h2>
                    </div>
                    <button 
                      className="text-gray-500 hover:text-black transition-colors duration-200 ease-out p-2"
                      onClick={closeDefinition}
                      data-testid="button-close-definition"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="max-w-none">
                      <p className="text-black text-base sm:text-lg leading-relaxed mb-6" data-testid="text-definition-description">
                        {selectedItem.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="font-semibold text-black mb-3">Key Benefits</h4>
                          <ul className="space-y-2 text-gray-700">
                            {selectedItem.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2" data-testid={`text-benefit-${index}`}>
                                <Check className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-black mb-3">Our Approach</h4>
                          <ul className="space-y-2 text-gray-700">
                            {selectedItem.approach.map((step, index) => (
                              <li key={index} className="flex items-start gap-2" data-testid={`text-approach-${index}`}>
                                <Settings className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explanationOpen && selectedSubtopic && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExplanation}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            <motion.div
              className="relative bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeExplanation}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ease-out"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedSubtopic.name}
                </h2>
                <div className="w-16 h-1 bg-blue-500 rounded"></div>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedSubtopic.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}