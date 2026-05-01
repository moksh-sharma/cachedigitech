import type { SectionConfig } from "./serviceSubPageTypes";
import {
  Shield,
  Server,
  Activity,
  Cloud,
  FileCheck,
  LayoutGrid,
  Search,
  Lock,
  Mail,
  BarChart3,
} from "lucide-react";

const IMG = (name: string) => `/images/${name}`;

export const cybersecuritySubPages: SectionConfig = {
  overviewRoute: "/cybersecurity",
  sectionTitle: "Cybersecurity",
  badgeLabel: "Cybersecurity",
  overviewLabel: "Cybersecurity overview",
  pages: [
    {
      slug: "security-consulting",
      title: "Security Consulting",
      shortTitle: "Security Consulting",
      tagline: "Strategy, architecture, and governance for enterprise security.",
      heroImage: IMG("CyberSecback.webp"),
      bodyImage: IMG("cybersec.webp"),
      intro:
        "Cache Digitech delivers security consulting to design and harden your security posture. We align strategy with business risk, define target operating models, and implement governance frameworks - from zero-trust architecture to compliance readiness.",
      highlights: [
        "Security strategy and risk assessment aligned to business objectives",
        "Zero-trust and identity-centric architecture design",
        "Compliance mapping and audit readiness (ISO 27001, SOC 2, regulatory)",
      ],
      offerings: [
        { title: "Strategy & assessment", description: "Current-state analysis, gap identification, and security roadmap.", icon: LayoutGrid },
        { title: "Architecture design", description: "Zero-trust, segmentation, and hybrid-cloud security patterns.", icon: Shield },
        { title: "Governance & compliance", description: "Policies, controls, and continuous compliance monitoring.", icon: FileCheck },
      ],
    },
    {
      slug: "infrastructure-endpoint-security",
      title: "Infrastructure & Endpoint Security",
      shortTitle: "Infrastructure & Endpoint",
      tagline: "Perimeter, network, and endpoint protection at scale.",
      heroImage: IMG("CyberSecback.webp"),
      bodyImage: IMG("cybersec.webp"),
      intro:
        "We design and manage hardened perimeters - NGFW, intrusion detection, network segmentation, and DDoS mitigation - plus endpoint resilience with EDR/XDR, patch compliance, and automated containment to prevent lateral movement.",
      highlights: [
        "NGFW management, deep packet inspection, and VPN connectivity",
        "Intrusion detection and network segmentation to prevent lateral movement",
        "EDR/XDR, endpoint hygiene, and automated containment",
      ],
      offerings: [
        { title: "Perimeter security", description: "Firewall policies, IDS/IPS, VLAN segmentation, and volumetric mitigation.", icon: Shield },
        { title: "Endpoint resilience", description: "Behavior-based detection, containment, encryption, and baseline enforcement.", icon: Server },
        { title: "Visibility & NMS", description: "Asset monitoring, performance alerting, and traffic path management.", icon: BarChart3 },
      ],
    },
    {
      slug: "threat-monitoring-response",
      title: "Threat Monitoring & Response",
      shortTitle: "Threat Monitoring",
      tagline: "Unified SOC: surveillance, triage, and lifecycle orchestration.",
      heroImage: IMG("CyberSecback.webp"),
      bodyImage: IMG("cybersec.webp"),
      intro:
        "Our Managed SOC serves as a unified security command center - continuous surveillance across hybrid-cloud and on-premise, intelligent triage to prioritize critical threats, threat hunting for APTs, and end-to-end lifecycle orchestration from detection to recovery.",
      highlights: [
        "24/7 monitoring across hybrid-cloud and on-premise environments",
        "SIEM/SOAR, threat intelligence, and XDR platforms",
        "Automated response playbooks to contain threats and minimize disruption",
      ],
      offerings: [
        { title: "Surveillance & triage", description: "High-fidelity monitoring and prioritization of critical threats.", icon: Activity },
        { title: "Threat hunting", description: "Proactive hunting for advanced persistent threats.", icon: Search },
        { title: "Lifecycle orchestration", description: "Detection through recovery with playbooks and validation.", icon: Shield },
      ],
    },
    {
      slug: "data-cloud-security",
      title: "Data & Cloud Security",
      shortTitle: "Data & Cloud",
      tagline: "Identity, data sovereignty, and cloud-native protection.",
      heroImage: IMG("CyberSecback.webp"),
      bodyImage: IMG("cybersec.webp"),
      intro:
        "We secure identity and data across hybrid and multi-cloud: zero-trust identity, MFA/SSO, privileged access management, and least-privilege lifecycle. Plus DLP, data classification, and cloud security posture (CSPM, workload protection, CIEM, data security posture) for continuous compliance.",
      highlights: [
        "Zero-trust identity, MFA, PAM, and least-privilege access governance",
        "Data classification, exfiltration prevention, and regulatory compliance",
        "CSPM, workload protection, CIEM, and cloud data posture",
      ],
      offerings: [
        { title: "Identity & access", description: "IAM, PAM, and identity governance across cloud and on-prem.", icon: Lock },
        { title: "Data protection", description: "DLP, classification, and data sovereignty controls.", icon: Shield },
        { title: "Cloud security", description: "CNAPP, workload protection, and compliance automation.", icon: Cloud },
      ],
    },
    {
      slug: "security-audits-compliance",
      title: "Security Audits & Compliance",
      shortTitle: "Audits & Compliance",
      tagline: "VAPT, adversarial simulations, and audit-ready assurance.",
      heroImage: IMG("CyberSecback.webp"),
      bodyImage: IMG("audits.webp"),
      intro:
        "We shift organizations from reactive defense to proactive resilience through full-spectrum auditing - automated and manual testing across network, web, mobile, and API - adversarial simulations, architecture assessment, and risk prioritization with proof-of-closure and audit-ready reports.",
      highlights: [
        "VAPT, DAST/SAST, and pen-test orchestration",
        "Adversarial simulations and business-logic testing",
        "CVSS-based prioritization and remediation validation",
      ],
      offerings: [
        { title: "Vulnerability assessment", description: "Scanning and prioritization with remediation playbooks.", icon: Search },
        { title: "Penetration testing", description: "Manual exploitation and real-world impact validation.", icon: Shield },
        { title: "Compliance & reporting", description: "Audit-ready reports and proof-of-closure.", icon: FileCheck },
      ],
    },
  ],
};
