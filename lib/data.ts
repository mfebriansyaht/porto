// Single source of truth for all site copy. Content mirrors the CV
// (Moch_Febriansyah_Trisnadi_CV.pdf, Nov 2025), except the freelance apps,
// which come from the previous site.

export const profile = {
  name: "Moch Febriansyah Trisnadi",
  shortName: "Febriansyah",
  title: "Software Engineer",
  subtitle: "Full-Stack & Mobile · Banking Systems",
  location: "South Jakarta, Indonesia",
  summary:
    "Software engineer with 4+ years of experience, including 3+ years building production web, mobile, and backend systems at PT Bank Mega Tbk. Lead developer of the M-Smile mobile banking revamp (Kotlin Multiplatform, Android & iOS) and the production Loyalty platform (Kafka, Redis Cluster, Cassandra, Kubernetes). Experienced in end-to-end delivery of secure, regulation-compliant systems, from functional specifications (FSD) and system integration testing (SIT) to production deployment and monitoring, including automation of finance operations such as reconciliation, payment posting, and settlement reporting.",
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
  { value: 17, suffix: "", label: "Production servers" },
  { value: 2, suffix: "", label: "Platforms led" },
];

export type FeaturedWork = {
  id: string;
  title: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  size: "lg" | "sm";
  /** lucide-react icon name */
  icon: string;
};

export const featuredWork: FeaturedWork[] = [
  {
    id: "m-smile",
    title: "M-Smile Mobile Banking Revamp",
    role: "Lead Developer",
    summary:
      "Rebuilt the mobile banking app from React Native to Kotlin Multiplatform and Compose Multiplatform, with a single shared codebase for Android and iOS.",
    highlights: [
      "Implemented eKYC face verification, HSM-based request encryption with certificate pinning, and seamless migration of login, biometric settings, and user preferences from the previous app without re-registration.",
      "Built a shared design system foundation (consistent components, accessibility for large text sizes, unified error and offline handling) applied across all app modules.",
    ],
    stack: ["Kotlin Multiplatform", "Compose Multiplatform", "Ktor", "Android", "iOS", "HSM"],
    size: "lg",
    icon: "Smartphone",
  },
  {
    id: "loyalty",
    title: "Loyalty Platform",
    role: "Lead Developer",
    summary:
      "Production Loyalty platform: provisioned 17 production servers running Redis Cluster, Apache Kafka (KRaft), Apache Cassandra, Typesense, and PostgreSQL with streaming replication.",
    highlights: [
      "Deployed microservices to Kubernetes (Rancher RKE) using ArgoCD GitOps and Jenkins pipelines.",
      "Troubleshot pod failures, configuration, and connectivity issues across environments.",
    ],
    stack: ["Kafka", "Redis Cluster", "Cassandra", "Typesense", "PostgreSQL", "Kubernetes", "ArgoCD", "Jenkins"],
    size: "lg",
    icon: "Server",
  },
  {
    id: "observability",
    title: "Observability",
    role: "Developer",
    summary:
      "Built a standardized OpenTelemetry instrumentation package for Java 8+ applications with sensitive-data masking, integrated with SigNoz for metrics, traces, and logs.",
    highlights: [],
    stack: ["OpenTelemetry", "SigNoz", "Java"],
    size: "sm",
    icon: "Activity",
  },
  {
    id: "ai-gateway",
    title: "AI Chatbot & AI Gateway",
    role: "Developer",
    summary:
      "Developed an AI-powered chatbot and built an internal AI Gateway centralizing access to AI services across the bank.",
    highlights: [],
    stack: ["LLM chatbot", "AI Gateway"],
    size: "sm",
    icon: "Bot",
  },
  {
    id: "finance-ops",
    title: "Finance Operations Automation",
    role: "Developer",
    summary:
      "Automated third-party biller reconciliation (Artajasa, Finnet), general-ledger posting, and fund settlement workflows.",
    highlights: [
      "Built bulk posting for offline credit card payments via BCA and Mandiri channels, including multi-level approval and reporting.",
      "Developed merchant settlement reporting that imports transaction data, supports bulk upload and approval, and emails Excel reports automatically.",
      "Created a foreign-exchange claim, approval, and reimbursement workflow and automated Mark-to-Market statement generation, replacing manual Excel processes.",
    ],
    stack: ["Laravel", "SQL Server"],
    size: "sm",
    icon: "Landmark",
  },
  {
    id: "insider-pipeline",
    title: "Insider → S3 Data Pipeline",
    role: "Developer",
    summary:
      "Built a TypeScript/Node.js pipeline exporting customer engagement data from Insider to S3-compatible storage, with a Fastify API for downstream teams and Jest test coverage.",
    highlights: [],
    stack: ["TypeScript", "Node.js", "Fastify", "S3", "Jest"],
    size: "sm",
    icon: "Database",
  },
  {
    id: "payroll-complaint",
    title: "Payroll Onboarding & Complaint Dashboard",
    role: "Developer",
    summary:
      "Built a Next.js/Fastify payroll onboarding platform digitizing payroll account opening for corporate employees, and a real-time complaint monitoring dashboard (Next.js, Express.js).",
    highlights: [],
    stack: ["Next.js", "Fastify", "Express.js"],
    size: "sm",
    icon: "LayoutDashboard",
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
        heading: "Mobile Banking",
        bullets: [
          "Lead developer of the M-Smile mobile banking app revamp, rebuilding it from React Native to Kotlin Multiplatform and Compose Multiplatform with a single shared codebase for Android and iOS.",
          "Implemented eKYC face verification, HSM-based request encryption with certificate pinning, and seamless migration of login, biometric settings, and user preferences from the previous app without re-registration.",
          "Built a shared design system foundation (consistent components, accessibility for large text sizes, unified error and offline handling) applied across all app modules.",
          "Developed the CT Connect Flutter app for communication, onboarding, jobs, and merchant promotions; contributed features to the existing mobile banking app.",
        ],
      },
      {
        heading: "Platform, Infrastructure & Observability",
        bullets: [
          "Lead developer of the production Loyalty platform: provisioned 17 production servers running Redis Cluster, Apache Kafka (KRaft), Apache Cassandra, Typesense, and PostgreSQL with streaming replication.",
          "Deployed microservices to Kubernetes (Rancher RKE) using ArgoCD GitOps and Jenkins pipelines; troubleshot pod failures, configuration, and connectivity issues across environments.",
          "Built a standardized OpenTelemetry instrumentation package for Java 8+ applications with sensitive-data masking, integrated with SigNoz for metrics, traces, and logs.",
          "Built a TypeScript/Node.js pipeline exporting customer engagement data from Insider to S3-compatible storage, with a Fastify API for downstream teams and Jest test coverage.",
        ],
      },
      {
        heading: "Finance Operations Automation",
        bullets: [
          "Automated third-party biller reconciliation (Artajasa, Finnet), general-ledger posting, and fund settlement workflows (Laravel, SQL Server).",
          "Built bulk posting for offline credit card payments via BCA and Mandiri channels, including multi-level approval and reporting for Mega and non-Mega payments.",
          "Developed merchant settlement reporting that imports transaction data, supports bulk upload and approval, and emails Excel reports automatically.",
          "Created a foreign-exchange claim, approval, and reimbursement workflow (Laravel) and automated Mark-to-Market statement generation, replacing manual Excel processes.",
          "Built a Next.js/Fastify payroll onboarding platform digitizing payroll account opening for corporate employees, and a real-time complaint monitoring dashboard (Next.js, Express.js).",
        ],
      },
      {
        heading: "AI",
        bullets: [
          "Developed an AI-powered chatbot and built an internal AI Gateway centralizing access to AI services across the bank.",
        ],
      },
    ],
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
  { group: "Languages", items: ["Kotlin", "TypeScript", "JavaScript", "PHP", "Java", "Dart", "SQL"] },
  { group: "Mobile", items: ["Kotlin Multiplatform", "Compose Multiplatform", "Ktor", "Flutter", "Ionic", "Android", "iOS"] },
  { group: "Web & Backend", items: ["Laravel", "Next.js", "React", "Node.js", "Fastify", "Express.js", "Spring Boot", "REST API"] },
  { group: "Data & Messaging", items: ["PostgreSQL", "MySQL", "SQL Server", "Apache Cassandra", "Redis", "Apache Kafka", "Typesense", "S3"] },
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
