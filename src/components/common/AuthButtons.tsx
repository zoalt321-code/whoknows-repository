'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export function AuthButtons() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return <div className="w-24 h-10 bg-neutral rounded animate-pulse" />;
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral transition-colors"
        >
          <span className="text-sm font-medium">{user.display_name || user.username}</span>
          <span className="text-lg">▼</span>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral rounded-lg shadow-lg z-50">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm hover:bg-neutral transition-colors first:rounded-t-lg"
            >
              Profile
            </Link>
            <Link
              href="/wishlist"
              className="block px-4 py-2 text-sm hover:bg-neutral transition-colors"
            >
              Wishlist
            </Link>
            <Link
              href="/collections"
              className="block px-4 py-2 text-sm hover:bg-neutral transition-colors"
            >
              Collections
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/');
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-neutral transition-colors last:rounded-b-lg text-red-600"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-sm font-medium hover:text-accent transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-dark transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
}
