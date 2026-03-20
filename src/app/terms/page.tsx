import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - Lab Leads Pro",
  description: "Terms and conditions for using Lab Leads Pro services.",
};

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-[var(--color-gray-500)] mb-12">
            Effective March 15, 2026
          </p>

          <div className="prose-custom space-y-10">
            <Section title="1. Service Description">
              <p>
                Lab Leads Pro provides AI-powered analysis of publicly available federal research grant data, delivered as weekly email intelligence reports. Our service identifies equipment purchase signals in newly awarded grants from NIH, NSF, DOD, DOE, NASA, VA, USDA, and CDC - helping life-science equipment sales professionals find qualified leads.
              </p>
            </Section>

            <Section title="2. Subscription & Pricing">
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li>Subscriptions are billed <strong>monthly</strong> on a per-state basis</li>
                <li>You can subscribe to as many or as few U.S. states as you need</li>
                <li>Add or remove states at any time - changes take effect on your next billing cycle</li>
                <li><strong>No long-term contracts.</strong> Cancel anytime.</li>
                <li>Cancellations are effective at the end of your current billing period - you&apos;ll continue receiving reports until then</li>
              </ul>
            </Section>

            <Section title="3. Payment Terms">
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li>All payments are processed securely through <strong>Stripe</strong></li>
                <li>Subscriptions renew automatically each month unless cancelled</li>
                <li>Prices are listed in U.S. dollars</li>
                <li>We reserve the right to adjust pricing with 30 days&apos; notice to existing subscribers</li>
                <li>Refunds are handled on a case-by-case basis - reach out to us and we&apos;ll make it right</li>
              </ul>
            </Section>

            <Section title="4. Data Accuracy & Disclaimer">
              <div className="bg-[var(--color-gray-50)] border border-[var(--color-gray-100)] rounded-xl p-5 my-4">
                <p className="text-[var(--color-gray-700)] font-medium mb-2">Important:</p>
                <p className="text-[var(--color-gray-700)]">
                  Our reports are generated using AI analysis of publicly available federal grant databases. While we strive for accuracy, we <strong>cannot guarantee</strong> that our data is complete, error-free, or current at all times.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li>Grant data is sourced from NIH Reporter, NSF, and USASpending.gov - federal databases that may have their own processing delays (typically 1-2 weeks)</li>
                <li>AI-powered equipment classification may occasionally misidentify or miss equipment signals</li>
                <li>PI contact information is sourced from public records and may not always be current</li>
                <li>Our reports are intended as <strong>supplementary sales intelligence</strong> - not as the sole basis for business decisions</li>
                <li>We are not responsible for actions taken based on information in our reports</li>
              </ul>
            </Section>

            <Section title="5. Acceptable Use">
              <p>You agree to use Lab Leads Pro for <strong>legitimate business intelligence purposes only</strong>. You may not:</p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li>Redistribute, resell, or share your reports with non-subscribers</li>
                <li>Systematically copy or scrape report data into competing products</li>
                <li>Use our service for spam, harassment, or any unlawful purpose</li>
                <li>Attempt to reverse-engineer our classification algorithms</li>
                <li>Share your account credentials with others</li>
              </ul>
              <p>
                Individual reports can be used internally within your organization (sharing a lead with a colleague is fine). Bulk redistribution is not.
              </p>
            </Section>

            <Section title="6. Intellectual Property">
              <p>
                The Lab Leads Pro platform, reports, AI classification methodology, website content, and branding are our intellectual property. Your subscription grants you a <strong>limited, non-exclusive license</strong> to use report data for your internal business purposes.
              </p>
              <p>
                The underlying grant data is public information from federal agencies. Our value-add - the analysis, classification, scoring, and presentation - is proprietary.
              </p>
            </Section>

            <Section title="7. Account Termination">
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-gray-700)]">
                <li><strong>By you:</strong> Cancel anytime from your account settings. Access continues through the end of your billing period.</li>
                <li><strong>By us:</strong> We may suspend or terminate accounts that violate these terms, with notice where practical.</li>
                <li>Upon termination, your personal data is handled per our <Link href="/privacy" className="text-[var(--color-brand)] hover:underline">Privacy Policy</Link> - deleted within 30 days upon request.</li>
              </ul>
            </Section>

            <Section title="8. Service Availability">
              <p>
                We aim to deliver reports reliably every week, but we do not guarantee uninterrupted service. Occasional delays may occur due to federal database maintenance, data processing issues, or other factors outside our control. We&apos;ll communicate any significant disruptions via email.
              </p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Lab Leads Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our service. Our total liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </Section>

            <Section title="10. Indemnification">
              <p>
                You agree to indemnify and hold Lab Leads Pro harmless from any claims, damages, or expenses arising from your use of the service or violation of these terms.
              </p>
            </Section>

            <Section title="11. Changes to These Terms">
              <p>
                We may update these Terms of Service from time to time. Material changes will be communicated to active subscribers via email at least 30 days in advance. Continued use of the service after changes take effect constitutes acceptance of the updated terms.
              </p>
            </Section>

            <Section title="12. Governing Law">
              <p>
                These terms shall be governed by the laws of the State of North Carolina, without regard to conflict of law principles. Any disputes shall be resolved in the courts of North Carolina.
              </p>
            </Section>

            <Section title="13. Contact">
              <p>
                Questions about these terms? Reach us at{" "}
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
