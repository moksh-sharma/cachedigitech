import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/LoginButton.css";

const LoginButton: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const bellRef = useRef<HTMLDivElement>(null);
  const isHome = location.pathname === "/";

  const notificationItems = [
    { label: "Campaigns & Promotion", route: "/campaigns" },
  ];

  const menuItems: Record<string, string> = {
    // About deep-links
    "Concept of Cache": "/about#concept-of-cache",
    "Profile of Cache": "/about#profile-of-cache",
    "Mission Vision": "/about#mission-vision",
    "Meaning of Logo": "/about#meaning-of-logo",
    "Team": "/about#team",

    // Services overview routes
    "Infrastructure": "/infrastructureservice",
    "Networking": "/service/network",
    "Cybersecurity": "/cybersecurity",
    "Cloud": "/cloudservices",
    "AI & Data": "/aianddataservice",
    "Consulting": "/consultingservice",
    "Managed Services": "/manageservices",
    "GRC Dashboard": "/grc-dashboard",

    // Infrastructure sections
    "Infrastructure – Consult": "/infrastructureservice#consult",
    "Infrastructure – Design": "/infrastructureservice#design",
    "Infrastructure – Build": "/infrastructureservice#build",
    "Infrastructure – Operate & Manage": "/infrastructureservice#operate",
    "Infrastructure – Migrate": "/infrastructureservice#migrate",

    // Networking sections
    "Networking – Audit": "/service/network#audit",
    "Networking – Consult": "/service/network#consult",
    "Networking – Design": "/service/network#design",
    "Networking – Build": "/service/network#build",
    "Networking – Operate & Manage": "/service/network#operate",

    // Managed Services sections
    "Managed Services – Audit": "/manageservices#audit",
    "Managed Services – Manpower": "/manageservices#manpower",
    "Managed Services – Contract": "/manageservices#contract",
    "Managed Services – NOC/SOC": "/manageservices#noc-soc",
    "Managed Services – Remote Infra": "/manageservices#remote-infra",

    // Cloud sections
    "Cloud – Capabilities": "/cloudservices#capabilities",
    "Cloud – Approach": "/cloudservices#approach",
    "Cloud – Infrastructure": "/cloudservices#infrastructure",

    // Cybersecurity sections
    "Cybersecurity – Capabilities": "/cybersecurity#capabilities",
    "Cybersecurity – Specialized": "/cybersecurity#specialized",
    "Cybersecurity – Framework": "/cybersecurity#framework",
    "Cybersecurity – Partnership": "/cybersecurity#partnership",

    // AI & Data sections
    "AI & Data – Services": "/aianddataservice#services",
    "AI & Data – Partners": "/aianddataservice#partners",
    "AI & Data – FAQ": "/aianddataservice#faq",

    // Community & Insights
    "Industry": "/community",
    "Partners": "/community",
    "Clients": "/community",
    "Insights": "/insights",
    "Blogs": "/insights",
    "Case Studies": "/insights",
    "Events & Social Activities": "/insights",

    // Contact & Notifications
    "Contact Us": "/contactus",
    "Campaigns & Promotion": "/campaigns",
  };

  const results = Object.keys(menuItems).filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  // Close notification dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "50px",
    padding: expanded ? "8px 20px" : "10px",
    marginRight: "5px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: expanded ? "250px" : "55px",
    height: "55px",
    overflow: "hidden",
    border: "1px solid rgba(5, 5, 5, 0.3)",
    justifyContent: expanded ? "flex-start" : "center",
    position: "relative",
  };

  const iconStyle: React.CSSProperties = { fontSize: "20px", flexShrink: 0, color: "black" };
  const inputStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    marginLeft: "8px",
    fontSize: "14px",
    flex: 1,
    display: expanded ? "block" : "none",
    background: "transparent",
    color: "black",
  };

  const bellIconStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    cursor: "pointer",
    borderRadius: "50%",
    zIndex: 10,
    position: "relative",
  };

  const ringStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,0,0,0.3)",
    transform: "translate(-50%, -50%)",
    animation: "pulse 1.5s infinite",
    zIndex: 1,
    pointerEvents: "none", // Make sure ring does not block clicks
  };

  const notificationDropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "110%",
    right: 0,
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    overflow: "hidden",
    zIndex: 9999,
    minWidth: "180px",
  };

  const notificationItemStyle: React.CSSProperties = {
    padding: "12px 15px",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    transition: "background-color 0.2s ease",
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "5px",
    background: "rgba(200,200,200,0.3)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "10px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
    maxHeight: "200px",
    overflowY: "auto",
    width: "250px",
    zIndex: 2000,
  };
  const itemStyle: React.CSSProperties = {
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: "14px",
    color: "black",
  };

  return (
    <div className="fixed top-11 right-13 z-2000 md:top-5 md:right-5 flex justify-end">
      {/* Mobile bell handled in Navbar; removed here */}

      {/* 🖥️ Desktop Search + Bell */}
      <div className="hidden md:flex items-center">
        <div style={containerStyle} onClick={() => setExpanded(true)}>
          <FiSearch style={iconStyle} />
          {expanded && (
            <input
              style={inputStyle}
              type="text"
              placeholder="Search..."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setHighlightIndex(-1);
              }}
              autoFocus
              onBlur={() => !value && setExpanded(false)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlightIndex((prev) => Math.min(prev + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHighlightIndex((prev) => Math.max(prev - 1, 0));
                } else if (e.key === "Enter") {
                  const exact = Object.keys(menuItems).find(
                    (k) => k.toLowerCase() === value.trim().toLowerCase()
                  );
                  const targetKey = exact ?? (results[highlightIndex] ?? results[0]);
                  if (targetKey) {
                    navigate(menuItems[targetKey]);
                    setExpanded(false);
                    setValue("");
                    setHighlightIndex(-1);
                  }
                } else if (e.key === "Escape") {
                  setExpanded(false);
                  setHighlightIndex(-1);
                }
              }}
            />
          )}
        </div>

        {expanded && value && results.length > 0 && (
          <div style={dropdownStyle}>
            {results.map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...itemStyle,
                  background:
                    highlightIndex === idx ? "rgba(255,255,255,0.6)" : "transparent",
                }}
                onMouseEnter={() => setHighlightIndex(idx)}
                onMouseDown={() => {
                  navigate(menuItems[item]);
                  setExpanded(false);
                  setValue("");
                  setHighlightIndex(-1);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {isHome && (
        <div style={{ marginLeft: "15px", position: "relative" }}>
          {hasNewNotification && !notificationOpen && <span style={ringStyle}></span>}
          <img
            src="/bell-icon.svg"
            alt="Notifications"
            style={bellIconStyle}
            onClick={() => setNotificationOpen(!notificationOpen)}
          />
          {notificationOpen && (
            <div style={notificationDropdownStyle}>
              {notificationItems.map((item, idx) => (
                <div
                  key={idx}
                  style={notificationItemStyle}
                  onClick={() => {
                    setNotificationOpen(false);
                    navigate(item.route);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
