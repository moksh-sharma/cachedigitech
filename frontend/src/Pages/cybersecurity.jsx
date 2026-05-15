import React from "react";
import { Link } from "react-router-dom";
import { Shield, Eye, Target, CheckCircle, Settings, Sparkles, Network, Lock, Server, Globe, Database, Mail, Search, UserCheck, Zap, RefreshCw, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePlacement } from "../context/PlacementsContext";

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
    focus: "Threat monitoring, continuous improvement, and rapid response.",
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
  const heroImageUrl = usePlacement('cybersecurity', 'main', 'heroImage') || '/images/cyberimg.webp';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section id="hero" className="relative h-screen scroll-mt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto h-full min-h-[50vh] sm:min-h-[60vh] md:min-h-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-white tracking-tight">
            Cybersecurity
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl leading-relaxed">
            Safeguarding your digital assets with proactive defense, resilient operations, and strategic threat management.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview-content" className="relative bg-linear-to-br from-white via-red-50/30 to-white overflow-hidden pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-10 lg:pb-12 scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Cybersecurity Services
              </div>
              
              {/* Main Heading */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  <span className="text-red-600">Cybersecurity</span>{" "}
                  Services by{" "}
                  <span className="text-red-600 relative inline-block">
                    Cache
                    <span className="absolute -bottom-0.5 lg:-bottom-1 left-0 w-full h-0.5 bg-red-600/30 rounded-full" aria-hidden />
                  </span>
                </h1>
              </div>
              
              {/* Description */}
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                At Cache, we deliver comprehensive, end-to-end cybersecurity solutions that empower organizations to operate with confidence in an ever-evolving threat landscape. From strategic consulting and risk management to managed detection and response, we help enterprises strengthen their security posture, achieve compliance, and ensure operational resilience.
              </p>
            </div>
            
            {/* Hero Image */}
            <div className="relative order-1 lg:order-last">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                <ImageWithFallback
                  src="/images/cybersec.webp"
                  alt="Cybersecurity Network Protection"
                  className="w-full h-36 sm:h-44 md:h-52 lg:h-64 xl:h-80 object-cover rounded-lg sm:rounded-xl shadow-xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-5 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium mb-2 sm:mb-3">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Our Capabilities
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Cache Cybersecurity Capabilities
            </h2>
          </div>
          
          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Icon Container */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-linear-to-br from-red-500 to-red-600 rounded-md sm:rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[11px] sm:text-xs lg:text-sm">
                      {capability.description}
                    </p>
                  </div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-5 rounded-lg sm:rounded-xl lg:rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section id="specialized" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Content Side */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
              {/* Header */}
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium">
                  <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Advanced Services
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Specialized & Advanced
                  <span className="text-red-600 block">Cybersecurity Services</span>
                </h2>
              </div>
              
              {/* Services List */}
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {specializedServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="group flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 lg:p-4 bg-gray-50 hover:bg-white rounded-lg sm:rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-red-600 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {index === 0 ? (
                        <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-white" />
                      ) : (
                        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-0.5 sm:mb-1 text-sm sm:text-base lg:text-lg">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Side */}
            <div className="relative order-1 lg:order-last">
              {/* Main Image */}
              <div className="relative">
                <ImageWithFallback
                  src="/images/audits.webp"
                  alt="Security Operations Center Monitoring"
                  className="w-full h-36 sm:h-44 md:h-52 lg:h-72 xl:h-80 object-cover rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/10 to-transparent rounded-lg sm:rounded-xl lg:rounded-2xl"></div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -z-10 top-4 right-4 lg:top-8 lg:right-8 w-48 h-48 lg:w-72 lg:h-72 bg-red-600/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="value" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-linear-to-br from-red-50/50 via-white to-red-50/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-5 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium mb-2 sm:mb-3">
              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Our Value
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              How Cache Delivers
              <span className="text-red-600 block">Value</span>
            </h2>
          </div>
          
          {/* Values Grid */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="group flex items-start gap-2 sm:gap-3 lg:gap-4 p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg border border-gray-100 hover:border-red-200 transition-all duration-300"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-linear-to-br from-red-500 to-red-600 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                    <p className="text-xs sm:text-sm lg:text-base text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-relaxed">
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
      <section id="framework" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-5 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium mb-2 sm:mb-3">
              <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Our Process
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Cache Cybersecurity Engagement Framework
            </h2>
            
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-4xl mx-auto mb-4 sm:mb-6 px-2">
              Our cybersecurity engagements follow a structured, outcome-driven model ensuring transparency, accountability, and maturity progression:
            </p>
            
            {/* Process Flow */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 flex-wrap">
              {phases.map((phase, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-red-600 font-bold text-[11px] sm:text-xs lg:text-sm">{phase.title}</span>
                  {index < phases.length - 1 && (
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-red-600 mx-0.5 sm:mx-1 lg:mx-2 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Phase Number */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-[10px] sm:text-xs">{index + 1}</span>
                  </div>
                  
                  {/* Icon Container */}
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-linear-to-br ${phase.color} rounded-md sm:rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-600">
                      {phase.title}
                    </h3>
                    
                    <div className="space-y-1 sm:space-y-1.5">
                      <div>
                        <p className="font-medium text-gray-900 text-[11px] sm:text-xs">Focus:</p>
                        <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                          {phase.focus}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 text-[11px] sm:text-xs">Outcomes:</p>
                        <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                          {phase.outcomes}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${phase.color} opacity-0 group-hover:opacity-5 rounded-lg sm:rounded-xl lg:rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section id="partnership" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Content Side */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
              {/* Header */}
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-[11px] sm:text-xs font-medium">
                  <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Partnership Benefits
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  Why Partner
                  <span className="text-red-400 block">with Cache</span>
                </h2>
              </div>
              
              {/* Benefits List */}
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="group flex items-start gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-red-600 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-0.5 sm:mb-1 text-xs sm:text-sm">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 text-[11px] sm:text-xs lg:text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Bottom CTA */}
              <div className="pt-3 sm:pt-4 lg:pt-6 border-t border-gray-700">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3">
                  Strengthen Your Cyber Resilience with Cache
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  Partner with Cache to secure your enterprise against today's and tomorrow's cyber threats. Our combination of advanced threat intelligence, automated response, and continuous monitoring ensures your business operates securely - with confidence, compliance, and resilience.
                </p>
                <Link
                  to="/contactus"
                  className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                >
                  Get in touch
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                </Link>
              </div>
            </div>
            
            {/* Image Side */}
            <div className="relative order-1 lg:order-last">
              {/* Main Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent rounded-lg sm:rounded-xl"></div>
                <ImageWithFallback
                  src="/images/grc.webp"
                  alt="Digital Security Shield Technology"
                  className="w-full h-36 sm:h-44 md:h-52 lg:h-72 xl:h-80 object-cover rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl"
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