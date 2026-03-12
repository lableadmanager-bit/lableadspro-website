import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lab Leads Pro — Know Who's Buying Before They Start Shopping",
  description:
    "AI-powered lead intelligence for life-science equipment sales. Weekly alerts on newly funded labs, PI contact info, and equipment purchase signals — delivered to your inbox.",
  keywords: [
    "life science leads",
    "lab equipment sales",
    "NIH grants",
    "NSF grants",
    "federal research grants",
    "DOD research funding",
    "PI contact information",
    "scientific equipment leads",
    "lab sales intelligence",
  ],
  openGraph: {
    title: "Lab Leads Pro — Life-Science Lead Intelligence",
    description:
      "Weekly alerts on newly funded labs with equipment purchase signals. Built for life-science sales reps.",
    url: "https://lableadspro.com",
    siteName: "Lab Leads Pro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
