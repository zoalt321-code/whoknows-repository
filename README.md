# WhoKnows Fashion Platform

A modern social fashion discovery platform built with Next.js, React, TypeScript, Tailwind CSS, and Supabase.

## Project Vision

WhoKnows is a place where people discover fashion, brands, and outfits. It combines elements of social media, fashion discovery, and product browsing—but it's NOT a traditional store.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/zoalt321-code/whoknows-repository.git
cd whoknows-repository

# Install dependencies
npm install

# Create environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # Reusable React components
├── lib/              # Utilities and helpers
├── types/            # TypeScript type definitions
├── hooks/            # Custom React hooks
└── styles/           # Additional stylesheets
```

## Development

- Run `npm run dev` to start the development server
- Run `npm run build` to build for production
- Run `npm run lint` to check code quality

## Features (Version 1)

- [ ] Landing page
- [ ] Authentication
- [ ] User profiles
- [ ] Brand pages
- [ ] Product pages
- [ ] Search
- [ ] Categories
- [ ] Wishlist
- [ ] Responsive navigation
- [ ] Dark mode
- [ ] Mobile-first design

## License

MIT
