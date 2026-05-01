import type { SectionConfig } from "./serviceSubPageTypes";
import {
  Server,
  LayoutGrid,
  Wrench,
  Settings,
  Building2,
  Cpu,
  Network,
  HardDrive,
  RefreshCw,
  Shield,
} from "lucide-react";

const IMG = (name: string) => `/images/${name}`;

export const infrastructureSubPages: SectionConfig = {
  overviewRoute: "/infrastructureservice",
  sectionTitle: "Infrastructure & Networking",
  badgeLabel: "Infrastructure",
  overviewLabel: "Infrastructure overview",
  pages: [
    {
      slug: "infrastructure-consulting",
      title: "Infrastructure Consulting",
      shortTitle: "Infrastructure Consulting",
      tagline: "Assessment, strategy, and architecture for infrastructure and data protection.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We design the right infrastructure and data protection strategy - current-state server, storage, network, and backup assessment, RPO/RTO definition, risk and resilience assessment, and end-to-end architecture with capacity planning and cost optimization.",
      highlights: [
        "Infrastructure and data protection assessment",
        "Architecture and solution design for HA and BC/DR",
        "Capacity planning, sizing, and license optimization",
      ],
      offerings: [
        { title: "Assessment", description: "Current-state audit, gap analysis, and roadmap.", icon: LayoutGrid },
        { title: "Architecture design", description: "End-to-end infrastructure and backup architecture.", icon: Server },
        { title: "Capacity planning", description: "Compute, storage, backup sizing and forecasting.", icon: Cpu },
      ],
    },
    {
      slug: "infrastructure-design",
      title: "Infrastructure Design",
      shortTitle: "Infrastructure Design",
      tagline: "End-to-end infrastructure and backup architecture.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We deliver end-to-end infrastructure architecture - high availability, business continuity, and compliance-aligned designs for server, storage, network, and backup. From HLD to implementation-ready specs.",
      highlights: [
        "Server, storage, network, and backup architecture",
        "High availability and business continuity design",
        "Compliance-aligned designs",
      ],
      offerings: [
        { title: "Solution design", description: "HLD/LLD for compute, storage, and backup.", icon: LayoutGrid },
        { title: "HA & BC/DR", description: "Resilience and failover architecture.", icon: RefreshCw },
        { title: "Standards", description: "Reference architectures and best practices.", icon: Shield },
      ],
    },
    {
      slug: "infrastructure-deployment",
      title: "Infrastructure Deployment",
      shortTitle: "Infrastructure Deployment",
      tagline: "Rack, stack, virtualization, and validation.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We build stable, scalable compute and storage platforms - server deployment (rack and stack, firmware, OS hardening, validation), virtualization and HCI (VMware/Hyper-V/KVM), and storage implementation with zoning and performance validation.",
      highlights: [
        "Server deployment, firmware, OS, and validation",
        "Virtualization and HCI implementation",
        "Storage array installation and configuration",
      ],
      offerings: [
        { title: "Server deployment", description: "Rack and stack, BIOS/driver updates, hardening.", icon: Server },
        { title: "Virtualization & HCI", description: "VMware, Hyper-V, KVM, HA, and clustering.", icon: Cpu },
        { title: "Storage implementation", description: "Array config, zoning, LUNs, performance validation.", icon: HardDrive },
      ],
    },
    {
      slug: "infrastructure-management",
      title: "Infrastructure Management",
      shortTitle: "Infrastructure Management",
      tagline: "Ongoing optimization, performance, and lifecycle.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We optimize and manage your infrastructure lifecycle - performance tuning, VM right-sizing, server consolidation, availability enhancement, and proactive monitoring. Keep platforms healthy and cost-efficient.",
      highlights: [
        "Performance tuning and capacity optimization",
        "VM right-sizing and server consolidation",
        "Proactive monitoring and incident response",
      ],
      offerings: [
        { title: "Optimization", description: "Performance tuning and rightsizing.", icon: Settings },
        { title: "Lifecycle management", description: "Patch, upgrade, and decommissioning.", icon: Wrench },
        { title: "Monitoring", description: "Health, capacity, and alerting.", icon: Server },
      ],
    },
    {
      slug: "data-center-migration",
      title: "Data Center Migration",
      shortTitle: "Data Center Migration",
      tagline: "Plan and execute DC moves with minimal risk.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We plan and execute data center migrations - workload discovery, dependency mapping, wave planning, and cutover with validation and rollback strategy. Minimize downtime and risk for server, storage, and network moves.",
      highlights: [
        "Discovery, dependency mapping, and wave planning",
        "Application and data migration execution",
        "Cutover, validation, and hypercare",
      ],
      offerings: [
        { title: "Planning", description: "Inventory, dependencies, and wave design.", icon: LayoutGrid },
        { title: "Migration execution", description: "Workload and data migration with validation.", icon: RefreshCw },
        { title: "Cutover support", description: "Go-live and hypercare.", icon: Server },
      ],
    },
    {
      slug: "it-infrastructure-solutions",
      title: "IT Infrastructure Solutions",
      shortTitle: "IT Infrastructure",
      tagline: "End-to-end infrastructure solutions for enterprise IT.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We deliver full-stack IT infrastructure solutions - servers, storage, networking, and backup - aligned to your business and compliance needs. From design through deployment and managed operations.",
      highlights: [
        "Integrated server, storage, network, and backup",
        "Hybrid IT and cloud integration",
        "Vendor-neutral design and implementation",
      ],
      offerings: [
        { title: "Solution design", description: "Integrated infrastructure architecture.", icon: LayoutGrid },
        { title: "Implementation", description: "Deployment and integration services.", icon: Wrench },
        { title: "Support", description: "Ongoing management and optimization.", icon: Settings },
      ],
    },
    {
      slug: "data-center-management",
      title: "Data Center Management",
      shortTitle: "Data Center Management",
      tagline: "Operate and optimize your data center estate.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We manage data center operations - capacity, power, cooling, and asset lifecycle - with monitoring, change management, and continuous improvement. Ensure availability and efficiency across facilities.",
      highlights: [
        "Capacity, power, and cooling management",
        "Asset lifecycle and change management",
        "Monitoring and incident response",
      ],
      offerings: [
        { title: "Facility operations", description: "Capacity, power, cooling, and space.", icon: Building2 },
        { title: "Asset management", description: "Inventory, lifecycle, and refresh.", icon: Server },
        { title: "Operations", description: "Monitoring, change, and incident management.", icon: Settings },
      ],
    },
    {
      slug: "network-infrastructure",
      title: "Network Infrastructure (LAN/WAN/Wireless)",
      shortTitle: "Network Infrastructure",
      tagline: "Fast, secure, and resilient connectivity.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We design and deploy LAN, WAN, and wireless networks - VLANs, routing, switching, redundancy, and failover. Advanced networking includes leaf-spine, SDN, and traffic optimization with security (firewall, segmentation, zero-trust, remote access).",
      highlights: [
        "LAN, WAN, and data center network design",
        "VLANs, routing, switching, redundancy",
        "Network security and zero-trust design",
      ],
      offerings: [
        { title: "Network design", description: "LAN, WAN, DC networks, and redundancy.", icon: Network },
        { title: "Advanced networking", description: "Leaf-spine, SDN, QoS.", icon: LayoutGrid },
        { title: "Security", description: "Firewall, segmentation, secure remote access.", icon: Shield },
      ],
    },
    {
      slug: "server-storage-management",
      title: "Server & Storage Management",
      shortTitle: "Server & Storage",
      tagline: "Compute and storage operations and optimization.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We manage server and storage estates - provisioning, performance, capacity, and lifecycle. SAN, NAS, object storage, all-flash and hybrid, with data migration and validation for DB, ERP, VDI, and AI workloads.",
      highlights: [
        "Server and storage lifecycle management",
        "SAN, NAS, object, and tiered storage",
        "Data migration and validation",
      ],
      offerings: [
        { title: "Server management", description: "Provisioning, tuning, and lifecycle.", icon: Server },
        { title: "Storage management", description: "Arrays, LUNs, performance, and capacity.", icon: HardDrive },
        { title: "Data migration", description: "Storage and application data migration.", icon: RefreshCw },
      ],
    },
    {
      slug: "virtualization-hypervisor-management",
      title: "Virtualization & Hypervisor Management",
      shortTitle: "Virtualization",
      tagline: "VMware, Hyper-V, KVM, and HCI at scale.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We deploy and manage virtualization and hypervisor platforms - VMware, Hyper-V, KVM - and HCI with HA, clustering, and resource optimization. Ensure efficient, resilient virtual infrastructure.",
      highlights: [
        "VMware, Hyper-V, KVM deployment and management",
        "HCI implementation and HA/clustering",
        "Resource optimization and capacity planning",
      ],
      offerings: [
        { title: "Virtualization platforms", description: "VMware, Hyper-V, KVM deployment.", icon: Cpu },
        { title: "HCI", description: "Hyperconverged implementation and HA.", icon: Server },
        { title: "Optimization", description: "Resource and capacity optimization.", icon: Settings },
      ],
    },
    {
      slug: "backup-disaster-recovery",
      title: "Backup & Disaster Recovery",
      shortTitle: "Backup & DR",
      tagline: "Protect data and ensure rapid recovery.",
      heroImage: IMG("Infraback.webp"),
      bodyImage: IMG("infraa.webp"),
      intro:
        "We design and implement backup and DR - RPO/RTO-driven strategy, backup architecture (on-prem, cloud, hybrid), implementation (server, VM, DB, application), cloud backup, replication, DR runbooks, and scheduled testing.",
      highlights: [
        "Backup strategy, architecture, and implementation",
        "Cloud backup and long-term archival",
        "DR design, replication, runbooks, and testing",
      ],
      offerings: [
        { title: "Backup strategy", description: "RPO/RTO, retention, compliance.", icon: LayoutGrid },
        { title: "Implementation", description: "Backup software, encryption, immutability.", icon: HardDrive },
        { title: "DR", description: "Replication, runbooks, and DR testing.", icon: RefreshCw },
      ],
    },
  ],
};
