import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { CaseStudies } from "@/components/sections/case-studies";
import { MobileApps } from "@/components/sections/mobile-apps";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <CaseStudies />
        <MobileApps />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
