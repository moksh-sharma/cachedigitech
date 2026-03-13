import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Search, Users, FileText, Shield, Server,
    Monitor, Database, Settings, Eye,
    Globe, BarChart, Target, Zap,
    Building, DollarSign, TrendingUp,
    Activity, Wifi, ArrowRight
} from 'lucide-react';
import { usePlacement } from '../context/PlacementsContext';

const ManagedServicesPage = () => {
    const [animatedText, setAnimatedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const location = useLocation();
    const heroImageUrl = usePlacement('manageservices', 'main', 'heroImage') || '/servicesimages/managedservices.webp';

    useEffect(() => {
        // Check if there's a hash in the URL for section navigation
        if (location.hash) {
            const sectionId = location.hash.substring(1);
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0); // scroll to top when page loads
        }
    }, [location]);

    // Hero section animated texts
    const heroTexts = [
        'Comprehensive Managed Services for Your Business',
        'Expert Support and Infrastructure Management',
        'Your Trusted Partner in Operational Excellence'
    ];

    useEffect(() => {
        const currentText = heroTexts[textIndex];
        let charIndex = 0;

        const typeWriter = setInterval(() => {
            if (charIndex < currentText.length) {
                setAnimatedText(currentText.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeWriter);
                setTimeout(() => {
                    setTextIndex((prev) => (prev + 1) % heroTexts.length);
                    setAnimatedText('');
                }, 3000);
            }
        }, 100);

        return () => clearInterval(typeWriter);
    }, [textIndex]);

    const services = [
        {
            id: 'audit',
            label: 'Audit',
            icon: Search,
            title: 'What We Audit & Assess',
            subtitle: 'Comprehensive IT auditing, compliance assessment, and infrastructure evaluation services',
            description: 'Our comprehensive IT audit services provide thorough assessment of your technology infrastructure, security posture, and compliance status. We conduct detailed evaluations of systems, processes, and controls to identify vulnerabilities, ensure regulatory compliance, and optimize operational efficiency. Our expert auditors deliver actionable recommendations to enhance your IT governance and risk management.',
            keyFeatures: [
                { icon: Search, title: 'Infrastructure Audit', desc: 'Complete assessment of IT infrastructure and systems' },
                { icon: Shield, title: 'Security Assessment', desc: 'Comprehensive security posture evaluation and testing' },
                { icon: FileText, title: 'Compliance Review', desc: 'Regulatory compliance assessment and documentation' },
                { icon: BarChart, title: 'Risk Analysis', desc: 'Detailed risk assessment and mitigation planning' }
            ]
        },
        {
            id: 'manpower',
            label: 'Manpower',
            icon: Users,
            title: 'What We Staff & Support',
            subtitle: 'Expert IT professionals and dedicated support teams for comprehensive technology operations',
            description: 'Our managed manpower services provide access to highly skilled IT professionals and dedicated support teams to augment your internal capabilities. We offer flexible staffing solutions including dedicated resources, project-based teams, and specialized expertise across various technology domains. Our professionals integrate seamlessly with your existing teams to deliver exceptional results.',
            keyFeatures: [
                { icon: Users, title: 'Dedicated Teams', desc: 'Skilled professionals dedicated to your projects' },
                { icon: Target, title: 'Specialized Expertise', desc: 'Domain experts in various technology areas' },
                { icon: Settings, title: 'Flexible Engagement', desc: 'Scalable team size based on project requirements' },
                { icon: TrendingUp, title: 'Continuous Support', desc: 'Ongoing professional development and training' }
            ]
        },
        {
            id: 'contract',
            label: 'Contract',
            icon: FileText,
            title: 'What We Negotiate & Manage',
            subtitle: 'Strategic contract management, vendor relations, and procurement optimization services',
            description: 'Our contract management services provide comprehensive support for IT vendor relationships, contract negotiations, and ongoing contract administration. We help optimize vendor agreements, ensure compliance with contractual terms, manage service level agreements, and provide strategic guidance for technology procurement and vendor management to maximize value and minimize risk.',
            keyFeatures: [
                { icon: FileText, title: 'Contract Negotiation', desc: 'Expert negotiation of vendor contracts and agreements' },
                { icon: BarChart, title: 'SLA Management', desc: 'Service level agreement monitoring and enforcement' },
                { icon: DollarSign, title: 'Cost Optimization', desc: 'Contract cost analysis and optimization strategies' },
                { icon: Building, title: 'Vendor Relations', desc: 'Strategic vendor relationship management' }
            ]
        },
        {
            id: 'noc-soc',
            label: 'NOC/SOC',
            icon: Shield,
            title: 'What We Monitor & Protect',
            subtitle: 'Network operations, security monitoring, and comprehensive incident response services',
            description: 'Our NOC/SOC services provide round-the-clock monitoring, management, and protection of your IT infrastructure and security posture. We combine network operations center capabilities with security operations center expertise to deliver comprehensive monitoring, threat detection, incident response, and proactive maintenance to ensure optimal performance and security of your technology environment.',
            keyFeatures: [
                { icon: Monitor, title: 'Monitoring', desc: 'Continuous network and security monitoring services' },
                { icon: Eye, title: 'Threat Detection', desc: 'Advanced threat detection and security analysis' },
                { icon: Zap, title: 'Incident Response', desc: 'Rapid incident response and resolution services' },
                { icon: Activity, title: 'Performance Management', desc: 'Proactive performance monitoring and optimization' }
            ]
        },
        {
            id: 'remote-infra',
            label: 'Remote Infra',
            icon: Server,
            title: 'What We Manage Remotely',
            subtitle: 'Comprehensive remote infrastructure management, cloud operations, and system administration',
            description: 'Our remote infrastructure management services provide comprehensive oversight and administration of your IT infrastructure from our centralized operations centers. We manage servers, networks, storage systems, cloud environments, and applications remotely to ensure optimal performance, security, and availability while reducing the need for on-site technical resources.',
            keyFeatures: [
                { icon: Server, title: 'Server Management', desc: 'Complete remote server administration and maintenance' },
                { icon: Globe, title: 'Cloud Management', desc: 'Multi-cloud platform management and optimization' },
                { icon: Database, title: 'Storage Management', desc: 'Remote storage system monitoring and administration' },
                { icon: Wifi, title: 'Network Management', desc: 'Remote network configuration and performance optimization' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                id="hero"
                className="relative bg-cover bg-center h-[80vh] scroll-mt-0 pt-20 sm:pt-24"
                style={{ backgroundImage: `url('${heroImageUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/60" aria-hidden />
                <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col justify-center h-full">
                    <div className="mb-8">
                        <Settings className="w-20 h-20 mx-auto mb-6 text-white" aria-hidden />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-6 text-white tracking-tight">
                        Managed Services
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed">
                        Comprehensive managed services delivering expert support, infrastructure management, and operational excellence for your business
                    </p>
                    <div className="h-8 mb-8" aria-live="polite">
                        <p className="text-lg text-white">
                            {animatedText}<span className="animate-pulse" aria-hidden>|</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Service Sections */}
            <div className="py-16">
                {services.map((service, index) => (
                    <section key={service.id} id={service.id} className="py-16 lg:py-24 px-6 sm:px-8 lg:px-12 scroll-mt-20">
                        <div className="max-w-6xl mx-auto">
                            {/* Service Header */}
                            <div className="text-center mb-16">
                                <div className="mb-6">
                                    {React.createElement(service.icon, { className: "w-16 h-16 text-red-600 mx-auto mb-4" })}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                    {service.title}
                                </h2>
                                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                    {service.subtitle}
                                </p>
                            </div>

                            {/* Content Section */}
                            <div className="mb-16">
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto text-center">
                                    {service.description}
                                </p>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {service.keyFeatures.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="text-center p-6 bg-gray-50 rounded-lg">
                                            {React.createElement(feature.icon, { className: "w-12 h-12 text-red-600 mx-auto mb-4" })}
                                            <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                                            <p className="text-sm text-gray-600">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Separator */}
                            {index < services.length - 1 && (
                                <div className="border-t border-gray-200 pt-16 mt-16">
                                    <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" aria-hidden />
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>

            {/* Call to Action */}
            <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-12 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to Transform Your Operations?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                        Partner with Cache for audit, manpower, contract management, NOC/SOC, and remote infrastructure services. Let's build a managed services model that scales with your business.
                    </p>
                    <Link
                        to="/contactus"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                    >
                        Get in touch
                        <ArrowRight className="w-4 h-4" aria-hidden />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ManagedServicesPage;