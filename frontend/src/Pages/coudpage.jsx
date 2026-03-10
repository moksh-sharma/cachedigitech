import React from "react";
import { Link } from "react-router-dom";
import { Cloud, Shield, Search, Upload, RotateCcw, RefreshCw, Monitor, Zap, Mail, Users, PenTool, Wrench, Settings, ArrowRight, Server, Lightbulb, TrendingUp, CheckCircle, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePlacement } from "../context/PlacementsContext";

const capabilities = [
  {
    icon: Shield,
    title: "Cloud Security Services",
    description: "End-to-end protection for data, workloads, and applications across multi-cloud and hybrid environments — powered by zero-trust architecture and compliance-first governance.",
  },
  {
    icon: Cloud,
    title: "Hybrid Cloud Solutions",
    description: "Seamlessly integrate on-premises systems with public and private clouds to achieve maximum flexibility, scalability, and operational control.",
  },
  {
    icon: Search,
    title: "Cloud Assessment & Strategy",
    description: "Evaluate your current cloud adoption and identify opportunities to improve performance, security, and cost optimization before migration.",
  },
  {
    icon: Upload,
    title: "Cloud Migration Services",
    description: "Migrate applications and workloads to leading cloud platforms (AWS, Azure, Google Cloud, or hybrid environments) with minimal downtime and maximum efficiency.",
  },
  {
    icon: RotateCcw,
    title: "Cloud Repatriation",
    description: "Move workloads strategically back to on-premises infrastructure when business, cost, or compliance requirements demand.",
  },
  {
    icon: RefreshCw,
    title: "Application Modernization",
    description: "Transform legacy applications into cloud-native, scalable, and cost-efficient systems that support your digital goals.",
  },
  {
    icon: Monitor,
    title: "Managed Cloud Operations",
    description: "24/7 proactive monitoring, governance, and performance optimization to ensure your cloud environment runs securely and efficiently.",
  },
  {
    icon: Zap,
    title: "Cloud Deployment & Automation",
    description: "Simplify cloud and edge deployments through automation, ensuring compliance, reliability, and fast time-to-value.",
  },
  {
    icon: Mail,
    title: "Enterprise Email Solutions",
    description: "Secure, scalable, and collaborative cloud-based email systems with built-in data protection and advanced availability.",
  },
];

const phases = [
  {
    icon: Search,
    title: "Audit",
    objective: "Assess your IT and cloud ecosystem to identify cost, performance, and security gaps.",
    highlights: "Infrastructure evaluation, risk analysis, cost-benefit insights.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Users,
    title: "Consult",
    objective: "Define the right cloud strategy aligned with your digital transformation goals.",
    highlights: "Platform selection, compliance mapping, cloud roadmap.",
    color: "from-red-600 to-red-700"
  },
  {
    icon: PenTool,
    title: "Design",
    objective: "Architect scalable, secure, and future-ready cloud solutions.",
    highlights: "Hybrid and multi-cloud design, data management, and security frameworks.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Wrench,
    title: "Build",
    objective: "Deploy, migrate, and integrate with automation for faster delivery.",
    highlights: "Infrastructure provisioning, cloud integration, continuous deployment.",
    color: "from-red-600 to-red-700"
  },
  {
    icon: Settings,
    title: "Operate & Manage",
    objective: "Optimize and govern your cloud environment for long-term success.",
    highlights: "Monitoring, performance tuning, and cost management.",
    color: "from-red-500 to-red-600"
  },
];

const achievements = [
  {
    icon: Server,
    title: "Resilient Infrastructure",
    description: "Enterprise-grade cloud and hybrid solutions designed for mission-critical operations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Enablement",
    description: "Scalable infrastructure supporting advanced R&D and rapid prototyping.",
  },
  {
    icon: Zap,
    title: "Business Agility",
    description: "Flexible frameworks enabling quick response to evolving business needs.",
  },
  {
    icon: TrendingUp,
    title: "Growth Acceleration",
    description: "Optimized cloud infrastructure built for scalability, performance, and cost-efficiency.",
  },
];

const benefits = [
  {
    icon: Cloud,
    title: "End-to-End Cloud Expertise",
    description: "Proven experience across cloud migration, hybrid cloud, and digital transformation programs.",
  },
  {
    icon: Shield,
    title: "Security by Design",
    description: "Built-in zero-trust, compliance, and governance frameworks for every engagement.",
  },
  {
    icon: Zap,
    title: "Automation & Intelligence",
    description: "AI-driven monitoring, auto-scaling, and predictive analytics for optimized operations.",
  },
  {
    icon: Settings,
    title: "Flexible Deployment Models",
    description: "Choose from cloud, hybrid, edge, or on-premises based on your operational and regulatory needs.",
  },
  {
    icon: CheckCircle,
    title: "Proven Delivery Excellence",
    description: "Consistent, outcome-driven execution across industries and enterprise scales.",
  },
];

export default function CloudPage() {
  const heroImageUrl = usePlacement('cloudservices', 'main', 'heroImage') || '/images/cloudimg.webp';

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Banner */}
      <section id="hero" className="relative h-screen scroll-mt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto h-full min-h-[50vh] sm:min-h-[60vh] md:min-h-0 flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight">
            Cloud
          </h1>
          <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed">
            Secure, agile cloud and digital transformation to modernize and scale your enterprise.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview-content" className="relative min-h-0 md:min-h-screen bg-linear-to-br from-white via-red-50/30 to-white overflow-hidden pt-12 sm:pt-16 lg:pt-20 scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-xs sm:text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Cloud & Digital Transformation
              </div>

              {/* Main Heading */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  <span className="text-red-600">
                    Cloud & Digital Transformation
                  </span>{" "}
                  Services by{" "}
                  <span className="text-red-600 relative">
                    Cache
                    <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-red-600/30 rounded-full"></div>
                  </span>
                </h1>

                <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-light">
                  Empowering enterprises to innovate, modernize, and scale with secure, agile, and intelligent cloud solutions.
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <p className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed">
                  At Cache, we help organizations accelerate their digital transformation journey through end-to-end cloud consulting and infrastructure modernization services. Our expertise spans across public, private, and hybrid cloud environments, ensuring your technology ecosystem becomes more agile, efficient, and future-ready.
                </p>

                <p className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed">
                  From cloud migration and application modernization to security, governance, and cloud operations, Cache enables your business to innovate at speed while maintaining enterprise-grade reliability and compliance.
                </p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-last">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent rounded-3xl"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1676378280996-cff6b481d701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc1OTczODgyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cloud Computing Infrastructure"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-[500px] xl:h-[600px] object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Our Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Cache Cloud Capabilities
            </h2>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Icon Container */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-linear-to-br from-red-500 to-red-600 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                      {capability.description}
                    </p>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-5 rounded-2xl lg:rounded-3xl transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transformation Approach Section */}
      <section id="approach" className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Our Approach
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Proven Cloud Transformation Approach
            </h2>

            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 px-2">
              At Cache, we follow a structured five-phase model designed for transparency, agility, and measurable outcomes:
            </p>

            {/* Process Flow */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-4 flex-wrap">
              {phases.map((phase, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-red-600 font-bold text-xs sm:text-base lg:text-xl">{phase.title}</span>
                  {index < phases.length - 1 && (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-600 mx-1 sm:mx-2 lg:mx-4 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gray-50 hover:bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Phase Number */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs sm:text-sm">{index + 1}</span>
                  </div>

                  {/* Icon Container */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-linear-to-br ${phase.color} rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-red-600">
                      {phase.title}
                    </h3>

                    <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                      <div>
                        <p className="font-medium text-gray-900 text-xs sm:text-sm">Objective:</p>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {phase.objective}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 text-xs sm:text-sm">Highlights:</p>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {phase.highlights}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${phase.color} opacity-0 group-hover:opacity-5 rounded-2xl lg:rounded-3xl transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Infrastructure Operations Section */}
      <section id="infrastructure" className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Header */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-xs sm:text-sm font-medium">
                  <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Infrastructure Excellence
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  Infrastructure & Cloud
                  <span className="text-red-600 block">Operations</span>
                </h2>

                <p className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed">
                  Cache delivers robust infrastructure management and cloud operations services that ensure seamless performance across your technology ecosystem — including data centers, storage, hypervisors, and multi-cloud platforms.
                </p>
              </div>

              {/* Achievements */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  We help enterprises achieve:
                </h3>

                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 bg-white hover:bg-red-50/50 rounded-xl lg:rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-600 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-1 sm:mb-2 text-base sm:text-lg lg:text-xl">
                            {achievement.title}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative order-1 lg:order-last">
              {/* Main Image */}
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8Y2xvdWQlMjBzZXJ2ZXIlMjBkYXRhJTIwY2VudGVyfGVufDF8fHx8MTc1OTczODgzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cloud Server Data Center"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[500px] object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/10 to-transparent rounded-2xl lg:rounded-3xl"></div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-4 right-4 lg:top-8 lg:right-8 w-48 h-48 lg:w-72 lg:h-72 bg-red-600/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section id="partnership" className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Header */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-xs sm:text-sm font-medium">
                  <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Partnership Benefits
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Why Partner
                  <span className="text-red-400 block">with Cache</span>
                </h2>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="group flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-600 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-1 sm:mb-2 text-sm sm:text-base">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="pt-4 sm:pt-6 lg:pt-8 border-t border-gray-700">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Accelerate Your Cloud Journey with Cache
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  Partner with Cache for end-to-end cloud strategy, migration, and operations. We help you innovate faster while keeping security, compliance, and cost under control.
                </p>
                <Link
                  to="/contactus"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-red-600 hover:bg-red-500 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative order-1 lg:order-last">
              {/* Main Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1623578240928-9473b76272ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1OTY0Njg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Digital Transformation Technology"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[500px] object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl"
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