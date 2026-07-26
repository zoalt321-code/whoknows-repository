'use client';

import Link from 'next/link';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Wishlist</h1>
            <p className="text-gray-600">Save your favorite products to shop later</p>
          </div>

          {/* Empty State */}
          <div className="bg-neutral rounded-lg p-12 text-center">
            <p className="text-2xl font-semibold mb-2">No items yet</p>
            <p className="text-gray-600 mb-6">Start adding products to your wishlist</p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-dark transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
