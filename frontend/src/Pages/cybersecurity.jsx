import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Eye, Target, CheckCircle, Settings, Sparkles, Network, Lock, Server, Globe, Database, Mail, Search, UserCheck, Zap, RefreshCw, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePlacement } from "../context/PlacementsContext";

const navItems = [
  { id: "hero", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "specialized", label: "Specialized Services" },
  { id: "value", label: "Value Proposition" },
  { id: "framework", label: "Engagement Framework" },
  { id: "partnership", label: "Why Partner" },
];

const capabilities = [
  {
    icon: UserCheck,
    title: "Consulting Services",
    description: "Strategic guidance on security posture, risk management, policies, and compliance frameworks tailored to your enterprise goals.",
  },
  {
    icon: Shield,
    title: "Firewall Management",
    description: "Deployment, configuration, and lifecycle maintenance of perimeter and internal firewalls to protect critical networks.",
  },
  {
    icon: Eye,
    title: "Endpoint Detection & Response (EDR / MDR / XDR)",
    description: "Continuous detection, investigation, and automated response to endpoint threats for enhanced endpoint security.",
  },
  {
    icon: Network,
    title: "Network Access Control (NAC)",
    description: "Enforce access policies, authenticate devices, and maintain a secure, compliant network environment.",
  },
  {
    icon: Server,
    title: "Security Information & Event Management (SIEM) & SOAR",
    description: "Centralized monitoring, correlation, and automated response through our advanced Cache SOC / NOC frameworks.",
  },
  {
    icon: Lock,
    title: "Zero Trust Network Access (ZTNA)",
    description: "Enforce least-privilege access, continuous identity verification, and micro-segmentation for stronger security control.",
  },
  {
    icon: Globe,
    title: "Web Application Firewall (WAF)",
    description: "Protect your web applications from OWASP Top 10 vulnerabilities and evolving attack vectors.",
  },
  {
    icon: Database,
    title: "Data Loss Prevention (DLP) & Data Classification",
    description: "Identify, classify, and protect sensitive data across on-premises, cloud, and hybrid environments.",
  },
  {
    icon: Network,
    title: "Secure Access Service Edge (SASE)",
    description: "Converged networking and security architecture at the edge to deliver secure, high-performance connectivity.",
  },
  {
    icon: Eye,
    title: "Network Detection & Response (NDR)",
    description: "Real-time traffic monitoring and anomaly detection for proactive network defense.",
  },
  {
    icon: Shield,
    title: "Cloud Access Security Broker (CASB) & Cloud Security Posture Management (CSPM / CSPN)",
    description: "Unified visibility, policy enforcement, and threat control for cloud applications and workloads.",
  },
  {
    icon: Database,
    title: "Database Activity Monitoring (DAM) / Financial Data Protection (FIN)",
    description: "Continuous monitoring of critical databases and financial data to prevent misuse and unauthorized access.",
  },
  {
    icon: Mail,
    title: "Email Security",
    description: "Protection against phishing, spam, and advanced email-borne threats through AI-driven detection and policy enforcement.",
  },
  {
    icon: Search,
    title: "Security Audits",
    description: "Periodic independent assessments to validate configuration, compliance, and control effectiveness.",
  },
  {
    icon: Eye,
    title: "Dark & Deep Web Monitoring",
    description: "Continuous surveillance of dark web sources to detect leaked credentials or compromised data early.",
  },
];

const specializedServices = [
  {
    title: "Social Engineering & Attack Simulations",
    description: "Phishing, Smishing, and Vishing simulations; Red and Blue Team assessments to evaluate technical and human resilience.",
  },
  {
    title: "Digital Forensics & Root Cause Analysis",
    description: "Post-incident investigation, evidence preservation, and in-depth analysis to prevent recurrence and strengthen defenses.",
  },
];

const values = [
  {
    icon: Zap,
    title: "Enhanced threat detection and faster incident response capability.",
  },
  {
    icon: Shield,
    title: "Protection of critical systems ensuring data confidentiality, integrity, and availability.",
  },
  {
    icon: Lock,
    title: "A risk-aware, resilient IT environment designed for modern cybersecurity challenges.",
  },
];

const phases = [
  {
    icon: Search,
    title: "Audit",
    focus: "Assess current security posture, identify vulnerabilities, and classify risks.",
    outcomes: "Baseline security score and prioritized remediation roadmap.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: UserCheck,
    title: "Consult",
    focus: "Align strategy, policy, and technology to business objectives.",
    outcomes: "Tailored cybersecurity roadmap and compliance framework.",
    color: "from-red-600 to-red-700"
  },
  {
    icon: Settings,
    title: "Design",
    focus: "Architect a Zero-Trust, defense-in-depth security model covering identity, data, and network layers.",
    outcomes: "Secure system designs with micro-segmentation and layered defense.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Settings,
    title: "Implement",
    focus: "Deploy and integrate security tools, automate workflows, and conduct user training.",
    outcomes: "Fully operational, integrated, and monitored security environment.",
    color: "from-red-600 to-red-700"
  },
  {
    icon: Settings,
    title: "Operate & Manage",
    focus: "24/7 threat monitoring, continuous improvement, and rapid response.",
    outcomes: "Proactive threat detection, reduced response time, and ongoing optimization.",
    color: "from-red-500 to-red-600"
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Holistic Security Coverage",
    description: "Protection across perimeter, endpoint, network, cloud, identity, and data.",
  },
  {
    icon: Eye,
    title: "Strategic Depth",
    description: "Threat intelligence, rigorous audits, and proactive defense strategies.",
  },
  {
    icon: Target,
    title: "Tailored Specialization",
    description: "Custom cybersecurity programs for specific enterprise risks and industry regulations.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Resilience",
    description: "Building adaptive systems that anticipate, prevent, and recover from evolving threats.",
  },
  {
    icon: CheckCircle,
    title: "Trust & Compliance by Design",
    description: "Privacy, regulatory adherence, and best practices embedded across every service.",
  },
];

export default function CybersecurityPage() {
  const [activeSection, setActiveSection] = useState("");
  const heroImageUrl = usePlacement('cybersecurity', 'main', 'heroImage') || '/images/cyberimg.webp';

  // Tabs should only activate on user click; disable auto-activation on scroll
  useEffect(() => {
    // No scroll-based activation
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section id="hero" className="relative h-screen scroll-mt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4 sm:px-6 pt-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight">
            Cybersecurity
          </h1>
          <p className="mt-5 text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed">
            Safeguarding your digital assets with proactive defense, resilient operations, and strategic threat management.
          </p>
        </div>
      </section>

      {/* Tabs Navigation (below hero, sticky on scroll) */}
      <nav aria-label="Page sections" className="bg-white border-b border-red-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="hidden md:flex items-center justify-center py-4 gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Go to ${item.label}`}
                  className={`px-4 py-2 rounded-full border transition-all text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? "text-red-600 bg-red-50 border-red-200 shadow-sm"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="md:hidden flex items-center justify-center py-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Go to ${item.label}`}
                    className={`px-3 py-2 rounded-full border text-xs font-medium whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
                      isActive
                        ? "text-red-600 bg-red-50 border-red-200"
                        : "text-gray-700 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Overview Section */}
      <section id="overview-content" className="relative min-h-screen bg-gradient-to-br from-white via-red-50/30 to-white overflow-hidden pt-20 scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Cybersecurity Services
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  <span className="text-red-600">
                    Cybersecurity
                  </span>{" "}
                  Services by{" "}
                  <span className="text-red-600 relative">
                    Cache
                    <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-red-600/30 rounded-full"></div>
                  </span>
                </h1>
                
                {/* Tagline moved to top hero under main heading */}
                </div>
              
              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                At Cache, we deliver comprehensive, end-to-end cybersecurity solutions that empower organizations to operate with confidence in an ever-evolving threat landscape. From strategic consulting and risk management to managed detection and response, we help enterprises strengthen their security posture, achieve compliance, and ensure operational resilience.
              </p>
            </div>
            
            {/* Hero Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-3xl"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1614064642261-3ccbfafa481b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzU5NzM4Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cybersecurity Network Protection"
                  className="w-full h-64 sm:h-80 lg:h-[500px] xl:h-[600px] object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-16 lg:py-24 px-4 sm:px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Our Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              Cache Cybersecurity Capabilities
            </h2>
          </div>
          
          {/* Capabilities Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Icon Container */}
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3 lg:space-y-4">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                      {capability.description}
                    </p>
                  </div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-5 rounded-2xl lg:rounded-3xl transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section id="specialized" className="py-16 lg:py-24 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-6 lg:space-y-8">
              {/* Header */}
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium">
                  <Target className="w-4 h-4" />
                  Advanced Services
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Specialized & Advanced
                  <span className="text-red-600 block">Cybersecurity Services</span>
                </h2>
              </div>
              
              {/* Services List */}
              <div className="space-y-6 lg:space-y-8">
                {specializedServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="group flex items-start gap-4 p-6 lg:p-8 bg-gray-50 hover:bg-white rounded-xl lg:rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {index === 0 ? (
                        <Target className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      ) : (
                        <Search className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2 text-lg lg:text-xl">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Side */}
            <div className="relative order-first lg:order-last">
              {/* Main Image */}
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1708807472445-d33589e6b090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG9wZXJhdGlvbnMlMjBjZW50ZXIlMjBtb25pdG9yaW5nfGVufDF8fHx8MTc1OTczODQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Security Operations Center Monitoring"
                  className="w-full h-64 sm:h-80 lg:h-[400px] xl:h-[500px] object-cover rounded-2xl lg:rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-2xl lg:rounded-3xl"></div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -z-10 top-4 right-4 lg:top-8 lg:right-8 w-48 h-48 lg:w-72 lg:h-72 bg-red-600/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="value" className="py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-red-50/50 via-white to-red-50/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Our Value
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How Cache Delivers
              <span className="text-red-600 block">Value</span>
            </h2>
          </div>
          
          {/* Values Grid */}
          <div className="space-y-6 lg:space-y-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="group flex items-start gap-4 lg:gap-6 p-6 lg:p-8 bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-red-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="flex-1 pt-2 lg:pt-4">
                    <p className="text-lg lg:text-xl text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-relaxed">
                      {value.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement Framework Section */}
      <section id="framework" className="py-16 lg:py-24 px-4 sm:px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium mb-6">
              <Settings className="w-4 h-4" />
              Our Process
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              Cache Cybersecurity Engagement Framework
            </h2>
            
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Our cybersecurity engagements follow a structured, outcome-driven model ensuring transparency, accountability, and maturity progression:
            </p>
            
            {/* Process Flow */}
            <div className="flex items-center justify-center gap-2 lg:gap-4 flex-wrap">
              {phases.map((phase, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-red-600 font-bold text-lg lg:text-xl">{phase.title}</span>
                  {index < phases.length - 1 && (
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-red-600 mx-2 lg:mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Phases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Phase Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  {/* Icon Container */}
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${phase.color} rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3 lg:space-y-4">
                    <h3 className="text-lg lg:text-xl font-bold text-red-600">
                      {phase.title}
                    </h3>
                    
                    <div className="space-y-2 lg:space-y-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Focus:</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {phase.focus}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Outcomes:</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {phase.outcomes}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-5 rounded-2xl lg:rounded-3xl transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section id="partnership" className="py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-6 lg:space-y-8">
              {/* Header */}
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Partnership Benefits
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Why Partner
                  <span className="text-red-400 block">with Cache</span>
                </h2>
              </div>
              
              {/* Benefits List */}
              <div className="space-y-4 lg:space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="group flex items-start gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Bottom CTA */}
              <div className="pt-6 lg:pt-8 border-t border-gray-700">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                  Strengthen Your Cyber Resilience with Cache
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Partner with Cache to secure your enterprise against today's and tomorrow's cyber threats. Our combination of advanced threat intelligence, automated response, and continuous monitoring ensures your business operates securely — with confidence, compliance, and resilience.
                </p>
                <Link
                  to="/contactus"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              </div>
            </div>
            
            {/* Image Side */}
            <div className="relative order-first lg:order-last">
              {/* Main Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHklMjBzaGllbGQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1OTczODQwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Digital Security Shield Technology"
                  className="w-full h-64 sm:h-80 lg:h-[400px] xl:h-[500px] object-cover rounded-2xl lg:rounded-3xl shadow-2xl"
                />
              </div>
              
              {/* Background Glow */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 bg-red-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}