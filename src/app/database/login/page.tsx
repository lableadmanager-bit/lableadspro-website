"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/database/search";
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMessage("");

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${SITE_URL}/database/set-password`,
    });

    if (error) {
      setForgotMessage(error.message);
    } else {
      setForgotMessage("Check your email for a password reset link.");
    }
    setForgotLoading(false);
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
                Sign in to your database
              </h1>
              <p className="text-sm text-[var(--color-gray-500)] mt-2">
                Access your grant search dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-[var(--color-gray-700)]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setShowForgotPassword(true); setForgotEmail(email); }}
                    className="text-xs text-[var(--color-brand)] hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="text-center text-sm text-[var(--color-gray-500)] mt-6">
              Don&apos;t have an account?{" "}
              <a href="/#pricing" className="text-[var(--color-brand)] hover:underline font-medium">
                See our plans
              </a>
            </p>
          </div>

          {showForgotPassword && (
            <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] shadow-sm p-8 mt-6">
              <h2 className="text-lg font-bold text-[var(--color-gray-900)] mb-2">
                Reset your password
              </h2>
              <p className="text-sm text-[var(--color-gray-500)] mb-4">
                Enter your email and we&apos;ll send you a reset link.
              </p>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 text-sm border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow"
                />
                {forgotMessage && (
                  <p className={`text-sm px-4 py-2 rounded-lg ${forgotMessage.includes("Check your email") ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"}`}>
                    {forgotMessage}
                  </p>
                )}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 py-3 text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] rounded-lg transition-colors disabled:opacity-50"
                  >
                    {forgotLoading ? "Sending..." : "Send reset link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForgotPassword(false); setForgotMessage(""); }}
                    className="px-4 py-3 text-sm font-medium text-[var(--color-gray-600)] bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
