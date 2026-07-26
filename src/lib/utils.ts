// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Combine class names
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Check if username can be changed (31 days)
export function canChangeUsername(lastUsernameChange: string | null | undefined): {
  canChange: boolean;
  daysRemaining: number;
  message: string;
} {
  if (!lastUsernameChange) {
    return {
      canChange: true,
      daysRemaining: 0,
      message: 'You can change your username now',
    };
  }

  const lastChange = new Date(lastUsernameChange);
  const now = new Date();
  const daysSinceChange = Math.floor((now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 31 - daysSinceChange);

  if (daysRemaining === 0) {
    return {
      canChange: true,
      daysRemaining: 0,
      message: 'You can change your username now',
    };
  }

  return {
    canChange: false,
    daysRemaining,
    message: `You can change your username again in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`,
  };
}
