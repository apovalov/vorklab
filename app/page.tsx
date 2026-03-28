import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Solutions } from "@/components/landing/Solutions";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Testimonials } from "@/components/landing/Testimonials";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <RoiCalculator />
        <HowWeWork />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
