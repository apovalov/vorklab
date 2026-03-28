import Link from "next/link";
import { FOOTER_LINKS, CONTACT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[var(--base-bg)] border-t border-[var(--vorklab-card-border)]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-[var(--main-text)]">VorkLab</Link>
            <p className="text-[var(--light-text)] text-sm mt-3">
              Custom AI solutions that automate your workflows and scale your business.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Navigation</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <Link href="/#contact" className="text-[var(--vorklab-accent)] hover:brightness-125 transition-all duration-300">
                  Prefer text? Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--vorklab-card-border)]/30 mt-8 pt-8 text-center">
          <p className="text-[var(--light-text)] text-xs">© 2026 VorkLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
