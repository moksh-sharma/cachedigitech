import type { SectionConfig } from "./serviceSubPageTypes";
import {
  Database,
  LineChart,
  Bot,
  Users,
  Shield,
  LayoutGrid,
  TrendingUp,
  Workflow,
} from "lucide-react";

const IMG = (name: string) => `/images/${name}`;

export const dataAnalyticsSubPages: SectionConfig = {
  overviewRoute: "/aianddataservice",
  sectionTitle: "Data Analytics & AI",
  badgeLabel: "Data & AI",
  overviewLabel: "Data Analytics & AI overview",
  pages: [
    {
      slug: "data-platforms",
      title: "Data Platforms",
      shortTitle: "Data Platforms",
      tagline: "Modern data lakes, warehouses, and unified data foundations.",
      heroImage: IMG("GenAIback.webp"),
      bodyImage: IMG("dataai.webp"),
      intro:
        "We design and implement cloud-native data platforms - data lakes, lakehouses, and warehouses - to centralize and govern your data for analytics and AI. From ingestion and storage to cataloging and quality, we build scalable foundations for real-time and batch workloads.",
      highlights: [
        "Data lake and lakehouse design and implementation",
        "Unified cataloging, lineage, and data quality",
        "Batch and real-time ingestion pipelines",
      ],
      offerings: [
        { title: "Architecture & design", description: "Scalable data platform blueprints aligned to business use cases.", icon: LayoutGrid },
        { title: "Ingestion & storage", description: "ETL/ELT, streaming, and tiered storage strategies.", icon: Database },
        { title: "Governance & quality", description: "Catalog, lineage, and data quality frameworks.", icon: Shield },
      ],
    },
    {
      slug: "advanced-analytics",
      title: "Advanced Analytics",
      shortTitle: "Advanced Analytics",
      tagline: "BI, forecasting, and insight-driven decision support.",
      heroImage: IMG("GenAIback.webp"),
      bodyImage: IMG("dataai.webp"),
      intro:
        "Turn data into decisions with self-service BI, dashboards, and advanced analytics - forecasting, segmentation, and predictive models. We enable business and technical users to explore data and act on insights with governance and performance at scale.",
      highlights: [
        "Self-service BI and executive dashboards",
        "Statistical and predictive analytics",
        "Reporting and visualization best practices",
      ],
      offerings: [
        { title: "BI & reporting", description: "Self-service BI platforms and standardized reporting.", icon: LineChart },
        { title: "Predictive analytics", description: "Forecasting, segmentation, and model deployment.", icon: TrendingUp },
        { title: "Data products", description: "Reusable datasets and analytics products for the enterprise.", icon: Database },
      ],
    },
    {
      slug: "ai-automation",
      title: "AI Automation",
      shortTitle: "AI Automation",
      tagline: "ML ops, automation, and intelligent process improvement.",
      heroImage: IMG("GenAIback.webp"),
      bodyImage: IMG("dataai.webp"),
      intro:
        "We implement AI and ML at scale - from model development and MLOps to GenAI integration and intelligent automation. Automate workflows, improve accuracy, and embed AI into products and operations with responsible governance.",
      highlights: [
        "MLOps, model lifecycle, and feature stores",
        "GenAI integration and responsible AI governance",
        "Process automation and intelligent workflows",
      ],
      offerings: [
        { title: "ML & MLOps", description: "Model development, deployment, and continuous retraining.", icon: Bot },
        { title: "GenAI enablement", description: "LLM integration, prompt engineering, and guardrails.", icon: Workflow },
        { title: "Automation", description: "Intelligent process automation and decision support.", icon: LineChart },
      ],
    },
    {
      slug: "intelligent-crm",
      title: "Intelligent CRM",
      shortTitle: "Intelligent CRM",
      tagline: "Data-driven customer engagement and lifecycle analytics.",
      heroImage: IMG("GenAIback.webp"),
      bodyImage: IMG("dataai.webp"),
      intro:
        "Unify customer data and analytics to power CRM and engagement - 360° views, segmentation, churn prediction, and campaign effectiveness. We integrate data platforms with CRM and marketing tools for insight-driven customer strategies.",
      highlights: [
        "Customer 360 and unified data models",
        "Segmentation, propensity, and churn analytics",
        "CRM and marketing tool integration",
      ],
      offerings: [
        { title: "Customer data", description: "Unified customer profiles and consent-aware data.", icon: Users },
        { title: "Analytics & insights", description: "Segmentation, propensity models, and campaign analytics.", icon: LineChart },
        { title: "Integration", description: "CRM, marketing automation, and channel integration.", icon: Workflow },
      ],
    },
    {
      slug: "data-security-governance",
      title: "Data Security & Governance",
      shortTitle: "Data Security & Governance",
      tagline: "Privacy, compliance, and secure data lifecycle.",
      heroImage: IMG("GenAIback.webp"),
      bodyImage: IMG("dataai.webp"),
      intro:
        "We implement data governance and security so analytics and AI run on a compliant, auditable foundation - classification, access controls, privacy-by-design, and alignment to GDPR, DPDP, and industry regulations.",
      highlights: [
        "Data classification and access policies",
        "Privacy-by-design and consent management",
        "Audit trails and compliance reporting",
      ],
      offerings: [
        { title: "Governance framework", description: "Policies, stewardship, and data ownership.", icon: Shield },
        { title: "Security & privacy", description: "Encryption, access control, and privacy controls.", icon: Shield },
        { title: "Compliance", description: "Regulatory alignment and audit-ready reporting.", icon: LineChart },
      ],
    },
  ],
};
