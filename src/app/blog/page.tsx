import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | LUXEGEMS",
  description: "Latest trends, tips, and news about jewelry from LUXEGEMS.",
};

const blogPosts = [
  {
    id: 1,
    title: "The Art of Gold Plating: Everything You Need to Know",
    excerpt: "Discover the intricacies of gold plating and how to maintain your jewelry's shine for years to come.",
    date: "April 5, 2026",
    category: "Jewelry Care",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
  },
  {
    id: 2,
    title: "Wedding Jewelry Trends for 2026",
    excerpt: "From classic elegance to modern minimalism, explore the top wedding jewelry trends of the year.",
    date: "March 28, 2026",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
  },
  {
    id: 3,
    title: "How to Choose the Perfect Pendant for Your Neckline",
    excerpt: "A guide to selecting jewelry that complements your neckline and enhances your overall look.",
    date: "March 15, 2026",
    category: "Styling Tips",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
  },
  {
    id: 4,
    title: "Understanding the Different Types of Altars",
    excerpt: "Learn about various altar styles and how to choose the right one for your home or church.",
    date: "March 1, 2026",
    category: "Religious Items",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600",
  },
  {
    id: 5,
    title: "Caring for Your Baptismal Jewelry",
    excerpt: "Essential tips for maintaining the beauty and significance of baptismal pieces.",
    date: "February 20, 2026",
    category: "Jewelry Care",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
  },
  {
    id: 6,
    title: "The Symbolism Behind Mangalsutra",
    excerpt: "Explore the cultural significance and meaning of the sacred Mangalsutra.",
    date: "February 10, 2026",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Blog</h1>
          <p className="text-stone-300">Latest news, trends, and tips</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 bg-stone-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-amber-600 font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs text-stone-400">{post.date}</span>
                  </div>
                  <h2 className="text-lg font-medium text-stone-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-stone-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
