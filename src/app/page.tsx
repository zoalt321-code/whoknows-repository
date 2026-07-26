import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-96 md:h-[500px] bg-gradient-to-r from-neutral-dark to-black flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Fashion</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Explore brands, trends, and outfits from around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-black hover:bg-neutral transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center justify-center rounded-lg border border-white px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              Browse Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Clothing', icon: '👔' },
              { name: 'Shoes', icon: '👟' },
              { name: 'Accessories', icon: '👜' },
              { name: 'Jewelry', icon: '💍' },
              { name: 'Bags', icon: '🎒' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg bg-neutral p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center justify-center h-32 md:h-40">
                  <span className="text-4xl md:text-5xl mb-2">{category.icon}</span>
                  <h3 className="text-center font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-neutral">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Nike',
              'Adidas',
              'Gucci',
              'Prada',
              'Zara',
              'H&M',
              'Uniqlo',
              'Gap',
            ].map((brand) => (
              <Link
                key={brand}
                href={`/brands/${brand.toLowerCase()}`}
                className="group relative rounded-lg bg-white p-8 hover:shadow-md transition-shadow flex items-center justify-center h-24"
              >
                <h3 className="font-semibold text-center group-hover:text-accent transition-colors">
                  {brand}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-8">
        <div className="mx-auto max-w-7xl bg-black text-white rounded-lg p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Create an account to save your favorite products and follow brands
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-black hover:bg-neutral transition-colors"
          >
            Sign Up Free
          </Link>
        </div>
      </section>
    </div>
  );
}
