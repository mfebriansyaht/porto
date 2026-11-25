import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { MobileApps } from "@/components/sections/mobile-apps";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <MobileApps />
      </main>
    </>
  );
}
