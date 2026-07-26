'use client';

interface ReviewCardProps {
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  createdAt: string;
  helpfulCount?: number;
}

export function ReviewCard({
  userName,
  userAvatar,
  rating,
  title,
  content,
  verifiedPurchase,
  createdAt,
  helpfulCount = 0,
}: ReviewCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="border-t border-neutral pt-6 first:border-t-0 first:pt-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {userAvatar && (
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold">{userName}</p>
            <p className="text-xs text-gray-600">{formatDate(createdAt)}</p>
          </div>
        </div>
        {verifiedPurchase && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            ✓ Verified Purchase
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < rating ? 'text-accent' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm font-semibold">{rating}.0</span>
      </div>

      {/* Review Title */}
      <h4 className="font-semibold mb-2">{title}</h4>

      {/* Review Content */}
      <p className="text-gray-700 mb-4 leading-relaxed">{content}</p>

      {/* Helpful */}
      <button className="text-sm text-gray-600 hover:text-black transition-colors">
        👍 Helpful ({helpfulCount})
      </button>
    </div>
  );
}
