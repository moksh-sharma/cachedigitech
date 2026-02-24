import React, { useState, useRef, useEffect, useMemo, useContext, useCallback } from 'react';
import ContentContext, { useContent } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { useChatFocus } from '../../context/ChatFocusContext';
import { useChat } from '../../context/ChatContext';
import WhoWeAre from './Whoweare';
import DomeGallery from '../AboutPageComponent/DomeGallery';
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

function TypewriterWords({ className = '', style = {} }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const word = TYPEWRITER_WORDS[wordIndex];
  const displayText = word.slice(0, charIndex);

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

  return (
    <span className={className} style={style}>
      {displayText.toUpperCase()}
      <span className="animate-pulse" style={{ opacity: 0.7 }}></span>
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
    large: 'text-6xl lg:text-[84px]',
    xlarge: 'text-7xl lg:text-8xl',
    default: 'text-6xl lg:text-[84px]',
  }[headingFontSize] || 'text-6xl lg:text-[84px]';

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
      <main className="hero-section relative min-h-screen w-full pt-31 pb-10 px-6 overflow-x-hidden overflow-y-visible flex items-center bg-[#fafafa]">

        {/* Animated background — gradient orbs + subtle grid */}
        <div className="hero-animated-bg absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="hero-bg-orb hero-bg-orb-1" />
          <div className="hero-bg-orb hero-bg-orb-2" />
          <div className="hero-bg-orb hero-bg-orb-3" />
          <div className="hero-bg-grid" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-start mx-auto w-full max-w-100% px-20 lg:px-36">
          {/* Hero text — entrance from left (in sync with right card) */}
          <div
            className="hero-text lg:col-span-7 space-y-8"
            style={{
              transform: heroTextReveal === 'entering' ? 'translateX(calc(-100% - 24vw))' : 'translateX(0)',
              opacity: heroTextReveal === 'entering' ? 0.94 : 1,
              transition: 'transform 1.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease-out',
            }}
          >
            {/* Fixed-height slot so subheading/buttons never shift (exact height, not min-height) */}
            <div className="h-[7rem] lg:h-[10.5rem] shrink-0">
              {isWordByWordFade && headingSegments.length > 0 ? (
                <h1
                  className={`apple-hero-text ${headingSizeClass} font-normal leading-[1] tracking-tighter text-[var(--apple-black)]`}
                  style={headingStyle}
                >
                  {headingSegments.map((seg, i) => {
                    if (seg.type === 'br') return <br key={`br-${i}`} />;
                    const wordIndex = headingSegments.slice(0, i).filter((s) => s.type === 'word').length;
                    const delayS = (headingAnimationDelay * 1000 + wordIndex * STAGGER_PER_WORD_MS) / 1000;
                    const plainText = seg.html.replace(/<[^>]+>/g, '').trim();
                    const isThriveWord = plainText === 'THRIVE';
                    if (plainText === '.') return <React.Fragment key={`w-${i}`} />;

                    return (
                      <React.Fragment key={`w-${i}`}>
                        <span
                          className="hero-heading-anim-fadeIn inline"
                          style={{
                            animationDelay: `${delayS}s`,
                            animationDuration: `${WORD_FADE_DURATION_S}s`,
                            animationFillMode: 'both',
                            animationTimingFunction: 'ease-out',
                          }}
                        >
                          {isThriveWord ? (
                            <strong className="inline-block min-w-[9ch]" style={{ fontFamily: '"Source Code Pro"' }}>
                              <TypewriterWords />
                            </strong>
                          ) : (
                            <span dangerouslySetInnerHTML={{ __html: seg.html }} />
                          )}
                        </span>
                        {i < headingSegments.length - 1 && headingSegments[i + 1].type === 'word' ? ' ' : null}
                      </React.Fragment>
                    );
                  })}
                </h1>
              ) : (
                <h1
                  className={`apple-hero-text ${headingSizeClass} font-normal leading-[1] tracking-tighter text-[var(--apple-black)] ${headingAnimClass}`.trim()}
                  style={headingStyle}
                  dangerouslySetInnerHTML={{ __html: normalizedHeading }}
                />
              )}
            </div>
            <p className="text-xl lg:text-2xl text-[var(--apple-gray)] font-light max-w-lg leading-relaxed mt-[180px]">
              {subheading}
            </p>
            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/contactus')}
                className="inline-flex items-center gap-2 bg-[var(--apple-black)] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[var(--apple-black)]/90 transition-all"
              >
                Get Started
                <span className="text-[16px]">&rarr;</span>
              </button>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 bg-white border border-black/20 text-[var(--apple-black)] text-[14px] font-semibold px-6 py-3 rounded-full transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Chatbot card — 3D tilt: right side coming out of screen */}
          <div
            className={`hero-chatbot lg:col-span-5 relative flex justify-center lg:justify-end transition-all duration-500 overflow-visible min-w-0 ${hasAsked ? 'z-[50]' : ''}`}
            style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}
          >
            <div
              className="relative w-full flex justify-center lg:justify-end overflow-visible cursor-pointer"
              style={{ maxWidth: cb.maxWidth, transformStyle: 'preserve-3d' }}
              onClickCapture={() => chatInputRef.current?.focus()}
            >
              <div
                className="ai-chat-card w-full overflow-hidden flex flex-col relative z-10"
                style={{
                  maxWidth: `${cb.maxWidth}px`,
                  height: `${cb.height}px`,
                  borderRadius: `${cb.radius}px`,
                  background: `linear-gradient(145deg, ${cb.bgFrom} 0%, ${cb.bgMid} 50%, ${cb.bgTo} 100%)`,
                  transform: chatCardReveal === 'entering'
                    ? 'translateX(calc(100% + 24vw)) rotateY(0deg)'
                    : chatCardReveal === 'placed'
                      ? 'translateX(0) rotateY(0deg)'
                      : 'translateX(0) rotateY(-12deg)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  // Slide: smooth deceleration (match hero text); tilt+color: same ease for cohesion
                  transition: chatCardReveal === 'tilted'
                    ? 'transform 0.9s cubic-bezier(0.33, 1, 0.68, 1), filter 0.9s cubic-bezier(0.33, 1, 0.68, 1)'
                    : 'transform 1.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease-out, filter 0.5s ease-out',
                  opacity: chatCardReveal === 'entering' ? 0.97 : 1,
                  filter: chatCardReveal === 'tilted' ? 'none' : 'grayscale(1)',
                }}
              >
                {/* Heading area */}
                <div className={`flex-shrink-0 flex flex-col items-center justify-center text-center px-8 transition-all duration-300 ${hasAsked ? 'pt-6 pb-4' : 'pt-12 pb-6'}`}>
                  <h3
                    className="font-semibold text-[var(--apple-black)] leading-snug transition-all duration-300"
                    style={{ fontSize: hasAsked ? '18px' : `${cb.headingSize}px` }}
                  >
                    {cb.heading}
                    <br />
                    <span style={{ background: `linear-gradient(to right, ${cb.accentFrom}, ${cb.accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {cb.heading2}
                    </span>
                  </h3>
                </div>

                {/* Middle area: animation when idle, messages when chatting */}
                <div className="flex-1 min-h-0 flex flex-col">
                  {!hasAsked ? (
                    <div className="flex-1 flex items-center justify-center px-6">
                      <video autoPlay loop muted playsInline className="w-40 h-40 object-contain" src="/ai-logo-animation.webm" />
                    </div>
                  ) : (
                    <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-2 space-y-4 scrollbar-hide">
                      {chatError && <div className="text-[13px] text-red-600 bg-red-50/80 p-3 rounded-2xl">{chatError}</div>}
                      {messages.map((msg, i) =>
                        msg.role === 'assistant' ? (
                          <div key={i} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }}>
                              <span className="material-symbols-outlined text-white text-[14px]">auto_awesome</span>
                            </div>
                            <div className="flex-1">
                              <div
                                className="leading-relaxed p-4 rounded-2xl rounded-tl-md shadow-sm whitespace-pre-wrap"
                                style={{ fontSize: `${cb.bodySize}px`, background: cb.aiBubbleBg, color: cb.aiBubbleText }}
                              >
                                {msg.content}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div key={i} className="flex justify-end">
                            <div
                              className="leading-relaxed p-4 rounded-2xl rounded-tr-md max-w-[85%] shadow-sm"
                              style={{ fontSize: `${cb.bodySize}px`, color: cb.userBubbleText, background: `linear-gradient(to right, ${cb.accentFrom}, ${cb.accentTo})` }}
                            >
                              {msg.content}
                            </div>
                          </div>
                        )
                      )}
                      {loading && (
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }}>
                            <span className="material-symbols-outlined text-white text-[14px]">auto_awesome</span>
                          </div>
                          <div className="text-[13px] text-[var(--apple-gray)] italic px-2 py-3">Thinking…</div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Search-style input — always pinned to bottom */}
                <div className="flex-shrink-0 px-6 pb-6 pt-2">
                  <div className="relative flex items-center bg-white rounded-full border border-black/8 shadow-sm px-4 py-2.5 focus-within:shadow-md transition-all" style={{ '--tw-ring-color': cb.accentFrom }}>
                    <span className="material-symbols-outlined text-[20px] mr-3 flex-shrink-0" style={{ color: cb.accentFrom }}>language</span>
                    <input
                      ref={chatInputRef}
                      className="w-full border-none bg-transparent focus:ring-0 focus:outline-none text-[14px] text-[var(--apple-black)] placeholder:text-[var(--apple-gray)] placeholder:font-normal"
                      placeholder={cb.placeholder}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className="flex-shrink-0 ml-2 transition-colors disabled:opacity-40"
                      style={{ color: cb.accentFrom }}
                    >
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI ROI Stats Banner */}
      <section className="ai-roi-banner relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3b5fe0 0%, #5b7cf7 30%, #6e8dfa 50%, #5b7cf7 70%, #3b5fe0 100%)' }}>
        {/* Wavy overlay for depth */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'1440\' height=\'120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 60 Q360 0 720 60 T1440 60 V120 H0Z\' fill=\'%23ffffff\'/%3E%3C/svg%3E")', backgroundSize: '100% 100%' }} />

        <div className="max-w-[1300px] mx-auto px-8 py-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* Title + CTA */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 flex-shrink-0">
            <h3 className="text-white text-xl font-bold leading-tight whitespace-nowrap">AI that delivers ROI</h3>
          </div>

          {/* Stats grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="border-l-2 border-white/30 pl-5">
              <span className="text-white text-2xl font-extrabold">45%</span>
              <p className="text-white/85 text-[13px] leading-snug mt-1">reduction in app dev effort enabled by AI for a Financial services major</p>
            </div>
            <div className="border-l-2 border-white/30 pl-5">
              <span className="text-white text-2xl font-extrabold">20%</span>
              <p className="text-white/85 text-[13px] leading-snug mt-1">IT Ops MTTR reduction enabled by AI Ops for a Tools manufacturer</p>
            </div>
            <div className="border-l-2 border-white/30 pl-5">
              <span className="text-white text-2xl font-extrabold">~$100M</span>
              <p className="text-white/85 text-[13px] leading-snug mt-1">ops costs reduction expected through AI-powered Clinical Advisor for a Healthcare major</p>
            </div>
            <div className="border-l-2 border-white/30 pl-5">
              <span className="text-white text-2xl font-extrabold">87%</span>
              <p className="text-white/85 text-[13px] leading-snug mt-1">investigation time reduction through AI-powered trade surveillance for a Financial Services major</p>
            </div>
          </div>

          {/* CTA button */}
          <a href="/about" className="flex-shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--apple-black)] bg-white hover:bg-white/90 px-5 py-2.5 rounded-full transition-colors whitespace-nowrap shadow-sm">
            Find out more
            <span className="text-[16px]">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Choose Your Interest */}
      <section className="bg-gradient-to-b from-white to-gray-50/80 py-14 px-8 overflow-visible relative">
        <div className="max-w-[900px] mx-auto" ref={dropdownAreaRef}>
          {/* Section header */}
          <div className="text-center mb-8">
            <p className="text-4xl font-extrabold tracking-[0.25em] uppercase text-red-500 mb-2">Explore</p>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-[var(--apple-black)] tracking-tight leading-[1.08] max-w-2xl mx-auto">
              Choose your interest
            </h2>
          </div>

          {/* Two cards side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Capabilities card */}
            <div className="relative">
              <button
                onClick={() => { setCapOpen(!capOpen); setExpandedCap(null); setCsOpen(false); }}
                className={`group flex items-center justify-between w-full bg-white rounded-2xl px-6 py-5 text-[var(--apple-black)] font-semibold shadow-sm border transition-all duration-200 text-left ${capOpen ? 'border-red-400 shadow-md ring-1 ring-red-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-500">
                    <span className="material-symbols-outlined text-[20px]">category</span>
                  </span>
                  <span>Capabilities</span>
                </span>
                <span className={`material-symbols-outlined text-gray-400 text-xl transition-transform duration-300 ${capOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>expand_more</span>
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
                          <span className="font-medium text-sm text-[var(--apple-black)]">{cap.name}</span>
                        </span>
                        <span className={`material-symbols-outlined text-gray-400 text-base transition-transform duration-200 ${expandedCap === cap.name ? 'rotate-180' : ''}`}>expand_more</span>
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
                className={`group flex items-center justify-between w-full bg-white rounded-2xl px-6 py-5 text-[var(--apple-black)] font-semibold shadow-sm border transition-all duration-200 text-left ${csOpen ? 'border-red-400 shadow-md ring-1 ring-red-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-500">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </span>
                  <span>Case Studies</span>
                </span>
                <span className={`material-symbols-outlined text-gray-400 text-xl transition-transform duration-300 ${csOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>expand_more</span>
              </button>
              {csOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-[fadeSlideDown_0.2s_ease-out]">
                  {CASE_STUDIES.map((study, idx) => (
                    <button
                      key={study}
                      onClick={() => handleCsSelect(study)}
                      className={`w-full text-left px-5 py-3.5 text-[var(--apple-black)] text-sm font-medium hover:bg-red-500 hover:text-white transition-colors ${idx !== CASE_STUDIES.length - 1 ? 'border-b border-gray-100' : ''}`}
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

      {/* OEM Alliances Section */}
      <OEMAlliancesSection />
      <WhoWeAre />
      <TestimonialsSection />
    </>
  );
};

/* ───────── Solutions Showcase Section ───────── */
const SOLUTIONS_CARDS = [
  {
    icon: 'psychology',
    title: 'AI',
    description: 'Helping you identify and seize opportunities to leverage AI/GenAI to automate and accelerate business processes.',
    path: '/aianddataservice',
  },
  {
    icon: 'cloud',
    title: 'Cloud',
    description: 'Our CloudSMART offerings drive enterprise cloud optimization through accelerated innovation and agility at scale.',
    path: '/cloudservices',
  },
  {
    icon: 'engineering',
    title: 'Engineering',
    description: 'Services designed to accelerate product development, streamline time-to-profit and maximize return on innovation.',
    path: '/infrastructureservice',
  },
  {
    icon: 'shield',
    title: 'Cyber Security',
    description: 'End-to-end security solutions to protect your digital assets, ensure compliance and build resilience against evolving threats.',
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
      className="relative pt-24 lg:pt-32 pb-16 lg:pb-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}
    >
      {/* Ambient blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-100/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Heading + paragraph ── */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[var(--apple-black)] tracking-tight leading-[1.08] mb-6">
              Driving Your Growth:{' '}
              <span
                ref={headingRef}
                className="gradient-text-fill inline-block cursor-default transition-[background] duration-150 select-none bg-clip-text text-transparent"
                style={{
                  background: isHoveringHeading
                    ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #dc2626 0%, #b91c1c 5%, #7c3aed 20%, #5b21b6 100%)`
                    : 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                }}
              >
                Technology is Our Engine, Innovation Our Fuel
              </span>
            </h2>
            <p className="text-[var(--apple-gray)] text-lg leading-relaxed max-w-lg">
              Whether you're building smarter products, scaling with cloud, reimagining the customer experience or unlocking AI-led efficiencies, our solutions are built to meet you where you are and take you further, faster.
            </p>
          </div>

          {/* ── Right: Solution cards ── */}
          <div className="flex flex-col gap-4">
            {SOLUTIONS_CARDS.map((card, i) => (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                className={`group flex items-center gap-5 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/60 shadow-sm hover:shadow-lg hover:bg-white hover:border-red-100 transition-all duration-300 cursor-pointer ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-red-600">
                  <span className="material-symbols-outlined text-[28px]" aria-hidden>{card.icon}</span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[var(--apple-black)] text-[15px] font-bold mb-1 group-hover:text-red-600 transition-colors duration-200">
                    {card.title}
                  </h4>
                  <p className="text-[var(--apple-gray)] text-[13px] leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>

                {/* Arrow */}
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 group-hover:bg-red-500 flex items-center justify-center transition-all duration-300">
                  <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300">
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

/* ───────── OEM Alliances Section ───────── */
const OEM_PARTNERS = [
  { name: 'Microsoft', logo: '/community/microsoft.jpg' },
  { name: 'Amazon AWS', logo: '/community/awslogo.png' },
  { name: 'Cisco', logo: '/Partners/cisco.png' },
  { name: 'Red Hat', logo: '/community/redhat.jpg' },
  { name: 'IBM', logo: '/community/ibmlogo.png' },
  { name: 'Google Cloud', logo: '/community/gcp2.jpg' },
  { name: 'Dell', logo: '/community/dell.png' },
  { name: 'Palo Alto', logo: '/community/paloalto.jpg' },
  { name: 'Fortinet', logo: '/community/fortinet.jpg' },
  { name: 'Oracle', logo: '/community/oracle.png' },
  { name: 'VMware', logo: '/Partners/vmvare.png' },
  { name: 'SentinelOne', logo: '/Partners/sentinalone.png' },
  { name: 'HPE', logo: '/community/hpelogo.png' },
  { name: 'Juniper Networks', logo: '/community/junipernetwork.png' },
  { name: 'Trellix', logo: '/Partners/trellix.png' },
  { name: 'Tenable', logo: '/Partners/tenable.png' },
  { name: 'CloudSek', logo: '/community/cloudsek.jpg' },
  { name: 'Zscaler', logo: '/Partners/zscaler.png' },
  { name: 'NetApp', logo: '/Partners/netapp.png' },
  { name: 'Nutanix', logo: '/Partners/nutanix.png' },
  { name: 'SAP', logo: '/community/saplogo.jpeg' },
  { name: 'Salesforce', logo: '/community/salesforce.png' },
  { name: 'Trend Micro', logo: '/Partners/trendmicro.png' },
  { name: 'Veeam', logo: '/Partners/veeam.png' },
];

function OEMAlliancesSection() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden pt-12 md:pt-16 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 50%, #fafbfc 100%)' }}
    >
      {/* Ambient decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Header + link */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-4xl font-extrabold tracking-[0.25em] uppercase text-red-500 mb-3">Our Alliances & Partners</p>
            <p className="mt-3 text-[var(--apple-gray)] text-base max-w-xl lg:max-w-none mx-auto">
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

          {/* Right: Smaller globe */}
          <div className="order-1 lg:order-2 w-full rounded-2xl overflow-hidden bg-transparent" style={{ height: 'min(65vh, 520px)' }}>
            <DomeGallery
              images={OEM_PARTNERS.map((p) => ({ src: p.logo, alt: p.name }))}
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
    </section>
  );
}

/* ───────── Client Testimonials Section ───────── */
const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    role: 'Global CTO',
    company: 'Leading Telecom Provider',
    logo: '/Partners/cisco.png',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop',
    quote: "We've built a very strong partnership with Cache Digitech. Our plan is to take this relationship to the next level by making our Digital IT the best in class, and we appreciate Cache for all their efforts and collaboration in making that happen.",
  },
  {
    name: 'Anita Verma',
    role: 'VP of IT',
    company: 'Top BFSI Enterprise',
    logo: '/community/microsoft.jpg',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop',
    quote: "The cybersecurity solutions implemented by Cache gave us peace of mind. Their proactive approach to threat detection is remarkable, and their team operates as a true extension of ours.",
  },
  {
    name: 'Suresh Mehta',
    role: 'Director of Operations',
    company: 'Manufacturing Giant',
    logo: '/community/awslogo.png',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop',
    quote: "Migrating to cloud with Cache was seamless. Zero downtime, complete transparency, and a team that truly understands enterprise scale. They delivered beyond our expectations.",
  },
  {
    name: 'Priya Nair',
    role: 'Head of Digital',
    company: 'Government Agency',
    logo: '/community/dell.png',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop',
    quote: "Cache's managed services freed our internal team to focus on innovation. Their NOC and SOC operate like an extension of our own team, providing 24/7 reliability we can count on.",
  },
  {
    name: 'Vikram Patel',
    role: 'CISO',
    company: 'Consulting Firm',
    logo: '/community/paloalto.jpg',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop',
    quote: "Working with Cache on our security posture was transformative. They brought deep OEM expertise and a genuine commitment to our success that is rare in this industry.",
  },
];

/* ───────── Latest Highlights: large rectangular cards, scroll-driven gallery ───────── */
const HIGHLIGHTS_PANELS = [
  {
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80',
    tag: 'AI and GenAI',
    title: 'Unlocking business value with AI',
    description: 'Decoding differentiated positioning and capabilities in the AI market.',
    type: 'Article',
  },
  {
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
    tag: 'AI',
    title: 'AI for inclusive growth: Leadership lessons from Davos',
    type: 'Article',
  },
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
    tag: 'Cloud',
    title: 'Advancing education with AI: Preparing the workforce of tomorrow',
    type: 'Article',
  },
  {
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    tag: 'Strategy',
    title: 'Building a trust-led wealth management platform',
    type: 'Article',
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
    tag: 'Technology',
    title: 'Transforming enterprise IT operations for leading brands',
    type: 'Article',
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    tag: 'Partnerships',
    title: 'Accelerating AI-led tech modernisation with Guardian',
    type: 'Article',
  },
];

function LatestHighlightsSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewWidth, setViewWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => setViewWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const sectionH = section.offsetHeight;
      if (rect.top > viewH || rect.bottom < 0) return;
      const scrollable = sectionH - viewH;
      const progress = scrollable <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / scrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paddingX = 40;
  const gap = 24;
  // Large rectangular cards: ~52% viewport width, aspect 1.5:1 (wider than tall)
  const cardWidth = Math.min(680, Math.max(320, viewWidth * 0.52));
  const cardHeight = cardWidth / 1.5;
  const trackWidth = HIGHLIGHTS_PANELS.length * cardWidth + (HIGHLIGHTS_PANELS.length - 1) * gap;
  const contentWidth = Math.max(320, viewWidth - paddingX * 2);
  const maxTranslate = Math.max(0, trackWidth - contentWidth);
  const translateX = -scrollProgress * maxTranslate;

  return (
    <section
      ref={sectionRef}
      id="gallery-section"
      className="relative bg-white"
      style={{ height: '280vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden py-12 px-4 sm:px-8">
        {/* Section header */}
        <div className="flex-shrink-0 flex flex-col items-center text-center mb-8">
          <p className="text-4xl font-extrabold tracking-[0.25em] uppercase text-red-500 mb-2">
            Insights
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-light text-[var(--apple-black)] tracking-tight leading-[1.08] max-w-2xl mx-auto">
            Latest Highlights
          </h2>
        </div>

        {/* Large rectangular cards — scroll-driven horizontal */}
        <div className="flex-1 min-h-0 flex items-center overflow-hidden">
          <div
            className="flex items-center will-change-transform"
            style={{
              width: trackWidth,
              gap,
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {HIGHLIGHTS_PANELS.map((panel, i) => (
              <article
                key={i}
                className="group relative flex-shrink-0 overflow-hidden rounded-lg shadow-lg"
                style={{ width: cardWidth, height: cardHeight }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${panel.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end text-left p-6 sm:p-8 text-white">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                    {panel.tag}
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-semibold leading-tight line-clamp-2">
                    {panel.title}
                  </h3>
                  {panel.description && (
                    <p className="mt-2 text-sm text-white/90 line-clamp-2 max-w-md">
                      {panel.description}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-white/70 uppercase tracking-wider">
                    {panel.type}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(null); // index of card being swept away
  const [leaveDir, setLeaveDir] = useState('next');
  const [textVisible, setTextVisible] = useState(true);
  const total = TESTIMONIALS.length;

  const go = useCallback((dir) => {
    if (leaving !== null) return;
    const cur = active;
    const next = dir === 'next' ? (cur + 1) % total : (cur - 1 + total) % total;
    setLeaveDir(dir);
    setLeaving(cur);
    setTextVisible(false);
    // After the front card flies off, promote the next card
    setTimeout(() => {
      setActive(next);
      setLeaving(null);
      // Small delay then fade text in
      setTimeout(() => setTextVisible(true), 60);
    }, 500);
  }, [leaving, active, total]);

  const handleDot = useCallback((i) => {
    if (i === active || leaving !== null) return;
    go(i > active ? 'next' : 'prev');
  }, [active, leaving, go]);

  const t = TESTIMONIALS[active]; // current testimonial for text

  /* Build a visible stack: show up to 3 cards behind the active one.
     The stack order from back to front: active+3, active+2, active+1, active.
     The "leaving" card sits on top of everything and animates off. */
  const stackIndices = useMemo(() => {
    const indices = [];
    for (let offset = 3; offset >= 0; offset--) {
      indices.push((active + offset) % total);
    }
    return indices; // [back ... front=active]
  }, [active, total]);

  const getCardStyle = (idx, stackPos) => {
    // stackPos: 0=backmost … 3=front (active)
    const isLeaving = idx === leaving;

    if (isLeaving) {
      const isNext = leaveDir === 'next';
      return {
        zIndex: 20,
        transform: `perspective(1200px) translateX(${isNext ? '120%' : '-120%'}) rotateY(${isNext ? -25 : 25}deg) scale(0.9)`,
        filter: 'blur(4px)',
        opacity: 0,
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease, opacity 0.45s ease',
      };
    }

    // Stack positioning: cards behind are offset to the right, smaller, blurred, lower z
    const offset = 3 - stackPos; // 0=front, 1,2,3=behind
    const translateX = offset * 28; // stack from the right
    const blurPx = offset === 0 ? 0 : 2 + offset * 3; // blurred stack behind
    return {
      zIndex: 10 - offset,
      transform: `perspective(1200px) translateX(${translateX}px) translateY(${offset * 8}px) scale(${1 - offset * 0.06})`,
      filter: `blur(${blurPx}px)`,
      opacity: offset > 2 ? 0 : (offset === 0 ? 1 : 1 - offset * 0.12),
      transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease, opacity 0.35s ease',
    };
  };

  /* Text animation */
  const textStyle = {
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
    filter: textVisible ? 'blur(0px)' : 'blur(3px)',
    transition: textVisible
      ? 'opacity 0.4s ease 0.08s, transform 0.4s ease 0.08s, filter 0.4s ease 0.08s'
      : 'opacity 0.25s ease, transform 0.25s ease, filter 0.25s ease',
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}>
      {/* Ambient blurs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-100/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-red-50/20 blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[var(--apple-black)] tracking-tight leading-tight mb-10">
          Hear from Our Clients
        </h2>

        {/* Main testimonial area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Quote + Author ── */}
          <div style={textStyle}>
            {/* Quote mark */}
            <div className="mb-6">
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 36V20.4C0 16.4 0.8 12.7 2.4 9.3C4.1 5.8 6.9 2.8 10.8 0.3L15.3 4.8C12.6 6.6 10.6 8.7 9.3 11.1C8 13.4 7.3 16 7.2 18.9H13.5V36H0ZM25.5 36V20.4C25.5 16.4 26.3 12.7 27.9 9.3C29.6 5.8 32.4 2.8 36.3 0.3L40.8 4.8C38.1 6.6 36.1 8.7 34.8 11.1C33.5 13.4 32.8 16 32.7 18.9H39V36H25.5Z" fill="#dc2626" fillOpacity="0.2" />
              </svg>
            </div>

            {/* Quote text */}
            <p className="text-[var(--apple-black)] text-xl lg:text-2xl leading-relaxed font-light mb-10 max-w-lg">
              {t.quote}
            </p>

            {/* Author row */}
            <div className="flex items-center gap-4">
              <img
                src={t.logo}
                alt={t.company}
                className="w-14 h-14 rounded-xl object-contain bg-white p-1.5 shadow-sm border border-gray-100"
              />
              <div>
                <p className="text-[var(--apple-black)] text-base font-bold leading-tight">{t.name}</p>
                <p className="text-[var(--apple-gray)] text-sm">{t.role}</p>
              </div>
            </div>
          </div>

          {/* ── Right: Stacked card deck ── */}
          <div className="relative flex justify-center lg:justify-end" style={{ perspective: '1200px' }}>
            {/* Card stack container */}
            <div className="relative w-full max-w-[440px] aspect-[4/5]">
              {stackIndices.map((idx, stackPos) => {
                const testimonial = TESTIMONIALS[idx];
                const style = getCardStyle(idx, stackPos);
                return (
                  <div
                    key={`card-${idx}`}
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      ...style,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                );
              })}
              {/* Render the leaving card on top if it exists */}
              {leaving !== null && !stackIndices.includes(leaving) && (
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    ...getCardStyle(leaving, -1),
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <img
                    src={TESTIMONIALS[leaving].image}
                    alt={TESTIMONIALS[leaving].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              )}
            </div>

            {/* Navigation arrows */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-30">
              <button
                onClick={() => go('prev')}
                className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all duration-200 group"
                aria-label="Previous testimonial"
              >
                <span className="material-symbols-outlined text-[18px] text-[var(--apple-gray)] group-hover:text-[var(--apple-black)] transition-colors">chevron_left</span>
              </button>
              <button
                onClick={() => go('next')}
                className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all duration-200 group"
                aria-label="Next testimonial"
              >
                <span className="material-symbols-outlined text-[18px] text-[var(--apple-gray)] group-hover:text-[var(--apple-black)] transition-colors">chevron_right</span>
              </button>
            </div>

            {/* Dots indicator */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-red-500' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
export { LatestHighlightsSection };
