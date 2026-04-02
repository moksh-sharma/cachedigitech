import React from "react";
import { Link } from "react-router-dom";
import { Database, BarChart3, Bot, Users, Shield, HelpCircle, Brain, TrendingUp, Sparkles, Cloud, Cpu, Globe, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePlacement } from "../context/PlacementsContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

const services = [
  {
    icon: Database,
    title: "Data Modernization",
    description: "We architect and implement scalable, cloud-based data platforms using Snowflake, Databricks, and modern ETL frameworks. Our approach ensures data unification, integrity, and accessibility — enabling enterprises to extract maximum value from every data point.",
    gradient: "from-red-500 to-red-600"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "With cutting-edge analytical models and visualization tools, we uncover hidden insights, predict business outcomes, and enhance decision-making. Our data experts help you transition from descriptive reporting to predictive and prescriptive intelligence.",
    gradient: "from-red-600 to-red-700"
  },
  {
    icon: Bot,
    title: "AI & Agentic Automation",
    description: "We design and deploy intelligent AI agents that automate workflows, interpret business context, and act autonomously. From customer engagement to enterprise operations, our solutions bring agility, precision, and scalability through AI-powered automation.",
    gradient: "from-red-500 to-red-600"
  },
  {
    icon: Users,
    title: "Intelligent CRM & Customer Insights",
    description: "We enhance CRM systems with AI-driven intelligence to deliver personalized recommendations, lead prioritization, and customer retention strategies that boost lifetime value.",
    gradient: "from-red-600 to-red-700"
  },
  {
    icon: Shield,
    title: "Cybersecurity and Governance",
    description: "At Cache Digitech, security is intrinsic to every solution. We implement robust frameworks for data protection, access control, and regulatory compliance, ensuring trust and transparency in all digital ecosystems.",
    gradient: "from-red-500 to-red-600"
  }
];

const partners = [
  {
    name: "Snowflake",
    description: "Unified data platform for analytics, AI, and secure data sharing",
    icon: Database,
    color: "bg-blue-500"
  },
  {
    name: "Databricks",
    description: "Collaborative data engineering and machine learning platform",
    icon: Cpu,
    color: "bg-orange-500"
  },
  {
    name: "Senpiper",
    description: "Low-code AI platform enabling intelligent process automation",
    icon: Bot,
    color: "bg-purple-500"
  },
  {
    name: "Bridge AI",
    description: "Framework for agentic and conversational AI applications",
    icon: Bot,
    color: "bg-green-500"
  },
  {
    name: "GCP / AWS / Azure",
    description: "Scalable, cloud-native environments with enterprise-grade security",
    icon: Cloud,
    color: "bg-indigo-500"
  }
];

const industries = [
  "BFSI", "Telecom", "Retail", "Manufacturing", "Healthcare"
];

const faqs = [
  {
    question: "What does it mean to be a data-driven enterprise?",
    answer: "A data-driven enterprise uses analytics and intelligence at every decision point. It replaces intuition with evidence-based insights derived from real-time, accurate data."
  },
  {
    question: "How does AI transform business operations?",
    answer: "AI automates complex workflows, enhances decision accuracy, and enables real-time personalization. It improves efficiency across operations — from demand forecasting to customer service."
  },
  {
    question: "Is my data secure when implementing AI solutions?",
    answer: "Absolutely. We adhere to global security standards and integrate multi-layered cybersecurity and compliance frameworks to safeguard your data throughout its lifecycle."
  },
  {
    question: "How long does a typical data and AI implementation take?",
    answer: "Implementation timelines depend on scope and complexity, but most solutions are deployed within 8 to 16 weeks using our agile and iterative methodology."
  },
  {
    question: "Which industries benefit most from your AI and data analytics solutions?",
    answer: "We serve multiple sectors, with proven results in Finance, Telecom, Retail, Manufacturing, and Healthcare, where data-driven intelligence creates measurable business impact."
  },
  {
    question: "Can you help organizations without existing data infrastructure?",
    answer: "Yes. Whether starting from the ground up or modernizing legacy systems, we design modular, scalable, and future-ready architectures suited to your business maturity level."
  }
];

export default function DataAIPage() {
  const heroImageUrl = usePlacement('aianddataservice', 'main', 'heroImage') || '/images/aimlimg.webp';

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
            Data Analytics & AI
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl leading-relaxed">
            Harness data and AI to drive insights, automation, and growth.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview-content" className="relative min-h-0 md:min-h-screen bg-linear-to-br from-white via-red-50/30 to-white overflow-hidden pt-8 sm:pt-12 lg:pt-16 scroll-mt-20">
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
                Data & AI Solutions
              </div>

              {/* Main Heading */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  Harnessing{" "}
                  <span className="text-red-600 relative inline-block">
                    Data
                    <span className="absolute -bottom-0.5 lg:-bottom-1 left-0 w-full h-0.5 bg-red-600/30 rounded-full" aria-hidden />
                  </span>{" "}
                  and{" "}
                  <span className="text-red-600 relative inline-block">
                    AI
                    <span className="absolute -bottom-0.5 lg:-bottom-1 left-0 w-full h-0.5 bg-red-600/30 rounded-full" aria-hidden />
                  </span>
                </h1>

                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-light">
                  for Strategic Business Growth
                </h2>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                At Cache Digitech, we believe that data and artificial intelligence are the cornerstones of modern business transformation. We empower organizations to evolve into intelligent, insight-driven enterprises — where every decision is informed by analytics and every process is optimized through AI.
              </p>

              {/* Mission Statement */}
              <div className="relative p-3 sm:p-4 lg:p-5 bg-linear-to-r from-red-600 to-red-700 rounded-lg sm:rounded-xl text-white shadow-xl">
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <div className="flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                  </div>
                </div>
                <div className="pt-4 sm:pt-5 lg:pt-6">
                  <p className="font-medium mb-0.5 sm:mb-1 text-[11px] sm:text-xs">Our Mission</p>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                    Transform your data into a powerful enabler of innovation, efficiency, and sustainable growth.
                  </p>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/10 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-last">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                <ImageWithFallback
                  src="/images/dataai.webp"
                  alt="AI and Machine Learning Visualization"
                  className="w-full h-36 sm:h-44 md:h-52 lg:h-64 xl:h-80 object-cover rounded-lg sm:rounded-xl shadow-xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-5 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium mb-2 sm:mb-3">
              <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Our Services
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              How We Transform Your Business
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto px-2">
              Comprehensive data and AI solutions designed to accelerate your digital transformation journey
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Icon Container */}
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-linear-to-br ${service.gradient} rounded-md sm:rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[11px] sm:text-xs lg:text-sm">
                      {service.description}
                    </p>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-lg sm:rounded-xl lg:rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Partners Section */}
      <section id="partners" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Content Side */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
              {/* Header */}
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium">
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Our Strategic Technology Partners
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Our Strategic Technology
                  <span className="text-red-600 block">Partners</span>
                </h2>

                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  To deliver world-class data and AI capabilities, we collaborate with global technology leaders:
                </p>
              </div>

              {/* Partners Grid */}
              <div className="space-y-2 sm:space-y-3">
                {partners.map((partner, index) => {
                  const Icon = partner.icon;
                  return (
                    <div
                      key={index}
                      className="group flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 lg:p-4 bg-gray-50 hover:bg-white rounded-lg sm:rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 ${partner.color} rounded-md sm:rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-0.5 text-xs sm:text-sm">
                          {partner.name}
                        </h3>
                        <p className="text-gray-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Impact Statement */}
              <div className="relative p-3 sm:p-4 lg:p-5 bg-linear-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl text-white overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-red-400" />
                    <span className="text-red-400 font-medium text-[11px] sm:text-xs">Global Impact</span>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base leading-relaxed">
                    Through these partnerships, Cache Digitech provides end-to-end solutions spanning data engineering, analytics, AI deployment, automation, and governance across multiple industries — including{" "}
                    <span className="text-red-400 font-medium">
                      {industries.join(", ")}
                    </span>.
                  </p>
                </div>

                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 lg:w-24 lg:h-24 bg-red-600/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 lg:w-16 lg:h-16 bg-red-600/10 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative order-1 lg:order-last">
              {/* Main Image */}
              <div className="relative">
                <ImageWithFallback
                  src="/techimage.webp"
                  alt="Technology Partnership Network"
                  className="w-full h-36 sm:h-44 md:h-52 lg:h-72 xl:h-80 object-cover rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-red-600/10 to-transparent rounded-lg sm:rounded-xl"></div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-2 right-2 lg:top-4 lg:right-4 w-32 h-32 lg:w-40 lg:h-40 bg-red-600/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-linear-to-br from-red-50/50 via-white to-red-50/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-5 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium mb-2 sm:mb-3">
              <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              FAQ
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Frequently Asked
              <span className="text-red-600 block">Questions</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Get quick answers to common questions about our data and AI solutions
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-2 sm:space-y-3">
            <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group bg-white border border-gray-200 hover:border-red-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 text-left hover:no-underline group-hover:bg-red-50/50 transition-colors duration-300">
                    <div className="flex items-start gap-2 sm:gap-3 w-full">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-100 group-hover:bg-red-200 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                        <span className="text-red-600 font-bold text-[10px] sm:text-xs">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 text-left">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4">
                    <div className="ml-0 sm:ml-8 lg:ml-9">
                      <p className="text-gray-600 leading-relaxed text-[11px] sm:text-xs lg:text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-6 sm:mt-8 lg:mt-10 p-3 sm:p-4 lg:p-5 bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">Still have questions?</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 max-w-xl mx-auto">
              Our team of experts is here to help you with any additional questions about our data and AI solutions.
            </p>
            <Link
              to="/contactus"
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Get in touch
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}