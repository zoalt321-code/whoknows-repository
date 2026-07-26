'use client';

import { useState } from 'react';
import type { Product } from '@/types';

interface ProductOptionsProps {
  product: Product;
  onAddToWishlist: () => void;
  onBuyClick: () => void;
}

export function ProductOptions({ product, onAddToWishlist, onBuyClick }: ProductOptionsProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-3">
            Color {selectedColor && <span className="text-gray-600">({selectedColor})</span>}
          </label>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  selectedColor === color ? 'border-black scale-110' : 'border-neutral'
                }}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-3">
            Size {selectedSize && <span className="text-gray-600">({selectedSize})</span>}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 rounded-lg border-2 font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'border-neutral hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <label className="block text-sm font-semibold mb-3">Quantity</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 border border-neutral rounded-lg hover:bg-neutral transition-colors"
          >
            −
          </button>
          <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 border border-neutral rounded-lg hover:bg-neutral transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBuyClick}
          className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-neutral-dark transition-colors"
        >
          Buy on Brand Website
        </button>
        <button
          onClick={onAddToWishlist}
          className="px-6 py-3 border border-neutral rounded-lg font-semibold hover:bg-neutral transition-colors"
        >
          ♡
        </button>
      </div>

      {/* Info Text */}
      <p className="text-xs text-gray-600">
        Redirects to the brand's official website to complete your purchase. WhoKnows is a discovery platform.
      </p>
    </div>
  );
}
