'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  imageUrl?: string;
  productName: string;
  images?: string[];
}

export function ProductGallery({ imageUrl, productName, images = [] }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const allImages = imageUrl ? [imageUrl, ...images] : images;

  if (allImages.length === 0) {
    return (
      <div className="bg-neutral rounded-lg h-96 flex items-center justify-center">
        <span className="text-gray-600">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-neutral rounded-lg overflow-hidden h-96">
        <img
          src={allImages[selectedImageIndex]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImageIndex === index ? 'border-black' : 'border-neutral'
              }`}
            >
              <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
