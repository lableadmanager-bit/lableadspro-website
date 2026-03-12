export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Lab Leads Pro!</h1>
        <p className="text-xl text-gray-300 mb-3">
          Check your email for confirmation.
        </p>
        <p className="text-lg text-[var(--color-accent)] font-medium mb-10">
          Your first report arrives Monday morning.
        </p>
        <a
          href="/"
          className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
}
