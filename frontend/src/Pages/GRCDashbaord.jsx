import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileCheck, AlertTriangle, Lock, CheckCircle, Globe, Server, ArrowRight } from 'lucide-react';
import { usePlacement } from '../context/PlacementsContext';

export default function GRCDashboard() {
  const heroImageUrl = usePlacement('grc-dashboard', 'main', 'heroImage') || '/servicesimages/GRC.webp';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Compliance Management",
      icon: Shield,
      items: [
        {
          column: [
            "ISO 27001 ISMS",
            "ISO 22301 BCMS",
            "ISO 27701 PIMS",
            "PCI DSS",
            "Cyber Essentials"
          ]
        },
        {
          column: [
            "National Institute of Standards and Technology (NIST)",
            "Health Information Trust Alliance (HITRUST)",
            "Digital Operational Resilience Act (DORA)"
          ]
        },
        {
          column: [
            "Control Objectives for Information and Related Technologies (COBIT)",
            "Center for Internet Security (CIS)",
            "SOX (Applications & ITGC)"
          ]
        }
      ]
    },
    {
      title: "Information System Audit & Assurance",
      icon: FileCheck,
      items: [
        {
          column: [
            "RBI",
            "Payment & Settlement Systems (PSS)",
            "Co-Operative Banks",
            "Prepaid Payment Instruments PPI",
            "Central Electricity Authority"
          ]
        },
        {
          column: [
            "IRDA ISNP",
            "SEBI",
            "NPCI",
            "Aadhaar",
            "P2P Lending",
            "NBFC"
          ]
        },
        {
          column: [
            "GST Suvidha Provider",
            "Security Standards (ISO, NIST, CIS & Others)",
            "UIDAI Aadhaar",
            "eSign ASP",
            "Others"
          ]
        }
      ]
    },
    {
      title: "IT Risk Management",
      icon: AlertTriangle,
      items: [
        {
          column: [
            "SSAE 18-SOC1/2/3",
            "ISAE 3402",
            "Third Party Security Risk Management",
            "IT Risk Management"
          ]
        },
        // {
        //   column: [
        //     "SSAE 18-SOC1/2/3",
        //     "ISAE 3402",
        //     "Third Party Security Risk Management",
        //     "IT Risk Management"
        //   ]
        // },
        {
          column: [
            "IT in Merger & Acquisition",
            "Governance Framework",
            "Strategy and Implementation"
          ]
        }
      ]
    },
    {
      title: "Data Protection & Privacy",
      icon: Lock,
      items: [
        {
          column: [
            "General Data Protection Regulation (GDPR)",
            "California Consumer Privacy Act (CCPA)",
            "Digital Personal Data PDPD, F23,SG Protection ACT (DPDPA)"
          ]
        },
        {
          column: [
            "Brazilian General Data Protection Law (LGPD)",
            "Personal Information Protection and Electronic Documents Act (PIPEDA, Canada)"
          ]
        },
        {
          column: [
            "Singapore Personal Data Protection Act (PDPA)",
            "Health Insurance Portability and Accountability Act (HIPAA)"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen bg-cover bg-center scroll-mt-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${heroImageUrl})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
            <div className="mb-6">
              <Server className="w-16 h-16 mx-auto mb-4" aria-hidden />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4 tracking-tight">
              Governance, Risk & Compliance
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
              Unified compliance, audit, risk and privacy management
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            const sectionIds = ['compliance', 'audit', 'risk', 'privacy'];
            return (
              <section
                id={sectionIds[index]}
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100 hover:shadow-xl transition-shadow duration-300 scroll-mt-20"
              >
                <div className="bg-linear-to-r from-red-700 to-red-600 text-white px-6 py-4 flex items-center gap-3">
                  <IconComponent className="w-7 h-7" />
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-3">
                        {item.column.map((text, textIndex) => (
                          <div key={textIndex} className="flex items-start gap-3 group">
                            <div className="mt-1 shrink-0">
                              <CheckCircle className="w-5 h-5 text-red-600 group-hover:text-red-700 transition-colors" />
                            </div>
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <section className="mt-16 lg:mt-24 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white px-6 py-8 rounded-2xl shadow-lg border border-red-100">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-red-600" aria-hidden />
              <p className="text-gray-700 font-medium">Comprehensive GRC Solutions</p>
            </div>
            <Link
              to="/contactus"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}