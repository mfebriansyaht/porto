import { Arrow, Box, DiagramFrame } from "@/components/diagrams/flow";

const id = "finance-ops";

export function FinanceOpsDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={720}
      height={200}
      title="Finance operations automation architecture"
      desc="Biller and bank files from Artajasa, Finnet, BCA and Mandiri are uploaded to a Laravel web app for upload, approval and posting. The app writes to SQL Server and sends Excel reports by email."
    >
      <Box x={10} y={68} w={210} h={64} label="Biller & bank files" sub="Artajasa · Finnet · BCA · Mandiri" />
      <Box x={270} y={60} w={200} h={80} label="Laravel web app" sub="upload · approval · posting" accent />
      <Box x={530} y={20} w={180} h={48} label="SQL Server" />
      <Box x={530} y={132} w={180} h={48} label="Excel reports by email" />
      <Arrow id={id} from={[220, 100]} to={[268, 100]} />
      <Arrow id={id} from={[470, 90]} to={[528, 48]} />
      <Arrow id={id} from={[470, 110]} to={[528, 152]} />
    </DiagramFrame>
  );
}
