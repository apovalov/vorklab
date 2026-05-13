import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VorkLab - AI-студия с production-опытом",
  description:
    "AI-внедрения для бизнеса. 15+ лет в IT, прод-опыт в маркетплейсах Восточной Европы, medtech и e-commerce. От ассистента до автоматизации воронок.",
  metadataBase: new URL("https://vorklab.com"),
  openGraph: {
    title: "VorkLab - AI-студия с production-опытом",
    description:
      "AI-внедрения для бизнеса. 15+ лет в IT, прод-опыт в маркетплейсах Восточной Европы, medtech и e-commerce.",
    type: "website",
    url: "https://vorklab.com",
    siteName: "VorkLab",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "VorkLab - AI-студия с production-опытом",
    description:
      "AI-внедрения для бизнеса. 15+ лет в IT, прод-опыт в маркетплейсах Восточной Европы, medtech и e-commerce.",
  },
  robots: "index, follow",
  other: {
    "theme-color": "#5EEAD4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
