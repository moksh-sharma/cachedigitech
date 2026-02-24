import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePlacement } from "../../context/PlacementsContext";
import PrivacyPolicyPage from "../../Pages/PrivacyPolicyPage";
import TermsOfUsePage from "../../Pages/TermsOfUse";

/* ── Legal Modals ── */
function LegalModal({ onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-0 relative max-h-[85vh] flex flex-col border border-white/5" onClick={(e) => e.stopPropagation()}>
        <div className="flex-1 overflow-y-auto">{children}</div>
        <div className="flex justify-end p-4">
          <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-600 hover:text-white transition-colors" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Social icons data ── */
const SOCIALS = [
  { label: "Twitter", href: "https://x.com/i/flow/login?redirect_after_login=%2Fdigitech_cache", color: "#1DA1F2", d: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.63 0-4.66 2.56-4.07 5.09A12.94 12.94 0 013 1.64a4.52 4.52 0 001.39 6.05 4.48 4.48 0 01-2.05-.57v.06c0 2.22 1.57 4.07 3.67 4.49a4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.07 9.07 0 012 19.54 12.94 12.94 0 008.29 21c7.55 0 11.68-6.29 11.68-11.75 0-.18 0-.35-.01-.53A8.18 8.18 0 0023 3z" },
  { label: "Instagram", href: "https://www.instagram.com/cachetechnologies/", color: "#E4405F", d: "M7.5 2h9a5.5 5.5 0 015.5 5.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.75-.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" },
  { label: "Facebook", href: "https://www.facebook.com/CacheDigitech01", color: "#1877F2", d: "M22.675 0H1.325C.593 0 0 .594 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692V11.29h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.318h3.587l-.467 3.416h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" },
  { label: "Email", href: "mailto:info@cachedigitech.com", color: "#EA4335", d: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cache-digitech-pvt-ltd/", color: "#0A66C2", d: "M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 11.001-4.121 2.06 2.06 0 010 4.12zM6.902 20.452H3.773V9h3.129v11.452z" },
];

/* ── Footer ── */
function Footer() {
  const navigate = useNavigate();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const footerLogoUrl = usePlacement("global", "footer", "bgImage") || "/cachefootercut.jpg";

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* ── Top row: tagline + nav + contact ── */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">

          {/* Col 1 – Brand tagline */}
          <div className="md:col-span-4 space-y-3">
            <img src={footerLogoUrl} alt="Cache Digitech" className="h-16 w-auto brightness-200 opacity-80" />
            <p className="text-[13px] text-gray-400 leading-relaxed max-w-[260px]">
              Growth is Guaranteed — That's Cache's Promise.
            </p>
          </div>

          {/* Col 2 – Quick links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-3">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About", to: "/about" },
                { label: "Careers", to: "/careers" },
                { label: "EPF Notice", to: "/epf-amendment-notice" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[13px] text-gray-300 hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Legal links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setShowPrivacy(true)} className="text-left text-[13px] text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setShowTerms(true)} className="text-left text-[13px] text-gray-300 hover:text-white transition-colors duration-200">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 – Contact CTA */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between gap-4">
            <p className="text-[13px] text-gray-400 leading-relaxed md:text-right max-w-[280px]">
              Have a question? Our team of experienced professionals is ready to assist you.
            </p>
            <button
              onClick={() => navigate("/contactus")}
              className="inline-flex items-center gap-2 bg-red-600 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              Contact Us
              <span className="text-sm">&rarr;</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1100px] mx-auto px-6 py-7 flex flex-col items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Cache Digitech Pvt. Ltd.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 mr-1">Follow us</span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 hover:scale-105 transition-all duration-200"
                style={{ color: s.color }}
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {showPrivacy && <LegalModal onClose={() => setShowPrivacy(false)}><PrivacyPolicyPage /></LegalModal>}
      {showTerms && <LegalModal onClose={() => setShowTerms(false)}><TermsOfUsePage /></LegalModal>}
    </footer>
  );
}

export default Footer;
