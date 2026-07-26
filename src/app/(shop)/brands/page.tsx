'use client';

import Link from 'next/link';
import { useBrands } from '@/hooks/useBrands';

export default function BrandsPage() {
  const { brands, loading, error } = useBrands();

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-600">Failed to load brands: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Brands</h1>
          <p className="text-gray-600 text-lg">Explore thousands of brands from luxury to streetwear</p>
        </div>

        {/* Search & Filter (placeholder for future) */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search brands..."
            className="flex-1 px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors">
            Search
          </button>
        </div>

        {/* Brands Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : brands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No brands found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.slug}`}>
                <div className="group cursor-pointer h-full">
                  {/* Brand Card */}
                  <div className="relative overflow-hidden rounded-lg bg-neutral h-48 mb-4 group-hover:shadow-lg transition-shadow">
                    {brand.banner_url ? (
                      <img
                        src={brand.banner_url}
                        alt={brand.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral to-neutral-dark">
                        <span className="text-gray-600">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Brand Info */}
                  <div className="flex items-start gap-3">
                    {brand.logo_url && (
                      <img
                        src={brand.logo_url}
                        alt={brand.name}
                        className="w-12 h-12 rounded-lg object-cover bg-neutral"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                          {brand.name}
                        </h3>
                        {brand.verified && <span className="text-accent">✓</span>}
                      </div>
                      {brand.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{brand.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
