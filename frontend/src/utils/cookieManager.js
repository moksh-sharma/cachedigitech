/**
 * Cookie consent management utility.
 * GDPR-oriented: persist consent in localStorage and optionally set a cookie.
 */

const STORAGE_KEY = 'cookieConsent';

/** @type {'accepted' | 'rejected' | null} */
function getConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'accepted' || raw === 'rejected') return raw;
    return null;
  } catch {
    return null;
  }
}

/**
 * @param {'accepted' | 'rejected'} value
 */
function setConsent(value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, value);
    // Optional: set a first-party cookie for server-side checks (e.g. SSR or API)
    const maxAge = 365 * 24 * 60 * 60; // 1 year
    document.cookie = `${STORAGE_KEY}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch {
    // ignore
  }
}

function resetConsent() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${STORAGE_KEY}=; path=/; max-age=0`;
  } catch {
    // ignore
  }
}

export { getConsent, setConsent, resetConsent, STORAGE_KEY };
