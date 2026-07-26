'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  sortBy?: 'newest' | 'popular' | 'price-low' | 'price-high';
}

export function useProducts(filters?: ProductFilters, limit?: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase.from('products').select('*', { count: 'exact' });

        // Apply filters
        if (filters?.category) {
          query = query.eq('category', filters.category);
        }

        if (filters?.brand) {
          query = query.eq('brand_id', filters.brand);
        }

        if (filters?.minPrice !== undefined) {
          query = query.gte('price', filters.minPrice);
        }

        if (filters?.maxPrice !== undefined) {
          query = query.lte('price', filters.maxPrice);
        }

        // Apply sorting
        if (filters?.sortBy === 'newest') {
          query = query.order('created_at', { ascending: false });
        } else if (filters?.sortBy === 'price-low') {
          query = query.order('price', { ascending: true });
        } else if (filters?.sortBy === 'price-high') {
          query = query.order('price', { ascending: false });
        } else {
          query = query.order('created_at', { ascending: false });
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error, count } = await query;

        if (error) throw error;
        setProducts(data);
        setTotal(count || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, limit]);

  return { products, loading, error, total };
}
