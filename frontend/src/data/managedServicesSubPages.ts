import type { SectionConfig } from "./serviceSubPageTypes";
import {
  Network,
  Server,
  Cloud,
  Shield,
  GitBranch,
  Headphones,
  Wrench,
  Settings,
} from "lucide-react";

const IMG = (name: string) => `/images/${name}`;

export const managedServicesSubPages: SectionConfig = {
  overviewRoute: "/manageservices",
  sectionTitle: "Managed Services",
  badgeLabel: "Managed Services",
  overviewLabel: "Managed Services overview",
  pages: [
    {
      slug: "network-managed-services",
      title: "Network Managed Services",
      shortTitle: "Network Managed",
      tagline: "24/7 network operations and optimization.",
      heroImage: IMG("manages.webp"),
      bodyImage: IMG("manages.webp"),
      intro:
        "We manage your network estate - monitoring, configuration, performance, and incident response - with clear SLAs and escalation. LAN, WAN, wireless, and security perimeter with proactive optimization and change management.",
      highlights: [
        "Network monitoring and incident management",
        "Configuration and change management",
        "Performance and capacity optimization",
      ],
      offerings: [
        { title: "Monitoring", description: "24/7 monitoring and alerting.", icon: Network },
        { title: "Operations", description: "Incident, change, and problem management.", icon: Settings },
        { title: "Optimization", description: "Performance and capacity reviews.", icon: Wrench },
      ],
    },
    {
      slug: "it-infrastructure-management",
      title: "IT Infrastructure Management",
      shortTitle: "IT Infrastructure",
      tagline: "End-to-end infrastructure operations.",
      heroImage: IMG("manages.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We operate your server, storage, and virtualization estate - provisioning, patching, backup verification, performance tuning, and capacity planning. Single accountability for infrastructure availability and efficiency.",
      highlights: [
        "Server, storage, and virtualization operations",
        "Patching, backup, and DR verification",
        "Capacity and performance management",
      ],
      offerings: [
        { title: "Infrastructure ops", description: "Provisioning, patching, and lifecycle.", icon: Server },
        { title: "Backup & DR", description: "Backup verification and DR readiness.", icon: Shield },
        { title: "Capacity", description: "Performance and capacity planning.", icon: Settings },
      ],
    },
    {
      slug: "cloud-managed-services",
      title: "Cloud Managed Services",
      shortTitle: "Cloud Managed",
      tagline: "24/7 cloud operations and FinOps.",
      heroImage: IMG("manages.webp"),
      bodyImage: IMG("Cloudback.webp"),
      intro:
        "We manage your cloud estate - AWS, Azure, GCP - monitoring, security posture, cost optimization, and incident response. Proactive operations, FinOps, and compliance so you focus on building, not plumbing.",
      highlights: [
        "Multi-cloud monitoring and operations",
        "Security posture and compliance",
        "FinOps and cost optimization",
      ],
      offerings: [
        { title: "Cloud ops", description: "24/7 monitoring and incident response.", icon: Cloud },
        { title: "Security & compliance", description: "Posture, guardrails, and compliance.", icon: Shield },
        { title: "FinOps", description: "Cost optimization and rightsizing.", icon: Settings },
      ],
    },
    {
      slug: "security-operations-soc-siem-mdr",
      title: "Security Operations (SOC / SIEM / MDR)",
      shortTitle: "SOC / SIEM / MDR",
      tagline: "Managed detection and response.",
      heroImage: IMG("manages.webp"),
      bodyImage: IMG("cybersec.webp"),
      intro:
        "We deliver managed security operations-SOC, SIEM, and MDR-with 24/7 monitoring, threat detection, and response. SIEM/SOAR, threat intelligence, and XDR with clear escalation and incident lifecycle management.",
      highlights: [
        "24/7 SOC monitoring and triage",
        "SIEM, SOAR, and XDR management",
        "Threat detection and response playbooks",
      ],
      offerings: [
        { title: "SOC operations", description: "Monitoring, triage, and escalation.", icon: Shield },
        { title: "SIEM/SOAR", description: "Platform management and use case development.", icon: Settings },
        { title: "MDR", description: "Detection and response with playbooks.", icon: GitBranch },
      ],
    },
    {
      slug: "devops-automation-services",
      title: "DevOps & Automation Services",
      shortTitle: "DevOps & Automation",
      tagline: "CI/CD, IaC, and platform operations.",
      heroImage: IMG("manages.webp"),
      bodyImage: IMG("Cloudback.webp"),
      intro:
        "We operate and evolve your DevOps and automation - CI/CD pipelines, IaC, GitOps, and platform tooling. Run, maintain, and improve delivery pipelines and infrastructure automation with SRE practices.",
      highlights: [
        "CI/CD and pipeline operations",
        "IaC and GitOps management",
        "Platform and tooling support",
      ],
      offerings: [
        { title: "Pipeline operations", description: "CI/CD run, maintain, and optimize.", icon: GitBranch },
        { title: "IaC & GitOps", description: "Infrastructure automation and drift management.", icon: Cloud },
        { title: "Platform support", description: "Tooling and developer experience.", icon: Settings },
      ],
    },
    {
      slug: "end-user-workplace-support",
      title: "End-User & Workplace Support",
      shortTitle: "End-User & Workplace",
      tagline: "Desktop, collaboration, and workplace support.",
      heroImage: IMG("manages.webp"),
      bodyImage: IMG("manages.webp"),
      intro:
        "We provide end-user and workplace support - desktop, collaboration tools, identity, and device management - with service desk, L1/L2, and escalation. Improve productivity and satisfaction with clear SLAs.",
      highlights: [
        "Service desk and L1/L2 support",
        "Desktop and device management",
        "Collaboration and identity support",
      ],
      offerings: [
        { title: "Service desk", description: "Ticketing, SLA, and escalation.", icon: Headphones },
        { title: "Desktop & devices", description: "Provisioning, patch, and lifecycle.", icon: Wrench },
        { title: "Workplace", description: "Collaboration and identity support.", icon: Settings },
      ],
    },
  ],
};
