import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VorkLab | AI Engineering and Workflow Automation",
  description:
    "AI assistants, knowledge search, and workflow automation for businesses. Led by Valentin Shapovalov, with 15+ years in IT.",
  metadataBase: new URL("https://vorklab.com"),
  openGraph: {
    title: "VorkLab | AI Engineering and Workflow Automation",
    description:
      "AI engineering and workflow automation led by Valentin Shapovalov. From discovery to production.",
    type: "website",
    url: "https://vorklab.com",
    siteName: "VorkLab",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VorkLab | AI Engineering and Workflow Automation",
    description:
      "AI engineering and workflow automation led by Valentin Shapovalov. From discovery to production.",
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
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
