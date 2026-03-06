import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Lightbulb,
  Cpu,
  Rocket,
  Users,
  ArrowRight,
  Shield,
  Cloud,
  Brain,
  Network,
  Award,
  FlaskConical,
  Handshake,
  FileCheck,
  Target,
  Sparkles,
  BookOpen,
} from "lucide-react";

// Professional imagery (Unsplash) - tech, innovation, collaboration
const HERO_IMAGE = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80";
const OVERVIEW_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";
const SPOTLIGHT_IMAGES = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
];
const CLOUD_SECTION_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80";

const CLOUD_INNOVATION_POINTS = [
  "Hybrid & multi-cloud strategy—design and operate across AWS, Azure, GCP, and on-prem with a single operating model.",
  "Cloud migration & modernization—from assessment and roadmap to lift-and-shift and refactor, with minimal disruption.",
  "Cloud-native & serverless—containers, Kubernetes, and serverless to build scalable, cost-efficient applications.",
  "FinOps & cost optimization—visibility, rightsizing, and governance so you innovate without overspend.",
  "Security & compliance in the cloud—identity, zero trust, and compliance frameworks built into every design.",
];

const INNOVATION_PILLARS = [
  {
    icon: Lightbulb,
    title: "Ideation & Research",
    description:
      "We invest in continuous research and exploration of emerging technologies to identify opportunities that drive real business value for our clients.",
  },
  {
    icon: Cpu,
    title: "Technology Adoption",
    description:
      "From AI and GenAI to cloud-native and edge computing, we help enterprises adopt and integrate cutting-edge technologies into their operations.",
  },
  {
    icon: Rocket,
    title: "Accelerators & IP",
    description:
      "Our frameworks, accelerators, and IP-led solutions shorten time-to-value and enable repeatable, scalable innovation across your organization.",
  },
  {
    icon: Users,
    title: "Ecosystem & Partnerships",
    description:
      "We collaborate with technology leaders, OEMs, and innovators to bring best-in-class solutions and co-innovation opportunities to our clients.",
  },
];

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: "AI & GenAI",
    description: "Intelligent automation, analytics, and AI-native solutions.",
    path: "/aianddataservice",
  },
  {
    icon: Cloud,
    title: "Cloud & Digital",
    description: "Hybrid and multi-cloud strategy, cloud-native development, migration at scale, and FinOps—so you innovate faster with agility and cost control.",
    path: "/cloudservices",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Secure-by-design, zero trust, and compliance.",
    path: "/cybersecurity",
  },
  {
    icon: Network,
    title: "Engineering & R&D",
    description: "Product engineering, DevOps, and platform innovation.",
    path: "/infrastructureservice",
  },
  {
    icon: Target,
    title: "Industry Solutions",
    description: "BFSI, telecom, healthcare, and sector-specific innovation.",
    path: "/case-studies",
  },
];

const PROOF_ITEMS = [
  {
    icon: FlaskConical,
    title: "Labs & CoE",
    description: "Dedicated innovation labs and centers of excellence for POCs, pilots, and rapid experimentation.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description: "Deep ties with OEMs, hyperscalers, and ISVs for co-innovation and joint solutions.",
  },
  {
    icon: FileCheck,
    title: "Certifications & Standards",
    description: "ISO, CMMI, and security certifications that enable innovation with governance and trust.",
  },
  {
    icon: Award,
    title: "Awards & Recognition",
    description: "Industry recognition for innovation, delivery excellence, and client impact.",
    path: "/about/awards",
  },
];

const TRENDS = [
  "Agentic AI & autonomous systems",
  "Edge & hybrid cloud",
  "Multi-cloud & cloud-native at scale",
  "Industry cloud & vertical solutions",
  "Responsible & ethical AI",
];

const INNOVATION_SPOTLIGHT = [
  {
    title: "AI for intelligent operations",
    summary: "How we help enterprises embed AI into workflows for efficiency and insight.",
    path: "/aianddataservice",
  },
  {
    title: "Cloud modernization at scale",
    summary: "From lift-and-shift to cloud-native: we help you migrate, optimize costs with FinOps, and run hybrid and multi-cloud with security and governance built in.",
    path: "/cloudservices",
  },
  {
    title: "Secure-by-design solutions",
    summary: "Building security and compliance into every layer of your digital estate.",
    path: "/cybersecurity",
  },
];

export default function InnovationsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero — professional, high-impact */}
      <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/85" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(220,38,38,0.08),transparent)] pointer-events-none" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-36">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/95 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Innovation at Cache
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight max-w-4xl leading-[1.08] drop-shadow-lg">
            Where ideas meet impact
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-gray-200/95 max-w-2xl leading-relaxed">
            We believe innovation is not a department—it's how we work. From research and emerging tech to accelerators and partnerships, we help you turn vision into outcomes.
          </p>
          <div className="mt-12 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2 text-white/90">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Research & ideation
            </span>
            <span className="flex items-center gap-2 text-white/90">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Technology adoption
            </span>
            <span className="flex items-center gap-2 text-white/90">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Co-innovation
            </span>
          </div>
        </div>
      </section>

      {/* Overview with image */}
      <section id="overview" className="relative py-20 lg:py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">Our approach</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--apple-black) tracking-tight mb-6 leading-tight">
                Reimagining possibility
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Cache Digitech combines deep engineering heritage with a forward-looking mindset. Our innovations span technology adoption, solution accelerators, and strategic partnerships—enabling our clients to stay ahead in a rapidly evolving digital landscape.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We partner with you from ideation through delivery, turning complex challenges into scalable, future-ready solutions.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img
                src={OVERVIEW_IMAGE}
                alt="Collaboration and innovation"
                className="w-full h-full object-cover aspect-4/3"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section id="focus-areas" className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <header className="text-center mb-16 lg:mb-20">
            <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              What we innovate
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--apple-black) tracking-tight max-w-3xl mx-auto">
              Innovation focus areas
            </h2>
            <div className="mt-6 w-16 h-1 bg-red-500/80 rounded-full mx-auto" aria-hidden />
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {FOCUS_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <Link
                  key={area.title}
                  to={area.path}
                  className="group bg-white rounded-2xl p-6 lg:p-8 border border-slate-200/80 shadow-lg hover:shadow-xl hover:border-red-200/70 hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col ring-0 hover:ring-2 hover:ring-red-100"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300 ease-out">
                    <Icon className="h-7 w-7 text-red-600" aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-(--apple-black) mb-2 group-hover:text-red-600 transition-colors duration-300 ease-out">
                    {area.title}
                  </h3>
                  <p className="text-(--apple-gray) text-sm leading-relaxed flex-1">
                    {area.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cloud at the core */}
      <section id="cloud-innovation" className="relative py-20 lg:py-28 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Cloud at the core
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--apple-black) tracking-tight mb-6 leading-tight">
                Innovate on cloud—with control and clarity
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our cloud innovation practice helps you adopt and scale on cloud with strategy, migration, and operations that put cost, security, and agility in balance. We work across hyperscalers and hybrid environments so you can focus on outcomes, not infrastructure.
              </p>
              <ul className="space-y-4">
                {CLOUD_INNOVATION_POINTS.map((point) => (
                  <li key={point.slice(0, 24)} className="flex gap-3 text-gray-700">
                    <Cloud className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  to="/cloudservices"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
                >
                  Explore cloud services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img
                src={CLOUD_SECTION_IMAGE}
                alt="Cloud infrastructure and innovation"
                className="w-full h-full object-cover aspect-4/3"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* How we innovate (pillars) */}
      <section id="pillars" className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <header className="text-center mb-16 lg:mb-20">
            <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our focus
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--apple-black) tracking-tight max-w-3xl mx-auto">
              How we innovate
            </h2>
            <div className="mt-6 w-16 h-1 bg-red-500/80 rounded-full mx-auto" aria-hidden />
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {INNOVATION_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group bg-slate-50/80 rounded-2xl p-6 lg:p-8 border border-slate-200/60 shadow-lg hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm group-hover:bg-red-50 group-hover:scale-105 transition-all duration-300 ease-out">
                    <Icon className="h-7 w-7 text-red-600" aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-(--apple-black) mb-3 group-hover:text-red-600 transition-colors duration-300 ease-out">
                    {pillar.title}
                  </h3>
                  <p className="text-(--apple-gray) text-[15px] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof & credibility */}
      <section id="proof" className="relative py-20 lg:py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <header className="text-center mb-16 lg:mb-20">
            <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Why trust us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--apple-black) tracking-tight max-w-3xl mx-auto">
              Proof & credibility
            </h2>
            <div className="mt-6 w-16 h-1 bg-red-500/80 rounded-full mx-auto" aria-hidden />
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {PROOF_ITEMS.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-md border border-slate-100">
                    <Icon className="h-7 w-7 text-red-600" aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-(--apple-black) mb-2">{item.title}</h3>
                  <p className="text-(--apple-gray) text-sm leading-relaxed">{item.description}</p>
                  {item.path && (
                    <Link
                      to={item.path}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:gap-3 transition-all"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </>
              );
              return item.path ? (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group bg-white rounded-2xl p-6 lg:p-8 border border-slate-200/60 shadow-lg hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 ease-out block"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200/60 shadow-lg"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation spotlight with images */}
      <section id="spotlight" className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <header className="text-center mb-16 lg:mb-20">
            <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              In action
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--apple-black) tracking-tight max-w-3xl mx-auto">
              Innovation spotlight
            </h2>
            <div className="mt-6 w-16 h-1 bg-red-500/80 rounded-full mx-auto" aria-hidden />
          </header>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {INNOVATION_SPOTLIGHT.map((item, idx) => (
              <Link
                key={item.title}
                to={item.path}
                className="group block rounded-2xl overflow-hidden bg-white border border-slate-200/60 shadow-lg hover:shadow-xl hover:border-red-200/60 hover:-translate-y-2 transition-all duration-300 ease-out"
              >
                <div className="aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={SPOTLIGHT_IMAGES[idx]}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 lg:p-8 border-t border-slate-100">
                  <Sparkles className="h-8 w-8 text-red-500/80 mb-4" />
                  <h3 className="text-lg font-bold text-(--apple-black) mb-2 group-hover:text-red-600 transition-colors duration-300 ease-out">
                    {item.title}
                  </h3>
                  <p className="text-(--apple-gray) text-sm leading-relaxed mb-4">{item.summary}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
            >
              See all case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Thought leadership & trends */}
      <section id="trends" className="relative py-20 lg:py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-(--apple-black) tracking-tight mb-8">
                Trends we're betting on
              </h2>
              <ul className="space-y-5">
                {TRENDS.map((trend) => (
                  <li key={trend} className="flex items-center gap-4 text-gray-700 text-lg">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0 ring-4 ring-red-100" />
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-slate-200/60">
              <h2 className="text-2xl sm:text-3xl font-bold text-(--apple-black) tracking-tight mb-6">
                Responsible innovation
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                We embed governance, fairness, explainability, and compliance into every innovation—aligning with our commitment to Trust by Design and ethical technology.
              </p>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
              >
                <BookOpen className="h-5 w-5" />
                Latest insights & blogs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 p-10 lg:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to innovate together?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
              Partner with us for co-innovation, pilots, or innovation workshops. Explore our services or get in touch to see how we can help you leverage technology for growth and transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/cloudservices"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Cloud Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/aianddataservice"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border border-white/30 transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                AI & Data Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contactus"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border border-white/30 transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border border-white/30 transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                Careers in innovation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
