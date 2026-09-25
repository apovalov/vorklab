import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Legal information | VorkLab",
  description: "Service provider and registration details for VorkLab.",
};

export default function LegalInformation() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] mb-8">Legal information</h1>
          <p className="text-[var(--main-text)] text-lg leading-relaxed mb-8">
            VorkLab is the brand under which Individual Entrepreneur Valentin Shapovalov provides AI engineering and workflow automation services.
          </p>
          <dl className="space-y-6 text-[var(--light-text)]">
            <div><dt className="font-semibold text-[var(--heading-text)]">Registered name</dt><dd>Individual entrepreneur VALENTIN SHAPOVALOV</dd></div>
            <div><dt className="font-semibold text-[var(--heading-text)]">Identification number</dt><dd>305771581</dd></div>
            <div><dt className="font-semibold text-[var(--heading-text)]">Registration</dt><dd>Registered in Georgia on 22 April 2025 by the LEPL National Agency of Public Registry.</dd></div>
            <div><dt className="font-semibold text-[var(--heading-text)]">Legal address</dt><dd>Georgia, Tbilisi, Vake district, Besarion Zhgenti street, N 49, floor 1, apartment N20.</dd></div>
            <div><dt className="font-semibold text-[var(--heading-text)]">Contact</dt><dd><a className="underline hover:text-[var(--main-text)]" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
          </dl>
        </div>
      </main>
      <Footer />
    </>
  );
}
