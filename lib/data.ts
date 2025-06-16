import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import arsygasImg from "@/public/arsy.webp";
import distributorImg from "@/public/arsy p.webp";
import ctconnectImg from "@/public/ct.webp";
import bankMegaImg from "@/public/mega.png"

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;


export const experiencesData = [
  {
    title: "IT Developer",
    location: "PT Bank Mega Tbk, South Jakarta",
    description:
      "Developed internal systems and dashboards using Next.js, Express.js, Laravel, and Flutter. Key projects include Complaint Dashboard, CT Connect App, Forex Claim Module, and Payroll Onboarding Dashboard.",
    icon: React.createElement(CgWorkAlt),
    date: "2023 - Present",
  },
  {
    title: "IT Development Program",
    location: "PT Bank Mega Tbk, South Jakarta",
    description:
      "Completed training in banking operations, risk, and IT compliance. Gained hands-on experience with Java Spring Boot, Ionic Framework, and Flutter for cross-platform mobile development.",
    icon: React.createElement(LuGraduationCap),
    date: "2022 - 2023",
  },
  {
    title: "IT Developer",
    location: "EcoEdu.id",
    description:
      "Designed and developed responsive educational platforms (Ecoedu.id & Elearning.ecoedu.id), maintained site security, and improved user engagement and traffic.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - 2022",
  },
  {
    title: "Bachelor of Informatics",
    location: "Telkom University",
    description:
      "Earned a Bachelor's degree in Informatics with a GPA of 3.13/4.0. Learned core concepts of software development, algorithms, and database systems.",
    icon: React.createElement(LuGraduationCap),
    date: "2017 - 2021",
  },
] as const;



export const projectsData = [
  {
    title: "CT Connect",
    description:
      "I worked as a Mobile Apps developer on this project for CT Corp. CT Connect is a secure community app for CT Corp stakeholders, facilitating news, internal job applications, promo discovery, and employee onboarding.",
    tags: ["Flutter", "Bloc", "REST API", "Firebase", "Secure Encryption"],
    imageUrl: ctconnectImg,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ctcorp.ctconnect&hl=id"
  },
  {
    title: "ArsyGas: Gas yang Benar",
    description:
      "I worked as a Mobile Apps developer on this freelance project. ArsyGas is a utility app that allows users to order LPG gas cylinders directly from their smartphones. The app includes features like scheduled delivery, usage monitoring, and a reward system called 'Gasback' to encourage efficient gas consumption.",
    tags: ["Flutter", "Firebase", "REST API", "Laravel", "Google Maps API"],
    imageUrl: arsygasImg,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.arsygas.consumer.mobileapp&hl=id"
  },
  {
    title: "ArsyGas – Partners",
    description:
      "I worked as a Mobile Apps developer on this freelance project. This app supports distribution teams by handling task management, delivery routes, real-time inventory control, barcode scan for order fulfillment.",
    tags: ["Flutter", "Bloc", "REST API", "Google Maps API", "Barcode Scanner"],
    imageUrl: distributorImg,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.arsygas.distributor.mobileapp&hl=id"
  },
  {
    title: "Complaint Dashboard – Bank Mega",
    description:
      "Developed a web-based complaint monitoring dashboard using Next.js and Express.js to visualize and track customer issues in real-time.",
    tags: ["Next.js", "Express.js", "REST API", "Chart.js"],
    imageUrl: bankMegaImg,
  },
  {
    title: "Telkomsel & Antavaya Reconciliation Platform – Bank Mega",
    description:
      "Built a monthly reconciliation platform for third-party billing using Next.js and Express.js to automate financial matching and validation processes.",
    tags: ["Next.js", "Express.js", "REST API"],
    imageUrl: bankMegaImg,
  },
  {
    title: "Foreign Exchange Transfer Claim Module – Bank Mega",
    description:
      "Developed an automated claim system using Laravel to handle submissions, approvals, and reimbursement journal creation for forex transactions.",
    tags: ["Laravel", "PostgreSQL", "REST API"],
    imageUrl: bankMegaImg,
  },
  {
    title: "Mark to Market Statement Generator – Bank Mega",
    description:
      "Designed a web tool using Laravel to automate the creation of Mark to Market (MtM) financial statements, replacing manual Excel workflows.",
    tags: ["Laravel", "Excel Automation", "Finance", "PDF Generator"],
    imageUrl: bankMegaImg,
  },
  {
    title: "Payroll Onboarding Dashboard – Bank Mega",
    description:
      "Implemented a payroll account onboarding dashboard using Next.js and Fastify to streamline employee account opening between companies and Bank Mega.",
    tags: ["Next.js", "Fastify", "REST API"],
    imageUrl: bankMegaImg,
  },
] as const;


export const skillsData = [
  "Flutter",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "PHP",
  "Laravel",
  "HTML",
  "CSS",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "SQLServer",
  "Apache Cassandra",
] as const;

