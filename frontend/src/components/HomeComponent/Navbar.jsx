import React, { useState, useEffect, useRef } from "react";
import { Menu, ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "./navLinks";
import { usePlacement } from "../../context/PlacementsContext";

/* ── Sections that are direct links (no dropdown) ── */
const DIRECT_LINK_SECTIONS = ["Innovations", "Careers", "Contact"];

/* ── Menu structure ── */
const menuData = {
  "About Us": {
    items: ["Profile of Cache", "Leadership Team", "Our Alliances", "Awards & Certifications", "Leadership Vision", "Blogs"],
  },
  "Products": {
    items: ["Cloud", "Cybersecurity", "Data Analytics & AI", "Infra & Networking"],
  },
  "Services": {
    items: ["Consulting & Auditing", "Managed Services", "GRC"],
  },
  "Industries": {
    items: ["Telecom", "BFSI", "Automobile & Manufacturing", "Retail", "Healthcare & Hospitality", "Governance", "IT & ITES"],
  },
  "Innovations": {
    items: ["Innovations"],
  },
  "Careers": {
    items: ["Careers"],
  },
  "Contact": {
    items: ["Contact Us"],
  },
};

function Navbar() {
  const logoUrl = "/navbar-logo.svg";

  // Mobile sidebar
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState(null);

  // Desktop mega-menu (hover to open)
  const [megaOpen, setMegaOpen] = useState(null); // which top-level section
  const megaRef = useRef(null);
  const megaCloseTimeoutRef = useRef(null);

  // Scroll state for transparent → solid
  const [scrolled, setScrolled] = useState(false);
  // Hide navbar on scroll down, show on scroll up
  const [navbarVisible, setNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 100;

  const navigate = useNavigate();
  const location = useLocation();

  // Use light navbar text + visible bar on pages with dark hero when at top
  const darkHeroPaths = [
    "/",
    "/about/profile",
    "/innovations",
    "/cybersecurity",
    "/cloudservices",
    "/aianddataservice",
    "/consultingservice",
    "/infrastructureservice",
    "/manageservices",
    "/about",
    "/grc-dashboard",
  ];
  const isDarkHeroPage = darkHeroPaths.some((path) =>
    path === "/" ? location.pathname === "/" : path === "/about" ? location.pathname === "/about" : location.pathname.startsWith(path)
  );
  const useLightNavText = isDarkHeroPage && !scrolled;

  // Scroll listener — transparent on top, solid on scroll; hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y <= scrollThreshold) {
        setNavbarVisible(true);
      } else if (y > lastScrollY.current) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mega-menu on route change
  useEffect(() => { setMegaOpen(null); }, [location.pathname]);

  const clearMegaCloseTimeout = () => {
    if (megaCloseTimeoutRef.current) {
      clearTimeout(megaCloseTimeoutRef.current);
      megaCloseTimeoutRef.current = null;
    }
  };
  const scheduleMegaClose = () => {
    clearMegaCloseTimeout();
    megaCloseTimeoutRef.current = setTimeout(() => setMegaOpen(null), 150);
  };
  const handleMegaTriggerEnter = (section) => {
    clearMegaCloseTimeout();
    setMegaOpen(section);
  };
  const handleMegaPanelEnter = () => {
    clearMegaCloseTimeout();
  };
  const handleMegaPanelLeave = () => {
    setMegaOpen(null);
  };

  const submenuNavigation = Object.fromEntries(
    navLinks.map((l) => [l.label, { route: l.route, sectionId: l.sectionId ?? null }])
  );

  const handleItemClick = (section, item) => {
    const hasNested = menuData[section]?.submenus && menuData[section].submenus[item];
    if (hasNested) {
      setActiveNestedSubmenu(item);
      return;
    }
    const navItem = submenuNavigation[item];
    if (!navItem) return;
    setMenuOpen(false);
    setActiveSubmenu(null);
    setActiveNestedSubmenu(null);
    setMegaOpen(null);
    if (navItem.sectionId) {
      navigate(`${navItem.route}#${navItem.sectionId}`);
    } else {
      navigate(navItem.route);
    }
  };

  const handleSectionHover = (section) => {
    setHoveredSection(section);
    setActiveSubmenu(section);
  };

  const handleSectionLeave = () => {
    setTimeout(() => {
      if (!document.querySelector(".submenu-panel:hover")) {
        setHoveredSection(null);
      }
    }, 100);
  };

  const isMobileDevice = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  const handleMegaItemClick = (section, item) => {
    const navItem = submenuNavigation[item];
    if (!navItem) return;
    setMegaOpen(null);
    if (navItem.sectionId) {
      navigate(`${navItem.route}#${navItem.sectionId}`);
    } else {
      navigate(navItem.route);
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .submenu-panel:hover { display: block !important; }
        @keyframes megaSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Top Navbar: floating, dark translucent, white text, red logo ── */}
      <nav
        ref={megaRef}
        className={`fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-1000 transition-all duration-600 ease-out bg-black/25 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl ${navbarVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-[calc(100%+2rem)] opacity-0 pointer-events-none"}`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-4 relative">
          {/* Left: Hamburger (mobile) + Logo (desktop) */}
          <div className="flex items-center gap-7 flex-1 min-w-0 justify-start">
            <button
              className="md:hidden group flex items-center justify-center rounded-xl bg-white/15 p-2.5 transition-all duration-300 hover:bg-white/25 hover:scale-105"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
            <div onClick={() => navigate("/")} className="cursor-pointer shrink-0 hidden md:block">
              <img
                src={logoUrl}
                alt="CacheDigiTech Logo"
                className="h-10 w-auto transition-all duration-300 filter-[brightness(0)_saturate(100%)_invert(25%)_sepia(98%)_saturate(2692%)_hue-rotate(346deg)]"
              />
            </div>
          </div>

          {/* Center: Desktop nav links — dropdown sections vs direct links */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {Object.keys(menuData).map((section) => {
              const isDirectLink = DIRECT_LINK_SECTIONS.includes(section);
              const directRoute = isDirectLink && menuData[section]?.items?.[0]
                ? (submenuNavigation[menuData[section].items[0]]?.sectionId
                  ? `${submenuNavigation[menuData[section].items[0]].route}#${submenuNavigation[menuData[section].items[0]].sectionId}`
                  : submenuNavigation[menuData[section].items[0]]?.route)
                : null;

              if (isDirectLink && directRoute) {
                return (
                  <button
                    key={section}
                    onClick={() => { setMegaOpen(null); navigate(directRoute); }}
                    className="relative flex items-center gap-1.5 px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200 whitespace-nowrap text-white/95 hover:text-white hover:bg-white/15"
                  >
                    {section}
                  </button>
                );
              }

              return (
                <div
                  key={section}
                  className="relative"
                  onMouseEnter={() => handleMegaTriggerEnter(section)}
                  onMouseLeave={scheduleMegaClose}
                >
                  <button
                    onClick={() => {
                      setMegaOpen(megaOpen === section ? null : section);
                    }}
                    className={`relative flex items-center gap-1.5 px-3 py-2 text-base font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${megaOpen === section ? "text-white bg-white/20" : "text-white/95 hover:text-white hover:bg-white/15"}`}
                  >
                    {section}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${megaOpen === section ? "rotate-180" : ""}`} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: Mobile = both logos + divider; Desktop = Women Owned only */}
          <div className="flex items-center flex-1 min-w-0 justify-end overflow-hidden">
            {/* Mobile: Cache logo + vertical line + Women Owned (constrained to fit) */}
            <div className="flex md:hidden items-center gap-2 min-w-0 max-w-full shrink-0">
              <div onClick={() => navigate("/")} className="cursor-pointer shrink-0 flex-shrink-0">
                <img
                  src={logoUrl}
                  alt="CacheDigiTech Logo"
                  className="h-8 w-auto max-h-8 transition-all duration-300 filter-[brightness(0)_saturate(100%)_invert(25%)_sepia(98%)_saturate(2692%)_hue-rotate(346deg)]"
                />
              </div>
              <div className="h-6 w-px bg-white/50 shrink-0 flex-shrink-0" aria-hidden />
              <img
                src="/women_owned.png"
                alt="Women Owned"
                className="h-7 w-14 max-w-[3.5rem] object-contain object-left shrink-0 flex-shrink-0"
              />
            </div>
            {/* Desktop: Women Owned only */}
            <img
              src="/women_owned.png"
              alt="Women Owned"
              className="h-10 w-[100px] object-contain shrink-0 hidden md:block"
            />
          </div>
        </div>

        {/* ── Desktop Mega Menu Dropdown (stays open while hovering panel) ── */}
        {megaOpen && !DIRECT_LINK_SECTIONS.includes(megaOpen) && (
          <div
            className="hidden md:block absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-1001 pt-px"
            style={{ animation: "megaSlideDown 0.25s ease-out" }}
            onMouseEnter={handleMegaPanelEnter}
            onMouseLeave={handleMegaPanelLeave}
          >
            <div className="max-w-[1400px] mx-auto px-10 py-8">
              <div className="flex gap-12">
                {/* Section heading */}
                <div className="w-48 shrink-0">
                  <h3 className="text-lg font-bold text-(--apple-black) mb-1">{megaOpen}</h3>
                  <div className="w-8 h-0.5 bg-indigo-500 rounded-full" />
                </div>

                {/* Menu items */}
                <div className="flex-1">
                  {menuData[megaOpen]?.submenus ? (
                    /* Two-level: Products / Services with sub-items */
                    <div className="grid grid-cols-2 gap-8">
                      {menuData[megaOpen].items.map((group) => (
                        <div key={group}>
                          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-(--apple-gray) mb-4">{group}</h4>
                          <div className="space-y-1">
                            {(menuData[megaOpen].submenus[group] || []).map((item) => (
                              <button
                                key={item}
                                onClick={() => handleMegaItemClick(megaOpen, item)}
                                className="block w-full text-left px-3 py-2.5 text-[15px] font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Single-level items */
                    <div className="grid grid-cols-3 gap-2">
                      {menuData[megaOpen].items.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleMegaItemClick(megaOpen, item)}
                          className="block w-full text-left px-3 py-2.5 text-[15px] font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile Sidebar Backdrop ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1999"
          onClick={() => { setMenuOpen(false); setActiveSubmenu(null); setActiveNestedSubmenu(null); }}
        />
      )}

      {/* ── Mobile Sidebar ── */}
      <div className={`
        fixed top-0 left-0 w-screen md:w-72 h-full bg-white z-2000 flex flex-col transition-transform duration-500 ease-out shadow-2xl
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between py-5 px-6 border-b border-gray-100">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => { navigate("/"); setMenuOpen(false); setActiveSubmenu(null); }}
          >
            <img src={logoUrl} alt="CacheDigiTech Logo" className="h-8" />
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => { setMenuOpen(false); setActiveSubmenu(null); }}
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto p-4">
          {Object.entries(menuData).map(([section, data], index) => {
            const isDirectLink = DIRECT_LINK_SECTIONS.includes(section);
            const directRoute = isDirectLink && data?.items?.[0]
              ? (submenuNavigation[data.items[0]]?.sectionId
                ? `${submenuNavigation[data.items[0]].route}#${submenuNavigation[data.items[0]].sectionId}`
                : submenuNavigation[data.items[0]]?.route)
              : null;

            if (isDirectLink && directRoute) {
              return (
                <div key={index} className="mb-1">
                  <button
                    onClick={() => { navigate(directRoute); setMenuOpen(false); setActiveSubmenu(null); setHoveredSection(null); }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 text-gray-700 hover:bg-indigo-50 text-left"
                  >
                    <span className="font-semibold text-sm">{section}</span>
                  </button>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="mb-1"
                onMouseEnter={() => { if (!isMobileDevice()) handleSectionHover(section); }}
                onMouseLeave={() => { if (!isMobileDevice()) handleSectionLeave(); }}
                onClick={() => {
                  if (isMobileDevice()) {
                    setActiveSubmenu(section);
                    setHoveredSection(section);
                  }
                }}
              >
                <div className={`
                  flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300
                  ${hoveredSection === section
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-indigo-50"
                  }
                `}>
                  <span className="font-semibold text-sm">{section}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${hoveredSection === section ? "translate-x-1 text-white" : "text-gray-400"}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile Submenu Panel ── */}
      {activeSubmenu && menuOpen && (
        <div
          className="submenu-panel fixed top-0 left-0 md:left-72 right-0 md:right-auto w-screen md:w-64 h-full bg-white z-2001 shadow-2xl border-l border-gray-100 overflow-y-auto overflow-x-hidden"
          style={{ animation: "slideInFromRight 0.3s ease-out" }}
          onMouseEnter={() => { if (!isMobileDevice()) setActiveSubmenu(activeSubmenu); }}
          onMouseLeave={() => {
            if (!isMobileDevice()) {
              setActiveSubmenu(null);
              setHoveredSection(null);
              setActiveNestedSubmenu(null);
            }
          }}
        >
          <div className="py-6 px-6 border-b border-gray-100 bg-indigo-600 flex items-center gap-3">
            {activeNestedSubmenu ? (
              <button
                className="p-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 transition-colors"
                onClick={() => setActiveNestedSubmenu(null)}
                aria-label="Back"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
            ) : (
              <button
                className="md:hidden p-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 transition-colors"
                onClick={() => { setActiveNestedSubmenu(null); setActiveSubmenu(null); setHoveredSection(null); }}
                aria-label="Back"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
            )}
            <h3 className="font-bold text-xl text-white">{activeNestedSubmenu || activeSubmenu}</h3>
          </div>

          <div className="p-4">
            {(activeNestedSubmenu
              ? menuData[activeSubmenu].submenus[activeNestedSubmenu]
              : menuData[activeSubmenu].items
            ).map((item, index) => (
              <div
                key={index}
                className="px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 mb-1 flex items-center justify-between
                  text-gray-700 hover:bg-indigo-600 hover:text-white hover:shadow-md hover:translate-x-1"
                onClick={() => handleItemClick(activeSubmenu, item)}
              >
                <span className="text-[15px] font-medium">{item}</span>
                {menuData[activeSubmenu]?.submenus?.[item] && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
