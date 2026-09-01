import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Cloud,
  Headphones,
  Search,
  PenTool,
  Rocket,
  RefreshCw,
  Shield,
  Cog,
  Globe,
  Clock,
  Building2,
  Radio,
  Factory,
  Landmark,
  Target,
  Users,
  Award,
} from "lucide-react";
import { usePageScroll } from "../hooks/usePageScroll";
import { LazyBackground } from "../components/LazyBackground";

const HERO_IMAGE = "/hero-bg-image.webp";
const DELIVERY_IMAGE = "/images/innovations-meeting.webp";
const LEADERSHIP_IMAGE = "/leadership-booth.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
};

const OUTCOMES = [
  {
    value: 50,
    suffix: "%",
    label: "Faster deployment",
    description: "Cloud and infrastructure programs designed for speed without compromising reliability.",
    path: "/cloudservices",
    icon: Rocket,
  },
  {
    value: 30,
    suffix: "%",
    label: "Faster incident resolution",
    description: "24x7 NOC and intelligent operations that detect, respond, and restore faster.",
    path: "/manageservices",
    icon: Clock,
  },
  {
    value: 35,
    suffix: "%",
    label: "Lower infrastructure spend",
    description: "Optimized cloud, data center, and network architectures that reduce total cost of ownership.",
    path: "/infrastructureservice",
    icon: Cog,
  },
  {
    value: 90,
    suffix: "%",
    label: "Faster threat detection",
    description: "Cybersecurity and compliance automation that closes gaps before they become incidents.",
    path: "/cybersecurity",
    icon: Shield,
  },
];

const DELIVERY_PHASES = [
  {
    icon: Search,
    title: "Assess",
    description:
      "Business goals, current landscape, and constraints - audits, gap analysis, and a clear roadmap before any build begins.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Architecture, security, and integration blueprints aligned to your industry, compliance needs, and scale.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "Structured rollout with minimal disruption: migration pipelines, automation, testing, and certified cutover.",
  },
  {
    icon: RefreshCw,
    title: "Operate and optimize",
    description:
      "Managed NOC/SOC, continuous monitoring, FinOps, and improvement cycles so outcomes compound after go-live.",
  },
];

const CAPABILITIES = [
  {
    icon: Cloud,
    title: "Cloud and digital",
    description: "Hybrid and multi-cloud strategy, migration, modernization, and managed cloud operations.",
    path: "/cloudservices",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Zero trust, SOC/SIEM, compliance frameworks, and security consulting end to end.",
    path: "/cybersecurity",
  },
  {
    icon: BarChart3,
    title: "Data, analytics, and AI",
    description: "Data platforms, advanced analytics, AI automation, and intelligent operations.",
    path: "/aianddataservice",
  },
  {
    icon: Cog,
    title: "Infrastructure and networking",
    description: "Data center, LAN/WAN, virtualization, backup, and enterprise-grade network design.",
    path: "/infrastructureservice",
  },
  {
    icon: Headphones,
    title: "Managed services",
    description: "24x7 NOC/SOC, infrastructure management, DevOps, and end-user support.",
    path: "/manageservices",
  },
];

const PROOF_POINTS = [
  { value: "1991", label: "Founded", sub: "Three decades of delivery" },
  { value: "800cr+", label: "Annual revenue", sub: "Enterprise scale" },
  { value: "300+", label: "Cities served", sub: "Pan-India footprint" },
  { value: "24x7", label: "Global NOC/SOC", sub: "Always-on operations" },
];

const INDUSTRIES = [
  { icon: Radio, label: "Telecom" },
  { icon: Building2, label: "BFSI" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Landmark, label: "Public sector" },
  { icon: Globe, label: "IT and ITES" },
];

const DIFFERENTIATORS = [
  {
    icon: Target,
    title: "Single-point accountability",
    description: "ITIL-aligned service delivery with one partner accountable from strategy through operations.",
  },
  {
    icon: Users,
    title: "Deep OEM partnerships",
    description: "Best-in-class solutions through hyperscaler and technology vendor alliances.",
  },
  {
    icon: Award,
    title: "Industry expertise",
    description: "Proven delivery across telecom, BFSI, manufacturing, and public sector programs.",
  },
  {
    icon: RefreshCw,
    title: "End-to-end ownership",
    description: "Assessment, design, deployment, and managed services under one engagement model.",
  },
];

function AnimatedStat({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-24px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const duration = 1100;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-red-500 text-[10px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.25em] uppercase mb-2 sm:mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-(--apple-black) tracking-tight leading-tight break-words ${className}`}
    >
      {children}
    </h2>
  );
}

export default function HowWeDeliverPage() {
  usePageScroll();

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden min-w-0">
      {/* Hero */}
      <section className="relative min-h-[min(100svh,640px)] sm:min-h-[60vh] lg:min-h-[68vh] flex flex-col justify-end sm:justify-center overflow-hidden">
        <LazyBackground
          src={HERO_IMAGE}
          eager
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/65 to-black/90" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(220,38,38,0.1),transparent)] pointer-events-none" aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-24 pb-10 sm:py-20 md:py-24 lg:py-28 w-full min-w-0">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/95 text-[10px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-5">
              Delivery excellence
            </span>
            <h1 className="text-[1.75rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight break-words">
              From strategy to measurable outcomes
            </h1>
            <p className="mt-3 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-200/95 max-w-2xl leading-relaxed break-words">
              Cache Digitech combines three decades of system integration with modern cloud, data, and security
              capabilities - every engagement moves from assessment to results you can measure.
            </p>

            <div className="mt-5 sm:mt-7 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-white/90">
              {["Assess", "Design", "Deploy", "Operate"].map((step) => (
                <span key={step} className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" aria-hidden />
                  {step}
                </span>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <Link
                to="/contactus"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-sm font-semibold px-7 py-3.5 min-h-12 shadow-lg shadow-red-900/30 transition-colors"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credibility bar */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {PROOF_POINTS.map((point, index) => (
              <div
                key={point.label}
                className={`py-4 sm:py-6 px-3 sm:px-6 text-center lg:text-left ${
                  index % 2 === 0 ? "border-r border-slate-200/80 lg:border-r" : ""
                } ${index < 2 ? "border-b border-slate-200/80 lg:border-b-0" : ""} ${
                  index < 3 ? "lg:border-r lg:border-slate-200/80" : "lg:border-r-0"
                }`}
              >
                <p className="text-xl sm:text-3xl font-bold text-red-600 tabular-nums">{point.value}</p>
                <p className="text-xs sm:text-base font-semibold text-(--apple-black) mt-1 leading-snug">{point.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 hidden md:block">{point.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="relative py-8 sm:py-10 md:py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="min-w-0 order-2 lg:order-1"
            >
              <SectionLabel>Our approach</SectionLabel>
              <SectionTitle className="mb-3 sm:mb-5">One partner across the full lifecycle</SectionTitle>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-3 sm:mb-4 break-words">
                We do not hand off at go-live. Cache Digitech owns the journey from discovery and architecture through
                deployment, managed operations, and continuous improvement - so your technology investments keep
                delivering value.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed break-words">
                Our delivery model is built for enterprise scale: certified engineers, ITIL-aligned processes, and
                24x7 NOC/SOC coverage across India and global markets.
              </p>
              <div className="mt-5 sm:mt-7 flex flex-wrap gap-2">
                {INDUSTRIES.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-medium text-gray-700 shadow-sm"
                  >
                    <Icon className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden />
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={1}
              className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl ring-1 ring-black/5 order-1 lg:order-2 w-full min-w-0"
            >
              <img
                src={DELIVERY_IMAGE}
                alt="Cache Digitech delivery and collaboration"
                className="w-full h-full object-cover aspect-video sm:aspect-4/3 max-w-full"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" aria-hidden />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="outcomes" className="relative py-8 sm:py-10 md:py-12 lg:py-16 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0">
          <header className="text-center mb-5 sm:mb-8 lg:mb-10 max-w-3xl mx-auto px-1">
            <SectionLabel>Measurable impact</SectionLabel>
            <SectionTitle>Outcomes our clients see</SectionTitle>
            <div className="mt-3 sm:mt-4 w-12 sm:w-16 h-1 bg-red-500/80 rounded-full mx-auto" aria-hidden />
            <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              Benchmarks we deliver across cloud, managed services, infrastructure, and cybersecurity engagements.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            {OUTCOMES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-24px" }}
                  custom={i}
                  variants={fadeUp}
                >
                  <Link
                    to={item.path}
                    className="group flex flex-col h-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4 sm:p-5 md:p-6 active:scale-[0.99] hover:bg-white hover:border-red-200/70 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="text-3xl sm:text-4xl font-bold tabular-nums text-red-600 leading-none">
                        <AnimatedStat value={item.value} suffix={item.suffix} />
                      </p>
                      <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                        <Icon className="h-4 w-4 text-red-600" aria-hidden />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-(--apple-black) mb-1.5">{item.label}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1">{item.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 group-hover:gap-2.5 transition-all">
                      Explore capability
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="framework" className="relative py-8 sm:py-10 md:py-12 lg:py-16 bg-slate-50/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <SectionLabel>Our methodology</SectionLabel>
              <SectionTitle className="mb-3 sm:mb-5">How we deliver</SectionTitle>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-5">
                A proven four-phase model used across telecom, BFSI, manufacturing, and public sector programs - with
                clear milestones and accountability at every stage.
              </p>
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 hidden lg:block">
                <img
                  src={LEADERSHIP_IMAGE}
                  alt=""
                  className="w-full aspect-4/3 object-cover"
                  loading="lazy"
                  decoding="async"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" aria-hidden />
                <p className="absolute bottom-0 inset-x-0 p-5 text-sm text-white/90 leading-relaxed">
                  Certified teams, structured governance, and continuous improvement built into every engagement.
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-7 relative">
              <div className="absolute left-5 top-3 bottom-3 w-px bg-red-200/80 sm:left-6" aria-hidden />
              <div className="space-y-3 sm:space-y-4">
                {DELIVERY_PHASES.map((phase, index) => {
                  const Icon = phase.icon;
                  return (
                    <motion.div
                      key={phase.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-24px" }}
                      custom={index}
                      variants={fadeUp}
                      className="relative flex gap-3 sm:gap-4"
                    >
                      <div className="relative z-10 shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-600/20">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" aria-hidden />
                      </div>
                      <div className="flex-1 min-w-0 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">
                          Phase {index + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-(--apple-black) mt-1 mb-1.5">{phase.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{phase.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cache */}
      <section className="relative py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0">
          <header className="text-center mb-5 sm:mb-8 lg:mb-10 max-w-3xl mx-auto px-1">
            <SectionLabel>Why Cache</SectionLabel>
            <SectionTitle>Built for enterprise-scale delivery</SectionTitle>
            <div className="mt-3 sm:mt-4 w-12 sm:w-16 h-1 bg-red-500/80 rounded-full mx-auto" aria-hidden />
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {DIFFERENTIATORS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-24px" }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 lg:p-6 hover:bg-white hover:border-red-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                    <Icon className="h-5 w-5 text-red-600" aria-hidden />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-(--apple-black) mb-1.5 sm:mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 sm:mt-7 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 min-h-11 px-2"
            >
              Learn about Cache Digitech
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="capabilities" className="relative py-8 sm:py-10 md:py-12 lg:py-16 bg-slate-50/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0">
          <header className="text-center mb-5 sm:mb-8 lg:mb-10 max-w-3xl mx-auto px-1">
            <SectionLabel>Full-stack services</SectionLabel>
            <SectionTitle>What we deliver</SectionTitle>
            <div className="mt-3 sm:mt-4 w-12 sm:w-16 h-1 bg-red-500/80 rounded-full mx-auto" aria-hidden />
            <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              Technology capabilities backed by global NOC/SOC operations and deep OEM partnerships.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-24px" }}
                  custom={i}
                  variants={fadeUp}
                  className={i === CAPABILITIES.length - 1 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
                >
                  <Link
                    to={cap.path}
                    className="group flex flex-col h-full rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-6 shadow-sm active:scale-[0.99] hover:shadow-xl hover:border-red-200/70 sm:hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-red-50 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-red-100 transition-colors">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" aria-hidden />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-(--apple-black) mb-1.5 sm:mb-2 group-hover:text-red-600 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-3 sm:mb-4">{cap.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-slate-200/80 shadow-xl"
        >
          <LazyBackground src="/blog/ai.webp" className="absolute inset-0 bg-cover bg-center" aria-hidden />
          <div className="absolute inset-0 bg-linear-to-b sm:bg-linear-to-r from-[#0a0a0b]/95 via-[#0a0a0b]/90 to-[#0a0a0b]/80" aria-hidden />

          <div className="relative px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 grid md:grid-cols-[1fr_auto] gap-5 sm:gap-6 items-center">
            <div className="text-white min-w-0 text-center md:text-left">
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-red-400 mb-2 sm:mb-3">
                Get started
              </p>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-3 leading-tight break-words">
                Ready to see what we can deliver for you?
              </h2>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                Speak with our team about your infrastructure, cloud, security, or AI goals - we will map a practical path
                from assessment to outcomes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/contactus"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold px-6 py-3.5 min-h-12 shadow-lg transition-colors w-full md:w-auto"
              >
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 min-h-12 transition-colors w-full md:w-auto"
              >
                View case studies
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
