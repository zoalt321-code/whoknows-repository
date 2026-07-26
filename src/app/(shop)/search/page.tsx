'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { SearchResults } from '@/components/search/SearchResults';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTab = (searchParams.get('tab') as 'all' | 'products' | 'brands' | 'users') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'brands' | 'users'>(initialTab);
  const { results, loading, error } = useSearch(query);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Search WhoKnows</h1>

          {/* Search Input */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search products, brands, or people..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="px-4 py-3 text-gray-600 hover:text-black transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Query Info */}
          {query && !loading && (
            <p className="text-gray-600 mt-4">
              Showing results for "{query}"
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            Failed to search: {error}
          </div>
        )}

        {/* Search Results */}
        {query ? (
          <SearchResults
            query={query}
            products={results.products}
            brands={results.brands}
            users={results.users}
            loading={loading}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Start typing to search</p>
            <p className="text-gray-500 mt-2">Find products, brands, and people on WhoKnows</p>
          </div>
        )}
      </div>
    </div>
  );
}
