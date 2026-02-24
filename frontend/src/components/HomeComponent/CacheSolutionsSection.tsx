import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementsContext';

interface CapabilitySubtopic {
  name: string;
  description: string;
}

interface Capability {
  name: string;
  icon: string;
  subtopics: CapabilitySubtopic[];
}

const capabilities: Capability[] = [
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

// Legacy data for case studies dropdown
interface ItemData {
  name: string;
  description: string;
  image: string;
  benefits: string[];
  approach: string[];
}

const caseStudyData: Record<string, ItemData> = {
  'Telecom': {
    name: 'Telecom Network Modernization',
    description: 'Transformed a major telecom operator\'s infrastructure with 5G deployment, network optimization, and digital service platforms that increased network efficiency by 45% and customer satisfaction by 35%.',
    image: "public/girl-hand.jpg",
    benefits: ['45% increase in network efficiency', '35% improvement in customer satisfaction', '5G network deployment', 'Enhanced digital service delivery'],
    approach: ['Network infrastructure assessment', '5G rollout strategy', 'Digital transformation roadmap']
  },
  'BFSI': {
    name: 'Banking & Financial Services Innovation',
    description: 'Modernized core banking systems for a leading financial institution, implementing digital banking solutions, fraud detection systems, and regulatory compliance frameworks that reduced operational costs by 40%.',
    image: "public/girl-hand.jpg",
    benefits: ['40% reduction in operational costs', '99.9% system uptime', 'Enhanced fraud detection', 'Regulatory compliance automation'],
    approach: ['Legacy system modernization', 'Digital banking implementation', 'Security framework deployment']
  },
  'Automobile & Manufacturing': {
    name: 'Smart Manufacturing & Automotive Solutions',
    description: 'Implemented Industry 4.0 solutions for automotive manufacturing, including IoT integration, predictive maintenance, and supply chain optimization that improved production efficiency by 50%.',
    image: "public/girl-hand.jpg",
    benefits: ['50% improvement in production efficiency', '30% reduction in downtime', 'Predictive maintenance implementation', 'Supply chain optimization'],
    approach: ['Smart factory design', 'IoT sensor deployment', 'Automation integration']
  },
  'Retail': {
    name: 'Retail Digital Transformation',
    description: 'Revolutionized retail operations with omnichannel platforms, inventory management systems, and customer analytics that increased sales by 60% and improved customer experience across all touchpoints.',
    image: "public/girl-hand.jpg",
    benefits: ['60% increase in sales', 'Omnichannel customer experience', 'Real-time inventory management', 'Personalized customer analytics'],
    approach: ['Customer journey mapping', 'Platform integration', 'Data analytics implementation']
  },
  'Healthcare & Hospitality': {
    name: 'Healthcare & Hospitality Innovation',
    description: 'Delivered comprehensive digital solutions for healthcare providers and hospitality chains, including patient management systems, telemedicine platforms, and guest experience optimization that improved service quality by 55%.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300',
    benefits: ['55% improvement in service quality', 'Enhanced patient care delivery', 'Streamlined guest experiences', 'HIPAA compliance achieved'],
    approach: ['Service design optimization', 'Digital platform integration', 'Compliance framework implementation']
  },
  'Government & Public Sector': {
    name: 'Government Digital Services',
    description: 'Transformed government operations with citizen service portals, digital identity systems, and automated workflows that reduced processing time by 70% and enhanced transparency in public services.',
    image: 'https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300',
    benefits: ['70% reduction in processing time', 'Enhanced citizen satisfaction', 'Improved service transparency', 'Digital identity implementation'],
    approach: ['Digital governance framework', 'Citizen-centric design', 'Security and privacy compliance']
  },
  'IT & ITES': {
    name: 'IT Services & Technology Solutions',
    description: 'Modernized IT infrastructure and services for technology companies, implementing cloud-native architectures, DevOps practices, and automation frameworks that increased operational efficiency by 65%.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300',
    benefits: ['65% increase in operational efficiency', 'Cloud-native architecture', 'DevOps automation', 'Scalable infrastructure solutions'],
    approach: ['Infrastructure modernization', 'Cloud migration strategy', 'Automation implementation']
  }
};

const caseStudyItems = ['Telecom', 'BFSI', 'Automobile & Manufacturing', 'Retail', 'Healthcare & Hospitality', 'Government & Public Sector', 'IT & ITES'];

export default function CacheSolutionsSection() {
  const navigate = useNavigate();
  const handImageUrl = usePlacement('home', 'cacheSolutions', 'handImage') || '/girl-hand.jpg';
  const womenOwnedUrl = usePlacement('home', 'cacheSolutions', 'womenOwned') || '/women_owned.png';
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [definitionOpen, setDefinitionOpen] = useState(false);
  
  // State for capability selection and nested dropdown
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<CapabilitySubtopic | null>(null);
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [doorSliderOpen, setDoorSliderOpen] = useState(false);
  const [selectedAuditSubtopic, setSelectedAuditSubtopic] = useState<CapabilitySubtopic | null>(null);
  
  // Reference for dropdown container
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Handle click outside to close dropdowns
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Close all dropdowns and reset states
        setCapabilitiesOpen(false);
        setCaseStudiesOpen(false);
        setSelectedCapability(null);
        setDoorSliderOpen(false);
        setSelectedAuditSubtopic(null);
        setSelectedSubtopic(null);
        setExplanationOpen(false);
        setDefinitionOpen(false); // Ensure definition popup is closed
        setSelectedItem(null); // Reset selected case study item
      }
    }
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCapabilities = () => {
    setCapabilitiesOpen(!capabilitiesOpen);
    if (caseStudiesOpen) setCaseStudiesOpen(false);
    // Reset selected capability when closing
    if (capabilitiesOpen) {
      setSelectedCapability(null);
      // Close door slider and reset subtopics when closing capabilities dropdown
      setDoorSliderOpen(false);
      setSelectedAuditSubtopic(null);
      setSelectedSubtopic(null);
      setExplanationOpen(false);
    }
  };

  const toggleCaseStudies = () => {
    setCaseStudiesOpen(!caseStudiesOpen);
    if (capabilitiesOpen) setCapabilitiesOpen(false);
    // Reset all states when closing case studies dropdown
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

  const selectCapabilityCategory = (capability: Capability) => {
    if (selectedCapability?.name === capability.name) {
      setSelectedCapability(null);
      // Close door slider when collapsing any capability
      setDoorSliderOpen(false);
      setSelectedAuditSubtopic(null);
    } else {
      setSelectedCapability(capability);
      // Open door slider when selecting any capability
      setDoorSliderOpen(true);
      setSelectedItem(null); // Clear any selected industry item
    }
    // Close the dropdown after selection
    setCapabilitiesOpen(false);
  };

  const selectAuditSubtopic = (subtopic: CapabilitySubtopic) => {
    setSelectedAuditSubtopic(subtopic);
    setExplanationOpen(true);
    setSelectedSubtopic(subtopic);
  };

  const closeDoorSlider = () => {
    setDoorSliderOpen(false);
    setSelectedAuditSubtopic(null);
    setSelectedCapability(null);
  };

  const selectSubtopic = (subtopic: CapabilitySubtopic) => {
    setSelectedSubtopic(subtopic);
    setExplanationOpen(true);
  };

  const closeExplanation = () => {
    setExplanationOpen(false);
    setSelectedSubtopic(null);
  };

  const selectItem = (itemName: string) => {
    const data = caseStudyData[itemName];
    if (data) {
      setSelectedItem(data);
      setCapabilitiesOpen(false);
      setCaseStudiesOpen(false);
      setSelectedCapability(null);
      // Close door slider when selecting a case study
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
      // Navigate to insights page with the selected case study name as a URL parameter and scroll to success-stories section
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
      transition: { duration: 0.2 }
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
      transition: { duration: 0.3 }
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
      transition: { duration: 0.4 }
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
    <section className="bg-black min-h-[50vh] flex flex-col lg:flex-row">
      {/* Left Half - Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
        <div className="w-full max-w-lg">
          {/* Section Heading */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
              Let Cache Solve your Problems
            </h1>
            <p className="text-white/80 mt-6 text-lg">
              While you maximize your growth
            </p>
          </div>

          {/* Choose your interest text */}
          <div className="mb-6">
            <p className="text-white/90 text-lg">
              Choose your interest
            </p>
          </div>

          {/* Dropdown Controls */}
           <div className="flex flex-row gap-4 mb-8 relative z-[1000]" ref={dropdownRef}>
               
               {/* Capabilities Dropdown */}
               <div className="relative flex-1">
                 <button 
                   className={`w-full ${selectedCapability ? 'bg-red-600' : 'bg-transparent'} border border-white/30 rounded-lg px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50`}
                   onClick={toggleCapabilities}
                   data-testid="button-capabilities"
                 >
                   <span className="text-white font-medium">{selectedCapability ? selectedCapability.name : 'Capabilities'}</span>
                   <motion.div
                     animate={{ rotate: capabilitiesOpen ? 180 : 0 }}
                     transition={{ duration: 0.2 }}
                   >
                     <ChevronDown className="h-5 w-5 text-white/70" />
                   </motion.div>
                 </button>
                 
                 <AnimatePresence>
                   {capabilitiesOpen && (
                     <motion.div 
                       className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/30 rounded-lg shadow-lg z-[1000]"
                       variants={dropdownVariants}
                       initial="hidden"
                       animate="visible"
                       exit="hidden"
                       data-testid="menu-capabilities"
                     >
                       <div className="p-2">
                         {capabilities.map((capability) => (
                           <div key={capability.name} className="mb-1 last:mb-0">
                             <button 
                               className="w-full text-left px-4 py-3 text-white hover:bg-red-600 rounded-md transition-colors duration-150"
                               onClick={() => selectCapabilityCategory(capability)}
                               data-testid={`capability-${capability.name.toLowerCase().replace(/\s+/g, '-')}`}
                             >
                               <span className="font-medium">{capability.name}</span>
                             </button>
                             
                             {/* Nested Subtopics Dropdown - Hide for all capabilities (they now appear in door slider) */}
                             <AnimatePresence>
                               {false && (
                                 <motion.div
                                   className="ml-4 mt-2 bg-white/5 rounded-md border border-white/20"
                                   initial={{ opacity: 0, height: 0 }}
                                   animate={{ opacity: 1, height: "auto" }}
                                   exit={{ opacity: 0, height: 0 }}
                                   transition={{ duration: 0.2 }}
                                 >
                                   <div className="p-2">
                                     {capability.subtopics.map((subtopic) => (
                                       <button 
                                         key={subtopic.name}
                                         className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 rounded-md transition-colors duration-150 text-sm"
                                         onClick={() => selectSubtopic(subtopic)}
                                         data-testid={`subtopic-${subtopic.name.toLowerCase().replace(/\s+/g, '-')}`}
                                       >
                                         {subtopic.name}
                                       </button>
                                     ))}
                                   </div>
                                 </motion.div>
                               )}
                             </AnimatePresence>
                           </div>
                         ))}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>

              {/* Case Studies Dropdown */}
              <div className="relative flex-1">
                <button 
                  className={`w-full ${selectedItem ? 'bg-red-600' : 'bg-transparent'} border border-white/30 rounded-lg px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50`}
                  onClick={toggleCaseStudies}
                  data-testid="button-case-studies"
                >
                  <span className="text-white font-medium">{selectedItem ? Object.keys(caseStudyData).find(key => caseStudyData[key] === selectedItem) : 'Case Studies'}</span>
                  <motion.div
                    animate={{ rotate: caseStudiesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-white/70" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {caseStudiesOpen && (
                    <motion.div 
                      className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/30 rounded-lg shadow-lg z-[1000]"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      data-testid="menu-case-studies"
                    >
                      <div className="p-2">
                        {caseStudyItems.map((item) => (
                          <button 
                            key={item}
                            className="w-full text-left px-4 py-3 text-white hover:bg-red-600 rounded-md transition-colors duration-150"
                            onClick={() => selectItem(item)}
                            data-testid={`case-study-${item.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
          </div>
        </div>
      </div>

      {/* Right Half - Visualization */}
      <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:h-[80vh] overflow-hidden" style={{
        filter: definitionOpen ? 'blur(8px)' : 'none'
      }}>
              {/* Handshake Image (use requested asset) */}
              <img 
                src={handImageUrl} 
                alt="Business handshake" 
                className="absolute inset-0 w-full h-full object-cover" 
                loading="lazy"
                decoding="async"
              />

              {/* Women Owned badge overlay - top-right */}
              <img
                src={womenOwnedUrl}
                alt="Women Owned"
                className="absolute top-0 right-3 md:top-0 md:right-4 w-20 md:w-24 lg:w-28 h-auto z-30 drop-shadow-lg"
              />

              {/* Tile Card */}
              <AnimatePresence>
                {selectedItem && (
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-black/20 backdrop-blur-md rounded-xl p-4 lg:p-6 shadow-xl border border-white/30"
                    variants={tileVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                      filter: definitionOpen ? 'blur(4px)' : 'none'
                    }}
                    data-testid="card-tile"
                  >
                    <div className="flex flex-col gap-4">
                      <h2 className="text-2xl font-bold text-white" data-testid="text-tile-title">
                        {Object.keys(caseStudyData).find(key => caseStudyData[key] === selectedItem) || selectedItem.name}
                      </h2>
                      <p className="text-white/80" data-testid="text-tile-description">
                        Our {selectedItem.name.toLowerCase()} experts help industry players navigate their day-to-day operations.
                      </p>
                      <div className="mt-4">
                        <button 
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                          onClick={handleLearnMore}
                        >
                          LEARN MORE <span className="text-lg">→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Door Slider for Audit Subtopics */}
              <AnimatePresence>
                {doorSliderOpen && (
                  <motion.div
                    className="absolute inset-0 z-20"
                    variants={doorSliderVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    data-testid="door-slider"
                  >
                    {/* Left Door Panel (hidden on mobile) */}
                    <motion.div
                      className="absolute left-0 top-0 w-1/2 h-full bg-black/20 backdrop-blur-sm hidden md:block"
                      variants={doorPanelVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      custom="left"
                    />
                    
                    {/* Right Door Panel (hidden on mobile) */}
                    <motion.div
                      className="absolute right-0 top-0 w-1/2 h-full bg-black/20 backdrop-blur-sm hidden md:block"
                      variants={doorPanelVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      custom="right"
                    />

                    {/* Subtopic Cards Container */}
                    <motion.div
                      className="absolute inset-0 flex items-start justify-start md:items-center md:justify-center p-2 sm:p-6 overflow-y-auto"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl w-full">
                        {selectedCapability?.subtopics.map((subtopic, index) => (
                          <motion.div
                            key={subtopic.name}
                            className={`bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 flex flex-col justify-between
                              ${selectedAuditSubtopic === subtopic.name ? 'ring-2 ring-white/50 bg-white/20' : ''}`}
                            style={{
                              wordBreak: 'break-word',
                              overflow: 'hidden'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                            onClick={() => selectAuditSubtopic(subtopic)}
                            data-testid={`subtopic-card-${subtopic.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="text-white font-semibold text-base mb-2">
                                {subtopic.name}
                              </h3>
                              <button 
                                className="bg-red-600 hover:bg-red-700 rounded-full p-1 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectAuditSubtopic(subtopic);
                                  showDefinition();
                                }}
                              >
                                <ArrowRight className="h-4 w-4 text-white" />
                              </button>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed break-words" style={{ flex: 1 }}>
                              {subtopic.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Close Button */}
                    {/* <motion.button
                      className="absolute top-6 right-6 z-30 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
                      onClick={closeDoorSlider}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      data-testid="close-door-slider"
                    >
                      <X className="w-6 h-6 text-white" />
                    </motion.button> */}
                  </motion.div>
                )}
              </AnimatePresence>
      </div>

      {/* Definition Modal */}
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
                  {/* Card Header */}
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
                      className="text-gray-500 hover:text-black transition-colors duration-200 p-2"
                      onClick={closeDefinition}
                      data-testid="button-close-definition"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Card Content */}
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
                                <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
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
                                <Settings className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
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

      {/* Explanation Modal */}
        <AnimatePresence>
          {explanationOpen && selectedSubtopic && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeExplanation}
            >
              {/* Blur Background */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              
              {/* Modal Content */}
              <motion.div
                className="relative bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeExplanation}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedSubtopic.name}
                  </h2>
                  <div className="w-16 h-1 bg-blue-500 rounded"></div>
                </div>

                {/* Modal Content */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedSubtopic.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  );
}
