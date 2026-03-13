import { useState, useEffect } from "react";
import { Radio, Network, Shield, Cloud, Settings, TrendingUp, CheckCircle, Sparkles, Server, Cpu, Globe, Zap, Eye, Lock, Users, ArrowRight, Rocket } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePlacement } from "../context/PlacementsContext";

const navItems = [
    { id: "hero", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "value", label: "Value Delivered" },
    { id: "future", label: "Future Vision" },
];

const capabilities = [
    {
        icon: Network,
        title: "Infrastructure Modernization & Network Transformation",
        points: [
            "Large-scale deployments of IPDR, DNS, CGNAT, and Broadband Gateways across PAN India.",
            "Infrastructure readiness for 4G/5G Core, VoLTE, AAA-PCRF, and H-Cloud environments.",
            "Over 1,200+ servers deployed PAN India for H-Cloud and Aura Cloud projects with Dell Technologies.",
            "End-to-end modernization of legacy systems for scalability, resilience, and performance."
        ],
        gradient: "from-red-500 to-red-600"
    },
    {
        icon: Shield,
        title: "Cybersecurity Enablement for Telcos",
        points: [
            "Deployment of SIEM, SOAR, UEBA, NGAV & Zero Trust frameworks for network and enterprise security.",
            "Firewall policy orchestration (Tufin), event management (SolarWinds), endpoint protection (VMware Carbon Black), and network visibility (Riverbed).",
            "Managed SOC with real-time threat detection, response, and compliance reporting (PCI-DSS, GDPR, SOX).",
            "Deep expertise in protecting carrier-grade networks and subscriber data across distributed environments."
        ],
        gradient: "from-red-600 to-red-700"
    },
    {
        icon: Settings,
        title: "Network Automation & Monitoring",
        points: [
            "Advanced telemetry, SDN/NFV integration, and APSTRA-driven network automation.",
            "Centralized monitoring of 75,000+ active devices, including 20,000+ FortiGate firewalls and multi-vendor assets.",
            "End-to-end performance analytics for uptime assurance and proactive fault management."
        ],
        gradient: "from-red-500 to-red-600"
    },
    {
        icon: Cloud,
        title: "Cloud & Data Center Transformation",
        points: [
            "Design, build, and operation of private, hybrid, and multi-cloud infrastructure.",
            "Integration of OpenStack, VMware, and Nutanix platforms for high-availability and cloud-native telecom workloads.",
            "Seamless orchestration and virtualization for next-gen OSS/BSS systems."
        ],
        gradient: "from-red-600 to-red-700"
    },
    {
        icon: Users,
        title: "Global Support & Field Engineering Services",
        points: [
            "Dedicated NOC/SOC with ITIL-aligned operations, proactive monitoring, and L1–L3 support.",
            "Field engineering presence across 8+ remote locations for leading operators.",
            "CCNA, NSE, and OEM-certified engineers ensuring continuous uptime and SLA adherence."
        ],
        gradient: "from-red-500 to-red-600"
    }
];

const valuePoints = [
    {
        icon: CheckCircle,
        title: "Digital Resilience",
        description: "Strengthened network continuity, redundancy, and uptime across mission-critical infrastructure."
    },
    {
        icon: Shield,
        title: "Security First",
        description: "Multi-layered cybersecurity framework protecting telco data and customer trust."
    },
    {
        icon: TrendingUp,
        title: "Operational Excellence",
        description: "Streamlined automation, faster rollout cycles, and reduced OPEX."
    },
    {
        icon: Zap,
        title: "Scalability & Agility",
        description: "Future-ready infrastructure supporting 5G, Edge, and AI-driven network operations."
    },
    {
        icon: Users,
        title: "Customer Trust",
        description: "Long-standing partnerships with leading telecom operators and OEMs built on responsiveness, transparency, and delivery excellence."
    }
];

const futureVision = [
    {
        icon: Cpu,
        title: "AI-Driven Network Operations",
        description: "Build predictive maintenance and self-healing capabilities for next-generation networks."
    },
    {
        icon: Globe,
        title: "Green Telecom",
        description: "Enable energy-efficient infrastructure and sustainable innovation across the telecom ecosystem."
    },
    {
        icon: Rocket,
        title: "5G Testbeds & Co-Innovation Labs",
        description: "Collaborate with Dell, Cisco, and global NEPs to pioneer telecom innovation."
    },
    {
        icon: Server,
        title: "Sanchalan.ai",
        description: "Our indigenous GRC platform automating compliance and risk management for Telecom & BFSI."
    },
    {
        icon: Eye,
        title: "Global Managed Services",
        description: "Expand next-generation NOC/SOC and Cloud Command Centers for unified monitoring worldwide."
    }
];

export default function TelecomPage() {
    const [activeSection, setActiveSection] = useState("hero");
    const heroImage1Url = usePlacement('telecom', 'hero', 'image1') || '/servicesimages/telecompage.webp';
    const heroImage2Url = usePlacement('telecom', 'hero', 'image2') || '/servicesimages/telecompage2.webp';

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
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="mx-auto px-6">
                    <div className="flex justify-center items-center py-4">
                        {/* Navigation Items - Desktop */}
                        <div className="hidden lg:flex justify-center items-center">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-6 py-2 transition-all duration-300 ${isActive
                                                ? "text-red-600"
                                                : "text-gray-600 hover:text-red-600"
                                            }`}
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        {isActive && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Navigation Items - Mobile */}
                        <div className="lg:hidden w-full flex justify-center">
                            <div className="flex items-center gap-1 overflow-x-auto justify-center">
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`relative px-3 py-2 text-sm whitespace-nowrap transition-all duration-300 ${isActive
                                                    ? "text-red-600"
                                                    : "text-gray-600 hover:text-red-600"
                                                }`}
                                        >
                                            <span className="relative z-10">{item.label}</span>
                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen bg-linear-to-br from-white via-red-50/30 to-white overflow-hidden pt-5">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="space-y-6 lg:space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                Telecom Excellence
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4 lg:space-y-6">
                                <h1 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                                    <span className="text-red-600">
                                        Cache Digitech
                                    </span>{" "}
                                    in{" "}
                                    <span className="text-red-600 relative">
                                        Telecom
                                        <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-red-600/30 rounded-full"></div>
                                    </span>
                                </h1>

                                <h2 className="text-xl sm:text-2xl lg:text-2xl text-gray-700 font-light">
                                    Three Decades of Trust, Transformation & Technology Excellence
                                </h2>
                            </div>

                            {/* Description */}
                            <div className="space-y-4 lg:space-y-6">
                                <p className="text-lg lg:text-lg text-gray-600 leading-relaxed">
                                    Cache Digitech has been an inseparable part of India's telecom evolution. For over three decades, we have empowered leading service providers and network operators to design, build, secure, and scale their digital infrastructure.
                                </p>

                                <p className="text-lg lg:text-lg text-gray-600 leading-relaxed">
                                    From the early days of switching systems to today's era of 5G, Edge, and Cloud, Cache has consistently stood as a trusted technology partner — delivering mission-critical infrastructure, zero-downtime operations, and digital resilience.
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                                <div className="bg-linear-to-br from-red-600 to-red-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg">
                                    <div className="text-2xl lg:text-3xl font-bold mb-1">32+</div>
                                    <div className="text-sm lg:text-base opacity-90">Years Experience</div>
                                </div>
                                <div className="bg-linear-to-br from-red-600 to-red-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg">
                                    <div className="text-2xl lg:text-3xl font-bold mb-1">500+</div>
                                    <div className="text-sm lg:text-base opacity-90">Certified Experts</div>
                                </div>
                                <div className="bg-linear-to-br from-red-600 to-red-700 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg col-span-2 sm:col-span-1">
                                    <div className="text-2xl lg:text-3xl font-bold mb-1">75K+</div>
                                    <div className="text-sm lg:text-base opacity-90">Devices Managed</div>
                                </div>
                            </div>

                            {/* Bottom Statement */}
                            <div className="relative p-6 lg:p-8 bg-gray-50 rounded-xl lg:rounded-2xl border border-gray-200">
                                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                    With <span className="font-bold text-red-600">32+ years</span> of system integration expertise, a <span className="font-bold text-red-600">500+ certified technocrat workforce</span>, and <span className="font-bold text-red-600">750+ support locations</span>, Cache continues to power telecom innovation with agility and accountability. We are proud to be managing over <span className="font-bold text-red-600">75,000 devices</span> across telecom networks nationwide, ensuring performance, availability, and security.
                                </p>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative order-first lg:order-last">
                            <div className="relative">
                                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent rounded-3xl"></div>
                                <ImageWithFallback
                                    src={heroImage1Url}
                                    alt="5G Telecom Network Tower"
                                    className="w-full h-64 sm:h-80 lg:h-[500px] xl:h-[600px] object-cover rounded-3xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section id="capabilities" className="py-12 sm:py-16 lg:py-24 px-6 sm:px-8 lg:px-12 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-10 sm:mb-12 lg:mb-20">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            <Network className="w-4 h-4" />
                            Our Capabilities
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-4     leading-snug sm:leading-tight">
                            Our Telecom Capabilities
                        </h2>
                    </div>

                    {/* Capabilities Grid */}
                    <div className="space-y-6 sm:space-y-8">
                        {capabilities.map((capability, index) => {
                            const Icon = capability.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">

                                        {/* Icon + Title */}
                                        <div className="flex items-start gap-4 sm:gap-5 lg:gap-6 w-full lg:w-1/3 shrink-0">
                                            {/* ✅ Fixed size container */}
                                            <div
                                                className={`min-w-[48px] min-h-[48px] sm:min-w-[56px] sm:min-h-[56px] lg:min-w-[64px] lg:min-h-[64px] bg-linear-to-br ${capability.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-snug sm:leading-tight">
                                                {capability.title}
                                            </h3>
                                        </div>

                                        {/* Points */}
                                        <div className="mt-4 lg:mt-0 flex-1 space-y-2.5 sm:space-y-3 lg:space-y-4">
                                            {capability.points.map((point, pointIndex) => (
                                                <div key={pointIndex} className="flex items-start gap-2 sm:gap-3">
                                                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-1">
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div
                                        className={`absolute inset-0 bg-linear-to-br ${capability.gradient} opacity-0 group-hover:opacity-5 rounded-2xl sm:rounded-3xl transition-opacity duration-300 pointer-events-none`}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Value Delivered Section */}
            <section id="value" className="py-16 lg:py-24 px-6 sm:px-8 lg:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Content Side */}
                        <div className="space-y-6 lg:space-y-8">
                            {/* Header */}
                            <div className="space-y-4 lg:space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 text-sm font-medium">
                                    <TrendingUp className="w-4 h-4" />
                                    Our Impact
                                </div>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Value Delivered to the
                                    <span className="text-red-600 block">Telecom Ecosystem</span>
                                </h2>
                            </div>

                            {/* Value Points */}
                            <div className="space-y-4 lg:space-y-6">
                                {valuePoints.map((value, index) => {
                                    const Icon = value.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="group flex items-start gap-4 p-4 lg:p-6 bg-gray-50 hover:bg-white rounded-xl lg:rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2 text-lg lg:text-xl">
                                                    {value.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                                    {value.description}
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
                                    src={heroImage2Url}
                                    alt="Telecom Network Infrastructure"
                                    className="w-full h-64 sm:h-80 lg:h-[400px] xl:h-[500px] object-cover rounded-2xl lg:rounded-3xl shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-linear-to-tr from-red-600/10 to-transparent rounded-2xl lg:rounded-3xl"></div>
                            </div>

                            {/* Background Decoration */}
                            <div className="absolute -z-10 top-4 right-4 lg:top-8 lg:right-8 w-48 h-48 lg:w-72 lg:h-72 bg-red-600/5 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Vision Section */}
            <section id="future" className="py-16 lg:py-24 px-6 sm:px-8 lg:px-12 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent)] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.05),transparent)] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative">
                    {/* Section Header */}
                    <div className="text-center mb-12 lg:mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-medium mb-6">
                            <Rocket className="w-4 h-4" />
                            Future Vision
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                            Looking Ahead:
                            <span className="text-red-400 block">Telecom 2030 and Beyond</span>
                        </h2>

                        <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto">
                            As the telecom sector enters the 5G-Advanced and 6G era, Cache Digitech is co-creating the future with OEMs, ISVs, and network partners to:
                        </p>
                    </div>

                    {/* Future Vision Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {futureVision.map((vision, index) => {
                            const Icon = vision.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white/5 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/10 hover:border-red-400/30 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2"
                                >
                                    {/* Icon Container */}
                                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-linear-to-br from-red-500 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3 lg:space-y-4">
                                        <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 leading-tight">
                                            {vision.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                            {vision.description}
                                        </p>
                                    </div>

                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg-linear-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-10 rounded-2xl lg:rounded-3xl transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA */}

                </div>
            </section>
        </div>
    );
}