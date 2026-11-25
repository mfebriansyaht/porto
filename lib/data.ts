// Single source of truth for all site copy. Content mirrors the CV
// (Moch_Febriansyah_Trisnadi_CV.pdf, Nov 2025), except the freelance apps,
// which come from the previous site.

export const profile = {
  name: "Moch Febriansyah Trisnadi",
  shortName: "Febriansyah",
  title: "Full-Stack Engineer",
  subtitle: "Web, mobile & backend systems for banking",
  availability: "Open to Full-Stack roles",
  stack: ["Next.js", "Node.js", "Laravel", "Kotlin", "PostgreSQL", "Kafka", "Kubernetes"],
  location: "South Jakarta, Indonesia",
  summary:
    "Full-stack engineer with 4+ years of experience, including 3+ years building production web, mobile, and backend systems at PT Bank Mega Tbk. Developer on the M-Smile mobile banking revamp (Kotlin Multiplatform, Android & iOS) and the production Loyalty platform (Kafka, Redis Cluster, Cassandra, Kubernetes). Experienced in end-to-end delivery of secure, regulation-compliant systems, from functional specifications (FSD) and system integration testing (SIT) to production deployment and monitoring, including automation of finance operations such as reconciliation, payment posting, and settlement reporting.",
  photo: "/profile.webp",
  cvUrl: "/Moch_Febriansyah_Trisnadi_CV.pdf",
} as const;

export const contact = {
  email: "mfebriansyaht@gmail.com",
  whatsapp: "https://wa.me/6281910233934",
  linkedin: "https://www.linkedin.com/in/mfebriansyaht",
  github: "https://github.com/mfebriansyaht",
};

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 4, suffix: "+", label: "Years experience" },
];

export type CaseStudy = {
  id: "finance-ops" | "m-smile" | "loyalty";
  title: string;
  role: "Developer";
  problem: string;
  built: string[];
  outcome: string;
  layers: { label: string; items: string[] }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "finance-ops",
    title: "Finance Operations Automation",
    role: "Developer",
    problem:
      "Reconciliation, GL posting, settlement, forex claims and Mark-to-Market statements relied on manual Excel processes.",
    built: [
      "Third-party biller reconciliation (Artajasa, Finnet), general-ledger posting, and fund settlement workflows.",
      "Bulk posting for offline credit card payments via BCA and Mandiri channels, with multi-level approval and reporting.",
      "Merchant settlement reporting that imports transaction data, supports bulk upload and approval, and emails Excel reports automatically.",
      "A foreign-exchange claim, approval, and reimbursement workflow, and automated Mark-to-Market statement generation.",
    ],
    outcome:
      "Manual Excel processes replaced by workflows with bulk upload, multi-level approval and automatic Excel email reports.",
    layers: [
      { label: "Frontend", items: ["Laravel web UI"] },
      { label: "Backend", items: ["Laravel"] },
      { label: "Data", items: ["SQL Server"] },
    ],
  },
  {
    id: "m-smile",
    title: "M-Smile Mobile Banking Revamp",
    role: "Developer",
    problem:
      "Rebuild the app from React Native into one shared codebase for Android and iOS, and move existing users over without re-registration.",
    built: [
      "Rebuilt the app with Kotlin Multiplatform and Compose Multiplatform on a single shared codebase for Android and iOS.",
      "eKYC face verification, HSM-based request encryption with certificate pinning, and migration of login, biometric settings, and user preferences.",
      "A shared design system foundation: consistent components, accessibility for large text sizes, unified error and offline handling.",
    ],
    outcome:
      "One Kotlin Multiplatform codebase for Android and iOS; login, biometric settings and preferences carried over without re-registration.",
    layers: [
      { label: "Mobile", items: ["Kotlin Multiplatform", "Compose Multiplatform"] },
      { label: "Networking", items: ["Ktor"] },
      { label: "Security", items: ["HSM encryption", "Certificate pinning", "eKYC"] },
    ],
  },
  {
    id: "loyalty",
    title: "Loyalty Platform",
    role: "Developer",
    problem:
      "Stand up the production data and messaging infrastructure for the Loyalty platform and deploy its microservices.",
    built: [
      "Provisioned production servers running Redis Cluster, Apache Kafka (KRaft), Apache Cassandra, Typesense, and PostgreSQL with streaming replication.",
      "Deployed microservices to Kubernetes (Rancher RKE) using ArgoCD GitOps and Jenkins pipelines.",
      "Troubleshot pod failures, configuration, and connectivity issues across environments.",
    ],
    outcome:
      "Production servers provisioned; microservices deployed to Kubernetes through ArgoCD GitOps and Jenkins.",
    layers: [
      { label: "Backend", items: ["Microservices"] },
      { label: "Data", items: ["Kafka", "Redis Cluster", "Cassandra", "Typesense", "PostgreSQL"] },
      { label: "Infra", items: ["Kubernetes", "ArgoCD", "Jenkins"] },
    ],
  },
];

export type MoreProject = { title: string; summary: string; stack: string[] };

export const moreProjects: MoreProject[] = [
  {
    title: "Observability",
    summary:
      "Standardized OpenTelemetry instrumentation package for Java 8+ applications with sensitive-data masking, integrated with SigNoz for metrics, traces, and logs.",
    stack: ["OpenTelemetry", "SigNoz", "Java"],
  },
  {
    title: "AI Chatbot & AI Gateway",
    summary: "AI-powered chatbot and an internal AI Gateway centralizing access to AI services across the bank.",
    stack: ["LLM chatbot", "AI Gateway"],
  },
  {
    title: "Insider → S3 Data Pipeline",
    summary:
      "TypeScript/Node.js pipeline exporting customer engagement data from Insider to S3-compatible storage, with a Fastify API for downstream teams and Jest test coverage.",
    stack: ["TypeScript", "Node.js", "Fastify", "S3", "Jest"],
  },
  {
    title: "Payroll Onboarding & Complaint Dashboard",
    summary:
      "Payroll onboarding platform digitizing payroll account opening for corporate employees, and a real-time complaint monitoring dashboard.",
    stack: ["Next.js", "Fastify", "Express.js"],
  },
];

export type App = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  playStoreUrl: string;
  group: "bank-mega" | "freelance";
};

export const apps: App[] = [
  {
    title: "CT Connect",
    description:
      "Developed the CT Connect Flutter app for communication, onboarding, jobs, and merchant promotions at PT Bank Mega Tbk.",
    tags: ["Flutter"],
    image: "/ct.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ctcorp.ctconnect&hl=id",
    group: "bank-mega",
  },
  {
    title: "Love GBK",
    description:
      "I worked as a Mobile Apps Developer on this project for GBK Jakarta. Love GBK is the official app of Gelora Bung Karno, enabling users to explore venues, discover events, book sports facilities, and track their activities seamlessly.",
    tags: ["Flutter", "Bloc", "REST API", "Firebase", "Google OAuth", "Secure Encryption"],
    image: "/gbk.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=id.gbk.mobile",
    group: "freelance",
  },
  {
    title: "ArsyGas: Gas yang Benar",
    description:
      "I worked as a Mobile Apps developer on this freelance project. ArsyGas is a utility app that allows users to order LPG gas cylinders directly from their smartphones. The app includes features like scheduled delivery, usage monitoring, and a reward system called 'Gasback' to encourage efficient gas consumption.",
    tags: ["Flutter", "Firebase", "REST API", "Laravel", "Google Maps API"],
    image: "/arsy.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.arsygas.consumer.mobileapp&hl=id",
    group: "freelance",
  },
  {
    title: "ArsyGas – Partners",
    description:
      "I worked as a Mobile Apps developer on this freelance project. This app supports distribution teams by handling task management, delivery routes, real-time inventory control, barcode scan for order fulfillment.",
    tags: ["Flutter", "Bloc", "REST API", "Google Maps API", "Barcode Scanner"],
    image: "/arsy-partners.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.arsygas.distributor.mobileapp&hl=id",
    group: "freelance",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  location?: string;
  period: string;
  kind: "work" | "education";
  groups: { heading?: string; bullets: string[] }[];
  link?: { label: string; href: `#${string}` };
};

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Developer",
    org: "PT Bank Mega Tbk",
    location: "South Jakarta",
    period: "Feb 2023 – Present",
    kind: "work",
    groups: [
      {
        bullets: [
          "Mobile banking: M-Smile revamp in Kotlin Multiplatform and Compose Multiplatform, and the CT Connect Flutter app.",
          "Platform: Loyalty platform infrastructure and Kubernetes deployments, OpenTelemetry/SigNoz observability, and an Insider → S3 data pipeline.",
          "Business systems: finance-operations automation, payroll onboarding, complaint monitoring dashboard, and an AI chatbot with an internal AI Gateway.",
        ],
      },
    ],
    link: { label: "See case studies", href: "#work" },
  },
  {
    role: "IT Development Program",
    org: "PT Bank Mega Tbk",
    location: "South Jakarta",
    period: "Aug 2022 – Feb 2023",
    kind: "work",
    groups: [
      {
        bullets: [
          "Completed training in banking operations, risk management, IT compliance, and banking regulations.",
          "Built secure, scalable backend services with Java Spring Boot.",
          "Built cross-platform Android and iOS applications with Ionic and Flutter.",
        ],
      },
    ],
  },
  {
    role: "IT Developer",
    org: "EcoEdu.id",
    period: "Sep 2021 – Feb 2022",
    kind: "work",
    groups: [
      {
        bullets: [
          "Designed and developed responsive websites for EcoEdu.id and its e-learning platform (Elearning.EcoEdu.id).",
          "Maintained site security and content, improving user engagement and traffic.",
        ],
      },
    ],
  },
  {
    role: "Bachelor of Informatics",
    org: "Telkom University",
    period: "2017 – 2021",
    kind: "education",
    groups: [{ bullets: ["GPA 3.13/4.00"] }],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "JavaScript"] },
  { group: "Backend", items: ["Node.js", "Fastify", "Express.js", "Laravel", "PHP", "Spring Boot", "Java", "REST API"] },
  { group: "Mobile", items: ["Kotlin Multiplatform", "Compose Multiplatform", "Ktor", "Kotlin", "Flutter", "Dart", "Ionic", "Android", "iOS"] },
  { group: "Data & Messaging", items: ["PostgreSQL", "MySQL", "SQL Server", "Apache Cassandra", "Redis", "Apache Kafka", "Typesense", "S3", "SQL"] },
  { group: "DevOps & Observability", items: ["Docker", "Kubernetes (Rancher RKE)", "ArgoCD", "Jenkins", "CI/CD", "Linux", "OpenTelemetry", "SigNoz"] },
  { group: "AI", items: ["LLM chatbot", "AI Gateway", "AI service integration"] },
  { group: "Security & Delivery", items: ["HSM encryption", "data masking", "FSD/SIT documentation", "Agile", "system & business analysis"] },
];

export const languages: { name: string; level: string }[] = [
  { name: "Indonesian", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];

export const navLinks: { label: string; href: `#${string}` }[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
