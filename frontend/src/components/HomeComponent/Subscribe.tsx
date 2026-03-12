import React from 'react';
import { ArrowRight, Mail, MessageCircle, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

interface CTASectionProps {
  className?: string;
}

const DEFAULT_CTA = {
  heading: 'Get the latest insights and updates delivered to your inbox.',
  questionHeading: 'Have a question tailored to your use case? Our experts are here to help.',
};

const CTASection: React.FC<CTASectionProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const cms = useContent('home', 'cta');
  const heading = cms.heading || DEFAULT_CTA.heading;
  const questionHeading = cms.questionHeading || DEFAULT_CTA.questionHeading;

  const handleContactNavigation = () => {
    navigate('/contactus');
  };

  const items = [
    { icon: Mail, label: 'Newsletter', text: heading },
    { icon: MessageCircle, label: 'Ask our experts', text: questionHeading },
    { icon: Building2, label: 'Industry solutions', text: 'Solutions and offerings tailored to your industry.' },
  ];

  return (
    <section className={`w-full py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-white border-t border-gray-100/80 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-lg md:text-xl font-extrabold tracking-[0.3em] uppercase text-red-500 mb-3">Stay connected</p>
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mx-auto">
            Get in touch, stay informed
          </h2>
          <p className="mt-4 text-(--apple-gray) text-base sm:text-lg max-w-xl mx-auto">
            Subscribe for updates, reach our team, or explore industry-specific solutions.
          </p>
        </div>

        {/* Single combined CTA card */}
        <div
          onClick={handleContactNavigation}
          className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 ease-out cursor-pointer"
        >
          <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-slate-50/80" />
          <div className="relative z-10 p-8 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-8 lg:mb-10">
              {items.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row md:flex-col gap-3">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-red-500/20 text-red-600 group-hover:bg-red-500/30 transition-colors duration-300 ease-out shrink-0">
                    <item.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-[0.15em] uppercase text-red-500 mb-1">
                      {item.label}
                    </p>
                    <p className="text-(--apple-gray) text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleContactNavigation();
              }}
              className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-bold rounded-full px-6 py-3 hover:bg-red-500 transition-all duration-300 ease-out shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
