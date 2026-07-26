'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { Product, Brand } from '@/types';

interface ProductInfoProps {
  product: Product;
  brand?: Brand;
}

export function ProductInfo({ product, brand }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <div>
        <span className="inline-flex items-center px-3 py-1 bg-neutral rounded-full text-sm font-medium capitalize">
          {product.category}
        </span>
      </div>

      {/* Product Name */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{product.name}</h1>
        {brand && (
          <Link href={`/brands/${brand.slug}`} className="inline-flex items-center gap-2 hover:text-accent transition-colors">
            <span className="text-lg text-gray-600">by</span>
            <span className="text-lg font-semibold hover:underline">{brand.name}</span>
            {brand.verified && <span className="text-accent">✓</span>}
          </Link>
        )}
      </div>

      {/* Price */}
      <div>
        <p className="text-4xl font-bold">{formatPrice(product.price)}</p>
      </div>

      {/* Description */}
      {product.description && (
        <div>
          <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Stock Info */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm font-medium">In Stock</span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-neutral">
        <div>
          <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Category</p>
          <p className="font-semibold capitalize">{product.category}</p>
        </div>
        {product.colors && product.colors.length > 0 && (
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Available Colors</p>
            <p className="font-semibold">{product.colors.length} options</p>
          </div>
        )}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Available Sizes</p>
            <p className="font-semibold">{product.sizes.length} options</p>
          </div>
        )}
      </div>
    </div>
  );
}
