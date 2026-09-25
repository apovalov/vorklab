import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] mb-6">About VorkLab</h1>
          <p className="text-[var(--light-text)] text-lg mb-8">
            VorkLab is an AI engineering practice led by Valentin Shapovalov. We build AI assistants, knowledge search, and workflow automation for businesses.
          </p>
          <p className="text-[var(--light-text)]">Valentin brings 15+ years of IT experience, including production AI and machine learning work in marketplaces, medtech, and e-commerce.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
