'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToWishlist?: (productId: string) => void;
}

export function ProductCard({ product, onAddToWishlist }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer h-full">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg bg-neutral mb-4 aspect-square">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral to-neutral-dark">
              <span className="text-gray-600">No image</span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToWishlist?.(product.id);
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
          >
            ♡
          </button>
        </div>

        {/* Product Info */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-1">{product.description}</p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
