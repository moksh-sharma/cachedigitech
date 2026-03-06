import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from '../context/CookieConsentContext';
import './CookieBanner.css';

const LEARN_MORE_URL = '/privacy-policy';

export default function CookieBanner() {
  const { consent, setConsent, hasResponded } = useCookieConsent();
  const [isExiting, setIsExiting] = useState(false);

  const hide = () => {
    setIsExiting(true);
  };

  const handleAccept = () => {
    setConsent('accepted');
    hide();
  };

  const handleReject = () => {
    setConsent('rejected');
    hide();
  };

  const handleAnimationEnd = () => {
    if (isExiting) setIsExiting(false);
  };

  if (hasResponded && consent !== null && !isExiting) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className={`cookie-banner ${isExiting ? 'cookie-banner--exit' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          We use cookies to improve your experience, analyze site traffic and personalize content.
          By clicking &quot;Accept All&quot; you consent to our use of cookies.{' '}
          <Link
            to={LEARN_MORE_URL}
            className="cookie-banner__link"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more
          </Link>
        </p>
        <div className="cookie-banner__actions">
          <button
            type="button"
            onClick={handleReject}
            className="cookie-banner__btn cookie-banner__btn--secondary"
          >
            Reject non-essential
          </button>
          <Link
            to={LEARN_MORE_URL}
            className="cookie-banner__btn cookie-banner__btn--secondary cookie-banner__btn--link"
          >
            Learn more
          </Link>
          <button
            type="button"
            onClick={handleAccept}
            className="cookie-banner__btn cookie-banner__btn--primary"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
