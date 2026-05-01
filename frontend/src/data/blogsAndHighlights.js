/**
 * Hardcoded blogs and latest highlights (no database).
 * Blog images are stored in public/blog/ as webp (see scripts/download-blog-images.mjs).
 */

export const HARDCODED_BLOGS = [
  {
    id: 5,
    title: 'Unlocking Business Value with Enterprise AI: A Strategic Guide',
    excerpt: 'How intelligent automation is transforming enterprise operations - from streamlining workflows to enabling data-driven decisions at scale.',
    author: 'Cache Digitech',
    date: '2025-03-10',
    category: 'AI & Data',
    readTime: '7 min',
    image: '/blog/blog-1-ai-enterprise.webp',
    content: `Enterprise adoption of artificial intelligence has moved from pilot projects to core business strategy. Organizations that integrate AI into their operations report significant gains in efficiency, customer experience, and decision quality. This article outlines how to approach AI adoption in a structured, measurable way.

The first step is to identify high-impact use cases that align with business objectives. Common starting points include customer service automation, predictive maintenance, demand forecasting, and intelligent document processing. Prioritizing use cases with clear ROI and manageable data requirements reduces risk and accelerates time to value.

Data readiness is critical. AI initiatives depend on accessible, clean, and well-governed data. Many enterprises find that data integration and quality work - often in partnership with experienced system integrators - delivers as much value as the AI models themselves. Establishing a data foundation early pays dividends across analytics and AI.

Implementation should follow a phased approach: proof of concept, pilot with a defined scope, and then scaled rollout with monitoring and governance. Cache Digitech supports clients through each phase, from architecture design and integration to ongoing optimization, ensuring that AI investments translate into sustained business outcomes.`,
  },
  {
    id: 6,
    title: 'Hybrid Cloud Architecture: Best Practices for Modern Enterprises',
    excerpt: 'Designing and operating workloads across on-premises and multiple clouds while maintaining security, cost control, and flexibility.',
    author: 'Cache Digitech',
    date: '2025-03-08',
    category: 'Cloud',
    readTime: '8 min',
    image: '/blog/blog-2-hybrid-cloud.webp',
    content: `Hybrid cloud has become the default operating model for many enterprises. By combining on-premises infrastructure with public and private cloud services, organizations can optimize for performance, compliance, and cost while preserving flexibility for future change.

A successful hybrid strategy starts with a clear workload placement framework. Not every application belongs in the public cloud; latency-sensitive, highly regulated, or legacy systems often remain on-premises or in a dedicated private cloud. Defining placement criteria - based on data sovereignty, performance, and total cost of ownership - helps teams make consistent, defensible decisions.

Network and identity are the backbone of hybrid operations. Reliable connectivity between locations, consistent identity and access management, and unified monitoring are non-negotiable. Many enterprises adopt a cloud management platform or central operations hub to maintain visibility and control across environments.

Migration and modernization should be iterative. Lift-and-shift can deliver quick wins, but refactoring and re-architecting key applications for cloud-native patterns often yield better long-term outcomes. Partnering with an integration specialist like Cache Digitech can help you balance speed with strategic technical debt management and achieve a sustainable hybrid cloud posture.`,
  },
  {
    id: 7,
    title: 'Cybersecurity in the Hybrid Cloud Era: Protecting Your Digital Estate',
    excerpt: 'Practical strategies to secure workloads, data, and identities across on-premises and multi-cloud environments.',
    author: 'Cache Digitech',
    date: '2025-03-06',
    category: 'Security',
    readTime: '7 min',
    image: '/blog/blog-3-cybersecurity.webp',
    content: `As enterprises extend their footprint across data centers and multiple clouds, the attack surface grows. Cybersecurity must evolve from perimeter-focused models to identity-centric, data-aware protection that works consistently wherever workloads run.

Identity and access management (IAM) is the cornerstone. Strong authentication, least-privilege access, and centralized identity governance reduce the risk of credential misuse and lateral movement. Implementing single sign-on and multi-factor authentication across all environments is a baseline expectation for modern security postures.

Data protection requires encryption in transit and at rest, plus clear policies for classification and handling. In hybrid and multi-cloud setups, key management and data loss prevention need to work across boundaries. Many organizations adopt a unified security operations center (SOC) or extended detection and response (XDR) to get a single view of threats and anomalies.

Compliance and audit readiness are ongoing requirements. Regulations such as GDPR, HIPAA, and sector-specific mandates demand documented controls and evidence. Working with a partner that understands both technology and compliance helps you design security that meets today’s standards and adapts to tomorrow’s. Cache Digitech’s cybersecurity practice helps clients assess, design, and operate secure hybrid and cloud environments.`,
  },
  {
    id: 1,
    title: 'Digital Transformation: From Strategy to Execution',
    excerpt: 'Turning digital ambitions into measurable outcomes through clear governance, capability building, and the right technology partnerships.',
    author: 'Cache Digitech',
    date: '2025-03-04',
    category: 'Strategy',
    readTime: '6 min',
    image: '/blog/blog-4-digital-transformation.webp',
    content: `Digital transformation is less about technology for its own sake and more about reimagining how the organization creates value for customers and operates at scale. Success depends on aligning strategy, people, process, and technology in a coherent program.

Leadership alignment is essential. Transformation programs that lack executive sponsorship or cross-functional ownership often stall. Defining a clear vision, set of priorities, and success metrics - and communicating them consistently - helps align teams and manage expectations.

Capability building goes hand in hand with technology adoption. Upskilling existing staff, hiring for new roles, and establishing centers of excellence create the human foundation for sustained change. Training and change management are often under-invested; they are critical to adoption and ROI.

Technology selection should support business outcomes rather than drive them. Cloud, data platforms, integration, and security form the backbone of most transformations. Working with a system integrator that understands your industry and can deliver end-to-end - from strategy and design to implementation and support - reduces risk and accelerates results. Cache Digitech has helped numerous enterprises navigate this journey with structured methodologies and proven delivery.`,
  },
  {
    id: 2,
    title: 'Data-Driven Decision Making: Building an Analytics-Ready Organization',
    excerpt: 'How to turn data into a strategic asset and embed analytics into daily operations and long-term planning.',
    author: 'Cache Digitech',
    date: '2025-03-02',
    category: 'AI & Data',
    readTime: '6 min',
    image: '/blog/blog-5-data-driven.webp',
    content: `Organizations that treat data as a strategic asset consistently outperform those that do not. The difference lies not only in technology but in governance, culture, and the ability to turn insights into action.

A modern data architecture typically includes a central data lake or warehouse, integrated data pipelines, and curated datasets for business intelligence and advanced analytics. Cloud data platforms have made it easier to scale storage and compute and to adopt machine learning, but they require thoughtful design to avoid sprawl and cost overruns.

Data governance - ownership, quality, privacy, and security - is what makes data trustworthy and usable. Defining roles, standards, and processes early helps prevent conflicting definitions and duplicate efforts. Many enterprises establish a data office or steering committee to maintain focus and resolve trade-offs.

From there, use cases drive adoption. Starting with high-visibility reports, self-service dashboards, or targeted predictive models builds credibility and creates demand for more. Cache Digitech supports clients in designing data platforms, implementing pipelines, and enabling analytics and AI use cases so that data truly drives decisions.`,
  },
  {
    id: 3,
    title: 'Building Resilient IT Infrastructure for the Modern Enterprise',
    excerpt: 'Designing for availability, scalability, and future growth across data center and cloud.',
    author: 'Cache Digitech',
    date: '2025-02-28',
    category: 'Infrastructure',
    readTime: '7 min',
    image: '/blog/blog-6-infrastructure.webp',
    content: `Resilience is the ability to maintain or quickly restore operations in the face of failures, demand spikes, or disruptive events. For IT infrastructure, that means designing for redundancy, automation, and observability from the outset.

High availability starts with eliminating single points of failure. That applies to hardware, network paths, power, and critical application components. In cloud and hybrid setups, multi-AZ or multi-region designs and failover procedures must be tested regularly. Many organizations adopt infrastructure as code (IaC) to ensure consistency and repeatability across environments.

Scalability - both horizontal and vertical - should be planned for growth and variability. Auto-scaling and load balancing in the cloud help manage cost while meeting performance requirements. On-premises, capacity planning and modular expansion strategies keep options open without over-provisioning.

Monitoring, alerting, and incident management complete the picture. Without visibility into performance, capacity, and errors, teams cannot respond effectively. Establishing runbooks, escalation paths, and post-incident reviews builds organizational resilience. Cache Digitech helps enterprises design, build, and operate infrastructure that meets these goals, whether on-premises, in the cloud, or in a hybrid model.`,
  },
  {
    id: 8,
    title: 'The Value of Managed Services: Focus on Business, Not Infrastructure',
    excerpt: 'How managed services free internal teams to innovate while experts handle operations, security, and continuous improvement.',
    author: 'Cache Digitech',
    date: '2025-02-26',
    category: 'Managed Services',
    readTime: '6 min',
    image: '/blog/blog-7-managed-services.webp',
    content: `Managed services allow organizations to offload day-to-day operation, maintenance, and support of IT systems to specialized providers. The result is often better availability, security, and cost predictability - and more capacity for internal teams to focus on strategic initiatives.

The scope of managed services can range from infrastructure (servers, storage, network) to applications, security, and end-user support. Defining clear boundaries, service levels, and escalation paths in the contract and operating model is essential. Well-defined SLAs and regular governance meetings keep both parties aligned.

Choosing a partner with deep expertise in your technology stack and industry reduces risk. Look for proven delivery, certifications, and references. The best managed service providers act as an extension of your team, offering proactive recommendations and continuous improvement, not just break-fix support.

Cost is often a driver, but the real benefit is predictability and the ability to scale expertise up or down as needs change. Cache Digitech’s managed services practice combines operational excellence with a strong understanding of modern infrastructure and security, helping clients run their technology reliably while they focus on growth.`,
  },
  {
    id: 4,
    title: 'Cloud Migration: Planning and Executing a Successful Move',
    excerpt: 'A structured approach to moving workloads to the cloud while minimizing risk and maximizing business value.',
    author: 'Cache Digitech',
    date: '2025-02-24',
    category: 'Cloud',
    readTime: '8 min',
    image: '/blog/blog-8-cloud-migration.webp',
    content: `Cloud migration is a major undertaking that can deliver agility, scalability, and cost benefits - when executed with a clear plan and the right expertise. Rushed or ad-hoc migrations often lead to cost overruns, performance issues, and security gaps.

A migration program typically begins with discovery and assessment. Inventory applications and dependencies, classify by complexity and criticality, and estimate effort and risk. Many organizations use a framework such as the 6 Rs (rehost, replatform, repurchase, refactor, retire, retain) to decide the right approach per workload.

Prioritization and sequencing matter. Migrate in waves, starting with less critical or more cloud-ready workloads to build experience and confidence. Dependencies between systems must be mapped so that migration order does not break integrations or business processes.

Execution requires strong project management, technical leadership, and often partnership with a system integrator. Testing, cutover, and hypercare phases should be planned in detail. Post-migration optimization - right-sizing, reserved capacity, and architectural improvements - often unlocks additional value. Cache Digitech supports clients through the full migration lifecycle, from strategy and assessment to execution and optimization.`,
  },
  {
    id: 9,
    title: 'Zero Trust Security: Why Assume Breach and Verify Explicitly',
    excerpt: 'Implementing zero trust principles to protect identities, devices, and data in a perimeter-less world.',
    author: 'Cache Digitech',
    date: '2025-02-22',
    category: 'Security',
    readTime: '7 min',
    image: '/blog/blog-9-zero-trust.webp',
    content: `Zero trust is a security model that assumes the network is already compromised and therefore does not rely on network location as a basis for trust. Every access request is verified explicitly, and least-privilege access is enforced consistently.

Core zero trust principles include verifying identity (strong authentication, MFA), validating device health (compliance, patch level), limiting access (just-in-time, just-enough), and segmenting applications and data. Micro-segmentation and software-defined perimeters reduce lateral movement and limit blast radius.

Implementation is typically phased. Start with identity and access: multi-factor authentication, conditional access policies, and identity governance. Then extend to device trust and application access controls. Network segmentation and data protection can follow as the program matures.

Zero trust is as much about culture and process as technology. It requires collaboration between security, IT, and business units. Partnering with experts who have implemented zero trust in similar environments can accelerate adoption and avoid common pitfalls. Cache Digitech’s security practice helps organizations assess their readiness, design a roadmap, and implement zero trust controls that align with business and risk tolerance.`,
  },
  {
    id: 10,
    title: 'The Future of Work: Technology, Experience, and Security',
    excerpt: 'How hybrid work, employee experience, and secure digital ecosystems are shaping the next era of enterprise technology.',
    author: 'Cache Digitech',
    date: '2025-02-20',
    category: 'Workplace',
    readTime: '6 min',
    image: '/blog/blog-10-future-of-work.webp',
    content: `The way we work has changed for good. Hybrid and remote models are now standard, and employees expect seamless, secure access to tools and data from anywhere. Delivering a great employee experience while maintaining security and compliance is a key differentiator for organizations.

Unified communication and collaboration platforms - backed by reliable network and identity - form the foundation. Ensuring consistent performance, whether at the office or at home, requires attention to connectivity, device management, and support. Employee experience (EX) initiatives that simplify onboarding, self-service, and help desk interactions improve satisfaction and productivity.

Security cannot be an afterthought. Endpoint protection, conditional access, data loss prevention, and security awareness training are essential in a distributed workforce. Balancing usability with security - for example, through single sign-on and managed devices - reduces friction while maintaining control.

IT leaders are increasingly measured on both operational metrics and EX outcomes. Partnering with a provider that understands workplace technology, security, and user experience helps you build a future-ready environment. Cache Digitech supports enterprises in designing and managing the technology that powers modern work, so your people can perform at their best.`,
  },
];

/** Card art: local WebP under public/images/highlights (from each post’s og:image). Re-fetch: npm run images:highlights */
export const HARDCODED_HIGHLIGHTS = [
  {
    image: "/images/highlights/highlight-01.webp",
    tag: "Award & Recognition",
    title: "Ingram Micro APAC Female Leader of the Year 2025",
    description:
      "Our leadership was honoured with the Ingram Micro APAC Female Leader of the Year 2025 award, announced at the Ingram Micro ONE Global Innovation Summit in Washington, DC, and later presented at the Pinnacle Summit in India. This recognition reflects the trust of our customers, the support of our partners, and the dedication of our team working with a strong customer-first mindset.",
    type: "Article",
    link: "https://www.linkedin.com/posts/prarthana-gupta-112510a5_apacfemaleleaderoftheyear-ingrammicro-washingtondc-activity-7419750364259762177-fmvf/",
  },
  {
    image: "/images/highlights/highlight-02.webp",
    tag: "Event",
    title: "Cache Digitech at India Mobile Congress 2025",
    description:
      "At IMC 2025, we reaffirmed our commitment to designing, building, and managing technology ecosystems that power modern enterprises. For over three decades, Cache Digitech has been enabling innovation across IT Infrastructure, Cloud, Cybersecurity, Data & AI, and Managed Services - ensuring technology runs seamlessly and delivers excellence every day.",
    type: "Article",
    link: "https://www.linkedin.com/posts/prarthana-gupta-112510a5_technology-breathe-cache-activity-7383343055010979840-Jay2/",
  },
  {
    image: "/images/highlights/highlight-03.webp",
    tag: "Award",
    title: "Acquisition Champion Award at Dell Technologies Partner Summit India 2025",
    description:
      "Cache Digitech was honored with the Acquisition Champion Award at the Dell Technologies Partner Summit India 2025, recognizing our innovative customer acquisition strategy. This achievement reflects the dedication of Team Cache and the strong partnership we share with Dell Technologies in driving growth and innovation.",
    type: "Article",
    link: "https://www.linkedin.com/posts/prarthana-gupta-112510a5_delltechnologies-cache-partnerships-activity-7369212066651394048-KO8s/",
  },
  {
    image: "/images/highlights/highlight-04.webp",
    tag: "Award & Recognition",
    title: "Cache Digitech Named Nutanix Enterprise Partner of the Year – North",
    description:
      "Cache Digitech has been recognized as the \"Enterprise Partner of the Year – North\" by Nutanix, highlighting our strong capabilities in delivering enterprise-grade infrastructure and cloud solutions. This recognition reflects the trust of our partners and the dedication of Team Cache in driving impactful technology outcomes for customers.",
    type: "Article",
    link: "https://www.linkedin.com/posts/prarthana-gupta-112510a5_we-are-delighted-to-share-that-cache-digitech-activity-7351302613625155584-T3lR/",
  },
  {
    image: "/images/highlights/highlight-05.webp",
    tag: "Event",
    title: "Women in Tech: Diverse Minds, Disruptive Ideas at IMC 2025",
    description:
      "At India Mobile Congress 2025, Cache Digitech's leadership moderated the session \"Women in Tech: Diverse Minds, Disruptive Ideas,\" highlighting the importance of diversity in driving innovation. The discussion brought together industry leaders to explore strategies for empowering women in technology and building more inclusive, forward-thinking workplaces.",
    type: "Article",
    link: "https://www.linkedin.com/posts/nitika-mehta-b7b11a18_imc2025-digitalindia-telecom-ugcPost-7382066224739848192-gECd/",
  },
  {
    image: "/images/highlights/highlight-06.webp",
    tag: "Award & Recognition",
    title: "Dell Technologies Channel Partner of the Year – Services Business India (FY24)",
    description:
      "Cache Digitech was honored with the Channel Partner of the Year – Services Business India (FY24) award by Dell Technologies. This recognition highlights our commitment to delivering innovative IT services and reflects the dedication of Team Cache and the strong partnerships that drive our continued success.",
    type: "Article",
    link: "https://www.linkedin.com/posts/cache-digitech-pvt-ltd_award-servicesbusinessinida-itsector-ugcPost-7215991568502071296-7lZQ/",
  },
  {
    image: "/images/highlights/highlight-07.webp",
    tag: "Event",
    title: "Fireside Chat on the Future of Work at ETCIO Annual Conclave 2024",
    description:
      "At ETCIO Annual Conclave 2024, Cache Digitech leadership participated in an exclusive fireside chat on the Future of Work, exploring Employee Experience (EX), Customer Experience (CX), and Security. The session highlighted how hybrid workplaces, evolving workforce expectations, and secure digital ecosystems are shaping the next era of enterprise technology.",
    type: "Article",
    link: "https://www.linkedin.com/posts/etcio_etcioac24-etcio-etcioac24-activity-7200119202781814784-CEya/",
  },
];
