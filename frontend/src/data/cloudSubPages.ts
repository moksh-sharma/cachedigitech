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
  | "devops-automation";

export type CloudSubPageDef = {
  slug: CloudSubPageSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  heroImage: string;
  /** Secondary image in content section */
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
    slug: "app-modernization",
    title: "App Modernization",
    shortTitle: "Modernization",
    tagline: "From monoliths to scalable, cloud-native patterns.",
    heroImage: IMG("app-modernization"),
    bodyImage: IMG("app-modernization-body"),
    intro:
      "Refactor, re-platform, or rebuild applications to unlock elasticity, resilience, and faster release cycles - without losing business continuity.",
    highlights: [
      "Microservices and API-first design",
      "Containers, serverless, and managed platforms",
      "Data and integration modernization alongside apps",
    ],
    offerings: [
      { title: "Portfolio analysis", description: "6R-style classification and modernization sequencing.", icon: LayoutGrid },
      { title: "Cloud-native build", description: "Kubernetes, serverless, and managed PaaS where they fit best.", icon: Cloud },
      { title: "Quality & release", description: "Testing strategy, blue/green, and rollback-safe deployments.", icon: Workflow },
    ],
  },
  {
    slug: "cloud-operations",
    title: "Cloud Operations",
    shortTitle: "Operations",
    tagline: "Reliable day-2 ops: SRE practices, observability, and cost discipline.",
    heroImage: IMG("cloud-operations"),
    bodyImage: IMG("cloud-operations-body"),
    intro:
      "Keep production healthy with clear SLIs/SLOs, incident response, capacity planning, and FinOps-aware operations tuned to your risk profile.",
    highlights: [
      "24×7-ready operating procedures and escalation",
      "Observability, alerting, and performance tuning",
      "Change, patch, and configuration governance",
    ],
    offerings: [
      { title: "Service operations", description: "Incident, problem, and change aligned to ITIL where needed.", icon: Headphones },
      { title: "Platform reliability", description: "SRE practices, error budgets, and resilience testing.", icon: Server },
      { title: "Optimization", description: "Rightsizing, reservations, and continuous improvement loops.", icon: LineChart },
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
    slug: "cloud-migration",
    title: "Cloud Migration",
    shortTitle: "Migration",
    tagline: "Move workloads safely with minimal disruption.",
    heroImage: IMG("cloud-migration"),
    bodyImage: IMG("cloud-migration-body"),
    intro:
      "Plan and execute migrations with dependency mapping, wave planning, cutover rehearsal, and hypercare - whether you rehost, replatform, or refactor.",
    highlights: [
      "Discovery, sizing, and migration factory approach",
      "Database and data movement with validation",
      "Cutover, rollback, and business continuity planning",
    ],
    offerings: [
      { title: "Migration assessment", description: "Inventory, 6Rs classification, and TCO modeling.", icon: LineChart },
      { title: "Execution waves", description: "Tooling, automation, and repeatable migration runbooks.", icon: Upload },
      { title: "Validation & cutover", description: "Testing, parity checks, and go-live support.", icon: Server },
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
    slug: "managed-cloud-services",
    title: "Managed Cloud Services",
    shortTitle: "Managed cloud",
    tagline: "Hands-on management of your cloud estate.",
    heroImage: IMG("managed-cloud-services"),
    bodyImage: IMG("managed-cloud-services-body"),
    intro:
      "Offload routine operations while staying in control. We monitor, patch, optimize, and report-so your teams focus on products, not plumbing.",
    highlights: [
      "Proactive monitoring and incident handling",
      "Patch, backup, and configuration lifecycle",
      "Cost and capacity reviews with clear reporting",
    ],
    offerings: [
      { title: "Managed infrastructure", description: "Compute, storage, and core platform services.", icon: Server },
      { title: "Service desk integration", description: "Ticketing, SLAs, and escalation paths.", icon: Headphones },
      { title: "Continuous improvement", description: "Monthly reviews, recommendations, and roadmap.", icon: LineChart },
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
