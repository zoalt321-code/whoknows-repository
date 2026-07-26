'use client';

import { useBrand } from '@/hooks/useBrand';
import Link from 'next/link';
import { useState } from 'react';

export default function BrandPage({ params }: { params: { slug: string } }) {
  const { brand, loading, error } = useBrand(params.slug);
  const [isFollowing, setIsFollowing] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-red-600">Failed to load brand</p>
          <Link href="/brands" className="text-accent hover:text-black">
            Back to Brands →
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600 mb-4">Brand not found</p>
          <Link href="/brands" className="text-accent hover:text-black">
            Back to Brands →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      {brand.banner_url && (
        <div className="h-64 md:h-96 overflow-hidden">
          <img src={brand.banner_url} alt={brand.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Brand Info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-8 border-b border-neutral">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            {brand.logo_url && (
              <div className="flex-shrink-0">
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="w-32 h-32 rounded-lg object-cover bg-neutral"
                />
              </div>
            )}

            {/* Brand Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">{brand.name}</h1>
                {brand.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-black rounded-full text-sm font-medium">
                    ✓ Verified
                  </span>
                )}
              </div>

              {brand.description && <p className="text-gray-600 text-lg mb-6">{brand.description}</p>}

              {/* Social & Website Links */}
              <div className="flex flex-wrap gap-3 mb-6">
                {brand.website_url && (
                  <a
                    href={brand.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors"
                  >
                    Visit Website
                  </a>
                )}
                {brand.instagram_url && (
                  <a
                    href={brand.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-neutral rounded-lg font-medium hover:bg-neutral transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {brand.twitter_url && (
                  <a
                    href={brand.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-neutral rounded-lg font-medium hover:bg-neutral transition-colors"
                  >
                    Twitter
                  </a>
                )}
              </div>

              {/* Follow Button */}
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? 'bg-neutral text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-neutral-dark'
                }`}
              >
                {isFollowing ? '✓ Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="py-12">
          <h2 className="text-3xl font-bold mb-8">Products</h2>

          {/* Empty State */}
          <div className="text-center py-12 bg-neutral rounded-lg">
            <p className="text-gray-600">No products available yet</p>
          </div>
        </div>

        {/* Collections Section */}
        <div className="py-12 border-t border-neutral">
          <h2 className="text-3xl font-bold mb-8">Collections</h2>

          {/* Empty State */}
          <div className="text-center py-12 bg-neutral rounded-lg">
            <p className="text-gray-600">No collections available yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
