import type { SectionConfig } from "./serviceSubPageTypes";
import {
  Target,
  LayoutGrid,
  Shield,
  FileCheck,
  Search,
  Workflow,
  Users,
} from "lucide-react";

const IMG = (name: string) => `/images/${name}`;

export const consultingSubPages: SectionConfig = {
  overviewRoute: "/consultingservice",
  sectionTitle: "Consulting & Auditing",
  badgeLabel: "Consulting",
  overviewLabel: "Consulting & Auditing overview",
  pages: [
    {
      slug: "strategy-consulting",
      title: "Strategy Consulting",
      shortTitle: "Strategy Consulting",
      tagline: "IT and business strategy aligned to outcomes.",
      heroImage: IMG("audits.webp"),
      bodyImage: IMG("audits.webp"),
      intro:
        "We help define IT and digital strategy aligned to business goals - current-state assessment, target operating model, roadmap, and investment prioritization. Executive and technical workshops to align stakeholders and de-risk execution.",
      highlights: [
        "IT and digital strategy and roadmap",
        "Target operating model and governance",
        "Stakeholder alignment and business case",
      ],
      offerings: [
        { title: "Strategy workshops", description: "Executive and technical alignment sessions.", icon: Users },
        { title: "Roadmap & prioritization", description: "Phased initiatives and investment planning.", icon: Target },
        { title: "Operating model", description: "Structure, governance, and capabilities.", icon: LayoutGrid },
      ],
    },
    {
      slug: "infrastructure-advisory",
      title: "Infrastructure Advisory",
      shortTitle: "Infrastructure Advisory",
      tagline: "Infrastructure strategy, design, and optimization guidance.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We advise on infrastructure strategy - server, storage, network, and cloud - assessment, architecture options, migration and modernization paths, and vendor selection. Independent guidance to optimize spend and performance.",
      highlights: [
        "Infrastructure assessment and options analysis",
        "Architecture and migration advisory",
        "Vendor and technology selection",
      ],
      offerings: [
        { title: "Assessment", description: "Current-state and gap analysis.", icon: Search },
        { title: "Architecture advisory", description: "Design options and trade-offs.", icon: LayoutGrid },
        { title: "Sourcing", description: "Vendor and technology selection support.", icon: Target },
      ],
    },
    {
      slug: "security-consulting",
      title: "Security Consulting",
      shortTitle: "Security Consulting",
      tagline: "Security strategy, architecture, and risk assessment.",
      heroImage: IMG("CyberSecback.webp"),
      bodyImage: IMG("cybersec.webp"),
      intro:
        "We provide security consulting - strategy, architecture, and risk assessment - aligned to zero-trust and compliance. Same depth as our Cybersecurity practice: advisory workshops, security design, and audit readiness.",
      highlights: [
        "Security strategy and risk assessment",
        "Zero-trust and compliance-aligned architecture",
        "Audit readiness and remediation guidance",
      ],
      offerings: [
        { title: "Security strategy", description: "Risk-based security roadmap.", icon: Shield },
        { title: "Architecture", description: "Zero-trust and control design.", icon: LayoutGrid },
        { title: "Compliance", description: "Audit readiness and remediation.", icon: FileCheck },
      ],
    },
    {
      slug: "risk-compliance",
      title: "Risk & Compliance",
      shortTitle: "Risk & Compliance",
      tagline: "Risk assessment and regulatory compliance.",
      heroImage: IMG("audits.webp"),
      bodyImage: IMG("grc.webp"),
      intro:
        "We help assess and manage IT risk and compliance - control frameworks, gap analysis, regulatory mapping (GDPR, DPDP, industry standards), and remediation planning. Maintain an audit-ready, risk-aware posture.",
      highlights: [
        "Risk assessment and control frameworks",
        "Regulatory and standards mapping",
        "Remediation and continuous compliance",
      ],
      offerings: [
        { title: "Risk assessment", description: "Control frameworks and gap analysis.", icon: Search },
        { title: "Compliance mapping", description: "Regulatory and standards alignment.", icon: FileCheck },
        { title: "Remediation", description: "Prioritized remediation and tracking.", icon: Workflow },
      ],
    },
    {
      slug: "it-audits",
      title: "IT Audits",
      shortTitle: "IT Audits",
      tagline: "Independent IT and security audits.",
      heroImage: IMG("audits.webp"),
      bodyImage: IMG("audits.webp"),
      intro:
        "We conduct independent IT audits - controls testing, evidence collection, and audit reports - aligned to internal audit and external compliance requirements. Identify gaps and provide actionable recommendations.",
      highlights: [
        "Controls testing and evidence collection",
        "Audit reports and management summaries",
        "Recommendations and follow-up tracking",
      ],
      offerings: [
        { title: "Audit execution", description: "Scoping, testing, and evidence.", icon: Search },
        { title: "Reporting", description: "Findings, recommendations, and reports.", icon: FileCheck },
        { title: "Follow-up", description: "Remediation tracking and re-audit.", icon: Workflow },
      ],
    },
    {
      slug: "process-optimization",
      title: "Process Optimization",
      shortTitle: "Process Optimization",
      tagline: "IT process improvement and operational excellence.",
      heroImage: IMG("audits.webp"),
      bodyImage: IMG("audits.webp"),
      intro:
        "We optimize IT processes - service management, change, incident, problem - and align to ITIL or your operating model. Reduce friction, improve quality, and establish continuous improvement loops.",
      highlights: [
        "Process assessment and design",
        "ITIL and operational alignment",
        "Continuous improvement and metrics",
      ],
      offerings: [
        { title: "Process design", description: "Service, change, incident, problem.", icon: Workflow },
        { title: "Operational alignment", description: "ITIL and custom operating model.", icon: LayoutGrid },
        { title: "Improvement", description: "Metrics, KPIs, and continuous improvement.", icon: Target },
      ],
    },
  ],
};
