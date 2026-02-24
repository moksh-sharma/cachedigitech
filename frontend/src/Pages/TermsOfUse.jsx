import React, { useState, useEffect } from 'react';
import { 
  FileText, Shield, Users, Building, CheckCircle, Target, Eye, Star, MapPin, Lock, AlertTriangle, ArrowUp, Calendar, Award 
} from 'lucide-react';

const TermsOfUsePage = () => {
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
      id: 'about',
      title: 'About Cache DigTech',
      icon: Building,
      content: (
        <>
          <p>
            With 34+ years of experience as a leading system integration company in India, Cache DigiTech specializes in Technology Integration, Digital Transformation, Infrastructure, and IT Consulting Solutions.
          </p>
          
        </>
      )
    },
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: (
        <>
          <p>
            By accessing and using Cache DigTech's services or platforms, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and all applicable laws.
          </p>
          
        </>
      )
    },
    {
      id: 'user-obligations',
      title: 'User Obligations',
      icon: Users,
      content: (
        <>
          <p>By using our services, you agree to the following obligations and responsibilities:</p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Permitted Use</h3>
              {[
                'Use services for legitimate business purposes',
                'Comply with applicable laws and regulations',
                'Maintain confidentiality of access credentials',
                'Provide accurate and complete information'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Prohibited Activities</h3>
              {[
                'Unauthorized access to systems or data',
                'Interference with service operations',
                'Violation of intellectual property rights',
                'Use for illegal or harmful activities'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Shield,
      content: (
        <>
          <p>
            All intellectual property rights in our services, including software, documentation, trademarks, and methodologies, remain the exclusive property of Cache DigTech or its licensors.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Intellectual Property Includes</h3>
            <ul className="grid md:grid-cols-3 gap-2 list-disc list-inside text-gray-700 text-sm">
              {[
                'Proprietary software solutions',
                'Technical documentation',
                'Training materials',
                'System architectures',
                'Best practice methodologies',
                'Brand assets and trademarks'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <Lock className="h-3 w-3 text-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <FileText className="mx-auto h-12 w-12 text-red-600 mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-gray-600">Cache Digitech Technology Solutions.</p>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-12">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id} id={section.id}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-50 p-2 rounded">
                  <Icon className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <div className="text-gray-700 leading-relaxed prose max-w-none">{section.content}</div>
            </section>
          );
        })}
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default TermsOfUsePage;
