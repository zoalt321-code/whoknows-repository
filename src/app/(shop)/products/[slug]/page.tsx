'use client';

import { useProduct } from '@/hooks/useProduct';
import { useBrand } from '@/hooks/useBrand';
import { useProducts } from '@/hooks/useProducts';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductOptions } from '@/components/product/ProductOptions';
import { SimilarProducts } from '@/components/product/SimilarProducts';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product, loading, error } = useProduct(params.slug);
  const { brand } = useBrand(product?.brand_id);
  const { products: allProducts } = useProducts({}, 20);
  const router = useRouter();
  const [wishlistAdded, setWishlistAdded] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-red-600 mb-4">Failed to load product</p>
          <Link href="/shop" className="text-accent hover:text-black">
            Back to Shop →
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

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link href="/shop" className="text-accent hover:text-black">
            Back to Shop →
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToWishlist = () => {
    setWishlistAdded(!wishlistAdded);
    // TODO: Implement actual wishlist functionality
  };

  const handleBuyClick = () => {
    // In a real app, this would redirect to the brand's website
    // For now, show an alert
    alert('Redirecting to brand website...');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/shop" className="hover:text-black">
            Shop
          </Link>
          <span>/</span>
          {brand && (
            <>
              <Link href={`/brands/${brand.slug}`} className="hover:text-black">
                {brand.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-black">{product.name}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery imageUrl={product.image_url} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <ProductInfo product={product} brand={brand} />
            <ProductOptions product={product} onAddToWishlist={handleAddToWishlist} onBuyClick={handleBuyClick} />
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection productId={product.id} />

        {/* Similar Products */}
        {allProducts.length > 0 && <SimilarProducts products={allProducts} currentProductId={product.id} />}
      </div>
    </div>
  );
}
