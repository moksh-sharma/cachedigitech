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
  { label: "Awards and Accolades", route: "/about/awards" },
  { label: "Certifications", route: "/about/certifications" },

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
  { label: "Blogs", route: "/insights", sectionId: "blog" },
  { label: "Case Studies", route: "/insights", sectionId: "success-stories" },
  { label: "Problems & Diagnostics", route: "/insights", sectionId: "problems_and_diagnostics" },
  // { label: "Events & Social Activities", route: "/insights", sectionId: "events" },

  // Contact
  { label: "Contact Us", route: "/contactus" },
];