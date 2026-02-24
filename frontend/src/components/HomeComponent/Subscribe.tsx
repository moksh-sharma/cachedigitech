import React from 'react';
import { ArrowRight, Mail, MessageCircle, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { usePlacement } from '../../context/PlacementsContext';

interface CTASectionProps {
  className?: string;
}

const DEFAULT_CTA = {
  heading: 'Get the latest insights and updates delivered to your inbox.',
  ctaText: 'Subscribe Now',
  questionHeading: 'Have a question tailored to your use case? Our experts are here to help.',
  askCtaText: 'Ask Here',
};

const CTASection: React.FC<CTASectionProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const cms = useContent('home', 'cta');
  const subscribeBgUrl = usePlacement('home', 'cta', 'subscribeBg') || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
  const industryImageUrl = usePlacement('home', 'cta', 'industryImage') || '/techimage.jpg';
  const heading = cms.heading || DEFAULT_CTA.heading;
  const ctaText = cms.ctaText || DEFAULT_CTA.ctaText;
  const questionHeading = cms.questionHeading || DEFAULT_CTA.questionHeading;
  const askCtaText = cms.askCtaText || DEFAULT_CTA.askCtaText;

  const handleContactNavigation = () => {
    navigate('/contactus');
  };

  const cards = [
    {
      label: 'Newsletter',
      title: 'Insights & updates',
      description: heading,
      cta: ctaText,
      icon: Mail,
      variant: 'image' as const,
      imageUrl: subscribeBgUrl,
    },
    {
      label: 'Support',
      title: 'Ask our experts',
      description: questionHeading,
      cta: askCtaText,
      icon: MessageCircle,
      variant: 'solid' as const,
    },
    {
      label: 'Industries',
      title: 'Industry solutions',
      description: 'Solutions and offerings tailored to your industry.',
      cta: 'Get a Quote',
      icon: Building2,
      variant: 'image' as const,
      imageUrl: industryImageUrl,
    },
  ];

  return (
    <section className={`w-full py-20 lg:py-28 px-6 lg:px-8 bg-white border-t border-gray-100/80 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-red-500 mb-3">Stay connected</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-[var(--apple-black)] tracking-tight leading-[1.1] max-w-2xl mx-auto">
            Get in touch, stay informed
          </h2>
          <p className="mt-4 text-[var(--apple-gray)] text-base sm:text-lg max-w-xl mx-auto">
            Subscribe for updates, reach our team, or explore industry-specific solutions.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.label}
              onClick={handleContactNavigation}
              className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 cursor-pointer flex flex-col min-h-[280px]"
            >
              {/* Card with optional image background */}
              {card.variant === 'image' && card.imageUrl ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${card.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white opacity-90" />
              )}

              <div className="relative z-10 p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-red-500/20 text-red-600 mb-4 group-hover:bg-red-500/30 transition-colors duration-300">
                    <card.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <p className={`text-sm font-bold tracking-[0.2em] uppercase mb-2 ${card.variant === 'image' ? 'text-white' : 'text-red-500'}`}>
                    {card.label}
                  </p>
                  <h3 className={`text-lg sm:text-xl font-semibold tracking-tight mb-2 ${card.variant === 'image' ? 'text-white' : 'text-[var(--apple-black)]'}`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm leading-relaxed line-clamp-3 ${card.variant === 'image' ? 'text-white/90' : 'text-[var(--apple-gray)]'}`}>
                    {card.description}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContactNavigation();
                  }}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition-all duration-300 w-fit ${
                    card.variant === 'image'
                      ? 'bg-white text-red-600 hover:bg-red-50 border border-white/30'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
