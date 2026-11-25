import { profile } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main>
      {profile.name}
      <ThemeToggle />
    </main>
  );
}
