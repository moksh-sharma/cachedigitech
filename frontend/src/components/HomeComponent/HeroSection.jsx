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
import '../AboutPageComponent/DomeGallery.css';


const SERVICE_LINKS = [
  { name: 'Infrastructure', path: '/infrastructureservice' },
  { name: 'Cloud', path: '/cloudservices' },
  { name: 'Cybersecurity', path: '/cybersecurity' },
  { name: 'Networking', path: '/consultingservice' },
  { name: 'Data & AI', path: '/aianddataservice' },
];

const CAPABILITIES = [
  { name: 'Audit & Consult', icon: '🔍', services: SERVICE_LINKS },
  { name: 'Design', icon: '🎨', services: SERVICE_LINKS },
  { name: 'Build', icon: '🔧', services: SERVICE_LINKS },
  { name: 'Operate & Manage', icon: '⚙️', services: SERVICE_LINKS },
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

const DEFAULT_HERO = {
  tagline: 'Operational Excellence',
  heading: '',
  subheading: 'Precision engineering meets adaptive AI. Scale your cloud infrastructure with zero friction through our intelligent interface.',
  stat1: '99.999%',
  stat2: '< 1ms',
  stat3: 'SOC2',
};



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
  const [expandedCap, setExpandedCap] = useState(null); // which capability's subtopics are shown
  const [csOpen, setCsOpen] = useState(false);
  const dropdownAreaRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownAreaRef.current && !dropdownAreaRef.current.contains(e.target)) {
        setCapOpen(false);
        setExpandedCap(null);
        setCsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCapClick = (cap) => {
    setExpandedCap(expandedCap === cap.name ? null : cap.name);
  };

  const handleServiceClick = (path) => {
    setCapOpen(false);
    setExpandedCap(null);
    navigate(path);
  };

  const handleCsSelect = (study) => {
    setCsOpen(false);
    navigate(`/insights?activeStudy=${encodeURIComponent(study)}#success-stories`);
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
      <main className="hero-section relative min-h-screen w-full overflow-x-hidden overflow-y-visible">

        {/* Background — same as Profile hero: video + overlay + red orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <video
            src="/videos/aboutpage.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
        </div>
        <div className="absolute inset-0 overflow-hidden z-1 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px]" />
        </div>

        {/* Hero content — centered in viewport, below fixed navbar */}
        <div className="absolute top-[72px] left-0 right-0 bottom-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl">
            <div
              className="hero-text space-y-6 lg:space-y-8"
              style={{
                transform: heroTextReveal === 'entering' ? 'translateY(12px)' : 'translateY(0)',
                opacity: heroTextReveal === 'entering' ? 0.94 : 1,
                transition: 'transform 1.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease-out',
              }}
            >
              <div className="min-h-48 lg:min-h-64 flex flex-col justify-center">
                <h1
                  className={`apple-hero-text ${headingSizeClass} font-normal leading-[1.05] tracking-tight text-white`}
                  style={{ ...headingStyle, textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)' }}
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
                  <span className="hero-heading-anim-fadeIn block" style={{ animationDelay: '0.34s', animationDuration: '0.6s', animationFillMode: 'both', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <strong className="inline-block min-w-[9ch]">
                      <TypewriterWords />
                    </strong>
                  </span>
                </h1>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-white/95 font-light max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                {subheading}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => navigate('/contactus')}
                  className="inline-flex items-center gap-2 bg-white text-(--apple-black) text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <span className="text-[16px]">&rarr;</span>
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/80 text-white text-[14px] font-semibold px-6 py-3 rounded-full transition-all hover:bg-white/20 hover:border-white shadow-lg hover:shadow-xl"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI ROI Stats Banner */}
      <section
        className="ai-roi-banner relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #020617 0%, #0b1220 18%, #1d2a5b 40%, #3b5fe0 65%, #1e3a8a 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'1440\' height=\'120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 60 Q360 0 720 60 T1440 60 V120 H0Z\' fill=\'%23ffffff\'/%3E%3C/svg%3E")', backgroundSize: '100% 100%' }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6 flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-6">
          {/* Title block */}
          <div className="flex flex-col gap-2 lg:gap-3 shrink-0">
            <span className="inline-flex w-fit items-center rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/95">
              Impact in numbers
            </span>
            <h3 className="text-white text-lg sm:text-xl font-bold leading-tight max-w-sm">
              AI that drives real outcomes
            </h3>
            <a
              href="/about"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white text-[#1e3a8a] text-xs font-semibold px-4 py-2 shadow-md hover:bg-white/95 hover:shadow-lg transition-all duration-200"
            >
              Learn how we deliver
              <span className="text-sm leading-none" aria-hidden>→</span>
            </a>
          </div>

          {/* Stats grid — card style */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">45%</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">faster application delivery with AI-augmented development</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">20%</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">faster incident resolution with intelligent IT operations</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">~$100M</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">in savings potential with AI-powered clinical and operational insights</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 transition-colors hover:bg-white/15">
              <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-white">87%</p>
              <p className="text-white/90 text-[12px] leading-snug mt-1.5">faster compliance and surveillance investigations with intelligent automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI search intro — heading + input, then answers below */}
      <section className="relative overflow-hidden bg-[#fafafa]">
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
      <section className="bg-linear-to-b from-white to-gray-50/80 py-14 px-6 sm:px-8 lg:px-12 overflow-visible relative">
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
                onClick={() => { setCapOpen(!capOpen); setExpandedCap(null); setCsOpen(false); }}
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
                  {CAPABILITIES.map((cap, idx) => (
                    <div key={cap.name}>
                      <button
                        onClick={() => handleCapClick(cap)}
                        className={`w-full text-left px-5 py-3.5 transition-colors flex items-center justify-between ${idx !== CAPABILITIES.length - 1 ? 'border-b border-gray-100' : ''} ${expandedCap === cap.name ? 'bg-red-50/60' : 'hover:bg-gray-50'}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-base">{cap.icon}</span>
                          <span className="font-medium text-sm text-(--apple-black)">{cap.name}</span>
                        </span>
                        <span className={`material-symbols-outlined text-gray-400 text-base transition-transform duration-200 ease-out ${expandedCap === cap.name ? 'rotate-180' : ''}`}>expand_more</span>
                      </button>
                      {expandedCap === cap.name && (
                        <div className="bg-gray-50/70">
                          {cap.services.map((svc) => (
                            <button
                              key={svc.name}
                              onClick={() => handleServiceClick(svc.path)}
                              className="w-full text-left pl-12 pr-5 py-2.5 text-gray-500 hover:text-white hover:bg-red-500 transition-colors text-[13px] font-medium border-t border-gray-100/80"
                            >
                              {svc.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
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
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-500">
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
const INNOVATIONS_HERO_IMAGE = '/images/innovations-meeting.png';

function InnovationsSection() {
  return (
    <section
      id="innovations"
      className="relative overflow-hidden py-16 lg:py-24"
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
      className="relative pt-24 lg:pt-32 pb-16 lg:pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}
    >
      {/* Ambient blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-100/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Heading + paragraph ── */}
          <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-(--apple-black) tracking-tight leading-[1.08] mb-6">
              Scale with confidence:{' '}
              <span
                ref={headingRef}
                className="gradient-text-fill inline-block cursor-default transition-[background] duration-150 select-none bg-clip-text text-transparent"
                style={{
                  background: isHoveringHeading
                    ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #dc2626 0%, #b91c1c 5%, #7c3aed 20%, #5b21b6 100%)`
                    : 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                }}
              >
                Built on partnership & proven technology
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
  { name: 'Dell', logo: '/community/dell.png', level: 'Titanium' },
  { name: 'Cisco', logo: '/Partners/cisco.png', level: 'Premier' },
  { name: 'Microsoft', logo: '/community/microsoft.jpg', level: 'CSP' },
  { name: 'Amazon AWS', logo: '/community/awslogo.png', level: 'Select' },
  { name: 'Red Hat', logo: '/community/redhat.jpg', level: 'Enrolled' },
  { name: 'IBM', logo: '/community/ibmlogo.png', level: 'Silver' },
  { name: 'Google Cloud', logo: '/community/gcp2.jpg', level: 'Partner' },
  { name: 'Palo Alto', logo: '/community/paloalto.jpg', level: 'Registered, Innovator' },
  { name: 'Fortinet', logo: '/community/fortinet.jpg', level: 'Advance, MSSP' },
  { name: 'Oracle', logo: '/community/oracle.png', level: 'OPN Member' },
  { name: 'VMware', logo: '/Partners/vmvare.png', level: 'Partner' },
  { name: 'SentinelOne', logo: '/Partners/sentinalone.png', level: 'Partner' },
  { name: 'HPE', logo: '/community/hpelogo.png', level: 'Gold' },
  { name: 'Juniper Networks', logo: '/community/junipernetwork.png', level: 'Authorised' },
  { name: 'Trellix', logo: '/Partners/trellix.png', level: 'Gold' },
  { name: 'Tenable', logo: '/Partners/tenable.png', level: 'Enrolled' },
  { name: 'CloudSek', logo: '/community/cloudsek.jpg', level: 'Registered' },
  { name: 'Zscaler', logo: '/Partners/zscaler.png', level: 'Enrolled' },
  { name: 'NetApp', logo: '/Partners/netapp.png', level: 'Approved, Preferred' },
  { name: 'Nutanix', logo: '/Partners/nutanix.png', level: 'Enrolled' },
  { name: 'SAP', logo: '/community/saplogo.jpeg', level: 'Partner' },
  { name: 'Salesforce', logo: '/community/salesforce.png', level: 'Partner' },
  { name: 'Trend Micro', logo: '/Partners/trendmicro.png', level: 'Registered' },
  { name: 'Veeam', logo: '/Partners/veeam.png', level: 'Registered & SP' },
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
  { name: 'Dell', tier: 'Titanium', logo: '/community/dell.png' },
  { name: 'Cisco', tier: 'Premier', logo: '/Partners/cisco.png' },
  { name: 'Microsoft', tier: 'CSP', logo: '/community/microsoft.jpg' },
  { name: 'HP', tier: 'Gold', logo: '/community/hpelogo.png' },
  { name: 'IBM', tier: 'Silver', logo: '/community/ibmlogo.png' },
  { name: 'Trellix', tier: 'Gold', logo: '/Partners/trellix.png' },
  { name: 'GCP', tier: 'Service Partner', logo: '/community/gcp2.jpg' },
  { name: 'AWS', tier: 'Select', logo: '/community/awslogo.png' },
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {PREMIUM_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-100/60 p-5 sm:p-6 transition-all duration-300"
            >
              <div className="w-full aspect-square max-w-[100px] max-h-[100px] flex items-center justify-center mb-3">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-(--apple-black) font-semibold text-sm sm:text-base">{partner.name}</p>
              <p className="text-xs sm:text-sm text-red-600 font-medium mt-1">{partner.tier}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Latest Highlights: data from database only — auto-scroll right to left ───────── */
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env.VITE_API_BASE || '') : '';

function LatestHighlightsSection() {
  const [viewWidth, setViewWidth] = useState(1200);
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch(API_BASE + '/api/highlights', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled) setPanels(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setPanels([]);
      });
    return () => { cancelled = true; };
  }, []);

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
              return (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={`${cardClass} block cursor-pointer`}>
                  {renderCardContent(panel, true)}
                </a>
              );
            }
            return (
              <article key={i} className={cardClass}>
                {renderCardContent(panel, true)}
              </article>
            );
          })}
        </div>

        {/* Desktop: auto-scrolling cards right to left */}
        <div className="hidden md:flex items-center overflow-hidden min-h-[200px]">
          <div
            className="flex items-center will-change-transform"
            style={{
              width: trackWidth,
              gap,
              animation: doublePanels.length > 0 ? `highlights-marquee ${22 + panels.length * 2}s linear infinite` : 'none',
            }}
          >
            {doublePanels.map((panel, i) => {
              const cardClass = 'group relative shrink-0 overflow-hidden rounded-lg shadow-lg';
              const cardStyle = { width: cardWidth, height: cardHeight };
              const link = (panel.link || '').trim();
              if (link) {
                return (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={`${cardClass} block cursor-pointer`} style={cardStyle}>
                    {renderCardContent(panel, false)}
                  </a>
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
