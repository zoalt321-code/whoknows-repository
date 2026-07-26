'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface SimilarProductsProps {
  products: Product[];
  currentProductId: string;
}

export function SimilarProducts({ products, currentProductId }: SimilarProductsProps) {
  const similar = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  if (similar.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-neutral">
      <h2 className="text-3xl font-bold mb-8">Similar Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {similar.map((product) => (
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
  );
}
