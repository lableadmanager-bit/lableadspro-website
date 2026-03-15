import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
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
  metadataBase: new URL("https://lableadspro.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lab Leads Pro — Life-Science Lead Intelligence",
    description:
      "Weekly alerts on newly funded labs with equipment purchase signals. Built for life-science sales reps.",
    url: "https://lableadspro.com",
    siteName: "Lab Leads Pro",
    type: "website",
    images: [
      {
        url: "https://lableadspro.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lab Leads Pro — Know Who's Buying Before They Start Shopping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab Leads Pro — Life-Science Lead Intelligence",
    description:
      "Weekly alerts on newly funded labs with equipment purchase signals. Built for life-science sales reps.",
    images: ["https://lableadspro.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DVCRLHGJWV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted',
            });
            gtag('config', 'G-DVCRLHGJWV');
          `}
        </Script>
      </head>
      <body className="antialiased">{children}<Analytics /><SpeedInsights /></body>
    </html>
  );
}
