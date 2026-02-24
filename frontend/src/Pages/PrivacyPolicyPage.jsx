import React, { useState, useEffect } from 'react';
import { Shield, Database, Eye, Users, Lock, CheckCircle, ArrowUp } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: Shield,
      content: (
        <>
          <p>
            Cache Digitech Pvt. Ltd is committed to protecting the privacy of individuals and safeguarding personal data in accordance with the Digital Personal Data Protection Act, 2023. This Privacy Policy explains how we collect, use, store, disclose, and protect personal data when you:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Visit our website <a href="https://www.cachedigitech.com" className="underline">www.cachedigitech.com</a>.</li>
            <li>Use our products or services.</li>
            <li>Engage with us as a client, vendor, employee, or business partner.</li>
          </ul>
        </>
      )
    },
    {
      id: 'definitions',
      title: '2. Definitions',
      icon: Database,
      content: (
        <>
          <ul className="list-disc list-inside mt-2">
            <li><strong>Personal Data:</strong> Any data about an individual who is identifiable by or in relation to such data.</li>
            <li><strong>Data Principal:</strong> The individual to whom the personal data relates.</li>
            <li><strong>Data Fiduciary:</strong> Cache Digitech, which determines the purpose and means of processing personal data.</li>
            <li><strong>Consent:</strong> Freely given, specific, informed, unconditional, and unambiguous indication of the Data Principal’s agreement.</li>
          </ul>
        </>
      )
    },
    {
      id: 'collect',
      title: '3. Personal Data We Collect',
      icon: Database,
      content: (
        <>
          <p>We may collect the following categories of personal data:</p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div>
              <h3 className="font-semibold">a. Identity and Contact Information</h3>
              <ul className="list-disc list-inside mt-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>Organization details</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">b. Technical Information</h3>
              <ul className="list-disc list-inside mt-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Log and usage data</li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h3 className="font-semibold">c. Business and Service Data</h3>
              <ul className="list-disc list-inside mt-1">
                <li>Client account details</li>
                <li>Communication records</li>
                <li>Support requests</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">d. Employment-Related Data (if applicable)</h3>
              <ul className="list-disc list-inside mt-1">
                <li>Resume/CV</li>
                <li>Identification documents</li>
                <li>Payroll and compliance data</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'purpose',
      title: '4. Purpose of Data Processing',
      icon: Eye,
      content: (
        <>
          <p>We process personal data for the following lawful purposes:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Providing and improving our IT services</li>
            <li>Client onboarding and contract management</li>
            <li>Customer support and communication</li>
            <li>Compliance with legal and regulatory obligations</li>
            <li>Security, fraud prevention, and system integrity</li>
            <li>Recruitment and human resource management</li>
          </ul>
        </>
      )
    },
    {
      id: 'consent',
      title: '5. Consent and Lawful Use',
      icon: CheckCircle,
      content: (
        <>
          <p>We collect and process personal data:</p>
          <ul className="list-disc list-inside mt-2">
            <li>With explicit consent of the Data Principal.</li>
            <li>For legitimate uses as permitted under the DPDP Act, such as contractual necessity, legal compliance, or employment purposes.</li>
          </ul>
        </>
      )
    },
    {
      id: 'sharing',
      title: '6. Data Sharing and Disclosure',
      icon: Users,
      content: (
        <>
          <p>We may share personal data with:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Authorized employees and contractors.</li>
            <li>Data processors and service providers (cloud hosting, analytics, payment processors).</li>
            <li>Government or regulatory authorities when required by law.</li>
            <li>Business partners with appropriate safeguards.</li>
          </ul>
          <p className="mt-2">All third parties are required to maintain confidentiality and security of personal data.</p>
        </>
      )
    },
    {
      id: 'cross-border',
      title: '7. Cross-Border Data Transfer',
      icon: Users,
      content: (
        <>
          <p>Personal data may be transferred outside India only to countries permitted under applicable laws and subject to appropriate technical and organizational safeguards.</p>
        </>
      )
    },
    {
      id: 'security',
      title: '8. Data Security Measures',
      icon: Lock,
      content: (
        <>
          <p>We implement reasonable security safeguards to protect personal data, including:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Encryption and secure access controls</li>
            <li>Network and application security</li>
            <li>Periodic audits and risk assessments</li>
            <li>Employee training on data protection</li>
          </ul>
        </>
      )
    },
    {
      id: 'retention',
      title: '9. Data Retention',
      icon: Database,
      content: (
        <>
          <p>We retain personal data only for as long as necessary to fulfill the purposes stated in this policy or as required by applicable laws. Data is securely deleted or anonymized once no longer required.</p>
        </>
      )
    },
    {
      id: 'rights',
      title: '10. Rights of Data Principals',
      icon: CheckCircle,
      content: (
        <>
          <p>Under the DPDP Act, you have the right to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Access information about your personal data</li>
            <li>Request correction or erasure of personal data</li>
            <li>Withdraw consent</li>
            <li>Nominate another person to exercise rights in the event of death or incapacity</li>
          </ul>
        </>
      )
    },
    {
      id: 'contact',
      title: '11. Grievance Redressal and Contact Information',
      icon: Users,
      content: (
        <>
          <p>If you have any questions, requests, or complaints regarding this Privacy Policy or your personal data, please contact:</p>
          <div className="mt-2">
            <p><strong>Data Protection Officer (DPO):</strong></p>
            <p>Name: <strong>Sourabh Kumar Srivastava</strong></p>
            <p>Email: <a href="mailto:sourabh@cachedigitech.com" className="underline">sourabh@cachedigitech.com</a></p>
          </div>
        </>
      )
    },
    {
      id: 'changes',
      title: '12. Changes to This Privacy Policy',
      icon: Shield,
      content: (
        <>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on our website with an updated effective date.</p>
        </>
      )
    },
    {
      id: 'law',
      title: '13. Governing Law',
      icon: Shield,
      content: (
        <>
          <p>This Privacy Policy shall be governed by and construed in accordance with the laws of India, including the Digital Personal Data Protection Act, 2023.</p>
        </>
      )
    }
  ];

  return (
    <div className="bg-gray-50 px-6 py-8 sm:px-8 overflow-visible">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-6">
        <Shield className="mx-auto h-10 w-10 text-red-600 mb-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Privacy Policy</h1>
        <p className="text-sm text-gray-500">(In accordance with the Digital Personal Data Protection Act, 2023)</p>
        <p className="text-sm text-gray-500 mt-2">Effective Date: <strong>10-12-2025</strong> &nbsp; | &nbsp; Last Updated: <strong>26-12-2025</strong></p>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id} id={section.id}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-50 p-2 rounded">
                  <Icon className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <div className="text-gray-700 leading-relaxed prose max-w-none">{section.content}</div>
            </section>
          );
        })}

        <div className="pt-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Cache Digitech Pvt. Ltd.</p>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;
