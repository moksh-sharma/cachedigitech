import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Shield,
  GitBranch,
  Server,
  LineChart,
  Users,
  Upload,
  LayoutGrid,
  Headphones,
  Workflow,
  Receipt,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export type CloudSubPageSlug =
  | "cloud-strategy"
  | "hybrid-cloud"
  | "cloud-security"
  | "app-modernization"
  | "cloud-operations"
  | "cloud-consulting"
  | "cloud-migration"
  | "cloud-architecture"
  | "managed-cloud-services"
  | "devops-automation"
  | "multi-cloud-billing"
  | "ai-coe";

export type CloudSubPageDef = {
  slug: CloudSubPageSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  heroImage: string;
  bodyImage: string;
  intro: string;
  highlights: string[];
  offerings: { title: string; description: string; icon: LucideIcon }[];
};

/** Unsplash sources - run `node frontend/scripts/fetch-cloud-subpage-images.mjs` to download as WebP */
const IMG = (name: string) => `/cloud/subpages/${name}.webp`;

export const cloudSubPages: CloudSubPageDef[] = [
  {
    slug: "cloud-strategy",
    title: "Cloud Strategy",
    shortTitle: "Strategy",
    tagline: "Roadmaps, readiness, and business-aligned cloud adoption.",
    heroImage: IMG("cloud-strategy"),
    bodyImage: IMG("cloud-strategy-body"),
    intro:
      "Define where cloud creates the most value for your enterprise. We assess readiness, align stakeholders, and build a phased roadmap that balances speed, risk, and ROI.",
    highlights: [
      "Cloud readiness and maturity assessment",
      "Target operating model and governance design",
      "Business case, TCO, and FinOps-aware planning",
    ],
    offerings: [
      { title: "Assessment & vision", description: "Current-state analysis, gap identification, and executive-ready recommendations.", icon: LineChart },
      { title: "Roadmap & prioritization", description: "Wave planning, quick wins, and long-term transformation sequencing.", icon: Cloud },
      { title: "Governance framework", description: "Policies, guardrails, and accountability across business and IT.", icon: Shield },
    ],
  },
  {
    slug: "hybrid-cloud",
    title: "Hybrid Cloud",
    shortTitle: "Hybrid",
    tagline: "Connect on-premises and cloud without compromising control.",
    heroImage: IMG("hybrid-cloud"),
    bodyImage: IMG("hybrid-cloud-body"),
    intro:
      "Unify private and public environments with consistent networking, identity, and operations. Ideal when data residency, latency, or legacy integration matters.",
    highlights: [
      "Hybrid connectivity and identity patterns",
      "Consistent security and compliance posture",
      "Workload placement and portability guidance",
    ],
    offerings: [
      { title: "Architecture design", description: "Reference designs for hybrid networking, DNS, and edge patterns.", icon: LayoutGrid },
      { title: "Integration layer", description: "APIs, messaging, and secure bridges between on-prem and cloud.", icon: Workflow },
      { title: "Operations model", description: "Runbooks, monitoring, and shared responsibility clarity.", icon: Server },
    ],
  },
  {
    slug: "cloud-security",
    title: "Cloud Security",
    shortTitle: "Security",
    tagline: "Zero-trust principles, compliance, and continuous hardening.",
    heroImage: IMG("cloud-security"),
    bodyImage: IMG("cloud-security-body"),
    intro:
      "Protect workloads, data, and identities across multi-cloud estates. We embed security into architecture, pipelines, and day-2 operations - not as an afterthought.",
    highlights: [
      "Identity, IAM, and least-privilege design",
      "Data protection, encryption, and key management",
      "Detection, logging, and compliance alignment",
    ],
    offerings: [
      { title: "Security architecture", description: "Landing zones, segmentation, and zero-trust patterns.", icon: Shield },
      { title: "DevSecOps", description: "Shift-left scanning, secrets management, and pipeline controls.", icon: GitBranch },
      { title: "Posture & monitoring", description: "CSPM-style reviews, baselines, and incident readiness.", icon: Server },
    ],
  },
  {
    slug: "cloud-migration",
    title: "Seamless Cloud Migration & Rehosting",
    shortTitle: "Migration & Rehosting",
    tagline: "Zero Downtime. Zero Friction. Instant Scale.",
    heroImage: IMG("cloud-migration"),
    bodyImage: IMG("cloud-migration-body"),
    intro:
      "Stop worrying about cutover risks and business disruption. Whether moving legacy VMs, complex SAP ERPs, or mission-critical databases, our automated migration pipelines transfer your workloads to AWS, Azure, or GCP smoothly and securely.",
    highlights: [
      "100% data integrity with synchronous replication",
      "Automated landing zone architecture tailored to compliance rules",
      "Full leverage of hyperscaler funding programs (AWS MAP, Azure AMMP)",
    ],
    offerings: [
      { title: "Lift & Shift", description: "Automated rehosting pipelines for VMs, ERPs, and databases.", icon: Upload },
      { title: "Landing zones", description: "Compliance-ready foundations on AWS, Azure, and GCP.", icon: LayoutGrid },
      { title: "Funding programs", description: "Maximize AWS MAP, Azure AMMP, and partner incentives.", icon: LineChart },
    ],
  },
  {
    slug: "app-modernization",
    title: "Application Replatforming & Modernization",
    shortTitle: "Replatforming",
    tagline: "Turn Monoliths into Agile, Cloud-Native Engines.",
    heroImage: IMG("app-modernization"),
    bodyImage: IMG("app-modernization-body"),
    intro:
      "Don't just shift your technical debt to the cloud - eliminate it. We refactor and replatform legacy systems into microservices, containerized stacks (Kubernetes/Docker), and serverless architectures designed for speed and reliability.",
    highlights: [
      "Up to 40% boost in application processing performance",
      "Instant auto-scaling during traffic spikes",
      "Zero-downtime CI/CD deployment pipelines",
    ],
    offerings: [
      { title: "Microservices", description: "Decompose monoliths into scalable service boundaries.", icon: LayoutGrid },
      { title: "Containers & K8s", description: "Kubernetes/Docker platforms built for resilience.", icon: Cloud },
      { title: "Serverless & CI/CD", description: "Event-driven architectures with zero-downtime releases.", icon: RefreshCw },
    ],
  },
  {
    slug: "cloud-operations",
    title: "Continuous Cloud Optimization & FinOps",
    shortTitle: "FinOps",
    tagline: "Eliminate Cloud Waste. Reclaim Up to 30% of Your Budget.",
    heroImage: IMG("cloud-operations"),
    bodyImage: IMG("cloud-operations-body"),
    intro:
      "Over 30% of average enterprise cloud spend is wasted on idle instances, unattached storage, and misaligned commitments. Our FinOps squad performs continuous, automated rightsizing and reservation management so you only pay for what you consume.",
    highlights: [
      "Complimentary 14-Day Cloud Cost Audit",
      "Automated resource scheduling and rightsizing",
      "Real-time anomaly alerts preventing surprise invoices",
    ],
    offerings: [
      { title: "Cost audit", description: "Complimentary 14-day assessment of cloud waste and savings.", icon: LineChart },
      { title: "Rightsizing", description: "Automated scheduling and instance optimization.", icon: Server },
      { title: "Anomaly alerts", description: "Real-time spend signals before invoices spike.", icon: Shield },
    ],
  },
  {
    slug: "multi-cloud-billing",
    title: "Multi-Cloud Billing & Spend Management",
    shortTitle: "Billing",
    tagline: "One Vendor. Three Clouds. Zero Financial Complexity.",
    heroImage: IMG("cloud-operations"),
    bodyImage: IMG("cloud-operations-body"),
    intro:
      "Streamline your procurement process. Consolidate your AWS, Azure, and GCP bills into a single, transparent monthly invoice with custom discount structures, simplified AUD/INR billing, and no administrative friction.",
    highlights: [
      "Single-window billing management across AWS, Azure, and GCP",
      "Unlocks custom partner discount structures and volume rebates",
      "Dedicated billing specialists managing commitment plans",
    ],
    offerings: [
      { title: "Single invoice", description: "One transparent bill across all hyperscalers.", icon: Receipt },
      { title: "Partner discounts", description: "Custom structures and volume rebates unlocked.", icon: LineChart },
      { title: "Commitment plans", description: "Specialists managing reservations and spend plans.", icon: Users },
    ],
  },
  {
    slug: "managed-cloud-services",
    title: "24/7/365 NOC & SOC Command Center",
    shortTitle: "NOC & SOC",
    tagline: "Military-Grade Security. Always-On Operational Resilience.",
    heroImage: IMG("managed-cloud-services"),
    bodyImage: IMG("managed-cloud-services-body"),
    intro:
      "Sleep soundly knowing your cloud environment is monitored, optimized, and defended around the clock. Our fully operational, enterprise-grade Network Operations Center (NOC) and Security Operations Center (SOC) ensure zero blind spots, proactive threat hunting, and rapid incident response.",
    highlights: [
      "24/7/365 Live Monitoring: Automated health checks across all multi-cloud endpoints",
      "Autonomous Threat Triage: Real-time SIEM log ingestion and incident remediation",
      "Strict SLAs: Guarantees fast response and resolution times for mission-critical alerts",
      "Regulatory Compliance: Fully aligned with strict data security standards",
    ],
    offerings: [
      { title: "Live monitoring", description: "Automated health checks across multi-cloud endpoints.", icon: Headphones },
      { title: "Threat triage", description: "SIEM ingestion and autonomous incident remediation.", icon: Shield },
      { title: "SLA & compliance", description: "Mission-critical response times and data security standards.", icon: Server },
    ],
  },
  {
    slug: "ai-coe",
    title: "AI Center of Excellence (CoE)",
    shortTitle: "AI CoE",
    tagline: "From Raw Data to Autonomous Enterprise AI.",
    heroImage: IMG("app-modernization"),
    bodyImage: IMG("app-modernization-body"),
    intro:
      "Stop experimenting with static AI chatbots - build production-ready intelligence that drives top-line revenue. The Cache Digitech AI CoE builds customized Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) pipelines, and autonomous agentic workflows natively on AWS Bedrock, Azure OpenAI, and GCP Vertex AI.",
    highlights: [
      "Funded AI PoC Program: Test customized Generative AI use cases in under 3 weeks using hyperscaler credits",
      "Enterprise Search & Knowledge Engines: Turn internal PDFs, logs, and database streams into instant natural-language query tools",
      "Autonomous Workflow Automation: Deploy intelligent AI agents to automate L1 support, threat triage, and repetitive back-office tasks",
    ],
    offerings: [
      { title: "Funded PoCs", description: "Generative AI use cases live in under 3 weeks with credits.", icon: Sparkles },
      { title: "Knowledge engines", description: "Natural-language search over PDFs, logs, and data streams.", icon: Cloud },
      { title: "Agentic workflows", description: "AI agents for L1 support, triage, and back-office tasks.", icon: Workflow },
    ],
  },
  {
    slug: "cloud-consulting",
    title: "Cloud Consulting",
    shortTitle: "Consulting",
    tagline: "Expert guidance from discovery through execution.",
    heroImage: IMG("cloud-consulting"),
    bodyImage: IMG("cloud-consulting-body"),
    intro:
      "Work alongside senior practitioners to clarify goals, choose platforms, and de-risk complex programs - from first landing zone to global scale-out.",
    highlights: [
      "Vendor-neutral advice across AWS, Azure, and GCP",
      "Architecture reviews and well-architected alignment",
      "Program structure, milestones, and stakeholder comms",
    ],
    offerings: [
      { title: "Advisory workshops", description: "Executive and technical sessions to align on outcomes.", icon: Users },
      { title: "Solution design", description: "HLD/LLD, patterns, and proof-of-value plans.", icon: LayoutGrid },
      { title: "Delivery oversight", description: "Quality gates, risk tracking, and knowledge transfer.", icon: Cloud },
    ],
  },
  {
    slug: "cloud-architecture",
    title: "Cloud Architecture",
    shortTitle: "Architecture",
    tagline: "Landing zones, scalability, and resilient system design.",
    heroImage: IMG("cloud-architecture"),
    bodyImage: IMG("cloud-architecture-body"),
    intro:
      "Design foundations that scale: multi-account structures, networking, identity, observability, and disaster recovery - documented for your teams to own.",
    highlights: [
      "Landing zone and multi-account strategy",
      "Network, edge, and global traffic patterns",
      "DR, backup, and recovery architecture",
    ],
    offerings: [
      { title: "Reference architecture", description: "Diagrams, standards, and reusable building blocks.", icon: LayoutGrid },
      { title: "Non-functional requirements", description: "Performance, RPO/RTO, and compliance-by-design.", icon: Shield },
      { title: "Patterns & automation", description: "IaC-ready designs and guardrails for builders.", icon: Workflow },
    ],
  },
  {
    slug: "devops-automation",
    title: "DevOps & Automation",
    shortTitle: "DevOps",
    tagline: "CI/CD, GitOps, and infrastructure as code at enterprise scale.",
    heroImage: IMG("devops-automation"),
    bodyImage: IMG("devops-automation-body"),
    intro:
      "Accelerate delivery with automated pipelines, repeatable environments, and measurable quality gates - from commit to production.",
    highlights: [
      "CI/CD pipeline design and implementation",
      "IaC, GitOps, and environment promotion patterns",
      "Testing automation and release governance",
    ],
    offerings: [
      { title: "Pipeline engineering", description: "Build, test, scan, deploy with approval workflows.", icon: Workflow },
      { title: "IaC & GitOps", description: "Terraform, ARM, CloudFormation, or GitOps operators.", icon: GitBranch },
      { title: "Platform enablement", description: "Developer portals, templates, and golden paths.", icon: Cloud },
    ],
  },
];

export const cloudSubPageBySlug = Object.fromEntries(
  cloudSubPages.map((p) => [p.slug, p])
) as Record<CloudSubPageSlug, CloudSubPageDef>;

export function isCloudSubPageSlug(s: string): s is CloudSubPageSlug {
  return s in cloudSubPageBySlug;
}
