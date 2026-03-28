import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "VorkLab — AI Automation Solutions for Your Business",
  description:
    "Custom AI agents, chatbots, and automation systems built to integrate with your business. From idea to launch in 1-2 weeks.",
  metadataBase: new URL("https://vorklab.com"),
  openGraph: {
    title: "VorkLab — AI Automation Solutions for Your Business",
    description:
      "Custom AI agents, chatbots, and automation systems built to integrate with your business. From idea to launch in 1-2 weeks.",
    type: "website",
    url: "https://vorklab.com",
    siteName: "VorkLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "VorkLab — AI Automation Solutions for Your Business",
    description:
      "Custom AI agents, chatbots, and automation systems built to integrate with your business. From idea to launch in 1-2 weeks.",
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
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
