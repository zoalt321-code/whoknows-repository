'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Brand } from '@/types';

export function useBrand(brandSlug: string | undefined) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brandSlug) {
      setLoading(false);
      return;
    }

    const fetchBrand = async () => {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .eq('slug', brandSlug)
          .single();

        if (error) throw error;
        setBrand(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load brand');
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [brandSlug]);

  return { brand, loading, error };
}
