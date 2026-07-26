import type { ReactNode } from 'react';

export const metadata = {
  title: 'Product - WhoKnows',
  description: 'View product details on WhoKnows',
};

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
