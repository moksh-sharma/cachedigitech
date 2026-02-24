import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileCheck, Shield, Bot, TrendingUp, FileText, Users, Building2, Heart, Radio, Factory, ShoppingCart, BarChart3, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePlacement } from "../context/PlacementsContext";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "approach", label: "Approach" },
  { id: "industries", label: "Industries" },
  { id: "advantage", label: "Advantage" },
];

const capabilities = [
  {
    icon: Shield,
    title: "Regulatory Compliance Management",
    description: "We streamline the management of complex regulatory landscapes by embedding automation into compliance mapping, control validation, and reporting. Our compliance frameworks align with leading global standards including ISO 27001, SOC 2, and GDPR, ensuring security, privacy, and governance across all data and integration environments. For regulated industries, we design solutions that support compliance with PCI-DSS, HIPAA, and RBI guidelines, enabling our clients to meet their specific regulatory obligations with confidence.",
  },
  {
    icon: Bot,
    title: "Intelligent Audit Automation",
    description: "Cache Digitech transforms traditional audits into continuous, data-driven oversight processes. Through AI-enabled monitoring and automated evidence collection, our systems deliver real-time visibility into compliance health, enabling early identification of control deficiencies and accelerating remediation.",
  },
  {
    icon: TrendingUp,
    title: "Enterprise Risk and Control Assessment",
    description: "We employ advanced analytics to identify, evaluate, and prioritize enterprise risks across business functions, third parties, and IT ecosystems. Our risk scoring methodologies provide actionable intelligence, empowering leadership to make proactive, informed, and compliant decisions.",
  },
  {
    icon: FileText,
    title: "Policy and Document Governance",
    description: "Our governance solutions centralize policy creation, approval workflows, and version control. Automated audit trails and access management ensure accountability, transparency, and traceability across all compliance documentation.",
  },
  {
    icon: Users,
    title: "Third-Party and Vendor Compliance",
    description: "Through unified dashboards and real-time tracking, we help organizations continuously evaluate third-party compliance performance, certification status, and contractual obligations — reinforcing the integrity of your extended value chain.",
  },
];

const approaches = [
  {
    icon: Bot,
    title: "Automation-Centric Frameworks",
    description: "Minimize manual effort through intelligent workflows, AI-driven control validation, and predictive analytics.",
  },
  {
    icon: FileCheck,
    title: "Comprehensive Visibility",
    description: "Real-time dashboards, compliance heatmaps, and audit trails enhance oversight and accountability.",
  },
  {
    icon: Shield,
    title: "Seamless Integration",
    description: "Interoperability with enterprise platforms such as GRC, ERP, CRM, and major cloud ecosystems.",
  },
  {
    icon: Shield,
    title: "Security and Governance by Design",
    description: "Embedded data protection, access control, and compliance with international privacy regulations ensure end-to-end assurance.",
  },
];

const industries = [
  {
    icon: Building2,
    title: "Banking & Financial Services (BFSI)",
    description: "RBI, ISO, and SOC 2 compliance automation and control testing.",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "HIPAA-aligned frameworks for data governance and patient information security.",
  },
  {
    icon: Radio,
    title: "Telecom",
    description: "SLA adherence, regulatory reporting, and continuous network compliance monitoring.",
  },
  {
    icon: Factory,
    title: "Manufacturing & Industrial",
    description: "ESG compliance tracking, process control audits, and safety governance.",
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-commerce",
    description: "Data privacy compliance, customer data protection, and transaction integrity assurance.",
  },
];

export default function CompliancePage() {
  const [activeSection, setActiveSection] = useState("");
  const heroImageUrl = usePlacement('consultingservice', 'main', 'heroImage') || '/servicesimages/consulting.jpg';

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen overflow-hidden pt-20 bg-center bg-cover scroll-mt-0"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/60" aria-hidden />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-center text-center">
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              <span className="text-red-500">Consulting & Auditing</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Enterprise compliance and audit excellence
            </p>
          </div>
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
      <section id="overview" className="py-16 lg:py-24 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            At Cache Digitech, we enable organizations to establish a foundation of integrity, transparency, and accountability through advanced compliance and audit solutions. Our integrated frameworks leverage automation, analytics, and AI to ensure regulatory alignment, operational resilience, and sustained stakeholder trust.
          </p>
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
              Comprehensive Compliance & Audit Capabilities
            </h2>
          </div>
          
          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

      {/* Strategic Approach Section */}
      <section id="approach" className="py-16 lg:py-24 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-6 lg:space-y-8">
              {/* Header */}
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium">
                  <Bot className="w-4 h-4" />
                  Strategic Excellence
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Our Strategic
                  <span className="text-red-600 block">Approach</span>
                </h2>
              </div>
              
              {/* Approaches List */}
              <div className="space-y-6 lg:space-y-8">
                {approaches.map((approach, index) => {
                  const Icon = approach.icon;
                  return (
                    <div 
                      key={index} 
                      className="group flex items-start gap-4 p-6 lg:p-8 bg-gray-50 hover:bg-white rounded-xl lg:rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2 text-lg lg:text-xl">
                          {approach.title}
                        </h3>
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                          {approach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Image Side */}
            <div className="relative order-first lg:order-last">
              {/* Main Image */}
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1670875329379-de986110c8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZWd1bGF0b3J5JTIwY29tcGxpYW5jZSUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTk3MzkxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Regulatory Compliance Dashboard"
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

      {/* Industry Coverage Section */}
      <section id="industries" className="py-16 lg:py-24 px-4 sm:px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Industry Expertise
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              Industry Coverage
            </h2>
            
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
              Our compliance and audit solutions are tailored to the specific regulatory and operational needs of multiple industries:
            </p>
          </div>
          
          {/* Industries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col"
                >
                  {/* Icon Container */}
                  <div className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 bg-gradient-to-br from-red-500 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-1 min-h-0 space-y-3 lg:space-y-4">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                      {industry.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base flex-1">
                      {industry.description}
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

      {/* Competitive Advantage Section */}
      <section id="advantage" className="py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden scroll-mt-20">
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
                  <TrendingUp className="w-4 h-4" />
                  Competitive Edge
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Turning Compliance into
                  <span className="text-red-400 block">Competitive Advantage</span>
                </h2>
              </div>
              
              {/* Content */}
              <div className="space-y-6 lg:space-y-8">
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                  At Cache Digitech, we redefine compliance as a catalyst for operational excellence and organizational trust. By integrating AI, automation, and advanced analytics, we help enterprises evolve from reactive compliance management to proactive governance and strategic foresight.
                </p>
                
                {/* Key Features */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="group flex items-start gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Bot className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-2">
                        AI-Driven Intelligence
                      </h3>
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                        Leveraging artificial intelligence and automation to transform compliance from burden to strategic advantage.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-2">
                        Advanced Analytics
                      </h3>
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                        Data-driven insights that enable proactive risk management and strategic decision-making.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Statement */}
                <div className="pt-6 lg:pt-8 border-t border-gray-700">
                  <p className="text-xl lg:text-2xl font-bold text-red-400 leading-relaxed mb-6">
                    Compliance is no longer a burden — it's a differentiator that drives sustainable growth.
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
            </div>
            
            {/* Image Side */}
            <div className="relative order-first lg:order-last">
              {/* Main Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1591492835122-79ae33cd19f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwZ292ZXJuYW5jZSUyMHJpc2t8ZW58MXx8fHwxNzU5NzM5MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Enterprise Governance Risk"
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