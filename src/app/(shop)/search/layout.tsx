import type { ReactNode } from 'react';

export const metadata = {
  title: 'Search - WhoKnows',
  description: 'Search products, brands, and people on WhoKnows',
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
