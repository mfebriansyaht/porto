// TimelineClient.tsx
"use client";

import React from "react";
// 🛠️ Import dan paksa ke tipe 'any'
import {
  VerticalTimeline as VerticalTimelineRaw,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { experiencesData } from "@/lib/data";
import { useTheme } from "@/context/theme-context";

// 👇 Force-cast ke tipe React.FC agar bisa dipakai sebagai JSX
const VerticalTimeline = VerticalTimelineRaw as unknown as React.FC<any>;

export default function TimelineClient() {
  const { theme } = useTheme();

  return (
    <VerticalTimeline lineColor="">
      {experiencesData.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          contentStyle={{
            background:
              theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
            boxShadow: "none",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            textAlign: "left",
            padding: "1.3rem 2rem",
          }}
          contentArrowStyle={{
            borderRight:
              theme === "light"
                ? "0.4rem solid #9ca3af"
                : "0.4rem solid rgba(255, 255, 255, 0.5)",
          }}
          date={item.date}
          icon={item.icon}
          iconStyle={{
            background:
              theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
            fontSize: "1.5rem",
          }}
        >
          <h3 className="font-semibold capitalize">{item.title}</h3>
          <p className="font-normal !mt-0">{item.location}</p>
          <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
            {item.description}
          </p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
