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
  { label: "Overview", route: "/innovations" },

  // Innovation projects (individual project pages)
  { label: "Techbank", route: "/innovations/projects/techbank" },
  { label: "Bid Intelligence", route: "/innovations/projects/bid-intelligence" },
  { label: "AskCache", route: "/innovations/projects/askcache" },
  { label: "CRM", route: "/innovations/projects/crm" },
  { label: "HRMS", route: "/innovations/projects/hrms" },
  { label: "Employee APP", route: "/innovations/projects/employee-app" },
  { label: "Employee App", route: "/innovations/projects/employee-app" },
  { label: "Cache BI", route: "/innovations/projects/cache-bi" },
  { label: "EDM", route: "/innovations/projects/edm" },
  { label: "MAIL INTEGRATION", route: "/innovations/projects/mail-integration" },
  { label: "Mail Integration", route: "/innovations/projects/mail-integration" },
  { label: "Cache GPT", route: "/innovations/projects/cache-gpt" },
  { label: "Cache DB", route: "/innovations/projects/cache-db" },
  { label: "Cache DOC", route: "/innovations/projects/cache-doc" },
  { label: "Web & App Development", route: "/innovations/projects/custom-app-development" },
  { label: "GRC (Sanchalan)", route: "/innovations/projects/grc" },

  // Search aliases (same page)
  { label: "Awards and Accolades", route: "/about/awards" },
  { label: "Certifications", route: "/about/awards" },

  // Products & Services
  { label: "Cybersecurity", route: "/cybersecurity" },
  { label: "Cyber Security", route: "/cybersecurity" },
  { label: "Security Consulting", route: "/cybersecurity" },
  { label: "Infrastructure & Endpoint Security", route: "/cybersecurity" },
  { label: "Threat Monitoring & Response", route: "/cybersecurity" },
  { label: "Data & Cloud Security", route: "/cybersecurity" },
  { label: "Cloud Security", route: "/cloudservices" },
  { label: "Data Analytics & AI", route: "/aianddataservice" },
  { label: "Data AI", route: "/aianddataservice" },
  { label: "Data Platforms", route: "/aianddataservice" },
  { label: "Advanced Analytics", route: "/aianddataservice" },
  { label: "AI Automation", route: "/aianddataservice" },
  { label: "Intelligent CRM", route: "/aianddataservice" },
  { label: "Data Security & Governance", route: "/aianddataservice" },
  { label: "Cloud", route: "/cloudservices" },
  { label: "Cloud Consulting", route: "/cloudservices" },
  { label: "Cloud Migration", route: "/cloudservices" },
  { label: "Cloud Architecture", route: "/cloudservices" },
  { label: "Managed Cloud Services", route: "/cloudservices" },
  { label: "Cloud Security", route: "/cloudservices" },
  { label: "DevOps & Automation", route: "/cloudservices" },
  { label: "Cloud Strategy", route: "/cloudservices" },
  { label: "Hybrid Cloud", route: "/cloudservices" },
  { label: "App Modernization", route: "/cloudservices" },
  { label: "Cloud Operations", route: "/cloudservices" },
  { label: "Infra & Networking", route: "/infrastructureservice" },
  { label: "Infrastructure & Networking", route: "/infrastructureservice" },
  { label: "IT Infrastructure Solutions", route: "/infrastructureservice" },
  { label: "Data Center Management", route: "/infrastructureservice" },
  { label: "Network Infrastructure (LAN/WAN/Wireless)", route: "/infrastructureservice" },
  { label: "Server & Storage Management", route: "/infrastructureservice" },
  { label: "Virtualization & Hypervisor Management", route: "/infrastructureservice" },
  { label: "Backup & Disaster Recovery", route: "/infrastructureservice" },
  { label: "Infrastructure Consulting", route: "/infrastructureservice" },
  { label: "Infrastructure Design", route: "/infrastructureservice" },
  { label: "Infrastructure Deployment", route: "/infrastructureservice" },
  { label: "Infrastructure Management", route: "/infrastructureservice" },
  { label: "Data Center Migration", route: "/infrastructureservice" },
  { label: "Managed Services", route: "/manageservices" },
  { label: "Network Managed Services", route: "/manageservices" },
  { label: "IT Infrastructure Management", route: "/manageservices" },
  { label: "Cloud Managed Services", route: "/manageservices" },
  { label: "Security Operations (SOC / SIEM / MDR)", route: "/manageservices" },
  { label: "DevOps & Automation Services", route: "/manageservices" },
  { label: "End-User & Workplace Support", route: "/manageservices" },
  { label: "Consulting & Auditing", route: "/consultingservice" },
  { label: "Strategy Consulting", route: "/consultingservice" },
  { label: "Infrastructure Advisory", route: "/consultingservice" },
  { label: "Security Consulting", route: "/cybersecurity" },
  { label: "Risk & Compliance", route: "/consultingservice" },
  { label: "IT Audits", route: "/consultingservice" },
  { label: "Process Optimization", route: "/consultingservice" },
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