import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const DEFAULT_INSIGHTS = {
  title: 'Featured Insights',
  subtitle: 'Excellence with Agility, Service with Heart.',
  ctaText: 'Get the latest Insights Delivered for free',
  bannerText: 'Get a Free Consultation Right now',
};

const InsightsSection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const cms = useContent('home', 'insights');
  const title = cms.title || DEFAULT_INSIGHTS.title;
  const subtitle = cms.subtitle || DEFAULT_INSIGHTS.subtitle;
  const ctaText = cms.ctaText || DEFAULT_INSIGHTS.ctaText;
  const bannerText = cms.bannerText || DEFAULT_INSIGHTS.bannerText;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || status !== 'idle') return;
    setStatus('subscribing');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('subscribed');
    setTimeout(() => { setEmail(''); setStatus('idle'); }, 3000);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Top consultation banner */}
      <div
        onClick={() => navigate('/contactus')}
        className="group py-5 bg-white text-center cursor-pointer hover:bg-gray-50 transition-colors duration-300"
      >
        <div className="flex items-center justify-center gap-3 text-gray-800">
          <span className="text-xl sm:text-3xl lg:text-4xl font-glacial font-bold">
            {bannerText}
          </span>
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 fill-black text-white group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Main insights section */}
      <div className="relative flex flex-col lg:flex-row min-h-[200px] sm:min-h-[250px] lg:min-h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Left-side text above subscribe box */}
        <div className="absolute left-6 sm:left-8 lg:left-12 top-8 sm:top-10 lg:top-12 z-20 flex flex-col gap-2 sm:gap-3 pointer-events-none">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-glacial font-bold text-white">
            Featured Insights
          </h2>
          <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-white/70 font-glacial leading-relaxed max-w-md">
            Excellence with Agility, Service with Heart.
          </p>
        </div>
        {/* Subscribe Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none h-full pt-4 md:pt-8">
          <div className="relative top-16 sm:top-20 md:top-28 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 rounded-2xl p-5 w-[95%] sm:w-[450px] md:w-[650px] lg:w-[850px] text-center shadow-xl pointer-events-auto" style={{ backgroundColor: '#fdf0f1' }}>
            <p className="text-gray-800 text-lg sm:text-2xl font-glacial font-bold flex items-center text-center h-full py-1 sm:py-0">
              {ctaText}
            </p>
            <form onSubmit={handleSubscribe} className="flex sm:flex-row gap-2 border border-gray-200 rounded-xl p-2 bg-white w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border-none rounded-lg min-w-0 outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== 'idle'}
              />
              <button
                type="submit"
                className="px-6 sm:px-10 py-2.5 text-white font-semibold rounded-xl transition-all duration-300 sm:w-auto mt-2 sm:mt-0 text-sm"
                disabled={status !== 'idle'}
                style={{
                  backgroundColor: status === 'subscribed' ? '#22c55e' : '#dc2626',
                  cursor: status !== 'idle' ? 'not-allowed' : 'pointer'
                }}
              >
                {status === 'subscribed' ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
