export const metadata = {
  title: "Unsubscribed - Lab Leads Pro",
};

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            You&apos;ve been unsubscribed
          </h1>
          <p className="text-gray-600">
            You will no longer receive marketing emails from Lab Leads Pro.
          </p>
        </div>
        <div className="border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            Unsubscribed by mistake?{" "}
            <a
              href="mailto:freshleads@lableadspro.com"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Contact us
            </a>{" "}
            and we&apos;ll re-add you.
          </p>
        </div>
      </div>
    </div>
  );
}
