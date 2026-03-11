export default function Problem() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            The Old Way Doesn&apos;t Scale
          </h2>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
            You&apos;re a great sales rep — so why are you spending hours finding leads
            instead of closing them? Every hour on prospecting is an hour you&apos;re not
            demoing, not selling, not earning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Way */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
            <div className="text-2xl mb-4">😤</div>
            <h3 className="text-lg font-bold text-red-900 mb-3">Without Lab Leads Pro</h3>
            <ul className="space-y-3 text-red-800">
              <li className="flex gap-3">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>Manually searching NIH Reporter for new grants</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>Reading grant abstracts to guess equipment needs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>Tracking down PI contact info one by one</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>Finding out about new labs after it&apos;s already too late</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>Hours of research per week with inconsistent results</span>
              </li>
            </ul>
          </div>

          {/* New Way */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
            <div className="text-2xl mb-4">🚀</div>
            <h3 className="text-lg font-bold text-green-900 mb-3">With Lab Leads Pro</h3>
            <ul className="space-y-3 text-green-800">
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Every newly awarded NIH &amp; NSF grant in your territory</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>AI anticipates equipment needs from each and every abstract</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>PI name, contact info, and institution — ready to reach out</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Be the first to know about new labs in your territory</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Every Monday morning, a fresh list of your hottest prospects</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
