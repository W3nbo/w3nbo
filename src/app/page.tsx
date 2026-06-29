import { Navigation } from "@/components/Navigation";
import { BackToTop } from "@/components/ui/BackToTop";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Hero } from "@/components/sections/Hero";
import { Works } from "@/components/sections/Works";
import { Philosophy } from "@/components/sections/Philosophy";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <SectionDivider variant="gradient" />
        <Works />
        <SectionDivider variant="dots" />
        <Philosophy />
        <SectionDivider variant="gradient" />
        <Timeline />
        <SectionDivider variant="line" />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
