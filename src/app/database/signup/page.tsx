"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-gray-50)] pt-16 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[var(--color-brand)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18h8" />
                  <path d="M3 22h18" />
                  <path d="M14 22a7 7 0 1 0-1-13" />
                  <path d="M9 14h2" />
                  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
                  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[var(--color-gray-900)]">
                Create your account
              </h1>
              <p className="text-sm text-[var(--color-gray-500)] mt-2">
                Set up your password to access the grant database
              </p>
            </div>

            {success ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-[var(--color-gray-900)]">
                  Account created
                </h2>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Check your email to confirm your account, then sign in.
                </p>
                <a
                  href="/database/login"
                  className="inline-block mt-2 px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] rounded-lg transition-colors"
                >
                  Go to sign in
                </a>
              </div>
            ) : (
              <>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-gray-700)] mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 text-sm border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[var(--color-gray-700)] mb-1.5">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="At least 8 characters"
                      className="w-full px-4 py-3 text-sm border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-[var(--color-gray-700)] mb-1.5">
                      Confirm password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 text-sm border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </form>

                <p className="text-center text-sm text-[var(--color-gray-500)] mt-6">
                  Already have an account?{" "}
                  <a href="/database/login" className="text-[var(--color-brand)] hover:underline font-medium">
                    Sign in
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
