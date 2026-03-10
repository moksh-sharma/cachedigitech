import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useContent } from '../context/ContentContext';

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { messages, input, setInput, loading, chatError, sendMessage, hasAsked } = useChat();
  const messagesEndRef = useRef(null);
  const popupInputRef = useRef(null);

  // Chatbot UI CMS values (same source as HeroSection)
  const chatCms = useContent('home', 'chatbot');
  const cb = {
    heading: chatCms.chatHeading || 'Have tech questions?',
    heading2: chatCms.chatHeadingLine2 || 'Our AI answer engine can help.',
    placeholder: chatCms.chatPlaceholder || 'Ask a question…',
    bgFrom: chatCms.chatCardBgFrom || '#eef0f8',
    bgMid: chatCms.chatCardBgMid || '#e8e6f0',
    bgTo: chatCms.chatCardBgTo || '#e9e5f2',
    accentFrom: chatCms.chatAccentFrom || '#6366f1',
    accentTo: chatCms.chatAccentTo || '#a855f7',
    aiBubbleBg: chatCms.chatAiBubbleBg || 'rgba(255,255,255,0.8)',
    aiBubbleText: chatCms.chatAiBubbleText || '#1d1d1f',
    userBubbleText: chatCms.chatUserBubbleText || '#ffffff',
    bodySize: parseFloat(chatCms.chatBodyFontSize) || 13.5,
  };

  // Show floating button only when hero chatbot is out of view
  useEffect(() => {
    const heroCard = document.querySelector('.ai-chat-card');
    if (!heroCard) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroCard);
    return () => observer.disconnect();
  }, []);

  // Scroll messages to bottom
  const scrollToBottom = () => {
    const el = messagesEndRef.current;
    if (!el) return;
    const container = el.parentElement;
    if (container) container.scrollTop = container.scrollHeight;
  };
  useEffect(() => { if (open) scrollToBottom(); }, [messages, open]);

  // Focus input when popup opens
  useEffect(() => {
    if (open && popupInputRef.current) {
      setTimeout(() => popupInputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Don't render if hero chatbot is visible
  if (!visible) return null;

  return (
    <>
      {/* Popup chat window */}
      {open && (
        <div
          data-chat-popup
          className="fixed bottom-20 right-3 sm:right-6 sm:bottom-24 z-999 w-[calc(100vw-1.5rem)] max-w-[380px] h-[min(85vh,520px)] min-h-[420px] sm:w-[380px] sm:h-[520px] rounded-2xl sm:rounded-[24px] overflow-hidden flex flex-col shadow-2xl animate-[floatChatIn_0.3s_ease-out]"
          style={{ background: `linear-gradient(145deg, ${cb.bgFrom} 0%, ${cb.bgMid} 50%, ${cb.bgTo} 100%)` }}
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-5 pt-4 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/ai-logo-animation.webm" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-(--apple-black) leading-tight">AI Assistant</p>
                <p className="text-[11px] text-(--apple-gray)">Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-(--apple-gray) text-[20px]">close</span>
            </button>
          </div>

          <div className="w-full h-px bg-black/5" />

          {/* Messages area */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-4 scrollbar-hide">
            {!hasAsked && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }}>
                  <span className="material-symbols-outlined text-white text-[28px]">auto_awesome</span>
                </div>
                <h4 className="text-[16px] font-semibold text-(--apple-black) mb-1">How can I help?</h4>
                <p className="text-[13px] text-(--apple-gray)">Ask a question to get started</p>
              </div>
            )}

            {chatError && <div className="text-[13px] text-red-600 bg-red-50/80 p-3 rounded-2xl">{chatError}</div>}

            {messages.map((msg, i) =>
              msg.role === 'assistant' ? (
                <div key={i} className="flex gap-2.5">
                  <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }}>
                    <span className="material-symbols-outlined text-white text-[13px]">auto_awesome</span>
                  </div>
                  <div className="flex-1">
                    <div
                      className="leading-relaxed p-3.5 rounded-2xl rounded-tl-md shadow-sm whitespace-pre-wrap"
                      style={{ fontSize: `${cb.bodySize * 0.96}px`, background: cb.aiBubbleBg, color: cb.aiBubbleText }}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div
                    className="leading-relaxed p-3.5 rounded-2xl rounded-tr-md max-w-[85%] shadow-sm"
                    style={{ fontSize: `${cb.bodySize * 0.96}px`, color: cb.userBubbleText, background: `linear-gradient(to right, ${cb.accentFrom}, ${cb.accentTo})` }}
                  >
                    {msg.content}
                  </div>
                </div>
              )
            )}

            {loading && (
              <div className="flex gap-2.5">
                <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }}>
                  <span className="material-symbols-outlined text-white text-[13px]">auto_awesome</span>
                </div>
                <div className="text-[12px] text-(--apple-gray) italic px-2 py-3">Thinking…</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="shrink-0 px-5 pb-5 pt-2">
            <div className="relative flex items-center bg-white rounded-full border border-black/8 shadow-sm px-4 py-2 focus-within:shadow-md focus-within:outline-none focus-within:ring-0 transition-all">
              <span className="material-symbols-outlined text-[18px] mr-2.5 shrink-0" style={{ color: cb.accentFrom }}>language</span>
              <input
                ref={popupInputRef}
                className="w-full border-none bg-transparent focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 text-[13px] text-(--apple-black) placeholder:text-(--apple-gray) placeholder:font-normal"
                placeholder={cb.placeholder}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="shrink-0 ml-2 transition-colors disabled:opacity-40"
                style={{ color: cb.accentFrom }}
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-999 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={open
          ? { background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,0,0,0.1)' }
          : { background: `linear-gradient(135deg, ${cb.accentFrom}, ${cb.accentTo})` }
        }
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <span className={`material-symbols-outlined text-[24px] transition-transform duration-300 ${open ? 'text-(--apple-black)' : 'text-white'}`}>
          {open ? 'close' : 'chat'}
        </span>
      </button>
    </>
  );
};

export default FloatingChatbot;
