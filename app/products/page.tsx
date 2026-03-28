import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function Products() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] mb-4">Our Products</h1>
          <p className="text-[var(--light-text)]">Case studies coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
