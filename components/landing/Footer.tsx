import Link from "next/link";
import {
  FOOTER_LINKS,
  CONTACT,
  TELEGRAM_PERSONAL,
  TELEGRAM_PERSONAL_HANDLE,
  TELEGRAM_CHANNEL,
  TELEGRAM_CHANNEL_HANDLE,
  GITHUB_URL,
  GITHUB_HANDLE,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[var(--base-bg)] border-t border-[var(--vorklab-card-border)]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-[var(--main-text)]">
              VorkLab
            </Link>
            <p className="text-[var(--light-text)] text-sm mt-3">
              AI-студия с production-опытом. Внедряем AI в бизнес-процессы под ключ.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">
              Навигация
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">
              Контакт
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_PERSONAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  Telegram {TELEGRAM_PERSONAL_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  Канал {TELEGRAM_CHANNEL_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  GitHub {GITHUB_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--vorklab-card-border)]/30 mt-8 pt-8 text-center">
          <p className="text-[var(--light-text)] text-xs">© 2026 VorkLab</p>
        </div>
      </div>
    </footer>
  );
}
