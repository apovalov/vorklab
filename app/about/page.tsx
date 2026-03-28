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
            We&apos;re a team of AI engineers and automation specialists who build custom solutions for businesses. We focus on delivering working systems — not slide decks.
          </p>
          <p className="text-[var(--light-text)]">More details coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
