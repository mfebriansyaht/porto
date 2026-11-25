import { Arrow, Box, DiagramFrame } from "@/components/diagrams/flow";

const id = "m-smile";

export function MSmileDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={860}
      height={240}
      title="M-Smile mobile banking architecture"
      desc="Android and iOS apps share one Kotlin Multiplatform module with Compose UI and a Ktor client. The module uses eKYC face verification and talks to the bank backend APIs over pinned TLS with HSM encryption."
    >
      <Box x={10} y={30} w={110} h={48} label="Android" />
      <Box x={10} y={122} w={110} h={48} label="iOS" />
      <Box x={170} y={50} w={210} h={100} label="Shared KMP module" sub="Compose UI · Ktor client" accent />
      <Box x={170} y={186} w={210} h={44} label="eKYC face verification" />
      <Box x={430} y={76} w={230} h={48} label="Pinned TLS + HSM encryption" />
      <Box x={710} y={76} w={140} h={48} label="Bank backend APIs" />
      <Arrow id={id} from={[120, 54]} to={[168, 86]} />
      <Arrow id={id} from={[120, 146]} to={[168, 114]} />
      <Arrow id={id} from={[275, 150]} to={[275, 184]} />
      <Arrow id={id} from={[380, 100]} to={[428, 100]} />
      <Arrow id={id} from={[660, 100]} to={[708, 100]} />
    </DiagramFrame>
  );
}
