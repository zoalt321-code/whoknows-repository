'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Brand, User } from '@/types';

export interface SearchResults {
  products: Product[];
  brands: Brand[];
  users: User[];
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResults>({
    products: [],
    brands: [],
    users: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({ products: [], brands: [], users: [] });
      return;
    }

    const searchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchTerm = `%${query}%`;

        // Search products
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(10);

        if (productError) throw productError;

        // Search brands
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('*')
          .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(10);

        if (brandError) throw brandError;

        // Search users (if authenticated)
        let userData: User[] = [];
        try {
          const { data, error: userError } = await supabase
            .from('users')
            .select('id, email, username, display_name, profile_image_url, created_at, updated_at')
            .or(`username.ilike.${searchTerm},display_name.ilike.${searchTerm}`)
            .limit(10);

          if (userError) throw userError;
          userData = data || [];
        } catch (err) {
          // Users table might not be accessible or other error
          console.log('Could not search users');
        }

        setResults({
          products: productData || [],
          brands: brandData || [],
          users: userData,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchAll, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { results, loading, error };
}
