import React, { useState, useRef, useEffect, useMemo, useContext, useCallback } from 'react';
import ContentContext, { useContent } from '../../context/ContentContext';
import { useNavigate, Link } from 'react-router-dom';
import { useChatFocus } from '../../context/ChatFocusContext';
import { useChat } from '../../context/ChatContext';
import WhoWeAre from './Whoweare';
import DomeGallery from '../AboutPageComponent/DomeGallery';
import { CEOSection } from '../InsightComponent/ceo-section';
import AwardsSection from '../AboutPageComponent/ImageSlider';
import Certifications from '../AboutPageComponent/Certifications';
import { HARDCODED_HIGHLIGHTS } from '../../data/blogsAndHighlights';
import '../AboutPageComponent/DomeGallery.css';


const SERVICE_LINKS = [
  { name: 'Infrastructure', path: '/infrastructureservice' },
  { name: 'Cloud', path: '/cloudservices' },
  { name: 'Cybersecurity', path: '/cybersecurity' },
  { name: 'Networking', path: '/consultingservice' },
  { name: 'Data & AI', path: '/aianddataservice' },
];

const CASE_STUDIES = [
  'Telecom',
  'BFSI',
  'Automobile & Manufacturing',
  'Retail',
  'Healthcare & Hospitality',
  'Government & Public Sector',
  'IT & ITES',
];

/** Map display label to industry query param used by /case-studies */
const CASE_STUDY_INDUSTRY_PARAM = {
  'Telecom': 'Telecom',
  'BFSI': 'BFSI',
  'Automobile & Manufacturing': 'Automobile & Manufacturing',
  'Retail': 'Retail',
  'Healthcare & Hospitality': 'Healthcare & Hospitality',
  'Government & Public Sector': 'Governance',
  'IT & ITES': 'IT & ITES',
};

const DEFAULT_HERO = {
  tagline: 'Operational Excellence',
  heading: '',
  subheading: 'Precision engineering meets adaptive AI. Scale your cloud infrastructure with zero friction through our intelligent interface.',
  stat1: '99.999%',
  stat2: '< 1ms',
  stat3: 'SOC2',
};

// Hero grid images — 4 columns × 3 images = 12 (online Unsplash; themed: cloud, cyber, AI, infra, data, team)
const HERO_GRID_IMAGES = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80&fm=jpg&fit=crop',
  'https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80&fm=jpg&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fm=jpg&fit=crop',
];




const INITIAL_MESSAGES = [
  { role: 'assistant', content: "System ready. I'm your Cache Digitech assistant. Ask me about our services, deployments, or how we can help you scale your infrastructure." },
];

const STAGGER_PER_WORD_MS = 80;
const WORD_FADE_DURATION_S = 0.5;

/** Normalize CMS/Quill heading HTML so line breaks and formatting display correctly on the frontend */
function normalizeHeadingForDisplay(html) {
  if (!html || typeof html !== 'string') return '';
  let out = html
    .replace(/\r\n|\n/g, '<br/>')
    .replace(/<\/p>\s*<p>/gi, '<br/>')
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '');
  return out.trim();
}

/** Splits heading HTML into word segments and line breaks for word-by-word animation.
 *  HTML-aware: never splits inside tags or attributes (e.g. style="font-family: Montserrat;"). */
function parseHeadingIntoWords(html) {
  if (!html || typeof html !== 'string') return [];
  const normalized = normalizeHeadingForDisplay(html);

  // Tokenize into tags and text runs
  const tokens = [];
  const tagRe = /<br\s*\/?>|<[^>]+>/gi;
  let last = 0;
  let m;
  while ((m = tagRe.exec(normalized)) !== null) {
    if (m.index > last) tokens.push({ type: 'text', value: normalized.slice(last, m.index) });
    if (/^<br\s*\/?>$/i.test(m[0])) tokens.push({ type: 'br' });
    else tokens.push({ type: 'tag', value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < normalized.length) tokens.push({ type: 'text', value: normalized.slice(last) });

  // Build result: split text tokens on whitespace into words, keep tags attached to next/prev word
  const result = [];
  let openTags = ''; // accumulates opening tags to prepend to next word

  for (const tok of tokens) {
    if (tok.type === 'br') {
      result.push({ type: 'br' });
    } else if (tok.type === 'tag') {
      if (tok.value.startsWith('</')) {
        // Closing tag: append to last word segment
        if (result.length > 0 && result[result.length - 1].type === 'word') {
          result[result.length - 1].html += tok.value;
        } else {
          openTags += tok.value;
        }
      } else {
        // Opening tag: buffer to prepend to next word
        openTags += tok.value;
      }
    } else {
      // Text: split into words
      const words = tok.value.split(/(\s+)/);
      for (const w of words) {
        if (!w) continue;
        if (/^\s+$/.test(w)) continue; // skip pure whitespace
        result.push({ type: 'word', html: openTags + w });
        openTags = '';
      }
    }
  }
  // Close any remaining open tags on last word
  if (openTags && result.length > 0 && result[result.length - 1].type === 'word') {
    result[result.length - 1].html += openTags;
  }

  return result;
}

const TYPEWRITER_WORDS = [
  'THRIVE', 'Grow', 'Scale', 'Lead', 'Win', 'Excel', 'Dominate',
  'Evolve', 'Succeed', 'Perform', 'Transform', 'Prosper',
];

// Lenis-style lerp (same as Lenis scrollTo) for smooth typewriter
const LENIS_LERP = 0.12;

function TypewriterWords({ className = '', style = {} }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayCharCount, setDisplayCharCount] = useState(0);
  const smoothCharRef = useRef(0);
  const targetCharRef = useRef(0);
  const lastRoundedRef = useRef(0);
  const rafRef = useRef(null);

  const word = TYPEWRITER_WORDS[wordIndex];
  targetCharRef.current = charIndex;

  // Target advances on a timer (unchanged logic)
  useEffect(() => {
    const typeMs = 80;
    const deleteMs = 50;
    const pauseEndMs = 2000;

    let delay = typeMs;
    if (!isDeleting && charIndex === word.length) delay = pauseEndMs;
    else if (!isDeleting) delay = typeMs;
    else if (charIndex > 0) delay = deleteMs;
    else delay = typeMs;

    const t = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < word.length) setCharIndex((c) => c + 1);
        else setIsDeleting(true);
      } else {
        if (charIndex > 0) setCharIndex((c) => c - 1);
        else {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % TYPEWRITER_WORDS.length);
        }
      }
    }, delay);

    return () => clearTimeout(t);
  }, [wordIndex, charIndex, isDeleting, word.length]);

  // Reset smooth display when word changes
  useEffect(() => {
    smoothCharRef.current = 0;
    lastRoundedRef.current = 0;
    setDisplayCharCount(0);
  }, [wordIndex]);

  // Lenis-style smooth animation: single RAF loop, lerp display toward target each frame
  useEffect(() => {
    const tick = () => {
      const current = smoothCharRef.current;
      const target = targetCharRef.current;
      const next = current + (target - current) * LENIS_LERP;
      smoothCharRef.current = next;
      const rounded = Math.round(next);
      if (rounded !== lastRoundedRef.current) {
        lastRoundedRef.current = rounded;
        setDisplayCharCount(rounded);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const displayText = word.slice(0, Math.min(displayCharCount, word.length));

  return (
    <span className={className} style={style}>
      {displayText.toUpperCase()}
      <span className="animate-pulse" style={{ opacity: 0.7 }} aria-hidden></span>
    </span>
  );
}

const HeroSection = () => {
  const navigate = useNavigate();
  const { content, loading: contentLoading } = useContext(ContentContext);
  const cms = useContent('home', 'hero');
  const heroLoaded = !contentLoading && content?.home?.hero != null;

  const tagline = heroLoaded ? (cms.tagline ?? '') : DEFAULT_HERO.tagline;
  const heading = heroLoaded ? (cms.heading != null ? cms.heading : '') : '';
  const subheading = heroLoaded ? (cms.subheading ?? '') : DEFAULT_HERO.subheading;
  const stat1 = heroLoaded ? (cms.stat1 ?? '') : DEFAULT_HERO.stat1;
  const stat2 = heroLoaded ? (cms.stat2 ?? '') : DEFAULT_HERO.stat2;
  const stat3 = heroLoaded ? (cms.stat3 ?? '') : DEFAULT_HERO.stat3;
  const headingFont = cms.headingFont ?? '';
  const headingFontSize = cms.headingFontSize ?? 'default';
  const headingAnimation = cms.headingAnimation ?? 'none';
  const headingAnimationDuration = parseFloat(cms.headingAnimationDuration) || 0.8;
  const headingAnimationDelay = parseFloat(cms.headingAnimationDelay) || 0;

  const headingSizeClass = {
    small: 'text-5xl lg:text-6xl',
    medium: 'text-6xl lg:text-7xl',
    large: 'text-6xl lg:text-[72px]',
    xlarge: 'text-7xl lg:text-[84px]',
    default: 'text-6xl lg:text-[72px]',
  }[headingFontSize] || 'text-6xl lg:text-[72px]';

  const isWordByWordFade = headingAnimation === 'fadeIn';
  const normalizedHeading = useMemo(() => normalizeHeadingForDisplay(heading), [heading]);
  const headingSegments = useMemo(() => (isWordByWordFade ? parseHeadingIntoWords(heading) : []), [isWordByWordFade, heading]);

  const headingAnimClass = headingAnimation && headingAnimation !== 'none' && !isWordByWordFade ? `hero-heading-anim-${headingAnimation}` : '';
  const headingStyle = {
    ...(headingFont ? { fontFamily: /[,"]/.test(headingFont) ? headingFont : `"${headingFont}", sans-serif` } : {}),
    ...(headingAnimClass ? {
      animationDuration: `${headingAnimationDuration}s`,
      animationDelay: `${headingAnimationDelay}s`,
      animationFillMode: 'both',
      animationTimingFunction: 'ease-out',
    } : {}),
  };

  // Chatbot UI CMS values
  const chatCms = useContent('home', 'chatbot');
  const cb = {
    heading: chatCms.chatHeading || 'Have tech questions?',
    heading2: chatCms.chatHeadingLine2 || 'Our AI answer engine can help.',
    placeholder: chatCms.chatPlaceholder || 'Please ask a question or initiate a search',
    bgFrom: chatCms.chatCardBgFrom || '#e6e0f4',
    bgMid: chatCms.chatCardBgMid || '#ddd4ef',
    bgTo: chatCms.chatCardBgTo || '#e2daf2',
    radius: parseInt(chatCms.chatCardRadius) || 28,
    height: parseInt(chatCms.chatCardHeight) || 580,
    maxWidth: parseInt(chatCms.chatCardMaxWidth) || 600,
    accentFrom: chatCms.chatAccentFrom || '#6366f1',
    accentTo: chatCms.chatAccentTo || '#a855f7',
    aiBubbleBg: chatCms.chatAiBubbleBg || 'rgba(255,255,255,0.8)',
    aiBubbleText: chatCms.chatAiBubbleText || '#1d1d1f',
    userBubbleText: chatCms.chatUserBubbleText || '#ffffff',
    headingSize: parseFloat(chatCms.chatHeadingFontSize) || 22,
    bodySize: parseFloat(chatCms.chatBodyFontSize) || 13.5,
  };

  const { messages, input, setInput, loading, chatError, hasAsked, sendMessage } = useChat();
  const { setChatFocused } = useChatFocus();
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Hero entrance: left text + right card slide in, then card tilts and gains color
  const [chatCardReveal, setChatCardReveal] = useState('entering'); // 'entering' | 'placed' | 'tilted'
  const [heroTextReveal, setHeroTextReveal] = useState('entering');  // 'entering' | 'placed'
  const slideStartDelay = 520;       // ms before both panels start moving
  const slideDurationMs = 1480;     // ms for slide-in (smooth deceleration)
  const pauseBeforeTilt = 340;      // ms hold when placed before card tilt
  useEffect(() => {
    const t1 = setTimeout(() => {
      setChatCardReveal('placed');
      setHeroTextReveal('placed');
    }, slideStartDelay);
    const t2 = setTimeout(() => setChatCardReveal('tilted'), slideStartDelay + slideDurationMs + pauseBeforeTilt);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Sync chatFocused with hasAsked
  useEffect(() => {
    setChatFocused(hasAsked);
    return () => setChatFocused(false);
  }, [hasAsked, setChatFocused]);

  // Dropdown state for "Choose your interest"
  const [capOpen, setCapOpen] = useState(false);
  const [csOpen, setCsOpen] = useState(false);
  const dropdownAreaRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownAreaRef.current && !dropdownAreaRef.current.contains(e.target)) {
        setCapOpen(false);
        setCsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleServiceClick = (path) => {
    setCapOpen(false);
    navigate(path);
  };

  const handleCsSelect = (study) => {
    setCsOpen(false);
    const industryParam = CASE_STUDY_INDUSTRY_PARAM[study] ?? study;
    navigate(`/case-studies?industry=${encodeURIComponent(industryParam)}`);
  };

  const scrollToBottom = () => {
    const el = messagesEndRef.current;
    if (!el) return;
    const container = el.parentElement;
    if (container) container.scrollTop = container.scrollHeight;
  };
  useEffect(() => scrollToBottom(), [messages]);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Hero — mobile: centered text + background only; desktop: left text + card grid */}
      <section
        className="relative min-h-screen min-h-[100dvh] bg-[#0a0a0b] flex flex-col lg:flex-row overflow-hidden"
        aria-label="Hero"
      >
        {/* Full-screen background image + gradient (responsive) */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-no-repeat bg-center"
            style={{
              backgroundImage: 'url(/girl-hand.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/92 to-[#0a0a0b]/60"
            aria-hidden
          />
        </div>

        {/* Text + CTAs: centered on mobile, left-aligned on desktop */}
        <div className="relative z-20 flex-1 flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-14 xl:px-24 py-20 sm:py-24 lg:py-28 min-w-0 w-full">
          <div className="w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left space-y-6 sm:space-y-7 lg:space-y-9">
            <div className="min-h-48 lg:min-h-64 flex flex-col justify-center items-center lg:items-stretch">
              <h1
                className={`apple-hero-text ${headingSizeClass} font-normal leading-[1.08] tracking-tight text-white text-center lg:text-left w-full`}
                style={{ ...headingStyle, textShadow: '0 2px 24px rgba(0,0,0,0.6), 0 4px 32px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.2)' }}
              >
                <span className="hero-heading-anim-fadeIn block" style={{ animationDelay: '0.1s', animationDuration: '0.6s', animationFillMode: 'both', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  We <strong>BUILD</strong>
                </span>
                <span className="hero-heading-anim-fadeIn block" style={{ animationDelay: '0.18s', animationDuration: '0.6s', animationFillMode: 'both', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  Industries
                </span>
                <span className="hero-heading-anim-fadeIn block" style={{ animationDelay: '0.26s', animationDuration: '0.6s', animationFillMode: 'both', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  that
                </span>
                <span className="hero-heading-anim-fadeIn block min-h-[1.15em] w-full flex justify-center lg:justify-start" style={{ animationDelay: '0.34s', animationDuration: '0.6s', animationFillMode: 'both', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <strong className="inline-block min-w-[11ch]">
                    <TypewriterWords />
                  </strong>
                </span>
              </h1>
            </div>
            <p className="hero-text-fadein text-sm sm:text-base lg:text-lg text-white/95 font-light max-w-2xl leading-[1.6] sm:leading-[1.65] -mt-2 sm:-mt-3" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)' }}>
              {subheading}
            </p>
            <div className="hero-text-fadein-delay flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                onClick={() => navigate('/contactus')}
                className="inline-flex items-center gap-2 bg-white text-[#0a0a0b] text-[15px] font-semibold px-7 py-3.5 rounded-full hover:bg-red-500 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Get Started
                <span className="text-[17px] leading-none" aria-hidden>&rarr;</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/40 text-white text-[15px] font-semibold px-7 py-3.5 rounded-full hover:bg-red-500 hover:border-red-500 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Card grid: hidden on mobile; visible from lg up */}
        <div className="absolute inset-0 z-10 hidden lg:flex overflow-hidden pointer-events-none">
          <style>{`
            @keyframes hero-col-scroll-down {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(0, -50%, 0); }
            }
            @keyframes hero-col-scroll-up {
              0% { transform: translate3d(0, -50%, 0); }
              100% { transform: translate3d(0, 0, 0); }
            }
            @keyframes hero-cols-fadein {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            .hero-col-down {
              animation: hero-col-scroll-down 22s linear infinite;
              will-change: transform;
              backface-visibility: hidden;
            }
            .hero-col-up {
              animation: hero-col-scroll-up 22s linear infinite;
              will-change: transform;
              backface-visibility: hidden;
            }
            .hero-cols-enter { animation: hero-cols-fadein 1.2s ease-out forwards; }
            @keyframes hero-text-fadein {
              0% { opacity: 0; transform: translateY(8px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .hero-text-fadein { animation: hero-text-fadein 0.7s ease-out 0.5s both; }
            .hero-text-fadein-delay { animation: hero-text-fadein 0.7s ease-out 0.7s both; }
            .hero-cols-fade-left-to-right {
              mask-image: linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.5) 48%, rgba(0,0,0,0.8) 55%, black 62%, black 100%);
              -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.5) 48%, rgba(0,0,0,0.8) 55%, black 62%, black 100%);
              mask-size: 100% 100%;
              -webkit-mask-size: 100% 100%;
            }
          `}</style>
          <div className="flex gap-2 sm:gap-3 lg:gap-4 w-full h-full hero-cols-enter hero-cols-fade-left-to-right">
            {[0, 1, 2, 3].map((colIndex) => {
              const start = colIndex * 3;
              const colImages = HERO_GRID_IMAGES.slice(start, start + 3);
              const isDown = colIndex % 2 === 0;
              return (
                <div
                  key={colIndex}
                  className="flex-1 flex flex-col overflow-hidden min-w-0 h-full"
                >
                  <div className={`flex flex-col gap-2 sm:gap-3 lg:gap-4 shrink-0 ${isDown ? 'hero-col-down' : 'hero-col-up'}`}>
                    {[...colImages, ...colImages].map((src, i) => (
                      <div
                        key={`${colIndex}-${i}`}
                        className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] bg-gray-900/40 shrink-0 w-full aspect-3/4 min-h-[120px] shadow-lg"
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect fill="%231f2937" width="600" height="800"/></svg>');
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI ROI Stats Banner */}
      <section
        className="ai-roi-banner relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #0a0a0b 0%, #1a0a0c 20%, #7f1d1d 40%, #b91c1c 50%,  #ff4747 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'1440\' height=\'120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 60 Q360 0 720 60 T1440 60 V120 H0Z\' fill=\'%23ffffff\'/%3E%3C/svg%3E")', backgroundSize: '100% 100%' }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6 flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-6">
          {/* Title block */}
          <div className="flex flex-col gap-2 lg:gap-3 shrink-0">
            <h3 className="text-white text-lg sm:text-xl font-bold leading-tight max-w-sm">
              AI that drives real outcomes
            </h3>
            <a
              href="/about"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white text-[#0a0a0b] text-xs font-semibold px-4 py-2 shadow-md hover:bg-red-500 hover:text-white hover:shadow-lg transition-all duration-200"
            >
              Learn how we deliver
              <span className="text-sm leading-none" aria-hidden>→</span>
            </a>
          </div>

          {/* Stats grid — card style */}
          <div className="flex-1 hidden sm:grid grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">50%</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">faster deployment with cloud and infrastructure solutions</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">30%</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">faster incident resolution with 24/7 NOC and intelligent operations</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">35%</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">reduction in infrastructure and cloud spend with optimized solutions</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">90%</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">faster threat detection with cybersecurity and compliance automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI search intro — heading + input, then answers below (hidden, not removed) */}
      <section className="relative overflow-hidden bg-[#fafafa] hidden" aria-hidden="true">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 lg:py-8 relative flex flex-col items-center">
          <div className={`main-search-intro flex flex-col items-center justify-center gap-5 w-full max-w-2xl mx-auto ${hasAsked ? 'main-search-intro-hide-search' : ''}`}>
            <p className="text-xl lg:text-2xl font-bold text-center text-purple-700">
              {cb.heading} {cb.heading2}
            </p>

            {/* Answers between heading and chat box when user has asked */}
            {hasAsked && (
              <div className="w-full space-y-4 max-h-[320px] overflow-y-auto scrollbar-hide">
                {chatError && <div className="text-[13px] text-red-600 bg-red-50/80 p-3 rounded-xl">{chatError}</div>}
                {messages.map((msg, i) =>
                  msg.role === 'assistant' ? (
                    <div key={i} className="flex gap-3">
                      <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }}>
                        <span className="material-symbols-outlined text-white text-[14px]">auto_awesome</span>
                      </div>
                      <div className="flex-1 p-4 rounded-xl shadow-sm whitespace-pre-wrap text-[14px] bg-white/90 border border-slate-100" style={{ color: cb.aiBubbleText }}>
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[85%] p-4 rounded-xl shadow-sm text-[14px] text-white" style={{ background: `linear-gradient(to right, ${cb.accentFrom}, ${cb.accentTo})` }}>
                        {msg.content}
                      </div>
                    </div>
                  )
                )}
                {loading && (
                  <div className="flex gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }}>
                      <span className="material-symbols-outlined text-white text-[14px]">auto_awesome</span>
                    </div>
                    <div className="text-[13px] text-slate-500 italic py-2">Thinking…</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            <div className="w-full flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative flex items-center flex-1 bg-white rounded-lg border border-slate-200 shadow-sm px-4 py-3 focus-within:outline-none focus-within:ring-0">
                <span className="material-symbols-outlined text-[20px] mr-2 shrink-0 text-slate-400" style={{ color: cb.accentFrom }}>search</span>
                <input
                  ref={chatInputRef}
                  className="w-full border-none bg-transparent focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 text-[14px] text-(--apple-black) placeholder:text-slate-400"
                  placeholder={cb.placeholder}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="shrink-0 px-5 py-3 rounded-lg font-semibold text-[14px] text-white bg-purple-700 hover:bg-purple-800 transition-colors disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Interest */}
      <section className="bg-linear-to-b from-white to-gray-50/80 pt-6 pb-14 px-6 sm:px-8 lg:px-12 overflow-visible relative">
        <div className="max-w-[900px] mx-auto" ref={dropdownAreaRef}>
          {/* Section header */}
          <div className="text-center mb-8">
            <p className="text-4xl font-extrabold tracking-[0.25em] uppercase text-red-500 mb-2">Explore</p>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mx-auto">
              Choose your interest
            </h2>
          </div>

          {/* Two cards side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Capabilities card */}
            <div className="relative">
              <button
                onClick={() => { setCapOpen(!capOpen); setCsOpen(false); }}
                className={`group flex items-center justify-between w-full bg-white rounded-2xl px-6 py-5 text-(--apple-black) font-semibold shadow-sm border transition-all duration-200 ease-out text-left ${capOpen ? 'border-red-400 shadow-md ring-1 ring-red-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500">
                    <span className="material-symbols-outlined text-[20px]">category</span>
                  </span>
                  <span>Capabilities</span>
                </span>
                <span className={`material-symbols-outlined text-gray-400 text-xl transition-transform duration-300 ease-out ${capOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>expand_more</span>
              </button>
              {capOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-[fadeSlideDown_0.2s_ease-out]">
                  <div className="bg-gray-50/70">
                    {SERVICE_LINKS.map((svc, idx) => (
                      <button
                        key={svc.name}
                        onClick={() => handleServiceClick(svc.path)}
                        className={`w-full text-left pl-12 pr-5 py-2.5 text-gray-500 hover:text-white hover:bg-red-500 transition-colors text-[13px] font-medium ${idx !== 0 ? 'border-t border-gray-100/80' : ''}`}
                      >
                        {svc.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Case Studies card */}
            <div className="relative">
              <button
                onClick={() => { setCsOpen(!csOpen); setCapOpen(false); }}
                className={`group flex items-center justify-between w-full bg-white rounded-2xl px-6 py-5 text-(--apple-black) font-semibold shadow-sm border transition-all duration-200 ease-out text-left ${csOpen ? 'border-red-400 shadow-md ring-1 ring-red-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </span>
                  <span>Case Studies</span>
                </span>
                <span className={`material-symbols-outlined text-gray-400 text-xl transition-transform duration-300 ease-out ${csOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>expand_more</span>
              </button>
              {csOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-[fadeSlideDown_0.2s_ease-out]">
                  {CASE_STUDIES.map((study, idx) => (
                    <button
                      key={study}
                      onClick={() => handleCsSelect(study)}
                      className={`w-full text-left px-5 py-3.5 text-(--apple-black) text-sm font-medium hover:bg-red-500 hover:text-white transition-colors ${idx !== CASE_STUDIES.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      {study}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Solutions Showcase */}
      <SolutionsShowcaseSection />

      {/* Leadership Vision / Founder's Message */}
      <CEOSection />

      {/* OEM Alliances Section */}
      <OEMAlliancesSection />
      {/* Premium Partners */}
      <PremiumPartnersSection />
      <LatestHighlightsSection />
      <WhoWeAre />
      <InnovationsSection />
      <AwardsSection />
      <Certifications sectionOnly />
    </>
  );
};

/* ───────── Innovations (home strip) ───────── */
const INNOVATIONS_HERO_IMAGE = '/images/innovations-meeting.webp';

function InnovationsSection() {
  return (
    <section
      id="innovations"
      className="relative overflow-hidden pt-16 lg:pt-24 pb-8 lg:pb-10"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-100/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src={INNOVATIONS_HERO_IMAGE}
              alt="Innovation at Cache Digitech"
              className="w-full h-full object-cover aspect-4/3"
              loading="lazy"
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-lg md:text-xl font-extrabold tracking-[0.3em] uppercase text-red-500 mb-3">
              Innovation at Cache
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mb-6">
              Where ideas meet impact
            </h2>
            <p className="text-(--apple-gray) text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              From research and emerging tech to accelerators and partnerships—we help you turn vision into outcomes. Explore how we innovate.
            </p>
            <Link
              to="/innovations"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-full transition-colors duration-300 ease-out shadow-md hover:shadow-lg group"
            >
              Explore Innovations
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 ease-out group-hover:translate-x-0.5">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Solutions Showcase Section ───────── */
const SOLUTIONS_CARDS = [
  {
    icon: 'psychology',
    title: 'Data & AI',
    description: 'Unlock value with AI and GenAI—automate processes, gain insights, and accelerate outcomes across your business.',
    path: '/aianddataservice',
  },
  {
    icon: 'cloud',
    title: 'Cloud',
    description: 'Cloud solutions that optimize cost, performance, and scale so you can innovate faster and operate with confidence.',
    path: '/cloudservices',
  },
  {
    icon: 'engineering',
    title: 'Infrastructure & Engineering',
    description: 'Product development and engineering services that shorten time-to-market and maximize return on innovation.',
    path: '/infrastructureservice',
  },
  {
    icon: 'shield',
    title: 'Cybersecurity',
    description: 'Protect your digital assets with security and compliance solutions built for today’s threat landscape.',
    path: '/cybersecurity',
  },
];

function SolutionsShowcaseSection() {
  const [visible, setVisible] = useState(false);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  const [isHoveringHeading, setIsHoveringHeading] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      setGradientPos({ x, y });
    };
    const onLeave = () => {
      setIsHoveringHeading(false);
      setGradientPos({ x: 50, y: 50 });
    };
    const onEnter = () => setIsHoveringHeading(true);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseenter', onEnter);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 lg:pt-16 pb-8 lg:pb-10 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}
    >
      {/* Ambient blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-100/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Heading + paragraph ── */}
          <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.08] mb-6">
              <span
                ref={headingRef}
                className="gradient-text-fill inline-block cursor-default transition-[background] duration-150 select-none bg-clip-text text-transparent"
                style={{
                  background: isHoveringHeading
                    ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #b91c1c 0%, #991b1b 5%, #1a1a1a 20%, #0a0a0b 100%)`
                    : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0b 100%)',
                }}
              >
                Scale with confidence: Built on partnership & proven technology
              </span>
            </h2>
            <p className="text-(--apple-gray) text-lg leading-relaxed max-w-lg">
              From cloud and cybersecurity to data and AI, we deliver solutions that fit your goals. We work alongside you to modernize, secure, and accelerate—so you can focus on what matters most.
            </p>
          </div>

          {/* ── Right: Solution cards (2 per row on mobile, 1 col on lg) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {SOLUTIONS_CARDS.map((card, i) => (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                className={`group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-4 sm:px-6 sm:py-5 border border-white/60 shadow-sm hover:shadow-lg hover:bg-white hover:border-red-100 transition-all duration-300 ease-out cursor-pointer ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-out text-red-600 mb-1 sm:mb-0">
                  <span className="material-symbols-outlined text-[24px] sm:text-[28px]" aria-hidden>{card.icon}</span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-(--apple-black) text-[13px] sm:text-[15px] font-bold mb-1 group-hover:text-red-600 transition-colors duration-200 leading-snug line-clamp-2">
                    {card.title}
                  </h4>
                  <p className="text-(--apple-gray) text-[12px] sm:text-[13px] leading-relaxed line-clamp-3 sm:line-clamp-2">
                    {card.description}
                  </p>
                </div>

                {/* Arrow */}
                <span className="shrink-0 w-9 h-9 rounded-full bg-gray-100 group-hover:bg-red-500 flex items-center justify-center transition-all duration-300 ease-out">
                  <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 ease-out">
                    arrow_forward
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── OEM Alliances Section (with category for globe popup) ───────── */
const OEM_PARTNERS = [
  { name: 'Dell', logo: '/community/dell.webp', level: 'Titanium' },
  { name: 'Cisco', logo: '/Partners/cisco.webp', level: 'Premier' },
  { name: 'Microsoft', logo: '/community/microsoft.webp', level: 'CSP' },
  { name: 'Amazon AWS', logo: '/community/awslogo.webp', level: 'Select' },
  { name: 'Red Hat', logo: '/community/redhat.webp', level: 'Enrolled' },
  { name: 'IBM', logo: '/community/ibmlogo.webp', level: 'Silver' },
  { name: 'Google Cloud', logo: '/community/gcp2.webp', level: 'Partner' },
  { name: 'Palo Alto', logo: '/community/paloalto.webp', level: 'Registered, Innovator' },
  { name: 'Fortinet', logo: '/community/fortinet.webp', level: 'Advance, MSSP' },
  { name: 'Oracle', logo: '/community/oracle.webp', level: 'OPN Member' },
  { name: 'VMware', logo: '/Partners/vmvare.webp', level: 'Partner' },
  { name: 'SentinelOne', logo: '/Partners/sentinalone.webp', level: 'Partner' },
  { name: 'HPE', logo: '/community/hpelogo.webp', level: 'Gold' },
  { name: 'Juniper Networks', logo: '/community/junipernetwork.webp', level: 'Authorised' },
  { name: 'Trellix', logo: '/Partners/trellix.webp', level: 'Gold' },
  { name: 'Tenable', logo: '/Partners/tenable.webp', level: 'Enrolled' },
  { name: 'CloudSek', logo: '/community/cloudsek.webp', level: 'Registered' },
  { name: 'Zscaler', logo: '/Partners/zscaler.webp', level: 'Enrolled' },
  { name: 'NetApp', logo: '/Partners/netapp.webp', level: 'Approved, Preferred' },
  { name: 'Nutanix', logo: '/Partners/nutanix.webp', level: 'Enrolled' },
  { name: 'SAP', logo: '/community/saplogo.webp', level: 'Partner' },
  { name: 'Salesforce', logo: '/community/salesforce.webp', level: 'Partner' },
  { name: 'Trend Micro', logo: '/Partners/trendmicro.webp', level: 'Registered' },
  { name: 'Veeam', logo: '/Partners/veeam.webp', level: 'Registered & SP' },
];

const PARTNER_CARD_WIDTH = 96;   // w-24
const PARTNER_GAP = 16;          // gap-4

function OEMAlliancesSection() {
  const partnerSetWidth = OEM_PARTNERS.length * PARTNER_CARD_WIDTH + (OEM_PARTNERS.length - 1) * PARTNER_GAP;
  const partnerTrackWidth = partnerSetWidth * 2;

  return (
    <section
      id="partners"
      className="relative overflow-hidden pt-12 md:pt-16 pb-6 md:pb-8 px-6 sm:px-8 lg:px-12"
      style={{ background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 50%, #fafbfc 100%)' }}
    >
      {/* Ambient decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Header + link (above dome on mobile) */}
          <div className="order-1 lg:order-1 text-center lg:text-left">
            <p className="text-4xl font-extrabold tracking-[0.25em] uppercase text-red-500 mb-3">Our Alliances & Partners</p>
            <p className="mt-3 text-(--apple-gray) text-base max-w-xl lg:max-w-none mx-auto">
              We partner with the world's most innovative technology companies to deliver best-in-class solutions.
            </p>
            <div className="mt-8 lg:mt-10">
              <a
                href="/about/alliances"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors group"
              >
                View all partners
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Right: Mobile = continuous R→L marquee (seamless like Insights); Desktop = dome gallery */}
          <div className="order-2 lg:order-2 w-full">
            {/* Mobile: one set width in px, animate by -setWidth for seamless loop */}
            <div className="lg:hidden overflow-hidden py-1">
              <style>{`
                @keyframes partners-marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-${partnerSetWidth}px); }
                }
              `}</style>
              <div
                className="flex items-center will-change-transform"
                style={{
                  width: partnerTrackWidth,
                  gap: PARTNER_GAP,
                  animation: `partners-marquee 28s linear infinite`,
                }}
              >
                {[...OEM_PARTNERS, ...OEM_PARTNERS].map((p, i) => (
                  <div key={`${p.name}-${i}`} className="shrink-0 w-24 h-16 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                    <img src={p.logo} alt={p.name} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop: dome gallery */}
            <div className="hidden lg:block rounded-2xl overflow-hidden bg-transparent" style={{ height: 'min(75vh, 580px)' }}>
              <DomeGallery
                images={OEM_PARTNERS.map((p) => ({ src: p.logo, alt: p.name, label: p.level }))}
                fit={0.62}
                fitBasis="height"
                minRadius={320}
                maxRadius={440}
                maxVerticalRotationDeg={0}
                segments={18}
                dragDampening={2}
                grayscale={false}
                overlayBlurColor="#f1f5f9"
                imageBorderRadius="12px"
                openedImageBorderRadius="24px"
                openedImageWidth="280px"
                openedImageHeight="200px"
                tileInset={7}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Premium Partners (logo + tier) ───────── */
const PREMIUM_PARTNERS = [
  { name: 'Dell', tier: 'Titanium', logo: '/community/dell.webp' },
  { name: 'Cisco', tier: 'Premier', logo: '/Partners/cisco.webp' },
  { name: 'Microsoft', tier: 'CSP', logo: '/community/microsoft.webp' },
  { name: 'HP', tier: 'Gold', logo: '/community/hpelogo.webp' },
  { name: 'IBM', tier: 'Silver', logo: '/community/ibmlogo.webp' },
  { name: 'Trellix', tier: 'Gold', logo: '/Partners/trellix.webp' },
  { name: 'GCP', tier: 'Service Partner', logo: '/community/gcp2.webp' },
  { name: 'AWS', tier: 'Select', logo: '/community/awslogo.webp' },
];

function PremiumPartnersSection() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-16 px-6 sm:px-8 lg:px-12"
      style={{ background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 30%, #f1f5f9 100%)' }}
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-red-100/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-red-50/15 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-10 md:mb-12">
          <p className="text-2xl sm:text-3xl font-extrabold tracking-[0.2em] uppercase text-red-500 mb-2">Partnership</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-(--apple-black) tracking-tight">
            Our Premium Partners
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-red-500/60 rounded-full mx-auto" aria-hidden />
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {PREMIUM_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100/60 p-3 sm:p-4 transition-all duration-300"
            >
              <div className="w-full aspect-square max-w-[64px] max-h-[64px] flex items-center justify-center mb-2">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-(--apple-black) font-semibold text-xs sm:text-sm">{partner.name}</p>
              <p className="text-[10px] sm:text-xs text-red-600 font-medium mt-0.5">{partner.tier}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Latest Highlights: hardcoded data — auto-scroll right to left ───────── */
function LatestHighlightsSection() {
  const [viewWidth, setViewWidth] = useState(1200);
  const [cardHovered, setCardHovered] = useState(false);
  const panels = HARDCODED_HIGHLIGHTS;

  useEffect(() => {
    const updateSize = () => setViewWidth(window.innerWidth);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const gap = 20;
  const cardWidth = Math.min(520, Math.max(260, viewWidth * 0.38));
  const cardHeight = cardWidth / 1.5;
  const setWidth = panels.length * cardWidth + (panels.length - 1) * gap;
  const trackWidth = setWidth * 2;
  const doublePanels = panels.length > 0 ? [...panels, ...panels] : [];

  const renderCardContent = (panel, isMobile) => (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${panel.image}')` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
      <div className={`absolute inset-0 flex flex-col justify-end text-left text-white ${isMobile ? 'p-4' : 'p-6 sm:p-8'}`}>
        <span className="text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider">
          {panel.tag}
        </span>
        <h3 className={`mt-1.5 sm:mt-2 font-semibold leading-tight line-clamp-2 ${isMobile ? 'text-base' : 'text-xl sm:text-2xl'}`}>
          {panel.title}
        </h3>
        {panel.description && (
          <p className={`mt-1.5 sm:mt-2 text-white/90 line-clamp-2 ${isMobile ? 'text-xs max-w-full' : 'text-sm max-w-md'}`}>
            {panel.description}
          </p>
        )}
        <p className={`mt-2 sm:mt-3 text-white/70 uppercase tracking-wider ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
          {panel.type}
        </p>
      </div>
    </>
  );

  return (
    <section id="gallery-section" className="relative bg-white py-16 overflow-hidden">
      <style>{`
        @keyframes highlights-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${setWidth}px); }
        }
        .highlights-marquee-paused { animation-play-state: paused !important; }
      `}</style>
      <div className="flex flex-col overflow-hidden">
        {/* Section header */}
        <div className="shrink-0 flex flex-col items-center text-center mb-8">
          <p className="text-4xl font-extrabold tracking-[0.25em] uppercase text-red-500 mb-2">
            Insights
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-(--apple-black) tracking-tight leading-[1.08] max-w-2xl mx-auto">
            Latest Highlights
          </h2>
        </div>

        {/* Mobile: vertical stack of cards */}
        <div className="md:hidden flex flex-col gap-4 px-2 sm:px-0">
          {panels.map((panel, i) => {
            const cardClass = 'group relative w-full overflow-hidden rounded-xl shadow-lg aspect-[3/2]';
            const link = (panel.link || '').trim();
            if (link) {
              const isExternal = link.startsWith('http');
              const cardContent = renderCardContent(panel, true);
              if (isExternal) {
                return (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={`${cardClass} block cursor-pointer`}>
                    {cardContent}
                  </a>
                );
              }
              return (
                <Link key={i} to={link} className={`${cardClass} block cursor-pointer`}>
                  {cardContent}
                </Link>
              );
            }
            return (
              <article key={i} className={cardClass}>
                {renderCardContent(panel, true)}
              </article>
            );
          })}
        </div>

        {/* Desktop: auto-scrolling cards right to left — pause when any card is hovered */}
        <div className="hidden md:flex items-center overflow-hidden min-h-[200px]">
          <div
            className={`flex items-center will-change-transform ${cardHovered ? 'highlights-marquee-paused' : ''}`}
            style={{
              width: trackWidth,
              gap,
              animation: doublePanels.length > 0 ? `highlights-marquee ${22 + panels.length * 2}s linear infinite` : 'none',
            }}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
          >
            {doublePanels.map((panel, i) => {
              const cardClass = 'group relative shrink-0 overflow-hidden rounded-lg shadow-lg';
              const cardStyle = { width: cardWidth, height: cardHeight };
              const link = (panel.link || '').trim();
              if (link) {
                const isExternal = link.startsWith('http');
                const cardContent = renderCardContent(panel, false);
                if (isExternal) {
                  return (
                    <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={`${cardClass} block cursor-pointer`} style={cardStyle}>
                      {cardContent}
                    </a>
                  );
                }
                return (
                  <Link key={i} to={link} className={`${cardClass} block cursor-pointer`} style={cardStyle}>
                    {cardContent}
                  </Link>
                );
              }
              return (
                <article key={i} className={cardClass} style={cardStyle}>
                  {renderCardContent(panel, false)}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
export { LatestHighlightsSection };
