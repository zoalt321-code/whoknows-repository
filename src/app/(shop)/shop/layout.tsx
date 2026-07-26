import type { ReactNode } from 'react';

export const metadata = {
  title: 'Shop - WhoKnows',
  description: 'Browse products from your favorite brands',
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
