import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  // All searchable menu items (from Navbar)
  const menuItems: Record<string, string> = {
    "Concept of Cache": "/about",
    "Mission Vision": "/about",
    "Meaning of Logo": "/about",
    "Certifications and Awards": "/about",
    "Team": "/about",

    "Infrastructure": "/infrastructureservice",
    "Network Solution": "/service/network",
    "Security": "/cybersecurity",
    "Cloud Solution": "/cloudservices",
    "Artificial Intelligence": "/aianddataservice",
    "Consulting": "/consultingservice",

    "Industry": "/community",
    "Partners": "/community",
    "Clients": "/community",

    "CEO": "/insights",
    "Blogs": "/insights",
    "Case Studies": "/insights",
    "Events & Social Activities": "/insights",

    "Contact Us": "/contactus",
  };

  const results = Object.keys(menuItems).filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2000,
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "20px",
    padding: "12px 18px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: expanded ? "280px" : "120px",
    overflow: "hidden",
  };

  const inputStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    marginLeft: "8px",
    fontSize: "14px",
    flex: 1,
    display: expanded ? "block" : "none",
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "55px",
    left: 0,
    width: "100%",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 2100,
  };

  const itemStyle: React.CSSProperties = {
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid #f0f0f0",
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle} onClick={() => setExpanded(true)}>
        <FiSearch size={20} />
        {expanded ? (
          <input
            style={inputStyle}
            type="text"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onBlur={() => !value && setExpanded(false)}
          />
        ) : (
          <span style={{ marginLeft: "8px", fontWeight: "bold" }}>Search</span>
        )}
      </div>

      {expanded && value && results.length > 0 && (
        <div style={dropdownStyle}>
          {results.map((item, idx) => (
            <div
              key={idx}
              style={itemStyle}
              onMouseDown={() => {
                navigate(menuItems[item]); // Navigate on click
                setExpanded(false);
                setValue("");
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
