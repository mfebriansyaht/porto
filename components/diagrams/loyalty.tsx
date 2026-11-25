import { Arrow, Box, DiagramFrame } from "@/components/diagrams/flow";

const id = "loyalty";

const stores = ["Kafka", "Redis Cluster", "Cassandra", "Typesense", "PostgreSQL primary → replica"];

export function LoyaltyDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={810}
      height={222}
      title="Loyalty platform deployment and data architecture"
      desc="Jenkins pipelines hand off to ArgoCD, which deploys microservices to Kubernetes (Rancher RKE). The services use Kafka, Redis Cluster, Cassandra, Typesense and PostgreSQL with a primary and a streaming replica."
    >
      <Box x={10} y={86} w={110} h={48} label="Jenkins" />
      <Box x={160} y={86} w={110} h={48} label="ArgoCD" />
      <Box x={310} y={70} w={200} h={80} label="Kubernetes (Rancher RKE)" sub="microservices" accent />
      <Arrow id={id} from={[120, 110]} to={[158, 110]} />
      <Arrow id={id} from={[270, 110]} to={[308, 110]} />
      {stores.map((label, i) => {
        const y = 10 + i * 42;
        return (
          <g key={label}>
            <Box x={570} y={y} w={230} h={34} label={label} />
            <Arrow id={id} from={[510, 110]} to={[568, y + 17]} />
          </g>
        );
      })}
    </DiagramFrame>
  );
}
