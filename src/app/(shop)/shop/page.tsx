'use client';

import { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/shop/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';

interface ShopFilters {
  category?: string;
  sortBy?: 'newest' | 'popular' | 'price-low' | 'price-high';
  minPrice?: number;
  maxPrice?: number;
}

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ShopFilters>({
    sortBy: 'newest',
    minPrice: 0,
    maxPrice: 1000,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { products, loading, error, total } = useProducts(filters);

  // Client-side search filter
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleFilterChange = (newFilters: ShopFilters) => {
    setFilters(newFilters);
    setIsMobileFilterOpen(false);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log('Added to wishlist:', productId);
    // TODO: Implement wishlist functionality
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
          <p className="text-gray-600 text-lg">Browse products from your favorite brands</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors hidden sm:block">
            Search
          </button>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden px-4 py-3 border border-neutral rounded-lg font-medium hover:bg-neutral transition-colors"
          >
            Filters
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              selectedCategory={filters.category}
              selectedSort={filters.sortBy}
              priceRange={[filters.minPrice || 0, filters.maxPrice || 1000]}
            />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredProducts.length === 0 ? 'No products' : `Showing ${filteredProducts.length}`} results
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Failed to load products: {error}</p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-neutral rounded-lg">
                <p className="text-gray-600 text-lg mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ sortBy: 'newest', minPrice: 0, maxPrice: 1000 });
                  }}
                  className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <FilterSidebar
              onFilterChange={handleFilterChange}
              selectedCategory={filters.category}
              selectedSort={filters.sortBy}
              priceRange={[filters.minPrice || 0, filters.maxPrice || 1000]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
