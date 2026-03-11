export default function Problem() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            The Old Way Doesn&apos;t Scale
          </h2>
          <p className="text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
            You&apos;re a great sales rep. But you&apos;re spending hours on lead research
            that should take minutes.
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
                <span>Missing new labs until competitors find them first</span>
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
                <span>New grants in your territory — delivered weekly</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>AI tags equipment needs from every abstract</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>PI name, email, phone, and institution included</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>New lab alerts from public announcements &amp; first-time grants</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Monday morning inbox — ready to prospect before coffee</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
