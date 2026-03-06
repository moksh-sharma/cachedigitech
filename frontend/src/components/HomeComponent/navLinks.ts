export type NavLink = {
  label: string;
  route: string;
  sectionId?: string | null;
};

// Centralized list of navigable tags used by Navbar and Search
export const navLinks: NavLink[] = [
  // About
  { label: "Profile of Cache", route: "/about/profile" },
  { label: "Leadership Team", route: "/about/leadership" },
  { label: "Our Alliances", route: "/about/alliances" },
  { label: "Awards & Certifications", route: "/about/awards" },
  { label: "Innovations", route: "/innovations" },

  // Search aliases (same page)
  { label: "Awards and Accolades", route: "/about/awards" },
  { label: "Certifications", route: "/about/awards" },

  // Products & Services
  { label: "Cybersecurity", route: "/cybersecurity" },
  { label: "Cyber Security", route: "/cybersecurity" },
  { label: "Data Analytics & AI", route: "/aianddataservice" },
  { label: "Data AI", route: "/aianddataservice" },
  { label: "Cloud", route: "/cloudservices" },
  { label: "Infra & Networking", route: "/infrastructureservice" },
  { label: "Infrastructure & Networking", route: "/infrastructureservice" },
  { label: "Managed Services", route: "/manageservices" },
  { label: "Consulting & Auditing", route: "/consultingservice" },
  { label: "GRC", route: "/grc-dashboard" },

  // Insights
  { label: "Leadership Vision", route: "/insights", sectionId: "LeadershipVision" },
  { label: "Blogs", route: "/blogs" },
  { label: "Case Studies", route: "/case-studies" },
  { label: "Problems & Diagnostics", route: "/insights", sectionId: "problems_and_diagnostics" },
  // { label: "Events & Social Activities", route: "/insights", sectionId: "events" },

  // Industries (case studies by industry)
  { label: "Telecom", route: "/case-studies?industry=Telecom" },
  { label: "BFSI", route: "/case-studies?industry=BFSI" },
  { label: "Automobile & Manufacturing", route: "/case-studies?industry=Automobile%20%26%20Manufacturing" },
  { label: "Retail", route: "/case-studies?industry=Retail" },
  { label: "Healthcare & Hospitality", route: "/case-studies?industry=Healthcare%20%26%20Hospitality" },
  { label: "Governance", route: "/case-studies?industry=Governance" },
  { label: "IT & ITES", route: "/case-studies?industry=IT%20%26%20ITES" },

  // Contact
  { label: "Contact Us", route: "/contactus" },

  // Company
  { label: "Careers", route: "/careers" },
];