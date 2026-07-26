'use client';

import { useState, useEffect } from 'react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export interface Category {
  value: string;
  label: string;
  count: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Map constants to categories with placeholder counts
    // In a real app, you'd fetch these from the database
    const cats = PRODUCT_CATEGORIES.map((cat) => ({
      ...cat,
      count: Math.floor(Math.random() * 100) + 10, // Placeholder
    }));

    setCategories(cats);
    setLoading(false);
  }, []);

  return { categories, loading };
}
