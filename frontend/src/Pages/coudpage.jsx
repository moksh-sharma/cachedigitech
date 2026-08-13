import React from "react";
import { Link } from "react-router-dom";
import {
  Cloud,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Upload,
  RefreshCw,
  LineChart,
  Receipt,
  Shield,
  Server,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePlacement } from "../context/PlacementsContext";

const callouts = [
  "34+ Years of Enterprise IT & Data Centre Heritage",
  "3 Hyperscalers (AWS, Azure, GCP) Under One Roof",
  "15%-30% Guaranteed Cloud Cost Optimization",
  "< 15 Min Response SLA with 24/7/365 NOC & SOC Coverage",
];

const pillars = [
  {
    icon: Upload,
    title: "Seamless Cloud Migration & Rehosting",
    description:
      "Zero downtime lift-and-shift of VMs, ERPs, and databases to AWS, Azure, or GCP.",
    to: "/cloud/cloud-application-transformation",
  },
  {
    icon: RefreshCw,
    title: "Application Replatforming & Modernization",
    description:
      "Refactor monoliths into microservices, containers, and serverless cloud-native stacks.",
    to: "/cloud/cloud-application-transformation",
  },
  {
    icon: LineChart,
    title: "Continuous Cloud Optimization & FinOps",
    description:
      "Eliminate waste with rightsizing, reservations, and continuous spend discipline.",
    to: "/cloud/managed-cloud-services",
  },
  {
    icon: Receipt,
    title: "Multi-Cloud Billing & Spend Management",
    description:
      "One vendor, three clouds - single invoice with partner discounts and rebates.",
    to: "/cloud/multi-cloud-billing",
  },
];

const matrixRows = [
  {
    purePlay: "Cloud-only focus; ignores legacy hardware constraints",
    cache:
      "Deep expertise in hybrid architecture, SAN storage, and physical networking",
  },
  {
    purePlay: "Multi-vendor billing chaos",
    cache: "Single invoice for AWS, Azure, GCP & IT",
  },
  {
    purePlay: "Reactive ticket support",
    cache: "Proactive 24/7/365 NOC + SOC Command",
  },
];

const managedHighlights = [
  "24/7/365 Live Monitoring: Automated health checks across all multi-cloud endpoints.",
  "Autonomous Threat Triage: Real-time SIEM log ingestion and incident remediation.",
  "Strict SLAs: Guarantees fast response and resolution times for mission-critical alerts.",
  "Regulatory Compliance: Fully aligned with strict data security standards.",
];

const aiHighlights = [
  "Funded AI PoC Program: Test customized Generative AI use cases in under 3 weeks using hyperscaler credits.",
  "Enterprise Search & Knowledge Engines: Turn internal PDFs, logs, and database streams into instant natural-language query tools.",
  "Autonomous Workflow Automation: Deploy intelligent AI agents to automate L1 support, threat triage, and repetitive back-office tasks.",
];

export default function CloudPage() {
  const heroImageUrl =
    usePlacement("cloudservices", "main", "heroImage") || "/images/cloudimg.webp";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section id="hero" className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen scroll-mt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/50" />
        <div className="relative max-w-7xl mx-auto h-full min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-black/35 border border-white/40 rounded-full text-white text-[10px] sm:text-xs font-medium mb-4 backdrop-blur-sm">
            <Cloud className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            Cloud
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-5xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
            34 Years of Enterprise Mastery. One Unified Multi-Cloud Powerhouse.
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white max-w-3xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            We bridge legacy on-premises architecture with high-velocity cloud
            innovation. As official partners with AWS, Microsoft Azure, and Google
            Cloud Platform (GCP), Cache Digitech simplifies your multi-cloud
            journey, eliminates spend waste, and secures your infrastructure
            24/7/365.
          </p>
        </div>
      </section>

      {/* Callout ribbon */}
      <section className="bg-gray-900 text-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {callouts.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 text-sm sm:text-[15px] leading-snug"
            >
              <CheckCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core pillars */}
      <section id="capabilities" className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Core Cloud Service Pillars
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Four pillars. One multi-cloud outcome.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.title}
                  to={pillar.to}
                  className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-white" aria-hidden />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {pillar.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                    Explore
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hybrid advantage */}
      <section id="hybrid-advantage" className="relative py-10 sm:py-14 lg:py-16 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.06),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4 sm:space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium">
                <Server className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Why Cache Digitech?
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                The Hybrid & On-Prem Advantage
              </h2>
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                We Know the Physical Metal. We Master the Digital Cloud.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Pure-play cloud vendors don&apos;t understand the realities of
                legacy hardware, air-gapped networks, and hybrid data centers. With
                34 years of enterprise data center experience, Cache Digitech
                speaks fluently in both environments. We know how to integrate
                existing on-premise infrastructure with AWS, Azure, and GCP into a
                single, cohesive, highly resilient hybrid cloud ecosystem.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <ImageWithFallback
                  src="/images/cloud.webp"
                  alt="Hybrid cloud infrastructure"
                  className="w-full aspect-4/3 sm:aspect-16/10 object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          {/* Matrix */}
          <div className="mt-10 sm:mt-12">
            <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 tracking-wide">
              The Hybrid Advantage Matrix
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-4 py-3 sm:px-5 sm:py-4 font-semibold w-1/2">
                      Pure-Play Cloud Vendors
                    </th>
                    <th className="px-4 py-3 sm:px-5 sm:py-4 font-semibold w-1/2 bg-red-600">
                      Cache Digitech (34-Year Legacy)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => (
                    <tr
                      key={row.purePlay}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 sm:px-5 sm:py-4 text-gray-600 align-top border-t border-gray-100">
                        {row.purePlay}
                      </td>
                      <td className="px-4 py-3 sm:px-5 sm:py-4 text-gray-800 font-medium align-top border-t border-gray-100">
                        {row.cache}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Managed ops teaser */}
      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Managed Operations
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              24/7/365 NOC & SOC Command Center
            </h2>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              Military-Grade Security. Always-On Operational Resilience.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Sleep soundly knowing your cloud environment is monitored,
              optimized, and defended around the clock. Our fully operational,
              enterprise-grade Network Operations Center (NOC) and Security
              Operations Center (SOC) ensure zero blind spots, proactive threat
              hunting, and rapid incident response.
            </p>
            <Link
              to="/cloud/managed-cloud-services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-500"
            >
              Explore managed cloud services
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
          <ul className="space-y-3">
            {managedHighlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm text-sm text-gray-700"
              >
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI CoE teaser */}
      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4 order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-[11px] sm:text-xs font-medium">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              AI Center of Excellence
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              From Raw Data to Autonomous Enterprise AI
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Stop experimenting with static AI chatbots - build production-ready
              intelligence that drives top-line revenue. The Cache Digitech AI CoE
              builds customized Large Language Models (LLMs), Retrieval-Augmented
              Generation (RAG) pipelines, and autonomous agentic workflows
              natively on AWS Bedrock, Azure OpenAI, and GCP Vertex AI.
            </p>
            <Link
              to="/cloud/ai-coe"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-500"
            >
              Explore the AI CoE
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
          <ul className="space-y-3 order-1 lg:order-2">
            {aiHighlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 shadow-sm text-sm text-gray-700"
              >
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.12),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Ready to Slash Cloud Costs and Accelerate Your AI Roadmap?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
            Book a 15-minute strategy session with our Multi-Cloud Solutions
            Architects and claim your Complimentary 14-Day Cloud Cost Assessment.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contactus"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Claim Your Free Cloud Audit
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              to="/contactus"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white/90 text-sm font-semibold rounded-lg border border-white/25 hover:bg-white/10 transition-colors"
            >
              Schedule Architecture Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
