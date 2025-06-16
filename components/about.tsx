"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        A <span className="font-medium">passionate Fullstack developer</span>{" "}
        with over{" "}
        <span className="font-medium">3 years of hands-on experience</span> in
        building full-stack web and mobile applications. Adept at working across
        a range of technologies including{" "}
        <span className="font-medium">
          Flutter, Laravel, Nextjs and Node.js
        </span>
        , with a strong grasp of modern frontend and backend development
        practices. Skilled at turning{" "}
        <span className="font-medium">complex business requirements</span> into
        clean, efficient, and user-friendly digital solutions. Comfortable
        collaborating with{" "}
        <span className="font-medium">cross-functional teams</span>,
        communicating technical ideas clearly, and adapting quickly to new tools
        and workflows.
      </p>

      <p>
        Known for being a{" "}
        <span className="font-medium">creative problem-solver</span> who values{" "}
        <span className="font-medium">simplicity</span> and{" "}
        <span className="font-medium">performance</span>, and consistently
        delivers{" "}
        <span className="font-medium">scalable and maintainable code</span>.
        Whether it’s streamlining internal business processes or building
        customer-facing platforms, I take pride in creating systems that are not
        only functional but also bring{" "}
        <span className="font-medium">real value to users</span>. I'm driven by{" "}
        <span className="font-medium">impact</span>,{" "}
        <span className="font-medium">improvement</span>, and{" "}
        <span className="font-medium">continuous learning</span>—always aiming
        to build better with each project I work on.
      </p>
    </motion.section>
  );
}
