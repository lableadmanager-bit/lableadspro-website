import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Lab Leads Pro",
  description: "How Lab Leads Pro collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-[var(--color-dark)] mb-2">
            Privacy Policy
          </h1>
          <p className="text-[var(--color-gray-500)] mb-12">
            Effective March 15, 2026
          </p>

          <div className="prose-custom space-y-10">
            <Section title="Overview">
              <p>
                Lab Leads Pro (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides AI-powered lead intelligence for life-science equipment sales professionals. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services at lableadspro.com.
              </p>
            </Section>

            <Section title="Information We Collect">
              <h3 className="text-lg font-semibold text-[var(--color-dark)] mt-4 mb-2">Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li><strong>Account information:</strong> Name, email address, company name</li>
                <li><strong>Subscription preferences:</strong> Selected U.S. states for grant coverage</li>
                <li><strong>Payment information:</strong> Processed securely by Stripe — we never store your credit card details on our servers</li>
                <li><strong>Communications:</strong> Emails you send us at info@lableadspro.com</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--color-dark)] mt-6 mb-2">Information Collected Automatically</h3>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li><strong>Analytics data:</strong> Anonymous usage statistics via Google Analytics and Vercel Speed Insights (page views, device type, general location). No personally identifiable information is tracked.</li>
                <li><strong>Log data:</strong> Standard server logs including IP address, browser type, and pages visited</li>
              </ul>
            </Section>

            <Section title="How We Use Your Information">
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li>Deliver your weekly grant intelligence reports filtered to your subscribed states</li>
                <li>Process subscription payments</li>
                <li>Send important service updates (billing changes, new features, maintenance)</li>
                <li>Improve our service quality and report accuracy</li>
                <li>Respond to your support inquiries</li>
              </ul>
            </Section>

            <Section title="Our Data Sources">
              <p>
                The grant data in our reports comes exclusively from <strong>publicly available federal databases</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li>NIH Reporter (National Institutes of Health)</li>
                <li>NSF Award Search (National Science Foundation)</li>
                <li>USASpending.gov (DOD, DOE, NASA, VA, USDA, CDC awards)</li>
              </ul>
              <p>
                We use AI to analyze and classify this public grant data for equipment purchase signals. We do <strong>not</strong> collect, scrape, or sell any user browsing data, social media activity, or private information about grant recipients.
              </p>
            </Section>

            <Section title="Third-Party Services">
              <p>We use the following trusted third-party services to operate Lab Leads Pro:</p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li><strong>Stripe</strong> — Payment processing. Subject to <a href="https://stripe.com/privacy" className="text-[var(--color-brand)] hover:underline" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</li>
                <li><strong>Resend / Amazon SES</strong> — Email delivery for your weekly reports</li>
                <li><strong>Vercel</strong> — Website hosting and analytics</li>
                <li><strong>Google Analytics</strong> — Anonymous site usage statistics</li>
              </ul>
              <p>
                We do <strong>not</strong> sell, rent, or share your personal information with any third parties for their marketing purposes.
              </p>
            </Section>

            <Section title="Data Retention">
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li>Account data is retained while your subscription is active</li>
                <li>Upon cancellation, your data is deleted within 30 days of request</li>
                <li>Payment records may be retained as required by law (tax and accounting purposes)</li>
                <li>Anonymous analytics data is retained indefinitely</li>
              </ul>
            </Section>

            <Section title="Data Security">
              <p>
                We take reasonable measures to protect your personal information, including encrypted data transmission (HTTPS/TLS), secure payment processing through Stripe, and access controls on our systems. No method of transmission over the Internet is 100% secure, but we strive to use commercially acceptable means to protect your data.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li><strong>Access</strong> the personal data we hold about you</li>
                <li><strong>Correct</strong> inaccurate information</li>
                <li><strong>Delete</strong> your account and associated data</li>
                <li><strong>Opt out</strong> of marketing communications (you will still receive essential service emails while subscribed)</li>
                <li><strong>Export</strong> your data in a portable format</li>
              </ul>
              <p>
                <strong>California residents (CCPA):</strong> You have the right to know what personal information we collect, request deletion, and opt out of any sale of personal information. We do not sell personal information.
              </p>
            </Section>

            <Section title="CAN-SPAM Compliance">
              <p>
                All marketing emails include a clear unsubscribe mechanism. We honor opt-out requests within 10 business days. Our weekly grant reports are a core part of the subscription service — to stop receiving them, cancel your subscription.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify active subscribers of material changes via email. The &quot;Effective&quot; date at the top reflects the latest revision.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                Questions about this Privacy Policy? Reach us at{" "}
                <a href="mailto:info@lableadspro.com" className="text-[var(--color-brand)] hover:underline">
                  info@lableadspro.com
                </a>.
              </p>
            </Section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-dark)] mb-4">{title}</h2>
      <div className="text-[var(--color-gray-700)] leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
