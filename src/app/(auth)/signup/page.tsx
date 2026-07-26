'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Create auth user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // 2. Create user profile in database
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email,
          username,
          display_name: displayName,
        },
      ]);

      if (dbError) throw dbError;

      // 3. Redirect to verification or home
      router.push('/verify-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Create Account</h1>
      <p className="text-gray-600 text-sm mb-6">Join WhoKnows today</p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Display Name */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            required
            className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

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
            minLength={6}
            className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-black hover:text-accent transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
}
