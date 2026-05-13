"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-[var(--base-bg)]/90 backdrop-blur-md border-b border-[var(--vorklab-card-border)]/30"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-[var(--main-text)]">
            VorkLab
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300 text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center border border-[var(--vorklab-card-border)] text-[var(--light-text)] hover:text-[var(--vorklab-accent)] hover:border-[var(--vorklab-accent)] transition-colors duration-300 rounded-[var(--border-radius-main)] text-sm font-medium px-4 h-8"
            >
              Связаться
            </Link>
          </div>

          <button
            className="md:hidden text-[var(--main-text)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300 text-sm py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex w-full items-center justify-center border border-[var(--vorklab-card-border)] text-[var(--light-text)] hover:text-[var(--vorklab-accent)] hover:border-[var(--vorklab-accent)] transition-colors duration-300 rounded-[var(--border-radius-main)] text-sm font-medium px-4 h-8"
            >
              Связаться
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
