// @vitest-environment jsdom
import type { ComponentType } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FinanceOpsDiagram } from "@/components/diagrams/finance-ops";
import { MSmileDiagram } from "@/components/diagrams/m-smile";
import { LoyaltyDiagram } from "@/components/diagrams/loyalty";

afterEach(cleanup);

const cases: [string, ComponentType, string[]][] = [
  [
    "FinanceOpsDiagram",
    FinanceOpsDiagram,
    ["Artajasa", "Finnet", "BCA", "Mandiri", "Laravel web app", "upload · approval · posting", "SQL Server", "Excel reports by email"],
  ],
  [
    "MSmileDiagram",
    MSmileDiagram,
    ["Android", "iOS", "Shared KMP module", "Compose UI · Ktor client", "Pinned TLS + HSM encryption", "Bank backend APIs", "eKYC face verification"],
  ],
  [
    "LoyaltyDiagram",
    LoyaltyDiagram,
    ["Jenkins", "ArgoCD", "Kubernetes (Rancher RKE)", "microservices", "Kafka", "Redis Cluster", "Cassandra", "Typesense", "PostgreSQL primary → replica"],
  ],
];

describe.each(cases)("%s", (_name, Diagram, labels) => {
  it("is an accessible image with a title and description", () => {
    const { container } = render(<Diagram />);
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).not.toBeNull();
    const ids = (svg!.getAttribute("aria-labelledby") ?? "").split(/\s+/).filter(Boolean);
    expect(ids.length).toBe(2);
    for (const id of ids) {
      expect(container.querySelector(`[id="${id}"]`)?.textContent?.trim()).toBeTruthy();
    }
  });

  it("uses theme variables only, no hard-coded hex colours", () => {
    const { container } = render(<Diagram />);
    expect(container.innerHTML).not.toMatch(/#[0-9a-f]{3,6}\b/i);
  });

  it("shows every component named in the spec", () => {
    const { container } = render(<Diagram />);
    const text = container.textContent ?? "";
    for (const label of labels) expect(text).toContain(label);
  });
});
