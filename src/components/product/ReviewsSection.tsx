'use client';

import { useReviews } from '@/hooks/useReviews';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import { useState } from 'react';

interface ReviewsSectionProps {
  productId: string;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const { reviews, loading, error, averageRating } = useReviews(productId);
  const [refreshKey, setRefreshKey] = useState(0);

  if (error) {
    return (
      <section className="py-12 border-t border-neutral">
        <p className="text-red-600">Failed to load reviews</p>
      </section>
    );
  }

  return (
    <section className="py-12 border-t border-neutral">
      <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral rounded-lg p-6 sticky top-24">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold mb-2">{averageRating || 'N/A'}</p>
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      averageRating && i < Math.round(averageRating)
                        ? 'text-accent'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter((r) => r.rating === stars).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-xs w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews List & Form */}
        <div className="lg:col-span-2">
          {/* Review Form */}
          <div className="mb-12">
            <ReviewForm
              productId={productId}
              onReviewSubmitted={() => setRefreshKey((k) => k + 1)}
            />
          </div>

          {/* Reviews List */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              All Reviews ({reviews.length})
            </h3>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            )}

            {!loading && reviews.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              </div>
            )}

            {!loading && reviews.length > 0 && (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    userName={review.user_name}
                    userAvatar={review.user_avatar}
                    rating={review.rating}
                    title={review.title}
                    content={review.content}
                    verifiedPurchase={review.verified_purchase}
                    createdAt={review.created_at}
                    helpfulCount={review.helpful_count}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
