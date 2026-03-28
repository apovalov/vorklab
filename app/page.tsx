import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Solutions } from "@/components/landing/Solutions";
import { RoiCalculator } from "@/components/landing/RoiCalculator";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <RoiCalculator />
      </main>
    </>
  );
}
