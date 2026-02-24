import React, { useState, useEffect, useRef } from "react";
import { Menu, ChevronLeft, ChevronRight, ChevronDown, Bell, Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "./navLinks";
import { usePlacement } from "../../context/PlacementsContext";

/* ── Search menu items ── */
const searchMenuItems = {
  "Concept of Cache": "/about#concept-of-cache",
  "Profile of Cache": "/about#profile-of-cache",
  "Mission Vision": "/about#mission-vision",
  "Meaning of Logo": "/about#meaning-of-logo",
  "Team": "/about#team",
  "Infrastructure": "/infrastructureservice",
  "Networking": "/service/network",
  "Cybersecurity": "/cybersecurity",
  "Cloud": "/cloudservices",
  "AI & Data": "/aianddataservice",
  "Consulting": "/consultingservice",
  "Managed Services": "/manageservices",
  "GRC Dashboard": "/grc-dashboard",
  "Infrastructure – Consult": "/infrastructureservice#consult",
  "Infrastructure – Design": "/infrastructureservice#design",
  "Infrastructure – Build": "/infrastructureservice#build",
  "Infrastructure – Operate & Manage": "/infrastructureservice#operate",
  "Infrastructure – Migrate": "/infrastructureservice#migrate",
  "Networking – Audit": "/service/network#audit",
  "Networking – Consult": "/service/network#consult",
  "Networking – Design": "/service/network#design",
  "Networking – Build": "/service/network#build",
  "Networking – Operate & Manage": "/service/network#operate",
  "Managed Services – Audit": "/manageservices#audit",
  "Managed Services – Manpower": "/manageservices#manpower",
  "Managed Services – Contract": "/manageservices#contract",
  "Managed Services – NOC/SOC": "/manageservices#noc-soc",
  "Managed Services – Remote Infra": "/manageservices#remote-infra",
  "Cloud – Capabilities": "/cloudservices#capabilities",
  "Cloud – Approach": "/cloudservices#approach",
  "Cloud – Infrastructure": "/cloudservices#infrastructure",
  "Cybersecurity – Capabilities": "/cybersecurity#capabilities",
  "Cybersecurity – Specialized": "/cybersecurity#specialized",
  "Cybersecurity – Framework": "/cybersecurity#framework",
  "Cybersecurity – Partnership": "/cybersecurity#partnership",
  "AI & Data – Services": "/aianddataservice#services",
  "AI & Data – Partners": "/aianddataservice#partners",
  "AI & Data – FAQ": "/aianddataservice#faq",
  "Industry": "/community",
  "Partners": "/community",
  "Clients": "/community",
  "Insights": "/insights",
  "Blogs": "/insights",
  "Case Studies": "/insights",
  "Events & Social Activities": "/insights",
  "Contact Us": "/contactus",
  "Campaigns & Promotion": "/campaigns",
};

const notificationItems = [
  { label: "Campaigns & Promotion", route: "/campaigns" },
];

/* ── Menu structure ── */
const menuData = {
  "About Us": {
    items: ["Profile of Cache", "Leadership Team", "Our Alliances", "Awards and Accolades", "Certifications"],
  },
  "Products": {
    items: ["Cybersecurity", "Data Analytics & AI", "Cloud", "Infra & Networking"],
  },
  "Services": {
    items: ["Consulting & Auditing", "Managed Services", "GRC"],
  },
  "Insights": {
    items: ["Leadership Vision", "Blogs", "Case Studies"],
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
  const scrollThreshold = 80;

  // Search state
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const searchRef = useRef(null);

  // Notification state
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasNewNotif, setHasNewNotif] = useState(true);
  const bellRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Use light navbar text + visible bar on pages with dark hero when at top
  const darkHeroPaths = [
    "/about/profile",
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
    path === "/about" ? location.pathname === "/about" : location.pathname.startsWith(path)
  );
  const useLightNavText = isDarkHeroPage && !scrolled;

  const searchResults = Object.keys(searchMenuItems).filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  );

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

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchExpanded(false);
        setSearchValue("");
        setHighlightIndex(-1);
      }
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

  const handleSearchSelect = (key) => {
    navigate(searchMenuItems[key]);
    setSearchExpanded(false);
    setSearchValue("");
    setHighlightIndex(-1);
  };

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

      {/* ── Top Navbar ── */}
      <nav
        ref={megaRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-out ${
          useLightNavText
            ? "bg-black/40 backdrop-blur-md border-b border-white/10"
            : scrolled
              ? "bg-white/95 backdrop-blur-[24px] shadow-sm border-b border-gray-200/80"
              : "bg-transparent backdrop-blur-[12px] border-b border-transparent"
        } ${navbarVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-4 relative">
          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-7 flex-1 min-w-0 justify-start">
            <button
              className="md:hidden group flex items-center justify-center rounded-xl bg-[var(--apple-black)] p-2.5 transition-all duration-300 hover:scale-105"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
            <div onClick={() => navigate("/")} className="cursor-pointer flex-shrink-0">
              <img
                src={logoUrl}
                alt="CacheDigiTech Logo"
                className={`h-10 w-auto transition-all duration-300 ${useLightNavText ? "brightness-0 invert" : ""}`}
              />
            </div>
          </div>

          {/* Center: Desktop nav links — hover to open mega menu */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {Object.keys(menuData).map((section) => (
              <div
                key={section}
                className="relative"
                onMouseEnter={() => handleMegaTriggerEnter(section)}
                onMouseLeave={scheduleMegaClose}
              >
                <button
                  onClick={() => {
                    const nav = menuData[section]?.items;
                    if (nav?.length === 1 && !menuData[section]?.submenus) {
                      const item = nav[0];
                      const navItem = submenuNavigation[item];
                      if (navItem) {
                        setMegaOpen(null);
                        if (navItem.sectionId) navigate(`${navItem.route}#${navItem.sectionId}`);
                        else navigate(navItem.route);
                      }
                    } else {
                      setMegaOpen(megaOpen === section ? null : section);
                    }
                  }}
                  className={`relative flex items-center gap-1.5 px-5 py-2.5 text-[17px] font-medium rounded-lg transition-all duration-200 ${
                    useLightNavText
                      ? megaOpen === section
                        ? "text-white bg-white/20"
                        : "text-white/95 hover:text-white hover:bg-white/15"
                      : megaOpen === section
                        ? "text-[var(--accent)] bg-indigo-50/60"
                        : "text-[var(--apple-black)] hover:text-[var(--accent)] hover:bg-gray-50"
                  }`}
                >
                  {section}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${megaOpen === section ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Search + Bell */}
          <div className="flex items-center gap-4 flex-1 min-w-0 justify-end">
            {/* Inline Search */}
            <div className="relative flex items-center" ref={searchRef}>
              {searchExpanded ? (
                <div className="flex items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2 w-72 transition-all">
                  <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <input
                    className="w-full text-[15px] bg-transparent outline-none placeholder:text-gray-400"
                    type="text"
                    placeholder="Search pages & services..."
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value); setHighlightIndex(-1); }}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIndex((p) => Math.min(p + 1, searchResults.length - 1)); }
                      else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIndex((p) => Math.max(p - 1, 0)); }
                      else if (e.key === "Enter") {
                        const exact = Object.keys(searchMenuItems).find((k) => k.toLowerCase() === searchValue.trim().toLowerCase());
                        const targetKey = exact ?? (searchResults[highlightIndex] ?? searchResults[0]);
                        if (targetKey) handleSearchSelect(targetKey);
                      }
                      else if (e.key === "Escape") { setSearchExpanded(false); setSearchValue(""); setHighlightIndex(-1); }
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchExpanded(true)}
                  className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${useLightNavText ? "hover:bg-white/15" : "hover:bg-gray-100"}`}
                  aria-label="Search"
                >
                  <Search className={`h-5 w-5 ${useLightNavText ? "text-white/95" : "text-gray-600"}`} />
                </button>
              )}
              {searchExpanded && searchValue && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[1100]">
                  <div className="max-h-52 overflow-y-auto">
                    {searchResults.map((item, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${highlightIndex === idx ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
                        onMouseEnter={() => setHighlightIndex(idx)}
                        onMouseDown={() => handleSearchSelect(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {searchExpanded && searchValue && searchResults.length === 0 && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-[1100] px-4 py-3 text-sm text-gray-400">No results found</div>
              )}
            </div>

            {/* Bell / Notifications */}
            <div className="relative flex items-center" ref={bellRef}>
              {notifOpen ? (
                <div className="flex items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2 transition-all">
                  <Bell className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  {notificationItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setNotifOpen(false); navigate(item.route); }}
                      className="text-sm text-gray-700 hover:text-indigo-600 whitespace-nowrap transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => { setNotifOpen(true); setHasNewNotif(false); }}
                  className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-colors ${useLightNavText ? "hover:bg-white/15" : "hover:bg-gray-100"}`}
                  aria-label="Notifications"
                >
                  <Bell className={`h-5 w-5 ${useLightNavText ? "text-white/95" : "text-gray-600"}`} />
                  {hasNewNotif && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Desktop Mega Menu Dropdown (stays open while hovering panel) ── */}
        {megaOpen && (
          <div
            className="hidden md:block absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-[1001] pt-px"
            style={{ animation: "megaSlideDown 0.25s ease-out" }}
            onMouseEnter={handleMegaPanelEnter}
            onMouseLeave={handleMegaPanelLeave}
          >
            <div className="max-w-[1400px] mx-auto px-10 py-8">
              <div className="flex gap-12">
                {/* Section heading */}
                <div className="w-48 flex-shrink-0">
                  <h3 className="text-lg font-bold text-[var(--apple-black)] mb-1">{megaOpen}</h3>
                  <div className="w-8 h-0.5 bg-indigo-500 rounded-full" />
                </div>

                {/* Menu items */}
                <div className="flex-1">
                  {menuData[megaOpen]?.submenus ? (
                    /* Two-level: Products / Services with sub-items */
                    <div className="grid grid-cols-2 gap-8">
                      {menuData[megaOpen].items.map((group) => (
                        <div key={group}>
                          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--apple-gray)] mb-4">{group}</h4>
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1999]"
          onClick={() => { setMenuOpen(false); setActiveSubmenu(null); setActiveNestedSubmenu(null); }}
        />
      )}

      {/* ── Mobile Sidebar ── */}
      <div className={`
        fixed top-0 left-0 w-screen md:w-72 h-full bg-white z-[2000] flex flex-col transition-transform duration-500 ease-out shadow-2xl
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
          {Object.entries(menuData).map(([section, data], index) => (
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
                <span className="font-semibold text-[15px]">{section}</span>
                <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${hoveredSection === section ? "translate-x-1 text-white" : "text-gray-400"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Submenu Panel ── */}
      {activeSubmenu && menuOpen && (
        <div
          className="submenu-panel fixed top-0 left-0 md:left-72 right-0 md:right-auto w-screen md:w-64 h-full bg-white z-[2001] shadow-2xl border-l border-gray-100 overflow-y-auto overflow-x-hidden"
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
