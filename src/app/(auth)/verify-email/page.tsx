'use client';

import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
      <div className="mb-4 text-4xl">✓</div>
      <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
      <p className="text-gray-600 mb-6">
        We've sent a confirmation link to your email. Please click it to verify your account.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        If you don't see the email, check your spam folder.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-2 text-sm font-medium text-white hover:bg-neutral-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
