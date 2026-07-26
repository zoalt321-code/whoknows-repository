'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { Product, Brand, User } from '@/types';

interface SearchResultsProps {
  query: string;
  products: Product[];
  brands: Brand[];
  users: User[];
  loading: boolean;
  activeTab: 'all' | 'products' | 'brands' | 'users';
  onTabChange: (tab: 'all' | 'products' | 'brands' | 'users') => void;
}

export function SearchResults({
  query,
  products,
  brands,
  users,
  loading,
  activeTab,
  onTabChange,
}: SearchResultsProps) {
  const totalResults = products.length + brands.length + users.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-2">No results found for "{query}"</p>
        <p className="text-gray-500">Try searching for different keywords or browse categories</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 border-b border-neutral mb-8 overflow-x-auto">
        <button
          onClick={() => onTabChange('all')}
          className={`pb-3 px-2 font-medium whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          All
        </button>
        {products.length > 0 && (
          <button
            onClick={() => onTabChange('products')}
            className={`pb-3 px-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'products'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Products ({products.length})
          </button>
        )}
        {brands.length > 0 && (
          <button
            onClick={() => onTabChange('brands')}
            className={`pb-3 px-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'brands'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Brands ({brands.length})
          </button>
        )}
        {users.length > 0 && (
          <button
            onClick={() => onTabChange('users')}
            className={`pb-3 px-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'users'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            People ({users.length})
          </button>
        )}
      </div>

      {/* All Results */}
      {activeTab === 'all' && (
        <div className="space-y-12">
          {/* Products */}
          {products.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                Products
                {products.length > 4 && (
                  <Link href={`/search?q=${encodeURIComponent(query)}&tab=products`} className="text-sm font-normal text-accent hover:text-black">
                    View all →
                  </Link>
                )}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <div className="group">
                      <div className="relative bg-neutral rounded-lg overflow-hidden mb-3 aspect-square group-hover:shadow-lg transition-shadow">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral to-neutral-dark">
                            <span className="text-gray-600">No image</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-accent">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold mt-2">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Brands */}
          {brands.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                Brands
                {brands.length > 4 && (
                  <Link href={`/search?q=${encodeURIComponent(query)}&tab=brands`} className="text-sm font-normal text-accent hover:text-black">
                    View all →
                  </Link>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {brands.slice(0, 4).map((brand) => (
                  <Link key={brand.id} href={`/brands/${brand.slug}`}>
                    <div className="group p-4 border border-neutral rounded-lg hover:shadow-lg transition-shadow">
                      {brand.logo_url && (
                        <img
                          src={brand.logo_url}
                          alt={brand.name}
                          className="w-16 h-16 rounded-lg mb-3 object-cover"
                        />
                      )}
                      <h3 className="font-semibold group-hover:text-accent transition-colors">
                        {brand.name}
                      </h3>
                      {brand.verified && <span className="text-xs text-accent">✓ Verified</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Users */}
          {users.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                People
                {users.length > 4 && (
                  <Link href={`/search?q=${encodeURIComponent(query)}&tab=users`} className="text-sm font-normal text-accent hover:text-black">
                    View all →
                  </Link>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.slice(0, 4).map((user) => (
                  <Link key={user.id} href={`/profile/${user.id}`}>
                    <div className="group p-4 border border-neutral rounded-lg hover:shadow-lg transition-shadow flex items-center gap-3">
                      <img
                        src={user.profile_image_url || 'https://via.placeholder.com/40'}
                        alt={user.display_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate group-hover:text-accent">
                          {user.display_name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">@{user.username}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <div className="group">
                <div className="relative bg-neutral rounded-lg overflow-hidden mb-3 aspect-square group-hover:shadow-lg transition-shadow">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral to-neutral-dark">
                      <span className="text-gray-600">No image</span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-accent">
                  {product.name}
                </h3>
                <p className="text-lg font-bold mt-2">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Brands Tab */}
      {activeTab === 'brands' && brands.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.slug}`}>
              <div className="group p-4 border border-neutral rounded-lg hover:shadow-lg transition-shadow">
                {brand.logo_url && (
                  <img
                    src={brand.logo_url}
                    alt={brand.name}
                    className="w-full h-32 rounded-lg mb-3 object-cover"
                  />
                )}
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {brand.name}
                </h3>
                {brand.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{brand.description}</p>}
                {brand.verified && <span className="text-xs text-accent mt-2 inline-block">✓ Verified</span>}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <Link key={user.id} href={`/profile/${user.id}`}>
              <div className="group p-4 border border-neutral rounded-lg hover:shadow-lg transition-shadow flex items-center gap-4">
                <img
                  src={user.profile_image_url || 'https://via.placeholder.com/50'}
                  alt={user.display_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate group-hover:text-accent text-lg">
                    {user.display_name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">@{user.username}</p>
                  {user.bio && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{user.bio}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
