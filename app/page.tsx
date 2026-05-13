import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Solutions } from "@/components/landing/Solutions";
import { AutomateBlock } from "@/components/landing/AutomateBlock";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Cases } from "@/components/landing/Cases";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <AutomateBlock />
        <HowWeWork />
        <Cases />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
