import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function Blog() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] mb-4">Blog</h1>
          <p className="text-[var(--light-text)]">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
