import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import AnalyticsBootstrap from "@/components/AnalyticsBootstrap";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lab Leads Pro - Know Who's Buying Before They Start Shopping",
  description:
    "AI-powered lead intelligence for life-science equipment sales. Weekly alerts on newly funded labs, PI contact info, and equipment purchase signals - delivered to your inbox.",
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
    title: "Lab Leads Pro - Life-Science Lead Intelligence",
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
        alt: "Lab Leads Pro - Know Who's Buying Before They Start Shopping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab Leads Pro - Life-Science Lead Intelligence",
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
        {/* Organization & WebSite structured data for search engines and LLMs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://lableadspro.com/#organization",
                  name: "Lab Leads Pro",
                  url: "https://lableadspro.com",
                  description:
                    "AI-powered lead intelligence for life-science equipment sales. Federal research grants database with PI contact info across NIH, NSF, DOD, DOE, NASA, USDA, CDC, and VA.",
                  foundingDate: "2026",
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://lableadspro.com/#website",
                  url: "https://lableadspro.com",
                  name: "Lab Leads Pro",
                  publisher: {
                    "@id": "https://lableadspro.com/#organization",
                  },
                  description:
                    "Federal research grants database with 525,000+ grants across 8 agencies. Built for life-science equipment sales reps.",
                },
                {
                  "@type": "SoftwareApplication",
                  name: "Lab Leads Pro",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  description:
                    "Search 525,000+ federal research grants by state, keyword, and agency. Includes PI contact information, equipment purchase signals, and weekly new grant alerts.",
                  url: "https://lableadspro.com",
                  offers: [
                    {
                      "@type": "Offer",
                      name: "Standard",
                      price: "99",
                      priceCurrency: "USD",
                      description:
                        "1 state, NIH grants, PI contact info, weekly email alerts",
                    },
                    {
                      "@type": "Offer",
                      name: "Pro",
                      price: "149",
                      priceCurrency: "USD",
                      description:
                        "1 state, all 8 federal agencies, PI contact info, weekly email alerts",
                    },
                  ],
                },
              ],
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DVCRLHGJWV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted',
            });

            // Google Ads tag loads immediately (conversion tracking must be instant)
            gtag('config', 'AW-18071547440');

            // GA4 config delayed 5s to filter email scanner bots
            // Bots click links and leave in <3s, never triggering GA4 pageview
            setTimeout(function() {
              gtag('config', 'G-DVCRLHGJWV');
            }, 5000);
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wgd6aik731");
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "9059810";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
      </head>
      <body className="antialiased">
        <noscript>
          {/* LinkedIn Insight Tag fallback for non-JS clients */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }} alt="" src="https://px.ads.linkedin.com/collect/?pid=9059810&fmt=gif" />
        </noscript>
        {children}<AnalyticsBootstrap /><Analytics /><SpeedInsights />
      </body>
    </html>
  );
}
