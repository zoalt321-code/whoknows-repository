'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Brand } from '@/types';

export function useBrands(limit?: number) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        let query = supabase.from('brands').select('*').order('created_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setBrands(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [limit]);

  return { brands, loading, error };
}
