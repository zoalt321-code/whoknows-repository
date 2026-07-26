'use client';

import { useState } from 'react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  selectedCategory?: string;
  selectedSort?: string;
  priceRange?: [number, number];
}

export function FilterSidebar({
  onFilterChange,
  selectedCategory,
  selectedSort = 'newest',
  priceRange = [0, 1000],
}: FilterSidebarProps) {
  const [category, setCategory] = useState(selectedCategory);
  const [sort, setSort] = useState(selectedSort);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  const handleFilterChange = () => {
    onFilterChange({
      category,
      sortBy: sort,
      minPrice,
      maxPrice,
    });
  };

  return (
    <aside className="bg-neutral rounded-lg p-6 h-fit sticky top-20">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={!category}
              onChange={(e) => {
                setCategory(undefined);
                onFilterChange({ category: undefined, sortBy: sort, minPrice, maxPrice });
              }}
              className="cursor-pointer"
            />
            <span className="text-sm">All Categories</span>
          </label>
          {PRODUCT_CATEGORIES.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.value}
                checked={category === cat.value}
                onChange={(e) => {
                  setCategory(cat.value);
                  onFilterChange({ category: cat.value, sortBy: sort, minPrice, maxPrice });
                }}
                className="cursor-pointer"
              />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-4">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Min Price: ${minPrice}</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={minPrice}
              onChange={(e) => {
                const newMin = parseInt(e.target.value);
                setMinPrice(newMin);
                onFilterChange({ category, sortBy: sort, minPrice: newMin, maxPrice });
              }}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Max Price: ${maxPrice}</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                setMaxPrice(newMax);
                onFilterChange({ category, sortBy: sort, minPrice, maxPrice: newMax });
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Sort Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-4">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            onFilterChange({ category, sortBy: e.target.value, minPrice, maxPrice });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setCategory(undefined);
          setSort('newest');
          setMinPrice(0);
          setMaxPrice(1000);
          onFilterChange({ category: undefined, sortBy: 'newest', minPrice: 0, maxPrice: 1000 });
        }}
        className="w-full px-4 py-2 border border-neutral rounded-lg text-sm font-medium hover:bg-white transition-colors"
      >
        Clear Filters
      </button>
    </aside>
  );
}
