'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function useAddReview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addReview = async ({
    productId,
    rating,
    title,
    content,
  }: {
    productId: string;
    rating: number;
    title: string;
    content: string;
  }) => {
    if (!user) {
      setError('You must be logged in to leave a review');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if user has purchased this product
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (orderError || !orderData) {
        setError('You can only review products you have purchased');
        return false;
      }

      // Check if user already reviewed this product
      const { data: existingReview, error: existingError } = await supabase
        .from('reviews')
        .select('id')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .single();

      if (existingReview) {
        setError('You have already reviewed this product');
        return false;
      }

      // Insert review
      const { error: insertError } = await supabase.from('reviews').insert([
        {
          product_id: productId,
          user_id: user.id,
          user_name: user.user_metadata?.display_name || user.email,
          user_avatar: user.user_metadata?.profile_image_url || null,
          rating,
          title,
          content,
          verified_purchase: true,
        },
      ]);

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addReview, loading, error };
}
