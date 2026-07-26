'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to home or dashboard
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Sign In</h1>
      <p className="text-gray-600 text-sm mb-6">Welcome back to WhoKnows</p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-black hover:text-accent transition-colors">
          Sign Up
        </Link>
      </p>

      {/* Forgot Password Link */}
      <Link
        href="#"
        className="block text-center text-xs text-gray-600 hover:text-accent transition-colors mt-4"
      >
        Forgot your password?
      </Link>
    </div>
  );
}
