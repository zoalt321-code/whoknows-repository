'use client';

import { useState } from 'react';
import { useAddReview } from '@/hooks/useAddReview';
import { useAuth } from '@/hooks/useAuth';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { user } = useAuth();
  const { addReview, loading, error } = useAddReview();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const success = await addReview({
      productId,
      rating,
      title,
      content,
    });

    if (success) {
      setSubmitted(true);
      setTitle('');
      setContent('');
      setRating(5);
      onReviewSubmitted();
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  if (!user) {
    return (
      <div className="bg-neutral rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-3">Sign in to leave a review</p>
        <a href="/auth/login" className="text-accent hover:text-black font-semibold">
          Sign In →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Leave a Review</h3>

      {/* Rating */}
      <div>
        <label className="block text-sm font-semibold mb-2">Rating</label>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              className="text-3xl transition-colors"
            >
              <span className={i < rating ? 'text-accent' : 'text-gray-300'}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold mb-2">
          Review Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="What's the best thing about this product?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <p className="text-xs text-gray-600 mt-1">{title.length}/100</p>
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-semibold mb-2">
          Review
        </label>
        <textarea
          id="content"
          placeholder="Share your experience with this product..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
        <p className="text-xs text-gray-600 mt-1">{content.length}/1000</p>
      </div>

      {/* Error */}
      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

      {/* Success */}
      {submitted && (
        <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          Thank you! Your review has been posted.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-neutral-dark transition-colors disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>

      <p className="text-xs text-gray-600">
        ✓ Your review is verified because you purchased this product from WhoKnows.
      </p>
    </form>
  );
}
