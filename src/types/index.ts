// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  display_name?: string;
  bio?: string;
  profile_image_url?: string;
  last_username_change?: string;
  created_at: string;
  updated_at: string;
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  website_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

// Product Types
export interface Product {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image_url?: string;
  category: 'clothing' | 'shoes' | 'accessories' | 'hats' | 'jewelry' | 'bags' | 'fragrances' | 'skincare' | 'haircare' | 'grooming';
  colors?: string[];
  sizes?: string[];
  created_at: string;
  updated_at: string;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

// Collection Types
export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CollectionItem {
  id: string;
  collection_id: string;
  product_id: string;
  created_at: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
